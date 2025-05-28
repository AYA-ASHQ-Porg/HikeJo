// src/components/auth/LoginDialog.tsx

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
import { useToast } from "@/hooks/use-toast";
import ForgotPasswordDialog from "./ForgotPasswordDialog";

// Props from parent to control dialog
interface LoginDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSignupClick: () => void;
}

// Dynamic schema generator based on user type
const createLoginSchema = (userType: "adventurer" | "company") => {
  const baseSchema = {
    password: z.string().min(6, { message: "Password must be at least 6 characters" }),
    userType: z.enum(["adventurer", "company"]),
  };

  if (userType === "adventurer") {
    return z.object({
      ...baseSchema,
      email: z.string().email({ message: "Please enter a valid email" }),
    });
  } else {
    return z.object({
      ...baseSchema,
      companyId: z.string().min(1, { message: "Company ID is required" })
        .refine((val) => {
          const num = parseInt(val);
          return !isNaN(num) && num > 0;
        }, { message: "Please enter a valid company ID" }),
    });
  }
};

type LoginFormValues =
  | { userType: "adventurer"; email: string; password: string }
  | { userType: "company"; companyId: string; password: string };

const LoginDialog = ({ open, onOpenChange, onSignupClick }: LoginDialogProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [userType, setUserType] = useState<"adventurer" | "company">("adventurer");

  const { login } = useAuth(); // use login function from context
  const { toast } = useToast();

  // Initialize form with zod validation
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(createLoginSchema(userType)),
    defaultValues: {
      userType: "adventurer",
      password: "",
    },
  });

  // Switch validation schema when user type changes
  const handleUserTypeChange = (value: "adventurer" | "company") => {
    setUserType(value);
    form.setValue("userType", value);
    form.clearErrors();
  };

  // Submit form to backend
  const onSubmit = async (data: LoginFormValues) => {
    setIsLoading(true);
    setErrorMessage(null);

    try {
      if (data.userType === "adventurer") {
        await login(data.email, data.password, "adventurer");
      } else {
        await login(data.companyId, data.password, "company");
      }

      onOpenChange(false);
      form.reset();

      toast({
        title: "Login successful",
        description: `Welcome back, ${data.userType}!`,
      });
    } catch (error) {
      setErrorMessage(error.message || "Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = () => {
    setShowForgotPassword(true);
    onOpenChange(false);
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-center">Log In</DialogTitle>
          </DialogHeader>

          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 pt-4">
            {errorMessage && (
              <div className="p-3 bg-destructive/10 text-destructive rounded-md text-sm">
                {errorMessage}
              </div>
            )}

            {/* User Type Selection */}
            <div className="space-y-2">
              <Label>I am a</Label>
              <RadioGroup
                defaultValue="adventurer"
                className="flex space-x-4"
                onValueChange={(value) => handleUserTypeChange(value as "adventurer" | "company")}
                value={form.watch("userType")}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="adventurer" id="adventurer" />
                  <Label htmlFor="adventurer" className="cursor-pointer">Adventurer</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="company" id="company" />
                  <Label htmlFor="company" className="cursor-pointer">Company</Label>
                </div>
              </RadioGroup>
            </div>

            {/* Email or Company ID Field */}
            {userType === "adventurer" ? (
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="you@example.com" {...form.register("email")} />
                {userType === "adventurer" &&
                  "email" in form.formState.errors &&
                  form.formState.errors.email && (
                    <p className="text-destructive text-sm">{form.formState.errors.email.message}</p>
                )}
              </div>
            ) : (
              <div className="space-y-2">
                <Label htmlFor="companyId">Company ID</Label>
                <Input id="companyId" type="text" placeholder="Enter your company ID" {...form.register("companyId")} />
                {"companyId" in form.formState.errors && form.formState.errors.companyId && (
                  <p className="text-destructive text-sm">{(form.formState.errors).companyId.message}</p>
                )}
              </div>
            )}

            {/* Password Field */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label htmlFor="password">Password</Label>
                <Button
                  type="button"
                  variant="link"
                  className="px-0 text-sm"
                  onClick={handleForgotPassword}
                >
                  Forgot password?
                </Button>
              </div>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
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

            {/* Submit Button */}
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Logging in..." : "Log In"}
            </Button>
          </form>

          {/* Footer with Sign Up Link */}
          <DialogFooter className="flex flex-col sm:flex-row sm:justify-center sm:space-x-2">
            <span className="text-center text-sm">
              Don’t have an account?{" "}
              <Button
                type="button"
                variant="link"
                className="p-0"
                onClick={onSignupClick}
              >
                Sign up
              </Button>
            </span>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Forgot Password Dialog */}
      <ForgotPasswordDialog
        open={showForgotPassword}
        onOpenChange={setShowForgotPassword}
        onLoginClick={() => {
          setShowForgotPassword(false);
          onOpenChange(true);
        }}
      />
    </>
  );
};

export default LoginDialog;
