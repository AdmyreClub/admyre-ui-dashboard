import { SubmitHandler, useForm } from "react-hook-form";
import * as React from "react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Slider } from "@/components/ui/slider";
import { ChevronDown } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";


const followingSchema = z.object({
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

type followingSchema = z.infer<typeof followingSchema>;

const FollowingsFilterUI = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<followingSchema>({
    resolver: zodResolver(followingSchema),
  });

  const onSubmit: SubmitHandler<followingSchema> = (data) => console.log(data);
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">Followings Range</h4>
            <p className="text-sm text-muted-foreground">
              Set the interval for following counts.
            </p>
          </div>
          <div className="grid gap-5">
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="width">Minimum </Label>
              <Input
                id="width"
                defaultValue=""
                placeholder="minimum value (0)"
                className="col-span-2 h-8"
                {...register("min")}
              />
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="maxWidth">Maximum</Label>
              <Input
                id="maxWidth"
                defaultValue=""
                placeholder="maximum value (?)"
                className="col-span-2 h-8"
                {...register("max")}
              />
            </div>
            <Slider defaultValue={[33]} max={100} step={1} />
          </div>
        </div>
        <div id="CardFooter" className="flex justify-between mt-5">
          <Button variant="outline" onClick={() => reset()}>Clear</Button>
          <Button>Apply</Button>
        </div>
      </form>
    </>
  );
};

export default FollowingsFilterUI;
