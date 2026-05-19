import type { JSX, ParentProps } from "solid-js";

/**
 * Tiny shared shells used by NewXxxDemo.tsx pages. Mirrors the structure
 * of packages/react/src/components/demo-helpers.tsx without trying to
 * be feature-complete.
 */

export const DemoPage = (
  props: ParentProps<{ title: string; description?: string }>,
) => (
  <div>
    <header class="mb-6">
      <h1 class="text-2xl font-semibold m-0">{props.title}</h1>
      {props.description ? (
        <p class="text-zen-muted-fg mt-1 max-w-2xl">{props.description}</p>
      ) : null}
    </header>
    <div class="flex flex-col gap-8">{props.children}</div>
  </div>
);

export const DemoSection = (
  props: ParentProps<{ title: string; description?: string }>,
) => (
  <section>
    <div class="text-xs uppercase tracking-wide text-zen-muted-fg mb-1">
      {props.title}
    </div>
    {props.description ? (
      <div class="text-sm text-zen-muted-fg mb-3 max-w-2xl">
        {props.description}
      </div>
    ) : null}
    <div class="flex flex-wrap gap-3 items-center">{props.children}</div>
  </section>
);

export const Row = (props: { children: JSX.Element }) => (
  <div class="flex flex-wrap gap-3 items-center">{props.children}</div>
);
