import * as React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import lodashGet from 'lodash.get';
import {rem} from '../../../utils/helper';
import {spacing} from '../../../themes/spacing';
import {colors} from '../../../themes/colors';
import {textSize} from '../../../themes/textSize';
import RBSheet from 'react-native-raw-bottom-sheet';

export interface DropdownProps {
  items?: {label: string; value: string}[];
  placeholder?: string;
  url?: string;
  path?: {label: string; value: string};
  value?: string;
  onChange?: (value: string) => unknown;
  label?: string;
  name?: string;
  readOnly?: boolean;
  disabled?: boolean;
  isRequired?: boolean;
}

const Dropdown = ({
  items: rawItems,
  placeholder,
  value,
  onChange,
  url,
  path,
}: DropdownProps) => {
  const refBottomSheet = React.useRef<RBSheet | null>(null);
  const [apiItems, setApiItems] = React.useState<DropdownProps['items'] | null>(
    null,
  );
  const savedOnChange = React.useRef(onChange);

  const items = React.useMemo(() => {
    if (apiItems) {
      return apiItems;
    }

    if (!rawItems?.length) {
      return [];
    }

    return rawItems;
  }, [apiItems, rawItems]);

  const fetchApiItems = React.useCallback(async () => {
    if (!url || !path?.label || !path?.value) {
      return;
    }
    try {
      const query = await fetch(url);
      const data = (await query.json()) as Record<string, unknown>[];

      return setApiItems(
        data.map(item => ({
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
        ? items.find(framework => framework.value === value)?.label
        : placeholder,
    [value, items, placeholder],
  );

  const findValueHandler = React.useCallback(
    (value: string) => {
      return items.find(
        item =>
          item.value
            .toLowerCase()
            .trim()
            .includes(value.toLowerCase().trim()) ||
          item.label.toLowerCase().trim().includes(value.toLowerCase().trim()),
      );
    },
    [items],
  );

  const onSelect = React.useCallback(
    (currentValue: string) => {
      if (!savedOnChange?.current) {
        return;
      }

      savedOnChange.current(
        currentValue === value
          ? ''
          : findValueHandler(currentValue)?.value ?? '',
      );
      refBottomSheet.current?.close();
    },
    [findValueHandler, value],
  );

  React.useEffect(() => {
    fetchApiItems();
  }, [fetchApiItems]);

  return (
    <View>
      <Pressable
        style={style.DropdownButton}
        android_ripple={{color: colors.accent}}
        onPress={() => refBottomSheet.current?.open()}>
        <Text style={style.DropdownButtonText}>{displayedItem}</Text>
      </Pressable>
      {/* @ts-ignore */}
      <RBSheet ref={refBottomSheet} closeOnDragDown={false} height={250}>
        <View style={style.DropdownContentContainer}>
          {items.map((item, index) => (
            <Pressable
              key={item.value + item.label + index}
              style={style.DropdownItemButton}
              android_ripple={{color: colors.accent}}
              onPress={() => onSelect(item.value)}>
              <Text style={style.DropdownItemButtonText}>{item.label}</Text>
            </Pressable>
          ))}
        </View>
      </RBSheet>
    </View>
  );
};
Dropdown.displayName = 'Dropdown';

const style = StyleSheet.create({
  DropdownButton: {
    height: rem`2.5`,
    borderRadius: spacing.radius - 2,
    borderWidth: 1,
    borderColor: colors.input,
    backgroundColor: colors.background,
    paddingHorizontal: rem`1`,
    paddingVertical: rem`0.5`,
    width: '100%',
  },
  DropdownButtonText: {
    fontSize: textSize.sm,
    color: colors.foreground,
  },
  DropdownContentContainer: {
    padding: rem`1.25`,
    gap: rem`0.5`,
  },
  DropdownItemButton: {
    borderRadius: spacing.radius - 2,
    height: rem`2.25`,
    paddingHorizontal: rem`0.75`,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  DropdownItemButtonText: {
    color: colors.mutedForeground,
    fontSize: textSize.sm,
  },
});

export {Dropdown};
