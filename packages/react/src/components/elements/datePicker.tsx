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
import { FormLabel } from "../shared";

interface Props {
  placeholder?: string;
  value?: Date;
  onChange?: (value: Date) => unknown;
  error?: string;
  id?: string;
  label?: string;
  name?: string;
  readOnly?: boolean;
  disabled?: boolean;
  format?: string;
  isRequired?: boolean;
}

export function DatePicker({
  id,
  label,
  error,
  disabled,
  placeholder,
  readOnly,
  format,
  value,
  onChange,
  isRequired,
}: Props) {
  return (
    <div className="flex flex-col gap-2 w-full">
      <FormLabel htmlFor={id} isRequired={isRequired}>
        {label}
      </FormLabel>
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
      {error && (
        <small className="text-xs font-medium leading-none text-red-500">
          {error}
        </small>
      )}
    </div>
  );
}
