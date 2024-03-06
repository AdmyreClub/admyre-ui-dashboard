"use client";
import CampaignsNav from "@/components/ui/CampaignsNav";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { Hash } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import React, { useState } from "react";

const page = () => {
  const [campaignName, setCampaignName] = useState("");
  const [brandName, setBrandName] = useState("");
  const router = useRouter();
  const url = window.location.href;
  const id = url.split("/")[4];
  const handleSave = () => {
    //logic to save
  };

  
  return (
    <div className="flex flex-col ">
      <CampaignsNav />
      <div className="flex flex-col mt-[5rem] p-[2rem] w-[900px] rounded-md shadow-md self-center bg-slate-100 ">
        <div className=" flex flex-col">
          <div className="flex justify-between gap-6 mt-5">
            <div className="flex flex-col">
              <Label className="text-[12px] ml-1">Platform</Label>
              <Input
                disabled={true}
                value={"platformType"}
                className="w-[400px] mt-1"
                placeholder=""
              />
            </div>
            <div className="flex flex-col">
              <Label className="text-[12px] ml-1">Campaign Type</Label>
              <Input
                value={"campaignType"}
                disabled={true}
                className="w-[400px] mt-1"
                placeholder=""
              />
            </div>
          </div>
        </div>
        <div className="mt-2 flex flex-col">
          <div className="flex justify-between gap-6 mt-5">
            <div className="flex flex-col">
              <Label className="text-[12px] ml-1">Campaign Name</Label>
              <div className="flex">
                <div className="flex w-[30px] bg-slate-200 rounded-l-md justify-center mt-1">
                  <Hash
                    size={16}
                    color="black"
                    className="ml-[2px] self-center"
                  />
                </div>
                <Input
                  value={campaignName}
                  onChange={(e) => {
                    setCampaignName(e.target.value);
                  }}
                  className="w-[370px] mt-1 rounded-l-none"
                  placeholder="Your Campaign Name"
                />
              </div>
            </div>
            <div className="flex flex-col">
              <Label className="text-[12px] ml-1">Brand Name</Label>
              <Input
                value={brandName}
                onChange={(e) => {
                  setBrandName(e.target.value);
                }}
                className="w-[400px] mt-1"
                placeholder="Brand Name"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="self-center flex flex-col rounded-t-md border-[1px] border-black bg-slate-100 absolute bottom-0 w-[70vw] h-[4.5rem]">
        <div className="self-end mr-3 mt-3">
          <Button
            variant={"outline"}
            className="mr-2 border-[1px] border-black"
            onClick={handleSave}
          >
            Save
          </Button>
          <Button
            onClick={() => {
              router.push(`2`);
            }}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default page;
