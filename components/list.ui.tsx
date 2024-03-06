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
import {
  ArrowRight,
  DeleteIcon,
  Edit2,
  MoveLeftIcon,
  Plus,
  Trash2,
} from "lucide-react";
import strategyDao from "@/dao/StrategyDao";
import { Strategy, List } from "@prisma/client";
import { Skeleton } from "@/components/ui/skeleton";
import { ScrollArea } from "@/components/ui/scroll-area";
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
import NewListUI from "./new.list.ui";
import { Input } from "./ui/input";
import { THUMBNAIL } from "@/constants";

// interface StrategyFormData {
//   name: string;
//   description?: string;
// }

const strategySchema = z.object({
  strategyName: z.string().min(1, "Please enter the strategy name"),
  addInfluencersBy: z.enum(["search", "manual"]),
  description: z.string().optional(),
});

type LisType = {
  id: string;
  listName: string;
};

type Influencer = {
  id: string;
  username: string;
};

interface RenderStrategiesProps {
  strategies: Strategy[];
  onStrategyClick: (strategyId: string) => void;
  isLoading: boolean;
}

interface ListProps {
  lists: List[];
  onListClick: (listId: string) => void;
  isLoading: boolean;
}

interface InfluencerProps {
  influencers: Influencer[];
  isLoading: boolean;
}

interface InputValues {
  inputValue: string;
}

function formatDateToMDY(date: Date): string {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return new Date(date).toLocaleDateString(undefined, options);
}

type StrategyFormData = z.infer<typeof strategySchema>;

