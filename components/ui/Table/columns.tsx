"use client";

import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import Chart from "./charts/followingChart";
import Dashboard from "./charts/chartColumn";
import AudienceLocations from "./charts/locationChart";
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
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet";
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
import Link from "next/link";

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
      //console.log(cell.row.original.socialHandles[0].handle);

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
      const getListIdByName = (listName: string) => {
        const foundList = lists.find(
          (list: { name: string }) => list.name === listName
        );

        // If the list is found, return its id; otherwise, return null or handle accordingly
        return foundList ? foundList.id : null;
      };

      // rishabh problem here
      const handleAddInfluencer = async (influencer: object) => {
        console.log(getListIdByName(selectedList));
        console.log('first step is: ', influencer);


        try {
          const response = await axios
            .post(
              `/api/strategy/lists/manage-profiles/add/${getListIdByName(
                selectedList
              )}`,
              influencer,
              {
                headers: {
                  // Include any required headers here. For example, Authorization if needed.
                },
              }
            )
            .then((response) => {
              console.log('add the data: ', response.data);
            })
            .catch((error) => {
              console.error("Errorzzzz:", error);
            });
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
                    handleAddInfluencer(cell.row.original);
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
      const [isSheetOpen, setIsSheetOpen] = useState(false);
      const [sheetUserName, setSheetUserName] = useState<string>("");
      const [selectedRowData, setSelectedRowData] = useState<TData | null>(
        null
      );
      const handleMoreInfo = (name) => {
        setIsSheetOpen(true);
        setSelectedRowData(name);
        setSheetUserName(name);
      };
      function formatLargeNumber(number: number) {
        const billion = 1000000000;
        const million = 1000000;
        const thousand = 1000;

        if (number >= billion) {
          return (Math.round((number / billion) * 100) / 100).toFixed(0) + "B";
        } else if (number >= million) {
          return (Math.round((number / million) * 100) / 100).toFixed(0) + "M";
        } else if (number >= thousand) {
          return (Math.round((number / thousand) * 100) / 100).toFixed(0) + "K";
        } else if (number >= 100) {
          return Math.round(number).toString();
        } else {
          return number.toFixed(0); // Format numbers less than 100 with two decimal places
        }
      }

      return (
        <>
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
              <DropdownMenuItem onClick={() => handleMoreInfo(row.original)}>
                More Info
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          {selectedRowData && sheetUserName && (
            <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
              <link
                rel="stylesheet"
                href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
                integrity="sha512-DTOQO9RWCH3ppGqcWaEA1BIZOC6xxalwEsw9c2QQeAIftl+Vegovlnee1c9QX4TctnWMn13TZye+giMm8e2LwA=="
                crossOrigin="anonymous"
                referrerPolicy="no-referrer"
              />
              <SheetContent className="w-[540px] overflow-y-scroll overflow-x-hidden no-scrollbar">
                <SheetHeader>
                  <SheetTitle className="text-right ">
                    <Card className="border-none shadow-none mt-4 font-light text-gray-400 font-semibold text-[14px]">
                      <Link
                        href={sheetUserName.socialHandles[0].url}
                        target="#"
                      >
                        <i class="fa-solid fa-arrow-up-right-from-square mr-3"></i>
                      </Link>
                      {sheetUserName.city ? `@ ${sheetUserName.city}` : ``}
                    </Card>
                  </SheetTitle>

                  <SheetDescription className="text-center align-middle flex-col justify-center ">
                    {/* main info*/}
                    <Card className="flex justify-around w-[520px] ml-[-15px] border-none shadow-none">
                      <div>
                        <Card className="align-center justify-left flex mb-3 mt-3 border-none shadow-none">
                          <Card className="w-[150px] h-[150px] rounded-[50%] align-left overflow-hidden">
                            <img src={sheetUserName.profileImage.url} alt="" />
                          </Card>
                        </Card>
                        <Card className=" text-left border-none shadow-none ">
                          <Card className="flex justify-center border-none shadow-none ">
                            <p className="text-[18px] font-bold ">
                              {sheetUserName.name}
                            </p>
                          </Card>
                        </Card>
                        <div className="flex justify-center mt-2">
                          <Button
                            className="w-[30px] h-[30px] bg-white hover:bg-white text-center align-middle mr-3 pt-1 border-none shadow-md"
                            disabled={
                              sheetUserName.whatsappNumber ? false : true
                            }
                          >
                            <Link
                              href={`https://wa.me/${sheetUserName.whatsappNumber}`}
                              target="#"
                            >
                              <i className=" fa-brands fa-whatsapp text-black self-center mt-2"></i>
                            </Link>
                          </Button>
                          <Button
                            className="w-[30px] h-[30px] bg-white hover:bg-white text-center align-middle mr-3 pt-1 border-none shadow-md"
                            disabled={sheetUserName.email ? false : true}
                          >
                            <Link
                              href={`mailto:${sheetUserName.email}`}
                              target="#"
                            >
                              <i className=" fa-solid fa-envelope text-black self-center mt-2"></i>
                            </Link>
                          </Button>
                        </div>
                      </div>
                      {/* social icons */}
                      <div className="align-center justify-left flex mb-3 mt-7 ml-2 mr-10 h-[180px] w-[300px]">
                        <Card className="flex flex-col shadow-none  border-none ">
                          <Card className="bg-white hover:bg-white flex w-[300px] justify-left p-2  border-none shadow-none">
                            <i className="text-red-600 fa-brands fa-youtube self-center "></i>
                            <p className="self-center ml-2 text-gray-400">
                              The data is currently unavailable
                            </p>
                          </Card>
                          <Card className="bg-white hover:bg-white flex w-[300px] justify-left p-2  border-none shadow-none">
                            <i className="text-blue-500 self-center fa-brands fa-twitter"></i>
                            <p className="self-center ml-2 text-gray-400">
                              The data is currently unavailable
                            </p>
                          </Card>
                          <Card className="bg-white hover:bg-white flex w-[300px] justify-left p-2  border-none shadow-none">
                            <i className="text-blue-700 self-center fa-brands fa-facebook"></i>
                            <p className="self-center ml-2 text-gray-400">
                              The data is currently unavailable
                            </p>
                          </Card>
                          <Card className="bg-white hover:bg-white flex w-[300px] justify-left p-2  border-none shadow-none">
                            <i className="text-black self-center fa-brands fa-tiktok"></i>
                            <p className="self-center ml-2 text-gray-400">
                              The data is currently unavailable
                            </p>
                          </Card>

                          <Card className="flex-col text-justify p-2 border-none shadow-none">
                            <Card className="border-none shadow-none font-light ml-[-5px] text-gray-400 font-semibold text-[14px]">
                              Bio :
                            </Card>
                            <p>{sheetUserName.bio}</p>
                          </Card>
                        </Card>
                      </div>
                    </Card>
                    {/* user info */}
                    <Card className="align-center justify-center flex mb-3 mt-6 border-none shadow-none">
                      <Card className="flex-col border-none shadow-none align-center justify-center ml-6">
                        <Card className="flex justify-around border-none shadow-none mt-5 mr-[10px]">
                          <Card className=" w-[120px] h-[80px] mr-3 items-stretch align-middle flex-col shadow-md border-none rounded-[3px]">
                            <i className="fa-solid fa-users mt-2"></i>
                            <p className="text-[18px] mt-2">
                              {" "}
                              {sheetUserName.socialHandles[0].metrics
                                .followers ? (
                                formatLargeNumber(
                                  sheetUserName.socialHandles[0].metrics
                                    .followers
                                )
                              ) : (
                                <>
                                  <p className="text-[10px] text-gray-200">
                                    Data unavailable
                                  </p>
                                </>
                              )}
                            </p>{" "}
                            <p className="text-[10px] text-gray-400">
                              FOLLOWERS
                            </p>
                          </Card>
                          <Card className=" w-[120px] h-[80px] mr-3 items-stretch align-middle flex-col shadow-md border-none rounded-[3px]">
                            <i className="fa-solid fa-user mt-2"></i>
                            <p className="text-[18px] mt-2">
                              {" "}
                              {sheetUserName.socialHandles[0].metrics.following}
                            </p>{" "}
                            <p className="text-[10px] text-gray-400">
                              FOLLOWING
                            </p>
                          </Card>
                          <Card className=" w-[120px] h-[80px] mr-3 items-stretch align-middle flex-col shadow-md border-none rounded-[3px]">
                            <i className="fa-solid fa-infinity"></i>
                            <p className="text-[18px] mt-2">{`${Math.round(
                              sheetUserName.socialHandles[0].metrics
                                .avgEngagement * 10
                            )} %`}</p>{" "}
                            <p className="text-[10px] text-gray-400">
                              ENGAGEMENT
                            </p>
                          </Card>
                          <Card className=" w-[120px] h-[80px] mr-3 items-stretch align-middle flex-col shadow-md border-none rounded-[3px]">
                            <i className="fa-solid fa-heart"></i>
                            <p className="text-[18px] mt-2">
                              {sheetUserName.socialHandles[0].metrics
                                .avgLikes ? (
                                formatLargeNumber(
                                  sheetUserName.socialHandles[0].metrics
                                    .avgLikes
                                )
                              ) : (
                                <>
                                  <p className="text-[10px] text-gray-200">
                                    data unavailable
                                  </p>
                                </>
                              )}
                            </p>
                            <p className="text-[10px] text-gray-400">LIKES</p>
                          </Card>
                        </Card>
                        <Card className="flex justify-around border-none shadow-none mt-5 mr-[10px]">
                          <Card className=" w-[120px] h-[80px] mr-3 items-stretch align-middle flex-col shadow-md border-none rounded-[3px]">
                            <i className="fa-solid fa-heart"></i>
                            <p className="text-[18px] mt-2">
                              {sheetUserName.socialHandles[0].metrics
                                .numOfPosts ? (
                                formatLargeNumber(
                                  sheetUserName.socialHandles[0].metrics
                                    .numOfPosts
                                )
                              ) : (
                                <>
                                  <p className="text-[10px] text-gray-200">
                                    data unavailable
                                  </p>
                                </>
                              )}
                            </p>
                            <p className="text-[10px] text-gray-400">POSTS</p>
                          </Card>
                          <Card className=" w-[120px] h-[80px] mr-3 items-stretch align-middle flex-col shadow-md border-none rounded-[3px]">
                            <i className="fa-solid fa-comment"></i>
                            <p className="text-[18px] mt-2">
                              {sheetUserName.socialHandles[0].metrics
                                .avgComments ? (
                                formatLargeNumber(
                                  sheetUserName.socialHandles[0].metrics
                                    .avgComments
                                )
                              ) : (
                                <>
                                  <p className="text-[10px] text-gray-200">
                                    data unavailable
                                  </p>
                                </>
                              )}
                            </p>
                            <p className="text-[10px] text-gray-400">
                              COMMENTS
                            </p>
                          </Card>
                          <Card className=" w-[120px] h-[80px] mr-3 items-stretch align-middle flex-col shadow-md border-none rounded-[3px]">
                            <i className="fa-solid fa-eye"></i>
                            <p className="text-[18px] mt-2">
                              {" "}
                              {sheetUserName.socialHandles[0].metrics
                                .avgVideoViews ? (
                                formatLargeNumber(
                                  sheetUserName.socialHandles[0].metrics
                                    .avgVideoViews
                                )
                              ) : (
                                <>
                                  <p className="text-[10px] text-gray-200">
                                    data unavailable
                                  </p>
                                </>
                              )}
                            </p>{" "}
                            <p className="text-[10px] text-gray-400">VIEWS</p>
                          </Card>
                          <Card className=" w-[120px] h-[80px] mr-3 items-stretch align-middle flex-col shadow-md border-none rounded-[3px]">
                            <i className="fa-solid fa-eye"></i>
                            <p className="text-[18px] mt-2">
                              {" "}
                              {sheetUserName.socialHandles[0].metrics
                                .avgVideoViews ? (
                                formatLargeNumber(
                                  sheetUserName.socialHandles[0].metrics
                                    .avgVideoViews
                                )
                              ) : (
                                <>
                                  <p className="text-[10px] text-gray-200">
                                    data unavailable
                                  </p>
                                </>
                              )}
                            </p>{" "}
                            <p className="text-[10px] text-gray-400">
                              COMMENTS
                            </p>
                          </Card>
                        </Card>
                      </Card>
                    </Card>
                    <Card className="w-[515px] flex justify-center align-middle pr-20 ml-[-10px] rounded-[3px] shadow-md border-black p-5 mt-5">
                      <Chart label={"Follower"} />
                    </Card>
                    <Card className="w-[515px] flex justify-center align-middle pr-20 ml-[-10px] rounded-[3px] shadow-md border-black p-5 mt-5">
                      <Chart label={"Following"} />
                    </Card>
                    <Card className="w-[515px] flex justify-center align-middle pr-20 ml-[-10px] rounded-[3px] shadow-md border-black p-5 mt-5 pr-6">
                      <Dashboard />
                    </Card>
                    <Card className="w-[515px] flex justify-center align-middle pr-20 ml-[-10px] rounded-[3px] shadow-md border-black p-5 mt-5 pr-6">
                      <AudienceLocations />
                    </Card>
                  </SheetDescription>
                </SheetHeader>
                {/* ...content based on selectedRowData... */}
                <SheetFooter>
                  <SheetClose asChild></SheetClose>
                </SheetFooter>
              </SheetContent>
            </Sheet>
          )}
        </>
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
