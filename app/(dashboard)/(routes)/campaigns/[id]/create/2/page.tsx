"use client";

import { PlateEditor } from "@/components/editor";
import CampaignsNav from "@/components/ui/CampaignsNav";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

const page = () => {
  const router = useRouter();
  const handleSave = () => {
    //logic to save
  };
  const [dataFromChild, setDataFromChild] = React.useState();
  const [dataFromChild2, setDataFromChild2] = React.useState();
  const [maxParticipants, setMaxParticipants] = React.useState(0);

  const handleChildInputChange = (newData) => {
    setDataFromChild(newData);
  };
  const handleChildInputChange2 = (newData) => {
    setDataFromChild2(newData);
  };

  const handleEditorDataSave = () => {
    console.log(dataFromChild);
  };
  const handleEditorDataSave2 = () => {
    console.log(dataFromChild2);
  };
  return (
    <div className="flex flex-col">
      <div className="mt-[0px]">
        <CampaignsNav />
      </div>
      <div className="w-[1000px] p-5 flex flex-col gap-6 h-[69vh] bg-slate-100 self-center mt-2  rounded-md shadow-md">
        <div className="flex justify-between gap-2">
          <div className="flex flex-col w-[500px] h-[21vh]">
            <p className="text-[16px] font-bold ml-3 mt-3 mb-3">
              Tell the influencer about your brand
            </p>
            <div className="flex flex-col bg-white p-5 ml-3 rounded-lg">
              <p className="text-[12px]">Example</p>
              <p className="text-[16px] font-bold">About Your Brand</p>
              <p className="text-[14px]">
                Tell the influencer about your brand Describe your brand under
                300 words, this would be you brands description to the
                influencer on the OPA app.
              </p>
            </div>
          </div>
          <div className="editor w-[500px] h-[27vh] p-3 bg-white pb-2 mr-3">
            <PlateEditor sendDataToParent={handleChildInputChange} />
            <Button className="mt-2" onClick={handleEditorDataSave}>
              Save
            </Button>
          </div>
        </div>
        <div className="flex justify-between gap-2">
          <div className="flex flex-col w-[500px] h-[26vh]">
            <p className="text-[16px] font-bold ml-3 mt-1 mb-3">
              Give an overview of the campaign to the influencers
            </p>
            <div className="flex flex-col bg-white p-5 ml-3 rounded-lg">
              <p className="text-[12px]">Example</p>
              <p className="text-[16px] font-bold">Campaign Objective</p>
              <p className="text-[14px]">
                The objective will be to create fun & sassy content that matches
                Plum BodyLovin’s tagline of Love. Every. Inch. Share the
                fabulous & fresh experience of using the Plum BodyLovin products
                on your skin.
              </p>
            </div>
          </div>
          <div className="editor w-[500px] mt-3 h-[27vh] bg-white p-3 mr-3">
            <PlateEditor sendDataToParent={handleChildInputChange2} />
            <Button className="mt-2" onClick={handleEditorDataSave2}>
              Save
            </Button>
          </div>
        </div>
        <div className="flex w-[900px] justify-between ml-3 mt-[-15px]">
          <Label className="font-bold">Maximum Participation</Label>
          <Input
            type="number"
            className="w-[400px]"
            value={maxParticipants}
            onChange={(e) => {
              setMaxParticipants(parseInt(e.target.value));
            }}
          />
        </div>
      </div>
      <div className="self-center flex justify-between rounded-t-md border-[1px] border-black bg-slate-100 absolute bottom-0 w-[70vw] h-[4rem]">
        <div className="self-start mt-3 ml-3">
          <Button
            onClick={() => {
              router.push(`1`);
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
              router.push(`3`);
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
function useState(): [any, any] {
  throw new Error("Function not implemented.");
}
