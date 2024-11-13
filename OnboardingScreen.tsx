import {StyleSheet, View, FlatList, ViewToken} from 'react-native';
import React, {useCallback} from 'react';
import Animated, {
  useSharedValue,
  useAnimatedScrollHandler,
  useAnimatedRef,
} from 'react-native-reanimated';
import data, {OnboardingData} from './src/data/data';
import Pagination from './src/components/Pagination';
import CustomButton from './src/components/CustomButton';
import RenderItem from './src/components/RenderItem';

const OnboardingScreen = () => {
  const flatListRef = useAnimatedRef<FlatList<OnboardingData>>();
  const x = useSharedValue(0);
  const flatListIndex = useSharedValue(0);

  const onViewableItemsChanged = useCallback(({
    viewableItems,
  }: {
    viewableItems: ViewToken[];
    changed: ViewToken[];
  }) => {
    if (viewableItems && viewableItems.length > 0 && viewableItems[0]?.index !== null && viewableItems[0]?.index !== undefined) {
      // Add type assertion since we've verified it's a number
      flatListIndex.value = viewableItems[0].index as number;
    }
  }, []);

  // Create viewability config outside render
  const viewabilityConfig = React.useMemo(() => ({
    minimumViewTime: 100, // Reduced from 300 to make it more responsive
    viewAreaCoveragePercentThreshold: 50, // Increased from 10 to make it more stable
    waitForInteraction: true,
  }), []);

  const onScroll = useAnimatedScrollHandler({
    onScroll: event => {
      x.value = event.contentOffset.x;
    },
  });

  const renderItem = useCallback(({item, index}: {item: OnboardingData; index: number}) => {
    return <RenderItem item={item} index={index} x={x} />;
  }, [x]);
  const keyExtractor = useCallback((item: OnboardingData) => item.id.toString(), []);
  return (
    <View style={styles.container}>
      <Animated.FlatList
        ref={flatListRef}
        onScroll={onScroll}
        data={data}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        scrollEventThrottle={16}
        horizontal={true}
        bounces={false}
        pagingEnabled={true}
        showsHorizontalScrollIndicator={false}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
        initialNumToRender={1}
        maxToRenderPerBatch={2}
        windowSize={3}
        removeClippedSubviews={true}
      />
      <View style={styles.bottomContainer}>
        <Pagination data={data} x={x} />
        <CustomButton
          flatListRef={flatListRef}
          flatListIndex={flatListIndex}
          dataLength={data.length}
          x={x}
        />
      </View>
    </View>
  );
};

export default OnboardingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bottomContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 30,
    paddingVertical: 30,
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
  },
});