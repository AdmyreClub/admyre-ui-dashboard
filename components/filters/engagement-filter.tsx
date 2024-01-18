import { SubmitHandler, useForm, Controller } from "react-hook-form";
import * as React from "react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RangeSlider } from "@/components/ui/range-slider";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { SliderThumb } from "@radix-ui/react-slider";
import { Engagement } from "next/font/google";

const validationSchema = z.object({
  min: z
    .number()
    .nullable()
    .refine((val) => val == null || !isNaN(val), {
      message: "Minimum must be a number",
    }),
  max: z
    .number()
    .nullable()
    .refine((val) => val == null || !isNaN(val), {
      message: "Maximum must be a number",
    }),
});

interface ChildProps {
  onDataFromChild: (data: [number, number]) => void;
  defaultVal: [number, number];
}




const MAX_SLIDER_COUNT = 100;

type ValidationSchema = z.infer<typeof validationSchema>;

const EngagementRateUI = ({ onDataFromChild, defaultVal }: ChildProps) => {
  const inputRef = React.useRef();
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
      min: defaultVal[0], // Provide a default value for min
      max: defaultVal[1], // Provide a default value for max
    },
  });

  const { min, max } = watch();

  const handleCustomReset = () => {
    onDataFromChild([0, MAX_SLIDER_COUNT]);
    reset({
      min: 0,
      max: MAX_SLIDER_COUNT,
    })
  };

  const sendDataToParent = () => {
    // Send data to the parent component using the callback function
    onDataFromChild([min, max]);
  };

  const handleRadioChange = (minValue: number, maxValue: number) => {
    setValue("min", minValue);
    setValue("max", maxValue);
  };

  const onSliderChange = (values: [number, number]) => {
    setValue("min", values[0]);
    setValue("max", values[1]);
  };

  const handleRangeChange = (min: number, max:number) => {
      
  };

  const parseNumber = (value: string) => {
    const parsed = parseInt(value, 10);
    return isNaN(parsed) ? null : parsed;
  };
  const onSubmit: SubmitHandler<ValidationSchema> = (data) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid gap-4">
        <h4 className="font-medium leading-none">Engagement Rate</h4>
        <p className="text-sm text-muted-foreground">
          Set the interval for Engagement Rate
        </p>

        <div className="grid grid-cols-3 items-center gap-4">
          <Label htmlFor="minFollowers">Minimum</Label>
          <Input
            id="minFollowers"
            placeholder="Minimum value (0)"
            className="col-span-2 h-8"
            {...register("min", { setValueAs: parseNumber })}
          />
        </div>

        <div className="grid grid-cols-3 items-center gap-4">
          <Label htmlFor="maxFollowers">Maximum</Label>
          <Input
            id="maxFollowers"
            placeholder="Maximum value"
            className="col-span-2 h-8"
            {...register("max", { setValueAs: parseNumber })}
          />
        </div>

        <RangeSlider
          defaultValue={[min || 0, max || MAX_SLIDER_COUNT]} // Set default values
          onValueChange={onSliderChange} // Update form values on change
          min={0} // Minimum value
          max={MAX_SLIDER_COUNT} // Maximum value
          step={MAX_SLIDER_COUNT / 10000} // Step value
          value={[min,max]}
        />

        <div className="flex justify-between mt-5">
          <Button variant="outline" onClick={() => handleCustomReset()}>
            Clear
          </Button>
          <Button type="submit" onClick={sendDataToParent}>Apply</Button>
        </div>
      </div>
    </form>
  );
};

export default EngagementRateUI;
