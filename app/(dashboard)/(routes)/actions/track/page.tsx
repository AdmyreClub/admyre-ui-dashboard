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
                      placeholder="example, https://www.instagram.com/p/C4QIywVCgfN/"
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
