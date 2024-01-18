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
import {Input} from '../../../components/ui/input';
import {useDebounce} from 'use-debounce';
import Icon from 'react-native-vector-icons/MaterialIcons';

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
  disabled,
}: DropdownProps) => {
  const refBottomSheet = React.useRef<RBSheet | null>(null);
  const refSearchInput = React.useRef<TextInput | null>(null);

  const [searchValue, setSearchValue] = React.useState<string>('');
  const [debouncedSearchValue] = useDebounce(searchValue, 200);

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

  const customStyle: PressableProps['style'] = React.useMemo(() => {
    let additionalStyle: PressableProps['style'] = {};

    if (!displayedItem) {
      additionalStyle = {...additionalStyle, justifyContent: 'flex-end'};
    }

    if (disabled) {
      additionalStyle = {...additionalStyle, backgroundColor: colors.muted};
    }

    return {
      ...style.DropdownButton,
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

    return {...style.DropdownButtonText, ...additionalStyle};
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
                isActive={item.value === value}
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
Dropdown.displayName = 'Dropdown';

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
      style={style.DropdownItemButton}
      android_ripple={{color: colors.accent}}
      onPress={() => onSelect(item.value)}>
      <Text style={style.DropdownItemButtonText}>{item.label}</Text>
      {isActive && <View style={style.DropdownSelected} />}
    </Pressable>
  );
};

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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  DropdownButtonText: {
    fontSize: textSize.sm,
    color: colors.foreground,
  },
  DropdownContentContainer: {
    padding: rem`1.25`,
    gap: rem`1`,
  },
  DropdownItemButton: {
    borderRadius: spacing.radius - 2,
    height: rem`2.25`,
    paddingHorizontal: rem`0.75`,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  DropdownItemButtonText: {
    color: colors.foreground,
    fontSize: textSize.sm,
  },
  DropdownSelected: {
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
  DropdownIcon: {
    marginLeft: rem`0.5`,
  },
});

export {Dropdown};
