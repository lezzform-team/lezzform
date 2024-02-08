"use client";

import { Calendar as CalendarIcon } from "lucide-react";
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

export interface DatePickerStyles {
  root: React.CSSProperties;
}

export interface DatePickerClassNames {
  root: string;
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
            "w-full justify-start text-left font-normal",
            !value && "text-lfui-muted-foreground",
            classNames?.root,
          )}
          disabled={disabled || readOnly}
          style={styles?.root}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {display}
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
