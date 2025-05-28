// src/components/auth/AdventurerSignupDialog.tsx
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useAuth } from "@/context/AuthContext";
import { Link } from "react-router-dom";

interface AdventurerSignupDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onLoginClick: () => void;
}

// Schema validation
const adventurerSchema = z.object({
  firstName: z.string().min(1, { message: "First name is required" }),
  lastName: z.string().min(1, { message: "Last name is required" }),
  gender: z.enum(["male", "female"], { message: "Please select a gender" }),
  age: z.string().refine(
    (val) => {
      const num = parseInt(val);
      return !isNaN(num) && num >= 18 && num <= 120;
    },
    { message: "You must be at least 18 years old" }
  ),
  email: z.string().email({ message: "Please enter a valid email" }),
  phoneNumber: z
    .string()
    .min(10, { message: "Please enter a valid phone number" }),
  city: z.string().min(1, { message: "City is required" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
});

type AdventurerFormValues = z.infer<typeof adventurerSchema>;

const jordanianCities = [
  "Amman",
  "Zarqa",
  "Irbid",
  "Aqaba",
  "Madaba",
  "Jerash",
  "Salt",
  "Ajloun",
  "Karak",
  "Ma'an",
  "Tafilah",
  "Mafraq",
  "Other",
];

const AdventurerSignupDialog = ({
  open,
  onOpenChange,
  onLoginClick,
}: AdventurerSignupDialogProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const { signup } = useAuth();

  const form = useForm<AdventurerFormValues>({
    resolver: zodResolver(adventurerSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      gender: "male",
      age: "",
      email: "",
      phoneNumber: "",
      city: "",
      password: "",
    },
  });

  const onSubmit = async (data: AdventurerFormValues) => {
    setIsLoading(true);
    setErrorMessage(null);

    try {
      await signup(
        {
          firstName: data.firstName,
          lastName: data.lastName,
          name: `${data.firstName} ${data.lastName}`,
          gender: data.gender,
          age: parseInt(data.age),
          email: data.email,
          phoneNumber: data.phoneNumber,
          city: data.city,
          type: "adventurer",
        },
        data.password
      );

      onOpenChange(false);
      form.reset();
    } catch (error) {
      setErrorMessage(
        error.message || "Failed to create account. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">
            Adventurer Sign Up
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 pt-4">
          {errorMessage && (
            <div className="p-3 bg-destructive/10 text-destructive rounded-md text-sm">
              {errorMessage}
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="firstName">First Name</Label>
              <Input id="firstName" {...form.register("firstName")} />
              {form.formState.errors.firstName && (
                <p className="text-destructive text-sm">
                  {form.formState.errors.firstName.message}
                </p>
              )}
            </div>
            <div>
              <Label htmlFor="lastName">Last Name</Label>
              <Input id="lastName" {...form.register("lastName")} />
              {form.formState.errors.lastName && (
                <p className="text-destructive text-sm">
                  {form.formState.errors.lastName.message}
                </p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label>Gender</Label>
            <RadioGroup
              defaultValue="male"
              onValueChange={(val) =>
                form.setValue("gender", val as "male" | "female")
              }
            >
              <div className="flex space-x-4">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="male" id="male" />
                  <Label htmlFor="male">Male</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="female" id="female" />
                  <Label htmlFor="female">Female</Label>
                </div>
              </div>
            </RadioGroup>
            {form.formState.errors.gender && (
              <p className="text-destructive text-sm">
                {form.formState.errors.gender.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="age">Age</Label>
            <Input id="age" type="number" {...form.register("age")} />
            {form.formState.errors.age && (
              <p className="text-destructive text-sm">
                {form.formState.errors.age.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="city">City</Label>
            <select
              className="w-full p-2 border rounded-md"
              {...form.register("city")}
            >
              {jordanianCities.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
            {form.formState.errors.city && (
              <p className="text-destructive text-sm">
                {form.formState.errors.city.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" {...form.register("email")} />
            {form.formState.errors.email && (
              <p className="text-destructive text-sm">
                {form.formState.errors.email.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="phoneNumber">Phone Number</Label>
            <Input
              id="phoneNumber"
              type="tel"
              {...form.register("phoneNumber")}
            />
            {form.formState.errors.phoneNumber && (
              <p className="text-destructive text-sm">
                {form.formState.errors.phoneNumber.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                {...form.register("password")}
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute top-0 right-0 h-full px-3"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </Button>
            </div>
            {form.formState.errors.password && (
              <p className="text-destructive text-sm">
                {form.formState.errors.password.message}
              </p>
            )}
          </div>

          <div className="text-sm text-muted-foreground">
            By signing up, you agree to our{" "}
            <Link to="/terms" className="text-primary underline">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link to="/privacy" className="text-primary underline">
              Privacy Policy
            </Link>
            .
          </div>

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Creating Account..." : "Create Account"}
          </Button>
        </form>

        <DialogFooter className="flex flex-col sm:flex-row sm:justify-center sm:space-x-2">
          <span className="text-center text-sm">
            Already have an account?{" "}
            <Button
              type="button"
              variant="link"
              className="p-0"
              onClick={onLoginClick}
            >
              Log in
            </Button>
          </span>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AdventurerSignupDialog;
