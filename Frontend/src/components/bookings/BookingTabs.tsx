import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Booking } from "@/types/trip";
import BookingCard from "./BookingCard";
import EmptyState from "./EmptyState";

interface BookingTabsProps {
  bookings: Booking[];
}

const BookingTabs = ({ bookings }: BookingTabsProps) => {
  const confirmedBookings = bookings.filter(
    (booking) => booking.status === "confirmed"
  );
  const cancelledBookings = bookings.filter(
    (booking) => booking.status === "cancelled"
  );

  return (
    <Tabs defaultValue="confirmed" className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="confirmed">
          Confirmed
          {confirmedBookings.length > 0 && (
            <span className="ml-2">
              <Badge>{confirmedBookings.length}</Badge>
            </span>
          )}
        </TabsTrigger>
        <TabsTrigger value="cancelled">
          Cancelled
          {cancelledBookings.length > 0 && (
            <span className="ml-2">
              <Badge>{cancelledBookings.length}</Badge>
            </span>
          )}
        </TabsTrigger>
      </TabsList>

      <TabsContent value="confirmed" className="mt-6">
        {confirmedBookings.length > 0 ? (
          <div className="space-y-4">
            {confirmedBookings.map((booking) => (
              <BookingCard
                //key={booking.id}
                booking={booking}
                status="confirmed"
              />
            ))}
          </div>
        ) : (
          <EmptyState
            title="No confirmed bookings"
            description="You don't have any confirmed bookings at the moment."
          />
        )}
      </TabsContent>

      <TabsContent value="cancelled" className="mt-6">
        {cancelledBookings.length > 0 ? (
          <div className="space-y-4">
            {cancelledBookings.map((booking) => (
              <BookingCard
                //key={booking.id}
                booking={booking}
                status="cancelled"
              />
            ))}
          </div>
        ) : (
          <EmptyState
            title="No cancelled bookings"
            description="You don't have any cancelled bookings at the moment."
          />
        )}
      </TabsContent>
    </Tabs>
  );
};

export default BookingTabs;
