import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Booking } from "@/types/trip";
import { Calendar, Users } from "lucide-react";
import { useState } from "react";
import CancelBookingDialog from "./CancelBookingDialog";

interface MyHikesCardProps {
  booking: Booking;
  onCancelSuccess: () => void;
}

const MyHikesCard = ({ booking, onCancelSuccess }: MyHikesCardProps) => {
  const [showCancelDialog, setShowCancelDialog] = useState(false);

  const isPastTrip = new Date(booking.trip?.date) < new Date();

  return (
    <>
      <Card className={`overflow-hidden ${isPastTrip ? "opacity-60" : ""}`}>
        <CardContent className="p-4">
          <div className="flex justify-between items-start mb-3">
            <h3 className="font-semibold text-lg">
              {booking.trip?.title || "Trip Title Not Available"}
            </h3>

            <Badge
              variant={
                booking.status === "confirmed" ? "default" : "destructive"
              }
            >
              <span>
                {booking.status === "confirmed" ? "Confirmed" : "Cancelled"}
              </span>
            </Badge>
          </div>

          <div className="space-y-2">
            <div className="flex items-center text-sm text-muted-foreground">
              <Calendar size={16} className="mr-1" />
              <span>
                {booking.trip?.date
                  ? new Date(booking.trip.date).toLocaleDateString("en-US", {
                      weekday: "short",
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })
                  : "Invalid Date"}
              </span>
            </div>

            <div className="flex items-center text-sm text-muted-foreground">
              <Users size={16} className="mr-1" />
              <span>
                {booking.participants.length}{" "}
                {booking.participants.length === 1
                  ? "Participant"
                  : "Participants"}
              </span>
            </div>

            <div className="mt-3">
              <p className="text-sm text-muted-foreground">
                Booked on: {new Date(booking.bookedAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        </CardContent>

        {booking.status === "confirmed" && !isPastTrip && (
          <CardFooter className="p-4 pt-0">
            <Button
              variant="destructive"
              className="w-full"
              onClick={() => setShowCancelDialog(true)}
            >
              Cancel Booking
            </Button>
          </CardFooter>
        )}
      </Card>

      <CancelBookingDialog
        open={showCancelDialog}
        onOpenChange={setShowCancelDialog}
        booking={booking}
        onCancelSuccess={onCancelSuccess}
      />
    </>
  );
};

export default MyHikesCard;
