"use client";

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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axiosInstance from "@/lib/axios-instance";
import { signUpSchema, SignUpType } from "@/validation/sign-up.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import {Loader2} from 'lucide-react'

export default function SignUp() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signUpSchema),
  });
  const [loader, setLoader] = useState(false)

  const router = useRouter();

  const onSubmit = async (data: SignUpType) => {
    try{
        setLoader(true)
        const resp = await axiosInstance.post('/auth/sign-up', data)
        if(resp.status === 201){
            toast.success('User registered successfully')
            router.push('/auth/sign-in')
        }
    }catch(e: any){
        console.log(e, "error")
        toast.error(e.response.data.message)
    }finally{
        setLoader(false)
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Sign-up</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
          <CardAction>
            <Button variant="link" onClick={() => router.push("/auth/sign-in")}>
              Sign In
            </Button>
          </CardAction>
        </CardHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardContent>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="fullName">Full Name</Label>
                <Input
                  {...register("fullName")}
                  id="fullName"
                  type="text"
                  placeholder="John doe"
                  required
                />
                {errors.fullName?.message && <p className="text-red-500">{errors.fullName.message}</p>}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  {...register("email")}
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                />
                {errors.email?.message && <p className="text-red-500">{errors.email.message}</p>}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="age">age</Label>
                <Input
                  {...register("age")}
                  id="age"
                  type="number"
                  placeholder="22"
                  required
                />
                {errors.age?.message && <p className="text-red-500">{errors.age.message}</p>}
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                </div>
                <Input
                  {...register("password")}
                  id="password"
                  type="password"
                  required
                />
                {errors.password?.message && <p className="text-red-500">{errors.password.message}</p>}
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex-col gap-2 mt-4">
           {loader ? <Button disabled={loader}> <Loader2 className="animate-spin" /> </Button> : <Button type="submit" className={"w-full"}>
              Sign-up
            </Button>}
            <Button variant="outline" className="w-full">
              Sign-Up with Google
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
