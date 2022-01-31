import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  StatusBar,
  TextInput,
  ImageBackground,
  Image,
  ActivityIndicator,
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

import {
  colorWhite,
  colorBlack,
  lightBlack,
  phColor,
} from './../../../GlobalCons/colors';
//import ModalDropdown from 'react-native-modal-dropdown';
import {Divider} from '../CustomComponents/CustomSafeAreaView';
import CustomModal from '../CustomComponents/CustomModal';
import {ListItem, Input, Button} from 'react-native-elements';
import {SafeAreaView} from 'react-navigation';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import AsyncStorage from '@react-native-community/async-storage';
import NetInfo from '@react-native-community/netinfo'

export default class ChangePassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isVisible: false,
      old_password: '',
      new_password: '',
      conform_password: '',
      status: '',
      loading: false,
      matched: false,
    };
  }

  componentDidMount() {
    NetInfo.addEventListener(state => {
      if(!state.isConnected){
        alert('Error:Please connect to internet.')
      }
    });
    this._navListener = this.props.navigation.addListener('willFocus', () => {
      StatusBar.setBarStyle('dark-content');
      StatusBar.setBackgroundColor('transparent');
    });
  }
  changePassword = async () => {
    if (this.state.new_password == this.state.conform_password) {
      let data = await AsyncStorage.getItem('token');
      var myHeaders = new Headers();
      myHeaders.append('Authorization', `Bearer ${data}`);

      var formdata = new FormData();
      formdata.append('CurrentPassword', this.state.old_password);
      formdata.append('NewPassword', this.state.new_password);

      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: formdata,
        redirect: 'follow',
      };

      fetch(
        'https://pizzakebab.ranglerztech.website/api/change-password',
        requestOptions,
      )
        .then(response => response.text())
        .then(result => {
          let dataa = JSON.parse(result);
          console.log(dataa)
          this.setState({
            isVisible: true,
            status: dataa.message,
            loading: false,
          });
        })
        .catch(error => {
          this.setState({loading: false});
          console.log('error', error);
        });
    } else {
      this.setState({loading: false}, () => {
        this.setState({loading: !this.state.loading, matched: true});
        console.log(this.state.loading);
        // alert("password not matched")
      });
    }
  };
  render() {
    if (Platform.OS === 'ios') {
      return (
        <SafeAreaView style={styles.container}>
          <StatusBar backgroundColor="transparent" translucent={true} />
          {/* <Divider height={responsiveHeight(3)} /> */}
          <View
            style={{
              height: responsiveHeight(16),
              width: responsiveWidth(100),
              backgroundColor: '#f6f6f6',
              // backgroundColor: 'red',
              flexDirection: 'row',
              alignItems: 'flex-end',
            }}>
            {/* <Divider height={responsiveHeight(3)} /> */}
            <View style={styles.headerleftContainer}>
              <TouchableOpacity
                style={{
                  marginLeft: responsiveWidth(2),
                  justifyContent: 'center',
                  height: responsiveHeight(5),
                  width: responsiveWidth(10),
                  alignItems: 'center',
                }}
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
          </View>
          <KeyboardAwareScrollView>
            <View style={styles.container}>
              <Divider height={responsiveHeight(8)} />
              <View style={styles.titleContainer}>
                <Text style={styles.titleTextStyle}>{'Change Password '}</Text>
              </View>
              <Divider height={responsiveHeight(4)} />
              <Input
                placeholder="Old password"
                secureTextEntry={true}
                // placeholderTextColor={phColor}
                // inputStyle={{backgroundColor:'red'}}
                containerStyle={styles.inputContainer}
              />
              <Divider height={responsiveHeight(2)} />
              <Input
                placeholder="New password"
                secureTextEntry={true}
                // placeholderTextColor={phColor}
                // inputStyle={{backgroundColor:'red'}}
                containerStyle={styles.inputContainer}
              />
              <Divider height={responsiveHeight(2)} />
              <Input
                placeholder="Confirm password"
                secureTextEntry={true}
                // placeholderTextColor={phColor}
                // inputStyle={{backgroundColor:'red'}}
                containerStyle={styles.inputContainer}
              />
              <Divider height={responsiveHeight(8)} />
              <Button
                title="Change"
                onPress={() => this.setState({isVisible: true})}
                titleStyle={styles.buttonTitleStyle}
                buttonStyle={styles.buttonStyle}
                containerStyle={styles.buttonContainer}
              />
            </View>
          </KeyboardAwareScrollView>
          <CustomModal isVisible={this.state.isVisible}>
            <View style={{flex: 1}}>
              <Divider height={responsiveHeight(15)} />
              <View style={styles.modalMainContainer}>
                <View style={styles.modalImageContainer}>
                  <Image
                    source={require('../../Assets/lock-overturning.png')}
                    style={styles.modalImageStyle}
                  />
                </View>
                <View style={styles.modalTextContainer}>
                  <Text style={styles.modalTextStyle}>{this.state.status}</Text>
                </View>
                <Button
                  title="Done"
                  onPress={() => {
                    this.setState({isVisible: false});
                    this.props.navigation.navigate('Profile');
                  }}
                  titleStyle={styles.buttonTitleStyle}
                  buttonStyle={[
                    styles.buttonStyle,
                    {borderRadius: responsiveWidth(10)},
                  ]}
                  containerStyle={styles.modalButtonContainer}
                />
              </View>
            </View>
          </CustomModal>
        </SafeAreaView>
      );
    } else if (Platform.OS === 'android') {
      return (
        <SafeAreaView forceInset={{top: 'never'}} style={styles.container}>
          <StatusBar backgroundColor="transparent" translucent={true} />
          {/* <Divider height={responsiveHeight(3)} /> */}
          <View style={styles.headerContainer}>
            {/* <Divider height={responsiveHeight(3)} /> */}
            <View style={styles.headerleftContainer}>
              <TouchableOpacity
                onPress={() => this.props.navigation.openDrawer()}>
                <Image
                  source={require('../../Assets/icons-Menu-2.png')}
                  style={styles.headerImageStyle}
                />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.container}>
            <Divider height={responsiveHeight(8)} />
            <View style={styles.titleContainer}>
              <Text style={styles.titleTextStyle}>{'Change Password '}</Text>
            </View>
            <Divider height={responsiveHeight(4)} />
            <Input
              placeholder="Old password"
              value={this.state.old_password}
              onChangeText={text => this.setState({old_password: text})}
              secureTextEntry={true}
              // placeholderTextColor={phColor}
              // inputStyle={{backgroundColor:'red'}}
              containerStyle={styles.inputContainer}
            />
            <Divider height={responsiveHeight(2)} />
            <Input
              placeholder="New password"
              secureTextEntry={true}
              value={this.state.new_password}
              onChangeText={text => this.setState({new_password: text})}
              // placeholderTextColor={phColor}
              // inputStyle={{backgroundColor:'red'}}
              containerStyle={styles.inputContainer}
            />
            <Divider height={responsiveHeight(2)} />
            <Input
              placeholder="Confirm password"
              value={this.state.conform_password}
              onChangeText={text => this.setState({conform_password: text})}
              secureTextEntry={true}
              // placeholderTextColor={phColor}
              // inputStyle={{backgroundColor:'red'}}
              containerStyle={styles.inputContainer}
            />
            {this.state.conform_password == this.state.new_password&&this.state.matched ? (
              this.setState({matched: false},()=>{this.setState({matched:false})
              console.log("data",this.state.matched)
              })
            ) :this.state.matched ? (
              <Text
                style={[
                  styles.inputContainer,
                  
                  {marginTop: 6,color:red, marginLeft: responsiveWidth(5)},
                ]}>
                Password not matched
              </Text>
            ) :  null}
            <Divider height={responsiveHeight(8)} />
            {this.state.loading ? (
              <View
                style={[
                  styles.buttonContainer,
                  {
                    backgroundColor: '#eb3f3f',
                    justifyContent: 'center',
                    alignItems: 'center',
                  },
                ]}>
                <ActivityIndicator size={'small'} color="#393b82" />
              </View>
            ) : (
              <Button
                title="Change"
                onPress={() => {
                  this.changePassword();
                  this.setState({loading: true});
                }}
                titleStyle={styles.buttonTitleStyle}
                buttonStyle={styles.buttonStyle}
                containerStyle={styles.buttonContainer}
              />
            )}
          </View>
          <CustomModal isVisible={this.state.isVisible}>
            <View style={{flex: 1}}>
              <Divider height={responsiveHeight(15)} />
              <View style={styles.modalMainContainer}>
                <View style={styles.modalImageContainer}>
                  <Image
                    source={require('../../Assets/lock-overturning.png')}
                    style={styles.modalImageStyle}
                  />
                </View>
                <View style={styles.modalTextContainer}>
                  <Text style={styles.modalTextStyle}>{this.state.status}</Text>
                </View>
                <Button
                  title="Done"
                  onPress={() => {
                    if(this.state.status=="The current password field is required."){
                    this.setState({isVisible: false,loading:false});
                    }
                    else{
                    // console.log('wrong passwword')
                    this.setState({isVisible: false});
                    // this.props.navigation.navigate('Profile');
                    }
                  }}
                  titleStyle={styles.buttonTitleStyle}
                  buttonStyle={[
                    styles.buttonStyle,
                    {borderRadius: responsiveWidth(10)},
                  ]}
                  containerStyle={styles.modalButtonContainer}
                />
              </View>
            </View>
          </CustomModal>
        </SafeAreaView>
      );
    }
  }
}

