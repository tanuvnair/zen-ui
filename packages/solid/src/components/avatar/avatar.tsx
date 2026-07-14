import { type JSX, children, createMemo, splitProps, For, Show } from "solid-js";
import { Image as KImage } from "@kobalte/core/image";
import { cn } from "../../lib/cn";

/**
 * Avatar — Solid port. Built on Kobalte's `Image` primitive (the
 * Solid-side equivalent of Radix Avatar — same data-loading-status
 * semantics, just named differently).
 *
 *   <Avatar>
 *     <AvatarImage src="…" alt="…" />
 *     <AvatarFallback>AB</AvatarFallback>
 *   </Avatar>
 *
 * The fallback renders automatically while the image is loading or
 * failed (Kobalte sets `data-loading-status="idle|loading|loaded|error"`).
 *
 * For grouped / stacked avatars use <AvatarGroup>.
 */

export type AvatarSize = "xs" | "sm" | "md" | "lg" | "xl";

const SIZES: Record<AvatarSize, string> = {
  xs: "zen-h-6 zen-w-6 zen-text-xs",
  sm: "zen-h-8 zen-w-8 zen-text-xs",
  md: "zen-h-10 zen-w-10 zen-text-sm",
  lg: "zen-h-12 zen-w-12 zen-text-base",
  xl: "zen-h-16 zen-w-16 zen-text-lg",
};

export type AvatarProps = {
  size?: AvatarSize;
  class?: string;
  children?: JSX.Element;
  /** Delay (ms) before showing the fallback. Useful to avoid a flash
   *  on fast networks while the <img> resolves. */
  fallbackDelay?: number;
};

export const Avatar = (props: AvatarProps) => {
  const [local] = splitProps(props, ["class", "size", "children", "fallbackDelay"]);
  return (
    <KImage
      fallbackDelay={local.fallbackDelay}
      class={cn(
        "zen-relative zen-inline-flex zen-shrink-0 zen-overflow-hidden zen-rounded-zen-full",
        SIZES[local.size ?? "md"],
        local.class,
      )}
    >
      {local.children}
    </KImage>
  );
};

export type AvatarImageProps = {
  src?: string;
  alt?: string;
  class?: string;
};

export const AvatarImage = (props: AvatarImageProps) => {
  const [local] = splitProps(props, ["class", "src", "alt"]);
  return (
    <KImage.Img
      src={local.src}
      alt={local.alt}
      class={cn("zen-aspect-square zen-h-full zen-w-full zen-object-cover", local.class)}
    />
  );
};

export type AvatarFallbackProps = {
  class?: string;
  children?: JSX.Element;
};

export const AvatarFallback = (props: AvatarFallbackProps) => {
  const [local] = splitProps(props, ["class", "children"]);
  return (
    <KImage.Fallback
      class={cn(
        "zen-flex zen-h-full zen-w-full zen-items-center zen-justify-center zen-bg-zen-muted zen-text-zen-muted-fg zen-font-medium",
        local.class,
      )}
    >
      {local.children}
    </KImage.Fallback>
  );
};

/* --------------------------------- AvatarGroup ------------------------- */

export type AvatarGroupProps = {
  /** Maximum number of avatars to show. Excess collapses to "+N". */
  max?: number;
  /** Spacing between stacked avatars (negative left margin on children). */
  spacing?: "tight" | "default" | "loose";
  size?: AvatarSize;
  class?: string;
  children?: JSX.Element;
};

const SPACING: Record<NonNullable<AvatarGroupProps["spacing"]>, string> = {
  tight: "-ml-3",
  default: "-ml-2",
  loose: "-ml-1",
};

export const AvatarGroup = (props: AvatarGroupProps) => {
  const [local] = splitProps(props, ["class", "max", "spacing", "size", "children"]);
  const resolved = children(() => local.children);
  // children() returns an Accessor; toArray() coerces multi-child or single.
  const childArray = createMemo(() => {
    const c = resolved();
    return Array.isArray(c) ? c : c == null ? [] : [c];
  });
  const visible = createMemo(() =>
    typeof local.max === "number" ? childArray().slice(0, local.max) : childArray(),
  );
  const overflow = createMemo(() =>
    typeof local.max === "number" && childArray().length > local.max
      ? childArray().length - local.max
      : 0,
  );
  const spacing = () => SPACING[local.spacing ?? "default"];

  return (
    <div class={cn("zen-flex zen-items-center", local.class)}>
      <For each={visible()}>
        {(child, i) => (
          <div
            class={cn(
              "zen-ring-2 zen-ring-zen-background zen-rounded-zen-full",
              i() > 0 && spacing(),
            )}
          >
            {child as JSX.Element}
          </div>
        )}
      </For>
      <Show when={overflow() > 0}>
        <div class={cn("zen-ring-2 zen-ring-zen-background zen-rounded-zen-full", spacing())}>
          <Avatar size={local.size ?? "md"}>
            <AvatarFallback>+{overflow()}</AvatarFallback>
          </Avatar>
        </div>
      </Show>
    </div>
  );
};
