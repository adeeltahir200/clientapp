import React, { Component } from 'react';
import { Checkmodal } from '../checkmodal/Checkmodal';
import CustomModal from '../CustomComponents/CustomModal';
import {
  View,
  Text,
  Alert,
  StatusBar,
  SafeAreaView,
  ImageBackground,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Platform,
  ToastAndroid,
} from 'react-native';
import {
  colorWhite,
  colorBlack,
  lightBlack,
  phColor,
  blue,
} from './../../../GlobalCons/colors';

import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
//import { blue, colorWhite, phColor } from '../../../GlobalCons/colors';
import LinearGradient from 'react-native-linear-gradient';
// import {SafeAreaView} from 'react-navigation';
import {Button} from 'react-native-paper'
import { NavigationEvents } from 'react-navigation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-community/async-storage';
import NetInfo from '@react-native-community/netinfo'
let Order = [];

import Toast from 'react-native-simple-toast';
export default class CategoryDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      SmallFlag: 0,
      mediumFlag: 0,
      largeFlag: 0,
      superFlag: 0,
      cheeseFlag: '',
      mashroom_id: 0,
      olive_id: 0,
      cheese_id: 0,
      oliveflag: false,
      mashroomflag: false,
      quantity: 0,
      total: 0,
      check: 0,
      cheesePrice: 0,
      item: this.props.navigation.state.params.item,
      menu: [],
      extras: [],
      extra: [],
      from: this.props.navigation.state.params.from,
      isVisible: false,
    };
  }
  componentDidMount() {
    console.log('this.state.item', this.state.item);
    NetInfo.addEventListener(state => {
      if (!state.isConnected) {
        alert('Error:Please connect to internet.')
      }
    });
    this._navListener = this.props.navigation.addListener('willFocus', () => {
      this.setState({
        menu: this.state.item['menu_size'],
        extras: this.state.item['extras'],
      });
      //  let data= this.state.item.menu_size.map((item, index) => this.state.item.menu_size[index].quantity=0);
      //   this.setState({item:data})
      if (Platform.OS === 'ios') {
        StatusBar.setBarStyle('dark-content');
      } else {
        StatusBar.setBarStyle('light-content');
        StatusBar.setBackgroundColor('transparent');
      }
    });
  }
  onFocusFunction() {
    this._navListener = this.props.navigation.addListener('willFocus', () => {
      this.setState({
        menu: this.state.item['menu_size'],
        extras: this.state.item['extras'],
      });
      //  let data= this.state.item.menu_size.map((item, index) => this.state.item.menu_size[index].quantity=0);
      //   this.setState({item:data})
      if (Platform.OS === 'ios') {
        StatusBar.setBarStyle('dark-content');
      } else {
        StatusBar.setBarStyle('light-content');
        StatusBar.setBackgroundColor('transparent');
      }
    });
  }
  addFavorite = async id => {
    let data = await AsyncStorage.getItem('token');
    var myHeaders = new Headers();
    myHeaders.append('Authorization', `Bearer ${data}`);

    var formdata = new FormData();
    formdata.append('menu_id', id);

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: formdata,
      redirect: 'follow',
    };

    fetch(
      'https://pizzakebab.ranglerztech.website/api/add-favorite',
      requestOptions,
    )
      .then(response => response.text())
      .then(result => {
        let dataa = JSON.parse(result);
        if (dataa.status == 200) {
          //alert(dataa.message);
          this.setState({isVisible:true})
        } else {
          //alert(dataa.message);
          ToastAndroid.show('item could not be added',ToastAndroid.SHORT)
        }
      })
      .catch(error => {
        this.setState({ loading: false });
        ToastAndroid.show('item could not be added',ToastAndroid.SHORT)
        //alert(error.message)
      });
  };

  navi = async () => {
    await AsyncStorage.setItem("branch_id", this.state.item.branch_id)
    if (this.state.from == 'categoryitems') {
      await AsyncStorage.setItem('resturant', JSON.stringify(this.state.item.branch.id));
    } else {
      await AsyncStorage.setItem('resturant', this.state.item.branch_id)
    }
    //alert(this.state.item.branch.id)
    let data = this.state.menu.filter(item => {
      return item.quantity != 0;
    });
    let me = this.state.extras.filter((item,index)=>{
      if(this.state.extras.filter[index][item.name + '_flag']){
        let data = this.state.extra
        data.push(item.id)
        this.setState({extra: data},()=>{return this.state.extra})
      }
    })
    /*if (this.state.from == 'categoryitems') {
      me = this.state.extras.filter((item, index) => {
        if (this.state.extras[index][item.name + '_flag']) {
          let data = this.state.extra
          data.push(item.id)
          this.setState({ extra: data }, () => { return this.state.extra })
        }
      })
    } else {
      me = []
    }*/

    let item = {
      item: this.state.item,
      menu: data,
      total: this.state.total,
      extra_id: me,
      extra_name: this.state.cheeseFlag,
    };
    //await AsyncStorage.setItem('resturant', JSON.stringify(this.state.item.branch.id));
    if (data.length > 0) {
      //console.log('Item value is: '+JSON.stringify(item));
      //console.log('Order value is: '+JSON.stringify(Order));

      this.setState({ menu: [] })
      this.props.navigation.navigate('Cart', {
        item: item,
        Order: Order,
        from: 'stack',
        price: this.state.total
      });
      /*Alert.alert(
        'Item is:'+JSON.stringify(item),
        'Order is:'+JSON.stringify(Order),
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel"
          },
          { text: "OK", onPress: () => console.log("OK Pressed") }
        ],
        { cancelable: false }
      );*/
    } else if (data.length <= 0) {
      Toast.show('Please select any item', Toast.SHORT, ['UIAlertController']);
    }
  }
  calculateprice = (index, item, flag) => {

    let quantity = JSON.parse(this.state.menu[index].quantity);
    let value = JSON.parse(item.price);
    if (flag) {
      if (quantity > 0) {
        this.state.menu[index].quantity = quantity - 1;
        let data = this.state.total - value;
        this.setState({ total: data, check: data });
      }
    } else {
      let quantity = JSON.parse(this.state.menu[index].quantity);
      this.state.menu[index].quantity = quantity + 1;
      let data = this.state.total + value;
      this.setState({ total: data, check: data });
    }
  };
  calculateprice2 = (index, item, flag) => {
    let data = this.state.extras;
    data[index][data[index].name + '_flag'] = !data[index][data[index].name + '_flag'];
    this.setState({ extras: data });
    if (this.state.cheesePrice != 0) {
      let data = this.state.total - this.state.cheesePrice;

      this.setState({ total: data });
    }
    let obj = {
      size: item.size,
      price: item.price,
      quantity: this.state.quantity + 1,
    };
    let value = JSON.parse(item);
    if (flag) {
      let data = this.state.total - value;
      this.setState({ total: data, check: data });
    } else {
      let data = this.state.total + value;
      this.setState({ total: data, cheesePrice: item, check: data });
    }
  };
  calculate = () => {
    let data = this.state.total + this.state.check;
    this.setState({ total: data });
  };
  calculateminus = () => {
    let data = this.state.total - this.state.check;
    this.setState({ total: data });
  };
  render() {

    const checkview = () => {
      return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text>Hello world</Text>
        </View>
      );

    }

    const { item } = this.state;
    if (Platform.OS === 'ios') {
      StatusBar.setBarStyle('light-content');
      return (
        <SafeAreaView
          forceInset={{ top: 0 }}
          style={{ flex: 1, backgroundColor: colorWhite }}>
          <StatusBar barStyle="dark-content" />
          <View style={{ flex: 1 }}>
            <ImageBackground
              style={{
                height: responsiveHeight(30),
                width: responsiveWidth(100),
              }}
              resizeMode="cover"
              source={{ uri: item.image }}>
              <LinearGradient
                colors={['rgba(255,255,255,0) ', 'rgba(255,255,255,0.9)']}
                start={{ x: -0.1, y: -0.19 }}
                end={{ x: -0.21, y: 0.9 }}
                style={{
                  flex: 1,
                  // paddingLeft: 15,
                  // paddingRight: 15,
                  borderRadius: 5,
                  // zIndex:1
                }}>
                <View
                  style={{
                    marginVertical: responsiveHeight(8),
                    marginHorizontal: responsiveHeight(3),
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
                  <TouchableOpacity
                    onPress={() => this.addFavorite(item.id)}
                    style={{
                      height: responsiveHeight(5),
                      width: responsiveHeight(5),
                      borderRadius: responsiveHeight(5),
                      backgroundColor: 'red',
                      right: 5,
                      // top: responsiveHeight(-1),
                      position: 'absolute',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <AntDesign
                      onPress={() => this.addFavorite(item.id)}
                      name="star"
                      size={responsiveFontSize(2)}
                      color={'#e12c2c'}
                    />
                  </TouchableOpacity>
                </View>
              </LinearGradient>
            </ImageBackground>
            <ScrollView
              style={{
                marginLeft: responsiveHeight(3),
                marginTop: responsiveHeight(5),
              }}>
              <View style={{ height: responsiveHeight(6) }}>
                <Text
                  style={{
                    fontSize: responsiveFontSize(2.5),
                    fontWeight: 'bold',
                  }}>
                  Mexican Passion
                </Text>
              </View>

              <View
                style={{
                  height: responsiveHeight(6),
                  marginVertical: responsiveHeight(5),
                }}>
                <Text
                  style={{
                    fontSize: responsiveFontSize(2.5),
                    fontWeight: 'bold',
                  }}>
                  Description
                </Text>
                <Text
                  style={{
                    fontSize: responsiveFontSize(1.5),
                    color: 'rgba(0,0,0,0.3)',
                    fontWeight: 'bold',
                  }}>
                  The pizza was supposed to be gourmet.
                </Text>
              </View>

              <View
                style={{
                  height: responsiveHeight(5),
                  marginTop: responsiveHeight(2),
                }}>
                <Text
                  style={{
                    fontSize: responsiveFontSize(2.5),
                    fontWeight: 'bold',
                  }}>
                  SIZE
                </Text>
              </View>
              <TouchableOpacity
                style={{
                  height: responsiveHeight(10),
                  borderBottomColor: 'rgba(0,0,0,0.3)',
                  borderBottomWidth: 0.71,
                  flexDirection: 'row',
                  alignItems: 'flex-end',
                  alignItems: 'center',
                }}
                onPress={() => {
                  this.setState({ SmallFlag: !this.state.SmallFlag });
                }}>
                <Text
                  style={{ fontSize: responsiveFontSize(2), fontWeight: 'bold' }}>
                  Small
                </Text>
                <View
                  style={{
                    marginLeft: responsiveHeight(3),
                    flexDirection: 'row',
                  }}>
                  <Text style={styles.priceTextStyle}>£10.00</Text>
                </View>
                {this.state.SmallFlag ? (
                  <FontAwesome5
                    name="check"
                    size={responsiveFontSize(2.5)}
                    style={{
                      marginTop: responsiveHeight(0.45),
                      right: responsiveHeight(3),
                      position: 'absolute',
                    }}
                    color={'#e12c2c'}
                  />
                ) : null}
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  height: responsiveHeight(10),
                  borderBottomColor: 'rgba(0,0,0,0.3)',
                  borderBottomWidth: 0.71,
                  flexDirection: 'row',
                  alignItems: 'flex-end',
                  alignItems: 'center',
                }}
                onPress={() => {
                  this.setState({ mediumFlag: !this.state.mediumFlag });
                }}>
                <Text
                  style={{ fontSize: responsiveFontSize(2), fontWeight: 'bold' }}>
                  Medium
                </Text>
                <View
                  style={{
                    marginLeft: responsiveHeight(3),
                    flexDirection: 'row',
                  }}>
                  <Text style={styles.priceTextStyle}>£20.00</Text>
                </View>
                {this.state.mediumFlag ? (
                  <FontAwesome5
                    name="check"
                    size={responsiveFontSize(2.5)}
                    style={{
                      marginTop: responsiveHeight(0.45),
                      right: responsiveHeight(3),
                      position: 'absolute',
                    }}
                    color={'#e12c2c'}
                  />
                ) : null}
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  height: responsiveHeight(10),
                  borderBottomColor: 'rgba(0,0,0,0.3)',
                  borderBottomWidth: 0.71,
                  flexDirection: 'row',
                  alignItems: 'flex-end',
                  alignItems: 'center',
                }}
                onPress={() => {
                  this.setState({ largeFlag: !this.state.largeFlag });
                }}>
                <Text
                  style={{ fontSize: responsiveFontSize(2), fontWeight: 'bold' }}>
                  Large
                </Text>
                <View
                  style={{
                    marginLeft: responsiveHeight(3),
                    flexDirection: 'row',
                  }}>
                  <Text style={styles.priceTextStyle}>£25.00</Text>
                </View>
                {this.state.largeFlag ? (
                  <FontAwesome5
                    name="check"
                    size={responsiveFontSize(2.5)}
                    style={{
                      marginTop: responsiveHeight(0.45),
                      right: responsiveHeight(3),
                      position: 'absolute',
                    }}
                    color={'#e12c2c'}
                  />
                ) : null}
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  height: responsiveHeight(10),
                  borderBottomColor: 'rgba(0,0,0,0.3)',
                  borderBottomWidth: 0.71,
                  flexDirection: 'row',
                  alignItems: 'flex-end',
                  alignItems: 'center',
                }}
                onPress={() => {
                  this.setState({ superFlag: !this.state.superFlag });
                }}>
                <Text
                  style={{ fontSize: responsiveFontSize(2), fontWeight: 'bold' }}>
                  Super
                </Text>
                <View
                  style={{
                    marginLeft: responsiveHeight(3),
                    flexDirection: 'row',
                  }}>
                  <Text style={styles.priceTextStyle}>£30.00</Text>
                </View>
                {this.state.superFlag ? (
                  <FontAwesome5
                    name="check"
                    size={responsiveFontSize(2.5)}
                    style={{
                      marginTop: responsiveHeight(0.45),
                      right: responsiveHeight(3),
                      position: 'absolute',
                    }}
                    color={'#e12c2c'}
                  />
                ) : null}
              </TouchableOpacity>
              <View
                style={{
                  height: responsiveHeight(5),
                  marginTop: responsiveHeight(6),
                }}>
                <Text
                  style={{
                    fontSize: responsiveFontSize(2.5),
                    fontWeight: 'bold',
                  }}>
                  EXTRAS
                </Text>
              </View>
              <TouchableOpacity
                style={{
                  height: responsiveHeight(10),
                  borderBottomColor: 'rgba(0,0,0,0.3)',
                  borderBottomWidth: 0.71,
                  flexDirection: 'row',
                  alignItems: 'flex-end',
                  alignItems: 'center',
                }}
                onPress={() => {
                  this.setState({ cheeseFlag: !this.state.cheeseFlag });
                }}>
                <Text
                  style={{ fontSize: responsiveFontSize(2), fontWeight: 'bold' }}>
                  Cheese
                </Text>
                <View
                  style={{
                    marginLeft: responsiveHeight(3),
                    flexDirection: 'row',
                  }}>
                  <Text style={styles.priceTextStyle}>£5.00</Text>
                </View>
                {this.state.cheeseFlag ? (
                  <FontAwesome5
                    name="check"
                    size={responsiveFontSize(2.5)}
                    style={{
                      marginTop: responsiveHeight(0.45),
                      right: responsiveHeight(3),
                      position: 'absolute',
                    }}
                    color={'#e12c2c'}
                  />
                ) : null}
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  height: responsiveHeight(10),
                  borderBottomColor: 'rgba(0,0,0,0.3)',
                  borderBottomWidth: 0.71,
                  flexDirection: 'row',
                  alignItems: 'flex-end',
                  alignItems: 'center',
                }}
                onPress={() => {
                  this.setState({ oliveflag: !this.state.oliveflag });
                }}>
                <Text
                  style={{ fontSize: responsiveFontSize(2), fontWeight: 'bold' }}>
                  Olives
                </Text>
                <View
                  style={{
                    marginLeft: responsiveHeight(3),
                    flexDirection: 'row',
                  }}>
                  <Text style={styles.priceTextStyle}>£5.00</Text>
                </View>
                {this.state.oliveflag ? (
                  <FontAwesome5
                    name="check"
                    size={responsiveFontSize(2.5)}
                    style={{
                      marginTop: responsiveHeight(0.45),
                      right: responsiveHeight(3),
                      position: 'absolute',
                    }}
                    color={'#e12c2c'}
                  />
                ) : null}
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  height: responsiveHeight(10),
                  borderBottomColor: 'rgba(0,0,0,0.3)',
                  borderBottomWidth: 0.71,
                  flexDirection: 'row',
                  alignItems: 'flex-end',
                  alignItems: 'center',
                }}
                onPress={() => {
                  this.setState({ mashroomflag: !this.state.mashroomflag });
                }}>
                <Text
                  style={{ fontSize: responsiveFontSize(2), fontWeight: 'bold' }}>
                  Mashrooms
                </Text>
                <View
                  style={{
                    marginLeft: responsiveHeight(3),
                    flexDirection: 'row',
                  }}>
                  <Text style={styles.priceTextStyle}>£5.00</Text>
                </View>
                {this.state.mashroomflag ? (
                  <FontAwesome5
                    name="check"
                    size={responsiveFontSize(2.5)}
                    style={{
                      marginTop: responsiveHeight(0.45),
                      right: responsiveHeight(3),
                      position: 'absolute',
                    }}
                    color={'#e12c2c'}
                  />
                ) : null}
              </TouchableOpacity>
              <View
                style={{
                  height: responsiveHeight(5),
                  marginTop: responsiveHeight(8),
                  marginBottom: responsiveHeight(5),
                }}>
                <Text
                  style={{
                    fontSize: responsiveFontSize(2.5),
                    fontWeight: 'bold',
                  }}>
                  QUANTITY
                </Text>
              </View>
              <View
                style={{
                  height: responsiveHeight(5),
                  marginTop: responsiveHeight(2),
                  flexDirection: 'row',
                }}>
                <Text
                  style={{ fontSize: responsiveFontSize(2), fontWeight: 'bold' }}>
                  {this.state.quantity}
                </Text>
                <Text
                  style={{ fontSize: responsiveFontSize(2), fontWeight: 'bold' }}>
                  {' '}
                  Item
                </Text>

                <View
                  style={{
                    height: responsiveHeight(4),
                    width: responsiveWidth(20),
                    borderRadius: responsiveHeight(2.5),
                    flexDirection: 'row',
                    right: responsiveHeight(3),
                    position: 'absolute',
                  }}>
                  <TouchableOpacity
                    style={{
                      flex: 0.5,
                      borderWidth: 1,
                      borderColor: '#e12c2c',
                      borderBottomLeftRadius: responsiveHeight(2.5),
                      borderTopLeftRadius: responsiveHeight(2.5),
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                    onPress={() => {
                      this.state.quantity == 1
                        ? this.setState({ quantity: 1 })
                        : this.setState({ quantity: this.state.quantity - 1 });
                    }}>
                    <Text
                      style={{
                        fontSize: responsiveFontSize(3),
                        color: '#e12c2c',
                      }}>
                      -
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{
                      flex: 0.5,
                      height: responsiveHeight(3.96),
                      backgroundColor: '#e12c2c',
                      borderBottomRightRadius: responsiveHeight(2.5),
                      borderTopRightRadius: responsiveHeight(2.5),
                      marginBottom: responsiveHeight(3),
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                    onPress={() => {
                      this.state.quantity == 10
                        ? this.setState({ quantity: 10 })
                        : this.setState({ quantity: this.state.quantity + 1 });
                    }}>
                    <Text
                      style={{
                        fontSize: responsiveFontSize(2.5),
                        fontWeight: 'bold',
                        color: 'white',
                      }}>
                      +
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
              <TouchableOpacity
                style={{
                  marginRight: responsiveHeight(3),
                  height: responsiveHeight(9),
                  backgroundColor: '#e12c2c',
                  marginBottom: responsiveHeight(5),
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: responsiveHeight(2),
                  marginTop: responsiveHeight(8),
                }}
                onPress={() => this.props.navigation.navigate('Cart')}
                activeOpacity={0.7}>
                <Text
                  style={{
                    fontSize: responsiveFontSize(2),
                    fontWeight: 'bold',
                    color: 'white',
                  }}>
                  Add to Cart
                </Text>
                <Text
                  style={{
                    fontSize: responsiveFontSize(2),
                    color: 'white',
                    right: responsiveHeight(8),
                    position: 'absolute',
                  }}>
                  £5.00
                </Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </SafeAreaView>
      );
    } else if (Platform.OS === 'android') {
      return (
        <SafeAreaView
          forceInset={{ top: 'never' }}
          style={{ flex: 1, backgroundColor: colorWhite }}>


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
                    {'Item added to favourites list'}
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
                  style={{backgroundColor:'red',height:'10%',width:'90%',borderRadius:30,justifyContent:'center',alignItems:'center'}}
                  onPress={()=>{
                    this.setState({isVisible:false})
                  }}
                >
                  <Text style={{color:'white',fontWeight:'bold'}}>
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


          <StatusBar translucent backgroundColor="transparent" />
          <View style={{ flex: 1 }}>
            <NavigationEvents onWillFocus={() => this.onFocusFunction()} />
            <ImageBackground
              style={{
                height: responsiveHeight(30),
                width: responsiveWidth(100),
              }}
              resizeMode="cover"
              source={{ uri: item.image ? item.image : item.image }}>
              <LinearGradient
                colors={['rgba(255,255,255,0) ', 'rgba(255,255,255,0.9)']}
                start={{ x: -0.1, y: -0.19 }}
                end={{ x: -0.21, y: 0.9 }}
                style={{
                  flex: 1,
                  // paddingLeft: 15,
                  // paddingRight: 15,
                  borderRadius: 5,
                  // zIndex:1
                }}>
                <View
                  style={{
                    marginVertical: responsiveHeight(5),
                    marginHorizontal: responsiveHeight(3),
                  }}>
                  <TouchableOpacity
                    onPress={() => {
                      this.props.navigation.openDrawer();
                    }}>
                    <Image
                      style={{
                        height: responsiveHeight(4),
                        width: responsiveWidth(8),
                      }}
                      source={require('../../Assets/icons-Menu-1.png')}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => this.addFavorite(item.id)}
                    style={{
                      height: responsiveHeight(5),
                      width: responsiveHeight(5),
                      borderRadius: responsiveHeight(5),
                      backgroundColor: 'white',
                      right: 5,
                      // top: responsiveHeight(-1),
                      position: 'absolute',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <AntDesign
                      name="star"
                      size={responsiveFontSize(2)}
                      color={'#e12c2c'}
                    />
                  </TouchableOpacity>
                </View>
              </LinearGradient>
            </ImageBackground>
            <ScrollView
              style={{
                marginLeft: responsiveHeight(3),
                marginTop: responsiveHeight(5),
              }}>
              <View style={{ height: responsiveHeight(6) }}>
                <Text
                  style={{
                    fontSize: responsiveFontSize(2.5),
                    fontWeight: 'bold',
                  }}>
                  {item.name ? item.name : item.name}
                </Text>
              </View>

              <View
                style={{
                  height: responsiveHeight(6),
                  marginVertical: responsiveHeight(10),
                }}>
                <Text
                  style={{
                    fontSize: responsiveFontSize(2.5),
                    fontWeight: 'bold',
                  }}>
                  Description
                </Text>
                <Text
                  style={{
                    fontSize: responsiveFontSize(1.5),
                    color: 'rgba(0,0,0,0.3)',
                    fontWeight: 'bold',
                    //marginBottom: 
                  }}>
                  {item.description ? item.description : item.description}
                </Text>
              </View>
              {this.state.menu.length > 0 && (
                <View
                  style={{
                    height: responsiveHeight(5),
                    marginTop: responsiveHeight(2),
                  }}>
                  <Text
                    style={{
                      fontSize: responsiveFontSize(2.5),
                      fontWeight: 'bold',
                    }}>
                    QUANTITY
                  </Text>
                </View>
              )}

              {this.state.menu.map((item, index) => {
                return (
                  <View
                    style={{
                      height: responsiveHeight(10),
                      borderBottomColor: 'rgba(0,0,0,0.3)',
                      borderBottomWidth: 0.71,
                      flexDirection: 'row',
                      alignItems: 'flex-end',
                      alignItems: 'center',
                    }}>
                    <Text
                      style={{
                        fontSize: responsiveFontSize(2),
                        fontWeight: 'bold',
                      }}>
                      {item.size}
                    </Text>
                    <View
                      style={{
                        marginLeft: responsiveHeight(3),
                        flexDirection: 'row',
                      }}>
                      <Text style={styles.priceTextStyle}>
                        £{item.price ? item.price : item.price}
                      </Text>
                    </View>
                    <View style={styles.quantityMainContainer}>
                      <TouchableOpacity
                        style={styles.quantityContainerMinus}
                        onPress={() => {
                          if (this.state.SmallFlag > 0) {
                            this.calculateprice(index, item, true);
                          }
                          this.state.SmallFlag == 0
                            ? this.setState({ SmallFlag: 0 })
                            : this.setState({
                              SmallFlag: this.state.SmallFlag - 1,
                            });
                        }}>
                        <FontAwesome5
                          name="minus"
                          size={responsiveFontSize(1.5)}
                          color={'#e12c2c'}
                        />
                      </TouchableOpacity>
                      <Text>{item.quantity}</Text>
                      <TouchableOpacity
                        onPress={() => {
                          this.calculateprice(index, item, false);
                          this.state.SmallFlag == 10
                            ? this.setState({ SmallFlag: 10 })
                            : this.setState({
                              SmallFlag: this.state.SmallFlag + 1,
                            });
                        }}
                        style={styles.quantityContainerPlus}>
                        <FontAwesome5
                          name="plus"
                          size={responsiveFontSize(1.5)}
                          color={colorWhite}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                );
              })}
              {this.state.extras && this.state.extras.length > 0 ? (
                <View
                  style={{
                    height: responsiveHeight(5),
                    marginTop: responsiveHeight(6),
                  }}>
                  <Text
                    style={{
                      fontSize: responsiveFontSize(2.5),
                      fontWeight: 'bold',
                    }}>
                    EXTRAS
                  </Text>
                </View>
              ) : null}
              {this.state.extras &&
                this.state.extras.map((itm, index) => {
                  return (
                    <View>
                      <TouchableOpacity
                        style={{
                          height: responsiveHeight(10),
                          borderBottomColor: 'rgba(0,0,0,0.3)',
                          borderBottomWidth: 0.71,
                          flexDirection: 'row',
                          alignItems: 'flex-end',
                          alignItems: 'center',
                        }}
                        onPress={() => {
                          this.setState(
                            {
                              olive_id: index,
                              cheeseFlag:
                                this.state.cheesePrice != 0 &&
                                  this.state.cheeseFlag != '' &&
                                  this.state.olive_id
                                  ? ''
                                  : itm.name,
                              cheese_id: itm.id,
                              mashroomflag: !this.state.mashroomflag,
                            },
                            () => this.calculateprice2(index, itm.price, this.state.extras[index][itm.name + '_flag']),
                          );
                        }}>
                        <Text
                          style={{
                            fontSize: responsiveFontSize(2),
                            fontWeight: 'bold',
                          }}>
                          {itm.name}
                        </Text>
                        <View
                          style={{
                            marginLeft: responsiveHeight(3),
                            flexDirection: 'row',
                          }}>
                          <Text style={styles.priceTextStyle}>
                            £{itm.price}
                          </Text>
                        </View>

                        {this.state.extras[index][itm.name + '_flag'] ? (
                          <FontAwesome5
                            name="check"
                            size={responsiveFontSize(2.5)}
                            style={{
                              marginTop: responsiveHeight(0.45),
                              right: responsiveHeight(3),
                              position: 'absolute',
                            }}
                            color={'#e12c2c'}
                          />
                        ) : null}
                      </TouchableOpacity>
                    </View>
                  );
                })}
              <TouchableOpacity
                style={{
                  marginRight: responsiveHeight(3),
                  height: responsiveHeight(9),
                  backgroundColor: '#e12c2c',
                  marginBottom: responsiveHeight(5),
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: responsiveHeight(2),
                  marginTop: responsiveHeight(8),
                }}
                onPress={() => {
                  this.state.menu.length >= 1
                    ? this.navi()
                    : Toast.show('please select any item', Toast.SHORT, [
                      'UIAlertController',
                    ]);
                }}
                activeOpacity={0.7}>
                <Text
                  style={{
                    fontSize: responsiveFontSize(2),
                    fontWeight: 'bold',
                    color: 'white',
                  }}>
                  Add to Cart
                </Text>
                <Text
                  style={{
                    fontSize: responsiveFontSize(2),
                    color: 'white',
                    right: responsiveHeight(8),
                    position: 'absolute',
                  }}>
                  £{this.state.total}
                </Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </SafeAreaView>
      );
    }
  }
}
const styles = StyleSheet.create({
  priceTextStyle: {
    fontSize: responsiveFontSize(1.6),
    color: 'rgba(0,0,0,0.3)',
    fontWeight: 'bold',
  },
  quantityMainContainer: {
    marginTop: responsiveHeight(0.45),
    right: responsiveHeight(3),
    position: 'absolute',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#e12c2c',
    flexDirection: 'row',
    alignItems: 'center',
    height: responsiveHeight(3),
    width: responsiveWidth(20),
    borderRadius: responsiveHeight(2.5),
  },
  quantityContainerPlus: {
    // flex: 0.5,
    backgroundColor: '#e12c2c',
    height: '100%',
    width: '35%',
    borderBottomRightRadius: responsiveHeight(2.5),
    borderTopRightRadius: responsiveHeight(2.5),
    // marginBottom: responsiveHeight(3),
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityContainerMinus: {
    // flex: 0.5,
    borderRightWidth: 1,
    borderColor: '#e12c2c',
    height: '100%',
    width: '35%',
    borderBottomLeftRadius: responsiveHeight(2.5),
    borderTopLeftRadius: responsiveHeight(2.5),
    justifyContent: 'center',
    alignItems: 'center',
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
