import * as React from "react";
import type { ToastProps } from "./toast";

/**
 * useToast — imperative toast API on top of the compound Toast primitives.
 *
 *   const { toast } = useToast();
 *   toast({ title: "Saved", description: "Profile updated." });
 *   toast({ variant: "destructive", title: "Couldn't save", description: err.message });
 *
 * Pair with <Toaster /> from ./toaster.tsx mounted once near the root.
 *
 * Subscribe pattern (module-scoped store) — adapted from the shadcn
 * reference impl. Multiple useToast() consumers stay in sync via the
 * shared listener list.
 */

export interface ToastDescriptor {
  id: string;
  title?: React.ReactNode;
  description?: React.ReactNode;
  action?: React.ReactNode;
  variant?: ToastProps["variant"];
  /** Time before auto-dismiss, ms. Default 5_000. Pass `Infinity` for sticky. */
  duration?: number;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

type Action =
  | { type: "ADD"; toast: ToastDescriptor }
  | { type: "UPDATE"; toast: Partial<ToastDescriptor> & { id: string } }
  | { type: "DISMISS"; id?: string }
  | { type: "REMOVE"; id?: string };

interface State { toasts: ToastDescriptor[] }

const MAX_TOASTS = 5;
const REMOVE_DELAY_MS = 1_000;

let state: State = { toasts: [] };
const listeners: Array<(s: State) => void> = [];

const removeTimeouts = new Map<string, ReturnType<typeof setTimeout>>();

function setState(next: State) {
  state = next;
  listeners.forEach((l) => l(state));
}

function queueRemove(id: string) {
  if (removeTimeouts.has(id)) return;
  const t = setTimeout(() => {
    removeTimeouts.delete(id);
    setState({
      ...state,
      toasts: state.toasts.filter((t) => t.id !== id),
    });
  }, REMOVE_DELAY_MS);
  removeTimeouts.set(id, t);
}

function reducer(action: Action) {
  switch (action.type) {
    case "ADD":
      setState({
        ...state,
        toasts: [action.toast, ...state.toasts].slice(0, MAX_TOASTS),
      });
      break;
    case "UPDATE":
      setState({
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === action.toast.id ? { ...t, ...action.toast } : t,
        ),
      });
      break;
    case "DISMISS": {
      const { id } = action;
      if (id) {
        queueRemove(id);
      } else {
        state.toasts.forEach((t) => queueRemove(t.id));
      }
      setState({
        ...state,
        toasts: state.toasts.map((t) =>
          id === undefined || t.id === id ? { ...t, open: false } : t,
        ),
      });
      break;
    }
    case "REMOVE":
      if (action.id === undefined) {
        setState({ ...state, toasts: [] });
      } else {
        setState({
          ...state,
          toasts: state.toasts.filter((t) => t.id !== action.id),
        });
      }
      break;
  }
}

let counter = 0;
const nextId = () => {
  counter = (counter + 1) % Number.MAX_SAFE_INTEGER;
  return String(counter);
};

export interface ToastInput {
  title?: React.ReactNode;
  description?: React.ReactNode;
  action?: React.ReactNode;
  variant?: ToastProps["variant"];
  duration?: number;
}

export function toast(input: ToastInput) {
  const id = nextId();
  const update = (next: ToastInput) =>
    reducer({ type: "UPDATE", toast: { ...next, id } });
  const dismiss = () => reducer({ type: "DISMISS", id });

  reducer({
    type: "ADD",
    toast: {
      ...input,
      id,
      open: true,
      onOpenChange: (open) => {
        if (!open) dismiss();
      },
    },
  });

  return { id, update, dismiss };
}

export function useToast() {
  const [snapshot, setSnapshot] = React.useState<State>(state);

  React.useEffect(() => {
    listeners.push(setSnapshot);
    return () => {
      const idx = listeners.indexOf(setSnapshot);
      if (idx >= 0) listeners.splice(idx, 1);
    };
  }, []);

  return {
    toasts: snapshot.toasts,
    toast,
    dismiss: (id?: string) => reducer({ type: "DISMISS", id }),
  };
}
