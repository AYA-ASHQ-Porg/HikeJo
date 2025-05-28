import { z } from "zod";

export const tripSchema = z.object({
  title: z.string().min(3, { message: "Title must be at least 3 characters" }),
  startLocation: z
    .string()
    .min(3, { message: "Start location must be at least 3 characters" }),
  endLocation: z
    .string()
    .min(3, { message: "End location must be at least 3 characters" }),
  price: z
    .string()
    .refine((value) => !isNaN(parseFloat(value)) && parseFloat(value) >= 0, {
      message: "Price must be a positive number",
    }),
  description: z
    .string()
    .min(10, { message: "Description must be at least 10 characters" }),
  ageRequired: z
    .string()
    .refine((value) => !isNaN(parseInt(value)) && parseInt(value) >= 0, {
      message: "Age must be a positive number",
    }),
  maxParticipants: z
    .string()
    .refine((value) => !isNaN(parseInt(value)) && parseInt(value) > 0, {
      message: "Max participants must be a positive number",
    }),
  path: z.string().min(5, { message: "Path must be at least 5 characters" }),
  companyPhoneNumber: z
    .string()
    .min(10, { message: "Phone number must be at least 10 characters" }),
  maxTicketsPerBooking: z
    .string()
    .refine(
      (value) =>
        !isNaN(parseInt(value)) && parseInt(value) > 0 && parseInt(value) <= 3,
      {
        message: "Max tickets per booking must be between 1 and 3",
      }
    ),
  date: z.string().min(1, { message: "Date is required" }),
  imageUrl: z.string().optional(),
  difficultyLevel: z.enum(["easy", "moderate", "hard", "expert"], {
    required_error: "Difficulty level is required",
  }),
});

export type TripFormValues = z.infer<typeof tripSchema>;
