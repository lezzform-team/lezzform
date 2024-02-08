import { cn } from "@/lib/utils";
import { DetailedHTMLProps, HTMLAttributes } from "react";
import { RepeaterGroupWrapper, RepeaterGroupWrapperProps } from "./wrapper";
import { ArrayPath, FieldValues, UseFieldArrayReturn } from "react-hook-form";
import { Trash } from "lucide-react";

export interface RepeaterGroupStyles {
  root: React.CSSProperties;
  deleteButton: React.CSSProperties;
}

export interface RepeaterGroupClassNames {
  root: string;
  deleteButton: string;
}

interface RepeaterGroupProps<T extends FieldValues>
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  onDelete?: () => unknown;
  readonly?: boolean;
  fields: UseFieldArrayReturn<T, ArrayPath<T>, "_key">["fields"];
  styles?: Partial<RepeaterGroupStyles>;
  classNames?: Partial<RepeaterGroupClassNames>;
}

export function RepeaterGroup<T extends FieldValues>({
  children,
  className,
  onDelete,
  readonly,
  fields,
  styles,
  classNames,
  ...props
}: RepeaterGroupProps<T>) {
  return (
    <div
      className={cn(
        "w-full flex flex-col gap-2 p-2 border border-lfui-muted rounded-md relative",
        className,
        classNames?.root,
      )}
      style={styles?.root}
      {...props}
    >
      {children}
      {!readonly && fields.length > 1 && (
        <button
          type="button"
          onClick={onDelete}
          className={cn(
            "px-2 py-1 text-xs rounded-sm bg-red-100 text-red-500 absolute top-1 right-1",
            classNames?.deleteButton,
          )}
          style={styles?.deleteButton}
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
