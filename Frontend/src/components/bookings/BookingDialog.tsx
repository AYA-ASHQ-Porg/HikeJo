import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Trip } from "@/types/trip";
import { useAuth } from "@/context/AuthContext";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import { bookTrip } from "@/api";

interface BookingDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  trip: Trip;
  ticketCount: number;
  onOpenTripDetails: () => void;
}

const participantSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  age: z.string().min(1, { message: "Age is required" }),
  gender: z.enum(["male", "female"], {
    required_error: "Gender is required",
  }),
  phoneNumber: z.string().min(10, {
    message: "Please enter a valid phone number",
  }),
  email: z.string().email({ message: "Please enter a valid email" }),
});

type ParticipantForm = z.infer<typeof participantSchema>;

const createBookingSchema = (ticketCount: number) =>
  z.object({
    participants: z.array(participantSchema).length(ticketCount),
  });

type BookingFormValues = z.infer<ReturnType<typeof createBookingSchema>>;

const BookingDialog = ({
  open,
  onOpenChange,
  trip,
  ticketCount,
  onOpenTripDetails,
}: BookingDialogProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { user } = useAuth();
  const { toast } = useToast();

  const form = useForm<BookingFormValues>({
    resolver: zodResolver(createBookingSchema(ticketCount)),
    defaultValues: {
      participants: Array(ticketCount).fill({
        name: "",
        age: "",
        gender: undefined,
        phoneNumber: "",
        email: "",
      }),
    },
  });

  useEffect(() => {
    form.reset({
      participants: Array(ticketCount).fill({
        name: "",
        age: "",
        gender: undefined,
        phoneNumber: "",
        email: "",
      }),
    });
  }, [ticketCount, form]);

  useEffect(() => {
    if (user && form.getValues().participants.length > 0) {
      const participants = form.getValues().participants;
      participants[0] = {
        ...participants[0],
        name: user.name || "",
        age: user.age?.toString() || "",
        gender: (user.gender as "male" | "female") || undefined,
        phoneNumber: user.phoneNumber || "",
        email: user.email || "",
      };
      form.reset({ participants });
    }
  }, [user, form]);

  const onSubmit = async (data: BookingFormValues) => {
    const invalidAges = data.participants.filter((p) => {
      const age = parseInt(p.age);
      return isNaN(age) || age < trip.ageRequired;
    });

    if (invalidAges.length > 0) {
      setErrorMessage(
        `All participants must be at least ${trip.ageRequired} years old.`
      );
      return;
    }

    setIsLoading(true);
    setErrorMessage(null);

    try {
      await bookTrip(
        trip._id,
        data.participants.map((p) => ({
          ...p,
          age: parseInt(p.age),
        })),
        ticketCount,
        user?.token || ""
      );

      toast({
        title: "Booking Confirmed!",
        description: `You've successfully booked ${ticketCount} ticket(s) for ${trip.title}.`,
        duration: 5000,
      });

      onOpenChange(false);
      form.reset();
    } catch (error: any) {
      console.error(error);
      setErrorMessage(
        error.response?.data?.message ||
          "Failed to complete booking. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">
            Trip Reservation
          </DialogTitle>
          <DialogDescription className="text-center">
            {trip.title} • {new Date(trip.date).toLocaleDateString()}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 pt-4">
          {errorMessage && (
            <div className="p-3 bg-destructive/10 text-destructive rounded-md text-sm">
              {errorMessage}
            </div>
          )}

          {Array.from({ length: ticketCount }).map((_, index) => (
            <Card key={index} className="overflow-hidden">
              <CardContent className="p-4">
                <h3 className="font-semibold text-lg mb-3">
                  Participant {index + 1} {index === 0 && "(You)"}
                </h3>

                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor={`name-${index}`}>Full Name</Label>
                      <Input
                        id={`name-${index}`}
                        type="text"
                        {...form.register(`participants.${index}.name`)}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor={`age-${index}`}>Age</Label>
                      <Input
                        id={`age-${index}`}
                        type="number"
                        min={trip.ageRequired}
                        {...form.register(`participants.${index}.age`)}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor={`gender-${index}`}>Gender</Label>
                    <Controller
                      name={`participants.${index}.gender`}
                      control={form.control}
                      render={({ field }) => (
                        <RadioGroup
                          className="flex space-x-4"
                          value={field.value}
                          onValueChange={field.onChange}
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="male" id={`male-${index}`} />
                            <Label htmlFor={`male-${index}`}>Male</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem
                              value="female"
                              id={`female-${index}`}
                            />
                            <Label htmlFor={`female-${index}`}>Female</Label>
                          </div>
                        </RadioGroup>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor={`phoneNumber-${index}`}>
                        Phone Number
                      </Label>
                      <Input
                        id={`phoneNumber-${index}`}
                        type="tel"
                        placeholder="+962 7X XXX XXXX"
                        {...form.register(`participants.${index}.phoneNumber`)}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor={`email-${index}`}>Email</Label>
                      <Input
                        id={`email-${index}`}
                        type="email"
                        placeholder="email@example.com"
                        {...form.register(`participants.${index}.email`)}
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

          <Separator />

          <div className="flex justify-between items-center">
            <div>
              <p className="font-semibold">Total Price:</p>
              <p className="text-lg font-bold text-primary">
                {new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "JOD",
                }).format(trip.price * ticketCount)}
              </p>
            </div>

            <div className="space-x-2">
              <Button
                type="button"
                variant="outline"
                onClick={onOpenTripDetails}
              >
                Back to Trip
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Processing..." : "Confirm Booking"}
              </Button>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default BookingDialog;
