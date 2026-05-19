import * as React from "react";
import { OTPInput, OTPInputContext } from "input-otp";
import { cn } from "../../../lib/cn";

/**
 * InputOTP — shadcn-style on top of `input-otp` (the de-facto OTP primitive
 * shadcn uses). Compound API:
 *
 *   <InputOTP maxLength={6} value={v} onChange={setV}>
 *     <InputOTPGroup>
 *       <InputOTPSlot index={0} />
 *       <InputOTPSlot index={1} />
 *       <InputOTPSlot index={2} />
 *     </InputOTPGroup>
 *     <InputOTPSeparator />
 *     <InputOTPGroup>
 *       <InputOTPSlot index={3} />
 *       <InputOTPSlot index={4} />
 *       <InputOTPSlot index={5} />
 *     </InputOTPGroup>
 *   </InputOTP>
 *
 * input-otp handles all the hard parts: paste, keyboard nav, autocomplete
 * (OTP one-time-code), mobile keyboard hints. We just style.
 */

const InputOTP = React.forwardRef<
  React.ElementRef<typeof OTPInput>,
  React.ComponentPropsWithoutRef<typeof OTPInput>
>(({ className, containerClassName, ...props }, ref) => (
  <OTPInput
    ref={ref}
    containerClassName={cn(
      "flex items-center gap-2 has-[:disabled]:opacity-50",
      containerClassName,
    )}
    className={cn("disabled:cursor-not-allowed", className)}
    {...props}
  />
));
InputOTP.displayName = "InputOTP";

const InputOTPGroup = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<"div">
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("flex items-center", className)} {...props} />
));
InputOTPGroup.displayName = "InputOTPGroup";

const InputOTPSlot = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<"div"> & { index: number }
>(({ index, className, ...props }, ref) => {
  const inputOTPContext = React.useContext(OTPInputContext);
  const slot = inputOTPContext.slots[index];
  const char = slot?.char ?? "";
  const hasFakeCaret = slot?.hasFakeCaret ?? false;
  const isActive = slot?.isActive ?? false;

  return (
    <div
      ref={ref}
      className={cn(
        "relative flex h-10 w-10 items-center justify-center border-y border-r border-zen-border text-sm",
        "first:rounded-l-zen-md first:border-l last:rounded-r-zen-md",
        "transition-all",
        isActive && "z-10 ring-2 ring-zen-ring ring-offset-2",
        className,
      )}
      {...props}
    >
      {char}
      {hasFakeCaret && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="h-4 w-px animate-pulse bg-zen-foreground" />
        </div>
      )}
    </div>
  );
});
InputOTPSlot.displayName = "InputOTPSlot";

const InputOTPSeparator = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<"div">
>(({ ...props }, ref) => (
  <div ref={ref} role="separator" {...props}>
    <DashIcon />
  </div>
));
InputOTPSeparator.displayName = "InputOTPSeparator";

const DashIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
    <line x1="6" y1="12" x2="18" y2="12" />
  </svg>
);

export { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator };
