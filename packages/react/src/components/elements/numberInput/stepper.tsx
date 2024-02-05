import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { MinusIcon, PlusIcon } from "@radix-ui/react-icons";

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
}

export function NumberInputStepper({
  value = 0,
  onChange,
  step = { increment: 1, decrement: 1 },
  disabled,
  readOnly,
}: NumberInputStepperProps): React.JSX.Element {
  return (
    <div
      className={cn(
        "h-10 flex items-center gap-4",
        Boolean(disabled || readOnly) && "opacity-50",
        disabled && "cursor-not-allowed",
      )}
    >
      <Button
        variant="outline"
        className="h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100"
        onClick={() =>
          onChange && onChange((value ?? 0) - (step?.decrement ?? 1))
        }
        disabled={disabled || readOnly}
        type="button"
      >
        <MinusIcon className="h-4 w-4" />
      </Button>
      <p className="text-sm">{value}</p>
      <Button
        variant="outline"
        className="h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100"
        onClick={() =>
          onChange && onChange((value ?? 0) + (step?.increment ?? 1))
        }
        disabled={disabled || readOnly}
        type="button"
      >
        <PlusIcon className="h-4 w-4" />
      </Button>
    </div>
  );
}
