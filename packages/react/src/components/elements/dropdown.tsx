"use client";

import * as React from "react";

import lodashGet from "lodash.get";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Input } from "../ui/input";
import { useDebounce } from "use-debounce";

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
}: Props) {
  const [apiItems, setApiItems] = React.useState<Props["items"] | null>(null);

  const [searchValue, setSearchValue] = React.useState<string>("");
  const [debouncedSearchValue] = useDebounce(searchValue, 100);
  const inputRef = React.useRef<HTMLInputElement>();

  const savedOnChange = React.useRef(onChange);

  const items = React.useMemo(() => {
    if (apiItems) return apiItems;

    if (!rawItems?.length) return [];

    return rawItems;
  }, [apiItems, rawItems]);

  const filteredItems = React.useMemo(
    () =>
      items.filter(
        (item) =>
          item.label
            .toLowerCase()
            .trim()
            .includes(debouncedSearchValue.toLowerCase().trim()) ||
          item.value
            .toLowerCase()
            .trim()
            .includes(debouncedSearchValue.toLowerCase().trim())
      ),
    [debouncedSearchValue, items]
  );

  const fetchApiItems = React.useCallback(async () => {
    if (!url || !path?.label || !path?.value) return;
    try {
      const query = await fetch(url);
      const data = (await query.json()) as Record<string, unknown>[];

      return setApiItems(
        data.map((item) => ({
          label: lodashGet(item, path?.label) as string,
          value: lodashGet(item, path?.value) as string,
        }))
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
    [value, items, placeholder]
  );

  const onSelect = React.useCallback(
    (currentValue: string) => {
      if (!savedOnChange?.current) return;

      savedOnChange.current(currentValue === value ? "" : currentValue);
    },
    [value]
  );

  React.useEffect(() => {
    fetchApiItems();
  }, [fetchApiItems]);

  React.useEffect(() => {
    savedOnChange.current = onChange;
  }, [onChange]);

  return (
    <Select
      defaultValue={value}
      onValueChange={onSelect}
      onOpenChange={(open) => {
        if (open && inputRef.current) {
          inputRef.current.focus();
        }
      }}
    >
      <SelectTrigger className="w-full" disabled={readOnly || disabled}>
        <SelectValue placeholder={displayedItem} />
      </SelectTrigger>
      <SelectContent
        onKeyDown={(e) => {
          e.preventDefault();
        }}
        onFocus={(e) => {
          e.preventDefault();
          inputRef.current?.focus();
        }}
      >
        <SelectGroup
          onKeyDown={(e) => {
            e.preventDefault();
          }}
        >
          <div className="p-2">
            <Input
              ref={inputRef as React.Ref<HTMLInputElement> | undefined}
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              onKeyDown={(e) => {
                e.stopPropagation();
              }}
              placeholder={placeholder ?? "Search for items"}
              className="h-8"
            />
          </div>

          {filteredItems.map((item, index) => (
            <SelectItem key={item.value + index} value={item.value}>
              {item.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
