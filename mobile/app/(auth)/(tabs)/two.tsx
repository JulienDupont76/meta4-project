import { StyleSheet } from 'react-native';

import { View } from '@/components/Themed';
import { Button, YStack } from 'tamagui';
import { useAuth } from '@/utils/authContext';

export default function TabTwoScreen() {
  const { logOut } = useAuth();

  return (
    <View style={styles.container}>
      <YStack flex={1} gap="$2" padding={20} justifyContent="center" alignItems="center">
        <Button
          backgroundColor={'white'}
          borderWidth={1}
          borderColor={'#004191'}
          fontWeight="500"
          pressStyle={{ backgroundColor: 'transparant' }}
          onPress={logOut}
        >
          Log out
        </Button>
      </YStack>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '100%',
  },
});
