import { useState } from "react";

const images = [
  "https://images.unsplash.com/photo-1441057206919-63d19fac2369",
  "https://images.unsplash.com/photo-1465379944081-7f47de8d74ac",
  "https://images.unsplash.com/photo-1501286353178-1ec881214838",
  "https://images.unsplash.com/photo-1469041797191-50ace28483c3",
  "https://images.unsplash.com/photo-1452378174528-3090a4bba7b2",
  "https://images.unsplash.com/photo-1487252665478-49b61b47f302",
];

export function Gallery() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {images.map((img, idx) => (
        <div
          key={idx}
          className="relative aspect-square overflow-hidden rounded-lg group"
        >
          <img
            src={img}
            alt={`Gallery image ${idx + 1}`}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
      ))}
    </div>
  );
}