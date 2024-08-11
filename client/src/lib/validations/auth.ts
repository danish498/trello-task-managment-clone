import * as z from "zod";

export const userAuthSchema = z.object({
  email: z.string().email(),
  password: z.string().min(4),
});

export const registerSchema = z
  .object({
    full_name: z
      .string()
      .min(1, "Full name is required")
      .max(100, "Full name must be under 100 characters"),
    email: z
      .string()
      .min(1, "Email is required")
      .email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
    confirm_password: z
      .string()
      .min(6, "Confirm Password must be at least 6 characters long"),
  })
  .refine((data) => data.password === data.confirm_password, {
    path: ["confirm_password"],
    message: "Passwords do not match",
  });

export type TRegisterSchema = z.infer<typeof registerSchema>;
