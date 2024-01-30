import * as React from 'react';
import {
  FlatList,
  Pressable,
  PressableProps,
  StyleSheet,
  Text,
  TextInput,
  TextStyle,
  View,
} from 'react-native';
import lodashGet from 'lodash.get';
import {rem} from '../../../utils/helper';
import {spacing} from '../../../themes/spacing';
import {colors} from '../../../themes/colors';
import {textSize} from '../../../themes/textSize';
import RBSheet from 'react-native-raw-bottom-sheet';
import {Input} from '../../ui/input';
import {useDebounce} from 'use-debounce';
import Icon from 'react-native-vector-icons/MaterialIcons';

interface Item {
  label: string;
  value: string;
}

export interface MultiSelectProps {
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

const MultiSelect = ({
  items: rawItems,
  placeholder,
  value,
  onChange,
  url,
  path,
  disabled,
}: MultiSelectProps) => {
  const refBottomSheet = React.useRef<RBSheet | null>(null);
  const refSearchInput = React.useRef<TextInput | null>(null);

  const [searchValue, setSearchValue] = React.useState<string>('');
  const [debouncedSearchValue] = useDebounce(searchValue, 200);

  const [apiItems, setApiItems] = React.useState<
    MultiSelectProps['items'] | null
  >(null);
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

  const filteredItems = React.useMemo(
    () =>
      items.filter(
        item =>
          item.label
            .trim()
            .toLowerCase()
            .includes(debouncedSearchValue.toLowerCase().trim()) ||
          item.value
            .trim()
            .toLowerCase()
            .includes(debouncedSearchValue.toLowerCase().trim()),
      ),
    [items, debouncedSearchValue],
  );

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

  const displayedItem = React.useMemo(() => {
    if (!value?.length) {
      return placeholder;
    }

    const selectedItems = items.filter(item => value.includes(item.value));
    if (!selectedItems.length) {
      return placeholder;
    }

    if (selectedItems.length === 1) {
      return selectedItems[0].label;
    }

    return `${selectedItems.length} selected`;
  }, [value, items, placeholder]);

  const findValueHandler = React.useCallback(
    (value: string) => {
      return items.find(
        item =>
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
      if (!savedOnChange?.current) {
        return;
      }

      const newValue = value ?? [];

      const newItem = findValueHandler(currentValue);
      if (!newItem) {
        return;
      }

      if (newValue?.includes(newItem.value)) {
        return savedOnChange.current(
          newValue.filter(item => item !== newItem?.value),
        );
      }

      return savedOnChange.current([...newValue, newItem.value]);
    },
    [findValueHandler, value],
  );

  const customStyle: PressableProps['style'] = React.useMemo(() => {
    let additionalStyle: PressableProps['style'] = {};

    if (!displayedItem) {
      additionalStyle = {...additionalStyle, justifyContent: 'flex-end'};
    }

    if (disabled) {
      additionalStyle = {...additionalStyle, backgroundColor: colors.muted};
    }

    return {
      ...style.MultiSelectButton,
      ...additionalStyle,
    };
  }, [disabled, displayedItem]);

  const customTextStyle: TextStyle = React.useMemo(() => {
    let additionalStyle: TextStyle = {};

    if (displayedItem === placeholder) {
      additionalStyle = {...additionalStyle, color: colors.mutedForeground};
    }

    if (disabled) {
      additionalStyle = {
        ...additionalStyle,
        color: colors.mutedForeground,
        backgroundColor: colors.muted,
      };
    }

    return {...style.MultiSelectButtonText, ...additionalStyle};
  }, [displayedItem, placeholder, disabled]);

  const handleOpen = React.useCallback(() => {
    refBottomSheet.current?.open();
    setTimeout(() => {
      refSearchInput.current?.focus();
    }, 100);
  }, []);

  React.useEffect(() => {
    fetchApiItems();
  }, [fetchApiItems]);

  return (
    <View>
      <Pressable
        disabled={disabled}
        style={customStyle}
        android_ripple={{color: colors.accent}}
        onPress={handleOpen}>
        <Text style={customTextStyle}>{displayedItem}</Text>
        <Icon
          size={textSize.sm}
          name="unfold-more"
          color={colors.mutedForeground}
        />
      </Pressable>
      {/* @ts-ignore */}
      <RBSheet ref={refBottomSheet} closeOnDragDown={false} height={350}>
        <View style={style.FlatListContainer}>
          <FlatList
            data={filteredItems}
            renderItem={({item}) => (
              <Item
                item={item}
                isActive={Boolean(value?.includes(item.value))}
                onSelect={onSelect}
              />
            )}
            keyExtractor={item => item.value}
            ListHeaderComponent={
              <Input
                ref={refSearchInput}
                value={searchValue}
                onChange={setSearchValue}
                style={style.Input}
              />
            }
            stickyHeaderIndices={[0]}
          />
        </View>
      </RBSheet>
    </View>
  );
};
MultiSelect.displayName = 'MultiSelect';

const Item = ({
  item,
  onSelect,
  isActive,
}: {
  item: {value: string; label: string};
  onSelect: (value: string) => void;
  isActive: boolean;
}) => {
  return (
    <Pressable
      key={item.value + item.label}
      style={style.MultiSelectItemButton}
      android_ripple={{color: colors.accent}}
      onPress={() => onSelect(item.value)}>
      <Text style={style.MultiSelectItemButtonText}>{item.label}</Text>
      {isActive && (
        <Icon
          size={textSize.base}
          name="check"
          color={colors.mutedForeground}
        />
      )}
    </Pressable>
  );
};

const style = StyleSheet.create({
  MultiSelectButton: {
    height: rem`2.5`,
    borderRadius: spacing.radius - 2,
    borderWidth: 1,
    borderColor: colors.input,
    backgroundColor: colors.background,
    paddingHorizontal: rem`1`,
    paddingVertical: rem`0.5`,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  MultiSelectButtonText: {
    fontSize: textSize.sm,
    color: colors.foreground,
  },
  MultiSelectContentContainer: {
    padding: rem`1.25`,
    gap: rem`1`,
  },
  MultiSelectItemButton: {
    borderRadius: spacing.radius - 2,
    height: rem`2.25`,
    paddingHorizontal: rem`0.75`,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  MultiSelectItemButtonText: {
    color: colors.foreground,
    fontSize: textSize.sm,
  },
  MultiSelectSelected: {
    height: rem`0.5`,
    width: rem`0.5`,
    borderRadius: rem`0.5`,
    backgroundColor: colors.primary,
  },
  FlatListContainer: {
    padding: rem`0.5`,
  },
  Input: {
    backgroundColor: colors.background,
    marginBottom: rem`0.5`,
  },
  MultiSelectIcon: {
    marginLeft: rem`0.5`,
  },
});

export {MultiSelect};
