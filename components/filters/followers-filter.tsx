import { SubmitHandler, useForm } from "react-hook-form";
import * as React from 'react';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RangeSlider } from "@/components/ui/range-slider"
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

const validationSchema = z.object({
  min: z.number().nullable().refine((val) => val == null || !isNaN(val), {
    message: 'Minimum must be a number',
    }),
    max: z.number().nullable().refine((val) => val == null || !isNaN(val), {
    message: 'Maximum must be a number',
    }),
});

const MAX_SLIDER_COUNT = 10000000

type ValidationSchema = z.infer<typeof validationSchema>;

const FollowerFilter = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
    watch,
    control,
  } = useForm<ValidationSchema>({
    resolver: zodResolver(validationSchema),
    defaultValues: {
      min: 0, // Provide a default value for min
      max: MAX_SLIDER_COUNT, // Provide a default value for max
    },
  });


  const { min, max } = watch();


  const handleRadioChange = (minValue: number, maxValue: number) => {
    setValue("min", minValue);
    setValue("max", maxValue);
  };

  const onSliderChange = (values: [number, number]) => {
    setValue('min', values[0]);
    setValue('max', values[1]);
  };

  const parseNumber = (value: string) => {
    const parsed = parseInt(value, 10);
    return isNaN(parsed) ? null : parsed;
  };
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
            {...register('min', { setValueAs: parseNumber })}
          />
        </div>

        <div className="grid grid-cols-3 items-center gap-4">
          <Label htmlFor="maxFollowers">Maximum</Label>
          <Input
            id="maxFollowers"
            placeholder="Maximum value"
            className="col-span-2 h-8"
            {...register('max', { setValueAs: parseNumber })}
          />
        </div>

        <RangeSlider
        defaultValue={[min || 0, max || MAX_SLIDER_COUNT]} // Set default values
        onValueChange={onSliderChange} // Update form values on change
        min={0} // Minimum value
        max={MAX_SLIDER_COUNT} // Maximum value
        step={MAX_SLIDER_COUNT/500000} // Step value
      />

        <RadioGroup defaultValue="" className="mt-3 text-slate-700 font-light">
          <div className="flex items-center space-x-2">
            <RadioGroupItem
              value="nano"
              onClick={() => handleRadioChange(1000, 25000)}
            />
            <Label>Nano-Influencers (1k - 25k)</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem
              value="micro"
              onClick={() => handleRadioChange(25000, 100000)}
            />
            <Label>Micro-Influencers (25k - 100k)</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem
              value="macro"
              onClick={() => handleRadioChange(100000, 1000000)}
            />
            <Label>Macro-Influencers (100k - 1M)</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem
              value="celebrity"
              onClick={() => handleRadioChange(1000000, MAX_SLIDER_COUNT)}
            />
            <Label>Celebrities (1M+)</Label>
          </div>
        </RadioGroup>

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

export default FollowerFilter;