const DiscoverListUI = ({ userId }: { userId: string }) => {
  const [strategies, setStrategies] = useState<Strategy[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [lists, setLists] = useState<List[]>([]);
  const [influencers, setInfluencers] = useState<Influencer[]>([]);
  const [createListValue, setCreateListValue] = useState<string>("");
  const [viewMode, setViewMode] = useState<
    "strategies" | "lists" | "influencers"
  >("strategies");
  const [currentStrategyId, setCurrentStrategyId] = useState<string | null>(
    null
  );
  const [isNewListDialogOpen, setIsNewListDialogOpen] = useState(false);

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

  const handleStrategyClick = async (strategyId: string) => {
    console.log(`Attempting to fetch lists for strategy ID: ${strategyId}`); // Additional log
    setIsLoading(true);
    try {
      // Note the change in the URL structure here: we use a query parameter `q` instead of a dynamic segment in the path.
      const response = await axios.get(`/api/strategy/lists?q=${strategyId}`);
      console.log("Lists fetched:", response.data); // Additional log
      setLists(response.data);
      setCurrentStrategyId(strategyId);
      setViewMode("lists");
    } catch (error) {
      console.error("Error fetching lists:", error);
      if (axios.isAxiosError(error)) {
        console.error("Error details:", error.response?.data || error.message); // Additional log
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleListClick = async (listId: string) => {
    setIsLoading(true);
    try {
      const response = await axios.get(`/api/influencers/by-list/${listId}`);
      setInfluencers(response.data);
      setViewMode("influencers");
    } catch (error) {
      console.error("Error fetching influencers:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleNavigation = () => {
    if (viewMode === "influencers") {
      setViewMode("lists");
      setInfluencers([]);
    } else if (viewMode === "lists") {
      setViewMode("strategies");
      setCurrentStrategyId(null);
      setLists([]);
    }
  };

  const handleStrategySubmit = async (data: StrategyFormData) => {
    console.log("Strategy Data:", data);
    setIsDialogOpen(false);
    console.log("Form Data Submitted:", data); // First, log data to the console

    // Construct the strategy data object
    const strategyData = {
      name: data.strategyName,
      pictureUrl: THUMBNAIL,
      description: data.description,
    };

    console.log("Strategy Data to Send:", strategyData); // Log the strategy data

    try {
      const response = await axios.post("/api/strategy/new", {
        name: data.strategyName,
        pictureUrl: THUMBNAIL,
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

  const handleCreateListSubmit = async (listName: string) => {
    if (currentStrategyId) {
      setIsLoading(true);
      try {
        const response = await axios.post(
          `/api/strategy/lists/create?q=${currentStrategyId}`,
          {
            name: listName,
          }
        );
        console.log("New List Response:", response.data);
        setLists((current) => [...current, response.data]);
        setIsNewListDialogOpen(false); // Close the dialog
      } catch (error) {
        console.error("Error creating list:", error);
      } finally {
        setIsLoading(false);
      }
    } else {
      console.error("No strategy selected for the new list");
    }
  };

  return (
    <>
      <aside className="sticky top-[5rem] h-screen w-[350px] overflow-y-auto p-3 border-inherit shadow-lg rounded-lg">
        {viewMode === "strategies" && (
          <RenderStrategies
            strategies={strategies}
            onStrategyClick={handleStrategyClick}
            isLoading={isLoading}
          />
        )}
        {viewMode === "lists" && (
          <RenderLists
            lists={lists}
            onListClick={handleListClick}
            isLoading={isLoading}
          />
        )}
        {viewMode === "influencers" && (
          <RenderInfluencers influencers={influencers} isLoading={isLoading} />
        )}
        {/* Add the Create Strategy button and Dialog here */}
        {viewMode === "strategies" && (
          <>
            <div className="p-4">
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button
                    onClick={() => setIsDialogOpen(true)}
                    className="flex items-center"
                  >
                    <Plus className="mr-2" /> New Strategy
                  </Button>
                </DialogTrigger>
                <DialogContent className="w-[512px]">
                  <DialogHeader>
                    <DialogTitle>Create New Strategy</DialogTitle>
                  </DialogHeader>
                  <FormProvider {...methods}>
                    <NewStrategyUI
                      onSubmit={handleStrategySubmit}
                      setIsDialogOpen={setIsDialogOpen}
                    />
                  </FormProvider>
                </DialogContent>
              </Dialog>
            </div>
          </>
        )}

        {viewMode === "lists" && (
          <>
            <Button
              variant={"outline"}
              className="mt-2 mb-2 w-[140px]"
              onClick={() => setViewMode("strategies")}
            >
              <MoveLeftIcon className="mr-2" /> Strategies
            </Button>
            <Dialog
              open={isNewListDialogOpen}
              onOpenChange={setIsNewListDialogOpen}
            >
              <DialogTrigger asChild>
                <Button
                  className="w-[140px]"
                  onClick={() => setIsNewListDialogOpen(true)}
                >
                  Create New List
                </Button>
              </DialogTrigger>
              <DialogContent className="w-[512px]">
                <DialogHeader>
                  <DialogTitle>Create New List</DialogTitle>
                </DialogHeader>
                <FormProvider {...methods}>
                  {/* Assume NewListUI is a component similar to NewStrategyUI for list creation */}
                  <div className="flex flex-col">
                    <Input
                      onChange={(e) => setCreateListValue(e.target.value)}
                      value={createListValue}
                    />
                    <Button
                      onClick={() => handleCreateListSubmit(createListValue)}
                      className="self-start mt-3"
                    >
                      Add
                    </Button>
                  </div>
                </FormProvider>
              </DialogContent>
            </Dialog>
          </>
        )}
      </aside>

      {/* Strategy Creation Dialog */}
    </>
  );
};

export default DiscoverListUI;

const RenderStrategies: React.FC<RenderStrategiesProps> = ({
  strategies,
  onStrategyClick,
  isLoading,
}) => {
  return (
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
      <CardContent className="flex flex-col align-middle">
        <ScrollArea className="w-full">
          {isLoading ? (
            <SkeletonDemo />
          ) : (
            strategies.map((strategy) => (
              <div
                key={strategy.id}
                className="cursor-pointer shadow-md mr-1 rounded-sm mb-1 mt-3 h-[100px] pl-3 pb-3 pt-3 pr-3 flex flex-col justify-between align-top"
                onClick={() => onStrategyClick(strategy.id)}
              >
                <div className="flex gap-2 align-middle items-center">
                  <img
                    className="w-[40px] h-[40px] rounded-[50%]"
                    src={strategy.pictureUrl || "default-image-path"}
                    alt={strategy.name}
                  />
                  <p className="ml-2 self-center font-semibold">
                    {strategy.name || `Strategy ${strategy.id}`}
                  </p>
                </div>
                <div className="flex border-none shadow-none justify-between">
                  <div className="flex border-none shadow-none">
                    <i className="self-center fa-solid fa-list text-gray-400 text-[10px]"></i>
                    <p className="ml-2 text-gray-400 text-[10px]">
                      {strategy.listCount || 0} lists
                    </p>
                  </div>
                  <div className="flex border-none shadow-none text-[10px]">
                    {formatDateToMDY(strategy.createdAt)}
                  </div>
                </div>
              </div>
            ))
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

const RenderLists: React.FC<ListProps> = ({
  lists,
  onListClick,
  isLoading,
}) => {
  const [isNewListDialogOpen, setIsNewListDialogOpen] = useState(false);
  const [createListValue, setCreateListValue] = useState<string>("");
  const [inputs, setInputs] = useState(lists.map(() => ({ inputValue: "" })));
  const [isEditable, setIsEditable] = useState(false);
  const handleToggleEdit = () => {
    setIsEditable(!isEditable);
  };
  const handleInputChange = (
    index: number,
    field: keyof InputValues,
    value: string
  ) => {
    const newInputs = [...inputs];
    newInputs[index][field] = value;
    setInputs(newInputs);
  };
  const handleEditList = async (listNewName: string, listId: string) => {
    try {
      const response = await axios.post(
        `/api/strategy/lists/update?listId=${listId}&name=${listNewName}`
      );
      console.log("New List Response:", response.data);

      setIsNewListDialogOpen(false); // Close the dialog
    } catch (error) {
      console.error("Error creating list:", error);
    }
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle>All Lists</CardTitle>
        <p className="text-muted-foreground text-md">
          Select a List to manage influencers. 👇🏻
        </p>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <SkeletonDemo />
        ) : (
          <>
            <ScrollArea>
              {lists.map((list, index) => (
                <div
                  key={list.id}
                  className=" mt-2 flex flex-col justify-between mb-2 mr-1 ml-1 rounded-sm p-2 shadow-md"
                >
                  {/* List details */}

                  <div className="">
                    {isEditable ? (
                      <div className="flex gap-3 justify-between w-[200px]">
                        <Input
                          type="text"
                          value={inputs[index]?.inputValue || list.name}
                          onChange={(e) =>
                            handleInputChange(
                              index,
                              "inputValue",
                              e.target.value
                            )
                          }
                          placeholder="Input Value"
                        />
                        <Button
                          onClick={() => {
                            handleEditList(inputs[index]?.inputValue, list.id);
                            handleToggleEdit();
                          }}
                          className=" self-center"
                        >
                          Save
                        </Button>
                      </div>
                    ) : (
                      <div className="flex gap-3 justify-between w-[200px]">
                        <p>{inputs[index]?.inputValue || list.name}</p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </ScrollArea>
            <Button onClick={handleToggleEdit}>
              <Edit2 />
            </Button>
          </>
        )}
      </CardContent>
    </Card>
  );
};

const RenderInfluencers: React.FC<InfluencerProps> = ({
  influencers,
  isLoading,
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Influencers</CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <SkeletonDemo />
        ) : (
          <ScrollArea>
            {influencers.map((influencer) => (
              <div key={influencer.id} className="cursor-pointer">
                {/* Influencer details */}
                <p>{influencer.username}</p>
              </div>
            ))}
          </ScrollArea>
        )}
      </CardContent>
    </Card>
  );
};
