import { cn } from "@/lib/utils";
import { DetailedHTMLProps, HTMLAttributes } from "react";
import { RepeaterGroupWrapper, RepeaterGroupWrapperProps } from "./wrapper";
import { FieldValues } from "react-hook-form";

export function RepeaterGroup({
  children,
  className,
  ...props
}: DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>) {
  return (
    <div
      className={cn(
        "w-full flex flex-col gap-2 p-2 border border-lfui-muted rounded-md",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

RepeaterGroup.Wrapper = function <T extends FieldValues>(
  props: RepeaterGroupWrapperProps<T>,
) {
  return RepeaterGroupWrapper<T>(props);
};
