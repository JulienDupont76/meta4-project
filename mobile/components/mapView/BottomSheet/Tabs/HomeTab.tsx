import { useFont } from '@shopify/react-native-skia';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Bar, CartesianChart } from 'victory-native';
// @ts-ignore
import SpaceMono from '@/assets/fonts/SpaceMono-Regular.ttf';
import { Button, H5, Separator, SizableText, XStack, YStack } from 'tamagui';
import dayjs from 'dayjs';
import { useState } from 'react';
import { Feather } from '@expo/vector-icons';
import useHardware from '@/hooks/useHardware';
import useOccupancy from '@/hooks/useOccupancy';
import weeklyOccupancy from '@/mock/weeklyOccupancy.json';

type OccupancyRecord = { hour: string; occupancy: number };
const weeklyOccupancyData: Record<string, OccupancyRecord[]> = weeklyOccupancy;

// const sundayData = [
//   { hour: '8am', occupancy: 15 },
//   { hour: '9am', occupancy: 30 },
//   { hour: '10am', occupancy: 50 },
//   { hour: '11am', occupancy: 65 },
//   { hour: '12pm', occupancy: 90 },
//   { hour: '1pm', occupancy: 85 },
//   { hour: '2pm', occupancy: 70 },
//   { hour: '3pm', occupancy: 60 },
//   { hour: '4pm', occupancy: 65 },
//   { hour: '5pm', occupancy: 85 },
//   { hour: '6pm', occupancy: 80 },
//   { hour: '7pm', occupancy: 60 },
//   { hour: '8pm', occupancy: 40 },
//   { hour: '9pm', occupancy: 25 },
//   { hour: '10pm', occupancy: 10 },
// ];

// const mondayData = [
//   { hour: '8am', occupancy: 5 },
//   { hour: '9am', occupancy: 10 },
//   { hour: '10am', occupancy: 15 },
//   { hour: '11am', occupancy: 20 },
//   { hour: '12pm', occupancy: 30 },
//   { hour: '1pm', occupancy: 25 },
//   { hour: '2pm', occupancy: 20 },
//   { hour: '3pm', occupancy: 15 },
//   { hour: '4pm', occupancy: 20 },
//   { hour: '5pm', occupancy: 30 },
//   { hour: '6pm', occupancy: 25 },
//   { hour: '7pm', occupancy: 15 },
//   { hour: '8pm', occupancy: 10 },
//   { hour: '9pm', occupancy: 5 },
//   { hour: '10pm', occupancy: 0 },
// ];

// const tuesdayData = [
//   { hour: '8am', occupancy: 10 },
//   { hour: '9am', occupancy: 15 },
//   { hour: '10am', occupancy: 25 },
//   { hour: '11am', occupancy: 35 },
//   { hour: '12pm', occupancy: 50 },
//   { hour: '1pm', occupancy: 45 },
//   { hour: '2pm', occupancy: 30 },
//   { hour: '3pm', occupancy: 25 },
//   { hour: '4pm', occupancy: 30 },
//   { hour: '5pm', occupancy: 50 },
//   { hour: '6pm', occupancy: 45 },
//   { hour: '7pm', occupancy: 35 },
//   { hour: '8pm', occupancy: 25 },
//   { hour: '9pm', occupancy: 15 },
//   { hour: '10pm', occupancy: 5 },
// ];

// const wednesdayData = [
//   { hour: '8am', occupancy: 12 },
//   { hour: '9am', occupancy: 18 },
//   { hour: '10am', occupancy: 35 },
//   { hour: '11am', occupancy: 50 },
//   { hour: '12pm', occupancy: 75 },
//   { hour: '1pm', occupancy: 70 },
//   { hour: '2pm', occupancy: 55 },
//   { hour: '3pm', occupancy: 45 },
//   { hour: '4pm', occupancy: 50 },
//   { hour: '5pm', occupancy: 70 },
//   { hour: '6pm', occupancy: 60 },
//   { hour: '7pm', occupancy: 45 },
//   { hour: '8pm', occupancy: 30 },
//   { hour: '9pm', occupancy: 15 },
//   { hour: '10pm', occupancy: 5 },
// ];

