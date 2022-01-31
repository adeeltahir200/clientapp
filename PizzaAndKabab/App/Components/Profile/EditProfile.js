import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  StatusBar,
  Picker,
  TextInput,
  ImageBackground,
  Image,
  ActivityIndicator,
  ToastAndroid,
  //    SafeAreaView
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Input, Button } from 'react-native-elements';
import {
  colorWhite,
  colorBlack,
  lightBlack,
  phColor,
} from './../../../GlobalCons/colors';
//import ModalDropdown from 'react-native-modal-dropdown';
import { Divider } from '../CustomComponents/CustomSafeAreaView';
import { ListItem } from 'react-native-elements';
import ImagePicker from 'react-native-image-picker';
import { SafeAreaView } from 'react-navigation';
import SelectPicker from 'react-native-form-select-picker'; // Import the package
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import AsyncStorage from '@react-native-community/async-storage';
import NetInfo from '@react-native-community/netinfo';

export default class EditProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: '',
      email: '',
      phoneNo: '',
      gender: 'Male',
      maleFlag: true,
      femaleFlag: true,
      image: '',
      item: this.props.navigation.state.params.item,
      imageResponse: '',
      imageName: '',
      fileName: '',
      type: '',
    };
  }

  componentDidMount() {
    console.log('state', this.state.item);
    NetInfo.addEventListener(state => {
      if (!state.isConnected) {
        alert('Error:Please connect to internet.')
      }
    });
    this._navListener = this.props.navigation.addListener('willFocus', () => {
      StatusBar.setBarStyle('dark-content');
      StatusBar.setBackgroundColor('transparent');
      this.setState({
        userName: this.state.item.name,
        email: this.state.item.email,
        phoneNo: this.state.item.phone ? this.state.item.phone : "no number",
        gender: this.state.item.gender,
      });
    });
  }
  UpdateProfile = async () => {
    console.log(this.state.gender);
    let data = await AsyncStorage.getItem('token');
    var myHeaders = new Headers();
    myHeaders.append('Authorization', `Bearer ${data}`);
    myHeaders.append("Content-Type", "multipart/form-data",
      "otherHeader", "foo",
    )
    console.log(this.state.imageResponse);
    var formdata = new FormData();
    formdata.append('email', this.state.email);
    formdata.append('username', this.state.userName);
    formdata.append('phone', this.state.phoneNo);
    formdata.append('gender', this.state.gender);
    this.state.image && formdata.append('image', {
      uri: this.state.image,
      name: this.state.imageName,
      // filename: this.state.fileName,
      type: this.state.type,
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: formdata,
      redirect: 'follow',
    };

    fetch(
      'https://pizzakebab.ranglerztech.website/api/update-profile',
      requestOptions,
    )
      .then(response => response.text())
      .then(result => {
        let data = JSON.parse(result);
        if (data.status == 200) {
          this.setState({ loading: false });
          this.props.navigation.navigate('Profile');
          //alert(data.message);
        } else {
          this.setState({ loading: false });
          //alert(data.message);
        }
      })
      .catch(error => {
        this.setState({ loading: false });
        console.log(error);
        alert('error', error.message);
      });
  };
  imageUpload = async () => {
    const options = {
      // title: 'Log',
      // customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.showImagePicker(options, async response => {
      // console.log('Response = ', response);
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        let { image } = this.state;
        image = response.uri;
        console.log(response);
        this.setState({
          image,
          imageResponse: response.path,
          imageName: response.fileName,
          fileName: response.fileName,
          type: response.type,
        });

        console.log('Image', this.state.image, this.state.imageResponse, this.state.imageName, this.state.fileName, this.state.type);
      }
    });
  };
  render() {
    const { userName, email, phoneNo, gender } = this.state;
    if (Platform.OS === 'ios') {
      return (
        <>
          <View style={{ backgroundColor: '#f6f6f6', height: 10 }}>
            <StatusBar
              barStyle={'dark-content'}
              translucent
              backgroundColor={'#f6f6f6'}
            />
          </View>
          <SafeAreaView style={styles.container}>
            <View
              style={{
                height: responsiveHeight(16),
                width: responsiveWidth(100),
                backgroundColor: '#f6f6f6',
                // backgroundColor: 'red',
                flexDirection: 'row',
                alignItems: 'flex-end',
              }}>
              <View style={styles.headerleftContainer}>
                <TouchableOpacity
                  style={{ marginLeft: 30 }}
                  onPress={() => {
                    this.props.navigation.goBack();
                  }}>
                  <Ionicons
                    name={'ios-arrow-back'}
                    color={blueBG}
                    size={responsiveFontSize(3.5)}
                  />
                </TouchableOpacity>
              </View>
              <View style={styles.headerTitleContainer}>
                <Text style={styles.headerTextStyle1}>{'Edit Profile'}</Text>
              </View>
              <View style={styles.headerleftContainer}>
                {/*<TouchableOpacity
                  onPress={() => this.props.navigation.navigate('Profile')}>
                  <Text style={styles.headerTextStyle2}>{'Done'}</Text>
                </TouchableOpacity>*/}
              </View>
            </View>
            <KeyboardAwareScrollView>
              <View style={styles.container}>
                <Divider height={responsiveHeight(11)} />

                <View style={styles.card}>
                  <View style={styles.profileLeftContainer}>
                    {this.state.image !== '' ? (
                      <Image
                        source={{ uri: this.state.image }}
                        style={styles.profileImageStyle2}
                      />
                    ) : (
                        <Image
                          source={require('../../Assets/profile1.png')}
                          style={styles.profileImageStyle}
                        />
                      )}
                    <TouchableOpacity
                      activeOpacity={0.5}
                      style={{ position: 'absolute', top: responsiveHeight(12) }}
                      onPress={() => {
                        this.imageUpload();
                      }}>
                      <FontAwesome
                        name={'camera'}
                        color={'#696969'}
                        size={responsiveWidth(9)}
                      />
                    </TouchableOpacity>
                  </View>

                  <View
                    style={[
                      styles.inputMainContainer,
                      { marginTop: responsiveHeight(-5) },
                    ]}>
                    <View style={styles.inputLeftContainer}>
                      <Text style={styles.inputTextStyle1}>{'User name'}</Text>
                    </View>
                    <View style={styles.inputRightContainer}>
                      <TextInput
                        value={userName}
                        onChange={text => this.setState({ userName: text })}
                        placeholder={this.state.item.name}
                        placeholderTextColor={'#606060'}
                        style={styles.inputTextStyle2}
                      />
                    </View>
                  </View>
                  <View style={styles.line} />
                  <View
                    style={[
                      styles.inputMainContainer,
                      { marginTop: responsiveHeight(0) },
                    ]}>
                    <View style={styles.inputLeftContainer}>
                      <Text style={styles.inputTextStyle1}>{'Email'}</Text>
                    </View>
                    <View style={styles.inputRightContainer}>
                      <TextInput
                        value={email}
                        onChange={text => this.setState({ email: text })}
                        placeholder={this.state.item.email}
                        placeholderTextColor={'#606060'}
                        style={styles.inputTextStyle2}
                      />
                    </View>
                  </View>
                  <View style={styles.line} />
                  <View
                    style={[
                      styles.inputMainContainer,
                      { marginTop: responsiveHeight(0) },
                    ]}>
                    <View style={styles.inputLeftContainer}>
                      <Text style={styles.inputTextStyle1}>{'Phone'}</Text>
                    </View>
                    <View style={styles.inputRightContainer}>
                      <TextInput
                        value={phoneNo}
                        onChange={text => this.setState({ phoneNo: text })}
                        placeholder={this.state.item.phone}
                        keyboardType={'phone-pad'}
                        placeholderTextColor={'#606060'}
                        style={styles.inputTextStyle2}
                      />
                    </View>
                  </View>
                  <View style={styles.line} />
                  <View
                    style={[
                      styles.inputMainContainer,
                      { marginTop: responsiveHeight(0) },
                    ]}>
                    <View style={styles.inputLeftContainer}>
                      <Text style={styles.inputTextStyle1}>{'Gender'}</Text>
                    </View>
                    <View style={styles.inputRightContainer}>
                      {/* <TextInput
                                        value={gender}
                                        onChange={(text) => this.setState({ gender: text })}
                                        placeholder={'Piza1'}
                                        placeholderTextColor={'#606060'}
                                        style={styles.inputTextStyle2}
                                    /> */}
                      <SelectPicker
                        onValueChange={(itemValue, itemIndex) =>
                          this.setState({ gender: itemValue })
                        }
                        showIOS
                        placeholder={'Select'}
                        style={styles.inputTextStyle2}
                        placeholderStyle={{ color: 'darkgrey', fontSize: 13 }}
                        selected={this.state.gender}>
                        <SelectPicker.Item label="Male" value="Male" />
                        <SelectPicker.Item label="Female" value="Female" />
                      </SelectPicker>
                    </View>
                  </View>
                  <View style={styles.line} />
                </View>
              </View>
            </KeyboardAwareScrollView>

            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                width: responsiveWidth(100),
              }}>
              <TouchableOpacity
                style={{
                  marginRight: responsiveHeight(3),
                  height: responsiveHeight(7),
                  width: '70%',
                  backgroundColor: '#e12c2c',
                  marginBottom: responsiveHeight(1),
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: responsiveHeight(2),
                  // marginTop: responsiveHeight(8),
                }}
                onPress={() => this.props.navigation.goBack()}
                activeOpacity={0.7}>
                <Text
                  style={{
                    fontSize: responsiveFontSize(2),
                    fontWeight: 'bold',
                    color: 'white',
                  }}>
                  Save
                </Text>
              </TouchableOpacity>
            </View>
          </SafeAreaView>
        </>
      );
    } else if (Platform.OS === 'android') {
      return (
        <SafeAreaView forceInset={{ top: 'never' }} style={styles.container}>
          <StatusBar translucent backgroundColor="transparent" />

          <View style={styles.headerContainer}>
            <View style={styles.headerleftContainer}>
              <TouchableOpacity
                onPress={() => {
                  if (this.state.loading == true) {
                    ToastAndroid.show('Please wait', ToastAndroid.SHORT)
                  } else {
                    this.props.navigation.openDrawer()
                  }

                }}>
                <Image
                  source={require('../../Assets/icons-Menu-2.png')}
                  style={styles.headerImageStyle}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.headerTitleContainer}>
              <Text style={styles.headerTextStyle1}>{'Edit Profile'}</Text>
            </View>
            <View style={styles.headerleftContainer}>
              {/*<TouchableOpacity
                onPress={() => this.props.navigation.navigate('Profile')}>
                <Text style={styles.headerTextStyle2}>{'Done'}</Text>
              </TouchableOpacity>*/}
            </View>
          </View>
          <View style={styles.container}>
            <Divider height={responsiveHeight(15)} />
            <View style={styles.card}>
              <View style={styles.profileLeftContainer}>
                {this.state.image !== '' ? (
                  <Image
                    source={{ uri: this.state.image }}
                    style={styles.profileImageStyle2}
                  />
                ) : (
                    <Image
                      source={require('../../Assets/profile1.png')}
                      style={styles.profileImageStyle}
                    />
                  )}
                <TouchableOpacity
                  activeOpacity={0.5}
                  style={{ position: 'absolute', top: responsiveHeight(12) }}
                  onPress={() => {
                    this.imageUpload();
                  }}>
                  <FontAwesome
                    name={'camera'}
                    color={'#696969'}
                    size={responsiveWidth(9)}
                  />
                </TouchableOpacity>
              </View>

              <View
                style={[
                  styles.inputMainContainer,
                  { marginTop: responsiveHeight(-5) },
                ]}>
                <View style={styles.inputLeftContainer}>
                  <Text style={styles.inputTextStyle1}>{'User name'}</Text>
                </View>
                <View style={styles.inputRightContainer}>
                  <TextInput
                    value={this.state.userName}
                    onChangeText={text => {
                      console.log(text);
                      this.setState({ userName: text });
                    }}
                    placeholder={this.state.item.name}
                    placeholderTextColor={'#606060'}
                    style={styles.inputTextStyle2}
                  />
                </View>
              </View>
              <View style={styles.line} />
              <View
                style={[
                  styles.inputMainContainer,
                  { marginTop: responsiveHeight(0) },
                ]}>
                <View style={styles.inputLeftContainer}>
                  <Text style={styles.inputTextStyle1}>{'Email'}</Text>
                </View>
                <View style={styles.inputRightContainer}>
                  <TextInput
                    value={this.state.email}
                    onChangeText={text => this.setState({ email: text })}
                    placeholder={this.state.item.email}
                    placeholderTextColor={'#606060'}
                    style={styles.inputTextStyle2}
                  />
                </View>
              </View>
              <View style={styles.line} />
              <View
                style={[
                  styles.inputMainContainer,
                  { marginTop: responsiveHeight(0) },
                ]}>
                <View style={styles.inputLeftContainer}>
                  <Text style={styles.inputTextStyle1}>{'Phone'}</Text>
                </View>
                <View style={styles.inputRightContainer}>
                  <TextInput
                    value={this.state.phoneNo}
                    onChangeText={text => this.setState({ phoneNo: text })}
                    placeholder={this.state.item.phone}
                    maxLength={11}
                    keyboardType={'phone-pad'}
                    placeholderTextColor={'#606060'}
                    style={styles.inputTextStyle2}
                  />
                </View>
              </View>
              <View style={styles.line} />
              <View
                style={[
                  styles.inputMainContainer,
                  { marginTop: responsiveHeight(0) },
                ]}>
                <View style={styles.inputLeftContainer}>
                  <Text
                    style={{
                      fontSize: responsiveFontSize(2),
                      color: '#b0b0b0',
                      textAlignVertical: 'center',
                    }}>
                    {'Gender'}
                  </Text>
                </View>
                <View style={styles.inputRightContainer}>
                  {/* <TextInput
                                    value={gender}
                                    onChange={(text) => this.setState({ gender: text })}
                                    placeholder={'Piza1'}
                                    placeholderTextColor={'#606060'}
                                    style={styles.inputTextStyle2}
                                /> */}
                  <Picker
                    selectedValue={this.state.gender}
                    itemStyle={styles.inputTextStyle2}
                    style={[
                      styles.inputTextStyle2,
                      { height: '100%', width: '70%' },
                    ]}
                    onValueChange={(itemValue, itemIndex) =>
                      this.setState({ gender: itemValue })
                    }>
                    <Picker.Item label="Male" value="Male" />
                    <Picker.Item label="Female" value="Female" />
                  </Picker>
                </View>
              </View>
              <View style={styles.line} />
            </View>
          </View>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              width: responsiveWidth(100),
            }}>
            {this.state.loading ? (
              <View
                style={{
                  marginRight: responsiveHeight(3),
                  height: responsiveHeight(7),
                  width: '70%',
                  backgroundColor: '#e12c2c',
                  marginBottom: responsiveHeight(5),
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: responsiveHeight(2),
                  // marginTop: responsiveHeight(8),
                }}>
                <ActivityIndicator size={'small'} color="white" />
              </View>
            ) : (
                <TouchableOpacity
                  style={{
                    marginRight: responsiveHeight(3),
                    height: responsiveHeight(7),
                    width: '70%',
                    backgroundColor: '#e12c2c',
                    marginBottom: responsiveHeight(5),
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: responsiveHeight(2),
                    // marginTop: responsiveHeight(8),
                  }}
                  onPress={() => {
                    this.UpdateProfile();
                    this.setState({ loading: true });
                  }}
                  activeOpacity={0.7}>
                  <Text
                    style={{
                      fontSize: responsiveFontSize(2),
                      fontWeight: 'bold',
                      color: 'white',
                    }}>
                    Save
                </Text>
                </TouchableOpacity>
              )}
          </View>
        </SafeAreaView>
      );
    }
  }
}

