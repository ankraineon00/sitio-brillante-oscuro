import { Navbar } from "@/components/Navbar";
import { Carousel } from "@/components/Carousel";
import { Gallery } from "@/components/Gallery";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-medicans-dark">
      <Navbar />
      <main className="pt-16">
        <section id="inicio" className="relative">
          <Carousel />
        </section>
        
        <section className="py-20 bg-gray-50 dark:bg-medicans-dark/50">
          <div className="container mx-auto px-4">
            <blockquote className="text-center">
              <p className="text-2xl md:text-4xl font-light text-gray-600 dark:text-gray-300 italic">
                "El amor por los animales eleva el nivel cultural del pueblo"
              </p>
              <footer className="mt-4 text-gray-500 dark:text-gray-400">
                - Mahatma Gandhi
              </footer>
            </blockquote>
          </div>
        </section>

        <section id="galeria" className="py-20">
          <div className="container mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800 dark:text-white">
              Nuestra Galería
            </h2>
            <Gallery />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default Index;