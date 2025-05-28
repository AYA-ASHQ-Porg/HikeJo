import React from "react";
import {
  User,
  Calendar,
  Phone,
  Mail,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Booking } from "@/types/trip";

interface BookingCardProps {
  booking: Booking;
  status: "confirmed" | "cancelled";
}

const BookingCard = ({ booking, status }: BookingCardProps) => {
  return (
    <Card key={booking.id}>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium flex justify-between">
          <span>{booking.tripName}</span>
          <Badge variant={status === "confirmed" ? "default" : "destructive"}>
            {status === "confirmed" ? (
              <span className="flex items-center">
                <CheckCircle className="mr-1 h-3 w-3" />
                Confirmed
              </span>
            ) : (
              <span className="flex items-center">
                <XCircle className="mr-1 h-3 w-3" />
                Cancelled
              </span>
            )}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center mb-3">
          <Calendar className="mr-2 text-muted-foreground" size={16} />
          <span className="text-sm text-muted-foreground">
            Trip Date: {new Date(booking.tripDate).toLocaleDateString()}
          </span>
        </div>

        <div className="border rounded-md p-3 mb-3">
          <h3 className="font-medium mb-2">
            Participants ({booking.participants.length})
          </h3>
          <div className="space-y-3">
            {booking.participants.map((participant, index) => (
              <div
                key={index}
                className="text-sm grid grid-cols-1 md:grid-cols-2 gap-2"
              >
                <div className="flex items-center">
                  <User className="mr-2 text-muted-foreground" size={14} />
                  <span>
                    {participant.name} ({participant.age}, {participant.gender})
                  </span>
                </div>
                <div className="flex items-center">
                  <div className="flex items-center mr-4">
                    <Phone className="mr-1 text-muted-foreground" size={14} />
                    <span className="text-muted-foreground">
                      {participant.phoneNumber}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <Mail className="mr-1 text-muted-foreground" size={14} />
                    <span className="text-muted-foreground">
                      {participant.email}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="text-sm text-muted-foreground">
          Booked on: {new Date(booking.bookedAt).toLocaleDateString()}
        </div>
      </CardContent>
    </Card>
  );
};

export default BookingCard;
