import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  StatusBar,
  //SafeAreaView,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ToastAndroid,
  //ScrollView
} from 'react-native';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { ScrollView } from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  colorWhite,
  colorBlack,
  lightBlack,
  phColor,
  blue,
} from './../../../GlobalCons/colors';
//import ModalDropdown from 'react-native-modal-dropdown';
import { Divider } from '../CustomComponents/CustomSafeAreaView';
import CustomModal from '../CustomComponents/CustomModal';
import { ListItem, Input, Button, Icon } from 'react-native-elements';
import { SafeAreaView } from 'react-navigation';
import AsyncStorage from '@react-native-community/async-storage';
import { ActivityIndicator } from 'react-native-paper';
import { connect } from 'react-redux';
import { Data } from '../../Redux/Action/Action';
import { SUBTotal } from '../../Redux/Action/Type';
//import TimeZone from 'react-native-timezone';
import NetInfo from '@react-native-community/netinfo'
//import { Icon } from 'react-native-paper/lib/typescript/src/components/Avatar/Avatar';

class Checkout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      texs: 0,
      isVisible: false,
      visa: true,
      card: false,
      visatext: '',
      cardText: '',
      loading: false,
      menu: [],
      item: this.props.navigation.state.params.item,
      comment: this.props.navigation.state.params.comment,
      total: this.props.navigation.state.params.total,
      subTotal: this.props.navigation.state.params.subTotal,
      deliveryCharges: this.props.navigation.state.params.deliveryCharges,
      tax: this.props.navigation.state.params.texs,
      orderarray: this.props.navigation.state.params.orderarray,
      userData: null,
      Loading: false,
      data: [],
      usercards: [],
      showicon: {},
      errormodalvisible: false,
      errormodalmessage: '',
      walletcheck: false,
      usercard: [
        //{
        //number: 2832320830238,
        //name:'akadbakjbd',
        //abskajbs:'akjbakjbaks'
        //},
        //{
        //number:8902389273987
        //},
        //{
        //number: 8929287398239,
        //name:'akadbasdsdsdsdskjbd',
        //abskajbs:'akjbakjbsdsdssdsdsdaks'

        //}
      ]
      //idiotbranchid: this.props.navigation.state.params.idiotbranchid,
    };
  }
  componentDidMount = async () => {
    // console.log("i am", this.state.total, this.state.subTotal, this.state.deliveryCharges, this.state.comment, this.state.tax)
    // let dala = await AsyncStorage.getItem("data")
    // let v = JSON.parse(dala)
    // console.log('data',v)
    // console.log('iii', this.state.item)
    //this.setState({loadi})
    NetInfo.addEventListener(state => {
      if (!state.isConnected) {
        alert('Error:Please connect to internet.')
      }
    });
    this._navListener = this.props.navigation.addListener('willFocus', async () => {
      if (Platform.OS === 'ios') {
        StatusBar.setBarStyle('light-content');
      } else {
        StatusBar.setBarStyle('light-content');
        StatusBar.setBackgroundColor('transparent');
      }
      //const timeZone = await TimeZone.getTimeZone().then(zone => zone);
      let dataa = await AsyncStorage.getItem('token');
      console.log(dataa)
      var myHeaders = new Headers();
      myHeaders.append('Authorization', `Bearer ${dataa}`);

      var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow',
      };
      this.setState({ loading: true })
      fetch(
        'https://pizzakebab.ranglerztech.website/api/user-data',
        requestOptions,
      )
        .then(response => response.text())
        .then(result => {
          console.log("usersssssssss", result)
          let dataa = JSON.parse(result);
          if (dataa.status == 200) {
            this.setState({ userData: dataa.successData });
          } else {
            this.setState({ errormodalmessage: dataa.message })
            this.setState({ errormodalvisible: true })
            //alert(dataa.message);
          }
        })
        .catch(error => {
          this.setState({ errormodalmessage: error })
          this.setState({ errormodalvisible: true })
          //alert('error', error)
        });

      fetch(
        'https://pizzakebab.ranglerztech.website/api/user-card',
        requestOptions,
      )
        .then(response => response.text())
        .then(result => {

          //console.log("usersssssssss", result)
          let dataa = JSON.parse(result);
          if (dataa.status == 200) {

            this.setState({ usercards: dataa.successData, loading: false });
            this.setState({ showicon: dataa.successData[0] })
            //alert(this.state.usercards)
          } else {
            this.setState({ errormodalmessage: dataa.message })
            this.setState({ errormodalvisible: true })
            //alert(dataa.message);
          }
        })
        .catch(error => {
          this.setState({ errormodalmessage: error })
          this.setState({ errormodalvisible: true })
          //alert('error', error)
        });
      //   this._navListener = this.props.navigation.addListener('willFocus', () => {
      //     StatusBar.setBarStyle('light-content');
      //     StatusBar.setBackgroundColor('transparent');
      //   });

      //   var formdata = new FormData();
      //   formdata.append('branch_id', this.state.item.item.branch_id);

      //   var requestOptions = {
      //     method: 'POST',
      //     headers: myHeaders,
      //     body: formdata,
      //     redirect: 'follow',
      //   };

      //   fetch('https://pizzakebab.ranglerztech.website/api/get-tax', requestOptions)
      //     .then(response => response.text())
      //     .then(result => {
      //       let dataa = JSON.parse(result);
      //       if (dataa.status == 200) {
      //         dataa.successData.map(item => {
      //           this.setState({ tex: item.percent });
      //         });
      //       } else {
      //         alert(dataa.message);
      //       }
      //     })
      //     .catch(error => alert('error', error.message));
      //   fetch(
      //     'https://pizzakebab.ranglerztech.website/api/get-delivery-charges',
      //     requestOptions,
      //   )
      //     .then(response => response.text())
      //     .then(result => {
      //       let dataa = JSON.parse(result);
      //       if (dataa.status == 200) {
      //         this.setState({
      //           deliveryCharges: dataa.successData.charges,
      //           loading: false,
      //         });
      //       } else {
      //         alert(dataa.message);
      //       }
      //     })
      //     .catch(error => alert('error', error));

    });
  };
  mysave = async () => {
    let dataa = await AsyncStorage.getItem('token');
    console.log(dataa)
    /*Alert.alert(
      'Token',
      JSON.stringify(dataa)
    )*/
    let idiotbranchid = await AsyncStorage.getItem('myidiotbranchid')
    this.setState({ loading: true })
    var myHeaders = new Headers();
    myHeaders.append('Authorization', `Bearer ${dataa}`);
    let myarray = [
      {
        menu_id: 42,
        detail: [
          {
            size: 'medium',
            quantity: 2,
            price: 150
          }
        ],
        extra_id: [1]
      }
    ]
    let thesubtotal = this.state.subTotal.toString();
    let thetax = this.state.tax.toString();
    let thedeliverycharges = this.state.deliveryCharges;
    let thetotal = this.state.total
    let theorderarray = JSON.stringify(this.state.orderarray);
    let thebranchid = idiotbranchid;
    let thecomment = this.state.comment;

    //let num = thesubtotal+thetax+parseInt(deliveryCharges)
    //let asas = '23';
    var formdata = new FormData();
    formdata.append('subtotal', thesubtotal);
    formdata.append('tax', thetax);
    formdata.append('delivery', thedeliverycharges);
    formdata.append('total', JSON.stringify(this.state.total));
    formdata.append('menu', theorderarray);
    formdata.append('branch_id', thebranchid);
    formdata.append('feedback', thecomment);
    if (this.state.walletcheck == true) {
      formdata.append('wallet', true);
      //alert(this.state.walletcheck)
    } else {
      let thecard = this.state.showicon.id.toString();
      formdata.append('card', thecard);
    }
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: formdata,
      redirect: 'follow',
    };
    fetch('https://pizzakebab.ranglerztech.website/api/save-order', requestOptions)
      .then(response => response.text())
      .then(async result => {
        let data = JSON.parse(result);
        if (data.status == 200) {
          this.setState({ loading: false })
          this.setState({ isVisible: true })
          await AsyncStorage.removeItem('adeelarray')
        } else {
          this.setState({ loading: false })
          this.setState({ errormodalmessage: data.message })
          this.setState({ errormodalvisible: true })
        }
      }).catch(error => {

        this.setState({ loading: false })
        this.setState({ errormodalmessage: error })
        this.setState({ errormodalvisible: true })
      })
  }







  save = async () => {

    let dala = await AsyncStorage.getItem("data")
    let v = JSON.parse(dala)

    this.setState({ loading: true });
    // let subtotal = 0;
    // let tax = 0;
    let arr = [];
    // console.log("dala", dala)
    v.map(item => {
      // console.log("item>>>>>>>>>>>>>>>>", item.menu)
      // console.log("item>>>>>>>>>>>>>>>>", item.branch_id)
      this.setState({ branch_id: item.item.branch_id })
      // console.log('id',this.state.branch_id)
      // datta = JSON.parse(this.state.subtotal) + JSON.parse(item.total);
      // subtotal = datta;
      // tax = (datta * this.state.tex) / 100;
      console.log('ex', item.extra_id)
      if (item.extra_id === undefined || item.extra_id === null || item.extra_id.length === 0) {
        arr = []
        console.log('ex')
      }
      else {
        arr.push({
          menu_id: `${item.item.category_id}`,
          detail: item.menu,
          extra_id: item.extra_id,
        });

      }

    });
    if (this.state.tax != 0 && this.state.subtotal != 0) {

      console.log("i am sibgha chawal", arr)
      let dataa = await AsyncStorage.getItem('token');
      var myHeaders = new Headers();
      myHeaders.append('Authorization', `Bearer ${dataa}`);
      let myarray = [
        {
          menu_id: 42,
          detail: [
            {
              size: 'medium',
              quantity: 2,
              price: 150
            }
          ],
          extra_id: [1]
        }
      ]
      var formdata = new FormData();
      //Alert.alert(
      //'Type of all',
      //`subtotal: ${typeof(this.state.subTotal)}, tax: ${typeof(this.state.tax)}, delivery: ${typeof(this.state.deliveryCharges)}, total: ${typeof(this.state.total)}, branchid: ${typeof(this.state.branch_id)}, feedback: ${typeof(this.state.comment)}`
      //)
      formdata.append('menu', JSON.stringify(myarray));
      formdata.append('subtotal', this.state.subTotal);
      formdata.append('tax', this.state.tax);
      formdata.append('delivery', this.state.deliveryCharges);
      formdata.append('total', this.state.total);
      formdata.append('branch_id', JSON.stringify(this.state.idiotbranchid));
      formdata.append('feedback', this.state.comment);
      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: formdata,
        redirect: 'follow',
      };

      fetch(
        'https://pizzakebab.ranglerztech.website/api/save-order',
        requestOptions,
      )
        .then(response => response.text())
        .then(async result => {
          await AsyncStorage.removeItem("resturant")
          let dataa = JSON.parse(result);
          if (dataa.status == 200) {
            ToastAndroid.show('Done', ToastAndroid.SHORT)
            //Alert.alert(
            //'Done',
            //'Status code 200 ok'
            //)
            this.setState({ isVisible: true });
            await AsyncStorage.removeItem("adeelarray")
          } else {
            this.setState({ errormodalmessage: dataa.message })
            this.setState({ errormodalvisible: true })
            //alert('data', dataa.message);
          }
        })
        .catch(error => {
          this.setState({ loading: false })
          this.setState({ errormodalmessage: error.message })
          this.setState({ errormodalvisible: true })
          //alert('error', error.message)
        });
      // this.props.navigation.navigate('Checkout');
    } else {
      this.setState({ loading: false })


    }
  };

  cardnumber(inputtxt) {
    var cardno = /^(?:5[1-5][0-9]{14})$/;
  }

  render() {
    if (this.state.errormodalvisible == true) {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <CustomModal isVisible={true}>
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
        </View>
      )
    }
    else if (Platform.OS === 'ios') {
      return (
        <View style={{ flex: 1 }}>
          <View style={{ backgroundColor: blue, height: 1 }}>
            <StatusBar
              barStyle={'light-content'}
              translucent
              backgroundColor={blue}
            />
          </View>
          <SafeAreaView style={{ flex: 1 }}>
            {/* <ScrollView> */}
            <CustomModal isVisible={this.state.isVisible}>
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
                      source={require('../../Assets/icon-check-alt2.png')}
                      style={styles.modalImageStyle}
                    />
                  </View>
                  <View style={styles.modalTextContainer}>
                    <Text style={styles.modalTextStyle}>
                      {'Your order is received! '}
                    </Text>
                  </View>
                  <TouchableOpacity
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
                  </TouchableOpacity>
                  <Button
                    title="Continue Eating"
                    onPress={() => {
                      this.props.navigation.navigate('Resturents');
                      this.setState({ isVisible: false });
                    }}
                    titleStyle={styles.buttonTitleStyle}
                    buttonStyle={[
                      styles.buttonStyle,
                      { borderRadius: responsiveWidth(10) },
                    ]}
                    containerStyle={styles.modalButtonContainer}
                  />
                </View>
              </View>
            </CustomModal>

            <View
              style={{
                height: responsiveHeight(26),
                borderBottomLeftRadius: responsiveHeight(6.5),
                borderBottomRightRadius: responsiveHeight(6.5),
                backgroundColor: '#393b82',
              }}>
              <View
                style={{
                  marginTop: responsiveHeight(8),
                  marginHorizontal: responsiveHeight(2.8),
                }}>
                <TouchableOpacity
                  onPress={() => {
                    this.props.navigation.goBack();
                  }}>
                  <Ionicons
                    name={'ios-arrow-back'}
                    color={colorWhite}
                    size={responsiveFontSize(3.5)}
                  />
                </TouchableOpacity>
              </View>
              <View
                style={{
                  marginHorizontal: responsiveHeight(3),
                }}>
                <Text
                  style={{
                    fontSize: responsiveFontSize(4),
                    color: 'white',
                    marginTop: responsiveHeight(1),
                  }}>
                  Checkout
                </Text>
              </View>
            </View>

            <View
              style={{
                height: responsiveHeight(75),
                width: responsiveWidth(90),
                top: responsiveHeight(-4),
                alignSelf: 'center',
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.5,
                shadowRadius: 2,
                elevation: 10,
                borderRadius: responsiveWidth(2),
                backgroundColor: '#fff',
              }}>
              <View
                style={{
                  marginHorizontal: responsiveHeight(3),
                  marginVertical: responsiveHeight(2.5),
                }}>
                <Text
                  style={{ fontSize: responsiveFontSize(2), fontWeight: 'bold' }}>
                  DELIVERY ADDRESS
                </Text>
              </View>

              <TouchableOpacity
                activeOpacity={0.6}
                onPress={() =>
                  this.props.navigation.navigate('DeliveryAddress', { item: 0 })
                }
                style={{
                  flexDirection: 'row',
                  height: responsiveHeight(12.5),
                  alignItems: 'center',
                  width: '85%',
                  alignSelf: 'center',
                  borderColor: '#393b82',
                  borderWidth: 1,
                  borderRadius: 5,
                }}>
                <View
                  style={{
                    marginHorizontal: responsiveHeight(2),
                    marginVertical: responsiveHeight(2),
                    width: responsiveWidth(55),
                  }}>
                  <Text
                    style={{
                      color: '#393b82',
                      fontSize: responsiveFontSize(1.9),
                    }}>
                    Address#1
                  </Text>
                  <Text style={{ fontSize: responsiveFontSize(1.9) }}>
                    Avenfield House,Dunraven St
                  </Text>
                  <Text style={{ fontSize: responsiveFontSize(1.9) }}>
                    Mayfire,London
                  </Text>
                </View>
                <AntDesign
                  name="checkcircle"
                  size={responsiveFontSize(3.5)}
                  color={'#e12c2c'}
                  style={{
                    left: responsiveWidth(3),
                    // top: responsiveHeight(2.5),
                    // right: responsiveHeight(-6),
                    // position: 'absolute',
                  }}
                />
              </TouchableOpacity>
              <View
                style={{
                  marginHorizontal: responsiveHeight(3),
                  marginVertical: responsiveHeight(2.5),
                }}>
                <Text
                  style={{ fontSize: responsiveFontSize(2), fontWeight: 'bold' }}>
                  PAYMENT METHOD
                </Text>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  height: responsiveHeight(9.5),
                  alignItems: 'center',
                  // marginHorizontal: responsiveHeight(3),
                  width: '85%',
                  borderColor: this.state.visa ? '#393b82' : 'white',
                  borderWidth: 1,
                  justifyContent: 'center',
                  alignSelf: 'center',
                  backgroundColor: 'rgba(214,207,199,0.1)',
                  borderRadius: 5,
                }}>
                <TouchableOpacity
                  style={{
                    // marginHorizontal: responsiveHeight(2),
                    // marginVertical: responsiveHeight(2),
                    width: '100%',
                    justifyContent: 'space-evenly',
                    alignItems: 'center',
                    flexDirection: 'row',
                  }}
                  onPress={() => this.setState({ visa: true, card: false })}>
                  <Image
                    style={{
                      height: responsiveHeight(5),
                      width: responsiveWidth(14),
                      // marginRight: responsiveHeight(1),
                      // marginLeft: responsiveHeight(1),
                    }}
                    source={require('../../Assets/Shape.png')}
                  />

                  <TextInput
                    placeholder="**** **** **** 5967"
                    placeholderTextColor={'#000'}
                    keyboardType="decimal-pad"
                    style={{ width: '60%' }}
                    value={this.state.visatext}
                    maxLength={16}
                    onChangeText={text => {
                      this.setState({ visatext: text });
                      // this.state.visatext.length <= 16
                      //   ? this.setState({visatext: text})
                      //   : null;
                      // this.cardnumber(this.state.visatext)
                    }}
                  />
                  {this.state.visa ? (
                    <AntDesign
                      name="checkcircle"
                      size={responsiveFontSize(3.5)}
                      color={'#e12c2c'}
                    // style={{
                    //   right:
                    //     this.state.visatext.length <= 10
                    //       ? responsiveHeight(-3)
                    //       : responsiveHeight(0),
                    //   // position: 'absolute',
                    // }}
                    />
                  ) : (
                      <View width={responsiveFontSize(3.5)} />
                    )}
                </TouchableOpacity>
              </View>

              <TouchableOpacity
                onPress={() => this.setState({ visa: false, card: true })}
                style={{
                  flexDirection: 'row',
                  height: responsiveHeight(9.5),
                  alignItems: 'center',
                  // marginHorizontal: responsiveHeight(3),
                  width: '85%',
                  borderColor: this.state.card ? '#393b82' : 'white',
                  borderWidth: 1,
                  justifyContent: 'center',
                  alignSelf: 'center',
                  backgroundColor: 'rgba(214,207,199,0.1)',
                  borderRadius: 5,
                  marginTop: responsiveHeight(1),
                }}>
                <View
                  style={{
                    // marginHorizontal: responsiveHeight(2),
                    // marginVertical: responsiveHeight(2),
                    flexDirection: 'row',
                    width: '100%',
                    justifyContent: 'space-evenly',
                    alignItems: 'center',
                    flexDirection: 'row',
                  }}>
                  <Image
                    style={{
                      height: responsiveHeight(5),
                      width: responsiveWidth(14),
                      // marginRight: responsiveHeight(2),
                    }}
                    source={require('../../Assets/cc-mastercard.png')}
                  />
                  <TextInput
                    placeholder="**** **** **** 9067"
                    placeholderTextColor="#000"
                    value={this.state.cardText}
                    style={{ width: '60%' }}
                    maxLength={16}
                    onChangeText={text => {
                      this.setState({ cardText: text });
                    }}
                    keyboardType="number-pad"
                  />
                  {this.state.card ? (
                    <AntDesign
                      name="checkcircle"
                      size={responsiveFontSize(3.5)}
                      color={'#e12c2c'}
                      style={
                        {
                          // right:
                          //   this.state.cardText.length <= 10
                          //     ? responsiveHeight(-3)
                          //     : responsiveHeight(0),
                          // position: 'absolute',
                        }
                      }
                    />
                  ) : (
                      <View width={responsiveFontSize(3.5)} />
                    )}
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  height: responsiveHeight(9.5),
                  alignItems: 'center',
                  marginHorizontal: responsiveHeight(3),
                  borderColor: 'white',
                  borderWidth: 1,
                  backgroundColor: 'rgba(214,207,199,0.1)',
                  borderRadius: 5,
                }}
                onPress={() => this.props.navigation.navigate('Topup')}>
                <View
                  style={{
                    marginHorizontal: responsiveHeight(2),
                    marginVertical: responsiveHeight(2),
                    flexDirection: 'row',
                  }}>
                  <Text style={{ fontSize: responsiveFontSize(2) }}>Wallet</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                style={{
                  marginHorizontal: responsiveHeight(3),
                  height: responsiveHeight(8),
                  backgroundColor: '#e12c2c',
                  marginBottom: responsiveHeight(5),
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: responsiveHeight(2),
                  marginTop: responsiveHeight(2),
                  marginVertical: responsiveHeight(6),
                }}
                onPress={() => this.mysave()}>
                <Text
                  style={{ fontSize: responsiveFontSize(2.5), color: 'white' }}>
                  Payment
                </Text>
              </TouchableOpacity>
            </View>
            {/* </ScrollView> */}
          </SafeAreaView>
        </View>
      );
    } else {
      return (
        <View style={{ flex: 1 }}>
          <StatusBar translucent backgroundColor="transparent" />
          <SafeAreaView forceInset={{ top: 'never' }} style={{ flex: 1 }}>
            <ScrollView>
              <CustomModal isVisible={this.state.isVisible}>
                <View style={{ flex: 1 }}>
                  <Divider height={responsiveHeight(15)} />
                  <View style={styles.modalMainContainer}>
                    <View style={styles.modalImageContainer}>
                      <Image
                        source={require('../../Assets/icon-check-alt2.png')}
                        style={styles.modalImageStyle}
                      />
                    </View>
                    <View style={styles.modalTextContainer}>
                      <Text style={styles.modalTextStyle}>
                        {'Your order is received! '}
                      </Text>
                    </View>
                    <TouchableOpacity
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
                    </TouchableOpacity>
                    <Button
                      title="Continue Eating"
                      onPress={() => {
                        this.props.navigation.navigate('Resturents');
                        this.setState({ isVisible: false });
                      }}
                      titleStyle={styles.buttonTitleStyle}
                      buttonStyle={[
                        styles.buttonStyle,
                        { borderRadius: responsiveWidth(10) },
                      ]}
                      containerStyle={styles.modalButtonContainer}
                    />
                  </View>
                </View>
              </CustomModal>

              <View
                style={{
                  height: responsiveHeight(25),
                  borderBottomLeftRadius: responsiveHeight(6.5),
                  borderBottomRightRadius: responsiveHeight(6.5),
                  backgroundColor: '#393b82',
                }}>
                <View
                  style={{
                    marginTop: responsiveHeight(5.5),
                    marginHorizontal: responsiveHeight(2.8),
                  }}>
                  <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() => {
                      this.props.navigation.openDrawer();
                    }}>
                    <Image
                      style={{
                        height: responsiveHeight(4),
                        width: responsiveWidth(7),
                      }}
                      source={require('../../Assets/icons-Menu-1.png')}
                    />
                  </TouchableOpacity>
                </View>
                <View
                  style={{
                    marginHorizontal: responsiveHeight(3),
                  }}>
                  <Text
                    style={{
                      fontSize: responsiveFontSize(4),
                      color: 'white',
                      marginTop: responsiveHeight(1),
                    }}>
                    Checkout
                </Text>
                </View>
              </View>

              <View
                style={{
                  //height: responsiveHeight(75),
                  width: responsiveWidth(90),
                  top: responsiveHeight(-7),
                  alignSelf: 'center',
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.5,
                  shadowRadius: 2,
                  elevation: 10,
                  borderRadius: responsiveWidth(2),
                  backgroundColor: '#fff',
                }}>
                <View
                  style={{
                    marginHorizontal: responsiveHeight(3),
                    marginVertical: responsiveHeight(2.5),
                  }}>
                  <Text
                    style={{ fontSize: responsiveFontSize(2), fontWeight: 'bold' }}>
                    DELIVERY ADDRESS
                </Text>
                </View>

                <TouchableOpacity
                  activeOpacity={0.6}
                  onPress={() =>
                    this.props.navigation.navigate('DeliveryAddress', { item: 0 })
                  }
                  style={{
                    flexDirection: 'row',
                    height: responsiveHeight(12.5),
                    alignItems: 'center',
                    width: '85%',
                    alignSelf: 'center',
                    borderColor: '#393b82',
                    borderWidth: 1,
                    borderRadius: 5,
                  }}>
                  <View
                    style={{
                      marginHorizontal: responsiveHeight(2),
                      marginVertical: responsiveHeight(2),
                      width: responsiveWidth(55),
                    }}>
                    <Text
                      style={{
                        color: '#393b82',
                        fontSize: responsiveFontSize(1.9),
                      }}>
                      Address
                  </Text>
                    <Text
                      style={{ fontSize: responsiveFontSize(1.9) }}
                      numberOfLines={3}>
                      {this.state.userData
                        ? this.state.userData.address
                          ? this.state.userData.address
                          : 'please set your address'
                        : 'please set your address'}
                    </Text>
                  </View>
                  <AntDesign
                    name="checkcircle"
                    size={responsiveFontSize(3.5)}
                    color={'#e12c2c'}
                    style={{
                      left: responsiveWidth(3),
                      // top: responsiveHeight(2.5),
                      // right: responsiveHeight(-6),
                      // position: 'absolute',
                    }}
                  />
                </TouchableOpacity>
                <View
                  style={{
                    marginHorizontal: responsiveHeight(3),
                    marginVertical: responsiveHeight(2.5),
                  }}>
                  <Text
                    style={{ fontSize: responsiveFontSize(2), fontWeight: 'bold' }}>
                    PAYMENT METHOD
                </Text>
                </View>

                {
                  this.state.usercards.map((value, index) => {
                    return (<View
                      style={{
                        flexDirection: 'row',
                        height: responsiveHeight(9.5),
                        alignItems: 'center',
                        // marginHorizontal: responsiveHeight(3),
                        width: '85%',
                        borderColor: this.state.visa ? '#393b82' : 'white',
                        //borderWidth: 1,
                        justifyContent: 'center',
                        alignSelf: 'center',
                        backgroundColor: 'rgba(214,207,199,0.1)',
                        borderRadius: 5,
                      }}>
                      <TouchableOpacity
                        style={{
                          // marginHorizontal: responsiveHeight(2),
                          // marginVertical: responsiveHeight(2),
                          width: '100%',
                          justifyContent: 'space-evenly',
                          alignItems: 'center',
                          flexDirection: 'row',
                        }}
                        onPress={() => {
                          //this.setState({ visa: true, card: false })
                          this.setState({ walletcheck: false })
                          this.setState({ showicon: value })

                          //adeel
                        }}
                      >
                        <View
                          style={{ flex: 1 }}
                        >
                          <Icon
                            name='credit-card'
                            type='font-awesome'

                          />
                        </View>
                        <View
                          style={{ flex: 4 }}
                        >
                          <Text>
                            {value.number}
                          </Text>

                        </View>
                        <View
                          style={{ flex: 1 }}
                        >
                          {
                            this.state.showicon.id == value.id ? (
                              <AntDesign
                                name="checkcircle"
                                size={responsiveFontSize(3.5)}
                                color={'#e12c2c'}
                              // style={{
                              //   right:
                              //     this.state.visatext.length <= 10
                              //       ? responsiveHeight(-3)
                              //       : responsiveHeight(0),
                              //   // position: 'absolute',
                              // }}
                              />
                            ) : (
                                <View width={responsiveFontSize(3.5)} />
                              )
                          }
                        </View>
                      </TouchableOpacity>

                    </View>)
                  })
                }

                {/*<View
                style={{
                  flexDirection: 'row',
                  height: responsiveHeight(9.5),
                  alignItems: 'center',
                  // marginHorizontal: responsiveHeight(3),
                  width: '85%',
                  borderColor: this.state.visa ? '#393b82' : 'white',
                  borderWidth: 1,
                  justifyContent: 'center',
                  alignSelf: 'center',
                  backgroundColor: 'rgba(214,207,199,0.1)',
                  borderRadius: 5,
                }}>
                <TouchableOpacity
                  style={{
                    // marginHorizontal: responsiveHeight(2),
                    // marginVertical: responsiveHeight(2),
                    width: '100%',
                    justifyContent: 'space-evenly',
                    alignItems: 'center',
                    flexDirection: 'row',
                  }}
                  onPress={() => this.setState({ visa: true, card: false })}>
                  <Image
                    style={{
                      height: responsiveHeight(5),
                      width: responsiveWidth(14),
                      // marginRight: responsiveHeight(1),
                      // marginLeft: responsiveHeight(1),
                    }}
                    source={require('../../Assets/Shape.png')}
                  />

                  <TextInput
                    placeholder="**** **** **** 5967"
                    placeholderTextColor={'#000'}
                    keyboardType="decimal-pad"
                    style={{ width: '60%' }}
                    value={this.state.visatext}
                    maxLength={16}
                    onChangeText={text => {
                      this.setState({ visatext: text });
                      // this.state.visatext.length <= 16
                      //   ? this.setState({visatext: text})
                      //   : null;
                      // this.cardnumber(this.state.visatext)
                    }}
                  />
                  {this.state.visa ? (
                    <AntDesign
                      name="checkcircle"
                      size={responsiveFontSize(3.5)}
                      color={'#e12c2c'}
                    // style={{
                    //   right:
                    //     this.state.visatext.length <= 10
                    //       ? responsiveHeight(-3)
                    //       : responsiveHeight(0),
                    //   // position: 'absolute',
                    // }}
                    />
                  ) : (
                      <View width={responsiveFontSize(3.5)} />
                    )}
                </TouchableOpacity>
                  </View>

              <TouchableOpacity
                onPress={() => this.setState({ visa: false, card: true })}
                style={{
                  flexDirection: 'row',
                  height: responsiveHeight(9.5),
                  alignItems: 'center',
                  // marginHorizontal: responsiveHeight(3),
                  width: '85%',
                  borderColor: this.state.card ? '#393b82' : 'white',
                  borderWidth: 1,
                  justifyContent: 'center',
                  alignSelf: 'center',
                  backgroundColor: 'rgba(214,207,199,0.1)',
                  borderRadius: 5,
                  marginTop: responsiveHeight(1),
                }}>
                <View
                  style={{
                    // marginHorizontal: responsiveHeight(2),
                    // marginVertical: responsiveHeight(2),
                    flexDirection: 'row',
                    width: '100%',
                    justifyContent: 'space-evenly',
                    alignItems: 'center',
                    flexDirection: 'row',
                  }}>
                  <Image
                    style={{
                      height: responsiveHeight(5),
                      width: responsiveWidth(14),
                      // marginRight: responsiveHeight(2),
                    }}
                    source={require('../../Assets/cc-mastercard.png')}
                  />
                  <TextInput
                    placeholder="**** **** **** 9067"
                    placeholderTextColor="#000"
                    value={this.state.cardText}
                    style={{ width: '60%' }}
                    maxLength={16}
                    onChangeText={text => {
                      this.setState({ cardText: text });
                    }}
                    keyboardType="number-pad"
                  />
                  {this.state.card ? (
                    <AntDesign
                      name="checkcircle"
                      size={responsiveFontSize(3.5)}
                      color={'#e12c2c'}
                      style={
                        {
                          // right:
                          //   this.state.cardText.length <= 10
                          //     ? responsiveHeight(-3)
                          //     : responsiveHeight(0),
                          // position: 'absolute',
                        }
                      }
                    />
                  ) : (
                      <View width={responsiveFontSize(3.5)} />
                    )}
                </View>
              </TouchableOpacity>*/}

                <TouchableOpacity
                  style={{
                    flexDirection: 'row',
                    height: responsiveHeight(9.5),
                    alignItems: 'center',
                    marginHorizontal: responsiveHeight(3),
                    borderColor: 'white',
                    borderWidth: 1,
                    backgroundColor: 'rgba(214,207,199,0.1)',
                    borderRadius: 5,
                  }}
                  onPress={() => {
                    //this.props.navigation.navigate('Topup')
                    this.setState({ walletcheck: true })
                    this.setState({ showicon: {} })
                  }}>
                  <View
                    style={{
                      marginHorizontal: responsiveHeight(2),
                      //marginVertical: responsiveHeight(2),
                      flex: 4,
                      flexDirection: 'row',
                    }}>
                    <Text style={{ fontSize: responsiveFontSize(2) }}>Wallet</Text>
                  </View>
                  <View
                    style={{ flex: 1 }}
                  >
                    {
                      this.state.walletcheck == true ? (
                        <AntDesign
                          name="checkcircle"
                          size={responsiveFontSize(3.5)}
                          color={'#e12c2c'}
                        // style={{
                        //   right:
                        //     this.state.visatext.length <= 10
                        //       ? responsiveHeight(-3)
                        //       : responsiveHeight(0),
                        //   // position: 'absolute',
                        // }}
                        />
                      ) : (
                          <View width={responsiveFontSize(3.5)} />
                        )
                    }
                  </View>
                </TouchableOpacity>

                <TouchableOpacity
                  style={{
                    marginHorizontal: responsiveHeight(3),
                    height: responsiveHeight(8),
                    backgroundColor: '#e12c2c',
                    marginBottom: responsiveHeight(5),
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: responsiveHeight(2),
                    marginTop: responsiveHeight(2),
                    marginVertical: responsiveHeight(6),
                  }}
                  onPress={async () => {
                    //let thesubtotal = this.state.subTotal.toString()
                    //alert(typeof(thesubtotal))
                    if (this.state.loading == false) {
                      //this.mysave()
                      if (this.state.usercards.length == 0) {
                        this.props.navigation.navigate('Payment')
                      } else {
                        this.mysave();
                        //var num = this.state.total.toString();
                        //alert(this.state.showicon.id)
                      }
                    } else {
                      ToastAndroid.show('Please wait', ToastAndroid.SHORT)
                    }


                    /*Alert.alert(
                      'Type is',
                      typeof(this.props.navigation.state.params.subTotal)
                    )*/
                  }}>
                  {this.state.loading ? (
                    <ActivityIndicator size={'small'} color="#fff" />
                  ) : (
                      <Text
                        style={{ fontSize: responsiveFontSize(2.5), color: 'white' }}>
                        Payment
                      </Text>
                    )}
                </TouchableOpacity>
              </View>
            </ScrollView>
            {/* </ScrollView> */}
          </SafeAreaView>
        </View>
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
    height: responsiveHeight(10),
    width: responsiveWidth(100),
    backgroundColor: '#f6f6f6',
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
  headerImageStyle: {
    marginTop: responsiveHeight(0.7),
    height: '80%',
    width: '20%',
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
    height: responsiveHeight(70),
    width: responsiveWidth(85),
    alignSelf: 'center',
    backgroundColor: colorWhite,
    borderRadius: responsiveWidth(3),
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
    height: responsiveHeight(10),
    width: '90%',
    alignItems: 'center',
    // backgroundColor: 'red'
  },
  modalTextStyle: {
    fontSize: responsiveFontSize(2.5),
    fontWeight: 'bold',
    color: '#e12c2c',
    textAlign: 'center',
  },
  modalDecTextStyle: {
    fontSize: responsiveFontSize(2.2),
    fontWeight: 'bold',
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
const mapStateToProps = state => {
  return {
    data: state.data,
  };
};
const actions = {
  Data,
};

export default connect(
  mapStateToProps,
  actions,
)(Checkout);
