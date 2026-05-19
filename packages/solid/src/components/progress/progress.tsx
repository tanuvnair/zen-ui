import { splitProps } from "solid-js";
import { Progress as KProgress } from "@kobalte/core/progress";
import { cn } from "../../lib/cn";

/**
 * Progress — Solid port built on Kobalte's Progress primitive.
 *
 *   <Progress value={67} />              // determinate
 *   <Progress />                         // indeterminate
 *
 * Kobalte supplies the correct ARIA (role="progressbar", aria-valuenow,
 * aria-valuemax) and a data-progress="indeterminate" attribute we can
 * target for styling.
 */

export type ProgressSize = "sm" | "md" | "lg";
export type ProgressColor =
  | "primary"
  | "neutral"
  | "info"
  | "success"
  | "warning"
  | "error";

export type ProgressProps = {
  value?: number;
  minValue?: number;
  maxValue?: number;
  size?: ProgressSize;
  color?: ProgressColor;
  class?: string;
  /** When true, Kobalte renders an indeterminate progress bar. */
  indeterminate?: boolean;
};

const TRACK_HEIGHT: Record<ProgressSize, string> = {
  sm: "h-1",
  md: "h-2",
  lg: "h-3",
};
const FILL_BG: Record<ProgressColor, string> = {
  primary: "bg-zen-primary",
  neutral: "bg-zen-neutral",
  info: "bg-zen-info",
  success: "bg-zen-success",
  warning: "bg-zen-warning",
  error: "bg-zen-error",
};

export const Progress = (props: ProgressProps) => {
  const [local] = splitProps(props, [
    "class",
    "size",
    "color",
    "value",
    "minValue",
    "maxValue",
    "indeterminate",
  ]);
  return (
    <KProgress
      value={local.value}
      minValue={local.minValue}
      maxValue={local.maxValue}
      indeterminate={local.indeterminate}
      class={cn(
        "relative w-full overflow-hidden rounded-zen-full bg-zen-muted",
        TRACK_HEIGHT[local.size ?? "md"],
        local.class,
      )}
    >
      <KProgress.Track class="h-full w-full">
        <KProgress.Fill
          class={cn(
            "h-full w-[var(--kb-progress-fill-width)] transition-[width]",
            FILL_BG[local.color ?? "primary"],
          )}
        />
      </KProgress.Track>
    </KProgress>
  );
};
