import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import { Trip } from "@/types/trip";
import { useAuth } from "@/context/AuthContext";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import BookingDialog from "../bookings/BookingDialog";
import { isAfter, addDays } from "date-fns";
import TripImageSection from "./trip-details/TripImageSection.tsx";
import TripInfoGrid from "./trip-details/TripInfoGrid.tsx";
import TripDescription from "./trip-details/TripDescription";
import TripsRestrictionNotice from "./trip-details/TripRestrictionNotice.tsx";

interface TripDetailsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  trip: Trip;
}

const TripDetailsDialog = ({
  open,
  onOpenChange,
  trip,
}: TripDetailsDialogProps) => {
  const { isAuthenticated, userType, user } = useAuth();
  const [showBooking, setShowBooking] = useState(false);
  const [ticketCount, setTicketCount] = useState<string>("1");
  const [isAlreadyBooked, setIsAlreadyBooked] = useState(false);

  // Check if trip is within 5 days
  const currentDate = new Date();
  const tripDate = new Date(trip.date);
  const minAllowedDate = addDays(currentDate, 5);
  const isWithinFiveDays = !isAfter(tripDate, minAllowedDate);

  // Check if the current user has already booked this trip
  useEffect(() => {
    if (isAuthenticated && user && userType === "adventurer") {
      interface Booking {
        tripId: string;
        userId: string;
        status: string;
        [key: string]: unknown;
      }
      const bookings: Booking[] = JSON.parse(
        localStorage.getItem("bookings") || "[]"
      );
      const hasBooked = bookings.some(
        (booking: Booking) =>
          booking.tripId === trip.id &&
          booking.userId === user.id &&
          booking.status === "confirmed"
      );
      setIsAlreadyBooked(hasBooked);
    }
  }, [isAuthenticated, user, trip.id, userType]);

  const handleBookClick = () => {
    if (isWithinFiveDays || isAlreadyBooked) {
      return; // Do nothing if within 5 days or already booked
    }

    if (isAuthenticated && userType === "adventurer") {
      setShowBooking(true);
      onOpenChange(false);
    }
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold font-serif">
              {trip.title}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-6 my-2">
            <TripImageSection
              imageUrl={trip.imageUrl}
              title={trip.title}
              difficultyLevel={trip.difficultyLevel}
              price={trip.price}
            />
            <TripInfoGrid trip={trip} />
            <TripDescription
              description={trip.description}
              companyName={trip.companyName}
              companyPhoneNumber={trip.companyPhoneNumber}
            />

            {isAuthenticated && userType === "adventurer" && (
              <BookingSection
                isWithinFiveDays={isWithinFiveDays}
                isAlreadyBooked={isAlreadyBooked}
                ticketCount={ticketCount}
                setTicketCount={setTicketCount}
                maxTicketsPerBooking={trip.maxTicketsPerBooking}
              />
            )}
          </div>

          <DialogFooter>
            {isAuthenticated && userType === "adventurer" ? (
              isAlreadyBooked ? (
                <Button variant="secondary" className="w-full" disabled>
                  <CheckCircle className="mr-2" size={16} />
                  Already Booked
                </Button>
              ) : (
                <Button
                  className="w-full"
                  onClick={handleBookClick}
                  disabled={isWithinFiveDays}
                >
                  {isWithinFiveDays ? "Booking Unavailable" : "Book Now"}
                </Button>
              )
            ) : (
              <p className="text-sm text-muted-foreground italic">
                Please log in as an adventurer to book this trip.
              </p>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <BookingDialog
        open={showBooking}
        onOpenChange={setShowBooking}
        trip={trip}
        ticketCount={parseInt(ticketCount)}
        onOpenTripDetails={() => {
          setShowBooking(false);
          onOpenChange(true);
        }}
      />
    </>
  );
};

interface BookingSectionProps {
  isWithinFiveDays: boolean;
  isAlreadyBooked: boolean;
  ticketCount: string;
  setTicketCount: (value: string) => void;
  maxTicketsPerBooking: number;
}

const BookingSection = ({
  isWithinFiveDays,
  isAlreadyBooked,
  ticketCount,
  setTicketCount,
  maxTicketsPerBooking,
}: BookingSectionProps) => {
  if (isAlreadyBooked) {
    return null;
  }

  return (
    <div className="space-y-3">
      {isWithinFiveDays ? (
        <TripsRestrictionNotice />
      ) : (
        <div className="space-y-2">
          <Label htmlFor="tickets">Number of Tickets</Label>
          <Select value={ticketCount} onValueChange={setTicketCount}>
            <SelectTrigger id="tickets" className="w-full">
              <SelectValue placeholder="Select number of tickets" />
            </SelectTrigger>
            <SelectContent>
              {Array.from(
                { length: maxTicketsPerBooking },
                (_, i) => i + 1
              ).map((num) => (
                <SelectItem key={num} value={num.toString()}>
                  {num} {num === 1 ? "ticket" : "tickets"}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}
    </div>
  );
};

export default TripDetailsDialog;
