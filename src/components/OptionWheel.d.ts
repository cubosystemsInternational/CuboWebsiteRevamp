// Ambient types for the vendored OptionWheel.jsx (React Bits registry —
// plain JS by design, kept unmodified). Mirrors its actual prop list and
// the imperative handle added for external (panel-arrow) sync.
import type { ForwardRefExoticComponent, RefAttributes } from 'react';

export type OptionWheelHandle = {
  select: (index: number) => void;
};

export type OptionWheelProps = {
  items?: string[];
  defaultSelected?: number;
  onChange?: (index: number, item: string) => void;
  textColor?: string;
  activeColor?: string;
  side?: 'left' | 'right';
  fontSize?: number;
  spacing?: number;
  curve?: number;
  tilt?: number;
  blur?: number;
  fade?: number;
  minOpacity?: number;
  smoothing?: number;
  inset?: number;
  loop?: boolean;
  draggable?: boolean;
  soundUrl?: string;
  soundVolume?: number;
  className?: string;
};

declare const OptionWheel: ForwardRefExoticComponent<OptionWheelProps & RefAttributes<OptionWheelHandle>>;

export default OptionWheel;
