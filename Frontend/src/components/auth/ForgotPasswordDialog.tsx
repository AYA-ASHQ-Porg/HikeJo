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
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/context/AuthContext";
import VerifyCodeDialog from "./VerifyCodeDialog";
import { resetPasswordRequest } from "@/api";

interface ForgotPasswordDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onLoginClick: () => void;
}

const emailSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email" }),
});

type EmailFormValues = z.infer<typeof emailSchema>;

const ForgotPasswordDialog = ({
  open,
  onOpenChange,
  onLoginClick,
}: ForgotPasswordDialogProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [showVerifyCode, setShowVerifyCode] = useState(false);
  const [email, setEmail] = useState("");
  //const { resetPassword } = useAuth();

  const form = useForm<EmailFormValues>({
    resolver: zodResolver(emailSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data: EmailFormValues) => {
    setIsLoading(true);
    setErrorMessage(null);

    try {
      await resetPasswordRequest(data.email);
      setEmail(data.email);
      onOpenChange(false);
      setShowVerifyCode(true);
      form.reset();
    } catch (error) {
      setErrorMessage("Unable to send reset code. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-center">
              Forgot Password
            </DialogTitle>
          </DialogHeader>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 pt-4"
          >
            {errorMessage && (
              <div className="p-3 bg-destructive/10 text-destructive rounded-md text-sm">
                {errorMessage}
              </div>
            )}

            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">
                Enter your email address and we'll send you a code to reset your
                password.
              </p>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                {...form.register("email")}
              />
              {form.formState.errors.email && (
                <p className="text-destructive text-sm">
                  {form.formState.errors.email.message}
                </p>
              )}
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Sending..." : "Send Reset Code"}
            </Button>
          </form>

          <DialogFooter className="flex flex-col sm:flex-row sm:justify-center sm:space-x-2">
            <span className="text-center text-sm">
              Remember your password?{" "}
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

      <VerifyCodeDialog
        open={showVerifyCode}
        onOpenChange={setShowVerifyCode}
        email={email}
        onLoginClick={onLoginClick}
      />
    </>
  );
};

export default ForgotPasswordDialog;
