"use client"

import * as React from "react"

import { useForm } from "react-hook-form"
import { cn } from "@/lib/utils"
import { Icons } from "@/components/ui/icons"
import { Button, buttonVariants } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import LayoutAuth from "@/components/Layouts/LayoutAuth"
import Link from "next/link"
import { SignupPayload, signup } from "@/api/users"
import { Eye, EyeOff } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { useRouter } from "next/router"

import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { ObjectSchema } from "yup"
import { toast } from "sonner"

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

interface Inputs extends Omit<SignupPayload, 'is_admin'> {
  password_confirmation: string
}

const schema: ObjectSchema<Inputs> = yup
  .object({
    first_name: yup.string().required("First name required"),
    last_name: yup.string().required("Last name required"),
    email: yup.string().email("Field must be a valid email").required("Email is required"),
    password: yup.string().test('len', "Password must contain 8 characters or more", (val: string | undefined) => !!val && val.length >= 8).required(),
    password_confirmation: yup.string().oneOf([yup.ref('password')], 'Passwords must match').required("Password confirmation is required"),
  })
  .required()

export default function LoginPage({ className, ...props }: UserAuthFormProps) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: yupResolver(schema)
  })

  const router = useRouter()

  const [isLoading, setIsLoading] = React.useState<boolean>(false)

  const [isPasswordShown, setPasswordShown] = React.useState<boolean>(false)

  async function onSubmit(data: Inputs) {
    console.log({
      data
    })
    try {
      setIsLoading(true)
      const signupRes = await signup({ ...data, is_admin: false } as SignupPayload)
      if (signupRes && !signupRes?.token && Object.values(signupRes).length > 0)
        throw new Error("An error occurred !\n" + (signupRes ? Object.values(signupRes).flat(1)?.[0] : ''))
      if (signupRes?.token) {
        toast("Login successful")
        localStorage.setItem('rb_access_token', signupRes.token)
        localStorage.setItem('rb_refresh_token', signupRes.refresh)
        router.push('/')
      }
    } catch (error: any) {
      toast(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="lg:p-8">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            Create an account
          </h1>
          <p className="text-sm text-muted-foreground">
            Fill in the form below to create your account
          </p>
        </div>
        <div className={cn("grid gap-6", className)} {...props}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid gap-4">    
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-2">
                <div className="grid gap-1">
                  <Label htmlFor="first_name">
                    First Name*
                  </Label>
                  <Input
                    id="first_name"
                    placeholder="John"
                    autoCapitalize="none"
                    autoCorrect="off"
                    {...register('first_name')}
                    disabled={isLoading}
                  />
                  <p className="text-sm text-destructive m-0">{errors.first_name?.message}</p>
                </div>
                <div className="grid gap-1">
                  <Label htmlFor="last_name">
                    Last name*
                  </Label>
                  <Input
                    id="last_name"
                    placeholder="Doe"
                    type="text"
                    autoCapitalize="none"
                    autoCorrect="off"
                    {...register('last_name')}
                    disabled={isLoading}
                  />
                  <p className="text-sm text-destructive m-0">{errors.last_name?.message}</p>
                </div>
              </div>
              <div className="grid gap-1">
                <Label htmlFor="email">
                  Email*
                </Label>
                <Input
                  id="email"
                  placeholder="name@example.com"
                  type="email"
                  autoCapitalize="none"
                  autoComplete="email"
                  autoCorrect="off"
                  {...register('email')}
                  disabled={isLoading}
                />
                <p className="text-sm text-destructive m-0">{errors.email?.message}</p>
              </div>
              <div className="grid gap-1">
                <Label htmlFor="password">
                  Password*
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={isPasswordShown ? 'text' : 'password'} 
                    autoCapitalize="none"
                    autoCorrect="off"
                    {...register('password')}
                    disabled={isLoading}
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 cursor-pointer">
                    {isPasswordShown ? (
                      <EyeOff className="h-5 w-5" onClick={() => setPasswordShown(false)}/>
                    ) : (
                      <Eye className="h-5 w-5" onClick={() => setPasswordShown(true)}/>
                    )}
                  </div>
                </div>
                <p className="text-sm text-destructive m-0">{errors.password?.message}</p>
              </div>
              <div className="grid gap-1">
                <Label htmlFor="password_confirmation">
                  Password Confirmation*
                </Label>
                <div className="relative">
                  <Input
                    id="password_confirmation"
                    type={isPasswordShown ? 'text' : 'password'} 
                    autoCapitalize="none"
                    autoCorrect="off"
                    {...register('password_confirmation')}
                    disabled={isLoading}
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 cursor-pointer">
                    {isPasswordShown ? (
                      <EyeOff className="h-5 w-5" onClick={() => setPasswordShown(false)}/>
                    ) : (
                      <Eye className="h-5 w-5" onClick={() => setPasswordShown(true)}/>
                    )}
                  </div>
                </div>
                <p className="text-sm text-destructive m-0">{errors.password_confirmation?.message}</p>
              </div>
              <p className="-mt-2 text-sm text-muted-foreground">
                (*) Required
              </p>
              <Button type="submit" disabled={isLoading}>
                {isLoading && (
                  <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                )}
                Create account
              </Button>
            </div>
          </form>
        </div>
        <p className="px-8 text-center text-sm text-muted-foreground">
          By continuing, you agree to our{" "}
          <Link
            href="/terms"
            className="underline underline-offset-4 hover:text-primary"
          >
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link
            href="/privacy"
            className="underline underline-offset-4 hover:text-primary"
          >
            Privacy Policy
          </Link>
          .
        </p>
        <Separator />
        <div className="text-sm flex items-center justify-center px-4">
          <p>Already have an account ? <Link className="text-primary font-semibold hover:underline" href="/login">Login</Link></p>
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