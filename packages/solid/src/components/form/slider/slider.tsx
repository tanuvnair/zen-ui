import { createMemo, For, splitProps } from "solid-js";
import { Slider as KSlider } from "@kobalte/core/slider";
import { cn } from "../../../lib/cn";

/**
 * Slider — Solid port built on Kobalte Slider. Supports single-thumb
 * and range (multi-thumb).
 *
 *   <Slider defaultValue={[50]} maxValue={100} step={1} />
 *   <Slider defaultValue={[20, 80]} maxValue={100} step={1} />
 *
 * Kobalte supplies keyboard control (arrows, PgUp/Dn, Home/End), ARIA,
 * RTL and form submission (via name + value).
 */

export type SliderProps = {
  value?: number[];
  defaultValue?: number[];
  onChange?: (value: number[]) => void;
  minValue?: number;
  maxValue?: number;
  step?: number;
  minStepsBetweenThumbs?: number;
  orientation?: "horizontal" | "vertical";
  disabled?: boolean;
  name?: string;
  class?: string;
};

export const Slider = (props: SliderProps) => {
  const [local] = splitProps(props, [
    "value",
    "defaultValue",
    "onChange",
    "minValue",
    "maxValue",
    "step",
    "minStepsBetweenThumbs",
    "orientation",
    "disabled",
    "name",
    "class",
  ]);
  const thumbs = createMemo(() => {
    const v = local.value ?? local.defaultValue ?? [0];
    return v.map((_, i) => i);
  });
  return (
    <KSlider
      value={local.value}
      defaultValue={local.defaultValue}
      onChange={local.onChange}
      minValue={local.minValue}
      maxValue={local.maxValue}
      step={local.step}
      minStepsBetweenThumbs={local.minStepsBetweenThumbs}
      orientation={local.orientation}
      disabled={local.disabled}
      name={local.name}
      class={cn(
        "relative flex w-full touch-none select-none items-center",
        "data-[orientation=vertical]:h-full data-[orientation=vertical]:w-2 data-[orientation=vertical]:flex-col",
        local.class,
      )}
    >
      <KSlider.Track
        class={cn(
          "relative h-2 w-full grow overflow-hidden rounded-zen-full bg-zen-muted",
          "data-[orientation=vertical]:h-full data-[orientation=vertical]:w-2",
        )}
      >
        <KSlider.Fill
          class={cn(
            "absolute h-full bg-zen-primary",
            "data-[orientation=vertical]:w-full",
          )}
        />
      </KSlider.Track>
      <For each={thumbs()}>
        {() => (
          <KSlider.Thumb
            class={cn(
              "block h-5 w-5 rounded-zen-full border-2 border-zen-primary bg-zen-background",
              "transition-colors",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zen-ring focus-visible:ring-offset-2",
              "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
            )}
          >
            <KSlider.Input />
          </KSlider.Thumb>
        )}
      </For>
    </KSlider>
  );
};
