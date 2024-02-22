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
import React, { useEffect, useState } from "react";
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
let influencers = [
  { name: "List 1", influencerCount: 13 },
  { name: "List 2", influencerCount: 32 },
  { name: "List 3", influencerCount: 33 },
  { name: "List 4", influencerCount: 23 },
  { name: "List 5", influencerCount: 16 },
  { name: "List 6", influencerCount: 18 },
  { name: "List 7", influencerCount: 20 },
  { name: "List 8", influencerCount: 23 },
  { name: "List 9", influencerCount: 81 },
  { name: "List 10", influencerCount: 9 },
];
type Checked = DropdownMenuCheckboxItemProps["checked"];
const page = () => {
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const listCount = influencers.length;
  const [selectedList, setSelectedList] = React.useState(influencers[0].name);
  const [countStatus, setCountStatus] = useState<boolean>(
    listCount === 0 ? false : true
  );

  const [inputValue, setInputValue] = useState<string>("");
  const [duplicateArray, setDuplicateArray] = useState<string[]>([]);
  const inputs = [
    "@username",
    "https://www.instagram.com/username",
    "https://www.instagram.com/username/",
    "instagram.com/username",
    "@handsome_jack",
    "http://example.com/handsome",
  ];

  const [myArray, setMyArray] = useState<string[]>([]);
  let finalArr: string[] = [];
  // Function to add the current input value to the array
  // Regex pattern
  const rx =
    /^(?:@|(?:https?:\/\/)?(?:www\.)?instagr(?:\.am|am\.com)\/)?(\w+)\/?$/;

  // Function to add the current input value to the array
  const addToArray = () => {
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
          <Button
            className="mt-[30vh] self-center"
            onClick={() => {
              setIsSheetOpen(true);
            }}
          >
            Add New List <Plus className="ml-1" />
          </Button>
        )}
      </Card>
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
                  {influencers.map((list, index) => (
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

            <Button onClick={addToArray} disabled={inputValue === "" } className="mt-2 self-start">
              Add
            </Button>
            
          </Card>
        </SheetContent>
      </Sheet>
    </Card>
  );
};

export default page;
