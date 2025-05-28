
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import AdventurerSignupDialog from "./AdventurerSignupDialog";
import CompanySignupDialog from "./CompanySignupDialog";

interface SignupTypeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onLoginClick: () => void;
}

const SignupTypeDialog = ({ open, onOpenChange, onLoginClick }: SignupTypeDialogProps) => {
  const [showAdventurerSignup, setShowAdventurerSignup] = useState(false);
  const [showCompanySignup, setShowCompanySignup] = useState(false);

  const handleAdventurerClick = () => {
    onOpenChange(false);
    setShowAdventurerSignup(true);
  };

  const handleCompanyClick = () => {
    onOpenChange(false);
    setShowCompanySignup(true);
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-center">Sign Up</DialogTitle>
          </DialogHeader>
          
          <div className="py-6 flex flex-col space-y-4">
            <p className="text-center text-muted-foreground">Choose your account type:</p>
            
            <Button 
              onClick={handleAdventurerClick}
              className="h-16 text-lg"
            >
              I'm an Adventurer
            </Button>
            
            <Button 
              onClick={handleCompanyClick}
              variant="outline"
              className="h-16 text-lg"
            >
              I'm a Hiking Company
            </Button>
          </div>

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

      <AdventurerSignupDialog
        open={showAdventurerSignup}
        onOpenChange={setShowAdventurerSignup}
        onLoginClick={onLoginClick}
      />

      <CompanySignupDialog
        open={showCompanySignup}
        onOpenChange={setShowCompanySignup}
        onLoginClick={onLoginClick}
      />
    </>
  );
};

export default SignupTypeDialog;
