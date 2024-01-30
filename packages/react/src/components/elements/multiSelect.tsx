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

interface Item {
  label: string;
  value: string;
}

interface Props {
  items?: Item[];
  placeholder?: string;
  url?: string;
  path?: Item;
  value?: string[];
  onChange?: (value: string[]) => unknown;
  label?: string;
  name?: string;
  readOnly?: boolean;
  disabled?: boolean;
  isRequired?: boolean;
}

export function MultiSelect({
  items: rawItems,
  placeholder,
  value,
  onChange,
  url,
  path,
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

  const displayedItem = React.useMemo(() => {
    if (!value?.length) return placeholder;

    const selectedItems = items.filter((item) => value.includes(item.value));
    if (!selectedItems.length) return placeholder;

    if (selectedItems.length === 1) return selectedItems[0].label;

    return `${selectedItems.length} selected`;
  }, [value, items, placeholder]);

  const findValueHandler = React.useCallback(
    (value: string) => {
      return items.find(
        (item) =>
          String(item.value)
            .toLowerCase()
            .trim()
            .includes(String(value).toLowerCase().trim()) ||
          String(item.label)
            .toLowerCase()
            .trim()
            .includes(String(value).toLowerCase().trim()),
      );
    },
    [items],
  );

  const onSelect = React.useCallback(
    (currentValue: string) => {
      if (!savedOnChange?.current) return;

      const newValue = value ?? [];

      const newItem = findValueHandler(currentValue);
      if (!newItem) return;

      if (newValue?.includes(newItem.value)) {
        return savedOnChange.current(
          newValue.filter((item) => item !== newItem?.value),
        );
      }

      return savedOnChange.current([...newValue, newItem.value]);
    },
    [findValueHandler, value],
  );

  React.useEffect(() => {
    fetchApiItems();
  }, [fetchApiItems]);

  return (
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
            !value && "text-lfui-muted-foreground",
          )}
          disabled={disabled}
        >
          {displayedItem}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0 DropdownPopoverContent">
        <Command>
          <CommandInput placeholder={placeholder} />
          <CommandEmpty>No item found.</CommandEmpty>
          <CommandGroup className="max-h-96 overflow-auto">
            {items.map((framework) => (
              <CommandItem
                key={framework.value}
                value={framework.value}
                onSelect={onSelect}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    value?.includes(framework.value)
                      ? "opacity-100"
                      : "opacity-0",
                  )}
                />
                {framework.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
