
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Booking } from "@/types/trip";
import { Calendar, Users, History, XCircle } from "lucide-react";

interface BookingStatsCardProps {
  bookings: Booking[];
}

const BookingStatsCard = ({ bookings }: BookingStatsCardProps) => {
  // Calculate statistics
  const totalBookings = bookings.length;
  const activeBookings = bookings.filter(booking => booking.status === 'confirmed').length;
  const cancelledBookings = bookings.filter(booking => booking.status === 'cancelled').length;
  
  // Calculate total participants
  const totalParticipants = bookings.reduce((sum, booking) => {
    return sum + booking.participants.length;
  }, 0);
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-medium flex items-center">
            <Users className="mr-2 text-primary" size={18} />
            Total Bookings
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">{totalBookings}</div>
          <p className="text-muted-foreground text-sm mt-1">
            {activeBookings} active, {cancelledBookings} cancelled
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-medium flex items-center">
            <Calendar className="mr-2 text-primary" size={18} />
            Total Participants
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">{totalParticipants}</div>
          <p className="text-muted-foreground text-sm mt-1">
            Across all your trips
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-medium flex items-center">
            <History className="mr-2 text-primary" size={18} />
            Booking Rate
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">
            {totalBookings > 0 
              ? `${Math.round((activeBookings / totalBookings) * 100)}%`
              : "0%"
            }
          </div>
          <p className="text-muted-foreground text-sm mt-1">
            Confirmed bookings ratio
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-medium flex items-center">
            <XCircle className="mr-2 text-primary" size={18} />
            Cancellation Rate
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">
            {totalBookings > 0 
              ? `${Math.round((cancelledBookings / totalBookings) * 100)}%`
              : "0%"
            }
          </div>
          <p className="text-muted-foreground text-sm mt-1">
            Cancelled bookings ratio
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default BookingStatsCard;
