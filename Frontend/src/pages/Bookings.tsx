
import { useState, useEffect } from "react";
import Layout from "@/components/layout/Layout";
import BookingTabs from "@/components/bookings/BookingTabs";
import { Booking } from "@/types/trip";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";

const Bookings = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const { isAuthenticated, userType, user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Redirect if not authenticated or not a company
  useEffect(() => {
    if (!isAuthenticated || userType !== "company") {
      navigate('/');
    }
  }, [isAuthenticated, userType, navigate]);

  // Create a function to load bookings that can be called whenever needed
  const loadBookings = () => {
    if (user) {
      // Log the current user to verify the company ID
      console.info("Current user:", user);
      
      // Get all trips to filter by company ID
      const storedTrips = localStorage.getItem('trips');
      const trips = storedTrips ? JSON.parse(storedTrips) : [];
      
      // Log all trips for debugging
      console.info("All trips:", trips);
      
      // Filter only trips created by this company - FIXING BUG HERE
      // We need to check both user.companyId and user.id since trips might be associated with either
      const companyTripIds = trips
        .filter((trip) => trip.companyId === user.companyId || trip.companyId === user.id)
        .map((trip) => trip.id);
      
      console.info("Company trip IDs:", companyTripIds);
      
      // Get all bookings
      const storedBookings = localStorage.getItem('bookings');
      console.info("Raw bookings from localStorage:", storedBookings);
      
      if (storedBookings) {
        const allBookings = JSON.parse(storedBookings);
        console.info("All bookings:", allBookings);
        
        // Filter bookings for only this company's trips
        const companyBookings = allBookings.filter((booking: Booking) => {
          const isCompanyTrip = companyTripIds.includes(booking.tripId);
          console.info(`Booking ${booking.id} for trip ${booking.tripId}: belongs to company? ${isCompanyTrip}`);
          return isCompanyTrip;
        });
        
        console.info("Filtered company bookings:", companyBookings);
        setBookings(companyBookings);
      } else {
        console.info("No bookings found in localStorage");
        setBookings([]);
      }
    }
  };

  // Load bookings on component mount
  useEffect(() => {
    loadBookings();
  }, [user]);

  // Add a listener for storage changes to update bookings in real-time
  useEffect(() => {
    // Function to handle storage events
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === 'bookings') {
        console.info("Bookings data changed in localStorage, reloading...");
        loadBookings();
        
        // Show a toast notification
        toast({
          title: "New booking received",
          description: "A new booking has been added to your trips",
          duration: 5000,
        });
      }
    };
    
    // Add event listener for storage changes
    window.addEventListener('storage', handleStorageChange);
    
    // Set up periodic polling as a fallback (every 30 seconds)
    const interval = setInterval(() => {
      loadBookings();
    }, 30000);
    
    // Cleanup function
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  }, [user, toast]);

  return (
    <Layout>
      <div className="bg-background py-16 px-4">
        <div className="container mx-auto max-w-5xl">
          <h1 className="text-3xl font-serif font-bold mb-8">Bookings Overview</h1>
          
          <div className="space-y-8">
            <BookingTabs bookings={bookings} />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Bookings;
