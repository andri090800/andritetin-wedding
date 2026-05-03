import { Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="py-12 bg-transparent text-center text-gray-400 border-t border-[#D4AF37]/20 mt-10">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-serif text-[#D4AF37] mb-4 tracking-wider">
          Andri & Tetin
        </h2>
        <p className="mb-8 text-sm max-w-md mx-auto text-gray-300">
          Merupakan suatu kehormatan dan kebahagiaan bagi kami <br className="hidden sm:block"/> 
          apabila Bapak/Ibu/Saudara/i berkenan hadir.
        </p>
        
        <p className="flex justify-center items-center gap-2 text-sm text-gray-500">
          Made with <Heart className="w-4 h-4 text-[#D4AF37] fill-current" /> by Andri & Tetin
        </p>
      </div>
    </footer>
  );
}
