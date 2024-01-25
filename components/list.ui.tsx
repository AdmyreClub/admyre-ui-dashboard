"use client";

import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import strategyDao from "@/dao/StrategyDao";
import { Strategy } from "@prisma/client";
import { Skeleton } from "@/components/ui/skeleton";
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import * as z from "zod";
import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import NewStrategyUI from "./form.list.ui";
import { SkeletonDemo } from "./SkeletonDemo";

// interface StrategyFormData {
//   name: string;
//   description?: string;
// }

const strategySchema = z.object({
  strategyName: z.string().min(1, "Please enter the strategy name"),
  addInfluencersBy: z.enum(["search", "manual"]),
  description: z.string().optional(),
});

type StrategyFormData = z.infer<typeof strategySchema>;

const DiscoverListUI = ({ userId }: { userId: string }) => {
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
      <aside className="sticky top-[5rem] h-screen w-[350px] overflow-y-auto p-3 border-inherit shadow-lg rounded-lg">
        <Card>
          <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
            integrity="sha512-DTOQO9RWCH3ppGqcWaEA1BIZOC6xxalwEsw9c2QQeAIftl+Vegovlnee1c9QX4TctnWMn13TZye+giMm8e2LwA=="
            crossOrigin="anonymous"
            referrerPolicy="no-referrer"
          />
          <CardHeader>
            <CardTitle>All Strategies</CardTitle>
            <CardDescription className="text-md">
              Select a strategy to manage lists and influencers. 👇🏻
            </CardDescription>
          </CardHeader>
          {/* unconventional but i needed to place footer above the content */}
          <CardFooter className="justify-center">
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button
                  className="p-6 text-md align-middle"
                  onClick={() => setIsDialogOpen(true)}
                >
                  <Plus className="mr-3" /> New Strategy 🤓
                </Button>
              </DialogTrigger>

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
          <CardContent className="flex flex-col align-middle">
            {isLoading ? (
             <SkeletonDemo />
            ) : (
              <ScrollArea className="w-full">
                {strategies.map((strategy) => (
                  <Card
                    key={strategy.id}
                    className="cursor-pointer mt-3 h-[100px] pl-3 pb-3 pt-3 pr-3 flex flex-col justify-between align-top"
                    onClick={() => router.push(`/strategies/${strategy.id}`)}
                  >
                    <div className="flex gap-2 align-middle items-center">
                      <img
                        className="w-[40px] h-[40px] rounded-[50%]"
                        src={strategy.pictureUrl}
                        alt=""
                      />
                      <p className="ml-2 self-center font-semibold">
                        {strategy.name || `Strategy ${strategy.id}`}
                      </p>
                    </div>
                    <Card className="flex border-none shadow-none justify-between">
                      <Card className="flex border-none shadow-none">
                        <i className="self-center fa-solid fa-list text-gray-400 text-[10px]"></i>
                        <p className="ml-2 text-gray-400 text-[10px]">
                          {strategy.listCount} lists
                        </p>
                      </Card>
                      <Card className="flex border-none shadow-none text-[10px]">{formatDateToMDY(strategy.createdAt)}</Card>
                    </Card>
                  </Card>
                ))}
              </ScrollArea>
            )}
          </CardContent>

        </Card>
      </aside>

      {/* Strategy Creation Dialog */}
    </>
  );
};

export default DiscoverListUI;
