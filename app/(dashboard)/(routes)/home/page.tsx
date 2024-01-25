"use client";
import React, { useEffect, useRef, useState } from "react";
import NewStrategyUI from "@/components/form.list.ui";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useUser } from "@clerk/nextjs";
import { Plus } from "lucide-react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Strategy } from "@prisma/client";
import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "@/app/context/AuthContext";
import * as z from "zod";
import axios from "axios";
import { Skeleton } from "@/components/ui/skeleton";
const strategySchema = z.object({
  strategyName: z.string().min(1, "Please enter the strategy name"),
  addInfluencersBy: z.enum(["search", "manual"]),
  description: z.string().optional(),
});
type StrategyFormData = z.infer<typeof strategySchema>;
export default function DashboardPage() {
  const { userId } = useAuth();
  const { user } = useUser();
  const userName = user?.fullName;
  const [strategies, setStrategies] = useState<Strategy[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // const { register, handleSubmit, reset, formState: { errors } } = useForm<StrategyFormData>({
  //   resolver: zodResolver(strategySchema),
  // });

  const router = useRouter();

  const methods = useForm<StrategyFormData>({
    resolver: zodResolver(strategySchema),
  });

  useEffect(() => {
    const fetchStrategies = async () => {
      if (userId) {
        setIsLoading(true);
        try {
          const response = await fetch("/api/strategy/get-all");
          console.log("whats the response: ", response);
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          const fetchedStrategies = await response.json();
          setStrategies(fetchedStrategies);
        } catch (error) {
          console.error("Error fetching strategies:", error);
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchStrategies();
  }, []);

  const handleStrategySubmit = async (data: StrategyFormData) => {
    console.log("Strategy Data:", data);
    setIsDialogOpen(false);
    console.log("Form Data Submitted:", data); // First, log data to the console

    // Construct the strategy data object
    const strategyData = {
      name: data.strategyName,
      pictureUrl:
        "https://cdn.hypeauditor.com/img/instagram/user/13460080.jpg?w=100&till=1708507419&sign=be5247df95066c982795505571047925",
      description: data.description,
    };

    console.log("Strategy Data to Send:", strategyData); // Log the strategy data

    try {
      const response = await axios.post("/api/strategy/new", {
        name: data.strategyName,
        pictureUrl:
          "https://cdn.hypeauditor.com/img/instagram/user/13460080.jpg?w=100&till=1708507419&sign=be5247df95066c982795505571047925",
        description: data.description,
      });

      console.log("New Strategy Response:", response.data); // Log the response data

      setStrategies((current) => [...current, response.data]);
      setIsDialogOpen(false);
      methods.reset();

      // if (data.addInfluencersBy === 'search') {
      //   await router.push('/discover');
      // } else if (data.addInfluencersBy === 'manual') {
      //   await router.push('/actions/import');
      // }

      // Reload the current page
      //window.location.reload();
    } catch (error) {
      console.error("Error creating strategy");
      console.error(error);
    }
  };

  function formatDateToMDY(date: Date): string {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(date).toLocaleDateString(undefined, options);
  }

  return (
    <>
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
        integrity="sha512-DTOQO9RWCH3ppGqcWaEA1BIZOC6xxalwEsw9c2QQeAIftl+Vegovlnee1c9QX4TctnWMn13TZye+giMm8e2LwA=="
        crossOrigin="anonymous"
        referrerPolicy="no-referrer"
      />
      <div>
        <div className="mb-8 space-y-4 pt-[4.5rem] ">
          <h1 className="text-center mt-6 text-[28px] mb-0 font-bold">
            Search from the largest database 1 Million+ Vetted creators
          </h1>
          <p
            className="text-center text-[18px] font-normal "
            style={{ marginTop: "5px" }}
          >
            Welcome, {userName} 👋
          </p>
          <Card className="flex justify-center border-none shadow-none bg-inherit">
            <Button className="rounded-l-3xl rounded-r-none h-12">
              <p className="mr-2">
                <Link href={"/discover"}>Search</Link>
              </p>{" "}
              <i className="fa-solid fa-magnifying-glass text-white"></i>
            </Button>
            <Link href={"/discover"}>
              <Card className="rounded-r-3xl rounded-l-none h-12 text-center align-middle justify-center flex w-[460px]">
                <Input className="self-center rounded-r-3xl rounded-l-none h-12 text-center align-middle justify-center flex w-[460px]" placeholder="Discover influencers"/>
              </Card>
            </Link>
          </Card>
          <Card className="shadow-none border-none mt-20">
            <CardHeader>
              <CardTitle className="ml-2 text-[23px] font-semibold">Strategies</CardTitle>
            </CardHeader>
            {/* unconventional but i needed to place footer above the content */}
            <CardFooter className="justify-center">
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>

                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Create Strategy</DialogTitle>
                  </DialogHeader>
                  <FormProvider {...methods}>
                    <NewStrategyUI
                      onSubmit={handleStrategySubmit}
                      setIsDialogOpen={setIsDialogOpen}
                    />
                  </FormProvider>
                </DialogContent>
              </Dialog>
            </CardFooter>
            <CardContent className="flex flex-row align-middle mt-[-30px]">
              <Card onClick={() => setIsDialogOpen(true)} className="cursor-pointer mt-3 text-[40px] ml-3 h-[200px] flex w-[200px] pl-3 pr-3  shadow-md align-middle justify-center" style={{border:"black solid 1px"}}>
               <p className="self-center">+</p>
              </Card>
              {isLoading ? (
                <Skeleton className="w-[100px] h-[20px] rounded-full " />
              ) : (
                strategies.slice(0, 3).map((strategy) => (
                  <Card
                    key={strategy.id}
                    className="cursor-pointer mt-3 ml-4 h-[200px] w-[300px] pl-3 pb-3 pt-3 pr-3 flex flex-col justify-between align-top border-none shadow-md"
                    onClick={() => router.push(`/strategies/${strategy.id}`)}
                  >
                    <Card className="flex border-none shadow-none">
                      <img
                        className="w-[40px] h-[40px] rounded-[50%]"
                        src={strategy.pictureUrl}
                        alt=""
                      />
                      <p className="ml-2 text-[18px] self-center font-semibold">
                        {strategy.name || `Strategy ${strategy.id}`}
                      </p>
                    </Card>
                    <Card className="flex border-none shadow-none justify-between">
                      <Card className="flex border-none shadow-none">
                        <i className="self-center fa-solid fa-list text-gray-400 text-[14px]"></i>
                        <p className="ml-2 text-gray-400 text-[14px]">
                          {strategy.listCount} lists
                        </p>
                      </Card>
                      <Card className="flex border-none shadow-none text-[14px]">
                        {formatDateToMDY(strategy.createdAt)}
                      </Card>
                    </Card>
                  </Card>
                ))
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
