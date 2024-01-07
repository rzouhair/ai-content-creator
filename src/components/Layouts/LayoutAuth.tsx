import { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { UserAuthForm } from "@/components/Auth/login"
import { useEffect } from "react"
import { verifyToken } from "@/api/users"
import { useRouter } from "next/router"

export const metadata: Metadata = {
  title: "Authentication",
  description: "Authentication forms built using the components.",
}

export default function LayoutAuth(props: any) {

  const router = useRouter()

  useEffect(() => {
    const verifyAccessToken = async() => {
      try {
        const token = localStorage.getItem('rb_access_token')
        if (token) {
          const verify = await verifyToken({ token })
          if (!verify) {
            throw new Error("Login expired!")
          }
          else {
            router.push('/')
            console.log({
              verify
            })
          }
        }
      } catch (error) {
        
      }
    }
    verifyAccessToken()
  }, [])

  return (
    <div className="flex items-center justify-center h-screen w-screen bg-primary-400 px-4">
      <div className="container relative flex pb-8 md:pb-0 md:h-[700px] w-fit md:max-w-[1280px] md:w-full mx-auto flex-col items-center justify-center md:grid lg:grid-cols-2 lg:px-0 rounded-md border-muted-foreground border overflow-hidden bg-background">
        {props.links}
        <div className="relative hidden h-full flex-col bg-secondary p-10 text-white lg:flex dark:border-r">
          <div className="absolute inset-0 bg-secondary" />
          <div className="relative z-20 text-text flex items-center text-lg font-medium">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mr-2 h-6 w-6"
            >
              <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
            </svg>
            Acme Inc
          </div>
         {/*  <div className="relative z-20 mt-auto text-text">
            <blockquote className="space-y-2">
              <p className="text-lg">
                &ldquo;This library has saved me countless hours of work and
                helped me deliver stunning designs to my clients faster than
                ever before.&rdquo;
              </p>
              <footer className="text-sm">Sofia Davis</footer>
            </blockquote>
          </div> */}
        </div>
        {props.children}
      </div>
    </div>
  )
}