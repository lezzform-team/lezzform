import { Button } from "@/components/ui/button";
import { useOnMountUnsafe } from "@/lib/use-on-mount-unsafe";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";
import {
  ArrayPath,
  FieldArray,
  FieldValues,
  UseFieldArrayReturn,
  useFieldArray,
  useFormContext,
} from "react-hook-form";

export interface RepeaterGroupWrapperStyles {
  root: React.CSSProperties;
  insertButton: React.CSSProperties;
}

export interface RepeaterGroupWrapperClassNames {
  root: string;
  insertButton: string;
}

export interface RepeaterGroupWrapperProps<T extends FieldValues> {
  children: (props: {
    name: ArrayPath<T>;
    field: UseFieldArrayReturn<T, ArrayPath<T>, "_key">;
  }) => ReactNode | undefined;
  name: ArrayPath<T>;
  styles?: Partial<RepeaterGroupWrapperStyles>;
  classNames?: Partial<RepeaterGroupWrapperClassNames>;
}

function RepeaterGroupWrapperComponent<T extends FieldValues>({
  children,
  name,
  classNames,
  styles,
}: RepeaterGroupWrapperProps<T>) {
  const { control } = useFormContext<T>();
  const field = useFieldArray({
    name,
    control,
    keyName: "_key",
  });

  useOnMountUnsafe(() => {
    if (field.fields.length) {
      return;
    }

    field.insert(0, {} as FieldArray<T, ArrayPath<T>>);
  });

  return (
    <div
      className={cn(
        "lf-w-full lf-flex lf-flex-col lf-gap-2 lf-border lf-border-border lf-rounded-md lf-border-dashed lf-p-2",
        classNames?.root,
      )}
      style={styles?.root}
    >
      {children({ name, field })}
      <div className="mt-1">
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className={cn("lf-w-full", classNames?.insertButton)}
          onClick={() =>
            field.insert(field.fields.length, {} as FieldArray<T, ArrayPath<T>>)
          }
          style={styles?.insertButton}
        >
          Add more item
        </Button>
      </div>
    </div>
  );
}

export const RepeaterGroupWrapper =
  RepeaterGroupWrapperComponent as typeof RepeaterGroupWrapperComponent;
