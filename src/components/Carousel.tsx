import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

/*const images = [
  "https://images.unsplash.com/photo-1582562124811-c09040d0a901",
  "https://images.unsplash.com/photo-1535268647677-300dbf3d78d1",
  "https://images.unsplash.com/photo-1466721591366-2d5fba72006d",
];*/

const images = [
  "https://images.unsplash.com/photo-1576201836106-db1758fd1c97",
  "https://images.unsplash.com/photo-1629909613654-28e377c37b09",
  "https://images.unsplash.com/photo-1628009368231-7bb7cfcb0def"
];

const texts = [
  "Cuidando a tus mascotas con amor",
  "Atención veterinaria de calidad",
  "Tu familia peluda en las mejores manos",
];

export function Carousel() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative h-[600px] w-full overflow-hidden">
      {images.map((img, idx) => (
        <div
          key={img}
          className={`absolute top-0 left-0 w-full h-full transition-opacity duration-500 ${
            idx === current ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="absolute inset-0 bg-black/40 z-10" />
          <img
            src={img}
            alt={`Slide ${idx + 1}`}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 flex items-center justify-center z-20">
            <h2 className="text-white text-4xl md:text-6xl font-bold text-center px-4">
              {texts[idx]}
            </h2>
          </div>
        </div>
      ))}
      <button
        onClick={() => setCurrent((prev) => (prev - 1 + images.length) % images.length)}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-30 bg-white/20 hover:bg-white/30 rounded-full p-2 transition-colors"
      >
        <ChevronLeft className="w-6 h-6 text-white" />
      </button>
      <button
        onClick={() => setCurrent((prev) => (prev + 1) % images.length)}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-30 bg-white/20 hover:bg-white/30 rounded-full p-2 transition-colors"
      >
        <ChevronRight className="w-6 h-6 text-white" />
      </button>
    </div>
  );
}