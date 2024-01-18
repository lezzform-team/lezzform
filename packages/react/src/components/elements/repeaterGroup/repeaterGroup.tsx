import { cn } from "@/lib/utils";
import { DetailedHTMLProps, HTMLAttributes } from "react";
import { RepeaterGroupWrapper, RepeaterGroupWrapperProps } from "./wrapper";
import { ArrayPath, FieldValues, UseFieldArrayReturn } from "react-hook-form";
import { Trash } from "lucide-react";

interface RepeaterGroupProps<T extends FieldValues>
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  onDelete?: () => unknown;
  readonly?: boolean;
  fields: UseFieldArrayReturn<T, ArrayPath<T>, "_key">["fields"];
}

export function RepeaterGroup<T extends FieldValues>({
  children,
  className,
  onDelete,
  readonly,
  fields,
  ...props
}: RepeaterGroupProps<T>) {
  return (
    <div
      className={cn(
        "w-full flex flex-col gap-2 p-2 border border-lfui-muted rounded-md relative",
        className,
      )}
      {...props}
    >
      {children}
      {!readonly && fields.length > 1 && (
        <button
          type="button"
          onClick={onDelete}
          className="px-2 py-1 text-xs rounded-sm bg-red-100 text-red-500 absolute top-1 right-1"
        >
          <Trash className="text-xs" size={14} />
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
