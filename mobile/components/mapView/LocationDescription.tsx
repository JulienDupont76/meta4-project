import useFacilityData from '@/hooks/useRestaurant';
import { imageMap } from '@/mock/image';
import { RestaurantData } from '@/types/models/restaurant';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { useCallback, useMemo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Image } from 'tamagui';
import OpenedDescription from './OpenedDescription';

interface LocationDescriptionProps {
  ref: React.RefObject<BottomSheet | null>;
  selectedId: number | null;
}

const LocationDescription: React.FC<LocationDescriptionProps> = (props) => {
  const { ref, selectedId } = props;
  const insets = useSafeAreaInsets();

  const snapPoints = useMemo(() => ['39%', '100%'], []);

  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);

  const { data: facility, isLoading, error } = useFacilityData(selectedId);

  return (
    <BottomSheet
      ref={ref}
      index={-1}
      snapPoints={snapPoints}
      onChange={handleSheetChanges}
      style={{ marginTop: insets.top }}
    >
      <BottomSheetView style={[styles.contentContainer, { paddingLeft: 0, paddingRight: 0 }]}>
        {isLoading && <Text>Loading...</Text>}
        {error && <Text>Error loading facility.</Text>}
        {facility && <OpenedDescription facility={facility} />}
        {/* {facility && (
          <>
            <View style={styles.titleContainer}>
              <Text style={styles.title}>{facility.name}</Text>
              <Text style={styles.type}>
                {facility.type.charAt(0).toUpperCase() + facility.type.slice(1)}
              </Text>
            </View>

            <View style={styles.openingInfoContainer}>
              <Text style={styles.openingStatus}>{facility.status}</Text>
              <Text style={styles.dot}>•</Text>
              <Text style={styles.openingTime}>{facility.openingTime}</Text>
            </View>
            <View style={styles.openingInfoContainer}>
              <Text style={styles.openingStatus}>★{facility.rating}</Text>
              <Text style={styles.dot}>•</Text>
              <Text style={styles.openingTime}>Visitor reviews {facility.reviews}</Text>
            </View>
            <Text style={styles.details}>{facility.address}</Text>
            <View style={styles.imageRow}>
              {facility.images.map((imageName, index) => (
                <Image
                  key={index}
                  source={imageMap[imageName]}
                  style={[
                    styles.image,
                    index === 0 && { borderTopLeftRadius: 8, borderBottomLeftRadius: 8 },
                    index === facility.images.length - 1 && {
                      borderTopRightRadius: 8,
                      borderBottomRightRadius: 8,
                    },
                  ]}
                />
              ))}
            </View>
          </>
        )} */}
      </BottomSheetView>
    </BottomSheet>
  );
};

export default LocationDescription;

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    alignItems: 'flex-start',
    paddingLeft: 20,
    paddingRight: 20,
    gap: 5,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    gap: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#0056B3',
  },
  type: {
    fontSize: 15,
    color: 'rgb(147, 147, 150)',
  },
  openingInfoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 5,
  },
  openingStatus: {
    fontSize: 14,
    fontWeight: '700',
    color: '#444444',
  },
  openingTime: {
    fontSize: 14,
    color: 'rgb(68, 68, 71)',
  },
  description: {
    fontSize: 14,
    color: '#777',
  },
  details: {
    fontSize: 14,
    color: '#333',
  },
  imageRow: {
    flexDirection: 'row',
    width: '100%',
    marginTop: 5,
    gap: 3,
  },
  image: {
    flex: 1, // each image takes equal width
    height: 100, // fixed height for uniform size
    resizeMode: 'cover',
  },
  dot: {
    color: '#d3d3d3',
    fontSize: 10,
  },
});