const blueBG = '#393b82';
const red = '#eb3f3f';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colorWhite,
  },

  headerContainer: {
    // marginTop:responsiveHeight(10),
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
    width: '80%',
    // backgroundColor: 'green',
    justifyContent: 'center',
    // alignItems: 'center'
  },
  headerImageStyle: {
    marginTop: responsiveHeight(0.7),
    height: '70%',
    width: '20%',
    // height: responsiveHeight(4),
    // width: responsiveWidth(8),
    resizeMode: 'contain',
  },
  titleContainer: {
    height: responsiveHeight(10),
    width: responsiveWidth(90),
    // backgroundColor: 'red',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleTextStyle: {
    fontSize: responsiveFontSize(4),
    fontWeight: 'bold',
    color: blueBG,
  },
  inputContainer: {
    height: responsiveHeight(9),
    width: responsiveWidth(90),
    alignSelf: 'center',
    // backgroundColor: 'green',
    justifyContent: 'center',
  },
  buttonContainer: {
    height: responsiveHeight(8),
    width: responsiveWidth(80),
    alignSelf: 'center',
    // backgroundColor:red,
    //  backgroundColor: 'red',
    padding: 0,
  },
  buttonStyle: {
    height: '100%',
    width: '100%',
    // backgroundColor: '#303f88',
    backgroundColor: red,
    borderRadius: responsiveWidth(2),
  },
  buttonTitleStyle: {
    fontSize: responsiveFontSize(2.2),
    fontWeight: '900',
    color: colorWhite,
  },
  modalMainContainer: {
    height: responsiveHeight(60),
    width: responsiveWidth(85),
    alignSelf: 'center',
    backgroundColor: colorWhite,
    borderRadius: responsiveWidth(2),
    justifyContent: 'space-evenly',
    alignItems: 'center',
    padding: responsiveWidth(4),
  },
  modalImageContainer: {
    height: responsiveHeight(20),
    width: '80%',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalImageStyle: {
    height: '90%',
    width: '90%',
    resizeMode: 'contain',
  },
  modalTextContainer: {
    height: responsiveHeight(15),
    width: '90%',
    alignItems: 'center',
    // backgroundColor: 'red'
  },
  modalTextStyle: {
    fontSize: responsiveFontSize(3),
    fontWeight: 'bold',
    color: colorBlack,
    textAlign: 'center',
  },
  modalButtonContainer: {
    height: responsiveHeight(8),
    width: responsiveWidth(70),
    alignSelf: 'center',
    borderRadius: responsiveWidth(10),
    // backgroundColor:red,
    //  backgroundColor: 'red',
    padding: 0,
  },
});
