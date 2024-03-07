"use client";
import CampaignsNav from "@/components/ui/CampaignsNav";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  Delete,
  Edit2,
  InstagramIcon,
  Plus,
  Trash2,
} from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
import { Label } from "@radix-ui/react-label";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { addDays, format } from "date-fns";
import { DateRange } from "react-day-picker";
import { Calendar as CalendarIcon } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { InstagramLogoIcon } from "@radix-ui/react-icons";

const contentTypes = ["post", "carousel", "story", "reel"];
const postingTimelines = ["After accepted collaboration", "Particular Dates"];

type Deliverable = {
  id: number;
  contentGuidelines: string; // Adjust the type based on the actual type of contentGuidelines
  date: string; // Adjust the type based on the actual type of date
  selectedContentType: string; // Adjust the type based on the actual type of selectedContentType
  selectedPostingTimeline: string; // Adjust the type based on the actual type of selectedPostingTimeline
};
const page = ({ className }: React.HTMLAttributes<HTMLDivElement>) => {
  const router = useRouter();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [deliverables, setDeliverables] = useState<Deliverable[]>([]);
  const [contentGuidelines, setContentGuidelines] = useState("");
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: new Date(2022, 0, 20),
    to: addDays(new Date(2022, 0, 20), 20),
  });
  const [selectedContentType, setSelectedContentType] = useState(
    "Choose Content Type"
  );
  const [selectedPostingTimeline, setSelectedPostingTimeline] =
    useState("Choose a Timeline");
  const handleSave = () => {
    //logic to save
  };

  const handleDelete = (id: number) => {
    setDeliverables((prevDeliverables) =>
      prevDeliverables.filter((deliverable) => deliverable.id !== id)
    );
  };
  const handleSaveDeliverable = () => {
    const formattedFromDate = date.from.toLocaleDateString("en-US", {
      timeZone: "Asia/Kolkata",
    });
    const formattedToDate = date.to.toLocaleDateString("en-US", {
      timeZone: "Asia/Kolkata",
    });
    setDeliverables((prevDeliverables) => [
      ...prevDeliverables,
      {
        id: prevDeliverables.length + 1,
        contentGuidelines,
        date: {
          from: formattedFromDate,
          to: formattedToDate,
        },
        selectedContentType,
        selectedPostingTimeline,
      },
    ]);
  };
  return (
    <div className="flex flex-col">
      <CampaignsNav />
      <div className="w-[1000px] p-5 flex flex-col   bg-slate-100 self-center mt-2  rounded-md shadow-md">
        <p className="text-[18px] font-bold">Deliverables</p>
        <p className="text-[12px] ">
          Deliverables are shown to influencers as tasks they need to perform to
          complete the collaborations.
        </p>
        <hr className="mt-2 mb-2" />
        {deliverables.length !== 0 ? (
          <>
            {deliverables.map((deliverable) => {
              return (
                <div className="bg-white rounded-md p-3 mt-2 mb-2">
                  <div className="flex justify-between">
                    <div className="flex">
                      <InstagramIcon />
                      <p className="font-bold ml-2">Instagram</p>
                      <p className="ml-2">{deliverable.selectedContentType}</p>
                    </div>
                    <div className="flex">
                      <Button
                        className=""
                        onClick={() => handleDelete(deliverable.id)}
                      >
                        <Trash2 size={12} />
                      </Button>
                    </div>
                  </div>
                  <div className="flex gap-2 text-12">
                    <p className="font-semibold"> Time Line : </p>
                    <div className="flex flex-col">
                      <p className="">{deliverable.selectedPostingTimeline}</p>
                      <p className="">
                        {deliverable.selectedPostingTimeline ===
                        "Particular Dates" ? (
                          <>
                            {deliverable.date.from}{" "}
                            <span className="font-bold">to</span>{" "}
                            {deliverable.date.to}
                          </>
                        ) : (
                          <></>
                        )}
                      </p>
                    </div>
                  </div>
                  <div className="bg-slate-100 p-2 rounded-lg mt-2">
                    Guidelines : {deliverable.contentGuidelines}
                  </div>
                </div>
              );
            })}
            <hr className="mt-2 mb-2" />
          </>
        ) : (
          <></>
        )}

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button
              onClick={() => {
                setIsDialogOpen(true);
              }}
              className="mt-2"
            >
              <Plus className="mr-1" />
              ADD DELIVERABLES
            </Button>
          </DialogTrigger>
          <DialogContent className="flex flex-col justify-center w-[752px] ">
            <DialogHeader>
              <DialogTitle className="self-center">
                ADD DELIVERABLES
              </DialogTitle>
            </DialogHeader>
            <div className="flex gap-4 justify-between">
              <div className="flex flex-col">
                <Label className="self-start text-[12px]">
                  Posting Timeline
                </Label>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild className=" flex text-left">
                    <Button variant="outline" className="w-[300px] text-left">
                      {selectedPostingTimeline}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-[300px]">
                    <DropdownMenuLabel>Posting Timeline</DropdownMenuLabel>
                    <DropdownMenuSeparator />

                    <DropdownMenuRadioGroup
                      value={selectedPostingTimeline}
                      onValueChange={setSelectedPostingTimeline}
                    >
                      {postingTimelines.map((list, index) => (
                        <div key={index}>
                          <DropdownMenuRadioItem value={list}>
                            {list}
                          </DropdownMenuRadioItem>
                        </div>
                      ))}
                    </DropdownMenuRadioGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <div className="flex flex-col">
                <Label className="self-start text-[12px]">Content Type</Label>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild className=" flex text-left">
                    <Button variant="outline" className="w-[300px] text-left">
                      {selectedContentType}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56">
                    <DropdownMenuLabel>Content Types</DropdownMenuLabel>
                    <DropdownMenuSeparator />

                    <DropdownMenuRadioGroup
                      value={selectedContentType}
                      onValueChange={setSelectedContentType}
                    >
                      {contentTypes.map((list, index) => (
                        <div key={index}>
                          <DropdownMenuRadioItem value={list}>
                            {list}
                          </DropdownMenuRadioItem>
                        </div>
                      ))}
                    </DropdownMenuRadioGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
            {selectedPostingTimeline === "Particular Dates" ? (
              <>
                <div className={cn("grid gap-2", className)}>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        id="date"
                        variant={"outline"}
                        className={cn(
                          "w-[300px] justify-start text-left font-normal",
                          !date && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date?.from ? (
                          date.to ? (
                            <>
                              {format(date.from, "LLL dd, y")} -{" "}
                              {format(date.to, "LLL dd, y")}
                            </>
                          ) : (
                            format(date.from, "LLL dd, y")
                          )
                        ) : (
                          <span>Pick a date</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        initialFocus
                        mode="range"
                        defaultMonth={date?.from}
                        selected={date}
                        onSelect={setDate}
                        numberOfMonths={2}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </>
            ) : (
              <></>
            )}
            <div className="flex flex-col">
              <p>Content Guidelines</p>
              <Textarea
                value={contentGuidelines}
                onChange={(e) => {
                  setContentGuidelines(e.target.value);
                }}
              />
            </div>

            <DialogFooter className="mt-4 flex shadow-[-10px_-10px_30px_4px_rgba(0,0,0,0.1),_10px_10px_30px_4px_rgba(45,78,255,0.15)] p-2 mb-[-24px] ml-[-24px] w-[752px]">
              <Button
                className="self-end"
                onClick={() => {
                  handleSaveDeliverable();
                  setIsDialogOpen(false);
                }}
                disabled={
                  contentGuidelines === "" || selectedContentType === "Choose Content Type" || selectedPostingTimeline === "Choose a TimeLine"
                    ? true
                    : false
                }
              >
                Save
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      <div className="self-center flex justify-between rounded-t-md border-[1px] border-black bg-slate-100 absolute bottom-0 w-[70vw] h-[4rem]">
        <div className="self-start mt-3 ml-3">
          <Button
            onClick={() => {
              router.push(`2`);
            }}
          >
            <ArrowLeft size={12} className="mr-2" />
            Back
          </Button>
        </div>
        <div className="mt-3 mr-3">
          <Button
            variant={"outline"}
            className="mr-2 border-[1px] border-black"
            onClick={handleSave}
          >
            Save
          </Button>
          <Button
            onClick={() => {
              router.push(`4`);
            }}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Page;
