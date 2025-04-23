import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";
import { cn } from "../../lib/utils";

const SingleSlider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, ...props }, ref) => {
  return (
    <SliderPrimitive.Root
      ref={ref}
      className={cn("relative flex w-full touch-none select-none items-center", className)}
      {...props}
    >
      <SliderPrimitive.Track className="relative h-2 w-full grow overflow-hidden rounded-full bg-secondary">
        <SliderPrimitive.Range className="absolute h-full bg-primary" />
      </SliderPrimitive.Track>
      {props.value?.map((value, index) => {
        return (
          <React.Fragment key={index}>
            <SliderPrimitive.Thumb className="relative block h-5 w-5 rounded-full border-2 border-primary bg-background ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50">
              <div className="absolute -top-8 left-1/2 z-30 -translate-x-1/2 transform rounded-md border bg-popover px-2 text-popover-foreground shadow-sm">
                {value}
              </div>
            </SliderPrimitive.Thumb>
          </React.Fragment>
        );
      })}
    </SliderPrimitive.Root>
  );
});
SingleSlider.displayName = SliderPrimitive.Root.displayName;

export { SingleSlider };
