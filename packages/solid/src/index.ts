// ============================================================================
// @algorisys/zen-ui-solid — public exports
// ============================================================================
// Side-effect CSS imports. Tokens must load before any UnoCSS utility
// (bg-zen-*, text-zen-*, …) is evaluated, otherwise those classes
// resolve to var(--zen-color-…) → empty.
import "@algorisys/zen-ui-core/tokens.css";
import "@algorisys/zen-ui-core/preflight.css";
import "virtual:uno.css";

// Theming
export { useTheme, applyTheme, getInitialTheme, THEMES } from "./lib/theme";
export type { ThemeName, ThemeDescriptor } from "./lib/theme";

// Utility
export { cn } from "./lib/cn";
export type { PolymorphicProps } from "./lib/polymorphic";

// ---------------------------------------------------------------------------
// Tier 1 — zero-dep primitives
// ---------------------------------------------------------------------------

export { Button, buttonVariants } from "./components/button/button";
export type { ButtonProps } from "./components/button/button";

export { Badge, badgeVariants } from "./components/badge/badge";
export type { BadgeProps } from "./components/badge/badge";

export {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  cardVariants,
} from "./components/card/card";
export type { CardProps } from "./components/card/card";

export { Skeleton } from "./components/skeleton/skeleton";
export type { SkeletonProps } from "./components/skeleton/skeleton";

export { Loading, spinnerVariants } from "./components/loading/loading";
export type { LoadingProps } from "./components/loading/loading";

export { FAB } from "./components/fab/fab";
export type { FABProps } from "./components/fab/fab";

export { Separator } from "./components/divider/divider";
export type { SeparatorProps } from "./components/divider/divider";

export {
  Alert,
  AlertIcon,
  AlertContent,
  AlertTitle,
  AlertDescription,
  AlertActions,
  AlertClose,
  alertVariants,
} from "./components/alert/alert";
export type { AlertProps, AlertCloseProps } from "./components/alert/alert";

export {
  Banner,
  BannerIcon,
  BannerContent,
  BannerTitle,
  BannerDescription,
  BannerActions,
  BannerClose,
  bannerVariants,
} from "./components/banner/banner";
export type { BannerProps, BannerCloseProps } from "./components/banner/banner";

export {
  EmptyState,
  EmptyStateIcon,
  EmptyStateTitle,
  EmptyStateDescription,
  EmptyStateActions,
  emptyStateVariants,
} from "./components/empty-state/empty-state";
export type { EmptyStateProps } from "./components/empty-state/empty-state";

export {
  Stepper,
  StepperList,
  StepperPanel,
  StepperNavigation,
  useStepper,
} from "./components/stepper/stepper";
export type {
  StepperProps,
  StepperListProps,
  StepperPanelProps,
  StepperNavigationProps,
  StepperStep,
  StepStatus,
} from "./components/stepper/stepper";

export { Rating } from "./components/survey/rating";
export type { RatingProps } from "./components/survey/rating";

export { NPS } from "./components/survey/nps";
export type { NPSProps } from "./components/survey/nps";

export { Likert } from "./components/survey/likert";
export type { LikertProps, LikertOption } from "./components/survey/likert";
