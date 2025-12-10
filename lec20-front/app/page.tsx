"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import axiosInstance from "@/lib/axios-instance";
import { Expense } from "@/types/expense";
import { User } from "@/types/user";
import {
  createExpenseSchema,
  CreateExpenseType,
} from "@/validation/create-expense.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "@radix-ui/react-label";
import { deleteCookie, getCookie } from "cookies-next";
import { Loader, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export default function Home() {
  const [user, setUser] = useState<User | null>(null);
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const token = getCookie("token") as string;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(createExpenseSchema),
  });
  const [loader, setLoader] = useState(false);

  const router = useRouter();

  const onSubmit = async (data: CreateExpenseType) => {
    try {
      setLoader(true);
      const resp = await axiosInstance.post("/expenses", data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (resp.status === 201) {
        toast.success("Expense created successfully");
        getAllExpenses();
        reset();
      }
    } catch (e: any) {
      toast.error(e.response.data.message);
    } finally {
      setLoader(false);
    }
  };

  const currentUser = async (token: string) => {
    try {
      const resp = await axiosInstance.get("/auth/current-user", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUser(resp.data);
    } catch (e) {
      router.push("/auth/sign-in");
    }
  };

  useEffect(() => {
    if (!token) router.push("/auth/sign-in");
    currentUser(token);
  }, []);

  const handleLogOut = () => {
    deleteCookie("token");
    router.push("/auth/sign-in");
  };

  const getAllExpenses = async () => {
    const resp = await axiosInstance.get("/expenses");
    setExpenses(resp.data);
  };

  useEffect(() => {
    getAllExpenses();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      const resp = await axiosInstance.delete(`/expenses/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (resp.status === 200) {
        getAllExpenses();
      }
    } catch (e: any) {
      toast.error(e.response.data.message);
    }
  };

  if (!user) return;

  return (
    <div className="p-4">
      <h1 className="text-center">Home Page</h1>
      <p className="font-bold">{user.fullName}</p>
      <p className="font-bold">{user.email}</p>
      <Button onClick={handleLogOut}>Log out</Button>

      <Card className="w-1/2 mx-auto">
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardContent>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="category">Category</Label>
                <Input
                  {...register("category")}
                  id="category"
                  type="text"
                  placeholder="shopping"
                  required
                />
                {errors.category?.message && (
                  <p className="text-red-500">{errors.category.message}</p>
                )}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="amount">amount</Label>
                <Input
                  {...register("amount")}
                  id="amount"
                  type="number"
                  placeholder="300"
                  required
                />
                {errors.amount?.message && (
                  <p className="text-red-500">{errors.amount.message}</p>
                )}
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex-col gap-2 mt-4">
            {loader ? (
              <Button disabled={loader}>
                {" "}
                <Loader2 className="animate-spin" />{" "}
              </Button>
            ) : (
              <Button type="submit" className={"w-full"}>
                Create Expense
              </Button>
            )}
          </CardFooter>
        </form>
      </Card>

      <div className="mt-6 grid grid-cols-3 gap-3">
        {expenses.length &&
          expenses.map((expense: Expense) => (
            <div key={expense._id} className="border-2 rounded-3xl p-4">
              <h2>{expense.category}</h2>
              <h2>{expense.amount}</h2>
              <p>By @{expense.user.email}</p>
              {expense.user._id === user._id && (
                <Button
                  variant={"destructive"}
                  onClick={() => handleDelete(expense._id)}
                >
                  Delete
                </Button>
              )}
            </div>
          ))}
      </div>
    </div>
  );
}
