import { imageMap } from '@/mock/image';
import { FacilityDTO } from '@/types/dto';
import { StyleSheet, Text, View } from 'react-native';
import { Image, YStack } from 'tamagui';
import DescriptionTabs from './Tabs/DescriptionTabs';

interface OpenedDescriptionProps {
  facility: FacilityDTO;
}

const OpenedDescription: React.FC<OpenedDescriptionProps> = (props) => {
  const { facility } = props;

  return (
    <>
      <View style={styles.imageRow}>
        <Image source={imageMap[facility.images[0]]} flex={2} height={200} />
        <YStack flex={1} gap={1}>
          <Image source={imageMap[facility.images[1]]} flex={1} width={'100%'} />
          <Image source={imageMap[facility.images[2]]} flex={1} width={'100%'} />
        </YStack>
        <YStack flex={1} gap={1}>
          <Image
            source={
              facility.images[3] ? imageMap[facility.images[3]] : imageMap[facility.images[1]]
            }
            flex={1}
            width={'100%'}
          />
          <Image
            source={
              facility.images[4] ? imageMap[facility.images[4]] : imageMap[facility.images[2]]
            }
            flex={1}
            width={'100%'}
          />
        </YStack>
      </View>
      <YStack paddingTop={10} paddingHorizontal={15} gap={5}>
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
      </YStack>
      <DescriptionTabs facilityId={facility.id} />
    </>
  );
};

export default OpenedDescription;

const styles = StyleSheet.create({
  imageRow: {
    flexDirection: 'row',
    marginTop: 5,
    gap: 1,
  },
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
  dot: {
    color: '#d3d3d3',
    fontSize: 10,
  },
});
