import { ActivityIndicator, StyleSheet, Text } from 'react-native';

import MapView from 'react-native-maps';
import Pins from '@/components/mapView/Pins';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { mapStyle } from '@/constants/MapConfig';
import LocationDescription from '@/components/mapView/LocationDescription';
import { useRef, useState } from 'react';
import BottomSheet from '@gorhom/bottom-sheet';
import { RestaurantData } from '@/types/models/restaurant';
import useMapPins from '@/hooks/useMapPins';
import { View } from '@/components/Themed';

export default function TabOneScreen() {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const { data: pins, isLoading: loadingPins, error } = useMapPins();

  if (loadingPins)
    return (
      <ActivityIndicator
        style={{
          flex: 1,
        }}
      />
    );

  if (error)
    return (
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Text>{error.message}</Text>
      </View>
    );

  const handleMapPress = () => {
    setSelectedId(null);
    bottomSheetRef.current?.close();
  };

  const handlePinPress = (locationId: number) => {
    setSelectedId(locationId);
    bottomSheetRef.current?.snapToIndex(0);
  };

  return (
    <GestureHandlerRootView style={styles.container}>
      <MapView
        provider="google"
        customMapStyle={mapStyle}
        initialCamera={{
          center: {
            latitude: 36.370224,
            longitude: 127.360394,
          },
          pitch: 0,
          heading: 0,
          altitude: 3000,
          zoom: 15,
        }}
        showsMyLocationButton={true}
        showsScale={true}
        zoomEnabled={true}
        zoomControlEnabled={true}
        loadingEnabled={true}
        tintColor="red"
        mapType="standard"
        showsUserLocation={true}
        showsPointsOfInterest={false}
        style={styles.map}
        onPress={handleMapPress}
      >
        {pins?.map((pin) => (
          <Pins
            coordinate={{
              latitude: pin.latitude,
              longitude: pin.longitude,
            }}
            key={pin.id}
            type={pin.type}
            selected={selectedId === pin.id}
            name={pin.name}
            onPress={() => handlePinPress(pin.id)}
          />
        ))}
      </MapView>
      <LocationDescription ref={bottomSheetRef} selectedId={selectedId} />
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: '100%',
    height: '100%',
  },
});
