"use client";

import React, { useState } from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea" // Assuming Textarea is exported from ui components
import { Label } from '@/components/ui/label';

const EnrichUI = () => {
  const [instagramUrls, setInstagramUrls] = useState('');
  const [discardedUrls, setDiscardedUrls] = useState([]);

  const handleApply = () => {
    // Logic to process the URLs, fetch information, and update the discardedUrls state
  };

  const handleClear = () => {
    setInstagramUrls('');
  };

  return (
    <>
      <div className='flex space-x-3 gap-4'>
        {/* Card for entering Instagram URLs */}
        <Card className="flex flex-col w-[350px]">
          <CardHeader>
            <CardTitle>Instagram URL Enrichment</CardTitle>
            <CardDescription>Enter Instagram URLs to fetch their information.</CardDescription>
          </CardHeader>
          <CardContent className="flex-grow">
            <form onSubmit={e => e.preventDefault()}>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="instagramUrls">Instagram URLs</Label>
                <Textarea
                  id="instagramUrls"
                  placeholder="Enter URLs separated by newline"
                  value={instagramUrls}
                  onChange={(e) => setInstagramUrls(e.target.value)}
                  className="h-40" // Fixed height
                />
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={handleClear}>Clear</Button>
            <Button onClick={handleApply}>Import</Button>
          </CardFooter>
        </Card>

        {/* Card for discarded URLs */}
        <Card className="w-[350px]">
          <CardHeader>
            <CardTitle>Discarded URLs</CardTitle>
            <CardDescription>These URLs were invalid and could not be processed.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2 overflow-auto h-40"> {/* Fixed height */}
            {discardedUrls.map((url, index) => (
              <div key={index} className="break-words">{url}</div>
            ))}
          </CardContent>
        </Card>
      </div>
    </>
  )
}

export default EnrichUI

