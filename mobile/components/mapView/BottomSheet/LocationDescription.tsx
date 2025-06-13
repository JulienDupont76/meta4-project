import useFacilityData from '@/hooks/useRestaurant';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { useMemo } from 'react';
import { StyleSheet, Text } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import AnimatedDescription from './AnimatedDescription';

interface LocationDescriptionProps {
  ref: React.RefObject<BottomSheet | null>;
  selectedId: number | null;
}

const LocationDescription: React.FC<LocationDescriptionProps> = (props) => {
  const { ref, selectedId } = props;
  const insets = useSafeAreaInsets();

  const snapPoints = useMemo(() => ['39%', '100%'], []);

  const { data: facility, isLoading, error } = useFacilityData(selectedId);

  return (
    <BottomSheet ref={ref} index={-1} snapPoints={snapPoints} style={{ marginTop: insets.top }}>
      <BottomSheetView style={[styles.contentContainer]}>
        {isLoading && <Text>Loading...</Text>}
        {error && <Text>Error loading facility.</Text>}
        {facility && <AnimatedDescription facility={facility} />}
      </BottomSheetView>
    </BottomSheet>
  );
};

export default LocationDescription;

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
  },
});
