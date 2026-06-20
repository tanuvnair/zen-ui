/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from "react";
import { cn } from "../../lib/cn";

/**
 * Camera — webcam capture wrapping `react-webcam` (an OPTIONAL peer dependency).
 * Lazy-loaded so it never weighs on consumers who don't capture. Install
 * `react-webcam` to use it. Calls `onCapture` with a data-URL screenshot.
 *
 *   <Camera onCapture={(dataUrl) => save(dataUrl)} facingMode="user" />
 */

export interface CameraProps {
  onCapture?: (dataUrl: string) => void;
  width?: number;
  height?: number;
  facingMode?: "user" | "environment";
  screenshotFormat?: "image/jpeg" | "image/png" | "image/webp";
  mirrored?: boolean;
  captureLabel?: React.ReactNode;
  className?: string;
}

const Webcam = React.lazy(() => import("react-webcam"));

export const Camera = ({
  onCapture,
  width = 480,
  height = 360,
  facingMode = "user",
  screenshotFormat = "image/jpeg",
  mirrored = true,
  captureLabel = "Capture",
  className,
}: CameraProps) => {
  const ref = React.useRef<any>(null);

  const capture = React.useCallback(() => {
    const shot = ref.current?.getScreenshot?.();
    if (shot) onCapture?.(shot);
  }, [onCapture]);

  return (
    <div className={cn("flex flex-col items-center gap-3", className)}>
      <React.Suspense
        fallback={
          <div
            className="flex items-center justify-center text-sm text-zen-muted-fg"
            style={{ width, height }}
          >
            Loading camera…
          </div>
        }
      >
        <Webcam
          ref={ref}
          audio={false}
          width={width}
          height={height}
          mirrored={mirrored}
          screenshotFormat={screenshotFormat}
          videoConstraints={{ facingMode, width, height }}
          className="rounded-zen-md border border-zen-border"
        />
      </React.Suspense>
      <button
        type="button"
        onClick={capture}
        className="inline-flex h-9 items-center justify-center rounded-zen-md bg-zen-primary px-4 text-sm font-medium text-zen-primary-fg transition-colors hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zen-ring focus-visible:ring-offset-2"
      >
        {captureLabel}
      </button>
    </div>
  );
};
Camera.displayName = "Camera";
