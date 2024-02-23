"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import Heading from "@/components/heading";
import { Plus, UserRound } from "lucide-react";
import { DataTable } from "@/components/ui/Table/DataTable"; // Assuming DataTable is correctly implemented
import { columns } from "@/components/ui/Table/columns"; // Assuming columns are defined
import FilterUI from "@/components/filter-ui";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AIFilterUI from "@/components/ai.filter-ui";
import DiscoverListUI from "@/components/list.ui";
import { useAuth } from "@/app/context/AuthContext";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
} from "@/components/ui/sheet";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { SkeletonDemo } from "@/components/SkeletonDemo";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FormProvider, useForm } from "react-hook-form";
import NewStrategyUI from "@/components/form.list.ui";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import * as z from "zod";
import { Strategy } from "@prisma/client";

type SocialHandleMetric = {
  followers: number;
  following: number;
  avgEngagement: number;
  avgLikes: number;
  avgComments: number;
  numOfPosts: number;
  avgVideoViews: number;
  subscribers: number;
  totalVideos: number;
  avgReach: number;
  totalViews: number;
  __typename: string;
};

type SocialHandle = {
  id: string;
  platform: string;
  handle: string;
  url: string;
  metrics: SocialHandleMetric;
  __typename: string;
};

type ContentCategory = {
  id: string;
  name: string;
  __typename: string;
};

type CreatorProgram = {
  id: string;
  tag: string;
  level: string;
  __typename: string;
};

type ProfileImage = {
  url: string;
  __typename: string;
};

type DataType = {
  _id: string;
  id: string;
  onGcc: boolean;
  instaVerified: boolean;
  blackListedBy: null | string;
  blackListedReason: null | string;
  isBlackListed: boolean;
  name: string;
  email: string;
  socialHandles: SocialHandle[];
  gender: string;
  contentCategories: ContentCategory[];
  label: null | string;
  profileLabel: string;
  languages: null | string[];
  country: string;
  state: string;
  city: string;
  bio: string;
  dob: string;
  age: number;
  barterAllowed: boolean;
  isPlixxoUser: boolean;
  profileImage: ProfileImage;
  whatsappNumber: string;
  whatsappOptin: boolean;
  creatorPrograms: CreatorProgram[];
  creatorCohorts: null | string[]; // assuming it's an array of strings, update if it's different
  phone: string;
  comment: null | string;
  commercials: any[]; // Specify the type for commercials if you have a structure for it
  __typename: string;
};

// For the API response
type ApiResponse = {
  totalDocuments: number;
  results: DataType[];
};

const strategySchema = z.object({
  strategyName: z.string().min(1, "Please enter the strategy name"),
  addInfluencersBy: z.enum(["search", "manual"]),
  description: z.string().optional(),
});

type StrategyFormData = z.infer<typeof strategySchema>;

const DiscoverPage = () => {
  const [data, setData] = useState<DataType[]>([]);
  const [page, setPage] = useState(1); // Starting from 1 for user-friendly page numbering
  const [pageSize, setPageSize] = useState(10);
  const [filters, setFilters] = useState([]);
  const [totalDocuments, setTotalDocuments] = useState(0);
  const [filterData, setFilterData] = useState<object>({});
  const { userId } = useAuth();

  const handleFilterData = (dataFromChild: object) => {
    setFilterData(dataFromChild);
    console.log("data recieved", dataFromChild);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const body = {
          filters: filterData, // Add your filters here
          page: page - 1,
          pageSize: pageSize,
        };
        console.log("fireeee");
        const response = await axios.post("/api/search", body);
        if (response.data.results) {
          setData([...response.data.results]); // Spread into a new array to ensure React recognizes the change
          setTotalDocuments(response.data.totalDocuments);
        }
        console.log("Query results:", response.data.results);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [page, pageSize, filterData]);

  const [plans, setPlans] = useState([
    { id: 1, name: "Basic Plan", date: "Jan 20, 2024" },
    { id: 2, name: "Premium Plan", date: "Jan 22, 2024" },
    // Add more plans as needed
  ]);

  // Handlers for plan actions
  const handleNewPlan = () => {
    // Logic to add a new plan
  };

  const handleSelectPlan = (planId: number) => {
    // Logic when a plan is selected
  };

  const handleDeletePlan = (planId: number) => {
    // Logic to delete a plan
  };

  const [isSheetOpen, setIsSheetOpen] = useState(false);

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
    <div className="pt-[5rem]">
      <Heading
        title="Creator Discovery"
        description="Instantly Connect with Influencers from the Largest Database"
        icon={UserRound}
        iconColor="text-black-500"
        bgColor="bg-slate-500/10"
      />

      {/* Main content and sidebar wrapper */}
      <div className="flex flex-col items-center sm:mx-4">
        <div className="flex w-full max-w-8xl">
          {/* Main content */}
          <section className="flex-grow flex  flex-col py-12 pr-4">
            <Button
              onClick={() => {
                setIsSheetOpen(true);
              }}
              className="self-start ml-[5px] sm:hidden mb-3 lg:ml-0 md:ml-3 mr-16  "
            >
              Strategies
            </Button>
            <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
              <link
                rel="stylesheet"
                href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
                integrity="sha512-DTOQO9RWCH3ppGqcWaEA1BIZOC6xxalwEsw9c2QQeAIftl+Vegovlnee1c9QX4TctnWMn13TZye+giMm8e2LwA=="
                crossOrigin="anonymous"
                referrerPolicy="no-referrer"
              />
              <SheetContent className="w-[640px] overflow-y-scroll overflow-x-scroll ">
                <div className="sm:hidden lg:flex sticky top-[5rem] h-screen w-[250px] overflow-y-auto p-3 border-inherit shadow-lg rounded-lg">
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
                      <Dialog
                        open={isDialogOpen}
                        onOpenChange={setIsDialogOpen}
                      >
                        <DialogTrigger asChild>
                          <Button
                            className="p-6 text-md align-middle"
                            onClick={() => setIsDialogOpen(true)}
                          >
                            <Plus className="mr-3" /> New Strategy 🤓
                          </Button>
                        </DialogTrigger>

                        <DialogContent className="mt-[-300px] w-[350px] ml-[-150px]">
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
                              onClick={() =>
                                router.push(`/strategies/${strategy.id}`)
                              }
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
                                <Card className="flex border-none shadow-none text-[10px]">
                                  {formatDateToMDY(strategy.createdAt)}
                                </Card>
                              </Card>
                            </Card>
                          ))}
                        </ScrollArea>
                      )}
                    </CardContent>
                  </Card>
                </div>
              </SheetContent>
            </Sheet>
            <Tabs defaultValue="manual">
              <TabsList>
                <TabsTrigger value="manual">Manual</TabsTrigger>
                <TabsTrigger value="ai-filter">AI Based Filtering</TabsTrigger>
              </TabsList>
              <TabsContent value="manual">
                <FilterUI onDataFromChild={handleFilterData} />
              </TabsContent>
              <TabsContent value="ai-filter">
                <AIFilterUI />
              </TabsContent>
            </Tabs>
            <DataTable
              key={`${page}-${pageSize}`}
              totalDocuments={totalDocuments}
              columns={columns}
              data={data}
              page={page}
              setPage={setPage}
              pageSize={pageSize}
              setPageSize={setPageSize}
            />
          </section>

          {/* List Sidebar */}
          <DiscoverListUI userId={userId} />
        </div>
      </div>
    </div>
  );
};

export default DiscoverPage;
