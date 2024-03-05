"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { useDownloadExcel } from "react-export-table-to-excel";
import { Input } from "@/components/ui/input";
import { Strategy } from "@prisma/client";
import {
  ArrowLeft,
  ArrowRight,
  Delete,
  DeleteIcon,
  FileWarning,
  LucideDelete,
  Plus,
  Trash,
} from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import GlobalFilter from "../../GlobalFilter";
import { useGlobalFilter, usePagination, useTable } from "react-table";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FormProvider } from "react-hook-form";
import NewStrategyUI from "@/components/form.list.ui";
import { SkeletonDemo } from "@/components/SkeletonDemo";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Label } from "@/components/ui/label";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu";
import { Textarea } from "@/components/ui/textarea";
import { array } from "zod";
import { useAuth } from "@/app/context/AuthContext";
import { Skeleton } from "@/components/ui/skeleton";
import axios from "axios";
import Link from "next/link";

type Checked = DropdownMenuCheckboxItemProps["checked"];
const Page = () => {
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const [selectedList, setSelectedList] = React.useState("Select");
  const [countStatus, setCountStatus] = useState<boolean>(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { userId } = useAuth();
  const [inputValue, setInputValue] = useState<string>("");
  const [duplicateArray, setDuplicateArray] = useState<string[]>([]);
  const [lists, setLists] = useState<any>([""]);
  const [isLoading, setIsLoading] = useState(true);
  const pathSegments = window.location.pathname.split("/");
  const [currentList, setCurrentList] = useState("");
  const strategyIndex = pathSegments.indexOf("strategies");

  useEffect(() => {
    const fetchLists = async () => {
      if (userId) {
        const pathSegments = window.location.pathname.split("/");
        const strategyIndex = pathSegments.indexOf("strategies");
        if (strategyIndex !== -1 && strategyIndex + 1 < pathSegments.length) {
          var strategyValue = pathSegments[strategyIndex + 1];
        } else {
          var strategyValue = "not existent";
        }
        setIsLoading(true);
        try {
          const response = await axios.get(
            `/api/strategy/lists?q=${strategyValue}`
          );
          console.log("whats the response: ", response);
          var listCount = response.data.length;
          if (listCount) {
            setCountStatus(true);
          }
          setLists(response.data);
        } catch (error) {
          console.error("Error fetching lists:", error);
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchLists();
  }, []);

  const handleAddInfluencer = async (username: string[]) => {
    console.log(selectedList);

    try {
      const response = await axios.post(
        `/api/strategy/lists/manage-profiles?q=${selectedList}`,
        {
          action: "add",
          profiles: username,
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  const [myArray, setMyArray] = useState<string[]>([]);
  let finalArr: string[] = [];
  // Function to add the current input value to the array
  // Regex pattern
  const rx =
    /^(?:@|(?:https?:\/\/)?(?:www\.)?instagr(?:\.am|am\.com)\/)?(\w+)\/?$/;

  // Function to add the current input value to the array
  const addToArray = async () => {
    // Split the input value by newline characters
    const lines = inputValue.split(/\r?\n/);

    // Filter out empty lines and empty elements
    const nonEmptyLines = lines
      .map((line) => line.split(/\s+/))
      .flat()
      .filter((item) => item.trim() !== "");

    // Split elements when there is a comma in between
    const splitByCommaArray = nonEmptyLines.flatMap((item) => item.split(","));

    // Filter elements based on the regex test
    const filteredArray = splitByCommaArray.filter((item) => rx.test(item));
    const mediatorArr = [...myArray, ...filteredArray];

    mediatorArr.forEach((input) => {
      let match = rx.exec(input);
      if (match) {
        if (!myArray.includes(match[1])) {
          finalArr.push(match[1]);
        }
      }
    });
    finalArr = [...new Set(finalArr)];
    setDuplicateArray(finalArr);
    console.log(finalArr);

    await handleAddInfluencer(finalArr);
  };

  const handleInfluencerDelete = (index) => {
    // Create a new array without the element at the specified index
    const updatedArray = [
      ...duplicateArray.slice(0, index),
      ...duplicateArray.slice(index + 1),
    ];

    // Update the state with the new array
    setDuplicateArray(updatedArray);
  };

  function formatDateToMDY(date: Date): string {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(date).toLocaleDateString(undefined, options);
  }

  const columns = React.useMemo(
    () => [
      {
        Header: "Name",
        accessor: "name",
        // property name in your strategy object
      },
      {
        Header: "Id",
        accessor: "id",
      },
    ],
    []
  );

  // Create an instance of the useTable hook
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    setGlobalFilter,
    page,
    nextPage,
    previousPage,
    canPreviousPage,
    canNextPage,
    pageOptions,
    state,
    gotoPage,
    pageCount,
    setPageSize,
  } = useTable(
    { columns, data: lists, enableRowActions: true },
    useGlobalFilter,
    usePagination
  );

  const { globalFilter, pageIndex, pageSize } = state;
  const tableRef = useRef(null);
  const { onDownload } = useDownloadExcel({
    currentTableRef: tableRef.current,
    filename: "Web Users",
    sheet: "Web users",
  });

  return (
    <Card className="self-center shadow-none border-none outline-none flex flex-col mt-[10vh] w-[80vw] h-[70vh] ">
      {/* content */}
      <Card className="self-center h-[70vh] align-center mt-2 border-none shadow-none">
        {!countStatus ? (
          <Card
            className="flex  flex-col p-3 text-center border-none justify-center"
            style={{ borderStyle: "none" }}
          >
            <FileWarning size={36} className="self-center" />
            <p className="mt-2 ">No list exists, create one</p>
            <Button className="mt-2">
              Create List <Plus className="ml-1" />
            </Button>
          </Card>
        ) : (
          <>
            {isLoading ? (
              <Skeleton className="w-[100px] h-[20px] rounded-full " />
            ) : (
              <>
                <div className="flex gap-4">
                  <Card
                    onClick={() => {
                      setIsSheetOpen(true);
                    }}
                    className="cursor-pointer mt-3 text-[40px] ml-3 h-[150px] flex w-[170px] pl-3 pr-3  shadow-md align-middle justify-center"
                    style={{ border: "black solid 1px" }}
                  >
                    <p className="self-center">+</p>
                  </Card>
                  {lists.slice(0, 3).map((list) => (
                    <Card
                      key={list.id}
                      className="cursor-pointer mt-3 ml-4 h-[150px] w-[220px] pl-3 pb-3 pt-3 pr-3 flex flex-col justify-between align-top border-none shadow-md"
                      onClick={() => {
                        setCurrentList(list.name);
                      }}
                    >
                      <Card className="flex border-none shadow-none">
                        <img
                          className="w-[40px] h-[40px] rounded-[50%]"
                          src={list.pictureUrl}
                          alt=""
                        />
                        <p className="ml-2 text-[18px] self-center font-semibold">
                          {list.name || `list ${list.id}`}
                        </p>
                      </Card>
                      <Card className="flex border-none shadow-none justify-between">
                        <Card className="flex border-none shadow-none">
                          <i className="self-center fa-solid fa-list text-gray-400 text-[14px]"></i>
                          <p className="ml-2 text-gray-400 text-[14px]">
                            {list.profiles.length} lists
                          </p>
                        </Card>
                        <Card className="flex border-none shadow-none text-[14px]">
                          {formatDateToMDY(list.createdAt)}
                        </Card>
                      </Card>
                    </Card>
                  ))}
                </div>
              </>
            )}
          </>
        )}
      </Card>
      <div className="self-center w-[700px] mt-6 mb-2 rounded-lg border-[1px] border-black p-6 shadow-lg">
        <div className="self-center mb-6 flex justify-between">
          <div className="self-center">
            <GlobalFilter
              placeholder="Search Influencers"
              filter={globalFilter}
              setFilter={setGlobalFilter}
            />
          </div>
          <Button onClick={onDownload}>Export CSV</Button>
        </div>
        <table
          {...getTableProps()}
          style={{ borderCollapse: "collapse", width: "100%" }}
          className=""
          ref={tableRef}
        >
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()} key={headerGroup.id}>
                {headerGroup.headers.map((column) => (
                  <th
                    {...column.getHeaderProps()}
                    className="border-b-2"
                    key={column.id}
                  >
                    {column.render("Header")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {page.map((row) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()} key={row.id}>
                  {row.cells.map((cell) => (
                    <>
                      <td
                        {...cell.getCellProps()}
                        className="text-center border-b-2 p-2"
                        key={cell.id}
                      >
                        {cell.render("Cell")}
                      </td>
                    </>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="flex justify-center p-3">
        <Button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
          <ArrowLeft />
        </Button>{" "}
        <Button
          onClick={() => previousPage()}
          disabled={!canPreviousPage}
          className="ml-3"
        >
          Previous
        </Button>{" "}
        <Button
          className="mx-3"
          onClick={() => nextPage()}
          disabled={!canNextPage}
        >
          Next
        </Button>{" "}
        <Button
          onClick={() => gotoPage(pageCount - 1)}
          disabled={!canNextPage}
          className="mr-3"
        >
          <ArrowRight />
        </Button>{" "}
        <span className="self-center">
          Page{" "}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{" "}
        </span>
        <span className="ml-3 mr-3">
          | Go to page:{" "}
          <Input
            type="number"
            defaultValue={pageIndex + 1}
            min={1}
            className="w-[300px] inline"
            max={pageCount}
            onChange={(e) => {
              const pageNumber = e.target.value
                ? Number(e.target.value) - 1
                : 0;
              gotoPage(pageNumber);
            }}
            style={{ width: "60px" }}
          />
        </span>{" "}
        <select
          value={pageSize}
          onChange={(e) => setPageSize(Number(e.target.value))}
        >
          {[5, 10, 15].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>
      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetContent className="w-[640px] overflow-y-scroll overflow-x-hidden ">
          <h1 className="w-[640px] ml-[-30px] shadow-md pl-5 p-3 ">
            Add influencers
          </h1>
          <Card className="mt-3 border-none p-3">
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
                  {lists.map((list, index) => (
                    <div key={index}>
                      <DropdownMenuRadioItem value={list.name}>
                        {list.name}
                      </DropdownMenuRadioItem>
                    </div>
                  ))}
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </Card>
          <Card className="flex flex-col p-3 mt-3 border-none shadow-md">
            <h2>Influencers : </h2>
            <Textarea
              value={inputValue}
              onChange={(e) => {
                setInputValue(e.target.value);
              }}
              placeholder="Enter Instagram usernames here"
              className="h-[30vh]"
              style={{ resize: "none" }}
            />
            {duplicateArray.map((list, index) => (
              <div key={index} className="flex mt-2">
                <p className="self-center">{list}</p>
                <Button
                  className="ml-2"
                  onClick={() => handleInfluencerDelete(index)}
                >
                  <Trash size={16} />
                </Button>
              </div>
            ))}

            <Button
              onClick={addToArray}
              disabled={inputValue === ""}
              className="mt-2 self-start"
            >
              Add
            </Button>
          </Card>
        </SheetContent>
      </Sheet>
    </Card>
  );
};

export default Page;
