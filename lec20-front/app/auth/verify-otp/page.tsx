"use client";
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp"
import {  RefreshCwIcon } from "lucide-react"

import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import axiosInstance from "@/lib/axios-instance";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import {Loader2} from 'lucide-react'
import Link from "next/link";
import { setCookie } from "cookies-next/client";
import { verifyOtpSchema, VerifyOtpType } from "@/validation/verify-otp.schema";




export default function VerifyOtp() {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<VerifyOtpType>({
    resolver: zodResolver(verifyOtpSchema),
    defaultValues: {
      otp: "",
    },
  });
  const [loader, setLoader] = useState(false)
  const [email, setEmail] = useState("")

  const router = useRouter();

  useEffect(() => {
    const storedEmail = localStorage.getItem("auth_email") || "";
    setEmail(storedEmail);
  }, []);

  const onSubmit = async ({ otp }: VerifyOtpType) => {
    if (!email) {
      toast.error("Missing email. Please start sign-in again.");
      return;
    }

    try{
        setLoader(true)
        const resp = await axiosInstance.post('/auth/verify-user', { email, otpCode: otp })
        if(resp.status === 201 || resp.status === 200){
            toast.success('Verification successful')
             setCookie('token', resp.data.token, {maxAge: 60 * 60})
            router.push('/')
        }
    }catch(e: any){
        console.log(e, "error")
        toast.error(e?.response?.data?.message || "Failed to verify code")
    }finally{
        setLoader(false)
    }
  };

  const handleVerifyCode = async () => {
    const resp = await axiosInstance.post('/auth/resend-verification-code', {
        email
    })

    if(resp.status === 201){
        toast.success('OTP Code sent successfully')
    }
  }


  return (
    <div className="flex justify-center items-center h-screen">
    <form onSubmit={handleSubmit(onSubmit)}>
    <Card className="mx-auto max-w-md">
      <CardHeader>
        <CardTitle>Verify your login</CardTitle>
        <CardDescription>
          Enter the verification code we sent to your email address:{" "}
          <span className="font-medium">{email || "your email"}</span>.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Field>
          <div className="flex items-center justify-between">
            <FieldLabel htmlFor="otp-verification">
              Verification code
            </FieldLabel>
            <Button onClick={handleVerifyCode} type="button" variant="outline" size="sm">
              <RefreshCwIcon />
              Resend Code
            </Button>
          </div>
          <Controller
            name="otp"
            control={control}
            render={({ field }) => (
              <InputOTP
                maxLength={6}
                id="otp-verification"
                value={field.value}
                onChange={field.onChange}
                inputMode="numeric"
                autoComplete="one-time-code"
                required
              >
                <InputOTPGroup className="*:data-[slot=input-otp-slot]:h-12 *:data-[slot=input-otp-slot]:w-11 *:data-[slot=input-otp-slot]:text-xl">
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                </InputOTPGroup>
                <InputOTPSeparator className="mx-2" />
                <InputOTPGroup className="*:data-[slot=input-otp-slot]:h-12 *:data-[slot=input-otp-slot]:w-11 *:data-[slot=input-otp-slot]:text-xl">
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>
            )}
          />
          {errors.otp?.message && (
            <p className="text-red-500 text-sm mt-2">{errors.otp.message}</p>
          )}
          <FieldDescription>
            <Link href="/auth/sign-in">I no longer have access to this email address.</Link>
          </FieldDescription>
        </Field>
      </CardContent>
      <CardFooter>
        <Field>
          {loader ? (
            <Button disabled className="w-full">
              <Loader2 className="animate-spin" />
            </Button>
          ) : (
            <Button type="submit" className="w-full">
              Verify
            </Button>
          )}
          <div className="text-muted-foreground text-sm">
            Having trouble signing in?{" "}
            <a
              href="#"
              className="hover:text-primary underline underline-offset-4 transition-colors"
            >
              Contact support
            </a>
          </div>
        </Field>
      </CardFooter>
    </Card>
    </form>
    </div>
  )
}
