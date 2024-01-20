import { SubmitHandler, useForm } from "react-hook-form";
import * as React from "react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RangeSlider } from "@/components/ui/range-slider";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

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

const MAX_SLIDER_COUNT = 10000000;

interface ChildProps {
  onDataFromChild: (data: [number, number]) => void;
  defaultVal: [number, number];
}

type ValidationSchema = z.infer<typeof validationSchema>;

const FollowingFilter = ({ onDataFromChild, defaultVal }: ChildProps) => {
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

  const sendDataToParent = () => {
    // Send data to the parent component using the callback function
    onDataFromChild([min, max]);
  };

  function linearToInfluencerScale(value: number, max: number) {
    let scaledValue;
    if (value <= max * 0.25) {
      // Nano-Influencers
      scaledValue = 1000 + (value / (max * 0.25)) * (25000 - 1000);
    } else if (value <= max * 0.5) {
      // Micro-Influencers
      scaledValue =
        25000 + ((value - max * 0.25) / (max * 0.25)) * (100000 - 25000);
    } else if (value <= max * 0.75) {
      // Macro-Influencers
      scaledValue =
        100000 + ((value - max * 0.5) / (max * 0.25)) * (1000000 - 100000);
    } else {
      // Celebrities
      scaledValue =
        1000000 +
        ((value - max * 0.75) / (max * 0.25)) * (MAX_SLIDER_COUNT - 1000000);
    }
    return Math.round(scaledValue);
  }

  function influencerScaleToLinear(value: number, max: number) {
    let linearValue;
    if (value <= 25000) {
      // Nano-Influencers
      linearValue = ((value - 1000) / (25000 - 1000)) * (max * 0.25);
    } else if (value <= 100000) {
      // Micro-Influencers
      linearValue =
        max * 0.25 + ((value - 25000) / (100000 - 25000)) * (max * 0.25);
    } else if (value <= 1000000) {
      // Macro-Influencers
      linearValue =
        max * 0.5 + ((value - 100000) / (1000000 - 100000)) * (max * 0.25);
    } else {
      // Celebrities
      linearValue =
        max * 0.75 +
        ((value - 1000000) / (MAX_SLIDER_COUNT - 1000000)) * (max * 0.25);
    }
    return Math.round(linearValue);
  }
  const handleCustomReset = () => {
    onDataFromChild([0, MAX_SLIDER_COUNT]);
    reset({
      min: 0,
      max: MAX_SLIDER_COUNT,
    });
  };

  const onSliderChange = (values: [number, number]) => {
    const scaledMin = linearToInfluencerScale(values[0], MAX_SLIDER_COUNT);
    const scaledMax = linearToInfluencerScale(values[1], MAX_SLIDER_COUNT);

    setValue("min", scaledMin);
    setValue("max", scaledMax);
  };

  const parseNumber = (value: string) => {
    const parsed = parseInt(value, 10);
    return isNaN(parsed) ? null : parsed;
  };
  const onSubmit: SubmitHandler<ValidationSchema> = (data) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid gap-4">
        <h4 className="font-medium leading-none">Following Range</h4>
        <p className="text-sm text-muted-foreground">
          Set the interval for Following counts.
        </p>

        <div className="grid grid-cols-3 items-center gap-4">
          <Label htmlFor="minFollowings">Minimum</Label>
          <Input
            id="minFollowings"
            placeholder="Minimum value (0)"
            className="col-span-2 h-8"
            {...register("min", { setValueAs: parseNumber })}
          />
        </div>

        <div className="grid grid-cols-3 items-center gap-4">
          <Label htmlFor="maxFollowings">Maximum</Label>
          <Input
            id="maxFollowings"
            placeholder="Maximum value"
            className="col-span-2 h-8"
            {...register("max", { setValueAs: parseNumber })}
          />
        </div>

        <RangeSlider
          value={[
            influencerScaleToLinear(min || 0, MAX_SLIDER_COUNT),
            influencerScaleToLinear(max || MAX_SLIDER_COUNT, MAX_SLIDER_COUNT),
          ]}
          onValueChange={onSliderChange}
          min={0}
          max={MAX_SLIDER_COUNT}
        />

        {errors.min && <p className="text-red-500">{errors.min.message}</p>}
        {errors.max && <p className="text-red-500">{errors.max.message}</p>}

        <div className="flex justify-between mt-5">
          <Button
            variant="outline"
            onClick={() => handleCustomReset()}
          >
            Clear
          </Button>
          <Button type="submit" onClick={sendDataToParent}>
            Apply
          </Button>
        </div>
      </div>
    </form>
  );
};

export default FollowingFilter;
