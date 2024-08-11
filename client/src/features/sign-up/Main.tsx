"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";

import { useForm } from "react-hook-form";
import * as z from "zod";

import { cn } from "@/lib/utils";
import {
  registerSchema,
  TRegisterSchema,
  userAuthSchema,
} from "@/lib/validations/auth";
import { buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";
import { Icons } from "@/components/icons";
import { registrationApi } from "./service";
import { useRouter } from "next/navigation";
import { ApiError } from "../login/Main";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function SignUp({ className, ...props }: UserAuthFormProps) {
  const {
    register,
    handleSubmit,
    setError,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<TRegisterSchema>({
    resolver: zodResolver(registerSchema),
  });
  const [showPassword, setShowPassword] = React.useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    React.useState<boolean>(false);

  const router = useRouter();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  async function onSubmit(data: TRegisterSchema) {
    console.log("data", data);

    try {
      const response = await registrationApi(data);
      if (response.success === true) {
        router.push("/");

        toast({
          className: cn(
            "top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4"
          ),
          variant: "default",
          title: "Welcome to Portal!",
          description: "User has been created.",
        });
      }
    } catch (error) {
      const apiError = error as ApiError;
      if (apiError.errors && apiError.errors.length > 0) {
        apiError.errors.forEach((errorObj) => {
          const key = Object.keys(errorObj)[0] as keyof TRegisterSchema;
          const errorMessage = errorObj[key];

          setError(key, {
            type: "server",
            message: errorMessage || apiError.message,
          });
        });
      }
    }
  }

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="email">
              Full Name
            </Label>
            <Input
              id="full_name"
              placeholder="Daanish Noor"
              type="text"
              autoCapitalize="none"
              autoComplete="text"
              autoCorrect="off"
              disabled={isSubmitting}
              {...register("full_name")}
            />
            {errors?.full_name && (
              <p className="px-1 text-xs text-red-600">
                {errors.full_name.message}
              </p>
            )}
          </div>
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="email">
              Email
            </Label>
            <Input
              id="email"
              placeholder="name@example.com"
              type="text"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isSubmitting}
              {...register("email")}
            />
            {errors?.email && (
              <p className="px-1 text-xs text-red-600">
                {errors.email.message}
              </p>
            )}
          </div>
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="password">
              Password
            </Label>
            <div className="relative">
              <Input
                id="password"
                placeholder="password"
                type={showPassword ? "text" : "password"}
                autoCapitalize="none"
                autoComplete="new-password"
                autoCorrect="off"
                disabled={isSubmitting}
                {...register("password")}
              />
              <div
                className="absolute bottom-0 top-2 right-3 cursor-pointer"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? <Icons.eyeOff /> : <Icons.eyeIcons />}
              </div>
            </div>

            {errors?.password && (
              <p className="px-1 text-xs text-red-600">
                {errors.password.message}
              </p>
            )}
          </div>

          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="password">
              Confirm Password
            </Label>
            <div className="relative">
              <Input
                id="confirm_password"
                placeholder="confirm password"
                type={showConfirmPassword ? "text" : "password"}
                autoCapitalize="none"
                autoComplete="new-password"
                autoCorrect="off"
                disabled={isSubmitting}
                {...register("confirm_password")}
              />
              <div
                className="absolute bottom-0 top-2 right-3 cursor-pointer"
                onClick={toggleConfirmPasswordVisibility}
              >
                {showConfirmPassword ? <Icons.eyeOff /> : <Icons.eyeIcons />}
              </div>
            </div>

            {errors?.confirm_password && (
              <p className="px-1 text-xs text-red-600">
                {errors.confirm_password.message}
              </p>
            )}
          </div>
          <button className={cn(buttonVariants())} disabled={isSubmitting}>
            {isSubmitting && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Sign In with Email
          </button>
        </div>
      </form>
    </div>
  );
}
