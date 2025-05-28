import { Link } from "react-router-dom";
import {
  Calendar,
  MapPin,
  Users,
  DollarSign,
  Building,
  CheckCircle,
} from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Trip } from "@/types/trip";
import { useAuth } from "@/context/AuthContext";
import { useState, useEffect } from "react";
import LoginDialog from "@/components/auth/LoginDialog";
import SignupTypeDialog from "@/components/auth/SignupTypeDialog";
import TripDetailsDialog from "./TripDetailsDialog";
import DeleteTripDialog from "./DeleteTripDialog";
import TripParticipantsDialog from "./TripParticipantsDialog";

interface TripCardProps {
  trip: Trip;
  onEdit?: () => void;
  onDelete?: (tripId: string) => void;
}

const TripCard = ({ trip, onEdit, onDelete }: TripCardProps) => {
  const { isAuthenticated, userType, user } = useAuth();
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [showTripDetails, setShowTripDetails] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showParticipantsDialog, setShowParticipantsDialog] = useState(false);
  const [isAlreadyBooked, setIsAlreadyBooked] = useState(false);

  const defaultImage =
    "https://images.unsplash.com/photo-1469474968028-56623f02e42e";
  const imageUrl = trip.imageUrl || defaultImage;

  useEffect(() => {
    if (isAuthenticated && user && userType === "adventurer") {
      const bookings = JSON.parse(localStorage.getItem("bookings") || "[]");
      const hasBooked = bookings.some(
        (booking) =>
          booking.tripId === trip._id &&
          booking.userId === user.id &&
          booking.status === "confirmed"
      );
      setIsAlreadyBooked(hasBooked);
    }
  }, [isAuthenticated, user, trip._id, userType]);

  const handleBookClick = () => {
    if (isAlreadyBooked) return;
    setShowTripDetails(true);
  };

  const handleDeleteClick = () => {
    setShowDeleteDialog(true);
  };

  const handleConfirmDelete = () => {
    if (onDelete) {
      onDelete(trip._id);
    }
    setShowDeleteDialog(false);
  };

  const handleCardClick = () => {
    if (userType === "company") {
      setShowParticipantsDialog(true);
    } else {
      setShowTripDetails(true);
    }
  };

  const isCompany = userType === "company";

  return (
    <>
      <Card className="h-full overflow-hidden flex flex-col">
        <div
          className="relative h-48 overflow-hidden cursor-pointer"
          onClick={handleCardClick}
        >
          <img
            src={imageUrl}
            alt={trip.title}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
          <Badge className="absolute top-2 right-2 bg-accent text-primary-foreground">
            {new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "JOD",
            }).format(trip.price)}
          </Badge>
        </div>

        <CardContent
          className="flex-grow p-4 cursor-pointer"
          onClick={handleCardClick}
        >
          <h3 className="font-serif text-xl font-semibold mb-2 text-primary">
            {trip.title}
          </h3>

          <div className="flex items-center text-sm text-muted-foreground mb-2">
            <Building size={14} className="mr-1" />
            <span className="font-medium text-foreground">
              {trip.company?.companyName}
            </span>
          </div>

          <div className="space-y-2 mb-4">
            <div className="flex items-center text-sm text-muted-foreground">
              <MapPin size={16} className="mr-1" />
              <span>
                {trip.startLocation} to {trip.endLocation}
              </span>
            </div>
            <div className="flex items-center text-sm text-muted-foreground">
              <Calendar size={16} className="mr-1" />
              <span>
                {new Date(trip.date).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
            </div>
            <div className="flex items-center text-sm text-muted-foreground">
              <Users size={16} className="mr-1" />
              <span>
                Age {trip.ageRequired}+ • Max {trip.maxParticipants} people
              </span>
            </div>
          </div>

          <p className="text-sm text-muted-foreground line-clamp-3">
            {trip.description}
          </p>
        </CardContent>

        <CardFooter className="p-4 pt-0 mt-auto">
          {isCompany ? (
            <div className="flex gap-2 w-full">
              <Button variant="outline" className="flex-1" onClick={onEdit}>
                Edit
              </Button>
              <Button
                variant="destructive"
                className="flex-1"
                onClick={handleDeleteClick}
              >
                Delete
              </Button>
            </div>
          ) : isAlreadyBooked ? (
            <Button variant="secondary" className="w-full" disabled>
              <CheckCircle className="mr-2" size={16} />
              Already Booked
            </Button>
          ) : (
            <Button
              variant="default"
              className="w-full"
              onClick={handleBookClick}
            >
              Book Trip
            </Button>
          )}
        </CardFooter>
      </Card>

      <LoginDialog
        open={showLogin}
        onOpenChange={setShowLogin}
        onSignupClick={() => {
          setShowLogin(false);
          setShowSignup(true);
        }}
      />

      <SignupTypeDialog
        open={showSignup}
        onOpenChange={setShowSignup}
        onLoginClick={() => {
          setShowSignup(false);
          setShowLogin(true);
        }}
      />

      <TripDetailsDialog
        open={showTripDetails}
        onOpenChange={setShowTripDetails}
        trip={trip}
      />

      <DeleteTripDialog
        open={showDeleteDialog}
        onOpenChange={setShowDeleteDialog}
        trip={trip}
        onConfirm={handleConfirmDelete}
      />

      <TripParticipantsDialog
        open={showParticipantsDialog}
        onOpenChange={setShowParticipantsDialog}
        tripId={trip._id}
        tripName={trip.title}
      />
    </>
  );
};

export default TripCard;
