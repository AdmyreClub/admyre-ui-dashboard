"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

// Define your schema based on what you expect to receive from the AI filter
const aiFilterSchema = z.object({
  needsDescription: z.string().min(1, "Please describe your needs."),
});

type AIFilterSchema = z.infer<typeof aiFilterSchema>;

const AIFilterUI = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<AIFilterSchema>({
    resolver: zodResolver(aiFilterSchema),
  });

  const onSubmit = (data: AIFilterSchema) => {
    console.log("AI Filter Submission:", data);
  };

  const handleReset = () => {
    reset();
  };

  return (
    <Card className="w-full mb-8">
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardHeader>
          <CardTitle>AI-Based Creator Discovery</CardTitle>
          <CardDescription>Let AI assist you in finding the perfect influencers for your campaign.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col space-y-4">
            <div>
              <Label htmlFor="needsDescription">Brief for AI</Label>
              <Textarea
                id="needsDescription"
                placeholder="Describe your campaign needs briefly for AI analysis."
                className="w-full p-2 border rounded-md"
                {...register('needsDescription')}
              />
              {errors.needsDescription && <p className="text-red-500">{errors.needsDescription.message}</p>}
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={handleReset}>Clear</Button>
          <Button type="submit">Apply</Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default AIFilterUI;
