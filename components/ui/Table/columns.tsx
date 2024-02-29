"use client";

import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import { Label } from "@radix-ui/react-label";
import {
  JSXElementConstructor,
  Key,
  PromiseLikeOfReactNode,
  ReactElement,
  ReactNode,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { Card } from "../card";
import { useAuth } from "@/app/context/AuthContext";
import { Strategy } from "@prisma/client";
import axios from "axios";

export type User = {
  id: string;
  name: String;
  email: string;
  image: string;
  lastSeen: string;
};

export type Profile = {
  id: string;
  name: string;
  profileImage: {
    url: string;
  };
  socialHandles: Array<{
    handle: string;
    metrics: {
      followers: number;
      avgEngagement: number;
    };
  }>;
};

export const columns: ColumnDef<Profile>[] = [
  {
    // New column for Profile Image
    accessorFn: (row) => row.profileImage?.url,
    id: "profileImage",
    header: " ",
    cell: (info) => {
      const imageUrl = info.getValue();
      if (typeof imageUrl === "string") {
        return (
          <div style={{ width: "50px", height: "50px", position: "relative" }}>
            <img
              src={imageUrl}
              alt="Profile"
              style={{ width: "50px", height: "50px", borderRadius: "50%" }}
            />
          </div>
        );
      }
      return "No Image";
    },
  },
  {
    accessorKey: "name",
    header: "Full Name",
  },
  {
    accessorFn: (row) => row.socialHandles[0]?.handle || "N/A",
    id: "username",
    header: "Username",
  },
  {
    accessorFn: (row) =>
      row.socialHandles[0]?.metrics.followers.toLocaleString() || "0",
    id: "followers",
    header: "Followers",
  },
  {
    accessorFn: (row) =>
      (row.socialHandles[0]?.metrics.avgEngagement).toFixed(2) + "%",
    id: "avgEngagement",
    header: "Engagement Rate",
  },
  {
    id: "add",
    cell: ({ row, cell }) => {
      const user = row.original;
      const [lists, setLists] = useState<any>([]);
      const [selectedList, setSelectedList] = useState("");
      const [selectedStrategy, setSelectedStrategy] = useState("");
      const [strategies, setStrategies] = useState<Strategy[]>([]);
      const [isLoading, setIsLoading] = useState(true);
      const [currentStrategyId, setCurrentStrategyId] = useState<string | null>(
        null
      );
      console.log(cell.row.original.socialHandles[0].handle);

      const { userId } = useAuth();
      useEffect(() => {
        const fetchStrategies = async () => {
          if (userId) {
            setIsLoading(true);
            try {
              const response = await fetch("/api/strategy/get-all");
              
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

      const fetchLists = async (strategyId: SetStateAction<string | null>) => {
        if (userId) {
         
          setIsLoading(true);
          try {
            // Note the change in the URL structure here: we use a query parameter `q` instead of a dynamic segment in the path.
            const response = await axios.get(
              `/api/strategy/lists?q=${strategyId}`
            );
            // Additional log
            setLists(response.data);
            setCurrentStrategyId(strategyId);
          } catch (error) {
            console.error("Error fetching lists:", error);
            if (axios.isAxiosError(error)) {
              console.error(
                "Error details:",
                error.response?.data || error.message
              ); // Additional log
            }
          } finally {
            setIsLoading(false);
          }
        }
      };

      const handleAddInfluencer = async (username: string) => {
        console.log(selectedList);

        try {
          const response = await axios.post(
            `/api/strategy/lists/manage-profiles?q=${selectedList}`,
            {
              action: "add",
              profiles: [username],
            }
          );
        } catch (error) {
          console.log(error);
        }
      };

      return (
        <Drawer>
          <DrawerTrigger asChild>
            <Button variant="outline">Add To List</Button>
          </DrawerTrigger>
          <DrawerContent>
            <div className="mx-auto w-full h-[250px]  max-w-sm">
              <Card className="mt-3 self-center border-none p-3 flex flex-col">
                <Label>Choose a Strategy : </Label>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline">{selectedStrategy}</Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56  ">
                    <DropdownMenuLabel>Your Strategies</DropdownMenuLabel>
                    <DropdownMenuSeparator />

                    <DropdownMenuRadioGroup
                      value={selectedStrategy}
                      onValueChange={setSelectedStrategy}
                      className="h-[200px] overflow-y-scroll"
                    >
                      {strategies.map((strategy, index) => (
                        <div key={index}>
                          <DropdownMenuRadioItem
                            value={strategy.name}
                            onClick={() => {
                              console.log(strategy.id);

                              fetchLists(strategy.id);
                            }}
                          >
                            {strategy.name}
                          </DropdownMenuRadioItem>
                        </div>
                      ))}
                    </DropdownMenuRadioGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
                {selectedStrategy ? (
                  <>
                    <Label>Choose a List : </Label>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline">{selectedList}</Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-56">
                        <DropdownMenuLabel>Your Lists</DropdownMenuLabel>
                        <DropdownMenuSeparator />

                        <DropdownMenuRadioGroup
                          value={selectedList}
                          onValueChange={setSelectedList}
                        >
                          {lists.map(
                            (
                              list: {
                                name:
                                  | string
                                  | number
                                  | boolean
                                  | ReactElement<
                                      any,
                                      string | JSXElementConstructor<any>
                                    >
                                  | Iterable<ReactNode>
                                  | PromiseLikeOfReactNode
                                  | null
                                  | undefined;
                              },
                              index: Key | null | undefined
                            ) => (
                              <div key={index}>
                                <DropdownMenuRadioItem
                                  value={list.name}
                                  onClick={() => {
                                    setSelectedList(list.name);
                                  }}
                                >
                                  {list.name}
                                </DropdownMenuRadioItem>
                              </div>
                            )
                          )}
                        </DropdownMenuRadioGroup>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </>
                ) : (
                  <></>
                )}
                <Button
                  onClick={() => {
                    handleAddInfluencer(cell.row.original.socialHandles[0].handle);
                  }}
                  className="mt-3 self-start"
                >
                  Add influencer
                </Button>

              </Card>
            </div>
          </DrawerContent>
        </Drawer>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const user = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(user.id)}
            >
              Refresh
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View Profile</DropdownMenuItem>
            <DropdownMenuItem></DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

// export const columnsOld: ColumnDef<User>[] = [
//     {
//         accessorKey: 'name',
//         header: 'Name',
//     },
//     {
//         accessorKey: 'email',
//         header: 'Email',
//     },
//     {
//         accessorKey: 'lastSeen',
//         header: 'Last Seen',
//         cell: ({ row }) => {
//             const date = new Date(row.getValue('lastSeen'));
//             const formattedDate = date.toLocaleDateString('en-US', {
//                 month: 'short',
//                 day: 'numeric',
//                 year: 'numeric',
//             });
//             return <span>{formattedDate}</span>;
//         }
//     },
//     {
//         id: "actions",
//         cell: ({ row }) => {
//           const user = row.original

//           return (
//             <DropdownMenu>
//               <DropdownMenuTrigger asChild>
//                 <Button variant="ghost" className="h-8 w-8 p-0">
//                   <span className="sr-only">Open menu</span>
//                   <MoreHorizontal className="h-4 w-4" />
//                 </Button>
//               </DropdownMenuTrigger>
//               <DropdownMenuContent align="end">
//                 <DropdownMenuLabel>Actions</DropdownMenuLabel>
//                 <DropdownMenuItem
//                   onClick={() => navigator.clipboard.writeText(user.id)}
//                 >
//                   Copy payment ID
//                 </DropdownMenuItem>
//                 <DropdownMenuSeparator />
//                 <DropdownMenuItem>View customer</DropdownMenuItem>
//                 <DropdownMenuItem>View payment details</DropdownMenuItem>
//               </DropdownMenuContent>
//             </DropdownMenu>
//           )
//         },
//       },
// ]
