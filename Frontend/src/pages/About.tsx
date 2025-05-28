// src/pages/About.tsx

import { Compass, Heart, Shield, Users } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-[40vh] overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1472396961693-142e6e269027"
          alt="Jordan Landscape"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40" />
        <div className="container mx-auto relative h-full flex flex-col justify-center items-center text-center px-4 text-white">
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">
            About HikeJo
          </h1>
          <p className="text-lg md:text-xl max-w-2xl">
            Connecting adventurers with Jordan's most spectacular hiking
            experiences.
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl font-serif font-bold mb-6 text-center">
            Our Story
          </h2>
          <div className="space-y-6 text-lg text-muted-foreground">
            <p>
              HikeJo was born from a passion for Jordan's breathtaking
              landscapes and a desire to make them accessible to adventurers
              from around the world. Founded in 2025 by a group of local hiking
              enthusiasts, we recognized the need for a platform that connects
              travelers with authentic hiking experiences while supporting local
              communities.
            </p>
            <p>
              Jordan's diverse terrain—from the lush mountains of the north to
              the otherworldly deserts of Wadi Rum, and from the healing waters
              of the Dead Sea to the ancient stone city of Petra—offers some of
              the world's most spectacular hiking opportunities.
            </p>
            <p>
              Our mission is simple: to showcase the natural beauty of Jordan
              through sustainable adventure tourism, empowering local guides and
              companies while ensuring that every traveler experiences the magic
              of Jordan's trails safely and responsibly.
            </p>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16 px-4 bg-muted">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-3xl font-serif font-bold mb-12 text-center">
            Our Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Value 1 */}
            <div className="bg-background p-6 rounded-lg shadow-sm">
              <div className="flex items-center mb-4">
                <div className="bg-primary bg-opacity-10 p-3 rounded-lg mr-4">
                  <Compass className="text-primary h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold">Authentic Exploration</h3>
              </div>
              <p className="text-muted-foreground">
                We believe in showcasing the real Jordan, taking you beyond
                tourist hotspots to discover hidden gems and authentic local
                experiences that most travelers never see.
              </p>
            </div>

            {/* Value 2 */}
            <div className="bg-background p-6 rounded-lg shadow-sm">
              <div className="flex items-center mb-4">
                <div className="bg-primary bg-opacity-10 p-3 rounded-lg mr-4">
                  <Users className="text-primary h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold">Community Support</h3>
              </div>
              <p className="text-muted-foreground">
                We partner with local guides and companies, ensuring that
                tourism benefits the communities who know and cherish these
                landscapes the most, creating sustainable livelihoods.
              </p>
            </div>

            {/* Value 3 */}
            <div className="bg-background p-6 rounded-lg shadow-sm">
              <div className="flex items-center mb-4">
                <div className="bg-primary bg-opacity-10 p-3 rounded-lg mr-4">
                  <Shield className="text-primary h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold">Safety & Quality</h3>
              </div>
              <p className="text-muted-foreground">
                We rigorously vet all our hiking partners to ensure they provide
                safe, well-organized experiences that meet our high standards
                for quality, comfort, and customer care.
              </p>
            </div>

            {/* Value 4 */}
            <div className="bg-background p-6 rounded-lg shadow-sm">
              <div className="flex items-center mb-4">
                <div className="bg-primary bg-opacity-10 p-3 rounded-lg mr-4">
                  <Heart className="text-primary h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold">Environmental Respect</h3>
              </div>
              <p className="text-muted-foreground">
                We promote responsible tourism practices that preserve Jordan's
                natural beauty for future generations, minimizing our
                environmental footprint and educating travelers about
                conservation.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
