
import { Button } from "@/components/ui/button";

interface HeroSectionProps {
  onBrowseTripsClick: () => void;
}

const HeroSection = ({ onBrowseTripsClick }: HeroSectionProps) => {
  return (
    <section className="relative h-[60vh] overflow-hidden">
      <img 
        src="https://images.unsplash.com/photo-1469474968028-56623f02e42e" 
        alt="Jordan Landscape" 
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black bg-opacity-40" />
      <div className="container mx-auto relative h-full flex flex-col justify-center items-center text-center px-4 text-white">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-4">
          Discover Jordan's Hidden Treasures
        </h1>
        <p className="text-lg md:text-xl mb-8 max-w-2xl">
          Explore breathtaking landscapes, ancient wonders, and unforgettable adventures across the Kingdom.
        </p>
        <Button size="lg" className="text-lg" onClick={onBrowseTripsClick}>
          Browse Trips
        </Button>
      </div>
    </section>
  );
};

export default HeroSection;
