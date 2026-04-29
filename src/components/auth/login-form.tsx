"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Eye, EyeOff, Building2, Fingerprint } from "lucide-react"
import { Controller } from "react-hook-form"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field"
import { cn } from "@/lib/utils"
import { signInSchema } from "@/validations/auth"
import { toast } from "sonner"

const schema = signInSchema.extend({ trustDevice: z.boolean() })
type LoginValues = z.infer<typeof schema>

export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false)

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<LoginValues>({
    resolver: zodResolver(schema),
    defaultValues: { email: "", password: "", trustDevice: false },
  })

  async function onSubmit(values: LoginValues) {
    try {
      console.log(values)
      toast.success("Signed in successfully")
    } catch {
      toast.error("Invalid email or password")
    }
  }

  return (
    <div className="space-y-6">
      {/* Step indicator */}
      <p className="label text-muted-foreground">STEP 1 OF 2</p>

      {/* Heading */}
      <div className="space-y-1.5">
        <h1 className="h1">Welcome back</h1>
        <p className="p2 text-muted-foreground">Sign in to access your team vaults.</p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
        <Field>
          <FieldLabel htmlFor="email">Work email</FieldLabel>
          <Input
            id="email"
            type="email"
            autoComplete="email"
            placeholder="me@company.com"
            aria-invalid={!!errors.email}
            {...register("email")}
          />
          <FieldError>{errors.email?.message}</FieldError>
        </Field>

        <Field>
          <FieldLabel htmlFor="password">Master password</FieldLabel>
          <FieldGroup>
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
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
          </FieldGroup>
          <FieldError>{errors.password?.message}</FieldError>
        </Field>

        {/* Trust device + Forgot */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Controller
              control={control}
              name="trustDevice"
              render={({ field }) => (
                <Checkbox
                  id="trust"
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              )}
            />
            <FieldLabel htmlFor="trust" className="p3 text-muted-foreground cursor-pointer font-normal">
              Trust this device for 30 days
            </FieldLabel>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="link" size="sm" asChild className="p3 text-muted-foreground h-auto p-0">
              <a href="/signup">Sign up</a>
            </Button>
            <span className="p3 text-border">·</span>
            <Button variant="link" size="sm" asChild className="p3 text-muted-foreground h-auto p-0">
              <a href="#">Forgot?</a>
            </Button>
          </div>
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
          {isSubmitting ? "Signing in…" : "Continue →"}
        </Button>
      </form>

      {/* Divider */}
      <div className="flex items-center gap-3">
        <Separator className="flex-1" />
        <span className="label text-muted-foreground">or</span>
        <Separator className="flex-1" />
      </div>

      {/* Alternative auth */}
      <div className="grid grid-cols-2 gap-3">
        <Button
          type="button"
          variant="outline"
          className="flex flex-col items-center gap-1.5 h-auto py-4 rounded-xl"
        >
          <Building2 className="size-5 text-muted-foreground" />
          <div className="text-center">
            <p className="p3 font-medium text-foreground">SSO</p>
            <p className="label text-muted-foreground">SAML or OIDC</p>
          </div>
        </Button>

        <Button
          type="button"
          variant="outline"
          className="flex flex-col items-center gap-1.5 h-auto py-4 rounded-xl"
        >
          <Fingerprint className="size-5 text-muted-foreground" />
          <div className="text-center">
            <p className="p3 font-medium text-foreground">PassKey</p>
            <p className="label text-muted-foreground">Touch ID</p>
          </div>
        </Button>
      </div>
    </div>
  )
}
