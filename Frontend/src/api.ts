import axios from "axios";

// Axios instance
const API = axios.create({
  baseURL: "http://localhost:3000/",
});

// Payload Types

interface AdventurerSignupPayload {
  firstName: string;
  lastName: string;
  name: string;
  gender: string;
  age: number;
  email: string;
  phoneNumber: string;
  city: string;
  type: "adventurer";
  password: string;
}

interface CompanySignupPayload {
  companyName: string;
  name: string;
  companyId: string;
  phoneNumber: string;
  email: string;
  location: string;
  yearsInBusiness: number;
  type: "company";
  password: string;
}

interface AdventurerLoginPayload {
  email: string;
  password: string;
}

interface CompanyLoginPayload {
  companyId: string;
  password: string;
}

interface Participant {
  name: string;
  age: number;
  gender: "male" | "female";
  phoneNumber: string;
  email: string;
}

export interface TripPayload {
  title: string;
  startLocation: string;
  endLocation: string;
  price: number;
  description: string;
  ageRequired: number;
  maxParticipants: number;
  path: string;
  companyPhoneNumber: string;
  maxTicketsPerBooking: number;
  date: string;
  imageUrl: string;
  difficultyLevel: "easy" | "moderate" | "hard" | "expert";
  companyId: string;
  companyName: string;
}

interface Booking {
  participants: Participant[];
}

interface TripParticipantsResponse {
  data: {
    bookings: Booking[];
  };
}

// Auth APIs


export const signupAdventurer = (data: AdventurerSignupPayload) =>
  API.post("/auth/signup/adventurer", data);

export const signupCompany = (data: CompanySignupPayload) =>
  API.post("/auth/signup/company", data);

export const loginAdventurer = (data: AdventurerLoginPayload) =>
  API.post("/auth/login/adventurer", data);

export const loginCompany = (data: CompanyLoginPayload) =>
  API.post("/auth/login/company", data);

// Password Reset


export const resetPasswordRequest = (email: string) =>
  API.post("/auth/forgot-password", { email });

export const verifyResetCode = (email: string, code: string) =>
  API.post("/auth/verify-reset-code", { email, code });

export const updatePasswordRequest = (
  email: string,
  code: string,
  newPassword: string,
  confirmPassword: string
) =>
  API.post("/auth/reset-password", {
    email,
    code,
    newPassword,
    confirmPassword,
  });

// Adventurer APIs

export const fetchAdventurerProfile = (token: string) =>
  API.get("/adventurer/profile", {
    headers: { Authorization: `Bearer ${token}` },
  });

export const updateAdventurerProfile = (data: any, token: string) =>
  API.patch("/adventurer/profile", data, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const deleteAdventurerAccount = (token: string) =>
  API.delete("/adventurer/delete-account", {
    headers: { Authorization: `Bearer ${token}` },
  });

export const bookTrip = (
  tripId: string,
  participants: Participant[],
  ticketCount: number,
  token: string
) =>
  API.post(
    `/adventurer/book/${tripId}`,
    { participants, ticketCount },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );

export const getAdventurerBookings = (token: string) =>
  API.get("/adventurer/my-hikes", {
    headers: { Authorization: `Bearer ${token}` },
  });

export const cancelBooking = (bookingId: string, token: string) =>
  API.patch(
    `/adventurer/cancel-booking/${bookingId}`,
    {},
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );

// Company & Trip APIs

export const getCompanies = (token: string) =>
  API.get("/companies", {
    headers: { Authorization: `Bearer ${token}` },
  });

export const getTripsByCompany = async (companyId: string, token: string) => {
  const res = await API.get(`/companies/${companyId}/trips`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return Array.isArray(res.data.data) ? res.data.data : [];
};

export const getAllTrips = async (
  token?: string,
  userType?: string
): Promise<Trip[]> => {
  try {
    if (token && userType === "company") {
      const res = await API.get("/company/trips", {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("Company Trips:", res.data);
      return Array.isArray(res.data.data) ? res.data.data : [];
    }

    const res = await API.get("/trips");
    console.log("All Trips (for home/adventurer):", res.data);
    return Array.isArray(res.data.data) ? res.data.data : [];
  } catch (err) {
    console.error("getAllTrips error:", err);
    return [];
  }
};

export const createTrip = (tripData: TripPayload, token: string) =>
  API.post("/company/trips", tripData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const fetchTripParticipants = async (
  tripId: string,
  token: string
): Promise<Participant[]> => {
  try {
    const response = await API.get(`/company/trips/${tripId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const bookings = response.data.data.bookings;
    const allParticipants = bookings.flatMap((booking) => booking.participants);

    return allParticipants;
  } catch (error) {
    console.error("Error fetching participants:", error);
    throw error;
  }
};

export const editTrip = async (
  tripId: string,
  tripData: Partial<TripPayload>,
  token: string
) =>
  API.patch(`/company/trips/${tripId}`, tripData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const deleteTrip = async (tripId: string, token: string) =>
  API.delete(`/company/trips/${tripId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const fetchCompanyProfile = (token: string) =>
  API.get("/company/profile", {
    headers: { Authorization: `Bearer ${token}` },
  });

export const updateCompanyProfile = (data, token: string) =>
  API.patch("/company/profile", data, {
    headers: { Authorization: `Bearer ${token}` },
  });

// Public Page Content APIs

export const getAboutUs = async () => {
  const res = await API.get("/pages/about");
  return res.data.data;
};

export const getFAQ = async () => {
  const res = await API.get("/pages/faq");
  return res.data.data;
};

export const getTermsAndConditions = async () => {
  const res = await API.get("/pages/terms");
  return res.data.data;
};

export const getPrivacyPolicy = async () => {
  const res = await API.get("/pages/privacy");
  return res.data.data;
};

export const deleteCompanyAccount = (token: string) =>
  API.delete("/company/delete-account", {
    headers: { Authorization: `Bearer ${token}` },
  });

export default API;
