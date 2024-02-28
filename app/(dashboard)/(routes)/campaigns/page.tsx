import Heading from "@/components/heading";
import { Hash } from "lucide-react";
import React from "react";
import Image from "next/image";
import campaignsLogo from "../../../../public/campaigns-logo.svg";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
const page = () => {
  return (
    <div className="pt-[5rem] flex flex-col">
      <Heading
        title="Create Campaigns"
        description="Create campaigns and track your influencers."
        icon={Hash}
        iconColor="text-black-500"
        bgColor="bg-slate-500/10"
      />
      <Card className=" self-start ml-7  mt-[60px] ">
        <Image priority src={campaignsLogo} alt="Campaigns" />
        <h1 className="text-white absolute ml-4 text-[28px] font-bold top-[210px]">Create a Campaign</h1>
        <h3 className="text-white absolute ml-4 top-[235px] mt-3">and help your brand grow</h3>
        <Button className="absolute ml-4 mt-2 top-[310px]">Newcd  Campaign</Button>
      </Card>
      {/* <Image priority src={campaignsLogo} alt="Follow us on Twitter" /> */}
    </div>
  );
};

export default page;
