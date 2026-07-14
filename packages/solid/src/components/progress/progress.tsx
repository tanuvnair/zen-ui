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
  sm: "zen-h-1",
  md: "zen-h-2",
  lg: "zen-h-3",
};
const FILL_BG: Record<ProgressColor, string> = {
  primary: "zen-bg-zen-primary",
  neutral: "zen-bg-zen-neutral",
  info: "zen-bg-zen-info",
  success: "zen-bg-zen-success",
  warning: "zen-bg-zen-warning",
  error: "zen-bg-zen-error",
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
        "zen-relative zen-w-full zen-overflow-hidden zen-rounded-zen-full zen-bg-zen-muted",
        TRACK_HEIGHT[local.size ?? "md"],
        local.class,
      )}
    >
      <KProgress.Track class="zen-h-full zen-w-full">
        <KProgress.Fill
          class={cn(
            "zen-h-full zen-w-[var(--kb-progress-fill-width)] zen-transition-[width]",
            FILL_BG[local.color ?? "primary"],
          )}
        />
      </KProgress.Track>
    </KProgress>
  );
};
