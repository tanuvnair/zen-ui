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
          "z-50 min-w-32 overflow-hidden rounded-zen-md border bg-zen-background p-1 text-zen-foreground shadow-md",
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
        "flex cursor-default items-center gap-2 select-none rounded-zen-sm px-2 py-1.5 text-sm outline-none",
        "data-[expanded]:bg-zen-muted data-[highlighted]:bg-zen-muted",
        local.inset && "pl-8",
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
          "z-50 min-w-32 overflow-hidden rounded-zen-md border bg-zen-background p-1 text-zen-foreground shadow-md",
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
        "relative flex cursor-default select-none items-center gap-2 rounded-zen-sm px-2 py-1.5 text-sm outline-none",
        "data-[highlighted]:bg-zen-muted",
        "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        local.variant === "destructive" &&
          "text-zen-error data-[highlighted]:bg-zen-error-soft data-[highlighted]:text-zen-error-soft-fg",
        local.inset && "pl-8",
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
        "relative flex cursor-default select-none items-center rounded-zen-sm py-1.5 pl-8 pr-2 text-sm outline-none",
        "data-[highlighted]:bg-zen-muted",
        "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        local.class,
      )}
    >
      <span class="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
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
        "relative flex cursor-default select-none items-center rounded-zen-sm py-1.5 pl-8 pr-2 text-sm outline-none",
        "data-[highlighted]:bg-zen-muted",
        "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        local.class,
      )}
    >
      <span class="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
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
        "px-2 py-1.5 text-xs font-semibold text-zen-muted-fg",
        local.inset && "pl-8",
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
      class={cn("-mx-1 my-1 h-px bg-zen-border", local.class)}
    />
  );
};

export const DropdownMenuShortcut = (props: CommonProps) => {
  const [local] = splitProps(props, ["class", "children"]);
  return (
    <span class={cn("ml-auto text-xs tracking-widest text-zen-muted-fg", local.class)}>
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
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="ml-auto">
    <polyline points="9 18 15 12 9 6" />
  </svg>
);
