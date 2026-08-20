import { z } from "zod";

/**
 * The original web app's forms called `e.preventDefault()` and never
 * actually validated or submitted anywhere — there was no backend to
 * validate against. These schemas add real client-side validation
 * (same fields, same screens) as a production-readiness improvement,
 * without inventing any backend behavior that didn't exist before.
 */

export const signUpSchema = z.object({
  name: z.string().min(2, "Enter your full name"),
  email: z.string().email("Enter a valid email"),
  password: z.string().min(8, "At least 8 characters"),
});

export const loginSchema = z.object({
  email: z.string().email("Enter a valid email"),
  password: z.string().min(1, "Enter your password"),
});

export const verificationSchema = z.object({
  universityEmail: z.string().email("Enter a valid email").optional().or(z.literal("")),
  license: z.string().optional(),
});

export const forgotPasswordSchema = z.object({
  email: z.string().email("Enter a valid email"),
});

export const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(8, "At least 8 characters")
      .regex(/[A-Z]/, "One uppercase letter")
      .regex(/[0-9!@#$%^&*]/, "One number or symbol"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export const changePasswordSchema = z
  .object({
    currentPassword: z.string().min(1, "Enter your current password"),
    newPassword: z
      .string()
      .min(8, "At least 8 characters")
      .regex(/[A-Z]/, "One uppercase letter")
      .regex(/[0-9!@#$%^&*]/, "One number or symbol"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export const editProfileSchema = z.object({
  fullName: z.string().min(2, "Enter your full name"),
  email: z.string().email("Enter a valid email"),
  location: z.string().min(1, "Enter your location"),
  program: z.string().min(1, "Enter your program"),
  licenseTrack: z.string().min(1, "Enter your license track"),
  bio: z.string().max(300, "Keep it under 300 characters").optional(),
});

export const reviewSchema = z.object({
  rating: z.number().min(1, "Add a rating"),
  tags: z.array(z.string()),
  body: z.string().min(40, "Share at least 40 characters").max(1000),
});
