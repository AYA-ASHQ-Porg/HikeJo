// src/components/auth/CompanySignupDialog.tsx

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
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { useAuth } from "@/context/AuthContext";
import { Link } from "react-router-dom";

// Props passed from SignupTypeDialog
interface CompanySignupDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onLoginClick: () => void;
}

// Form schema using zod
const companySchema = z.object({
  companyName: z.string().min(1, { message: "Company name is required" }),
  companyId: z.string().min(1, { message: "Company ID is required" })
    .refine((val) => {
      const num = parseInt(val);
      return !isNaN(num) && num > 0;
    }, { message: "Please enter a valid company ID" }),
  phoneNumber: z.string().min(10, { message: "Please enter a valid phone number" }),
  email: z.string().email({ message: "Please enter a valid email" }),
  location: z.string().min(1, { message: "Location is required" }),
  yearsInBusiness: z.string().min(1, { message: "Years in business is required" })
    .refine((val) => {
      const num = parseInt(val);
      return !isNaN(num) && num >= 0 && num <= 100;
    }, { message: "Please enter a valid number" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

// Type for form values
type CompanyFormValues = z.infer<typeof companySchema>;

// Dropdown options
const jordanianCities = [
  "Amman", "Zarqa", "Irbid", "Aqaba", "Madaba",
  "Jerash", "Salt", "Ajloun", "Karak", "Ma'an",
  "Tafilah", "Mafraq", "Other"
];

const CompanySignupDialog = ({ open, onOpenChange, onLoginClick }: CompanySignupDialogProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { signup } = useAuth();

  const form = useForm<CompanyFormValues>({
    resolver: zodResolver(companySchema),
    defaultValues: {
      companyName: "",
      companyId: "",
      phoneNumber: "",
      email: "",
      location: "",
      yearsInBusiness: "",
      password: "",
      confirmPassword: "",
    },
  });

  // Submit handler to send data to backend
  const onSubmit = async (data: CompanyFormValues) => {
    setIsLoading(true);
    setErrorMessage(null);

    try {
      // Use signup function from AuthContext
      await signup({
        companyName: data.companyName,
        name: data.companyName,
        companyId: data.companyId,
        phoneNumber: data.phoneNumber,
        email: data.email,
        location: data.location,
        yearsInBusiness: parseInt(data.yearsInBusiness),
        type: "company",
        // Provide dummy/default values for required fields not used by companies
        firstName: "",
        lastName: "",
        gender: "male",
        age: 0,
        city: "",
      }, data.password);

      onOpenChange(false);
      form.reset();
    } catch (error) {
      setErrorMessage(error.message || "Failed to create account. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">Company Sign Up</DialogTitle>
        </DialogHeader>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 pt-4">
          {errorMessage && (
            <div className="p-3 bg-destructive/10 text-destructive rounded-md text-sm">
              {errorMessage}
            </div>
          )}

          {/* Company Name */}
          <div className="space-y-2">
            <Label htmlFor="companyName">Company Name</Label>
            <Input id="companyName" {...form.register("companyName")} />
            {form.formState.errors.companyName && (
              <p className="text-destructive text-sm">{form.formState.errors.companyName.message}</p>
            )}
          </div>

          {/* Company ID */}
          <div className="space-y-2">
            <Label htmlFor="companyId">Company ID</Label>
            <Input id="companyId" {...form.register("companyId")} />
            {form.formState.errors.companyId && (
              <p className="text-destructive text-sm">{form.formState.errors.companyId.message}</p>
            )}
          </div>

          {/* Location and Years in Business */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Select
                onValueChange={(value) => form.setValue("location", value)}
                defaultValue={form.getValues("location")}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select location" />
                </SelectTrigger>
                <SelectContent>
                  {jordanianCities.map((city) => (
                    <SelectItem key={city} value={city}>
                      {city}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {form.formState.errors.location && (
                <p className="text-destructive text-sm">{form.formState.errors.location.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="yearsInBusiness">Years in Business</Label>
              <Input
                id="yearsInBusiness"
                type="number"
                min="0"
                max="100"
                {...form.register("yearsInBusiness")}
              />
              {form.formState.errors.yearsInBusiness && (
                <p className="text-destructive text-sm">{form.formState.errors.yearsInBusiness.message}</p>
              )}
            </div>
          </div>

          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" {...form.register("email")} />
            {form.formState.errors.email && (
              <p className="text-destructive text-sm">{form.formState.errors.email.message}</p>
            )}
          </div>

          {/* Phone Number */}
          <div className="space-y-2">
            <Label htmlFor="phoneNumber">Phone Number</Label>
            <Input id="phoneNumber" type="tel" {...form.register("phoneNumber")} />
            {form.formState.errors.phoneNumber && (
              <p className="text-destructive text-sm">{form.formState.errors.phoneNumber.message}</p>
            )}
          </div>

          {/* Password & Confirm Password */}
          <div className="grid grid-cols-2 gap-4">
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
                <p className="text-destructive text-sm">{form.formState.errors.password.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  {...form.register("confirmPassword")}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute top-0 right-0 h-full px-3"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </Button>
              </div>
              {form.formState.errors.confirmPassword && (
                <p className="text-destructive text-sm">{form.formState.errors.confirmPassword.message}</p>
              )}
            </div>
          </div>

          {/* Terms agreement */}
          <div className="text-sm text-muted-foreground">
            By signing up, you agree to our{" "}
            <Link to="/terms" className="text-primary underline">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link to="/privacy" className="text-primary underline">
              Privacy Policy
            </Link>.
          </div>

          {/* Submit Button */}
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Creating Account..." : "Create Account"}
          </Button>
        </form>

        {/* Footer with login link */}
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

export default CompanySignupDialog;
