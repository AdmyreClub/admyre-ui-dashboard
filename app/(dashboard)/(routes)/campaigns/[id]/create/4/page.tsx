"use client";
import CampaignsNav from "@/components/ui/CampaignsNav";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup } from "@radix-ui/react-dropdown-menu";
import { RadioGroupItem } from "@radix-ui/react-radio-group";
import { ArrowLeft, Hash } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const Page = () => {
  const router = useRouter();
  const handleSave = () => {
    //logic to save
  };
  const [incentiveType, setIncentiveType] = useState("");
  const [payoutValue, setPayoutValue] = useState<number>();
  const [description, setDescription] = useState("");
  const [terms, setTerms] = useState("");
  const [voucherValue, setVoucherValue] = useState<number>();
  return (
    <div className="flex flex-col">
      <CampaignsNav />
      <div className="flex flex-col bg-slate-100 p-4 w-[1000px] self-center mt-3 rounded-md">
        <p className="font-bold"> Influencer additional incentive</p>
        <p className="text-[12px]">
          Select the type of additional incentive for the participating
          influencers
        </p>
        <div className="flex gap-6 self-center mt-5">
          <Button
            variant={"outline"}
            onClick={() => {
              setIncentiveType("fixed");
            }}
            className="w-[450px]"
          >
            Fixed Payout
          </Button>
          <Button
            onClick={() => {
              setIncentiveType("voucher");
            }}
            variant={"outline"}
            className="w-[450px]"
          >
            Voucher
          </Button>
        </div>
      </div>

      {incentiveType === "fixed" ? (
        <>
          <div className="flex flex-col bg-slate-100 p-4 w-[1000px] self-center mt-3 rounded-md">
            <p className="font-bold">Payout (₹)</p>
            <p className="text-[12px]">
              Amount in INR to be paid to each influencer
            </p>
            <div className="flex">
              <div className="flex self-center p-2 px-4 w-[30px] bg-slate-200 rounded-l-md justify-center mt-1">
                Rs.
              </div>
              <Input
                value={payoutValue}
                type="number"
                onChange={(e) => {
                  const value = Number(e.target.value); // Convert string to number
                  setPayoutValue(value);
                }}
                className="w-[370px] mt-1 rounded-l-none"
                placeholder="Your Campaign Name"
              />
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
      {incentiveType === "voucher" ? (
        <>
          <div className="flex flex-col bg-slate-100 p-4 w-[1000px] self-center mt-3 rounded-md">
            <p className="font-bold">Voucher Worth</p>
            <p className="text-[12px]">
              Worth in INR of Voucher to be given to the influencer.
            </p>
            <div className="flex">
              <div className="flex self-center p-2 px-4 w-[30px] bg-slate-200 rounded-l-md justify-center mt-1">
                Rs.
              </div>
              <Input
                value={voucherValue}
                type="number"
                onChange={(e) => {
                  const value = Number(e.target.value); // Convert string to number
                  setVoucherValue(value);
                }}
                className="w-[370px] mt-1 rounded-l-none"
                placeholder="Your Campaign Name"
              />
            </div>
            <p className="font-bold mt-4">Voucher Description</p>
            <p className="">
              Describe the benefits of the voucher for e.g. discount offered,
              minimum order value etc.
            </p>
            <Textarea
              className="resize-none"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <p className="font-bold mt-2">Voucher Terms</p>
            <Textarea
              className="resize-none"
              value={terms}
              onChange={(e) => setTerms(e.target.value)}
            />
          </div>
        </>
      ) : (
        <></>
      )}

      <div className="self-center flex justify-between rounded-t-md border-[1px] border-black bg-slate-100 absolute bottom-0 w-[70vw] h-[4rem]">
        <div className="self-start mt-3 ml-3">
          <Button
            onClick={() => {
              router.push(`3`);
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
              router.push(`5`);
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