// const thursdayData = [
//   { hour: '8am', occupancy: 8 },
//   { hour: '9am', occupancy: 12 },
//   { hour: '10am', occupancy: 20 },
//   { hour: '11am', occupancy: 40 },
//   { hour: '12pm', occupancy: 65 },
//   { hour: '1pm', occupancy: 60 },
//   { hour: '2pm', occupancy: 45 },
//   { hour: '3pm', occupancy: 35 },
//   { hour: '4pm', occupancy: 40 },
//   { hour: '5pm', occupancy: 65 },
//   { hour: '6pm', occupancy: 55 },
//   { hour: '7pm', occupancy: 40 },
//   { hour: '8pm', occupancy: 30 },
//   { hour: '9pm', occupancy: 20 },
//   { hour: '10pm', occupancy: 10 },
// ];

// const fridayData = [
//   { hour: '8am', occupancy: 10 },
//   { hour: '9am', occupancy: 20 },
//   { hour: '10am', occupancy: 30 },
//   { hour: '11am', occupancy: 50 },
//   { hour: '12pm', occupancy: 80 },
//   { hour: '1pm', occupancy: 75 },
//   { hour: '2pm', occupancy: 60 },
//   { hour: '3pm', occupancy: 50 },
//   { hour: '4pm', occupancy: 55 },
//   { hour: '5pm', occupancy: 85 },
//   { hour: '6pm', occupancy: 70 },
//   { hour: '7pm', occupancy: 60 },
//   { hour: '8pm', occupancy: 45 },
//   { hour: '9pm', occupancy: 30 },
//   { hour: '10pm', occupancy: 15 },
// ];

// const saturdayData = [
//   { hour: '8am', occupancy: 20 },
//   { hour: '9am', occupancy: 35 },
//   { hour: '10am', occupancy: 45 },
//   { hour: '11am', occupancy: 60 },
//   { hour: '12pm', occupancy: 85 },
//   { hour: '1pm', occupancy: 80 },
//   { hour: '2pm', occupancy: 65 },
//   { hour: '3pm', occupancy: 55 },
//   { hour: '4pm', occupancy: 60 },
//   { hour: '5pm', occupancy: 90 },
//   { hour: '6pm', occupancy: 75 },
//   { hour: '7pm', occupancy: 65 },
//   { hour: '8pm', occupancy: 50 },
//   { hour: '9pm', occupancy: 35 },
//   { hour: '10pm', occupancy: 20 },
// ];

// const weeklyOccupancy: Record<string, typeof sundayData> = {
//   '2025-06-08': sundayData,
//   '2025-06-09': mondayData,
//   '2025-06-10': tuesdayData, // busy today
//   '2025-06-11': wednesdayData, // quiet tomorrow
//   '2025-06-12': tuesdayData,
//   '2025-06-13': fridayData,
//   '2025-06-14': saturdayData,
// };

const generateNext7Days = () => {
  return [...Array(7)].map((_, i) => {
    const day = dayjs().add(i, 'day');
    return {
      label: i === 0 ? 'Today' : day.format('dddd'),
      value: day.format('YYYY-MM-DD'),
    };
  });
};

const dayOptions = generateNext7Days();

interface HomeTabProps {
  facilityId: number;
}

