import { SubmitHandler, useForm } from "react-hook-form";
import * as React from 'react';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Slider } from "@/components/ui/slider"
import { ChevronDown } from 'lucide-react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

const validationSchema = z
  .object({
    min: z
      .string()
      .transform((val) => (val === '' ? null : Number(val)))
      .refine((val) => val === null || !isNaN(val), {
        message: 'Minimum must be a number',
      })
      .nullable(),
    max: z
      .string()
      .transform((val) => (val === '' ? null : Number(val)))
      .refine((val) => val === null || !isNaN(val), {
        message: 'Maximum must be a number',
      })
      .nullable(),
  });


type ValidationSchema = z.infer<typeof validationSchema>;

const Form = () => {

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ValidationSchema>({
    resolver: zodResolver(validationSchema),
  });

  const onSubmit: SubmitHandler<ValidationSchema> = (data) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="grid gap-4">
                        <h4 className="font-medium leading-none">Follower Range</h4>
                        <p className="text-sm text-muted-foreground">
                            Set the interval for follower counts.
                        </p>

                        <div className="grid grid-cols-3 items-center gap-4">
                            <Label htmlFor="minFollowers">Minimum</Label>
                            <Input
                                id="minFollowers"
                                placeholder="Minimum value (0)"
                                className="col-span-2 h-8"
                                {...register('min')}
                            />
                        </div>

                        <div className="grid grid-cols-3 items-center gap-4">
                            <Label htmlFor="maxFollowers">Maximum</Label>
                            <Input
                                id="maxFollowers"
                                placeholder="Maximum value"
                                className="col-span-2 h-8"

                                {...register('max')}
                            />
                        </div>

                        {/* Range Slider */}
                        <Slider defaultValue={[33]} max={100} step={1} />
                        <RadioGroup defaultValue="" className="mt-3 text-slate-700 font-light">
                                <div className="flex items-center space-x-2">
                                  <RadioGroupItem value="option-one" id="option-one" />
                                  <Label htmlFor="option-one">Nano-Influencers (1k - 25k)</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <RadioGroupItem value="option-two" id="option-two" />
                                  <Label htmlFor="option-two">Micro-Influencers (25k - 100k)</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <RadioGroupItem value="option-three" id="option-two" />
                                  <Label htmlFor="option-two">Macro-Influencers (100k - 1M)</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <RadioGroupItem value="option-four" id="option-two" />
                                  <Label htmlFor="option-two">Celebrities (1M+)</Label>
                                </div>
                              </RadioGroup>
                        {/* Errors Display */}
                        {errors.min && <p className="text-red-500">{errors.min.message}</p>}
                        {errors.max && <p className="text-red-500">{errors.max.message}</p>}

                        <div className="flex justify-between mt-5">
                            <Button variant="outline" onClick={() => reset()}>Clear</Button>
                            <Button type="submit">Apply</Button>
                        </div>
                    </div>
                </form>
  );
};

export default Form;
