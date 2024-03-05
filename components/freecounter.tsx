"use client";
import React, { useEffect, useState } from 'react'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Button } from './ui/button';
import { Label } from './ui/label';
import { SignOutButton } from '@clerk/nextjs';
import { Card } from './ui/card';
import { MAX_FREE_COUNT } from '@/constants';
import { Progress } from './ui/progress';

interface FreeCounterProps {
    apiLimiCount: number;
}
const FreeCounter = ({
    apiLimiCount = 0
}: FreeCounterProps) => {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    } , []);

    if(!mounted){
        return null;
    }
  return (
    <Card className="bg-black border-2 text-white flex flex-col space-y-4 p-4 rounded-lg items-center">
          <h3 className="font-medium">Tokens Tracker</h3>
          <p>{apiLimiCount} / {MAX_FREE_COUNT} Tokens Left</p>
          <Progress className='h-3'
          value={(apiLimiCount/MAX_FREE_COUNT) * 100 }/>
          <Popover>
            <PopoverTrigger asChild>
              <Button className="bg-gray-600 font-bold">Top Up</Button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
            <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">Account Settings</h4>
            <p className="text-sm text-muted-foreground">
              Tokens are used in exchange of fetching data
            </p>
          </div>
          <div className="grid gap-2">
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="width">Account Settings</Label>
                  <SignOutButton />
            </div>

          </div>
        </div>
            </PopoverContent>
          </Popover>
        </ Card>
  )
}

export default FreeCounter
