import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  CheckBox,
  Alert,
} from 'react-native';
import React, {useState, useContext, useCallback, useEffect} from 'react';
import {UserContext} from '../UserContext';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';

const Login = props => {
  const {navigation} = props;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isShownPassword, setIsShownPassword] = useState(false);

  const [loading, setLoading] = useState(false);

  const {onLogin} = useContext(UserContext);

  const onLoginPress = async () => {
    setLoading(true);
    const result = await onLogin(email, password);
    console.log('onLoginPress: ', result);
    if (!result) {
      Alert.alert('Error', 'Thong tin tai khoan khong chinh xac');
      setEmail('');
      setPassword('');
    }
    setLoading(false);
  };
  useEffect(() => {
    GoogleSignin.configure();
  }, []);
  const signInGoogle = useCallback(async () => {
    try {
      await GoogleSignin.hasPlayServices();
      await GoogleSignin.signOut();
      const userInfo = await GoogleSignin.signIn();
      console.log('google login userInfo:', userInfo);
    } catch (error) {
      switch (error.code) {
        case statusCodes.SIGN_IN_CANCELLED:
          console.log('SIGN_IN_CANCELLED');
          // sign in was cancelled
          break;
        case statusCodes.IN_PROGRESS:
          console.log('IN_PROGRESS');
          // operation (e.g. sign in) already in progress
          break;
        case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
          console.log('PLAY_SERVICES_NOT_AVAILABLE');
          // android only
          break;
        default:
          // some other error happened
          console.error('signInGoogle', error);
      }
    }
  });

  return (
    <View style={loginStyles.body}>
      <Text style={loginStyles.hello}>Hello</Text>
      <Text style={loginStyles.again}>Again!</Text>
      <Text style={loginStyles.welcome}>Welcome back you've been missed</Text>
      <View style={loginStyles.usernameContainer}>
        <Text style={loginStyles.usernameLabel}>Username*</Text>
        <TextInput
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
          placeholder="Enter your email"
          style={loginStyles.usernameInput}></TextInput>
      </View>
      <View style={loginStyles.usernameContainer}>
        <Text style={loginStyles.usernameLabel}>Password*</Text>
        <View style={loginStyles.passwordInputContainer}>
          <TextInput
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!isShownPassword}
            style={loginStyles.usernameInput}
          />
          <Text
            style={loginStyles.eyeIcon}
            onPress={() => setIsShownPassword(!isShownPassword)}>
            {isShownPassword ? 'Hide' : 'Show'}
          </Text>
        </View>
      </View>
      <View style={loginStyles.rememberme}>
        <View>
          <Text style={loginStyles.titleRememberme}>Rememeber me</Text>
        </View>
        <Text style={loginStyles.titleForgotPassWord}>
          Forgot the password ?
        </Text>
      </View>
      <Pressable
        onPress={onLoginPress}
        style={loginStyles.buttonLoginContainer}>
        <Text style={loginStyles.buttonLoginLabel}>
          {loading ? 'Loading...' : 'Login'}
        </Text>
      </Pressable>
      <Text style={loginStyles.orContinueWidth}>or continue width</Text>
      <View style={loginStyles.loginWithContanier}>
        <Pressable style={loginStyles.buttonLoginWithContainer}>
          <Image
            style={loginStyles.ggfbIcon}
            source={require('../../../media/fb.png')}></Image>
          <Text style={loginStyles.buttonLoginWithLabel}>Facebook</Text>
        </Pressable>
        <Pressable
          style={loginStyles.buttonLoginWithContainer}
          onPress={signInGoogle}>
          <Image
            style={loginStyles.ggfbIcon}
            source={require('../../../media/gg.png')}></Image>
          <Text style={loginStyles.buttonLoginWithLabel}>Google</Text>
        </Pressable>
      </View>
      <Text
        onPress={() => navigation.navigate('Signup')}
        style={loginStyles.orContinueWidth}>
        don't have a account ?
      </Text>
    </View>
  );
};

export default Login;
const loginStyles = StyleSheet.create({
  titleForgotPassWord: {
    marginTop: 10,
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 21,
    letterSpacing: 0.12,
    color: '#5890FF',
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
  again: {
    fontSize: 48,
    fontWeight: '700',
    color: '#1877F2',
    lineHeight: 72,
    letterSpacing: 0.12,
  },
  hello: {
    fontSize: 48,
    fontWeight: '700',
    color: '#050505',
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
