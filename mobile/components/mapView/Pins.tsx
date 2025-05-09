import { FacilityData, FacilityType } from '@/types/facility';
import { MaterialIcons } from '@expo/vector-icons';
import { View, StyleSheet } from 'react-native';
import { Marker } from 'react-native-maps';

interface PinsProps {
	coordinate: {
		latitude: number;
		longitude: number;
	};
	type: FacilityType;
}

const Pins: React.FC<PinsProps> = (props) => {
	const { coordinate, type } = props;

	return (
		<Marker coordinate={coordinate}>
			<View style={styles.container}>
				<View style={styles.pins}>
					<View
						style={[
							styles.iconBackground,
							{ backgroundColor: FacilityData[type].color },
						]}
					>
						<MaterialIcons
							name={FacilityData[type].icon}
							size={13}
							color='white'
						/>
					</View>
				</View>
				<View style={styles.tail} />
			</View>
		</Marker>
	);
};

const styles = StyleSheet.create({
	container: {
		alignItems: 'center',
		justifyContent: 'center',
		position: 'relative',
		backgroundColor: 'transparent',
	},
	pins: {
		backgroundColor: 'white',
		borderRadius: 15,
		height: 30,
		width: 30,
		padding: 2,
		alignItems: 'center',
		justifyContent: 'center',
		zIndex: 2,
	},
	iconBackground: {
		padding: 6,
		borderRadius: 100,
		alignItems: 'center',
		justifyContent: 'center',
	},
	tail: {
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
});

export default Pins;
