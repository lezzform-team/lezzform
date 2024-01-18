import { Button } from "@/components/ui/button";
import { ReactNode, useEffect } from "react";
import {
  ArrayPath,
  FieldArray,
  FieldValues,
  UseFieldArrayReturn,
  useFieldArray,
  useFormContext,
} from "react-hook-form";

export interface RepeaterGroupWrapperProps<T extends FieldValues> {
  children: (props: {
    name: ArrayPath<T>;
    field: UseFieldArrayReturn<T, ArrayPath<T>, "_key">;
  }) => ReactNode | undefined;
  name: ArrayPath<T>;
}

function RepeaterGroupWrapperComponent<T extends FieldValues>({
  children,
  name,
}: RepeaterGroupWrapperProps<T>) {
  const { control } = useFormContext<T>();
  const field = useFieldArray({
    name,
    control,
    keyName: "_key",
  });

  useEffect(() => {
    if (field.fields.length) {
      return;
    }

    field.insert(0, {} as FieldArray<T, ArrayPath<T>>);
  }, [field]);

  return (
    <div className="w-full flex flex-col gap-2 border border-lfui-border rounded-md border-dashed p-2">
      {children({ name, field })}
      <div className="mt-1">
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="w-full"
          onClick={() =>
            field.insert(field.fields.length, {} as FieldArray<T, ArrayPath<T>>)
          }
        >
          Add more item
        </Button>
      </div>
    </div>
  );
}

export const RepeaterGroupWrapper =
  RepeaterGroupWrapperComponent as typeof RepeaterGroupWrapperComponent;
