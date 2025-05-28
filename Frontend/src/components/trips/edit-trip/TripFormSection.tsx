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
import { UseFormReturn } from "react-hook-form";
import { TripFormValues } from "./TripFormSchema";

interface TripFormSectionProps {
  form: UseFormReturn<TripFormValues>;
}

export const TripFormSection = ({ form }: TripFormSectionProps) => {
  return (
    <>
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
    </>
  );
};
