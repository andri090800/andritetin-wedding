import { useState, useEffect } from "react";
import { collection, addDoc, onSnapshot, query, orderBy, serverTimestamp, deleteDoc, doc } from "firebase/firestore";
import { db } from "../config/firebase";

// For GUESTS: Only submit RSVP (no read)
export const useRSVP = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const addRSVP = async (name, status, guests) => {
    setIsSubmitting(true);
    try {
      await addDoc(collection(db, "rsvps"), {
        name,
        status,
        guests: parseInt(guests) || 1,
        timestamp: serverTimestamp(),
      });
      setIsSubmitting(false);
      return true;
    } catch (error) {
      console.error("Error adding RSVP:", error);
      setIsSubmitting(false);
      return false;
    }
  };

  return { addRSVP, isSubmitting };
};

// For ADMIN: Full read + delete access (only used in AdminDashboard)
export const useAdminRSVP = () => {
  const [rsvps, setRsvps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const q = query(collection(db, "rsvps"), orderBy("timestamp", "desc"));
    const unsubscribe = onSnapshot(q, 
      (snapshot) => {
        const data = snapshot.docs.map((docSnap) => ({
          id: docSnap.id,
          ...docSnap.data(),
        }));
        setRsvps(data);
        setLoading(false);
      },
      (err) => {
        console.error("Firestore error:", err);
        setError("Akses ditolak. Pastikan Anda sudah login sebagai admin.");
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  const deleteRSVP = async (id) => {
    try {
      await deleteDoc(doc(db, "rsvps", id));
      return true;
    } catch (error) {
      console.error("Error deleting RSVP:", error);
      return false;
    }
  };

  return { rsvps, loading, error, deleteRSVP };
};

