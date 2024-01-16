import { SubmitHandler, useForm } from "react-hook-form";
import * as React from "react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { Slider } from "@/components/ui/slider";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const engagementSchema = z.object({
  min: z
    .string()
    .transform((val) => (val === "" ? null : Number(val)))
    .refine((val) => val === null || !isNaN(val), {
      message: "Minimum must be a number",
    })
    .nullable(),
  max: z
    .string()
    .transform((val) => (val === "" ? null : Number(val)))
    .refine((val) => val === null || !isNaN(val), {
      message: "Maximum must be a number",
    })
    .nullable(),
});

type engagementSchema = z.infer<typeof engagementSchema>;

const EngagementFilterUI = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<engagementSchema>({
    resolver: zodResolver(engagementSchema),
  });

  const onSubmit: SubmitHandler<engagementSchema> = (data) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid gap-4">
        <div className="space-y-2">
          <h4 className="font-medium leading-none">Engagement Rate</h4>
          <p className="text-sm text-muted-foreground">
            Set the interval for engagement rates.
          </p>
        </div>

        <div className="grid grid-cols-3 items-center gap-4">
          <Label htmlFor="minEr">Minimum</Label>
          <Input
            id="minEr"
            placeholder="Minimum value (0)"
            className="col-span-2 h-8"
            {...register("min")}
          />
        </div>

        <div className="grid grid-cols-3 items-center gap-4">
          <Label htmlFor="maxFollowers">Maximum</Label>
          <Input
            id="maxFollowers"
            placeholder="Maximum value"
            className="col-span-2 h-8"
            {...register("max")}
          />
        </div>

        {/* Errors Display */}
        {errors.min && <p className="text-red-500">{errors.min.message}</p>}
        {errors.max && <p className="text-red-500">{errors.max.message}</p>}

        <div className="flex justify-between mt-5">
          <Button variant="outline" onClick={() => reset()}>
            Clear
          </Button>
          <Button type="submit">Apply</Button>
        </div>
      </div>
    </form>
  );
};

export default EngagementFilterUI
