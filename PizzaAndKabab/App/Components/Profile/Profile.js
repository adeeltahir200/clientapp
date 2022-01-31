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
import { colorWhite, colorBlack, lightBlack } from './../../../GlobalCons/colors';
//import ModalDropdown from 'react-native-modal-dropdown';
import { Divider } from '../CustomComponents/CustomSafeAreaView';
import { ListItem, Icon } from 'react-native-elements';
import { SafeAreaView } from 'react-navigation';
import { ActivityIndicator } from 'react-native-paper';
import AsyncStorage from '@react-native-community/async-storage';
import NetInfo from '@react-native-community/netinfo'

export default class Profile extends Component {
  state = {
    loading: true,
    data: '',
  };
  componentDidMount = async () => {
    NetInfo.addEventListener(state => {
      if (!state.isConnected) {
        alert('Error:Please connect to internet.')
      }
    });
    this._navListener = this.props.navigation.addListener('willFocus', async () => {
      let dataa = await AsyncStorage.getItem('token');
      var myHeaders = new Headers();
      myHeaders.append('Authorization', `Bearer ${dataa}`);

      var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow',
      };

      fetch(
        'https://pizzakebab.ranglerztech.website/api/user-data',
        requestOptions,
      )
        .then(response => response.text())
        .then(result => {
          let dataa = JSON.parse(result);
          if (dataa.status == 200) {
            //alert(JSON.stringify(dataa.successData))
            this.setState({ data: dataa.successData, loading: false });
          } else {
            alert(dataa.message);
          }
        })
        .catch(error => alert('error', error));
      StatusBar.setBarStyle('light-content');
      StatusBar.setBackgroundColor('transparent');
    });
  };
  render() {
    return (
      <SafeAreaView forceInset={{ top: 'never' }} style={styles.container}>
        <StatusBar backgroundColor={blueBG} translucent={true} />

        <View style={styles.container}>
          <View style={styles.headerMainContainer}>
            <Divider height={responsiveHeight(3)} />
            <View style={styles.headerContainer}>
              <View style={styles.headerleftContainer}>
                <TouchableOpacity
                  style={{ marginTop: 55, marginLeft: 5 }}
                  style={{
                    width: 50,
                    marginTop: 10,
                    height: 40,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                  onPress={() => {
                    this.props.navigation.goBack();
                  }}>
                  <Icon
                    name={'chevron-left'}
                    type='font-awesome'
                    color={colorWhite}
                    size={responsiveFontSize(3.5)}
                  />
                </TouchableOpacity>
                <Text style={styles.headerTitleTextStyle1}>{'Profile'}</Text>
              </View>
              <View style={styles.headerRightContainer}>
                <TouchableOpacity
                  onPress={() =>
                    this.props.navigation.navigate('EditProfile', {
                      item: this.state.data,
                    })
                  }>
                  <Text style={styles.headerTitleTextStyle2}>{'Edit'}</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          {this.state.loading ? (
            <View
              style={[
                styles.container,
                {
                  height: responsiveHeight(100),
                  justifyContent: 'center',
                  alignItems: 'center',
                },
              ]}>
              <ActivityIndicator
                size="large"
                // styles={{]}}
                color="#393b82"
              />
            </View>
          ) : (
              <View>
                <View style={styles.profileMainContainer}>
                  <Divider height={responsiveHeight(1)} />
                  <View style={styles.profileContainer}>
                    <View style={styles.profileLeftContainer}>
                      {this.state.data.image ? (
                        <Image
                          source={{ uri: this.state.data.image }}
                          style={styles.profile}
                        />
                      ) : (
                          <Image
                            source={require('../../Assets/profile1.png')}
                            style={styles.profileImageStyle}
                          />
                        )}
                    </View>
                    <View style={styles.profileRightContainer}>
                      <View style={styles.profileRightTextContainer1}>
                        <Text style={styles.prfileTextStyle1}>
                          {this.state.data.name}
                        </Text>
                        <AntDesign
                          name={'checkcircle'}
                          size={responsiveWidth(6)}
                          color={'#67cd00'}
                        />
                      </View>
                      <Text style={styles.prfileTextStyle2}>
                        {this.state.data.email}
                      </Text>
                    </View>
                  </View>
                  <Divider height={responsiveHeight(0.57)} />
                  <View style={styles.line} />
                  {/*<View style={styles.profileContainer1}>*/}
                  <TouchableOpacity
                    style={styles.profileContainer1}
                    onPress={() => {
                      this.props.navigation.navigate('Topup')
                    }}
                  >
                    <Text style={styles.walletTextStyle}>{'Wallet'}</Text>
                    <View style={styles.walletContainer}>
                      <FontAwesome5
                        name={'pound-sign'}
                        size={responsiveWidth(4)}
                        color={'#eb3f3f'}
                      />
                      <Text style={styles.walletTextStyle1}>{this.state.data.wallet/100}</Text>
                    </View>
                  </TouchableOpacity>
                  {/*</View>*/}
                </View>
                <View style={styles.cardContainer}>
                  <ListItem
                    title={'Payment Method'}
                    titleStyle={[
                      styles.prfileTextStyle1,
                      { fontWeight: 'bold', fontSize: responsiveFontSize(2) },
                    ]}
                    subtitle={'Add a credit or debit card'}
                    subtitleStyle={styles.prfileTextStyle2}
                    rightIcon={
                      <Icon
                        name={'chevron-right'}
                        color={'#565656'}
                        type='font-awesome'
                        size={responsiveWidth(5)}
                      />
                    }
                    containerStyle={styles.cardItem}
                    underlayColor={colorWhite}
                    onPress={() => {
                      console.log('Click');
                      this.props.navigation.navigate('Payment')
                    }}
                  />
                  <View style={styles.line2} />

                  <ListItem
                    title={'Address'}
                    titleStyle={[
                      styles.prfileTextStyle1,
                      { fontWeight: 'bold', fontSize: responsiveFontSize(2) },
                    ]}
                    subtitle={'Add or remove delivery address'}
                    subtitleStyle={styles.prfileTextStyle2}
                    rightIcon={
                      <Icon
                        name={'chevron-right'}
                        color={'#565656'}
                        type='font-awesome'
                        size={responsiveWidth(5)}
                      />
                    }
                    containerStyle={styles.cardItem}
                    underlayColor={colorWhite}
                    onPress={() =>
                      this.props.navigation.navigate('DeliveryAddress', { item: 1 })
                    }
                  />
                  <View style={styles.line2} />
                  <ListItem
                    title={'Password'}
                    titleStyle={[
                      styles.prfileTextStyle1,
                      { fontWeight: 'bold', fontSize: responsiveFontSize(2) },
                    ]}
                    subtitle={'Change your password'}
                    subtitleStyle={styles.prfileTextStyle2}
                    rightIcon={
                      <Icon
                        name={'chevron-right'}
                        color={'#565656'}
                        type='font-awesome'
                        size={responsiveWidth(5)}
                      />
                    }
                    containerStyle={styles.cardItem}
                    underlayColor={colorWhite}
                    onPress={() =>
                      this.props.navigation.navigate('ChangePassword')
                    }
                  />
                  <View style={styles.line2} />
                </View>
              </View>
            )}
        </View>
      </SafeAreaView>
    );
  }
}

const blueBG = '#393b82';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colorWhite,
  },
  headerMainContainer: {
    height: responsiveHeight(30),
    width: responsiveWidth(100),
    backgroundColor: blueBG,
  },
  headerContainer: {
    height: responsiveHeight(10),
    width: responsiveWidth(100),
    // backgroundColor: 'red',
    flexDirection: 'row',
    alignItems: 'center',
    // alignSelf:'flex-end'
  },
  headerleftContainer: {
    height: '100%',
    width: '80%',
    // backgroundColor: 'green',
    justifyContent: 'center',
    // alignItems: 'center'
  },
  headerRightContainer: {
    height: '100%',
    width: '20%',
    // backgroundColor: 'yellow',

    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitleTextStyle1: {
    fontSize: responsiveFontSize(4),
    fontWeight: 'bold',
    color: colorWhite,
    marginLeft: responsiveWidth(5),
  },
  headerTitleTextStyle2: {
    fontSize: responsiveFontSize(2),
    fontWeight: '900',
    color: colorWhite,
    // marginLeft: responsiveWidth(5)
  },
  profileMainContainer: {
    height: responsiveHeight(23),
    width: responsiveWidth(90),
    top: responsiveHeight(-14),
    alignSelf: 'center',
    backgroundColor: colorWhite,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 10,
    borderRadius: responsiveWidth(2),
    // backgroundColor: '#f6f6f6',
  },
  profileContainer: {
    height: responsiveHeight(12),
    width: '96%',
    // backgroundColor: 'green',
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginLeft: responsiveWidth(2),
  },
  profileLeftContainer: {
    height: responsiveHeight(9),
    width: responsiveHeight(9),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: responsiveHeight(6),
    backgroundColor: '#eaeaea',
    borderWidth: 1.5,
    borderColor: colorBlack,
  },
  profile: {
    height: responsiveHeight(9),
    width: responsiveHeight(9),
    borderRadius: responsiveHeight(9),
    backgroundColor: '#eaeaea',
  },
  profileRightContainer: {
    height: responsiveHeight(9),
    width: '75%',
    justifyContent: 'center',
    // backgroundColor: 'pink'
  },
  profileRightTextContainer1: {
    flexDirection: 'row',
    alignItems: 'center',
    // justifyContent: 'space-between'
  },
  prfileTextStyle1: {
    fontSize: responsiveFontSize(2.3),
    marginRight: responsiveWidth(3),
    fontWeight: '900',
    color: colorBlack,
  },
  prfileTextStyle2: {
    fontSize: responsiveFontSize(1.8),
    fontWeight: '900',
    color: '#565656',
  },
  profileImageStyle: {
    height: '80%',
    width: '80%',
    resizeMode: 'contain',
  },
  line: {
    height: responsiveHeight(0.1),
    width: '100%',
    // alignSelf: 'center',
    backgroundColor: '#d1d1d1',
  },
  profileContainer1: {
    height: responsiveHeight(8),
    width: '95%',
    // backgroundColor: 'blue',
    alignSelf: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  walletTextStyle: {
    fontSize: responsiveFontSize(2.2),
    fontWeight: '900',
    color: '#565656',
  },
  walletContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    // paddingEnd: responsiveWidth(4)
  },
  walletTextStyle1: {
    marginLeft: responsiveWidth(2),
    fontSize: responsiveFontSize(2),
    fontWeight: '900',
    color: '#eb3f3f',
  },
  cardContainer: {
    top: responsiveHeight(-12),
    height: responsiveHeight(35),
    width: responsiveWidth(90),
    paddingTop: responsiveWidth(2),
    alignSelf: 'center',
    borderRadius: responsiveWidth(2),
    backgroundColor: colorWhite,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 10,

    // backgroundColor: 'red'
  },
  cardItem: {
    backgroundColor: colorWhite,
    height: responsiveHeight(9),
    width: '100%',
    alignItems: 'center',
  },
  line2: {
    height: responsiveHeight(0.2),
    width: '96%',
    alignSelf: 'flex-end',
    backgroundColor: '#d1d1d1',
  },
});
