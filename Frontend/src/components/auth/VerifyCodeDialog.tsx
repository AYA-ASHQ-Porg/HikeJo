import { useState, useEffect } from "react";
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
import NewPasswordDialog from "./NewPasswordDialog";
import { verifyResetCode } from "@/api";

interface VerifyCodeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  email: string;
  onLoginClick: () => void;
}

const codeSchema = z.object({
  code: z
    .string()
    .min(6, { message: "Please enter a valid verification code" }),
});

type CodeFormValues = z.infer<typeof codeSchema>;

const VerifyCodeDialog = ({
  open,
  onOpenChange,
  email,
  onLoginClick,
}: VerifyCodeDialogProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [countdown, setCountdown] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const [verifiedCode, setVerifiedCode] = useState("");

  const form = useForm<CodeFormValues>({
    resolver: zodResolver(codeSchema),
    defaultValues: {
      code: "",
    },
  });

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (open && countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    } else if (countdown === 0) {
      setCanResend(true);
    }
    return () => clearTimeout(timer);
  }, [countdown, open]);

  const onSubmit = async (data: CodeFormValues) => {
    setIsLoading(true);
    setErrorMessage(null);

    try {
      await verifyResetCode(email, data.code);

      setVerifiedCode(data.code);
      onOpenChange(false);
      setShowNewPassword(true);
      form.reset();
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        "Invalid verification code. Please try again.";
      setErrorMessage(message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendCode = async () => {
    if (!canResend) return;

    setIsLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      setCountdown(60);
      setCanResend(false);
      setErrorMessage(null);
    } catch (error) {
      setErrorMessage("Failed to resend code. Please try again.");
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
              Verify Code
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
                We've sent a verification code to{" "}
                <span className="font-medium">{email}</span>. Please enter the
                code below.
              </p>
              <Label htmlFor="code">Verification Code</Label>
              <Input
                id="code"
                type="text"
                placeholder="Enter 6-digit code"
                autoComplete="one-time-code"
                {...form.register("code")}
              />
              {form.formState.errors.code && (
                <p className="text-destructive text-sm">
                  {form.formState.errors.code.message}
                </p>
              )}
            </div>

            <div className="flex justify-between items-center">
              <Button
                type="button"
                variant="outline"
                onClick={handleResendCode}
                disabled={!canResend || isLoading}
              >
                {canResend ? "Resend Code" : `Resend in ${countdown}s`}
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Verifying..." : "Verify"}
              </Button>
            </div>
          </form>

          <DialogFooter className="flex flex-col sm:flex-row sm:justify-center sm:space-x-2">
            <Button type="button" variant="link" onClick={onLoginClick}>
              Back to login
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <NewPasswordDialog
        open={showNewPassword}
        onOpenChange={setShowNewPassword}
        email={email}
        code={verifiedCode}
        onLoginClick={onLoginClick}
      />
    </>
  );
};

export default VerifyCodeDialog;
