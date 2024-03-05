"use client";

import { ArrowRightCircle } from "lucide-react";
import React, { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/app/context/AuthContext";
import axios from "axios";
const CampaignsNav = () => {
  const pathname = usePathname();
  const lastDigit = parseInt(pathname.match(/\/(\d+)$/)[1]);
  const [lastPartOfUrl, setLastPartOfUrl] = useState("");
  const router = useRouter();
  // Output: 1

  const [viewMode, setViewMode] = useState("basicDetails");
  const buttonsData = [
    { step: 1, label: "Basic Details", viewMode: "basicDetails" },
    { step: 2, label: "About Campaign", viewMode: "aboutCampaign" },
    { step: 3, label: "Deliverables", viewMode: "deliverabels" },
    { step: 4, label: "Incentive", viewMode: "incentive" },
    { step: 5, label: "Review", viewMode: "review" },
  ];

  const handleButtonClick = (step: number, viewMode: string) => {
    console.log("hello");
    router.push(`/campaigns/abc/create/${step}`);
    setViewMode(viewMode);
  };

  return (
    <div className="pt-[5rem] flex flex-col">
      <div className="mt-2 flex rounded-[30px] w-[1000px] p-2 self-center justify-center border-2 border-black  ">
        {buttonsData.map((button) => (
          <React.Fragment key={button.step}>
            <Button
              variant="outline"
              className={`outline-none border-none focus:text-black text-${
                lastDigit === button.step ? "black" : "slate-400"
              }`}
              onClick={() => {
                handleButtonClick(button.step, button.viewMode);
                setViewMode(button.viewMode);
              }}
            >
              <div
                className={`${
                  lastDigit === button.step ? "bg-[#6b21a8]" : "bg-slate-400"
                } rounded-[50%]  text-white mr-2 py-1 px-3`}
              >
                {button.step}
              </div>
              {button.label}
            </Button>
            {button.step < buttonsData.length && (
              <ArrowRightCircle className="self-center" color="#6B21A8" />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default CampaignsNav;
