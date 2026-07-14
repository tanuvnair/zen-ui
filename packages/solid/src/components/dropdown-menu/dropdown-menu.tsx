import { type JSX, splitProps } from "solid-js";
import { DropdownMenu as KDropdown } from "@kobalte/core/dropdown-menu";
import { cn } from "../../lib/cn";

/**
 * DropdownMenu — Solid port built on Kobalte DropdownMenu.
 *
 * Action-menu primitive (kebab menus, user menus, context-style menus).
 * NOT a form-input replacement — for that use <Select>.
 *
 *   <DropdownMenu>
 *     <DropdownMenuTrigger as={Button}>Options</DropdownMenuTrigger>
 *     <DropdownMenuContent>
 *       <DropdownMenuLabel>My account</DropdownMenuLabel>
 *       <DropdownMenuSeparator />
 *       <DropdownMenuItem onSelect={…}>Profile</DropdownMenuItem>
 *       <DropdownMenuItem variant="destructive" onSelect={signOut}>Sign out</DropdownMenuItem>
 *
 *       <DropdownMenuCheckboxItem checked={x()} onChange={setX}>Show toolbar</DropdownMenuCheckboxItem>
 *
 *       <DropdownMenuRadioGroup value={r()} onChange={setR}>
 *         <DropdownMenuRadioItem value="a">Option A</DropdownMenuRadioItem>
 *         <DropdownMenuRadioItem value="b">Option B</DropdownMenuRadioItem>
 *       </DropdownMenuRadioGroup>
 *
 *       <DropdownMenuSub>
 *         <DropdownMenuSubTrigger>More</DropdownMenuSubTrigger>
 *         <DropdownMenuSubContent>…</DropdownMenuSubContent>
 *       </DropdownMenuSub>
 *     </DropdownMenuContent>
 *   </DropdownMenu>
 */

export const DropdownMenu = KDropdown;
export const DropdownMenuTrigger = KDropdown.Trigger;
export const DropdownMenuGroup = KDropdown.Group;
export const DropdownMenuPortal = KDropdown.Portal;
export const DropdownMenuSub = KDropdown.Sub;
export const DropdownMenuRadioGroup = KDropdown.RadioGroup;

type CommonProps = {
  class?: string;
  children?: JSX.Element;
};

export const DropdownMenuContent = (props: CommonProps) => {
  const [local] = splitProps(props, ["class", "children"]);
  return (
    <KDropdown.Portal>
      <KDropdown.Content
        class={cn(
          "zen-z-50 zen-min-w-32 zen-overflow-hidden zen-rounded-zen-md zen-border zen-bg-zen-background zen-p-1 zen-text-zen-foreground zen-shadow-md",
          local.class,
        )}
      >
        {local.children}
      </KDropdown.Content>
    </KDropdown.Portal>
  );
};

export const DropdownMenuSubTrigger = (props: CommonProps & { inset?: boolean }) => {
  const [local] = splitProps(props, ["class", "inset", "children"]);
  return (
    <KDropdown.SubTrigger
      class={cn(
        "zen-flex zen-cursor-default zen-items-center zen-gap-2 zen-select-none zen-rounded-zen-sm zen-px-2 zen-py-1.5 zen-text-sm zen-outline-none",
        "data-[expanded]:zen-bg-zen-muted data-[highlighted]:zen-bg-zen-muted",
        local.inset && "zen-pl-8",
        local.class,
      )}
    >
      {local.children}
      <ChevronRightIcon />
    </KDropdown.SubTrigger>
  );
};

export const DropdownMenuSubContent = (props: CommonProps) => {
  const [local] = splitProps(props, ["class", "children"]);
  return (
    <KDropdown.Portal>
      <KDropdown.SubContent
        class={cn(
          "zen-z-50 zen-min-w-32 zen-overflow-hidden zen-rounded-zen-md zen-border zen-bg-zen-background zen-p-1 zen-text-zen-foreground zen-shadow-md",
          local.class,
        )}
      >
        {local.children}
      </KDropdown.SubContent>
    </KDropdown.Portal>
  );
};

export type DropdownMenuItemProps = CommonProps & {
  inset?: boolean;
  variant?: "default" | "destructive";
  disabled?: boolean;
  onSelect?: () => void;
};

