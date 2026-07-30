import { forwardRef, type ButtonHTMLAttributes } from "react";
import "./Button.css";

type Variant = "primary" | "secondary" | "ghost" | "danger" | "outline";
type Size = "sm" | "md" | "lg";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  fullWidth?: boolean;
  isLoading?: boolean;
}

/**
 * Base button primitive used across the app. Keep feature-specific
 * behavior (cart actions, form submits, etc.) in the caller — this
 * component only owns visual variants, sizing, and the loading state.
 */
const Button = forwardRef<HTMLButtonElement, Props>(
  (
    {
      variant = "primary",
      size = "md",
      fullWidth = false,
      isLoading = false,
      disabled,
      className = "",
      children,
      ...rest
    },
    ref
  ) => {
    const classes = [
      "btn",
      `btn-${variant}`,
      `btn-${size}`,
      fullWidth ? "btn-full" : "",
      isLoading ? "btn-loading" : "",
      className,
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <button
        ref={ref}
        className={classes}
        disabled={disabled || isLoading}
        aria-busy={isLoading || undefined}
        {...rest}
      >
        {isLoading && <span className="btn-spinner" aria-hidden="true" />}
        <span className="btn-content">{children}</span>
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
