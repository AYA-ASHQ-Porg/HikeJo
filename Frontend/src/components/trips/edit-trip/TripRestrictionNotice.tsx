
import { AlertCircle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface TripRestrictionNoticeProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const TripRestrictionNotice = ({ open, onOpenChange }: TripRestrictionNoticeProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">Cannot Edit Trip</DialogTitle>
        </DialogHeader>
        
        <div className="flex flex-col items-center justify-center py-6 text-center">
          <AlertCircle className="h-16 w-16 text-destructive mb-4" />
          <h3 className="text-lg font-semibold mb-2">Trip Modification Restricted</h3>
          <p className="text-muted-foreground mb-4">
            This trip cannot be edited as it is scheduled to occur within 5 days.
          </p>
          <p className="text-sm text-muted-foreground border-t border-border pt-4">
            According to our terms, trips cannot be modified or deleted within 5 days of the scheduled date
            to ensure adventurers have accurate information on their tickets.
          </p>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)} className="w-full">
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
