"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import { Icons } from "@/components/ui/icons"
import { Button, buttonVariants } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import LayoutAuth from "@/components/Layouts/LayoutAuth"
import Link from "next/link"
import { Separator } from "@/components/ui/separator"
import { LoginPayload, login } from "@/api/users"
import { useRouter } from "next/router"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}
interface Inputs extends LoginPayload {}

export default function LoginPage({ className, ...props }: UserAuthFormProps) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const router = useRouter()
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>()

  async function onSubmit({ email, password }: Inputs) {
    try {
      setIsLoading(true)
      console.log({
        email,
        password
      })
      const loginRes = await login({
        email,
        password
      })
      if (!loginRes)
        throw new Error("An error occurred")
      localStorage.setItem('rb_access_token', loginRes.token)
      localStorage.setItem('rb_refresh_token', loginRes.refresh)
      toast("Login Successful")
      router.push('/')
    } catch (error: any) {
      toast("An error occurred ! " + error.message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="lg:p-8 bg-background">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            Login to your account
          </h1>
          <p className="text-sm text-muted-foreground">
            Welcome back! Please enter your details
          </p>
        </div>
        <div className={cn("grid gap-6", className)} {...props}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="email">
                  Email
                </Label>
                <Input
                  id="email"
                  placeholder="name@example.com"
                  type="email"
                  autoCapitalize="none"
                  autoComplete="email"
                  {...register('email')}
                  autoCorrect="off"
                  disabled={isLoading}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  autoCapitalize="none"
                  autoCorrect="off"
                  {...register('password')}
                  disabled={isLoading}
                />
              </div>
              <Button type="submit" disabled={isLoading}>
                {isLoading && (
                  <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                )}
                Login
              </Button>
            </div>
            <div className="mt-2">
              <Link href="/forgot-password" className="text-sm text-primary hover:underline font-semibold">Forgot password</Link>
            </div>
          </form>
        </div>
        <Separator />
        <div className="text-sm flex items-center justify-center">
          <p>Don't have an account ? <Link className="text-primary font-semibold hover:underline" href="/signup">Sign up</Link></p>
        </div>

      </div>
    </div>
  )
}

LoginPage.getLayout = function getLayout(page: any) {
  return (
    <LayoutAuth>
      {page}
    </LayoutAuth>
  )
}