const HomeTab: React.FC<HomeTabProps> = (props) => {
  const { facilityId } = props;
  const font = useFont(SpaceMono, 12);

  const [selectedDay, setSelectedDay] = useState(dayOptions[0].value);

  const { data: firebaseData } = useHardware();
  const { data: facilityData } = useOccupancy(facilityId);

  const keys = Object.keys(firebaseData || {});
  const maxKey = Math.max(...keys.map((key) => Number(key)));
  const sensorData = firebaseData;

  console.log('Sensor Data:', sensorData);

  const level =
    facilityId === 3
      ? sensorData?.sensor_occupied
        ? 'high'
        : 'low'
      : facilityData?.occupancyLevel || 'low'; // Example level, can be 'low', 'medium', or 'high'
  const waitTime = facilityData?.waitingTime || 0; // Example wait time in minutes

  const data = {
    low: {
      color: 'green',
      label: 'Not busy',
    },
    medium: {
      color: 'orange',
      label: 'Moderate',
    },
    high: {
      color: 'red',
      label: 'Crowded',
    },
    closed: {
      color: 'gray',
      label: 'Closed',
    },
  };

  function formatWaitTime(minutes: number): string {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;

    if (hours > 0 && mins > 0) {
      return `${hours} hour${hours > 1 ? 's' : ''} ${mins} minute${mins > 1 ? 's' : ''}`;
    } else if (hours > 0) {
      return `${hours} hour${hours > 1 ? 's' : ''}`;
    } else {
      return `${mins} minute${mins > 1 ? 's' : ''}`;
    }
  }

  const selectedIndex = dayOptions.findIndex((day) => day.value === selectedDay);

  return (
    <View style={styles.container}>
      <YStack paddingTop="$2" paddingHorizontal={10} gap="$2">
        <H5 fontWeight="bold">Current Occupancy</H5>

        <XStack alignItems="center" gap="$3">
          <View
            style={{
              width: 10,
              height: '100%',
              backgroundColor: data[level].color,
              borderRadius: 3,
            }}
          ></View>
          <SizableText fontSize="$8">{data[level].label}</SizableText>
          <YStack flexShrink={1}>
            <SizableText color="gray" fontSize="$5" numberOfLines={2}>
              • {facilityId === 3 ? sensorData?.predicted_wait_formatted : formatWaitTime(waitTime)}{' '}
              estimated wait
            </SizableText>
            {facilityId === 3 && sensorData && (
              <>
                <SizableText color="gray" fontSize="$5" numberOfLines={2}>
                  • {sensorData.current_people} people currently inside
                </SizableText>
                <SizableText color="gray" fontSize="$5" numberOfLines={2}>
                  • {sensorData.current_distance.toPrecision(4) + 'cm queue length'}
                </SizableText>
              </>
            )}
          </YStack>
        </XStack>
      </YStack>
      <Separator />
      <XStack justifyContent="center" alignItems="center" gap="$2">
        {
          <TouchableOpacity
            style={selectedIndex === 0 ? { opacity: 0 } : {}}
            onPress={() => {
              if (selectedIndex > 0) {
                setSelectedDay(dayOptions[selectedIndex - 1].value);
              }
            }}
          >
            <Feather name="chevron-left" size={24} color={'black'} />
          </TouchableOpacity>
        }
        <Button
          width={120}
          fontSize="$5"
          size="$3"
          backgroundColor="#004191"
          disabled
          color={'white'}
          fontWeight="bold"
        >
          {dayOptions[selectedIndex].label}
        </Button>
        <TouchableOpacity
          style={selectedIndex === dayOptions.length - 1 ? { opacity: 0 } : {}}
          onPress={() => {
            if (selectedIndex < dayOptions.length - 1) {
              setSelectedDay(dayOptions[selectedIndex + 1].value);
            }
          }}
        >
          <Feather name="chevron-right" size={24} color={'black'} />
        </TouchableOpacity>
      </XStack>
      <View style={{ height: 150, paddingRight: 20 }}>
        <CartesianChart
          data={weeklyOccupancyData[selectedIndex]}
          xKey="hour"
          yKeys={['occupancy']}
          domainPadding={{ left: 50, right: 50, top: 30 }}
          axisOptions={{
            font,
            formatYLabel: (y) => `${y}`,
          }}
          xAxis={{ tickCount: weeklyOccupancyData[0].length / 2, font, lineWidth: 0 }}
        >
          {({ points, chartBounds }) => (
            <Bar
              points={points.occupancy}
              chartBounds={chartBounds}
              color="#004191"
              roundedCorners={{ topLeft: 10, topRight: 10 }}
            />
          )}
        </CartesianChart>
      </View>
    </View>
  );
};

export default HomeTab;

const styles = StyleSheet.create({ container: { flex: 1, gap: 12 } });
