import { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Building } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useAuth } from "@/context/AuthContext";
import { getCompanies } from "@/api";

interface Company {
  _id: string;
  companyName: string;
  location: string;
  website?: string;
  aboutCompany?: string;
}

const Companies = () => {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const { user } = useAuth();

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        if (!user?.token) return;

        const res = await getCompanies(user.token);
        setCompanies(res.data.data);
      } catch (error) {
        console.error("Error fetching companies:", error);
        toast({
          title: "Error",
          description: "Failed to load companies. Please try again later.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchCompanies();
  }, [toast, user]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="container mx-auto px-4 py-8 flex-grow">
          <h1 className="text-3xl font-bold mb-6">Companies</h1>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Card key={i} className="animate-pulse">
                <CardHeader className="h-24 bg-muted"></CardHeader>
                <CardContent className="h-32 mt-2">
                  <div className="h-4 bg-muted rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-muted rounded w-1/2"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="container mx-auto px-4 py-8 flex-grow">
        <h1 className="text-3xl font-bold mb-6">Hiking Companies in Jordan</h1>
        <p className="text-muted-foreground mb-8">
          Discover trusted hiking and adventure companies across Jordan.
        </p>

        {companies.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-lg text-muted-foreground">No companies found.</p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {companies.map((company) => (
              <Card
                key={company._id}
                className="transition-all hover:shadow-md"
              >
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-2 mb-2">
                    <Building className="h-5 w-5 text-primary" />
                    <CardTitle className="text-xl">
                      {company.companyName}
                    </CardTitle>
                  </div>
                  <CardDescription>{company.location}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-2">
                    {company.aboutCompany ||
                      "Provider of outdoor adventures in Jordan."}
                  </p>
                  {company.website && (
                    <p className="text-sm">
                      <span className="font-medium">Website: </span>
                      <a
                        href={company.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 underline"
                      >
                        {company.website}
                      </a>
                    </p>
                  )}
                </CardContent>
                <CardFooter>
                  <Button asChild className="w-full">
                    <Link to={`/?company=${company._id}`}>View Trips</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Companies;
