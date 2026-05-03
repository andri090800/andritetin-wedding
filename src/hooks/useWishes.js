import { useState, useEffect } from "react";
import { collection, onSnapshot, addDoc, serverTimestamp, deleteDoc, doc } from "firebase/firestore";
import { db } from "../config/firebase";
import { useAuth } from "../context/AuthContext";

export function useWishes() {
  const [wishes, setWishes] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "wishes"), (snapshot) => {
      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));

      setWishes(
        data.sort((a, b) => (b.timestamp?.seconds || 0) - (a.timestamp?.seconds || 0))
      );
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const addWish = async (name, message) => {
    if (!name || !message || !user) return false;

    try {
      await addDoc(collection(db, "wishes"), {
        name,
        message,
        userId: user.uid,
        timestamp: serverTimestamp(),
      });
      return true;
    } catch (err) {
      console.error("Gagal kirim ucapan:", err);
      return false;
    }
  };

  const deleteWish = async (id) => {
    try {
      await deleteDoc(doc(db, "wishes", id));
      return true;
    } catch (err) {
      console.error("Gagal hapus ucapan:", err);
      return false;
    }
  };

  return { wishes, loading, addWish, deleteWish };
}
