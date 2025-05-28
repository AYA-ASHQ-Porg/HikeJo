import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Booking } from "@/types/trip";
import { AlertTriangle } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/context/AuthContext";
import { cancelBooking } from "@/api";

interface CancelBookingDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  booking: Booking;
  onCancelSuccess: () => void;
}

const CancelBookingDialog = ({
  open,
  onOpenChange,
  booking,
  onCancelSuccess,
}: CancelBookingDialogProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth();

  const handleCancel = async () => {
    setIsLoading(true);

    try {
      console.log("Booking being cancelled:", booking);

      const bookingId = booking._id || booking.id;
      if (!bookingId) {
        console.error("❌ Missing booking ID. Booking object:", booking);
        throw new Error("Booking ID is missing. Cannot cancel this booking.");
      }

      await cancelBooking(bookingId, user?.token || "");

      toast({
        title: "Booking Cancelled",
        description: `Your booking for ${booking.tripName} has been cancelled.`,
        duration: 5000,
      });

      onOpenChange(false);
      onCancelSuccess();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to cancel booking. Please try again.",
        variant: "destructive",
        duration: 5000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold flex items-center">
            <AlertTriangle className="mr-2 text-destructive" size={22} />
            Cancel Booking
          </DialogTitle>
          <DialogDescription>
            Are you sure you want to cancel your booking for "{booking.tripName}
            "?
          </DialogDescription>
        </DialogHeader>

        <div className="py-4">
          <p className="text-sm text-muted-foreground mb-4">
            This action cannot be undone. Your reservation will be cancelled and
            your spot may be given to another adventurer.
          </p>

          <div className="bg-muted p-3 rounded-md">
            <p className="font-medium">Booking Details:</p>
            <ul className="text-sm text-muted-foreground mt-1">
              <li>Trip: {booking.tripName}</li>
              <li>Date: {new Date(booking.tripDate).toLocaleDateString()}</li>
              <li>Participants: {booking.participants.length}</li>
            </ul>
          </div>
        </div>

        <DialogFooter className="flex space-x-2 justify-end">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Keep Booking
          </Button>
          <Button
            variant="destructive"
            onClick={handleCancel}
            disabled={isLoading}
          >
            {isLoading ? "Cancelling..." : "Confirm Cancellation"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CancelBookingDialog;
