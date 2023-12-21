"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import lodashGet from "lodash.get";
import { ScrollArea } from "../ui/scroll-area";

interface Props {
  items?: { label: string; value: string }[];
  placeholder?: string;
  url?: string;
  path?: { label: string; value: string };
  value?: string;
  onChange?: (value: string) => unknown;
  error?: string;
  id?: string;
  label?: string;
  name?: string;
  readOnly?: boolean;
  disabled?: boolean;
}

export function Dropdown({
  items: rawItems,
  placeholder,
  value,
  onChange,
  url,
  path,
  error,
  id,
  label,
  readOnly,
  disabled,
}: Props) {
  const [open, setOpen] = React.useState(false);
  const [apiItems, setApiItems] = React.useState<Props["items"] | null>(null);
  const savedOnChange = React.useRef(onChange);

  const items = React.useMemo(() => {
    if (apiItems) return apiItems;

    if (!rawItems?.length) return [];

    return rawItems;
  }, [apiItems, rawItems]);

  const fetchApiItems = React.useCallback(async () => {
    if (!url || !path?.label || !path?.value) return;
    try {
      const query = await fetch(url);
      const data = (await query.json()) as Record<string, unknown>[];

      return setApiItems(
        data.map((item) => ({
          label: lodashGet(item, path?.label) as string,
          value: lodashGet(item, path?.value) as string,
        })),
      );
    } catch (error) {
      setApiItems(null);
    }
  }, [path?.label, path?.value, url]);

  const displayedItem = React.useMemo(
    () =>
      value
        ? items.find((framework) => framework.value === value)?.label
        : placeholder,
    [value, items, placeholder],
  );

  const findValueHandler = React.useCallback(
    (value: string) => {
      return items.find((item) => item.value.toLowerCase().trim() === value);
    },
    [items],
  );

  const onSelect = React.useCallback(
    (currentValue: string) => {
      if (!savedOnChange?.current) return;

      savedOnChange.current(
        currentValue === value
          ? ""
          : findValueHandler(currentValue)?.value ?? "",
      );
      setOpen(false);
    },
    [findValueHandler, value],
  );

  React.useEffect(() => {
    fetchApiItems();
  }, [fetchApiItems]);

  return (
    <div className="flex flex-col gap-2 w-full">
      <label htmlFor={id} className="text-sm font-medium leading-none">
        {label}
      </label>
      <Popover open={open} onOpenChange={setOpen} modal>
        <PopoverTrigger asChild disabled={readOnly || disabled}>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className={cn(
              "w-full",
              !displayedItem && "justify-end",
              displayedItem && "justify-between",
              readOnly && "cursor-default",
              !value && "text-muted-foreground",
            )}
            disabled={disabled}
          >
            {displayedItem}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0">
          <Command>
            <CommandInput placeholder={placeholder} />
            <CommandEmpty>No item found.</CommandEmpty>
            <ScrollArea className="max-h-96">
              <CommandGroup>
                {items.map((framework) => (
                  <CommandItem
                    key={framework.value}
                    value={framework.value}
                    onSelect={onSelect}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        value === framework.value ? "opacity-100" : "opacity-0",
                      )}
                    />
                    {framework.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            </ScrollArea>
          </Command>
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
