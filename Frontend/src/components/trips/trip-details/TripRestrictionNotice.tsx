import { AlertCircle } from "lucide-react";

const TripRestrictionNotice = () => {
  return (
    <div className="flex items-center p-3 bg-muted border border-border rounded-md">
      <AlertCircle className="text-destructive mr-2" size={20} />
      <p className="text-sm text-muted-foreground">
        This trip cannot be booked as it is scheduled to occur within 5 days.
        According to our terms, bookings must be made at least 5 days before the
        trip date.
      </p>
    </div>
  );
};

export default TripRestrictionNotice;
