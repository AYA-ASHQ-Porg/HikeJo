
import { addDays, isAfter } from "date-fns";
import { Trip } from "@/types/trip";

export const validateTripEditability = (trip: Trip): boolean => {
  // Check if trip is within 5 days
  const currentDate = new Date();
  const tripDate = new Date(trip.date);
  const minAllowedDate = addDays(currentDate, 5);
  
  // Returns true if trip can be edited (is NOT within 5 days)
  // Returns false if trip cannot be edited (IS within 5 days)
  return isAfter(tripDate, minAllowedDate);
};
