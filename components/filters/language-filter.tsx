"use client";

import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { ScrollArea } from "@/components/ui/scroll-area";

const languages = [
  "English",
  "Hindi",
  "Bengali",
  "Urdu",
  "Punjabi",
  "Gujarati",
  "Odia",
  "Kannada",
  "Malayalam",
  "Marathi",
  "Telugu",
  "Tamil",
];

const FormSchema = z.object({
  languages: z.array(z.string()).refine((value) => value.length > 0, {
    message: "Please select at least one language.",
  }),
});

export function LanguageFilterUI() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      languages: [""],
    },
  });

  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    console.log('Selected Languages:', data.languages);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="languages"
          render={() => (
            <FormItem>
              <div className="mb-4">
                <FormLabel className="text-base">Languages</FormLabel>
                <FormDescription>
                  Select the languages you are interested in.
                </FormDescription>
              </div>
              <ScrollArea className="h-[280px] rounded-md border p-5">
                {languages.map((language) => (
                  <FormField
                    key={language}
                    control={form.control}
                    name="languages"
                    render={({ field }) => {
                      return (
                        <FormItem
                          key={language}
                          className="flex flex-row space-x-3 space-y-0 mt-1 align-middle items-center"
                        >
                          <FormControl>
                            <Checkbox
                              checked={field.value.includes(language)}
                              onCheckedChange={(checked) => {
                                const newValue = checked
                                  ? [...field.value, language]
                                  : field.value.filter((c) => c !== language);
                                field.onChange(newValue);
                              }}
                            />
                          </FormControl>
                          <FormLabel className="text-sm font-normal">
                            {language}
                          </FormLabel>
                        </FormItem>
                      );
                    }}
                  />
                ))}
              </ScrollArea>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-between mt-5">
          <Button variant="outline" onClick={() => form.reset()}>Clear</Button>
          <Button type="submit">Apply</Button>
        </div>
      </form>
    </Form>
  );
}

export default LanguageFilterUI;
