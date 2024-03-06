"use client";

import { PlateEditor } from "@/components/editor";
import CampaignsNav from "@/components/ui/CampaignsNav";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

const Page = () => {
  const router = useRouter();
  const handleSave = () => {
    //logic to save
  };
  const [dataFromChild, setDataFromChild] = React.useState();
  const [dataFromChild2, setDataFromChild2] = React.useState();

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
      <CampaignsNav />
      <div className="w-[1000px] p-5 flex flex-col gap-6 h-[65vh] bg-slate-100 self-center mt-5  rounded-md shadow-md">
        <div className="flex justify-between gap-2">
          <div className="flex flex-col w-[500px] h-[23vh]">
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
            <Button className="mt-2" onClick={handleEditorDataSave}>Save</Button>
          </div>
        </div>
        <div className="flex justify-between gap-2">
          <div className="flex flex-col w-[500px] h-[26vh]">
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
          <div className="editor w-[500px] mt-3 h-[27vh] bg-white p-3 mr-3">
            <PlateEditor sendDataToParent={handleChildInputChange2} />
            <Button className="mt-2" onClick={handleEditorDataSave2}>Save</Button>
          </div>
        </div>
      </div>
      <div className="self-center flex justify-between rounded-t-md border-[1px] border-black bg-slate-100 absolute bottom-0 w-[70vw] h-[4.5rem]">
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

export default Page;
