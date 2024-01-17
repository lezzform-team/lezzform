import React, {PropsWithChildren, useCallback, useMemo, useState} from 'react';
import {LayoutChangeEvent, View, ViewStyle} from 'react-native';

interface GridProps extends PropsWithChildren {
  columns: number;
  gap: number;
}

type GridContextValue = {
  width: number;
  gap: number;
  columns: number;
  length: number;
};

const GridContext = React.createContext<GridContextValue>({
  width: 0,
  gap: 0,
  columns: 0,
  length: 0,
} as GridContextValue);

const Grid = ({columns, gap, children}: GridProps) => {
  const [viewWidth, setViewWidth] = useState<number>(0);

  const handleLayout = useCallback((event: LayoutChangeEvent) => {
    const {width} = event.nativeEvent.layout;
    setViewWidth(width);
  }, []);

  const style = useMemo<ViewStyle>(() => {
    return {
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap',
    };
  }, []);

  const childrenWithProps = React.Children.map(children, (child, index) => {
    // Checking isValidElement is the safe way and avoids a
    // typescript error too.

    if (React.isValidElement(child)) {
      return React.cloneElement(<Item index={index}>{child}</Item>);
    }
    return child;
  });

  return (
    <GridContext.Provider
      value={{
        width: viewWidth,
        gap,
        columns,
        length: childrenWithProps?.length! ?? 0,
      }}>
      <View style={style} onLayout={handleLayout}>
        {childrenWithProps}
      </View>
    </GridContext.Provider>
  );
};

interface ItemProps extends PropsWithChildren {
  index?: number;
}

const Item = ({children, index}: ItemProps) => {
  const gridContext = React.useContext(GridContext);

  if (!gridContext) {
    throw new Error('Grid.Item must be used within Grid');
  }

  const {gap, width, columns, length} = gridContext;

  const isLeftmost = (index: number): boolean => {
    return index % columns === 0;
  };

  const isRightmost = (index: number): boolean => {
    return (index + 1) % columns === 0;
  };

  const getRowIndex = (index: number): number => {
    return Math.floor(index / columns);
  };

  const isLastRow = (index: number): boolean => {
    const totalRows = Math.ceil(length / columns);
    return getRowIndex(index) === totalRows - 1;
  };

  const isFirstRow = (index: number): boolean => {
    return getRowIndex(index) === 0;
  };

  const isLeftMostIndex = Boolean(isLeftmost(index!));
  const isRightMostIndex = Boolean(isRightmost(index!));
  const isLastRowIndex = Boolean(isLastRow(index!));
  const isFirstRowIndex = Boolean(isFirstRow(index!));

  const style = useMemo<ViewStyle>(() => {
    const totalGapSize = (columns - 1) * gap;
    const windowWidth = width;
    const childWidth = (windowWidth - totalGapSize) / columns;

    return {
      marginHorizontal: gap / 2,
      marginVertical: gap / 2,
      marginRight: isRightMostIndex ? 0 : gap / 2,
      marginLeft: isLeftMostIndex ? 0 : gap / 2,
      marginTop: isFirstRowIndex ? 0 : gap / 2,
      marginBottom: isLastRowIndex ? 0 : gap / 2,
      minWidth: childWidth,
      maxWidth: childWidth,
    };
  }, [
    columns,
    gap,
    isFirstRowIndex,
    isLastRowIndex,
    isLeftMostIndex,
    isRightMostIndex,
    width,
  ]);

  return <View style={style}>{children}</View>;
};

Grid.Item = Item;

export {Grid};
