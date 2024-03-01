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
  data?: string;
}

export interface MultiSelectStyles {
  root: React.CSSProperties;
}

export interface MultiSelectClassNames {
  root: string;
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
  styles?: Partial<MultiSelectStyles>;
  classNames?: Partial<MultiSelectClassNames>;
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
  styles,
  classNames,
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
      let data = (await query.json()) as Record<string, unknown>[];

      if (path?.data) {
        data = lodashGet(data, path.data, []);
      }

      return setApiItems(
        data.map((item) => ({
          label: lodashGet(item, path?.label) as string,
          value: lodashGet(item, path?.value) as string,
        })),
      );
    } catch (error) {
      setApiItems(null);
    }
  }, [path?.label, path?.value, path?.data, url]);

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
            "lf-w-full",
            !displayedItem && "lf-justify-end",
            displayedItem && "lf-justify-between",
            readOnly && "lf-cursor-default",
            !value && "lf-text-muted-foreground",
            classNames?.root,
          )}
          disabled={disabled}
          style={styles?.root}
        >
          {displayedItem}
          <ChevronsUpDown className="lf-ml-2 lf-h-4 lf-w-4 lf-shrink-0 lf-opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="lf-p-0 DropdownPopoverContent">
        <Command>
          <CommandInput placeholder={placeholder} />
          <CommandEmpty>No item found.</CommandEmpty>
          <CommandGroup className="lf-max-h-96 lf-overflow-auto">
            {items.map((framework) => (
              <CommandItem
                key={framework.value}
                value={framework.value}
                onSelect={onSelect}
              >
                <Check
                  className={cn(
                    "lf-mr-2 lf-h-4 lf-w-4",
                    value?.includes(framework.value)
                      ? "lf-opacity-100"
                      : "lf-opacity-0",
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
