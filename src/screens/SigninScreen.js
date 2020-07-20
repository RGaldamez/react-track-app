import React, {useState, useContext} from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {Text, Input, Button} from 'react-native-elements';
import {NavigationEvents} from 'react-navigation';
import Spacer from '../components/Spacer';
import {Context as AuthContext} from '../context/AuthContext';

const SigninScreen = ({navigation}) => {
  const {state, signin, clearErrorMessage} = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <View style={styles.container}>
      <NavigationEvents onWillBlur={clearErrorMessage} />
      <Spacer>
        <Text h3>Sign in to Tracker</Text>
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
      {state.errorMessage ? (
        <Text style={styles.errorMessage}>{state.errorMessage}</Text>
      ) : null}
      <Spacer>
        <Button title="Sign In" onPress={() => signin({email, password})} />
      </Spacer>
      <View style={styles.redirect}>
        <Text>Don't have an account?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
          <Text style={styles.signingRedirect}>Create new account</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

SigninScreen.navigationOptions = () => {
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
  errorMessage: {
    fontSize: 16,
    color: 'red',
    marginLeft: 10,
    marginBottom: 10,
  },
  signinHeader: {
    marginLeft: 10,
  },
  signingRedirect: {
    fontSize: 18,
    color: 'blue',
  },
  redirect: {
    flex: 1,
    alignItems: 'center',
  },
});

export default SigninScreen;
