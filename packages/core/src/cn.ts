import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";
import { ZEN_PREFIX } from "./uno-preset";

/**
 * tailwind-merge has to understand the `zen-` utility prefix, or it stops
 * recognising our classes as conflicting groups: `cn("zen-p-4", "zen-p-8")`
 * would emit BOTH and the winner would fall to stylesheet order instead of the
 * caller's override — silently breaking the `className` prop on every component.
 *
 * Note we do NOT use `extendTailwindMerge({ prefix })`. That option follows
 * Tailwind v4 prefix semantics, where a prefix is a leading variant (`zen:p-4`).
 * UnoCSS emits the v3 form (`zen-p-4`), so the built-in option silently fails to
 * match and every override breaks. Instead we strip the prefix off the parsed
 * base class: tailwind-merge groups on `p-4` while still returning the original
 * `zen-p-4` string. Classes that are not ours (a consumer's own `p-4`, or demo
 * classes like `sidebar`) fall through the regex untouched.
 *
 * ZEN_PREFIX is shared with uno.config.ts so the generator and the merger cannot
 * drift apart.
 */
const basePattern = new RegExp(`^(-?)${ZEN_PREFIX}(.*)$`);

const twMerge = extendTailwindMerge({
  experimentalParseClassName({ className, parseClassName }) {
    const parsed = parseClassName(className);
    const m = basePattern.exec(parsed.baseClassName);
    return m ? { ...parsed, baseClassName: `${m[1]}${m[2]}` } : parsed;
  },
});

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
