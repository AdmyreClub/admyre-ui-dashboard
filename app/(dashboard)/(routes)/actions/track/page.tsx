"use client";
import ActionSelectionUI from "@/components/action.selection.ui";
import Heading from "@/components/heading";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { CalendarClock, Trash } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import { useGlobalFilter, usePagination, useTable } from "react-table";

const ActionTrackUI = () => {
  const [tableData, setTableData] = useState([]);
  const [inputValue, setInputValue] = useState<string>("");
  const [myArray, setMyArray] = useState<string[]>([]);
  const [duplicateArray, setDuplicateArray] = useState([]);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [sheetUserName, setSheetUserName] = useState<string>("");
  const handleAddInfluencer = (finalArr: string[]) => {
    console.log("finalArr");
  };
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
    for (let i = 0; i < finalArr.length; i++) {
      const element = finalArr[i];

      setTableData((prevTableData) => {
        const newName = element;
        const isNameUnique = prevTableData.every((row) => row.name !== newName);

        if (isNameUnique) {
          // Create a new row with a unique ID
          const newRow = {
            id: "#",
            name: element,
            fullName: "Donald Duck",
            url: "surat",
          };

          // Return the updated state with the new row
          return [...prevTableData, newRow];
        } else {
          // Return the existing state without any changes
          console.log('Name already exists. Choose a different name.');
          return prevTableData;
        }
      });;
    }
    setDuplicateArray(finalArr);
    console.log(finalArr);

    await handleAddInfluencer(finalArr);
  };

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
      {
        Header: "Full Name",
        accessor: "fullName",
      },
      {
        Header: "Profile Image",
        accessor: "url",
        Cell: ({ value }) => (
          <img
            src={value}
            alt="Strategy Image"
            style={{ maxWidth: "100%", maxHeight: "50px" }}
          />
        ),
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
    { columns, data: tableData, enableRowActions: true },
    useGlobalFilter,
    usePagination
  );

  const { globalFilter, pageIndex, pageSize } = state;
  return (
    <>
      <div className="pt-[5rem]">
        <Heading
          title="Post & Profile Tracker"
          description="Monitor campaign performance and analyze competitors with real time tracking of posts and profiles"
          icon={CalendarClock}
          iconColor="text-primary-500" // Adjust the color class as needed
          bgColor="bg-slate-500/10" // Adjust the background color class as needed
        />

        <div className="flex w-full max-w-8xl items-center justify-center my-10">
          <Card className="w-full m-10 justify-center flex p-3">
            <Tabs defaultValue="posts">
              <TabsList>
                <TabsTrigger value="posts">Track Posts</TabsTrigger>
                <TabsTrigger value="profiles">Track Profiles</TabsTrigger>
              </TabsList>
              <TabsContent value="posts">
              <Card className="w-[1000px]">
                  <div className="p-3 flex gap-2 border-none outline-none p-1 justify-center align-middle items-center">
                    <Input
                      placeholder="example, https://www.instagram.com/p/5RW32"
                      style={{ resize: "none" }}
                      value={inputValue}
                      className="border-2 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                      onChange={(e) => {
                        setInputValue(e.target.value);
                      }}
                    />

                    <Button onClick={addToArray}>
                      Add
                    </Button>
                  </div>
                  <table
                    {...getTableProps()}
                    style={{ borderCollapse: "collapse", width: "100%" }}
                    className=""
                  >
                    <thead>
                      {headerGroups.map((headerGroup) => (
                        <tr
                          {...headerGroup.getHeaderGroupProps()}
                          key={headerGroup.id}
                        >
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
                                  <div
                                    className="cursor-pointer"
                                    onClick={() => {
                                      setSheetUserName(cell.row.original.name);
                                      console.log(cell.row.original.name);

                                      setIsSheetOpen(true);
                                    }}
                                  >
                                    {cell.render("Cell")}
                                  </div>
                                </td>
                              </>
                            ))}
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                  <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
                    <link
                      rel="stylesheet"
                      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
                      integrity="sha512-DTOQO9RWCH3ppGqcWaEA1BIZOC6xxalwEsw9c2QQeAIftl+Vegovlnee1c9QX4TctnWMn13TZye+giMm8e2LwA=="
                      crossOrigin="anonymous"
                      referrerPolicy="no-referrer"
                    />
                    <SheetContent className="w-[640px] overflow-y-scroll overflow-x-scroll ">
                      <SheetHeader>
                        <SheetTitle className="text-right ">
                          <Card className="border-none shadow-none mt-4 font-light text-gray-400 font-semibold text-[14px]">
                            <Link href={sheetUserName} target="#">
                              <i className="fa-solid fa-arrow-up-right-from-square mr-3"></i>
                            </Link>
                            {sheetUserName ? `@ ${sheetUserName}` : ``}
                          </Card>
                        </SheetTitle>

                        <SheetDescription className="text-center align-middle flex-col justify-center ">
                          {/* main info*/}
                          <Card className="flex justify-around w-[520px] ml-[-15px] border-none shadow-none">
                            <div>
                              <Card className="align-center justify-left flex mb-3 mt-3 border-none shadow-none">
                                <Card className="w-[150px] h-[150px] rounded-[50%] align-left overflow-hidden">
                                  <img src={sheetUserName} alt="" />
                                </Card>
                              </Card>
                              <Card className=" text-left border-none shadow-none ">
                                <Card className="flex justify-center border-none shadow-none ">
                                  <p className="text-[18px] font-bold ">
                                    {sheetUserName}
                                  </p>
                                </Card>
                              </Card>
                              <div className="flex justify-center mt-2">
                                <Button className="w-[30px] h-[30px] bg-white hover:bg-white text-center align-middle mr-3 pt-1 border-none shadow-md">
                                  <Link
                                    href={`https://wa.me/${sheetUserName}`}
                                    target="#"
                                  >
                                    <i className=" fa-brands fa-whatsapp text-black self-center mt-2"></i>
                                  </Link>
                                </Button>
                                <Button className="w-[30px] h-[30px] bg-white hover:bg-white text-center align-middle mr-3 pt-1 border-none shadow-md">
                                  <Link
                                    href={`mailto:${sheetUserName}`}
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
                                  <p>{sheetUserName}</p>
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
                                    {sheetUserName}
                                  </p>{" "}
                                  <p className="text-[10px] text-gray-400">
                                    FOLLOWERS
                                  </p>
                                </Card>
                                <Card className=" w-[120px] h-[80px] mr-3 items-stretch align-middle flex-col shadow-md border-none rounded-[3px]">
                                  <i className="fa-solid fa-user mt-2"></i>
                                  <p className="text-[18px] mt-2">
                                    {" "}
                                    {sheetUserName}
                                  </p>{" "}
                                  <p className="text-[10px] text-gray-400">
                                    FOLLOWING
                                  </p>
                                </Card>
                                <Card className=" w-[120px] h-[80px] mr-3 items-stretch align-middle flex-col shadow-md border-none rounded-[3px]">
                                  <i className="fa-solid fa-infinity"></i>
                                  <p className="text-[18px] mt-2">
                                    {sheetUserName}
                                  </p>{" "}
                                  <p className="text-[10px] text-gray-400">
                                    ENGAGEMENT
                                  </p>
                                </Card>
                                <Card className=" w-[120px] h-[80px] mr-3 items-stretch align-middle flex-col shadow-md border-none rounded-[3px]">
                                  <i className="fa-solid fa-heart"></i>
                                  <p className="text-[18px] mt-2">
                                    {sheetUserName}
                                  </p>
                                  <p className="text-[10px] text-gray-400">
                                    LIKES
                                  </p>
                                </Card>
                              </Card>
                              <Card className="flex justify-around border-none shadow-none mt-5 mr-[10px]">
                                <Card className=" w-[120px] h-[80px] mr-3 items-stretch align-middle flex-col shadow-md border-none rounded-[3px]">
                                  <i className="fa-solid fa-heart"></i>
                                  <p className="text-[18px] mt-2">
                                    {sheetUserName}
                                  </p>
                                  <p className="text-[10px] text-gray-400">
                                    POSTS
                                  </p>
                                </Card>
                                <Card className=" w-[120px] h-[80px] mr-3 items-stretch align-middle flex-col shadow-md border-none rounded-[3px]">
                                  <i className="fa-solid fa-comment"></i>
                                  <p className="text-[18px] mt-2">
                                    {sheetUserName}
                                  </p>
                                  <p className="text-[10px] text-gray-400">
                                    COMMENTS
                                  </p>
                                </Card>
                                <Card className=" w-[120px] h-[80px] mr-3 items-stretch align-middle flex-col shadow-md border-none rounded-[3px]">
                                  <i className="fa-solid fa-eye"></i>
                                  <p className="text-[18px] mt-2">
                                    {" "}
                                    {sheetUserName}
                                  </p>{" "}
                                  <p className="text-[10px] text-gray-400">
                                    VIEWS
                                  </p>
                                </Card>
                                <Card className=" w-[120px] h-[80px] mr-3 items-stretch align-middle flex-col shadow-md border-none rounded-[3px]">
                                  <i className="fa-solid fa-eye"></i>
                                  <p className="text-[18px] mt-2">
                                    {" "}
                                    {sheetUserName}
                                  </p>{" "}
                                  <p className="text-[10px] text-gray-400">
                                    COMMENTS
                                  </p>
                                </Card>
                              </Card>
                            </Card>
                          </Card>
                        </SheetDescription>
                      </SheetHeader>
                    </SheetContent>
                  </Sheet>
                </Card>
              </TabsContent>
              <TabsContent value="profiles">
                <Card className="w-[1000px]">
                  <div className="p-3 flex gap-2 border-none outline-none p-1 justify-center align-middle items-center">
                    <Input
                      placeholder="example, https://www.instagram.com/therock"
                      style={{ resize: "none" }}
                      value={inputValue}
                      className="border-2 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                      onChange={(e) => {
                        setInputValue(e.target.value);
                      }}
                    />

                    <Button onClick={addToArray}>
                      Add
                    </Button>
                  </div>
                  <table
                    {...getTableProps()}
                    style={{ borderCollapse: "collapse", width: "100%" }}
                    className=""
                  >
                    <thead>
                      {headerGroups.map((headerGroup) => (
                        <tr
                          {...headerGroup.getHeaderGroupProps()}
                          key={headerGroup.id}
                        >
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
                                  <div
                                    className="cursor-pointer"
                                    onClick={() => {
                                      setSheetUserName(cell.row.original.name);
                                      console.log(cell.row.original.name);

                                      setIsSheetOpen(true);
                                    }}
                                  >
                                    {cell.render("Cell")}
                                  </div>
                                </td>
                              </>
                            ))}
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                  <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
                    <link
                      rel="stylesheet"
                      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
                      integrity="sha512-DTOQO9RWCH3ppGqcWaEA1BIZOC6xxalwEsw9c2QQeAIftl+Vegovlnee1c9QX4TctnWMn13TZye+giMm8e2LwA=="
                      crossOrigin="anonymous"
                      referrerPolicy="no-referrer"
                    />
                    <SheetContent className="w-[640px] overflow-y-scroll overflow-x-scroll ">
                      <SheetHeader>
                        <SheetTitle className="text-right ">
                          <Card className="border-none shadow-none mt-4 font-light text-gray-400 font-semibold text-[14px]">
                            <Link href={sheetUserName} target="#">
                              <i className="fa-solid fa-arrow-up-right-from-square mr-3"></i>
                            </Link>
                            {sheetUserName ? `@ ${sheetUserName}` : ``}
                          </Card>
                        </SheetTitle>

                        <SheetDescription className="text-center align-middle flex-col justify-center ">
                          {/* main info*/}
                          <Card className="flex justify-around w-[520px] ml-[-15px] border-none shadow-none">
                            <div>
                              <Card className="align-center justify-left flex mb-3 mt-3 border-none shadow-none">
                                <Card className="w-[150px] h-[150px] rounded-[50%] align-left overflow-hidden">
                                  <img src={sheetUserName} alt="" />
                                </Card>
                              </Card>
                              <Card className=" text-left border-none shadow-none ">
                                <Card className="flex justify-center border-none shadow-none ">
                                  <p className="text-[18px] font-bold ">
                                    {sheetUserName}
                                  </p>
                                </Card>
                              </Card>
                              <div className="flex justify-center mt-2">
                                <Button className="w-[30px] h-[30px] bg-white hover:bg-white text-center align-middle mr-3 pt-1 border-none shadow-md">
                                  <Link
                                    href={`https://wa.me/${sheetUserName}`}
                                    target="#"
                                  >
                                    <i className=" fa-brands fa-whatsapp text-black self-center mt-2"></i>
                                  </Link>
                                </Button>
                                <Button className="w-[30px] h-[30px] bg-white hover:bg-white text-center align-middle mr-3 pt-1 border-none shadow-md">
                                  <Link
                                    href={`mailto:${sheetUserName}`}
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
                                  <p>{sheetUserName}</p>
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
                                    {sheetUserName}
                                  </p>{" "}
                                  <p className="text-[10px] text-gray-400">
                                    FOLLOWERS
                                  </p>
                                </Card>
                                <Card className=" w-[120px] h-[80px] mr-3 items-stretch align-middle flex-col shadow-md border-none rounded-[3px]">
                                  <i className="fa-solid fa-user mt-2"></i>
                                  <p className="text-[18px] mt-2">
                                    {" "}
                                    {sheetUserName}
                                  </p>{" "}
                                  <p className="text-[10px] text-gray-400">
                                    FOLLOWING
                                  </p>
                                </Card>
                                <Card className=" w-[120px] h-[80px] mr-3 items-stretch align-middle flex-col shadow-md border-none rounded-[3px]">
                                  <i className="fa-solid fa-infinity"></i>
                                  <p className="text-[18px] mt-2">
                                    {sheetUserName}
                                  </p>{" "}
                                  <p className="text-[10px] text-gray-400">
                                    ENGAGEMENT
                                  </p>
                                </Card>
                                <Card className=" w-[120px] h-[80px] mr-3 items-stretch align-middle flex-col shadow-md border-none rounded-[3px]">
                                  <i className="fa-solid fa-heart"></i>
                                  <p className="text-[18px] mt-2">
                                    {sheetUserName}
                                  </p>
                                  <p className="text-[10px] text-gray-400">
                                    LIKES
                                  </p>
                                </Card>
                              </Card>
                              <Card className="flex justify-around border-none shadow-none mt-5 mr-[10px]">
                                <Card className=" w-[120px] h-[80px] mr-3 items-stretch align-middle flex-col shadow-md border-none rounded-[3px]">
                                  <i className="fa-solid fa-heart"></i>
                                  <p className="text-[18px] mt-2">
                                    {sheetUserName}
                                  </p>
                                  <p className="text-[10px] text-gray-400">
                                    POSTS
                                  </p>
                                </Card>
                                <Card className=" w-[120px] h-[80px] mr-3 items-stretch align-middle flex-col shadow-md border-none rounded-[3px]">
                                  <i className="fa-solid fa-comment"></i>
                                  <p className="text-[18px] mt-2">
                                    {sheetUserName}
                                  </p>
                                  <p className="text-[10px] text-gray-400">
                                    COMMENTS
                                  </p>
                                </Card>
                                <Card className=" w-[120px] h-[80px] mr-3 items-stretch align-middle flex-col shadow-md border-none rounded-[3px]">
                                  <i className="fa-solid fa-eye"></i>
                                  <p className="text-[18px] mt-2">
                                    {" "}
                                    {sheetUserName}
                                  </p>{" "}
                                  <p className="text-[10px] text-gray-400">
                                    VIEWS
                                  </p>
                                </Card>
                                <Card className=" w-[120px] h-[80px] mr-3 items-stretch align-middle flex-col shadow-md border-none rounded-[3px]">
                                  <i className="fa-solid fa-eye"></i>
                                  <p className="text-[18px] mt-2">
                                    {" "}
                                    {sheetUserName}
                                  </p>{" "}
                                  <p className="text-[10px] text-gray-400">
                                    COMMENTS
                                  </p>
                                </Card>
                              </Card>
                            </Card>
                          </Card>
                        </SheetDescription>
                      </SheetHeader>
                    </SheetContent>
                  </Sheet>
                </Card>
              </TabsContent>
            </Tabs>
          </Card>
        </div>
      </div>
    </>
  );
};

export default ActionTrackUI;
