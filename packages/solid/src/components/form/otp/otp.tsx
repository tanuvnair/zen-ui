import { type JSX, Show, createMemo, splitProps } from "solid-js";
import OtpField from "@corvu/otp-field";
import { cn } from "../../../lib/cn";

/**
 * InputOTP — Solid port. Built on @corvu/otp-field (the Solid analogue
 * of input-otp that the React side uses).
 *
 *   <InputOTP maxLength={6} value={v()} onChange={setV}>
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
 * @corvu/otp-field handles paste, keyboard nav, autocomplete (OTP
 * one-time-code), mobile keyboard hints. We just style.
 */

export type InputOTPProps = {
  maxLength: number;
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
  class?: string;
  containerClass?: string;
  children?: JSX.Element;
};

export const InputOTP = (props: InputOTPProps) => {
  const [local] = splitProps(props, [
    "maxLength",
    "value",
    "defaultValue",
    "onChange",
    "disabled",
    "class",
    "containerClass",
    "children",
  ]);
  return (
    <OtpField
      maxLength={local.maxLength}
      value={local.value}
      onValueChange={local.onChange}
      class={cn(
        "flex items-center gap-2",
        local.disabled && "opacity-50",
        local.containerClass,
      )}
    >
      <OtpField.Input
        disabled={local.disabled}
        class={cn("disabled:cursor-not-allowed", local.class)}
      />
      {local.children}
    </OtpField>
  );
};

export const InputOTPGroup = (props: { class?: string; children?: JSX.Element }) => {
  const [local] = splitProps(props, ["class", "children"]);
  return <div class={cn("flex items-center", local.class)}>{local.children}</div>;
};

export const InputOTPSlot = (props: { index: number; class?: string }) => {
  const [local] = splitProps(props, ["index", "class"]);
  const ctx = OtpField.useContext();
  const char = createMemo(() => ctx.value()[local.index] ?? "");
  const isActive = createMemo(() => ctx.activeSlots().includes(local.index));
  const showCaret = createMemo(
    () => isActive() && ctx.isInserting() && !char(),
  );
  return (
    <div
      class={cn(
        "relative flex h-10 w-10 items-center justify-center border-y border-r border-zen-border text-sm",
        "first:rounded-l-zen-md first:border-l last:rounded-r-zen-md",
        "transition-all",
        isActive() && "z-10 ring-2 ring-zen-ring ring-offset-2",
        local.class,
      )}
    >
      {char()}
      <Show when={showCaret()}>
        <div class="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div class="h-4 w-px animate-pulse bg-zen-foreground" />
        </div>
      </Show>
    </div>
  );
};

export const InputOTPSeparator = (props: { class?: string }) => {
  const [local] = splitProps(props, ["class"]);
  return (
    <div role="separator" class={local.class}>
      <DashIcon />
    </div>
  );
};

const DashIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden>
    <line x1="6" y1="12" x2="18" y2="12" />
  </svg>
);
