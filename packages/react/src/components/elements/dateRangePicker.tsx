"use client";

import * as React from "react";
import { format as dateFnsFormat } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { DateRange } from "react-day-picker";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface Props {
  placeholder?: string;
  value?: Partial<DateRange>;
  onChange?: (value: DateRange) => unknown;
  label?: string;
  name?: string;
  readOnly?: boolean;
  disabled?: boolean;
  format?: string;
  isRequired?: boolean;
  className?: string;
}

export function DateRangePicker({
  className,
  format,
  value,
  placeholder,
  onChange,
  disabled,
  readOnly,
}: Props) {
  const fromDisplay = React.useMemo(() => {
    if (value?.from) {
      try {
        return dateFnsFormat(value.from, format ?? "PPP");
      } catch (error) {
        return dateFnsFormat(value.from, "PPP");
      }
    } else {
      return "";
    }
  }, [value?.from, format]);

  const toDisplay = React.useMemo(() => {
    if (value?.to) {
      try {
        return dateFnsFormat(value.to, format ?? "PPP");
      } catch (error) {
        return dateFnsFormat(value.to, "PPP");
      }
    } else {
      return "";
    }
  }, [value?.to, format]);

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-full justify-start text-left font-normal",
              !value && "text-muted-foreground",
            )}
            disabled={disabled || readOnly}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {value?.from ? (
              value.to ? (
                <>
                  {fromDisplay} - {toDisplay}
                </>
              ) : (
                fromDisplay
              )
            ) : (
              <span>{placeholder}</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={value?.from}
            selected={value as DateRange}
            onSelect={(value) => value && onChange && onChange(value)}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
