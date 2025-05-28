import { useState, useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import MyHikesCard from "@/components/bookings/MyHikesCard";
import { Booking } from "@/types/trip";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import { CalendarX2 } from "lucide-react";
import { getAdventurerBookings } from "@/api";

const MyHikes = () => {
  const [upcomingBookings, setUpcomingBookings] = useState<Booking[]>([]);
  const [pastBookings, setPastBookings] = useState<Booking[]>([]);
  const { isAuthenticated, userType, user } = useAuth();
  const navigate = useNavigate();

  // Redirect if not authenticated or not an adventurer
  useEffect(() => {
    if (!isAuthenticated || userType !== "adventurer") {
      navigate("/");
    }
  }, [isAuthenticated, userType, navigate]);

  // Load bookings from backend
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        if (!user?.token) return;
        const response = await getAdventurerBookings(user.token);
        console.log("Booking API response:", response.data);

        const upcoming = response.data.data?.upcoming || [];
        const past = [
          ...(response.data.data?.past || []),
          ...(response.data.data?.cancelled || []),
        ];

        setUpcomingBookings(upcoming);
        setPastBookings(past);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    };

    fetchBookings();
  }, [user]);

  // Handler for when a booking is cancelled
  const handleCancelSuccess = () => {
    if (!user?.token) return;
    getAdventurerBookings(user.token)
      .then((response) => {
        const upcoming = response.data.data?.upcoming || [];
        const past = [
          ...(response.data.data?.past || []),
          ...(response.data.data?.cancelled || []),
        ];

        setUpcomingBookings(upcoming);
        setPastBookings(past);
      })
      .catch((error) => console.error("Error refreshing bookings:", error));
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow bg-background py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <h1 className="text-3xl font-serif font-bold mb-8">My Hikes</h1>

          <div className="space-y-10">
            <section>
              <h2 className="text-xl font-semibold mb-4">Upcoming Trips</h2>
              {upcomingBookings.length > 0 ? (
                <div className="grid gap-4">
                  {upcomingBookings.map((booking) => (
                    <MyHikesCard
                      key={booking.id}
                      booking={booking}
                      onCancelSuccess={handleCancelSuccess}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 border border-dashed border-border rounded-lg">
                  <CalendarX2 className="mx-auto h-12 w-12 text-muted-foreground mb-3" />
                  <h3 className="text-lg font-medium mb-1">
                    No upcoming trips
                  </h3>
                  <p className="text-muted-foreground">
                    You don't have any upcoming hiking trips. Browse available
                    trips and make a booking!
                  </p>
                </div>
              )}
            </section>

            {pastBookings.length > 0 && (
              <section>
                <h2 className="text-xl font-semibold mb-4">
                  Past & Cancelled Trips
                </h2>
                <div className="grid gap-4">
                  {pastBookings.map((booking) => (
                    <MyHikesCard
                      key={booking.id}
                      booking={booking}
                      onCancelSuccess={handleCancelSuccess}
                    />
                  ))}
                </div>
              </section>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default MyHikes;
