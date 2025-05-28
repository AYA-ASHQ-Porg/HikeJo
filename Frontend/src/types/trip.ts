export interface Trip {
  _id: string;
  companyId: string;
  companyName: string;
  title: string;
  startLocation: string;
  endLocation: string;
  price: number;
  description: string;
  ageRequired: number;
  maxParticipants: number;
  path: string;
  difficultyLevel: "easy" | "moderate" | "hard" | "expert"; // Added difficulty level
  companyPhoneNumber: string;
  maxTicketsPerBooking: number;
  imageUrl?: string;
  date: string;
  createdAt: string;
}

export interface Booking {
  id: string;
  tripId: string;
  userId: string;
  tripName: string;
  participants: Participant[];
  status: "confirmed" | "cancelled";
  bookedAt: string;
  tripDate: string;
}

export interface Participant {
  name: string;
  age: number;
  gender: string;
  phoneNumber: string;
  email: string;
}
