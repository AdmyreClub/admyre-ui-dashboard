"use client";

import * as React from 'react';
import * as SliderPrimitive from '@radix-ui/react-slider';
import cn from 'classnames';

// Assuming you're using TypeScript, this type ensures you pass an array of two numbers for value and default value
type SliderProps = React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root> & {
  onValueChange?: (value: [number, number]) => void;
  value?: [number, number];
  defaultValue?: [number, number];
};

const RangeSlider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  SliderProps
>(({ className, onValueChange, value, defaultValue, ...props }, ref) => {

  // Handler for value change
  const handleValueChange = (value: [number, number]) => {
    onValueChange?.(value);
  };

  return (
    <SliderPrimitive.Root
      ref={ref}
      className={cn(
        "relative flex w-full touch-none select-none items-center",
        className
      )}
      onValueChange={handleValueChange}
      value={value}
      defaultValue={defaultValue}
      {...props}
    >
      <SliderPrimitive.Track className="relative h-2 w-full grow overflow-hidden rounded-full bg-secondary">
        <SliderPrimitive.Range className="absolute h-full bg-primary" />
      </SliderPrimitive.Track>
      {/* First Thumb */}
      <SliderPrimitive.Thumb className="block h-5 w-5 rounded-full border-2 border-primary bg-background" />
      {/* Second Thumb */}
      <SliderPrimitive.Thumb className="block h-5 w-5 rounded-full border-2 border-primary bg-background" />
    </SliderPrimitive.Root>
  );
});

RangeSlider.displayName = 'Slider';

export { RangeSlider };
