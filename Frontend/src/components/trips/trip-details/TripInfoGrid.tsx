import { Trip } from "@/types/trip";
import { Calendar, MapPin, Users, Route, BarChart } from "lucide-react";

interface TripInfoGridProps {
  trip: Trip;
}

const TripInfoGrid = ({ trip }: TripInfoGridProps) => {
  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="flex items-center">
        <Calendar className="mr-2 text-primary" size={20} />
        <div>
          <p className="text-sm text-muted-foreground">Date</p>
          <p className="font-semibold">
            {new Date(trip.date).toLocaleDateString("en-US", {
              weekday: "short",
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </p>
        </div>
      </div>

      <div className="flex items-center">
        <MapPin className="mr-2 text-primary" size={20} />
        <div>
          <p className="text-sm text-muted-foreground">Location</p>
          <p className="font-semibold">
            {trip.startLocation} to {trip.endLocation}
          </p>
        </div>
      </div>

      <div className="flex items-center">
        <Route className="mr-2 text-primary" size={20} />
        <div>
          <p className="text-sm text-muted-foreground">Path</p>
          <p className="font-semibold">{trip.path}</p>
        </div>
      </div>

      <div className="flex items-center">
        <Users className="mr-2 text-primary" size={20} />
        <div>
          <p className="text-sm text-muted-foreground">Requirements</p>
          <p className="font-semibold">{trip.ageRequired}+ years old</p>
        </div>
      </div>

      <div className="flex items-center">
        <Users className="mr-2 text-primary" size={20} />
        <div>
          <p className="text-sm text-muted-foreground">Group Size</p>
          <p className="font-semibold">Max {trip.maxParticipants} people</p>
        </div>
      </div>

      <div className="flex items-center">
        <BarChart className="mr-2 text-primary" size={20} />
        <div>
          <p className="text-sm text-muted-foreground">Difficulty</p>
          <p className="font-semibold">{trip.difficultyLevel || "easy"}</p>
        </div>
      </div>
    </div>
  );
};

export default TripInfoGrid;
