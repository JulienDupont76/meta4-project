import { StyleSheet, Text } from 'react-native';

import MapView from 'react-native-maps';
import Pins from '@/components/mapView/Pins';
import { useCallback, useRef } from 'react';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function TabOneScreen() {
	const bottomSheetRef = useRef<BottomSheet>(null);
	const handleSheetChanges = useCallback((index: number) => {
		console.log('handleSheetChanges', index);
	}, []);

	const mapStyle = [
		{
			elementType: 'geometry',
			stylers: [
				{
					color: '#ebe3cd',
				},
			],
		},
		{
			elementType: 'labels.text.fill',
			stylers: [
				{
					color: '#523735',
				},
			],
		},
		{
			elementType: 'labels.text.stroke',
			stylers: [
				{
					color: '#f5f1e6',
				},
			],
		},
		{
			featureType: 'administrative',
			elementType: 'geometry.stroke',
			stylers: [
				{
					color: '#c9b2a6',
				},
			],
		},
		{
			featureType: 'administrative.land_parcel',
			elementType: 'geometry.stroke',
			stylers: [
				{
					color: '#dcd2be',
				},
			],
		},
		{
			featureType: 'administrative.land_parcel',
			elementType: 'labels.text.fill',
			stylers: [
				{
					color: '#ae9e90',
				},
			],
		},
		{
			featureType: 'landscape.natural',
			elementType: 'geometry',
			stylers: [
				{
					color: '#dfd2ae',
				},
			],
		},
		{
			featureType: 'poi',
			elementType: 'geometry',
			stylers: [
				{
					color: '#dfd2ae',
				},
			],
		},
		{
			featureType: 'poi',
			elementType: 'labels.text.fill',
			stylers: [
				{
					color: '#93817c',
				},
			],
		},
		{
			featureType: 'poi.business',
			stylers: [
				{
					visibility: 'off',
				},
			],
		},
		{
			featureType: 'poi.park',
			elementType: 'geometry.fill',
			stylers: [
				{
					color: '#a5b076',
				},
			],
		},
		{
			featureType: 'poi.park',
			elementType: 'labels.text',
			stylers: [
				{
					visibility: 'off',
				},
			],
		},
		{
			featureType: 'poi.park',
			elementType: 'labels.text.fill',
			stylers: [
				{
					color: '#447530',
				},
			],
		},
		{
			featureType: 'road',
			elementType: 'geometry',
			stylers: [
				{
					color: '#f5f1e6',
				},
			],
		},
		{
			featureType: 'road.arterial',
			elementType: 'geometry',
			stylers: [
				{
					color: '#fdfcf8',
				},
			],
		},
		{
			featureType: 'road.highway',
			elementType: 'geometry',
			stylers: [
				{
					color: '#f8c967',
				},
			],
		},
		{
			featureType: 'road.highway',
			elementType: 'geometry.stroke',
			stylers: [
				{
					color: '#e9bc62',
				},
			],
		},
		{
			featureType: 'road.highway.controlled_access',
			elementType: 'geometry',
			stylers: [
				{
					color: '#e98d58',
				},
			],
		},
		{
			featureType: 'road.highway.controlled_access',
			elementType: 'geometry.stroke',
			stylers: [
				{
					color: '#db8555',
				},
			],
		},
		{
			featureType: 'road.local',
			elementType: 'labels.text.fill',
			stylers: [
				{
					color: '#806b63',
				},
			],
		},
		{
			featureType: 'transit.line',
			elementType: 'geometry',
			stylers: [
				{
					color: '#dfd2ae',
				},
			],
		},
		{
			featureType: 'transit.line',
			elementType: 'labels.text.fill',
			stylers: [
				{
					color: '#8f7d77',
				},
			],
		},
		{
			featureType: 'transit.line',
			elementType: 'labels.text.stroke',
			stylers: [
				{
					color: '#ebe3cd',
				},
			],
		},
		{
			featureType: 'transit.station',
			elementType: 'geometry',
			stylers: [
				{
					color: '#dfd2ae',
				},
			],
		},
		{
			featureType: 'water',
			elementType: 'geometry.fill',
			stylers: [
				{
					color: '#b9d3c2',
				},
			],
		},
		{
			featureType: 'water',
			elementType: 'labels.text.fill',
			stylers: [
				{
					color: '#92998d',
				},
			],
		},
	];
	return (
		<GestureHandlerRootView style={styles.container}>
			<MapView
				provider='google'
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
				tintColor='red'
				mapType='standard'
				showsUserLocation={true}
				showsPointsOfInterest={false}
				style={styles.map}
			>
				<Pins
					coordinate={{
						latitude: 36.3737192,
						longitude: 127.359222,
					}}
					type='restaurant'
				/>
				<Pins
					coordinate={{
						latitude: 36.368584,
						longitude: 127.364576,
					}}
					type='cafe'
				/>
				<Pins
					coordinate={{
						latitude: 36.369649,
						longitude: 127.362527,
					}}
					type='library'
				/>
			</MapView>
			<BottomSheet ref={bottomSheetRef} onChange={handleSheetChanges} index={0}>
				<BottomSheetView style={styles.contentContainer}>
					<Text>Awesome 🎉</Text>
				</BottomSheetView>
			</BottomSheet>
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
	contentContainer: {
		flex: 1,
		padding: 36,
		alignItems: 'center',
	},
});
