import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  CheckBox,
  ScrollView,
  KeyboardAvoidingView,
  Alert,
} from 'react-native';
import React, {useState, useContext} from 'react';
import {UserContext} from '../UserContext';

const Signup = props => {
  const {onRegister} = useContext(UserContext);
  const {navigation} = props;
  const [isShownPassword, setIsShownPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [errMess, setErrMess] = useState('');
  const [isValid, setIsValid] = useState(true);

  const onRegisterPress = async () => {
    if (password !== confirmPassword) {
      alert('Password not match');
      return;
    }
    const result = await onRegister(email, password);
    if (result) {
      navigation.navigate('Login');
    }else{
        Alert.alert('Error', 'Tài khoản đã tồn tại');
        setEmail('') ;
        setPassword('');
        setConfirmPassword('');
    }
  };
  const onChangeEmail = value => {
    const regex = /^[a-z]{3,}ps[0-9]{5}@fpt.edu.vn$/;
    if (!regex.test(value)) {
      setEmail(value);
      return;
    }
    if (regex.test(value)) {
      setEmail(value);
      return true;
    } else {
      setErrMess('Error!');
      setIsValid(false);
      return false;
    }
  };
  return (
    <ScrollView KeyboardAvoidingView={true} style={signupStyles.body}>
      <Text style={signupStyles.hello}>Hello!</Text>
      <Text style={signupStyles.welcome}>Signup to get Started</Text>
      <View style={signupStyles.usernameContainer}>
        <Text style={signupStyles.usernameLabel}>Username*</Text>
        <TextInput
          value={email}
          onChangeText={onChangeEmail}
          style={signupStyles.usernameInput}></TextInput>
        <Text disabled={!isValid} style={{color: 'red'}}>
          {errMess}
        </Text>
      </View>
      <View style={signupStyles.usernameContainer}>
        <Text style={signupStyles.usernameLabel}>Password*</Text>
        <View style={signupStyles.passwordInputContainer}>
          <TextInput
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!isShownPassword}
            style={signupStyles.usernameInput}
          />
          <Text
            style={signupStyles.eyeIcon}
            onPress={() => setIsShownPassword(!isShownPassword)}>
            {isShownPassword ? 'Hide' : 'Show'}
          </Text>
        </View>
        <Text style={signupStyles.errorUsername}>asdasd</Text>
      </View>
      <View style={signupStyles.usernameContainer}>
        <Text style={signupStyles.usernameLabel}>Confirm Password*</Text>
        <View style={signupStyles.passwordInputContainer}>
          <TextInput
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry={!isShownPassword}
            style={signupStyles.usernameInput}
          />
          <Text
            style={signupStyles.eyeIcon}
            onPress={() => setIsShownPassword(!isShownPassword)}>
            {isShownPassword ? 'Hide' : 'Show'}
          </Text>
        </View>
        <Text style={signupStyles.errorUsername}>asdasd</Text>
      </View>
      <View style={signupStyles.rememberme}>
        <View>
          <Text style={signupStyles.titleRememberme}>Rememeber me</Text>
        </View>
      </View>
      <Pressable
        onPress={onRegisterPress}
        style={signupStyles.buttonLoginContainer}>
        <Text style={signupStyles.buttonLoginLabel}>Register</Text>
      </Pressable>
      <Text style={signupStyles.orContinueWidth}>or continue width</Text>
      <View style={signupStyles.loginWithContanier}>
        <Pressable style={signupStyles.buttonLoginWithContainer}>
          <Image
            style={signupStyles.ggfbIcon}
            source={require('../../../media/fb.png')}></Image>
          <Text style={signupStyles.buttonLoginWithLabel}>Facebook</Text>
        </Pressable>
        <Pressable style={signupStyles.buttonLoginWithContainer}>
          <Image
            style={signupStyles.ggfbIcon}
            source={require('../../../media/gg.png')}></Image>
          <Text style={signupStyles.buttonLoginWithLabel}>Google</Text>
        </Pressable>
      </View>
      <Text style={signupStyles.orContinueWidth}>
        Already have an account ?
      </Text>
    </ScrollView>
  );
};

export default Signup;

const signupStyles = StyleSheet.create({
  errorUsername: {
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 21,
    letterSpacing: 0.12,
    color: 'red',
  },

  titleRememberme: {
    marginTop: 10,
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 21,
    letterSpacing: 0.12,
    color: '#4E4B66',
  },
  rememberme: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  ggfbIcon: {
    marginRight: 8,
  },
  buttonLoginWithLabel: {
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: 0.12,
    color: '#667080',
  },
  buttonLoginWithContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingVertical: 13,
    paddingHorizontal: 24,
    height: 48,
    width: 150,
    backgroundColor: '#EEF1F4',
    borderRadius: 6,
    marginTop: 18,
  },
  loginWithContanier: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  orContinueWidth: {
    marginTop: 16,
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 21,
    letterSpacing: 0.12,
    color: '#4E4B66',
    alignSelf: 'center',
  },
  buttonLoginLabel: {
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: 0.12,
    color: '#FFFFFF',
  },
  buttonLoginContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 13,
    paddingHorizontal: 24,
    height: 50,
    backgroundColor: '#1877F2',
    borderRadius: 6,
    marginTop: 18,
  },
  passwordInputContainer: {
    position: 'relative',
  },
  eyeIcon: {
    position: 'absolute',
    right: 10,
    top: 12,
  },
  usernameInput: {
    height: 48,
    width: '100%',
    padding: 10,
    gap: 10,
    backgroundColor: '#FFFFFF',
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#4E4B66',
  },
  usernameLabel: {
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 21,
    letterSpacing: 0.12,
    color: '#4E4B66',
  },
  usernameContainer: {
    marginTop: 48,
  },
  welcome: {
    width: 222,
    marginTop: 4,
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 20,
    lineHeight: 30,
    color: '#4E4B66',
    letterSpacing: 0.12,
  },
  hello: {
    fontSize: 48,
    fontWeight: '700',
    color: '#1877F2',
    lineHeight: 72,
    letterSpacing: 0.12,
  },
  body: {
    padding: 24,
    backgroundColor: 'while',
    width: '100%',
    height: '100%',
  },
});