export const DropdownMenuItem = (props: DropdownMenuItemProps) => {
  const [local] = splitProps(props, [
    "class",
    "inset",
    "variant",
    "disabled",
    "onSelect",
    "children",
  ]);
  return (
    <KDropdown.Item
      disabled={local.disabled}
      onSelect={local.onSelect}
      class={cn(
        "zen-relative zen-flex zen-cursor-default zen-select-none zen-items-center zen-gap-2 zen-rounded-zen-sm zen-px-2 zen-py-1.5 zen-text-sm zen-outline-none",
        "data-[highlighted]:zen-bg-zen-muted",
        "data-[disabled]:zen-pointer-events-none data-[disabled]:zen-opacity-50",
        local.variant === "destructive" &&
          "zen-text-zen-error data-[highlighted]:zen-bg-zen-error-soft data-[highlighted]:zen-text-zen-error-soft-fg",
        local.inset && "zen-pl-8",
        local.class,
      )}
    >
      {local.children}
    </KDropdown.Item>
  );
};

export type DropdownMenuCheckboxItemProps = CommonProps & {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
};

export const DropdownMenuCheckboxItem = (props: DropdownMenuCheckboxItemProps) => {
  const [local] = splitProps(props, ["class", "checked", "onChange", "disabled", "children"]);
  return (
    <KDropdown.CheckboxItem
      checked={local.checked}
      onChange={local.onChange}
      disabled={local.disabled}
      class={cn(
        "zen-relative zen-flex zen-cursor-default zen-select-none zen-items-center zen-rounded-zen-sm zen-py-1.5 zen-pl-8 zen-pr-2 zen-text-sm zen-outline-none",
        "data-[highlighted]:zen-bg-zen-muted",
        "data-[disabled]:zen-pointer-events-none data-[disabled]:zen-opacity-50",
        local.class,
      )}
    >
      <span class="zen-absolute zen-left-2 zen-flex zen-h-3.5 zen-w-3.5 zen-items-center zen-justify-center">
        <KDropdown.ItemIndicator>
          <CheckIcon />
        </KDropdown.ItemIndicator>
      </span>
      {local.children}
    </KDropdown.CheckboxItem>
  );
};

export type DropdownMenuRadioItemProps = CommonProps & {
  value: string;
  disabled?: boolean;
};

export const DropdownMenuRadioItem = (props: DropdownMenuRadioItemProps) => {
  const [local] = splitProps(props, ["class", "value", "disabled", "children"]);
  return (
    <KDropdown.RadioItem
      value={local.value}
      disabled={local.disabled}
      class={cn(
        "zen-relative zen-flex zen-cursor-default zen-select-none zen-items-center zen-rounded-zen-sm zen-py-1.5 zen-pl-8 zen-pr-2 zen-text-sm zen-outline-none",
        "data-[highlighted]:zen-bg-zen-muted",
        "data-[disabled]:zen-pointer-events-none data-[disabled]:zen-opacity-50",
        local.class,
      )}
    >
      <span class="zen-absolute zen-left-2 zen-flex zen-h-3.5 zen-w-3.5 zen-items-center zen-justify-center">
        <KDropdown.ItemIndicator>
          <DotIcon />
        </KDropdown.ItemIndicator>
      </span>
      {local.children}
    </KDropdown.RadioItem>
  );
};

export const DropdownMenuLabel = (props: CommonProps & { inset?: boolean }) => {
  const [local] = splitProps(props, ["class", "inset", "children"]);
  return (
    <KDropdown.GroupLabel
      class={cn(
        "zen-px-2 zen-py-1.5 zen-text-xs zen-font-semibold zen-text-zen-muted-fg",
        local.inset && "zen-pl-8",
        local.class,
      )}
    >
      {local.children}
    </KDropdown.GroupLabel>
  );
};

export const DropdownMenuSeparator = (props: { class?: string }) => {
  const [local] = splitProps(props, ["class"]);
  return (
    <KDropdown.Separator
      class={cn("-zen-mx-1 zen-my-1 zen-h-px zen-bg-zen-border", local.class)}
    />
  );
};

export const DropdownMenuShortcut = (props: CommonProps) => {
  const [local] = splitProps(props, ["class", "children"]);
  return (
    <span class={cn("zen-ml-auto zen-text-xs zen-tracking-widest zen-text-zen-muted-fg", local.class)}>
      {local.children}
    </span>
  );
};

const CheckIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);
const DotIcon = () => (
  <svg width="8" height="8" viewBox="0 0 24 24" fill="currentColor">
    <circle cx="12" cy="12" r="6" />
  </svg>
);
const ChevronRightIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="zen-ml-auto">
    <polyline points="9 18 15 12 9 6" />
  </svg>
);
