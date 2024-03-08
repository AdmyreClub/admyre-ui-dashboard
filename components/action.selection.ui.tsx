"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const ActionSelectionUI = () => {
  const router = useRouter();

  const navigateToTrack = () => {
    router.push('/actions/track');
  };

  const navigateToImport = () => {
    router.push('/actions/strategies');
  };

  return (
   <>
    <div className='flex space-x-3 gap-4 justify-center'>
      <Card className="w-full lg:w-[45%]">
        <CardHeader>
          <CardTitle>Track Posts & Profiles</CardTitle>
          <CardDescription>Monitor campaign performance or analyze competitors by tracking posts and profiles.</CardDescription>
        </CardHeader>
        <CardContent>
          {/* Content can be added here if needed */}
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button onClick={navigateToTrack}>Start Tracking</Button>
        </CardFooter>
      </Card>

      <Card className="w-full lg:w-[45%]">
        <CardHeader>
          <CardTitle>Import & Enrich Data</CardTitle>
          <CardDescription>Enhance your strategy by importing profiles individually or in bulk and enriching the data.</CardDescription>
        </CardHeader>
        <CardContent>
          {/* Content can be added here if needed */}
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button onClick={navigateToImport} disabled={true}>Import Profiles</Button>
        </CardFooter>
      </Card>

    </div>

   </>
  )
}

export default ActionSelectionUI;

