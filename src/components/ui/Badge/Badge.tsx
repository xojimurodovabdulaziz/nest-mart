import type { ReactNode } from "react";
import "./Badge.css";

type Tone = "discount" | "sale" | "new" | "hot" | "neutral";

interface Props {
  tone?: Tone;
  position?: "left" | "right";
  children: ReactNode;
}

/**
 * Small pill label used for product tags (Sale / New / Hot / discount %).
 * Positioning is left to the parent (absolute inside a position:relative
 * card) via the `position` prop, which only toggles left/right offset.
 */
const Badge = ({ tone = "neutral", position = "right", children }: Props) => (
  <span className={`badge badge-${tone} badge-${position}`}>{children}</span>
);

export default Badge;
