"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Eye, EyeOff } from "lucide-react"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const schema = z
  .object({
    name: z.string().min(2, "At least 2 characters"),
    email: z.string().min(1, "Email is required").email("Enter a valid work email"),
    password: z.string().min(8, "At least 8 characters"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((d) => d.password === d.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  })

type SignupValues = z.infer<typeof schema>

export function SignupForm() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignupValues>({
    resolver: zodResolver(schema) as any,
    defaultValues: { name: "", email: "", password: "", confirmPassword: "" },
  })

  function onSubmit(values: SignupValues) {
    console.log(values)
  }

  return (
    <div className="space-y-6">
      <p className="label text-muted-foreground">STEP 1 OF 2</p>

      <div className="space-y-1.5">
        <h1 className="h1">Create account</h1>
        <p className="p2 text-muted-foreground">Set up your vault in under a minute.</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
        {/* Name */}
        <div className="space-y-1.5">
          <Label htmlFor="name" className="p3 text-foreground font-medium">
            Full name
          </Label>
          <Input
            id="name"
            type="text"
            autoComplete="name"
            placeholder="Ada Lovelace"
            aria-invalid={!!errors.name}
            {...register("name")}
          />
          {errors.name && (
            <p className="p3 text-destructive">{errors.name.message}</p>
          )}
        </div>

        {/* Email */}
        <div className="space-y-1.5">
          <Label htmlFor="email" className="p3 text-foreground font-medium">
            Work email
          </Label>
          <Input
            id="email"
            type="email"
            autoComplete="email"
            placeholder="me@company.com"
            aria-invalid={!!errors.email}
            {...register("email")}
          />
          {errors.email && (
            <p className="p3 text-destructive">{errors.email.message}</p>
          )}
        </div>

        {/* Password */}
        <div className="space-y-1.5">
          <Label htmlFor="password" className="p3 text-foreground font-medium">
            Master password
          </Label>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              autoComplete="new-password"
              aria-invalid={!!errors.password}
              {...register("password")}
              className="pr-14"
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => setShowPassword((v) => !v)}
              className="absolute inset-y-0 right-0 size-8 my-auto mr-1 text-muted-foreground hover:text-foreground"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
            </Button>
          </div>
          {errors.password && (
            <p className="p3 text-destructive">{errors.password.message}</p>
          )}
        </div>

        {/* Confirm password */}
        <div className="space-y-1.5">
          <Label htmlFor="confirmPassword" className="p3 text-foreground font-medium">
            Confirm password
          </Label>
          <div className="relative">
            <Input
              id="confirmPassword"
              type={showConfirm ? "text" : "password"}
              autoComplete="new-password"
              aria-invalid={!!errors.confirmPassword}
              {...register("confirmPassword")}
              className="pr-14"
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => setShowConfirm((v) => !v)}
              className="absolute inset-y-0 right-0 size-8 my-auto mr-1 text-muted-foreground hover:text-foreground"
              aria-label={showConfirm ? "Hide password" : "Show password"}
            >
              {showConfirm ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
            </Button>
          </div>
          {errors.confirmPassword && (
            <p className="p3 text-destructive">{errors.confirmPassword.message}</p>
          )}
        </div>

        {/* Already have account */}
        <div className="flex items-center justify-end">
          <Button variant="link" size="sm" asChild className="p3 text-muted-foreground h-auto p-0">
            <a href="/">Already have an account?</a>
          </Button>
        </div>

        {/* Submit */}
        <Button
          type="submit"
          disabled={isSubmitting}
          className={cn(
            "w-full h-10 rounded-lg p2",
            "bg-brand text-brand-foreground hover:bg-brand/90 transition-colors",
          )}
        >
          {isSubmitting ? "Creating account…" : "Continue →"}
        </Button>
      </form>
    </div>
  )
}
