"use client";

import { CalendarIcon } from "@radix-ui/react-icons";
import { format as dateFnsFormat } from "date-fns";

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
  value?: Date;
  onChange?: (value: Date) => unknown;
  label?: string;
  name?: string;
  readOnly?: boolean;
  disabled?: boolean;
  format?: string;
  isRequired?: boolean;
}

export function DatePicker({
  disabled,
  placeholder,
  readOnly,
  format,
  value,
  onChange,
}: Props) {
  return (
    <Popover>
      <PopoverTrigger asChild disabled={disabled || readOnly}>
        <Button
          variant={"outline"}
          className={cn(
            "w-full justify-start text-left font-normal",
            !value && "text-lfui-muted-foreground",
          )}
          disabled={disabled || readOnly}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {value ? (
            dateFnsFormat(value, format ?? "PPP")
          ) : (
            <span>{placeholder ?? ""}</span>
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
