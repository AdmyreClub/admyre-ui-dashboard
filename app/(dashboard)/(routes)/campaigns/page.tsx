"use client";
import Heading from "@/components/heading";
import {
  ArrowLeftIcon,
  ArrowRightCircle,
  ChevronFirst,
  Hash,
  InstagramIcon,
  LucideInstagram,
  MoveLeftIcon,
  YoutubeIcon,
} from "lucide-react";
import React, { useState } from "react";
import Image from "next/image";
import campaignsLogo from "../../../../public/campaigns-logo.svg";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import "./style.css";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { useRouter } from "next/navigation";
const Page = () => {
  const handleAddCampaign = () => {
    console.log("hello");
  };


  const [isNewListDialogOpen, setIsNewListDialogOpen] = useState(false);
  const [viewMode, setViewMode] = useState("platform");
  const [parentViewMode, setparentViewMode] = useState("threeSteps");

  const [platform, setPlatform] = useState("");
  const [campaignType, setCampaignType] = useState("");
  const [campaignName, setCampaignName] = useState("");
  const [brandName, setBrandName] = useState("");
  const router = useRouter();

  return (
    <div className="pt-[5rem] flex flex-col">
      <Heading
        title="Create Campaigns"
        description="Create campaigns and track your influencers."
        icon={Hash}
        iconColor="text-black-500"
        bgColor="bg-slate-500/10"
      />
      {parentViewMode === "threeSteps" ? (
        <>
          <div className=" self-start ml-7  mt-[60px] ">
            <Image priority width={1150} src={campaignsLogo} alt="Campaigns" />
            <h1 className="text-white absolute ml-4 text-[34px] font-bold top-[210px]">
              Create a Campaign
            </h1>
            <h3 className="text-white text-[20px] absolute ml-4 top-[235px] mt-4">
              and help your brand grow
            </h3>
            <Dialog
              open={isNewListDialogOpen}
              onOpenChange={setIsNewListDialogOpen}
            >
              <DialogTrigger asChild>
                <Button
                  className="mt-9 ml-3 absolute top-[340px]"
                  onClick={() => setIsNewListDialogOpen(true)}
                >
                  New Campaign
                </Button>
              </DialogTrigger>
              <DialogContent className="flex flex-col justify-center w-[952px] ">
                <DialogHeader>
                  <DialogTitle className="self-center">
                    Create New Campaign
                  </DialogTitle>
                </DialogHeader>

                <>
                  <div className="mt-5 flex rounded-[30px] w-[700px] p-2 self-center justify-center border-2 border-black ">
                    <Button
                      variant={"outline"}
                      className="outline-none border-none"
                      onClick={() => {
                        setViewMode("platform");
                      }}
                    >
                      <div className="bg-black rounded-[50%] text-white mr-2 py-1 px-3">
                        1
                      </div>
                      Select Platform
                    </Button>
                    <ArrowRightCircle className="self-center" color="#6B21A8" />
                    <Button
                      variant={"outline"}
                      className="outline-none border-none"
                      disabled={platform ? false : true}
                      onClick={() => {
                        console.log("hellp");

                        setViewMode("campaignType");
                      }}
                    >
                      <div className="bg-black rounded-[50%] text-white mr-2 py-1 px-3">
                        2
                      </div>
                      Select Campaign Type
                    </Button>

                    <ArrowRightCircle className="self-center" color="#6B21A8" />
                    <Button
                      disabled={platform && campaignType ? false : true}
                      onClick={() => {
                        console.log("hellp");

                        setViewMode("createCampaign");
                      }}
                      variant={"outline"}
                      className="outline-none border-none"
                    >
                      <div className="bg-black rounded-[50%] text-white mr-2 py-1 px-3">
                        3
                      </div>
                      Create New Campaign
                    </Button>
                  </div>
                  <div className="viewModes">
                    {viewMode === "platform" ? (
                      <>
                        <p className="self-center">
                          Choose the platform on which you want to run the
                          campaign?
                        </p>

                        <div className="flex justify-center mt-2">
                          <Button
                            autoFocus={platform === "instagram"}
                            variant={"outline"}
                            id="instagram"
                            className="p-10 py-16 mr-4 cursor-pointer focus:shadow-lg instagram"
                            onClick={() => {
                              document
                                .getElementById("youtube")
                                ?.classList.remove("focusedYt");
                              document
                                .getElementById("instagram")
                                ?.classList.add("focusedIn");
                              setPlatform("instagram");
                            }}
                          >
                            <LucideInstagram size={70} />
                          </Button>
                          <Button
                            autoFocus={platform === "youtube"}
                            id="youtube"
                            variant={"outline"}
                            className="p-10 py-16 mr-4 cursor-pointer  focus:shadow-lg youtube hover:bg-red-500"
                            onClick={() => {
                              document
                                .getElementById("instagram")
                                ?.classList.remove("focusedIn");
                              document
                                .getElementById("youtube")
                                ?.classList.add("focusedYt");
                              setPlatform("youtube");
                            }}
                          >
                            <YoutubeIcon size={70} />
                          </Button>
                        </div>
                      </>
                    ) : (
                      <></>
                    )}
                    {viewMode === "campaignType" ? (
                      <>
                        <div className="flex  gap-3 justify-center mt-4">
                          <button
                            autoFocus={campaignType === "barterCampaign"}
                            className="bg-slate-100 focus:border-[1px] focus:border-[#6B21A8]  w-[30%] h-[45vh] flex flex-col p-4 focus:bg-slate-200 cursor-pointer   rounded-lg text-justify   focus:shadow-lg"
                            id="Cb"
                            onClick={() => {
                              console.log("hello");
                              document
                                .getElementById("Cc")
                                ?.classList.remove("focusedCc");
                              document
                                .getElementById("Cp")
                                ?.classList.remove("focusedCp");
                              document
                                .getElementById("Cb")
                                ?.classList.add("focusedCb");
                              setCampaignType("barterCampaign");
                            }}
                          >
                            <p className="font-bold">Barter Campaign</p>
                            <p className="mt-2 text-[12px]">
                              Influencers keep the products in-exchange for
                              posting content. Brand can create multiple hampers
                              for influencers to choose. This type is most
                              popular.
                            </p>
                            <p className="mt-2 text-[12px]">Steps</p>
                            <li className="text-[12px]">
                              Brand sends products in bulk to OPA
                            </li>
                            <li className="text-[12px]">
                              OPA ships products to each influencer
                            </li>
                            <li className="text-[12px]">
                              Influencers create and post content
                            </li>
                            <div className="flex self-start gap-1 mt-3 ">
                              <Card className="p-2">
                                <InstagramIcon />
                              </Card>
                              <Card className="p-2">
                                <YoutubeIcon />
                              </Card>
                            </div>
                          </button>
                          <button
                            className="bg-slate-100 focus:border-[1px] focus:border-[#6B21A8] w-[30%] h-[45vh] flex flex-col p-4 focus:bg-slate-200 cursor-pointer   rounded-lg text-justify   focus:shadow-lg"
                            autoFocus={campaignType === "payoutCampaign"}
                            id="Cp"
                            onClick={() => {
                              console.log("hello");
                              document
                                .getElementById("Cb")
                                ?.classList.remove("focusedCb");
                              document
                                .getElementById("Cc")
                                ?.classList.remove("focusedCc");
                              document
                                .getElementById("Cp")
                                ?.classList.add("focusedCp");
                              setCampaignType("payoutCampaign");
                            }}
                          >
                            <p className="font-bold">Payout Campaign</p>
                            <p className="mt-2 text-[12px]">
                              Influencers get paid for posting content. No
                              physical product is delivered. Payout campaigns
                              run faster and experience higher interest from
                              influencers.
                            </p>
                            <p className="mt-2 text-[12px]">Steps</p>
                            <li className="text-[12px]">
                              Brand transfers payout sum to OPA
                            </li>
                            <li className="text-[12px]">
                              Influencers create and post content
                            </li>
                            <li className="text-[12px]">
                              OPA pays to eligible influencers
                            </li>
                            <div className="flex self-start gap-1 mt-3 ">
                              <Card className="p-2">
                                <InstagramIcon />
                              </Card>
                              <Card className="p-2">
                                <YoutubeIcon />
                              </Card>
                            </div>
                          </button>
                          <button
                            className="bg-slate-100 w-[30%] focus:border-[1px] focus:border-[#6B21A8] h-[45vh] flex flex-col p-4  focus:bg-slate-200 cursor-pointer  rounded-lg text-justify   focus:shadow-lg"
                            autoFocus={campaignType === "cashbackCampaign"}
                            id="Cc"
                            onClick={() => {
                              console.log("hello");
                              document
                                .getElementById("Cb")
                                ?.classList.remove("focusedCb");
                              document
                                .getElementById("Cp")
                                ?.classList.remove("focusedCp");
                              document
                                .getElementById("Cc")
                                ?.classList.add("focusedCc");

                              setCampaignType("cashbackCampaign");
                            }}
                          >
                            <p className="font-bold">Cashback Campaign</p>
                            <p className="mt-2 text-[12px]">
                              Influencers order product they prefer from
                              specified website. Influencers are re-imbursed
                              later. Such campaigns experience low interest from
                              influencers.
                            </p>
                            <p className="mt-2 text-[12px]">Steps</p>
                            <li className="text-[12px]">
                              Brand transfers cashback sum to OPA
                            </li>
                            <li className="text-[12px]">
                              Influencers order specified products and share
                              order details
                            </li>
                            <li className="text-[12px]">
                              Influencers create and post content
                            </li>
                            <li className="text-[12px]">
                              OPA gives cashback to those eligible
                            </li>
                            <div className="flex self-start gap-1 mt-3 ">
                              <Card className="p-2">
                                <InstagramIcon />
                              </Card>
                              <Card className="p-2">
                                <YoutubeIcon />
                              </Card>
                            </div>
                          </button>
                        </div>
                      </>
                    ) : (
                      <></>
                    )}
                    {viewMode === "createCampaign" ? (
                      <>
                        <div className="flex flex-col">
                          <p className="text-[16px] font-semibold mt-4">
                            Enter the highlights of your campaign to get started
                            with the campaign setup.
                          </p>
                          <p className="text-slate-400 text-[12px]">
                            The information below will be displayed to the
                            influencers on the App.
                          </p>
                          <div className="flex justify-center gap-6 mt-5">
                            <div className="flex flex-col">
                              <Label className="text-[12px] ml-1">
                                Campaign Name
                              </Label>
                              <Input
                                value={campaignName}
                                onChange={(e) => {
                                  setCampaignName(e.target.value);
                                }}
                                className="w-[400px] mt-1"
                                placeholder="Your Campaign Name"
                              />
                            </div>
                            <div className="flex flex-col">
                              <Label className="text-[12px] ml-1">
                                Brand Name
                              </Label>
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
                      </>
                    ) : (
                      <></>
                    )}
                  </div>
                </>

                <DialogFooter className="mt-4 flex shadow-[-10px_-10px_30px_4px_rgba(0,0,0,0.1),_10px_10px_30px_4px_rgba(45,78,255,0.15)] p-2 mb-[-24px] ml-[-24px] w-[952px]">
                  <Button
                    className="self-end"
                    disabled={
                      viewMode === "platform"
                        ? platform
                          ? false
                          : true
                        : viewMode === "campaignType"
                        ? campaignType
                          ? false
                          : true
                        : viewMode === "createCampaign"
                        ? campaignName && brandName
                          ? false
                          : true
                        : false
                    }
                    onClick={() => {
                      if (viewMode === "platform") {
                        setViewMode("campaignType");
                      } else {
                        setViewMode("createCampaign");
                      }
                      if (viewMode === "createCampaign" && campaignName) {
                        const payload = {
                          platform,
                          campaignType,
                          campaignName,
                          brandName,
                        };
                        if (payload) {
                          router.push('/new-page');
                          setparentViewMode("fiveSteps");
                        }
                      }
                    }}
                  >
                    {viewMode !== "createCampaign" ? "Next" : "CREATE CAMPAIGN"}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>{" "}
        </>
      ) : (
        <></>
      )}
      {parentViewMode === "fiveSteps" ? (
        <>
          <div className="flex">
            <Button
              onClick={() => {
                setIsNewListDialogOpen(false);
                setparentViewMode("threeSteps");
              }}
            >
              <ArrowLeftIcon className="mr-2 self-start" /> Back
            </Button>
          </div>
        </>
      ) : (
        <></>
      )}
      {/* <Image priority src={campaignsLogo} alt="Follow us on Twitter" /> */}
    </div>
  );
};

export default Page;
