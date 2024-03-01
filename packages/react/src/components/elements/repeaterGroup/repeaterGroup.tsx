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
        "lf-w-full lf-flex lf-flex-col lf-gap-2 lf-p-2 lf-border lf-border-muted lf-rounded-md lf-relative",
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
            "lf-px-2 lf-py-1 lf-text-xs lf-rounded-sm lf-bg-red-100 lf-text-red-500 lf-absolute lf-top-1 lf-right-1",
            classNames?.deleteButton,
          )}
          style={styles?.deleteButton}
        >
          <Trash className="lf-text-xs" size={14} />
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
