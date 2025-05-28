import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  fetchAdventurerProfile,
  updateAdventurerProfile,
  deleteAdventurerAccount,
  fetchCompanyProfile,
  updateCompanyProfile,
  deleteCompanyAccount,
} from "@/api";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";

// 2. Component Start
const Profile = () => {
  const { user, logout } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const isCompany = user?.type === "company";

  const form = useForm({
    defaultValues: isCompany
      ? {
          companyName: "",
          location: "",
          yearsInBusiness: "",
          phoneNumber: "",
          website: "",
          aboutCompany: "",
        }
      : {
          firstName: "",
          lastName: "",
          age: "",
          gender: "",
          phoneNumber: "",
          city: "",
        },
  });

  useEffect(() => {
    const getProfile = async () => {
      if (!user) {
        navigate("/");
        return;
      }

      try {
        const token = user?.token || localStorage.getItem("token");
        const res = isCompany
          ? await fetchCompanyProfile(token || "")
          : await fetchAdventurerProfile(token || "");

        setProfileData(res.data.data);

        form.reset(
          isCompany
            ? {
                companyName: res.data.data.companyName || "",
                location: res.data.data.location || "",
                yearsInBusiness:
                  res.data.data.yearsInBusiness?.toString() || "",
                phoneNumber: res.data.data.phoneNumber || "",
                website: res.data.data.website || "",
                aboutCompany: res.data.data.aboutCompany || "",
              }
            : {
                firstName: res.data.data.firstName || "",
                lastName: res.data.data.lastName || "",
                age: res.data.data.age?.toString() || "",
                gender: res.data.data.gender || "",
                phoneNumber: res.data.data.phoneNumber || "",
                city: res.data.data.city || "",
              }
        );
      } catch (err) {
        console.error("Error loading profile:", err);
      }
    };

    getProfile();
  }, [user, navigate]);

  const handleUpdate = async (values) => {
    try {
      const token = user?.token || localStorage.getItem("token");
      const updatedRes = isCompany
        ? await updateCompanyProfile(values, token || "")
        : await updateAdventurerProfile(values, token || "");
      setProfileData(updatedRes.data.data);
      toast({
        title: "Profile updated",
        description: "Your info has been saved.",
      });
    } catch (error) {
      console.error("Update error:", error);
      toast({
        title: "Error",
        description: "Failed to update profile.",
        variant: "destructive",
      });
    }
  };

  if (!user || !profileData) {
    return (
      <div className="text-center mt-10 text-gray-500">Loading profile...</div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="container mx-auto py-8 px-4 md:px-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Profile</h1>

          <Tabs defaultValue="info">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="info">Account Information</TabsTrigger>
              <TabsTrigger value="edit">Edit Profile</TabsTrigger>
            </TabsList>

            <TabsContent value="info">
              <Card>
                <CardHeader>
                  <CardTitle>
                    {isCompany ? "Company Information" : "Personal Information"}
                  </CardTitle>
                  <CardDescription>View your account details.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {isCompany ? (
                      <>
                        <div>
                          <strong>Company Name:</strong>{" "}
                          {profileData.companyName}
                        </div>
                        <div>
                          <strong>Email:</strong> {profileData.email}
                        </div>
                        <div>
                          <strong>Phone Number:</strong>{" "}
                          {profileData.phoneNumber}
                        </div>
                        <div>
                          <strong>Location:</strong> {profileData.location}
                        </div>
                        <div>
                          <strong>Years in Business:</strong>{" "}
                          {profileData.yearsInBusiness}
                        </div>
                        {profileData.website && (
                          <div>
                            <strong>Website:</strong> {profileData.website}
                          </div>
                        )}
                        {profileData.aboutCompany && (
                          <div className="md:col-span-2">
                            <strong>About:</strong> {profileData.aboutCompany}
                          </div>
                        )}
                      </>
                    ) : (
                      <>
                        <div>
                          <strong>Full Name:</strong> {profileData.firstName}{" "}
                          {profileData.lastName}
                        </div>
                        <div>
                          <strong>Email:</strong> {profileData.email}
                        </div>
                        <div>
                          <strong>Phone Number:</strong>{" "}
                          {profileData.phoneNumber}
                        </div>
                        <div>
                          <strong>City:</strong> {profileData.city}
                        </div>
                        <div>
                          <strong>Age:</strong> {profileData.age}
                        </div>
                        <div>
                          <strong>Gender:</strong> {profileData.gender}
                        </div>
                      </>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="edit">
              <Card>
                <CardHeader>
                  <CardTitle>Edit Profile</CardTitle>
                </CardHeader>
                <CardContent>
                  <form
                    onSubmit={form.handleSubmit(handleUpdate)}
                    className="space-y-4"
                  >
                    {isCompany ? (
                      <>
                        <Input
                          placeholder="Company Name"
                          {...form.register("companyName")}
                        />
                        <Input
                          placeholder="Location"
                          {...form.register("location")}
                        />
                        <Input
                          placeholder="Years in Business"
                          type="number"
                          {...form.register("yearsInBusiness")}
                        />
                        <Input
                          placeholder="Phone Number"
                          {...form.register("phoneNumber")}
                        />
                        <Input
                          placeholder="Website"
                          {...form.register("website")}
                        />
                        <Input
                          placeholder="About Company"
                          {...form.register("aboutCompany")}
                        />
                      </>
                    ) : (
                      <>
                        <Input
                          placeholder="First Name"
                          {...form.register("firstName")}
                        />
                        <Input
                          placeholder="Last Name"
                          {...form.register("lastName")}
                        />
                        <Input
                          placeholder="Age"
                          type="number"
                          {...form.register("age")}
                        />
                        <Input
                          placeholder="Gender"
                          {...form.register("gender")}
                        />
                        <Input
                          placeholder="Phone Number"
                          {...form.register("phoneNumber")}
                        />
                        <Input placeholder="City" {...form.register("city")} />
                      </>
                    )}
                    <div className="flex justify-end">
                      <Button type="submit">Save Changes</Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <Card className="mt-8 border-destructive/50">
            <CardHeader>
              <CardTitle className="text-destructive">Danger Zone</CardTitle>
              <CardDescription>This action cannot be undone.</CardDescription>
            </CardHeader>
            <CardContent>
              <Button
                variant="destructive"
                onClick={() => setShowDeleteDialog(true)}
              >
                Delete Account
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      <DeleteAccountDialog
        open={showDeleteDialog}
        onOpenChange={setShowDeleteDialog}
        onConfirm={async () => {
          try {
            const token = user?.token || localStorage.getItem("token");
            if (isCompany) {
              await deleteCompanyAccount(token || "");
            } else {
              await deleteAdventurerAccount(token || "");
            }
            toast({
              title: "Account deleted",
              description: "Your account has been permanently deleted.",
            });
            logout();
            navigate("/");
          } catch (error) {
            toast({
              title: "Error",
              description: "Failed to delete account. Please try again.",
              variant: "destructive",
            });
          }
        }}
      />

      <Footer />
    </>
  );
};

// 3. DeleteAccountDialog Component
const DeleteAccountDialog = ({
  open,
  onOpenChange,
  onConfirm,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
}) => {
  const [confirmText, setConfirmText] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = async () => {
    setIsLoading(true);
    await onConfirm();
    setIsLoading(false);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-destructive">Delete Account</DialogTitle>
          <DialogDescription>
            This action cannot be undone. Please type <strong>DELETE</strong> to
            confirm.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-2">
          <Input
            value={confirmText}
            onChange={(e) => setConfirmText(e.target.value)}
            placeholder="DELETE"
            className="border-destructive"
          />
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            variant="destructive"
            disabled={confirmText !== "DELETE" || isLoading}
            onClick={handleDelete}
          >
            {isLoading ? "Deleting..." : "Delete Account"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default Profile;
