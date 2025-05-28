import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Menu,
  X,
  User,
  Building,
  Home,
  Info,
  Mail,
  Calendar,
  LogOut,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import LoginDialog from "@/components/auth/LoginDialog";
import SignupTypeDialog from "@/components/auth/SignupTypeDialog";
import { useAuth } from "@/context/AuthContext";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignupOpen, setIsSignupOpen] = useState(false);
  const { user, logout } = useAuth();
  const isAuthenticated = !!user;
  const userType = user?.type;

  const location = useLocation();
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  const getInitials = (name: string) => {
    return name ? name.charAt(0).toUpperCase() : "U";
  };

  const renderNavLinks = () => (
    <div className="flex flex-col space-y-4">
      <Link
        to="/"
        className="text-foreground hover:text-primary transition-colors py-2 flex items-center gap-2"
      >
        <Home size={20} /> Home
      </Link>
      <Link
        to="/about"
        className="text-foreground hover:text-primary transition-colors py-2 flex items-center gap-2"
      >
        <Info size={20} /> About Us
      </Link>

      {isAuthenticated && (
        <Link
          to="/contact"
          className="text-foreground hover:text-primary transition-colors py-2 flex items-center gap-2"
        >
          <Mail size={20} /> Contact Us
        </Link>
      )}

      {isAuthenticated && userType === "adventurer" && (
        <>
          <Link
            to="/my-hikes"
            className="text-foreground hover:text-primary transition-colors py-2 flex items-center gap-2"
          >
            <Calendar size={20} /> My Hikes
          </Link>
          <Link
            to="/companies"
            className="text-foreground hover:text-primary transition-colors py-2 flex items-center gap-2"
          >
            <Building size={20} /> Companies
          </Link>
        </>
      )}

      {isAuthenticated && (
        <>
          <Link
            to="/profile"
            className="text-foreground hover:text-primary transition-colors py-2 flex items-center gap-2"
          >
            <User size={20} /> Profile
          </Link>
          <button
            onClick={logout}
            className="text-foreground hover:text-primary transition-colors py-2 flex items-center gap-2 w-full text-left"
          >
            <LogOut size={20} /> Log Out
          </button>
        </>
      )}
    </div>
  );

  return (
    <nav className="bg-background border-b border-border py-4">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center">
            <h1 className="text-2xl font-serif font-bold text-primary">
              <span className="text-accent">Hike</span>Jo
            </h1>
          </Link>

          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <div className="flex items-center gap-3">
                <Link to="/profile" className="flex items-center gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="" alt={user?.name} />
                    <AvatarFallback>
                      {user?.name ? getInitials(user.name) : "U"}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-sm font-medium hidden md:inline-block">
                    {user?.name ||
                      (userType === "company" ? "Company" : "User")}
                  </span>
                </Link>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Button variant="ghost" onClick={() => setIsLoginOpen(true)}>
                  <User size={20} className="mr-1" />
                  <span className="hidden md:inline">Log In</span>
                </Button>
                <Button variant="default" onClick={() => setIsSignupOpen(true)}>
                  <span>Sign Up</span>
                </Button>
              </div>
            )}

            <ThemeToggle />

            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:flex">
                  <Menu size={24} />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px]">
                <SheetHeader>
                  <SheetTitle>Navigation</SheetTitle>
                </SheetHeader>
                <div className="py-6">{renderNavLinks()}</div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>

      <LoginDialog
        open={isLoginOpen}
        onOpenChange={setIsLoginOpen}
        onSignupClick={() => {
          setIsLoginOpen(false);
          setIsSignupOpen(true);
        }}
      />

      <SignupTypeDialog
        open={isSignupOpen}
        onOpenChange={setIsSignupOpen}
        onLoginClick={() => {
          setIsSignupOpen(false);
          setIsLoginOpen(true);
        }}
      />
    </nav>
  );
};

export default Navbar;
