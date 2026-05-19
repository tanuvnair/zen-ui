import * as React from "react";
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "./toast";
import { useToast } from "./use-toast";

/**
 * Toaster — mount once near the root of the app. Reads from the
 * module-scoped toast store (see ./use-toast.tsx) and renders every
 * open toast.
 *
 *   // app.tsx
 *   <App>
 *     <Routes>...</Routes>
 *     <Toaster />
 *   </App>
 *
 *   // anywhere in the tree
 *   import { toast } from "@algorisys/zen-ui-react";
 *   toast({ title: "Saved" });
 */

const Toaster: React.FC = () => {
  const { toasts } = useToast();
  return (
    <ToastProvider>
      {toasts.map(({ id, title, description, action, ...props }) => (
        <Toast key={id} {...props}>
          <div style={{ display: "grid", gap: 4, flex: 1, minWidth: 0 }}>
            {title ? <ToastTitle>{title}</ToastTitle> : null}
            {description ? (
              <ToastDescription>{description}</ToastDescription>
            ) : null}
          </div>
          {action}
          <ToastClose />
        </Toast>
      ))}
      <ToastViewport />
    </ToastProvider>
  );
};

export { Toaster };
