import { FacilityDTO } from '@/types/dto';
import { useBottomSheet } from '@gorhom/bottom-sheet';
import { StyleSheet } from 'react-native';
import Animated, { Extrapolation, interpolate, useAnimatedStyle } from 'react-native-reanimated';
import ReducedDescription from './ReducedDescription';
import OpenedDescription from './OpenedDescription';

interface AnimatedDescriptionProps {
  facility: FacilityDTO;
}

const AnimatedDescription: React.FC<AnimatedDescriptionProps> = (props) => {
  const { facility } = props;
  const { animatedPosition } = useBottomSheet();

  const reducedStyle = useAnimatedStyle(() => {
    const opacity = interpolate(animatedPosition.value, [0, 450], [0, 1], Extrapolation.CLAMP);
    const padding = interpolate(animatedPosition.value, [0, 450], [0, 20], Extrapolation.CLAMP);
    return {
      opacity,
      paddingHorizontal: padding,
    };
  });

  const openedStyle = useAnimatedStyle(() => {
    const opacity = interpolate(animatedPosition.value, [0, 450], [1, 0], Extrapolation.CLAMP);
    return {
      opacity,
      paddingHorizontal: 0,
    };
  });

  return (
    <>
      <Animated.View style={[StyleSheet.absoluteFill, styles.contentContainer, reducedStyle]}>
        <ReducedDescription facility={facility} />
      </Animated.View>
      <Animated.View style={[StyleSheet.absoluteFill, styles.contentContainer, openedStyle]}>
        <OpenedDescription facility={facility} />
      </Animated.View>
    </>
  );
};

export default AnimatedDescription;

const styles = StyleSheet.create({
  contentContainer: { flex: 1, gap: 5, alignItems: 'flex-start' },
});
