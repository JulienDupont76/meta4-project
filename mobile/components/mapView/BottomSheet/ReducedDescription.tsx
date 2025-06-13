import { imageMap } from '@/mock/image';
import { FacilityDTO } from '@/types/dto';
import { StyleSheet, Text, View } from 'react-native';
import { Image } from 'tamagui';

interface ReducedDescriptionProps {
  facility: FacilityDTO;
}

const ReducedDescription: React.FC<ReducedDescriptionProps> = (props) => {
  const { facility } = props;

  return (
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
        {facility.images.slice(0, 3).map((imageName, index) => (
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
  );
};

export default ReducedDescription;

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
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
