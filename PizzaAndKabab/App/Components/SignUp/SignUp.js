import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  StatusBar,
  TextInput,
  ImageBackground,
  Image,
  //SafeAreaView,
  Platform,
  ToastAndroid,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Input, Button } from 'react-native-elements';
import {
  colorWhite,
  colorBlack,
  sfRegular,
  phColor,
  blue,
} from './../../../GlobalCons/colors';
//import ModalDropdown from 'react-native-modal-dropdown';
import { Divider } from '../CustomComponents/CustomSafeAreaView';
import { color } from 'react-native-reanimated';
import { SafeAreaView } from 'react-navigation';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import AsyncStorage from '@react-native-community/async-storage';
import { ActivityIndicator } from 'react-native-paper';
import {
  AccessToken,
  LoginManager,
  GraphRequest,
  GraphRequestManager,
} from 'react-native-fbsdk';
import { GoogleSignin, statusCodes } from '@react-native-community/google-signin';
import Geolocation from '@react-native-community/geolocation';
import NetInfo from '@react-native-community/netinfo'
import CustomModal from '../CustomComponents/CustomModal';
//import TimeZone from 'react-native-timezone';

export default class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      username: '',
      loading: false,
      phone: '',
      lat: 'Europe/London',
      long: '',
      errormodalvisible: false,
      errormodalmessage: '',
    };
  }
  componentDidMount = async () => {
    NetInfo.addEventListener(state => {
      if (!state.isConnected) {
        alert('Error:Please connect to internet.')
      }
    });
    //const timeZone = await TimeZone.getTimeZone().then(zone => zone);
    //this.setState({ lat: timeZone });
    this._navListener = this.props.navigation.addListener('willFocus', () => {
      StatusBar.setBarStyle('light-content');
      StatusBar.setBackgroundColor('transparent');
    });
  };
  signInGoogle = async () => {
    try {
      this.setState({ googleloading: true });
      await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
      this.setState({ isLoading: true });
      const userInfo = await GoogleSignin.signIn();
      let info = userInfo.user;
      // console.log('googgle User Data', info)

      var formdata = new FormData();
      formdata.append('email', info.email);
      formdata.append('social_id', info.id);
      formdata.append('login_type', 'google');
      formdata.append('name', info.name);
      formdata.append('image', info.photo);
      formdata.append('phone', '0');
      formdata.append('timezone', this.state.lat);

      var requestOptions = {
        method: 'POST',
        body: formdata,
        redirect: 'follow',
      };

      fetch(
        'https://pizzakebab.ranglerztech.website/api/user-social-login',
        requestOptions,
      )
        .then(response => response.text())
        .then(async result => {
          let data = JSON.parse(result);
          if (data.successData) {
            await AsyncStorage.setItem('token', data.successData.accessToken);
            this.props.navigation.navigate('Resturents');
            // console.log(result, 'test');
            this.setState({ googleloading: false });
          } else {
            this.setState({ loading: false });
            //alert(data.message);
            this.setState({ errormodalmessage: data.message })
            this.setState({ errormodalvisible: true })
            // console.log(result, 'test');
            this.setState({ googleloading: false });
          }
        })
        .catch(error => {
          console.log('error=>', error);
          this.setState({ googleloading: false });
        });
    } catch (error) {
      console.log('Message', error.message);
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log('User Cancelled the Login Flow');
        this.setState({ googleloading: false });
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log('Signing In');
        this.setState({ loading: false });
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        this.setState({ googleloading: false });
        this.setState({ errormodalmessage: 'Play Services Not Available or Outdated' })
        this.setState({ errormodalvisible: true })
        //console.log('Play Services Not Available or Outdated');
      } else {
        console.log('Some Other Error Happened', error.message);
        this.setState({ errormodalmessage: error.message })
        this.setState({ errormodalvisible: true })
        this.setState({ googleloading: false });
        // this._getCurrentUserInfo()
      }
    }
  };
  SignUp() {
    if (this.state.email == '' || this.state.username == '' || this.state.phone == '' || this.state.password == '') {
      ToastAndroid.show('Please enter all the fields', ToastAndroid.LONG);
      this.setState({ loading: false });
    } else {

      var myHeaders = new Headers();
      var formdata = new FormData();
      formdata.append('email', this.state.email);
      formdata.append('username', this.state.username);
      formdata.append('phone', this.state.phone);
      formdata.append('password', this.state.password);
      formdata.append('timezone', this.state.lat);

      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: formdata,
        redirect: 'follow',
      };

      fetch(
        'https://pizzakebab.ranglerztech.website/api/user-register',
        requestOptions,
      )
        .then(response => response.text())
        .then(async result => {
          let data = JSON.parse(result);
          if (data.successData) {
            this.setState({ loading: false });
            await AsyncStorage.setItem('token', data.successData.accessToken);
            this.props.navigation.navigate('Resturents');
            console.log(result, 'test');
          } else {
            this.setState({ loading: false });
            this.setState({ errormodalmessage: data.message })
            this.setState({ errormodalvisible: true })
            //alert(data.message);
            console.log(result, 'test');
          }
        })
        .catch(error => {
          this.setState({ loading: false });
          this.setState({ errormodalmessage: error.toString() })
          this.setState({ errormodalvisible: true })
          //console.log('error', error);
        });
    }
  }
  _responseInfoCallback = (error, result) => {
    if (error) {
      //alert('Error fetching data: ' + error.toString());
      this.setState({ errormodalmessage: error.toString() })
      this.setState({ errormodalvisible: true })
    } else {
      var myHeaders = new Headers();
      var formdata = new FormData();
      formdata.append('email', result.email);
      formdata.append('social_id', 'e3a31c892c896d2b2935e9e670486768');
      formdata.append('name', result.name);
      formdata.append('login_type', 'facebook');
      formdata.append('timezone', this.state.lat);

      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: formdata,
        redirect: 'follow',
      };

      fetch(
        'https://pizzakebab.ranglerztech.website/api/user-social-login',
        requestOptions,
      )
        .then(response => response.text())
        .then(async result => {
          let data = JSON.parse(result);
          if (data.successData) {
            this.setState({ loading: false });
            await AsyncStorage.setItem('token', data.successData.accessToken);
            this.props.navigation.navigate('Resturents');
            console.log(result, 'test');
          } else {
            this.setState({ loading: false });
            this.setState({ errormodalmessage: data.message })
            this.setState({ errormodalvisible: true })
            //alert(data.message);
            //console.log(result, 'test');
          }
        })
        .catch(error => {
          this.setState({ loading: false });
          this.setState({ errormodalmessage: 'Sorry request failed please try again' })
          this.setState({ errormodalvisible: true })
          //alert('error', error);
        });
    }
  };

  LoginWithFb = async () => {
    try {
      let result = await LoginManager.logInWithPermissions([
        'public_profile',
        'email',
      ]);
      if (result.isCancelled) {
        //alert('Login was Cancelled');
      } else {
        AccessToken.getCurrentAccessToken().then(data => {
          //alert(JSON.stringify(data))
          this.callback(data.accessToken);
          if (!result.isCancelled) {
            this.props.navigation.navigate('UserInfo')
          }
        });
        console.log(result);
        // alert("login was successful with permission :"
        //     + result.grantedPermissions.toString()
        // )
      }
    } catch (error) {
      this.setState({ loading: false });
      this.setState({ errormodalmessage: data.message })
      this.setState({ errormodalvisible: true })
      //alert('login field with error :' + error);
    }
  };
  callback = token => {
    // console.log(
    //   token,
    //   new GraphRequestManager().addRequest(infoRequest).start(),
    // );
    const infoRequest = new GraphRequest(
      '/me?fields=name,picture,email',
      {
        accessToken: token,
        prameters: {
          fields: {
            string: 'email , name,first_name, middle_name, last_name',
          },
        },
      },
      this._responseInfoCallback,
    );

    new GraphRequestManager().addRequest(infoRequest).start();
  };
  render() {
    return (
      <SafeAreaView
        forceInset={{ top: 'never', bottom: 'never' }}
        style={styles.container}>
        <StatusBar backgroundColor="transparent" />
        <CustomModal isVisible={this.state.errormodalvisible}>
          <View
            style={{
              flex: 1,
              alignSelf: 'center',
              justifyContent: 'center',
            }}>
            {/* <Divider height={responsiveHeight(15)} /> */}
            <View style={styles.modalMainContainer}>
              <View style={styles.modalImageContainer}>
                <Image
                  source={require('../../Assets/Group9564.png')}
                  style={styles.modalImageStyle}
                />
              </View>
              <View style={styles.modalTextContainer}>
                <Text style={{
                  fontSize: responsiveFontSize(2.5),
                  fontWeight: 'bold',
                  color: '#e12c2c',
                  textAlign: 'center',
                  color: blue
                }}>
                  {this.state.errormodalmessage}
                </Text>
              </View>
              {/*<TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => {
                    this.setState({ isVisible: false });
                    this.props.navigation.navigate('TrackOrder');
                  }}>
                  <Text style={styles.modalDecTextStyle}>
                    You can track the delivery in the{' '}
                    <Text style={{ color: '#393b82' }}>"Track Order"</Text>{' '}
                      section
                    </Text>
                </TouchableOpacity>*/}
              <TouchableOpacity
                style={{ backgroundColor: blue, height: '10%', width: '90%', borderRadius: 30, justifyContent: 'center', alignItems: 'center' }}
                onPress={() => {
                  this.setState({ errormodalvisible: false })
                }}
              >
                <Text style={{ color: 'white', fontWeight: 'bold' }}>
                  OK
                  </Text>
              </TouchableOpacity>
              {/*<Button
                  title="Ok"
                  onPress={() => {
                    //this.props.navigation.navigate('Resturents');
                    this.setState({ isVisible: false });
                  }}
                  titleStyle={styles.buttonTitleStyle}
                  buttonStyle={[
                    styles.buttonStyle,
                    { borderRadius: responsiveWidth(10) },
                  ]}
                  containerStyle={styles.modalButtonContainer}
                />*/}
            </View>
          </View>
        </CustomModal>
        <ImageBackground
          style={styles.container}
          source={require('../../Assets/Image2.jpg')}
          imageStyle={{ resizeMode: 'cover' }}>
          <LinearGradient
            colors={['rgba(0,0,0,0.4) ', 'rgba(0,0,0,1)']}
            start={{ x: 1, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.linearGradient}>
            {/* <View
              style={[styles.container, {backgroundColor: 'rgba(0,0,0,1)'}]}> */}
            <Divider height={responsiveHeight(4)} />
            <Divider height={responsiveHeight(8)} />
            <View style={styles.titleContainer}>
              <Text style={styles.titleTextStyle1}>{'Welcome!'}</Text>
            </View>
            {/*<KeyboardAwareScrollView>*/}
            <Divider height={responsiveHeight(2)} />
            {/* <View style={styles.inputContainer}> */}

            <Input
              placeholder="Email"
              placeholderTextColor={phColor}
              inputContainerStyle={styles.inputContainerStyle}
              containerStyle={styles.inputContainer}
              inputStyle={styles.inputTextStyle}
              value={this.state.email}
              onChangeText={text => {
                this.setState({ email: text });
              }}
            />
            <Input
              placeholder="Username"
              placeholderTextColor={phColor}
              inputContainerStyle={styles.inputContainerStyle}
              containerStyle={styles.inputContainer}
              inputStyle={styles.inputTextStyle}
              value={this.state.username}
              onChangeText={text => {
                this.setState({ username: text });
              }}
            />
            <Input
              placeholder="Phone number"
              placeholderTextColor={phColor}
              inputContainerStyle={styles.inputContainerStyle}
              containerStyle={styles.inputContainer}
              inputStyle={styles.inputTextStyle}
              keyboardType="phone-pad"
              value={this.state.phone}
              onChangeText={text => {
                this.setState({ phone: text });
              }}
            />
            {/* <Divider height={responsiveHeight(1)} /> */}
            <Input
              placeholder="Password"
              secureTextEntry={true}
              placeholderTextColor={phColor}
              inputContainerStyle={[
                styles.inputContainerStyle,
                { borderBottomWidth: responsiveHeight(0.085) },
              ]}
              containerStyle={styles.inputContainer}
              inputStyle={styles.inputTextStyle}
              value={this.state.password}
              onChangeText={text => {
                this.setState({ password: text });
              }}
            />
            <Divider height={responsiveHeight(4)} />
            {this.state.loading ? (
              <View
                style={[
                  styles.buttonContainer,
                  { justifyContent: 'center', alignItems: 'center' },
                ]}>
                <ActivityIndicator size={'small'} color="#FFF" />
              </View>
            ) : (
                <Button
                  title="SIGN UP"
                  onPress={() => {
                    this.setState({ loading: true });
                    this.SignUp();
                  }}
                  titleStyle={styles.buttonTitleStyle}
                  buttonStyle={styles.buttonStyle}
                  containerStyle={styles.buttonContainer}
                />
              )}
            <Divider height={responsiveHeight(2)} />
            <Button
              onPress={() => this.LoginWithFb()}
              title="connect with Facebook"
              titleStyle={styles.buttonTitleStyle}
              icon={
                <FontAwesome
                  name={'facebook'}
                  size={responsiveWidth(6.5)}
                  color={colorWhite}
                  style={{ marginRight: responsiveWidth(2) }}
                />
              }
              buttonStyle={[styles.buttonStyle, { backgroundColor: '#2b71b8' }]}
              containerStyle={styles.buttonContainer}
            />
            <Divider height={responsiveHeight(2)} />
            <Button
              title="connect with Google"
              onPress={() => {
                this.signInGoogle();
              }}
              icon={
                <FontAwesome
                  name={'google'}
                  size={responsiveWidth(6.5)}
                  color={colorWhite}
                  style={{ marginRight: responsiveWidth(3.5) }}
                />
              }
              titleStyle={styles.buttonTitleStyle}
              buttonStyle={[styles.buttonStyle, { backgroundColor: '#dc4b3e' }]}
              containerStyle={styles.buttonContainer}
            />

            <Divider height={responsiveHeight(4.5)} />
            <TouchableOpacity
              activeOpacity={0.5}
              style={{ alignItems: 'center' }}
              onPress={() => this.props.navigation.navigate('Login')}>
              <Text style={styles.titleTextStyle3}>
                {'Already have an account?  '}
                <Text
                  style={{
                    textDecorationColor: colorWhite,
                    textDecorationLine: 'underline',
                  }}>
                  {'Sign in'}
                </Text>
              </Text>
            </TouchableOpacity>
            {/*</KeyboardAwareScrollView>*/}
            {/* </View> */}
          </LinearGradient>
        </ImageBackground>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 5,
    // zIndex:1
  },
  container: {
    flex: 1,
    // zIndex:0
    // backgroundColor: colorWhite,
  },
  titleContainer: {
    // height: responsiveHeight(15),
    width: responsiveWidth(85),
    alignSelf: 'center',
    // backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleTextStyle1: {
    fontSize: responsiveFontSize(5),
    fontWeight: 'bold',
    color: colorWhite,
  },
  titleTextStyle2: {
    fontSize: responsiveFontSize(2.2),
    fontWeight: '900',
    color: colorWhite,
  },
  inputContainer: {
    height: responsiveHeight(9),
    width: responsiveWidth(85),
    // backgroundColor: 'red',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  inputContainerStyle: {
    // backgroundColor:'green',
    borderBottomWidth:
      Platform.Version <= 28 ? responsiveHeight(0.1) : responsiveHeight(0.08),
    borderBottomColor: colorWhite,
  },
  inputTextStyle: {
    fontSize: responsiveFontSize(2),
    fontWeight: '900',
    color: colorWhite,
  },
  buttonContainer: {
    height: responsiveHeight(7.5),
    width: responsiveWidth(80),
    alignSelf: 'center',
    backgroundColor: '#303f88',
    padding: 0,
  },
  buttonStyle: {
    height: '100%',
    width: '100%',
    backgroundColor: '#303f88',
    borderRadius: responsiveWidth(2),
  },
  buttonTitleStyle: {
    fontSize: responsiveFontSize(2),
    fontWeight: '900',
    color: colorWhite,
  },
  titleTextStyle3: {
    fontSize: responsiveFontSize(1.8),
    fontWeight: '900',
    color: colorWhite,
  },
});