const blueBG = '#393b82';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colorWhite,
  },
  headerContainer: {
    height: responsiveHeight(12),
    width: responsiveWidth(100),
    backgroundColor: '#f6f6f6',
    // backgroundColor: 'red',
    flexDirection: 'row',
    alignItems: 'flex-end',
    // alignSelf:'flex-end'
  },
  headerleftContainer: {
    height: responsiveHeight(9),
    width: '15%',
    // backgroundColor: 'green',
    justifyContent: 'center',
    // alignItems: 'center'
  },
  headerTitleContainer: {
    height: responsiveHeight(9),
    width: '70%',
    // backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerImageStyle: {
    marginTop: responsiveHeight(0.7),
    marginLeft: responsiveWidth(2),
    height: '80%',
    width: '80%',
    resizeMode: 'contain',
  },
  headerTextStyle1: {
    fontSize: responsiveFontSize(2.4),
    color: blueBG,
  },
  headerTextStyle2: {
    fontSize: responsiveFontSize(2),
    fontWeight: '900',
    color: '#eb3f3f',
  },
  card: {
    height: responsiveHeight(55),
    width: responsiveWidth(85),
    alignSelf: 'center',
    backgroundColor: colorWhite,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 10,
    borderRadius: responsiveWidth(2),
    alignItems: 'center',
  },
  profileLeftContainer: {
    // left:responsiveWidth(35),
    top: responsiveHeight(-10),
    height: responsiveHeight(20),
    width: responsiveHeight(20),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: responsiveHeight(11),
    backgroundColor: '#eaeaea',
    borderWidth: 1.5,
    borderColor: colorBlack,
  },
  profileImageStyle: {
    height: '60%',
    width: '60%',
    resizeMode: 'contain',
  },
  profileImageStyle2: {
    height: '100%',
    width: '100%',
    borderRadius: responsiveWidth(50),
    resizeMode: 'contain',
  },
  inputMainContainer: {
    height: responsiveHeight(9),
    width: '95%',
    alignSelf: 'center',
    // backgroundColor: 'red',
    // top: responsiveHeight(-5),
    // marginTop: responsiveHeight(-5),
    flexDirection: 'row',
    alignItems: 'center',
  },
  line: {
    marginTop: responsiveHeight(0.1),
    marginBottom: responsiveHeight(0.1),
    height: responsiveHeight(0.1),
    width: '95%',
    alignSelf: 'center',
    backgroundColor: '#d1d1d1',
  },
  inputLeftContainer: {
    height: '100%',
    width: '40%',
    // backgroundColor: 'green',
    justifyContent: 'center',
  },
  inputRightContainer: {
    height: '100%',
    width: '60%',
    // backgroundColor: 'blue',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  inputTextStyle1: {
    fontSize: responsiveFontSize(2),
    color: '#b0b0b0',
  },
  inputTextStyle2: {
    fontSize: responsiveFontSize(2),
    color: colorBlack,
  },
});
