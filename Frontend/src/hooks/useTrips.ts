// src/hooks/useTrips.ts

import { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Trip } from "@/types/trip";
import { getAllTrips, getTripsByCompany, deleteTrip } from "@/api";

interface UseTripsOptions {
  companyId?: string | null;
  isAuthenticated?: boolean;
  userType?: string;
  userId?: string;
  token?: string;
}

export const useTrips = (options: UseTripsOptions = {}) => {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [filteredTrips, setFilteredTrips] = useState<Trip[]>([]);
  const [selectedTripForEdit, setSelectedTripForEdit] = useState<Trip | null>(
    null
  );
  const [isAddTripOpen, setIsAddTripOpen] = useState(false);
  const [isEditTripOpen, setIsEditTripOpen] = useState(false);
  const [companyName, setCompanyName] = useState<string | null>(null);
  const { toast } = useToast();

  const { companyId, token } = options;

  const fetchTrips = async () => {
    try {
      let response;

      if (companyId) {
        response = await getTripsByCompany(companyId, token || "");
      } else {
        response = await getAllTrips(token, options.userType);
      }

      console.log("🎯 Loaded Trips:", response);
      setTrips(response);
      setFilteredTrips(response);
    } catch (error) {
      console.error("Error fetching trips:", error);
      toast({
        title: "Failed to fetch trips",
        description: "Please try again later.",
        variant: "destructive",
      });
    }
  };

  const handleDeleteTrip = async (tripId: string) => {
    if (!token) return;

    try {
      await deleteTrip(tripId, token);
      toast({
        title: "Trip deleted successfully!",
      });
      fetchTrips();
    } catch (error) {
      console.error("Failed to delete trip:", error);
      toast({
        title: "Failed to delete trip.",
        description: "Please try again later.",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    fetchTrips();
  }, [companyId, token]);

  return {
    trips,
    filteredTrips,
    selectedTripForEdit,
    setSelectedTripForEdit,
    isAddTripOpen,
    setIsAddTripOpen,
    isEditTripOpen,
    setIsEditTripOpen,
    companyName,
    setCompanyName,
    fetchTrips,
    handleDeleteTrip,
  };
};