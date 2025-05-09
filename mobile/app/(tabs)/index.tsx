import { StyleSheet } from 'react-native';

import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed';
import MapView, { Marker } from 'react-native-maps';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

export default function TabOneScreen() {
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
		<View style={styles.container}>
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
				<Marker
					coordinate={{
						latitude: 36.3737192,
						longitude: 127.359222,
					}}
					onSelect={() => {
						console.log('Marker selected');
					}}
				>
					<View style={styles.wrapper}>
						<View style={styles.property}>
							<View style={styles.innerIcon}>
								<MaterialIcons name='restaurant' size={13} color='white' />
							</View>
						</View>
						<View style={styles.propertyAfter} />
					</View>
				</Marker>
				<Marker
					coordinate={{
						latitude: 36.368584,
						longitude: 127.364576,
					}}
				>
					<View style={styles.wrapper}>
						<View style={styles.property}>
							<View style={[styles.innerIcon, { backgroundColor: '#00B4A7' }]}>
								<MaterialIcons name='local-cafe' size={13} color='white' />
							</View>
						</View>
						<View style={styles.propertyAfter} />
					</View>
				</Marker>
				<Marker
					coordinate={{
						latitude: 36.369649,
						longitude: 127.362527,
					}}
				>
					<View style={styles.wrapper}>
						<View style={styles.property}>
							<View style={[styles.innerIcon, { backgroundColor: '#FFB503' }]}>
								<MaterialIcons name='menu-book' size={13} color='white' />
							</View>
						</View>
						<View style={styles.propertyAfter} />
					</View>
				</Marker>
			</MapView>
		</View>
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
	wrapper: {
		alignItems: 'center',
		justifyContent: 'center',
		position: 'relative',
		backgroundColor: 'transparent',
	},
	property: {
		backgroundColor: 'white',
		borderRadius: 15,
		height: 30,
		width: 30,
		padding: 2,
		alignItems: 'center',
		justifyContent: 'center',
		zIndex: 2,
	},
	innerIcon: {
		backgroundColor: '#FF7500',
		padding: 6,
		borderRadius: 100,
		alignItems: 'center',
		justifyContent: 'center',
	},
	propertyAfter: {
		position: 'absolute',
		top: 27.4,
		width: 0,
		height: 0,
		backgroundColor: 'transparent',
		borderLeftWidth: 9,
		borderRightWidth: 9,
		borderTopWidth: 9,
		borderLeftColor: 'transparent',
		borderRightColor: 'transparent',
		borderTopColor: 'white',

		zIndex: 1,
	},
	markerContainer: {
		alignItems: 'center',
		backgroundColor: 'transparent',
	},
	pin: {
		width: 40,
		height: 40,
		borderRadius: 20,
		backgroundColor: 'white',
		justifyContent: 'center',
		alignItems: 'center',
		shadowColor: '#000',
		shadowOpacity: 0,
		shadowRadius: 4,
		elevation: 5,
	},
	iconBackground: {
		width: 30,
		height: 30,
		borderRadius: 15,
		backgroundColor: 'orange',
		justifyContent: 'center',
		alignItems: 'center',
	},
	burgerIcon: {
		width: 20,
		height: 20,
		tintColor: 'white',
	},
});
