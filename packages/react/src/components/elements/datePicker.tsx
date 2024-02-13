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
            "w-full items-center justify-start text-left font-normal h-10 py-0 px-0",
            !value && "text-lfui-muted-foreground",
            !prefixAdornment && "pl-3",
            !suffixAdornment && "pr-3",
            classNames?.root,
          )}
          disabled={disabled || readOnly}
          style={styles?.root}
        >
          {Boolean(prefixAdornment?.icon) && (
            <div
              className={cn(
                "px-3 flex-shrink-0",
                classNames?.prefixAdornment?.icon,
              )}
              style={styles?.prefixAdornment?.icon}
            >
              {prefixAdornment?.icon}
            </div>
          )}
          <div
            className={cn(
              "h-full flex items-center flex-grow",
              classNames?.content,
            )}
            style={styles?.content}
          >
            {display}
          </div>
          {Boolean(suffixAdornment?.icon) && (
            <div
              className={cn(
                "px-3 flex-shrink-0",
                classNames?.suffixAdornment?.icon,
              )}
              style={styles?.suffixAdornment?.icon}
            >
              {suffixAdornment?.icon}
            </div>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
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
