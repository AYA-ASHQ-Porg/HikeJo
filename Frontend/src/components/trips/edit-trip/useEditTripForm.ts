import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/components/ui/use-toast";
import { Trip } from "@/types/trip";
import { tripSchema, TripFormValues } from "./TripFormSchema";
import { editTrip } from "@/api";
import { useAuth } from "@/context/AuthContext";

interface UseEditTripFormProps {
  trip: Trip;
  onOpenChange: (open: boolean) => void;
}

export const useEditTripForm = ({
  trip,
  onOpenChange,
}: UseEditTripFormProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth();

  const form = useForm<TripFormValues>({
    resolver: zodResolver(tripSchema),
    defaultValues: {
      title: trip.title,
      startLocation: trip.startLocation,
      endLocation: trip.endLocation,
      price: trip.price.toString(),
      description: trip.description,
      ageRequired: trip.ageRequired.toString(),
      maxParticipants: trip.maxParticipants.toString(),
      path: trip.path,
      companyPhoneNumber: trip.companyPhoneNumber,
      maxTicketsPerBooking: trip.maxTicketsPerBooking.toString(),
      date: trip.date,
      imageUrl: trip.imageUrl,
      difficultyLevel: trip.difficultyLevel,
    },
  });

  const onSubmit = async (data: TripFormValues) => {
    setIsLoading(true);
    const token = user?.token;

    if (!token) {
      toast({
        title: "Authorization Error",
        description: "No token found. Please log in again.",
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }

    if (!trip._id) {
      toast({
        title: "Trip ID missing",
        description: "Unable to update trip. Please refresh and try again.",
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }

    const updatedTripData = {
      title: data.title,
      startLocation: data.startLocation,
      endLocation: data.endLocation,
      price: parseFloat(data.price),
      description: data.description,
      ageRequired: parseInt(data.ageRequired),
      maxParticipants: parseInt(data.maxParticipants),
      path: data.path,
      companyPhoneNumber: data.companyPhoneNumber,
      maxTicketsPerBooking: parseInt(data.maxTicketsPerBooking),
      date: data.date,
      imageUrl: data.imageUrl,
      difficultyLevel: data.difficultyLevel,
    };

    try {
      console.log("Updating trip with ID:", trip._id);
      await editTrip(trip._id, updatedTripData, token);

      toast({
        title: "Trip updated successfully!",
        description: "Your trip has been updated.",
      });

      onOpenChange(false);
    } catch (error) {
      console.error("Failed to update trip:", error);
      toast({
        title: "Failed to update trip.",
        description: "There was an error updating your trip. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    form,
    isLoading,
    onSubmit: form.handleSubmit(onSubmit),
  };
};
