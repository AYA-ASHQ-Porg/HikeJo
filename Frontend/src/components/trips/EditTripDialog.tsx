import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Trip } from "@/types/trip";
import { TripRestrictionNotice } from "./edit-trip/TripRestrictionNotice";
import { TripFormSection } from "./edit-trip/TripFormSection";
import { useEditTripForm } from "./edit-trip/useEditTripForm";
import { validateTripEditability } from "./edit-trip/TripDateValidator";

interface EditTripDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  trip: Trip;
}

const EditTripDialog = ({ open, onOpenChange, trip }: EditTripDialogProps) => {
  if (!trip?._id) return null;

  const isTripEditable = validateTripEditability(trip);

  const { form, isLoading, onSubmit } = useEditTripForm({
    trip,
    onOpenChange,
  });

  if (!isTripEditable) {
    return <TripRestrictionNotice open={open} onOpenChange={onOpenChange} />;
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[550px] max-h-[90vh] overflow-y-scroll">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">
            Edit Trip
          </DialogTitle>
          <DialogDescription className="text-center">
            Update the details of your trip.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={onSubmit} className="space-y-4 pt-4">
          <TripFormSection form={form} />

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Updating Trip..." : "Update Trip"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditTripDialog;
