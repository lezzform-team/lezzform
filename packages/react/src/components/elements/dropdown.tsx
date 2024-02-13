"use client";

import * as React from "react";
import { Check } from "lucide-react";

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
import { ElementAdornmentType } from "@lezzform/types/dist/shared";

export interface DropdownStyles<T = React.CSSProperties> {
  root: React.CSSProperties;
  prefixAdornment?: Partial<Record<keyof ElementAdornmentType, T>>;
  suffixAdornment?: DropdownStyles<T>["prefixAdornment"];
  content: React.CSSProperties;
}

export interface DropdownClassNames<T = string> {
  root: string;
  prefixAdornment?: Partial<Record<keyof ElementAdornmentType, T>>;
  suffixAdornment?: DropdownClassNames<T>["prefixAdornment"];
  content: string;
}

interface Props {
  items?: { label: string; value: string }[];
  placeholder?: string;
  url?: string;
  path?: { label: string; value: string };
  value?: string;
  onChange?: (value: string) => unknown;
  label?: string;
  name?: string;
  readOnly?: boolean;
  disabled?: boolean;
  isRequired?: boolean;
  styles?: Partial<DropdownStyles>;
  classNames?: Partial<DropdownClassNames>;
  prefixAdornment?: Partial<
    Record<keyof ElementAdornmentType, React.JSX.Element>
  >;
  suffixAdornment?: Partial<
    Record<keyof ElementAdornmentType, React.JSX.Element>
  >;
}

export function Dropdown({
  items: rawItems,
  placeholder,
  value,
  onChange,
  url,
  path,
  readOnly,
  disabled,
  classNames,
  styles,
  suffixAdornment,
  prefixAdornment,
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
    if (disabled) return;
    fetchApiItems();
  }, [fetchApiItems, disabled]);

  return (
    <Popover open={open} onOpenChange={setOpen} modal>
      <PopoverTrigger asChild disabled={readOnly || disabled}>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn(
            "w-full items-center justify-start text-left font-normal h-10 py-0 px-0",
            readOnly && "cursor-default",
            !value && "text-lfui-muted-foreground",
            disabled && "cursor-not-allowed",
            !prefixAdornment && "pl-3",
            !suffixAdornment && "pr-3",
            classNames?.root,
          )}
          disabled={disabled}
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
            {displayedItem}
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
                    value === framework.value ? "opacity-100" : "opacity-0",
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
