import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Calendar, UserRound, Phone, Mail } from "lucide-react";
import { fetchTripParticipants } from "@/api";
import { Participant } from "@/types/trip";
import { useAuth } from "@/context/AuthContext"; 

interface TripParticipantsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  tripId: string;
  tripName: string;
}

const TripParticipantsDialog = ({
  open,
  onOpenChange,
  tripId,
  tripName,
}: TripParticipantsDialogProps) => {
  const [participants, setParticipants] = React.useState<
    (Participant & { bookingDate?: string })[]
  >([]);
  const [loading, setLoading] = React.useState(true);

  const { user } = useAuth(); 
  const token = user?.token;

  React.useEffect(() => {
    if (open) {
      setLoading(true);

      if (!token) {
        console.error("No token found. Please log in again.");
        setParticipants([]);
        setLoading(false);
        return;
      }

      fetchTripParticipants(tripId, token)
        .then((data) => {
          setParticipants(data);
        })
        .catch(() => {
          setParticipants([]);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [open, tripId, token]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-serif">
            Participants for {tripName}
          </DialogTitle>
          <DialogDescription>
            {participants.length}{" "}
            {participants.length === 1 ? "person" : "people"} have booked this
            trip
          </DialogDescription>
        </DialogHeader>

        {loading ? (
          <div className="flex items-center justify-center py-10">
            <p>Loading participants...</p>
          </div>
        ) : participants.length === 0 ? (
          <div className="text-center py-8">
            <UserRound className="mx-auto h-12 w-12 text-muted-foreground mb-2" />
            <h3 className="text-lg font-medium">No participants yet</h3>
            <p className="text-sm text-muted-foreground mt-1">
              No one has booked this trip so far.
            </p>
          </div>
        ) : (
          <div className="mt-4">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Age</TableHead>
                  <TableHead>Gender</TableHead>
                  <TableHead>Contact</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {participants.map((participant, index) => (
                  <TableRow key={`${participant.email}-${index}`}>
                    <TableCell className="font-medium">
                      {participant.name}
                    </TableCell>
                    <TableCell>{participant.age}</TableCell>
                    <TableCell>{participant.gender}</TableCell>
                    <TableCell>
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center text-sm">
                          <Phone
                            size={14}
                            className="mr-1 text-muted-foreground"
                          />
                          {participant.phoneNumber}
                        </div>
                        <div className="flex items-center text-sm">
                          <Mail
                            size={14}
                            className="mr-1 text-muted-foreground"
                          />
                          {participant.email}
                        </div>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default TripParticipantsDialog;
