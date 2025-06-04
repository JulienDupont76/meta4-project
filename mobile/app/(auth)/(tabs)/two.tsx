import { StyleSheet } from 'react-native';

import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed';
import { Button, Image, Input, SizableText, TextArea, XStack, YStack } from 'tamagui';
import { useQuery } from '@tanstack/react-query';
import { useAuth } from '@/utils/authContext';

export default function TabTwoScreen() {
  const { logOut } = useAuth();

  // const test = async () => {
  //   console.log('test');
  //   const response = await fetch('http://192.249.26.112:3333').catch((error) => {
  //     console.error('Error:', error);
  //   });
  //   console.log(response);
  //   if (!response.ok) {
  //     throw new Error('Network response was not ok');
  //   }
  //   const data = await response.json();
  //   console.log(data);
  //   return data;
  // };

  // const login = async () => {
  //   console.log('login');
  //   const response = await fetch('http://192.249.26.112:3333/auth/login', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({
  //       email: 'test',
  //       password: 'test',
  //     }),
  //   });
  //   console.log(response);
  //   if (!response.ok) {
  //     throw new Error('Network response was not ok');
  //   }
  //   const data = await response.json();
  //   console.log(data);
  //   return data;
  // };

  // const query = useQuery({ queryKey: ['login'], queryFn: test });

  return (
    <View style={styles.container}>
      <YStack flex={1} gap="$2" padding={20} justifyContent="center" alignItems="center">
        {/* <Image
          src={require('@/assets/images/kaist_logo.png')}
          width={'100%'}
          height={100}
          objectFit="contain"
        />
        <Text style={styles.title}>Welcome!</Text>
        <YStack overflow="hidden">
          <Input
            size="$5"
            placeholder="Email"
            borderBottomLeftRadius={0}
            borderBottomRightRadius={0}
            borderBottomWidth={0.5}
            inputMode="email"
            textContentType="emailAddress"
          />
          <Input
            size="$5"
            borderTopWidth={0.5}
            placeholder="Password"
            borderTopLeftRadius={0}
            borderTopRightRadius={0}
            textContentType="password"
            secureTextEntry={true}
          />
        </YStack>
        <SizableText size="$3" fontWeight="500" paddingLeft={2} color={'#004191'}>
          Forgot Password?
        </SizableText>
        <Button backgroundColor={'#004191'} color={'white'} fontWeight="500">
          Login
        </Button>

        <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
        <Button
          backgroundColor={'#004191'}
          color={'white'}
          fontWeight="500"
          pressStyle={{ backgroundColor: '#004191' }}
        >
          Sign Up
        </Button>
        <Button
          backgroundColor={'white'}
          borderWidth={1}
          borderColor={'#004191'}
          fontWeight="500"
          pressStyle={{ backgroundColor: 'transparant' }}
          onPress={logOut}
          icon={
            <Image
              src={require('@/assets/images/kaist.png')}
              width={30}
              height={30}
              position="absolute"
              left={15}
            />
          }
        >
          Continue with KAIST
        </Button> */}
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
