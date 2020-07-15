import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {Text, Input, Button} from 'react-native-elements';
import Spacer from '../components/Spacer';
const SignupScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  return (
    <View style={styles.container}>
      <Spacer>
        <Text h3>Sign Up for Tracker</Text>
      </Spacer>

      <Input
        autoCapitalize="none"
        autoCorrect={false}
        label="Email"
        value={email}
        onChangeText={(email) => setEmail(email)}
      />

      <Input
        secureTextEntry={true}
        autoCapitalize="none"
        autoCorrect={false}
        label="Password"
        value={password}
        onChangeText={(password) => setPassword(password)}
      />

      <Spacer>
        <Button title="Sign Up" />
      </Spacer>
    </View>
  );
};

SignupScreen.navigationOptions = () => {
  return {
    header: () => false,
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    marginBottom: 150,
  },
});

export default SignupScreen;
