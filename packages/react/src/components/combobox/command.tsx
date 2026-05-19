import * as React from "react";
import { Command as CommandPrimitive } from "cmdk";
import { cn } from "../../lib/cn";

/**
 * Command primitives — styled wrappers around `cmdk`. Headless command-
 * palette / autocomplete engine: built-in fuzzy filtering, keyboard nav
 * (arrow keys, home/end, enter), accessibility. Used by Combobox below.
 *
 *   <Command>
 *     <CommandInput placeholder="Search…" />
 *     <CommandList>
 *       <CommandEmpty>No results.</CommandEmpty>
 *       <CommandGroup heading="Recent">
 *         <CommandItem onSelect={…}>Foo</CommandItem>
 *       </CommandGroup>
 *     </CommandList>
 *   </Command>
 */

const Command = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive>
>(({ className, ...props }, ref) => (
  <CommandPrimitive
    ref={ref}
    className={cn(
      "flex h-full w-full flex-col overflow-hidden rounded-zen-md bg-zen-background text-zen-foreground",
      className,
    )}
    {...props}
  />
));
Command.displayName = "Command";

const CommandInput = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Input>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Input>
>(({ className, ...props }, ref) => (
  <div
    className="flex items-center border-b border-zen-border px-3"
    cmdk-input-wrapper=""
  >
    <SearchIcon />
    <CommandPrimitive.Input
      ref={ref}
      className={cn(
        "flex h-10 w-full bg-transparent py-3 text-sm outline-none",
        "placeholder:text-zen-muted-fg",
        "disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    />
  </div>
));
CommandInput.displayName = CommandPrimitive.Input.displayName;

const CommandList = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.List>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.List
    ref={ref}
    className={cn("max-h-72 overflow-y-auto overflow-x-hidden", className)}
    {...props}
  />
));
CommandList.displayName = CommandPrimitive.List.displayName;

const CommandEmpty = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Empty>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Empty>
>((props, ref) => (
  <CommandPrimitive.Empty
    ref={ref}
    className="py-6 text-center text-sm text-zen-muted-fg"
    {...props}
  />
));
CommandEmpty.displayName = CommandPrimitive.Empty.displayName;

const CommandLoading = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Loading>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Loading>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Loading
    ref={ref}
    className={cn("py-4 text-center text-sm text-zen-muted-fg", className)}
    {...props}
  />
));
CommandLoading.displayName = CommandPrimitive.Loading.displayName;

const CommandGroup = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Group>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Group>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Group
    ref={ref}
    className={cn(
      "overflow-hidden p-1 text-zen-foreground",
      "[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-semibold [&_[cmdk-group-heading]]:text-zen-muted-fg",
      className,
    )}
    {...props}
  />
));
CommandGroup.displayName = CommandPrimitive.Group.displayName;

const CommandSeparator = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Separator
    ref={ref}
    className={cn("-mx-1 my-1 h-px bg-zen-border", className)}
    {...props}
  />
));
CommandSeparator.displayName = CommandPrimitive.Separator.displayName;

const CommandItem = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Item>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Item
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center gap-2 rounded-zen-sm px-2 py-1.5 text-sm outline-none",
      "data-[selected=true]:bg-zen-muted",
      "data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50",
      className,
    )}
    {...props}
  />
));
CommandItem.displayName = CommandPrimitive.Item.displayName;

const SearchIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 shrink-0 opacity-50" aria-hidden>
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

export {
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandLoading,
  CommandGroup,
  CommandItem,
  CommandSeparator,
};
