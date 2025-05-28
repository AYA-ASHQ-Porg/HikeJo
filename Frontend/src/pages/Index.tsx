import { useState } from "react";
import { useLocation } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { useTrips } from "@/hooks/useTrips";

// Components
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/trips/HeroSection";
import CompanyHeader from "@/components/trips/CompanyHeader";
import TripList from "@/components/trips/TripList";
import AddTripDialog from "@/components/trips/AddTripDialog";
import EditTripDialog from "@/components/trips/EditTripDialog";

const Index = () => {
  const { isAuthenticated, userType, user } = useAuth();
  const location = useLocation();

  // Extract company ID from URL if present
  const queryParams = new URLSearchParams(location.search);
  const companyId = queryParams.get("company");

  const {
    filteredTrips,
    selectedTripForEdit,
    setSelectedTripForEdit,
    isAddTripOpen,
    setIsAddTripOpen,
    isEditTripOpen,
    setIsEditTripOpen,
    companyName,
    fetchTrips,
    handleDeleteTrip,
  } = useTrips({
    companyId,
    isAuthenticated,
    userType,
    userId: user?.id,
    token: user?.token,
  });

  const isCompanyView = isAuthenticated && userType === "company";

  // Scroll to trips section
  const scrollToTrips = () => window.scrollTo({ top: 600, behavior: "smooth" });

  // Refresh after adding trip
  const handleAddTrip = () => {
    fetchTrips();
    setIsAddTripOpen(false);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow bg-background">
        {!companyId && !isCompanyView ? (
          <HeroSection onBrowseTripsClick={scrollToTrips} />
        ) : (
          <CompanyHeader
            companyName={companyName || (user?.name as string)}
            companyId={companyId}
            isCompanyView={isCompanyView}
          />
        )}

        <TripList
          trips={filteredTrips || []}
          isCompanyView={isCompanyView}
          companyId={companyId}
          companyName={companyName}
          onAddTrip={() => setIsAddTripOpen(true)}
          onEditTrip={(trip) => {
            setSelectedTripForEdit(trip);
            setIsEditTripOpen(true);
          }}
          onDeleteTrip={handleDeleteTrip}
        />
      </main>

      <Footer />

      <AddTripDialog
        open={isAddTripOpen}
        onOpenChange={setIsAddTripOpen}
        onAddTrip={handleAddTrip}
      />

      {selectedTripForEdit && (
        <EditTripDialog
          open={isEditTripOpen}
          onOpenChange={setIsEditTripOpen}
          trip={selectedTripForEdit}
        />
      )}
    </div>
  );
};

export default Index;
