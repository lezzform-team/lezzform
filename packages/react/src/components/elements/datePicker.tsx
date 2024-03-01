"use client";

import { format as dateFnsFormat } from "date-fns";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useMemo } from "react";
import { ElementAdornmentType } from "@lezzform/types/dist/shared";

export interface DatePickerStyles<T = React.CSSProperties> {
  root: React.CSSProperties;
  prefixAdornment?: Partial<Record<keyof ElementAdornmentType, T>>;
  suffixAdornment?: DatePickerStyles<T>["prefixAdornment"];
  content: React.CSSProperties;
}

export interface DatePickerClassNames<T = string> {
  root: string;
  prefixAdornment?: Partial<Record<keyof ElementAdornmentType, T>>;
  suffixAdornment?: DatePickerClassNames<T>["prefixAdornment"];
  content: string;
}

interface Props {
  placeholder?: string;
  value?: Date;
  onChange?: (value: Date) => unknown;
  label?: string;
  name?: string;
  readOnly?: boolean;
  disabled?: boolean;
  format?: string;
  isRequired?: boolean;
  styles?: Partial<DatePickerStyles>;
  classNames?: Partial<DatePickerClassNames>;
  prefixAdornment?: Partial<
    Record<keyof ElementAdornmentType, React.JSX.Element>
  >;
  suffixAdornment?: Partial<
    Record<keyof ElementAdornmentType, React.JSX.Element>
  >;
}

export function DatePicker({
  disabled,
  placeholder,
  readOnly,
  format,
  value,
  onChange,
  classNames,
  styles,
  prefixAdornment,
  suffixAdornment,
}: Props) {
  const display = useMemo(() => {
    if (value) {
      try {
        return dateFnsFormat(value, format ?? "PPP");
      } catch (error) {
        return dateFnsFormat(value, "PPP");
      }
    } else {
      return placeholder ?? "";
    }
  }, [value, format, placeholder]);

  return (
    <Popover>
      <PopoverTrigger asChild disabled={disabled || readOnly}>
        <Button
          variant={"outline"}
          className={cn(
            "lf-w-full lf-items-center lf-justify-start lf-text-left lf-font-normal lf-h-10 lf-py-0 lf-px-0",
            !value && "lf-text-muted-foreground",
            !prefixAdornment && "lf-pl-3",
            !suffixAdornment && "lf-pr-3",
            classNames?.root,
          )}
          disabled={disabled || readOnly}
          style={styles?.root}
        >
          {Boolean(prefixAdornment?.icon) && (
            <div
              className={cn(
                "lf-px-3 lf-flex-shrink-0",
                classNames?.prefixAdornment?.icon,
              )}
              style={styles?.prefixAdornment?.icon}
            >
              {prefixAdornment?.icon}
            </div>
          )}
          <div
            className={cn(
              "lf-h-full lf-flex lf-items-center lf-flex-grow",
              classNames?.content,
            )}
            style={styles?.content}
          >
            {display}
          </div>
          {Boolean(suffixAdornment?.icon) && (
            <div
              className={cn(
                "lf-px-3 lf-flex-shrink-0",
                classNames?.suffixAdornment?.icon,
              )}
              style={styles?.suffixAdornment?.icon}
            >
              {suffixAdornment?.icon}
            </div>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="lf-w-auto lf-p-0" align="start">
        <Calendar
          mode="single"
          selected={value}
          onSelect={(value) => value && onChange && onChange(value)}
          initialFocus
          disabled={disabled || readOnly}
        />
      </PopoverContent>
    </Popover>
  );
}
