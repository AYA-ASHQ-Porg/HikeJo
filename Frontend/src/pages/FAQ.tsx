// src/pages/FAQ.tsx

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQ = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow bg-background py-16 px-4">
        <div className="container mx-auto max-w-3xl">
          <h1 className="text-3xl font-serif font-bold mb-3 text-center">
            Frequently Asked Questions
          </h1>
          <p className="text-muted-foreground text-center mb-10">
            Find answers to common questions about hiking in Jordan and using
            our platform.
          </p>

          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>What is HikeJo?</AccordionTrigger>
              <AccordionContent>
                HikeJo is an online platform that connects adventurers with
                amazing hiking experiences throughout Jordan. We partner with
                local hiking companies and guides to offer a wide range of
                trips, from easy day hikes to challenging multi-day treks. Our
                mission is to showcase Jordan's natural beauty while supporting
                local communities.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2">
              <AccordionTrigger>How do I book a hiking trip?</AccordionTrigger>
              <AccordionContent>
                Booking a hiking trip is easy! Simply browse our available trips
                on the homepage, select one that interests you, and click "Book
                Trip." You'll need to create an account or log in, then follow
                the prompts to complete your booking. You can book up to 3
                tickets per reservation, depending on the trip's policy.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3">
              <AccordionTrigger>
                What should I bring on a hiking trip in Jordan?
              </AccordionTrigger>
              <AccordionContent>
                For most hiking trips in Jordan, we recommend bringing: sturdy
                hiking shoes/boots, a hat, sunglasses, sunscreen, a reusable
                water bottle (at least 2 liters), light and breathable clothing
                (plus a layer for cooler evenings), a small backpack, camera,
                any personal medications, and a valid ID. Specific trips may
                have additional recommendations, which will be provided after
                booking.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4">
              <AccordionTrigger>Can I cancel my booking?</AccordionTrigger>
              <AccordionContent>
                Yes, you can cancel your booking through your "My Hikes" page.
                Please note that cancellation policies vary by trip and company.
                In general, cancellations made more than 7 days before the trip
                are eligible for a full refund, while cancellations made 3-7
                days before may receive a partial refund. Cancellations within
                48 hours of the trip are usually non-refundable.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-5">
              <AccordionTrigger>
                How difficult are the hiking trips?
              </AccordionTrigger>
              <AccordionContent>
                Our trips range from easy walks suitable for beginners to
                challenging treks for experienced hikers. Each trip listing
                includes information about difficulty level, terrain, distance,
                elevation gain, and required fitness level. We recommend
                choosing trips that match your experience and fitness level for
                the most enjoyable experience.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-6">
              <AccordionTrigger>Is transportation included?</AccordionTrigger>
              <AccordionContent>
                Transportation arrangements vary by trip. Most trips include
                pickup and drop-off from central meeting points in major cities
                like Amman. The transportation details will be clearly listed in
                the trip description. If you need special transportation
                arrangements, please contact the hiking company directly after
                booking.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-7">
              <AccordionTrigger>
                What is the best time of year to hike in Jordan?
              </AccordionTrigger>
              <AccordionContent>
                The best hiking seasons in Jordan are spring (March to May) and
                autumn (September to November), when temperatures are mild and
                comfortable. Summer (June to August) can be extremely hot,
                especially in lower elevations like Wadi Rum and the Dead Sea,
                though early morning hikes can still be enjoyable. Winter
                (December to February) can be cool and rainy, with occasional
                snow in higher elevations, but offers a unique perspective on
                Jordan's landscapes.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-8">
              <AccordionTrigger>
                Are meals provided during the trips?
              </AccordionTrigger>
              <AccordionContent>
                Meal provisions vary by trip. Day hikes typically include a
                light lunch or snacks, while multi-day trips usually include all
                meals. Vegetarian and special dietary options are often
                available upon request. The meal details will be clearly
                outlined in each trip description.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-9">
              <AccordionTrigger>
                How do I become a hiking company partner?
              </AccordionTrigger>
              <AccordionContent>
                If you operate a hiking company in Jordan and would like to
                partner with HikeJo, simply sign up for a company account and
                complete your profile. Our team will review your application and
                may request additional information or documentation. Once
                approved, you can start listing your trips on our platform.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-10">
              <AccordionTrigger>Is hiking in Jordan safe?</AccordionTrigger>
              <AccordionContent>
                Jordan is generally considered one of the safest countries in
                the Middle East for tourism and outdoor activities. All our
                partner companies prioritize safety and employ experienced
                guides familiar with the terrain. However, as with any outdoor
                activity, hiking carries inherent risks. We recommend always
                following guide instructions, staying on marked trails, carrying
                sufficient water, and being prepared for weather changes.
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <div className="mt-12 text-center">
            <h2 className="text-xl font-semibold mb-3">
              Still have questions?
            </h2>
            <p className="text-muted-foreground mb-6">
              Get in touch with our team and we'll be happy to help.
            </p>
            <div className="flex justify-center">
              <a
                href="mailto:hikejo9@gmail.com"
                className="text-primary hover:underline"
              >
                hikejo9@gmail.com
              </a>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default FAQ;
