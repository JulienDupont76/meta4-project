import { imageMap } from '@/mock/image';
import { FacilityDTO } from '@/types/dto';
import { StyleSheet, Text, View } from 'react-native';
import { Image, YStack } from 'tamagui';
import DescriptionTabs from './DescriptionTabs';

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
          <Image source={imageMap[facility.images[1]]} flex={1} width={'100%'} />
          <Image source={imageMap[facility.images[2]]} flex={1} width={'100%'} />
        </YStack>
      </View>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{facility.name}</Text>
        <Text style={styles.type}>
          {facility.type.charAt(0).toUpperCase() + facility.type.slice(1)}
        </Text>
      </View>
      <DescriptionTabs />
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
    justifyContent: 'flex-end',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 10,
    paddingHorizontal: 15,
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
});
