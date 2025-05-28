
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Trip } from "@/types/trip";
import { format, isAfter, addDays } from "date-fns";

interface DeleteTripDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  trip: Trip;
  onConfirm: () => void;
}

const DeleteTripDialog = ({
  open,
  onOpenChange,
  trip,
  onConfirm,
}: DeleteTripDialogProps) => {
  // Check if trip is within 5 days
  const currentDate = new Date();
  const tripDate = new Date(trip.date);
  const minAllowedDate = addDays(currentDate, 5);
  const isWithinFiveDays = !isAfter(tripDate, minAllowedDate);

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Trip</AlertDialogTitle>
          <AlertDialogDescription>
            {isWithinFiveDays ? (
              <div className="text-destructive">
                This trip cannot be deleted as it is scheduled to occur within 5 days.
                <br /><br />
                According to our terms, trips cannot be modified or deleted within 5 days of the scheduled date.
              </div>
            ) : (
              <>Are you sure you want to delete &quot;{trip.title}&quot;? This action cannot be undone.</>
            )}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          {!isWithinFiveDays && (
            <AlertDialogAction onClick={onConfirm} className="bg-destructive text-destructive-foreground">
              Delete
            </AlertDialogAction>
          )}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteTripDialog;
