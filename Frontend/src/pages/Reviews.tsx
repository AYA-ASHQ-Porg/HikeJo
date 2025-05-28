
import { useState, useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarClock } from "lucide-react";

// This page is a placeholder for the Reviews feature
// In a real application, we would implement real review functionality

const Reviews = () => {
  const { isAuthenticated, userType } = useAuth();
  const navigate = useNavigate();

  // Redirect if not authenticated or not a company
  useEffect(() => {
    if (!isAuthenticated || userType !== "company") {
      navigate('/');
    }
  }, [isAuthenticated, userType, navigate]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow bg-background py-16 px-4">
        <div className="container mx-auto max-w-5xl">
          <h1 className="text-3xl font-serif font-bold mb-8">Reviews & Feedback</h1>
          
          <div className="text-center py-12 border border-dashed border-border rounded-lg mb-8">
            <CalendarClock className="mx-auto h-12 w-12 text-muted-foreground mb-3" />
            <h3 className="text-lg font-medium mb-1">No reviews yet</h3>
            <p className="text-muted-foreground">
              Reviews will appear here after customers complete their hiking trips.
            </p>
          </div>
          
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>About Reviews</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  The review system allows adventurers to share their experiences after completing trips.
                  Reviews help improve your services and attract more customers. 
                  Once your trips are completed, customers will be invited to leave reviews rating various aspects
                  of their experience.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Coming Soon</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  <li>Detailed ratings on different aspects of the trip</li>
                  <li>Photo uploads from customers</li>
                  <li>Ability to respond to reviews</li>
                  <li>Review insights and analytics</li>
                  <li>Showcase top reviews on your trips</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Reviews;
