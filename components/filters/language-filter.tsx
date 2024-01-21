"use client";

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
    message: "You have to select at least one category.",
  }),
});

interface ChildProps {
  onDataFromChild: (data: string[]) => void;
  defaultVal: string[];
}

export function LanguagesForm({ onDataFromChild, defaultVal }: ChildProps) {
  //console.log(defaultVal.includes('Parenting'));

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      languages: [""],
    },
  });

  var defaultCheckedValues = defaultVal.languages;

  const values = form.watch();

  const sendDataToParent = () => {
    // Send data to the parent component using the callback function
    onDataFromChild(values);
  };

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log("Form data:", data);
  }

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
                  Select the Languages
                </FormDescription>
              </div>
              <ScrollArea className="h-[400px] rounded-md border p-5">
                {languages.map((category) => (
                  <FormField
                    key={category}
                    control={form.control}
                    name="languages"
                    render={({ field }) => {
                      return (
                        <FormItem
                          key={category}
                          className="flex flex-row space-x-3 space-y-0 mt-1 align-middle items-center"
                        >
                          <FormControl>
                            <Checkbox
                              checked={
                                field.value.includes(category) ||
                                defaultCheckedValues?.includes(category)
                              }
                              onCheckedChange={(checked) => {
                                const newValue = checked
                                  ? [...field.value, category]
                                  : field.value.filter((c) => c !== category);
                                field.onChange(newValue);
                              }}
                            />
                          </FormControl>
                          <FormLabel className="text-sm font-normal">
                            {category}
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
          <Button
            variant="outline"

            onClick={() => {
              onDataFromChild({languages: [""]})
              form.reset()
            }}
          >
            Clear
          </Button>
          <Button type="submit" onClick={sendDataToParent}>
            Apply
          </Button>
        </div>
      </form>
    </Form>
  );
}

export default LanguagesForm;





