import { Plus, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import TripCard from "@/components/trips/TripCard";
import { Trip } from "@/types/trip";

interface TripListProps {
  trips: Trip[];
  isCompanyView: boolean;
  companyId?: string | null;
  companyName?: string | null;
  onAddTrip: () => void;
  onEditTrip: (trip: Trip) => void;
  onDeleteTrip: (tripId: string) => void;
}

const TripList = ({
  trips,
  isCompanyView,
  companyId,
  companyName,
  onAddTrip,
  onEditTrip,
  onDeleteTrip,
}: TripListProps) => {
  return (
    <section className="py-12 px-4">
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-serif font-bold">
            {companyId
              ? `Available Trips${companyName ? ` from ${companyName}` : ""}`
              : isCompanyView
              ? "Your Company Trips"
              : "Explore Our Trips"}
          </h2>

          {isCompanyView && (
            <Button
              onClick={onAddTrip}
              className="bg-primary hover:bg-primary/90"
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Trip
            </Button>
          )}
        </div>

        {trips.length === 0 ? (
          <div className="text-center py-12 bg-muted rounded-lg border border-border">
            <AlertCircle className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-xl font-medium mb-2">
              {companyId
                ? "No trips available from this company yet"
                : isCompanyView
                ? "No trips available yet for your company"
                : "No trips available"}
            </h3>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              {isCompanyView
                ? "Start by adding your first hiking adventure to showcase your offerings."
                : "Please check back later for new adventures."}
            </p>
            {isCompanyView && (
              <Button
                onClick={onAddTrip}
                size="lg"
                className="bg-primary hover:bg-primary/90"
              >
                <Plus className="mr-2 h-5 w-5" />
                Add Your First Trip
              </Button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {trips.map((trip) => (
              <div key={trip._id} className="animate-fade-in">
                <TripCard
                  trip={trip}
                  onEdit={() => {
                    if (trip._id) {
                      onEditTrip(trip); 
                    } else {
                      console.error("Trip is missing _id!");
                    }
                  }}
                  onDelete={onDeleteTrip}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default TripList;
