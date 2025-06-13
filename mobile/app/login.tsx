import { Text, View } from '@/components/Themed';
import { useAuth } from '@/utils/authContext';
import { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Button, Image, Input, SizableText, YStack } from 'tamagui';

const LoginScreen = () => {
  const { logIn } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <View style={styles.container}>
      <YStack width={320} gap="$2">
        <YStack marginBottom={30} gap="$4">
          <Image
            src={require('@/assets/images/kaist_logo.png')}
            width={'100%'}
            height={100}
            objectFit="contain"
          />
          <Text style={styles.title}>Welcome!</Text>
        </YStack>
        <YStack overflow="hidden">
          <Input
            value={email}
            onChangeText={setEmail}
            size="$5"
            placeholder="Email"
            borderBottomLeftRadius={0}
            borderBottomRightRadius={0}
            borderBottomWidth={0.5}
            inputMode="email"
            textContentType="emailAddress"
            autoCapitalize="none"
            autoCorrect={false}
            accessibilityLabel="Email Input"
          />
          <Input
            value={password}
            onChangeText={setPassword}
            size="$5"
            borderTopWidth={0.5}
            placeholder="Password"
            borderTopLeftRadius={0}
            borderTopRightRadius={0}
            textContentType="password"
            secureTextEntry={true}
            autoCapitalize="none"
            autoCorrect={false}
            accessibilityLabel="Password Input"
          />
        </YStack>
        <SizableText size="$3" fontWeight="500" paddingLeft={2} color={'#004191'}>
          Forgot Password?
        </SizableText>
        <Button
          backgroundColor={'#004191'}
          color={'white'}
          fontWeight="500"
          pressStyle={{ backgroundColor: '#004191' }}
          onPress={() => logIn(email, password)}
          aria-label="Login Button"
        >
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
        </Button>
      </YStack>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 35,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '100%',
  },
});

export default LoginScreen;
