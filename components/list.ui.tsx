"use client";

import React from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Plus } from 'lucide-react';

const DiscoverListUI = () => {
  return (
    <>
        <aside className="sticky top-[5rem] h-screen w-[350px] overflow-y-auto p-4 bg-white shadow-lg rounded-lg">
            {/* Sidebar content here */}
            <Card>
              <CardHeader>
                <CardTitle>All Strategies</CardTitle>
                <CardDescription>Select a strategy from the list below to start adding influencers! 👇🏻</CardDescription>
              </CardHeader>
              <CardContent>
                {/* Card content such as plan list */}
              </CardContent>
              <CardFooter>
                <Button><Plus className='mr-1'/>  New Strategy 🤓</Button>
              </CardFooter>
            </Card>
            {/* You can add more cards or content here */}
          </aside>
    </>
  )
}

export default DiscoverListUI
