import { SubmitHandler, useForm } from "react-hook-form";
import * as React from "react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { Slider } from "@/components/ui/slider";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
export const locationsSchema = z.object({
  location: z.string().nullable(),
});

type locationSchema = z.infer<typeof locationsSchema>;

const LocationFilterUI = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<locationSchema>({
    resolver: zodResolver(locationsSchema),
  });

  const onSubmit: SubmitHandler<locationSchema> = (data) => console.log(data);
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">Select a Location</h4>
            <p className="text-sm text-muted-foreground">
              Select a location, state or country.
            </p>
          </div>
          <div className="grid gap-2">
            <div className="grid items-center gap-4">
              <Input
                id="width"
                defaultValue=""
                placeholder="E.g., Mumbai, Bengaluru"
                className="col-span-2 h-8"
                {...register('location')}
              />
            </div>
          </div>
        </div>
        {errors.location && <p className="text-red-500">{errors.location.message}</p>}
        <div id="CardFooter" className="flex justify-between mt-5">
          <Button variant="outline" onClick={() => reset()}>Clear</Button>
          <Button type="submit">Apply</Button>
        </div>
      </form>
    </div>
  );
};

export default LocationFilterUI;
