"use client";

import {
  Table as TanTable,
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";

import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
} from "@radix-ui/react-icons";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
import { useState } from "react";
import { Card } from "../card";
import Chart from "./charts/followingChart";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import Dashboard from "./charts/chartColumn";
import AudienceLocations from "./charts/locationChart";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import MoreDataDao from "@/dao/MoreDataDao";
import Link from "next/link";
import axios from "axios";

import { Plus } from "lucide-react";
import { FormProvider, useForm } from "react-hook-form";
import NewStrategyUI from "@/components/form.list.ui";
import { StrategyFormData } from "@/lib/strategy";
import { zodResolver } from "@hookform/resolvers/zod";

import * as z from "zod";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  pageSize: number;
  setPageSize: React.Dispatch<React.SetStateAction<number>>;
  totalDocuments: number;
}

const strategySchema = z.object({
  strategyName: z.string().min(1, "Please enter the strategy name"),
  addInfluencersBy: z.enum(["search", "manual"]),
  description: z.string().optional(),
});

export function DataTable<TData, TValue>({
  columns,
  data,
  page,
  setPage,
  pageSize,
  setPageSize,
  totalDocuments,
}: DataTableProps<TData, TValue>) {
  const tableInstance = useReactTable({
    data,
    columns,
    state: {
      pagination: {
        pageIndex: page - 1,
        pageSize,
      },
    },
    manualPagination: true, // Since you're handling pagination manually
    pageCount: Math.ceil(totalDocuments / pageSize), // Add pageCount to the instance
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  const methods = useForm<StrategyFormData>({
    resolver: zodResolver(strategySchema),
  });

  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [selectedRowData, setSelectedRowData] = useState<TData | null>(null);
  const [sheetUserName, setSheetUserName] = useState<string>("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const getMoreData = async (username: string) => {
    const moreDataDao = new MoreDataDao(username);
    const followerCount = moreDataDao.getFollowerCount();
    const followingCount = moreDataDao.getFollowingCount();
    const engagementCount = moreDataDao.getEngagementRate();
    const followerGrowthRate = moreDataDao.getFollowerGrowthRate();
    const audienceGenderData = moreDataDao.getAudienceGenderData();
    const audienceTopLocations = moreDataDao.getAudienceTopLocations();
    const followingcount = moreDataDao.getFollowingCount();
    const bioData = moreDataDao.getBio();
    const numberOfAvgLikesData = moreDataDao.getNumberOfAvgLikes();
    const numberOfPostsData = moreDataDao.getNumberOfPosts();
    const numberOfAvgCommentsData = moreDataDao.getNumberOfAvgComments();
    const commentsToLikeRatioData = moreDataDao.getCommentsToLikeRatio();
    const externalUrlsData = moreDataDao.getExternalUrls();
    const profileLocationData = moreDataDao.getProfileLocation();
    try {
      const [data1, data2] = await Promise.all([followerCount, followingCount]);

      console.log("Data 1:", data1);
      console.log("Data 2:", data2);
    } catch (error) {
      console.error("Error fetching data please:", error);
    }
  };

  /*
  const [
      followerCount,
      followingCount,
      engagementCount,
      followerGrowthRate,
      audienceGenderData,
      audienceTopLocations,
      followingcount,
      bioData,
      numberOfAvgLikesData,
      numberOfPostsData,
      numberOfAvgCommentsData,
      commentsToLikeRatioData,
      externalUrlsData,
      profileLocationData,
    ] = await Promise.all([
      followerCount,
      followingCount,
      engagementCount,
      followerGrowthRate,
      audienceGenderData,
      audienceTopLocations,
      followingcount,
      bioData,
      numberOfAvgLikesData,
      numberOfPostsData,
      numberOfAvgCommentsData,
      commentsToLikeRatioData,
      externalUrlsData,
      profileLocationData,
    ]);*/

    // main handle row click
  const handleRowClick = (rowData: TData) => {
    setSelectedRowData(rowData);
    console.log('clicked  : ', rowData);
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
  const [datas, setDatas] = useState<string | null>(null);
  const handleAddList = async (username: string) => {
    try {
      const response = await axios.post(
        "/api/strategy/lists/manage-profiles?q=asdasd",
        {
          action: "add",
          profiles: [


          ],
        }
      );

      setDatas(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleStrategySubmit = async () => {};
  //console.log("DataTable received new data: ", data);
  //console.log("length: ", tableInstance.getRowModel().rows?.length)
  return (
    <>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {tableInstance.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {tableInstance.getRowModel().rows?.length ? (
              tableInstance.getRowModel().rows.map((row) => (
                <ContextMenu key={row.id}>
                  <ContextMenuTrigger asChild>
                    <TableRow >
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id}>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  </ContextMenuTrigger>
                  <ContextMenuContent className="w-[160px]">
                    {/* ... Context menu items ... */}
                    <ContextMenuItem className="flex justify-center w-[150px]">
                      <Button className="w-[140px]" onClick={() => {
                        setIsSheetOpen(true)
                        setSheetUserName(row.original)
                      }}>More Info</Button>
                    </ContextMenuItem>

                    {/* ... Other context menu items ... */}
                  </ContextMenuContent>
                </ContextMenu>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <DataTablePagination
        table={tableInstance}
        setPage={setPage}
        setPageSize={setPageSize}
      />

      {/* Sheet component */}
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
                  <Link href={sheetUserName.socialHandles[0].url} target="#">
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
                        disabled={sheetUserName.whatsappNumber ? false : true}
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
                        <Link href={`mailto:${sheetUserName.email}`} target="#">
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
                          {sheetUserName.socialHandles[0].metrics.followers ? (
                            formatLargeNumber(
                              sheetUserName.socialHandles[0].metrics.followers
                            )
                          ) : (
                            <>
                              <p className="text-[10px] text-gray-200">
                                Data unavailable
                              </p>
                            </>
                          )}
                        </p>{" "}
                        <p className="text-[10px] text-gray-400">FOLLOWERS</p>
                      </Card>
                      <Card className=" w-[120px] h-[80px] mr-3 items-stretch align-middle flex-col shadow-md border-none rounded-[3px]">
                        <i className="fa-solid fa-user mt-2"></i>
                        <p className="text-[18px] mt-2">
                          {" "}
                          {sheetUserName.socialHandles[0].metrics.following}
                        </p>{" "}
                        <p className="text-[10px] text-gray-400">FOLLOWING</p>
                      </Card>
                      <Card className=" w-[120px] h-[80px] mr-3 items-stretch align-middle flex-col shadow-md border-none rounded-[3px]">
                        <i className="fa-solid fa-infinity"></i>
                        <p className="text-[18px] mt-2">{`${Math.round(
                          sheetUserName.socialHandles[0].metrics.avgEngagement *
                            10
                        )} %`}</p>{" "}
                        <p className="text-[10px] text-gray-400">ENGAGEMENT</p>
                      </Card>
                      <Card className=" w-[120px] h-[80px] mr-3 items-stretch align-middle flex-col shadow-md border-none rounded-[3px]">
                        <i className="fa-solid fa-heart"></i>
                        <p className="text-[18px] mt-2">
                          {sheetUserName.socialHandles[0].metrics.avgLikes ? (
                            formatLargeNumber(
                              sheetUserName.socialHandles[0].metrics.avgLikes
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
                          {sheetUserName.socialHandles[0].metrics.numOfPosts ? (
                            formatLargeNumber(
                              sheetUserName.socialHandles[0].metrics.numOfPosts
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
                              sheetUserName.socialHandles[0].metrics.avgComments
                            )
                          ) : (
                            <>
                              <p className="text-[10px] text-gray-200">
                                data unavailable
                              </p>
                            </>
                          )}
                        </p>
                        <p className="text-[10px] text-gray-400">COMMENTS</p>
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
                        <p className="text-[10px] text-gray-400">COMMENTS</p>
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
}

interface DataTablePaginationProps<TData> {
  table: TanTable<TData>;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  setPageSize: React.Dispatch<React.SetStateAction<number>>;
}

export function DataTablePagination<TData>({
  table,
  setPage,
  setPageSize,
}: DataTablePaginationProps<TData>) {
  const { pageIndex, pageSize } = table.getState().pagination;
  const pageCount = table.getPageCount();
  // Function to handle page change
  const handlePageChange = (newPageIndex: number) => {
    setPage(newPageIndex + 1); // setPage expects page number starting from 1
    table.setPageIndex(newPageIndex); // React Table expects pageIndex starting from 0
  };

  return (
    <div className="flex items-center justify-between space-x-6 lg:space-x-8">
      <div className="flex items-center space-x-2">
        <p className="text-sm font-medium">Rows per page</p>
        <Select
          value={`${pageSize}`}
          onValueChange={(value) => {
            setPageSize(Number(value));
            handlePageChange(0); // Reset to first page on pageSize change
          }}
        >
          <SelectTrigger className="h-8 w-[70px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent side="top">
            {[10, 25, 50].map((size) => (
              <SelectItem key={size} value={`${size}`}>
                {size}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="flex w-[100px] items-center justify-center text-sm font-medium">
        Page {pageIndex + 1} of {pageCount}
      </div>
      <div className="flex items-center space-x-2">
        <Button
          variant="outline"
          className="hidden h-8 w-8 p-0 lg:flex"
          onClick={() => handlePageChange(0)}
          disabled={pageIndex === 0}
        >
          <span className="sr-only">Go to first page</span>
          <DoubleArrowLeftIcon className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          className="h-8 w-8 p-0"
          onClick={() => handlePageChange(pageIndex - 1)}
          disabled={pageIndex === 0}
        >
          <span className="sr-only">Go to previous page</span>
          <ChevronLeftIcon className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          className="h-8 w-8 p-0"
          onClick={() => handlePageChange(pageIndex + 1)}
          disabled={pageIndex >= pageCount - 1}
        >
          <span className="sr-only">Go to next page</span>
          <ChevronRightIcon className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          className="hidden h-8 w-8 p-0 lg:flex"
          onClick={() => handlePageChange(pageCount - 1)}
          disabled={pageIndex >= pageCount - 1}
        >
          <span className="sr-only">Go to last page</span>
          <DoubleArrowRightIcon className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
