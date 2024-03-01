import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { MinusIcon, PlusIcon } from "lucide-react";

export interface NumberInputStepperStyles {
  root: React.CSSProperties;
  stepButton: React.CSSProperties;
  valueText: React.CSSProperties;
}

export interface NumberInputStepperClassNames {
  root: string;
  stepButton: string;
  valueText: string;
}

export interface NumberInputStepperProps {
  onChange?: (value: number) => unknown;
  value?: number;
  step?: {
    increment: number;
    decrement: number;
  };
  name?: string;
  label?: string;
  isRequired?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  styles?: Partial<NumberInputStepperStyles>;
  classNames?: Partial<NumberInputStepperClassNames>;
}

export function NumberInputStepper({
  value = 0,
  onChange,
  step = { increment: 1, decrement: 1 },
  disabled,
  readOnly,
  classNames,
  styles,
}: NumberInputStepperProps): React.JSX.Element {
  return (
    <div
      className={cn(
        "lf-h-10 lf-flex lf-items-center lf-gap-4",
        Boolean(disabled || readOnly) && "lf-opacity-50",
        disabled && "lf-cursor-not-allowed",
        classNames?.root,
      )}
      style={styles?.root}
    >
      <Button
        variant="outline"
        className={cn(
          "lf-h-7 lf-w-7 lf-bg-transparent lf-p-0 lf-opacity-50 hover:lf-opacity-100",
          classNames?.stepButton,
        )}
        onClick={() =>
          onChange && onChange((value ?? 0) - (step?.decrement ?? 1))
        }
        disabled={disabled || readOnly}
        type="button"
        style={styles?.stepButton}
      >
        <MinusIcon className="lf-h-4 lf-w-4" />
      </Button>
      <p
        className={cn("lf-text-sm", classNames?.valueText)}
        style={styles?.valueText}
      >
        {value}
      </p>
      <Button
        variant="outline"
        className={cn(
          "lf-h-7 w-7 lf-bg-transparent lf-p-0 lf-opacity-50 hover:lf-opacity-100",
          classNames?.stepButton,
        )}
        onClick={() =>
          onChange && onChange((value ?? 0) + (step?.increment ?? 1))
        }
        disabled={disabled || readOnly}
        type="button"
        style={styles?.stepButton}
      >
        <PlusIcon className="lf-h-4 lf-w-4" />
      </Button>
    </div>
  );
}
