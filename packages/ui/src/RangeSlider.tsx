import { tw } from '@dragverse/browser'
import * as SliderPrimitive from '@radix-ui/react-slider'
import type { ElementRef } from 'react'
import { forwardRef } from 'react'

type RangeSliderProps = SliderPrimitive.SliderProps & {
  className?: string
}

export const RangeSlider = forwardRef<
  ElementRef<typeof SliderPrimitive.Root>,
  RangeSliderProps
>(({ className, ...props }, ref) => {
  return (
    <SliderPrimitive.Root
      className={tw(
        'relative flex h-5 w-full touch-none select-none items-center',
        className
      )}
      max={100}
      step={1}
      ref={ref}
      {...props}
    >
      <SliderPrimitive.Track className="dark:bg-brand-250 relative h-[3px] grow rounded-full bg-gray-200">
        <SliderPrimitive.Range className="bg-brand-250 absolute h-full rounded-full" />
      </SliderPrimitive.Track>
      <SliderPrimitive.Thumb className="bg-brand-850 block h-4 rounded-sm px-1 text-xs font-bold text-white focus:outline-none active:scale-110 dark:bg-white dark:text-black">
        {props.value}
      </SliderPrimitive.Thumb>
    </SliderPrimitive.Root>
  )
})

RangeSlider.displayName = 'RangeSlider'
