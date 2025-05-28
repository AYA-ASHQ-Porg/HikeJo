import { useState } from "react";
import { useForm } from "react-hook-form";
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
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Trip } from "@/types/trip";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/components/ui/use-toast";
import { createTrip } from "@/api";

interface AddTripDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddTrip: (trip: Trip) => void;
}

const tripSchema = z.object({
  title: z.string().min(3, { message: "Title must be at least 3 characters" }),
  startLocation: z
    .string()
    .min(3, { message: "Start location must be at least 3 characters" }),
  endLocation: z
    .string()
    .min(3, { message: "End location must be at least 3 characters" }),
  price: z
    .string()
    .refine((value) => !isNaN(parseFloat(value)) && parseFloat(value) >= 0, {
      message: "Price must be a positive number",
    }),
  description: z
    .string()
    .min(10, { message: "Description must be at least 10 characters" }),
  ageRequired: z
    .string()
    .refine((value) => !isNaN(parseInt(value)) && parseInt(value) >= 0, {
      message: "Age must be a positive number",
    }),
  maxParticipants: z
    .string()
    .refine((value) => !isNaN(parseInt(value)) && parseInt(value) > 0, {
      message: "Max participants must be a positive number",
    }),
  path: z.string().min(5, { message: "Path must be at least 5 characters" }),
  companyPhoneNumber: z
    .string()
    .min(10, { message: "Phone number must be at least 10 characters" }),
  maxTicketsPerBooking: z
    .string()
    .refine(
      (value) =>
        !isNaN(parseInt(value)) && parseInt(value) > 0 && parseInt(value) <= 3,
      {
        message: "Max tickets per booking must be between 1 and 3",
      }
    ),
  date: z.string().min(1, { message: "Date is required" }),
  imageUrl: z.string().optional(),
  difficultyLevel: z.enum(["easy", "moderate", "hard", "expert"], {
    required_error: "Difficulty level is required",
  }),
});

type TripFormValues = z.infer<typeof tripSchema>;

const AddTripDialog = ({
  open,
  onOpenChange,
  onAddTrip,
}: AddTripDialogProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();

  const form = useForm<TripFormValues>({
    resolver: zodResolver(tripSchema),
    defaultValues: {
      title: "",
      startLocation: "",
      endLocation: "",
      price: "",
      description: "",
      ageRequired: "",
      maxParticipants: "",
      path: "",
      companyPhoneNumber: "",
      maxTicketsPerBooking: "",
      date: "",
      imageUrl: "",
      difficultyLevel: "easy",
    },
  });

  const onSubmit = async (data: TripFormValues) => {
    setIsLoading(true);
    try {
      const tripData = {
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
        imageUrl:
          data.imageUrl ||
          "https://images.unsplash.com/photo-1469474968028-56623f02e42e",
        difficultyLevel: data.difficultyLevel,
        companyId: user?.id || "",
        companyName: user?.name || "",
      };

      const res = await createTrip(tripData, user?.token || "");

      onAddTrip();

      onOpenChange(false);
      form.reset();

      toast({
        title: "Trip added successfully!",
        description:
          "Your trip has been added and is now available for adventurers to book.",
      });
    } catch (error) {
      toast({
        title: "Failed to add trip.",
        description: error.response?.data?.message || "Error adding trip.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[550px] max-h-[90vh] overflow-y-scroll">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">
            Add a New Trip
          </DialogTitle>
          <DialogDescription className="text-center">
            Fill in the details below to create a new adventure for our users.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 pt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">Trip Title</Label>
              <Input
                id="title"
                placeholder="Enter trip title"
                {...form.register("title")}
              />
              {form.formState.errors.title && (
                <p className="text-destructive text-sm">
                  {form.formState.errors.title.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="date">Date</Label>
              <Input type="date" id="date" {...form.register("date")} />
              {form.formState.errors.date && (
                <p className="text-destructive text-sm">
                  {form.formState.errors.date.message}
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="startLocation">Starting Point</Label>
              <Input
                id="startLocation"
                placeholder="Where does the trip start?"
                {...form.register("startLocation")}
              />
              {form.formState.errors.startLocation && (
                <p className="text-destructive text-sm">
                  {form.formState.errors.startLocation.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="endLocation">Finishing Point</Label>
              <Input
                id="endLocation"
                placeholder="Where does the trip end?"
                {...form.register("endLocation")}
              />
              {form.formState.errors.endLocation && (
                <p className="text-destructive text-sm">
                  {form.formState.errors.endLocation.message}
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="price">Price (JOD)</Label>
              <Input
                id="price"
                placeholder="Enter price in JOD"
                type="number"
                min="0"
                step="0.01"
                {...form.register("price")}
              />
              {form.formState.errors.price && (
                <p className="text-destructive text-sm">
                  {form.formState.errors.price.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="ageRequired">Minimum Age Required</Label>
              <Input
                id="ageRequired"
                placeholder="Minimum age for participants"
                type="number"
                min="0"
                {...form.register("ageRequired")}
              />
              {form.formState.errors.ageRequired && (
                <p className="text-destructive text-sm">
                  {form.formState.errors.ageRequired.message}
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="maxParticipants">Maximum Participants</Label>
              <Input
                id="maxParticipants"
                placeholder="Maximum number of participants"
                type="number"
                min="1"
                {...form.register("maxParticipants")}
              />
              {form.formState.errors.maxParticipants && (
                <p className="text-destructive text-sm">
                  {form.formState.errors.maxParticipants.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="maxTicketsPerBooking">
                Max Tickets Per Booking (1-3)
              </Label>
              <Input
                id="maxTicketsPerBooking"
                placeholder="Maximum tickets per booking"
                type="number"
                min="1"
                max="3"
                {...form.register("maxTicketsPerBooking")}
              />
              {form.formState.errors.maxTicketsPerBooking && (
                <p className="text-destructive text-sm">
                  {form.formState.errors.maxTicketsPerBooking.message}
                </p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="path">Trip Path/Route</Label>
            <Input
              id="path"
              placeholder="Describe the trip path/route"
              {...form.register("path")}
            />
            {form.formState.errors.path && (
              <p className="text-destructive text-sm">
                {form.formState.errors.path.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Trip Description</Label>
            <Textarea
              id="description"
              placeholder="Describe the trip"
              {...form.register("description")}
            />
            {form.formState.errors.description && (
              <p className="text-destructive text-sm">
                {form.formState.errors.description.message}
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="companyPhoneNumber">Company Phone Number</Label>
              <Input
                id="companyPhoneNumber"
                placeholder="Enter company phone number"
                {...form.register("companyPhoneNumber")}
              />
              {form.formState.errors.companyPhoneNumber && (
                <p className="text-destructive text-sm">
                  {form.formState.errors.companyPhoneNumber.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="imageUrl">Image URL (Optional)</Label>
              <Input
                id="imageUrl"
                placeholder="Enter image URL"
                {...form.register("imageUrl")}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="difficultyLevel">Difficulty Level</Label>
            <Select
              onValueChange={(value) =>
                form.setValue(
                  "difficultyLevel",
                  value as "easy" | "moderate" | "hard" | "expert"
                )
              }
            >
              <SelectTrigger>
                <SelectValue
                  placeholder="Select difficulty"
                  defaultValue={form.getValues().difficultyLevel}
                />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="easy">Easy</SelectItem>
                <SelectItem value="moderate">Moderate</SelectItem>
                <SelectItem value="hard">Hard</SelectItem>
                <SelectItem value="expert">Expert</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Adding Trip..." : "Add Trip"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddTripDialog;
