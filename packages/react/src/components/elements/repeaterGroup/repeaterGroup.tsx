import { cn } from "@/lib/utils";
import { DetailedHTMLProps, HTMLAttributes } from "react";
import { RepeaterGroupWrapper, RepeaterGroupWrapperProps } from "./wrapper";
import { FieldValues } from "react-hook-form";

interface RepeaterGroupProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  onDelete?: () => unknown;
  readonly?: boolean;
}

export function RepeaterGroup({
  children,
  className,
  onDelete,
  readonly,
  ...props
}: RepeaterGroupProps) {
  return (
    <div
      className={cn(
        "w-full flex flex-col gap-2 p-2 border border-lfui-muted rounded-md relative",
        className,
      )}
      {...props}
    >
      {children}
      {!readonly && (
        <button
          onClick={onDelete}
          className="px-2 py-1 text-xs rounded-sm bg-red-100 text-red-500 absolute top-1 right-1"
        >
          Delete
        </button>
      )}
    </div>
  );
}

RepeaterGroup.Wrapper = function <T extends FieldValues>(
  props: RepeaterGroupWrapperProps<T>,
) {
  return RepeaterGroupWrapper<T>(props);
};
