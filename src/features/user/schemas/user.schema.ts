import { z } from "zod";
import { PASSWORD_ERROR_MESSAGES } from "../../../constants/messages";

const passwordSchema = z
  .string()
  .min(8, { message: PASSWORD_ERROR_MESSAGES.MIN_LENGTH_ERROR_MESSAGE })
  .max(20, { message: PASSWORD_ERROR_MESSAGES.MAX_LENGTH_ERROR_MESSAGE })
  .refine((password) => /[A-Z]/.test(password), {
    message: PASSWORD_ERROR_MESSAGES.UPPER_CASE_ERROR_MESSAGE,
  })
  .refine((password) => /[a-z]/.test(password), {
    message: PASSWORD_ERROR_MESSAGES.LOWERCASE_ERROR_MESSAGE,
  })
  .refine((password) => /[0-9]/.test(password), {
    message: PASSWORD_ERROR_MESSAGES.NUMBER_ERROR_MESSAGE,
  })
  .refine((password) => /[!@#$%^&*]/.test(password), {
    message: PASSWORD_ERROR_MESSAGES.SPECIAL_CHARACTER_ERROR_MESSAGE,
  });

export const registerSchema = z
  .object({
    email: z
      .string()
      .email({ message: "Invalid email format" })
      .nonempty({ message: "Email is required" }),
    firstName: z
      .string()
      .min(2, { message: "First name must be at least 2 characters long" })
      .max(100, { message: "First name must be less than 100 characters long" })
      .nonempty({ message: "First name is required" }),
    password: passwordSchema,
    password2: z.string().nonempty({ message: "Confirm password is required" }),
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.password2) {
      ctx.addIssue({
        code: "custom",
        pahth: ["password2"],
        message: PASSWORD_ERROR_MESSAGES.PASSWORD_MISMATCH_ERROR_MESSAGE,
      });
    }
  });


export const loginSchema = z.object({
    email: z
      .string()
      .email({ message: "Invalid email format" })
      .nonempty({ message: "Email is required" }),
    password: z.string().nonempty({ message: "Password is required" }),
})