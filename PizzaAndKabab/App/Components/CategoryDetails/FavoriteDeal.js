import React, {Component} from 'react';
import {
  View,
  Text,
  StatusBar,
  // SafeAreaView,
  ImageBackground,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from 'react-native';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {blue, colorWhite, phColor} from '../../../GlobalCons/colors';
import LinearGradient from 'react-native-linear-gradient';
import {SafeAreaView} from 'react-navigation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-community/async-storage';
import NetInfo from '@react-native-community/netinfo'
let Order = [];
export default class FavoriteDeal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      SmallFlag: 0,
      mediumFlag: 0,
      largeFlag: 0,
      superFlag: 0,
      cheeseFlag: false,
      mashroom_id: 0,
      olive_id: 0,
      cheese_id: 0,
      oliveflag: false,
      mashroomflag: false,
      quantity: 1,
      total: 0,
      check: 0,
      item: this.props.navigation.state.params.item,
    };
  }
  componentDidMount() {
    NetInfo.addEventListener(state => {
      if(!state.isConnected){
        alert('Error:Please connect to internet.')
      }
    });
    this._navListener = this.props.navigation.addListener('willFocus', () => {
      if (Platform.OS === 'ios') {
        StatusBar.setBarStyle('dark-content');
      } else {
        StatusBar.setBarStyle('light-content');
        StatusBar.setBackgroundColor('transparent');
      }
    });
  }
  addFavorite = async id => {
    console.log('call');
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
          alert(dataa.message);
        } else {
          alert(dataa.message);
        }
      })
      .catch(error => alert('error', error));
  };

  navi() {
    let item = {
      item: this.state.item,
      small: this.state.SmallFlag,
      medium: this.state.mediumFlag,
      large: this.state.largeFlag,
      super: this.state.superFlag,
      quantity: this.state.quantity,
      total: this.state.total,
      cheese: this.state.cheese_id,
      mashroom: this.state.mashroom_id,
      olive: this.state.olive_id,
    };
    let present =
      Order !== [] ? Order.find(item2 => item2.item.id === item.item.id) : null;
    console.log('PRESENT', present);
    if (present === undefined) {
      Order.push(item);
      // console.log('Order in check', Order.length);
    }
    this.props.navigation.navigate('Cart', {
      item: item,
      Order: Order,
    });
  }
  calculateprice = (item, flag) => {
    console.log(flag);
    let value = JSON.parse(item);
    if (flag) {
      console.log(flag);
      let data = this.state.total - value;
      this.setState({total: data, check: data});
    } else {
      let data = this.state.total + value;
      this.setState({total: data, check: data});
    }
  };
  calculate = () => {
    let data = this.state.total + this.state.check;
    this.setState({total: data});
  };
  calculateminus = () => {
    let data = this.state.total - this.state.check;
    this.setState({total: data});
  };
  render() {
    const {item} = this.state;
    console.log('data>>>>>>>>>>', item);
    if (Platform.OS === 'ios') {
      StatusBar.setBarStyle('light-content');
      return (
        <SafeAreaView
          forceInset={{top: 0}}
          style={{flex: 1, backgroundColor: colorWhite}}>
          <StatusBar barStyle="dark-content" />
          <View style={{flex: 1}}>
            <ImageBackground
              style={{
                height: responsiveHeight(30),
                width: responsiveWidth(100),
              }}
              resizeMode="cover"
              source={{uri: item.image}}>
              <LinearGradient
                colors={['rgba(255,255,255,0) ', 'rgba(255,255,255,0.9)']}
                start={{x: -0.1, y: -0.19}}
                end={{x: -0.21, y: 0.9}}
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
              <View style={{height: responsiveHeight(6)}}>
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
                  this.setState({SmallFlag: !this.state.SmallFlag});
                }}>
                <Text
                  style={{fontSize: responsiveFontSize(2), fontWeight: 'bold'}}>
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
                  this.setState({mediumFlag: !this.state.mediumFlag});
                }}>
                <Text
                  style={{fontSize: responsiveFontSize(2), fontWeight: 'bold'}}>
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
                  this.setState({largeFlag: !this.state.largeFlag});
                }}>
                <Text
                  style={{fontSize: responsiveFontSize(2), fontWeight: 'bold'}}>
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
                  this.setState({superFlag: !this.state.superFlag});
                }}>
                <Text
                  style={{fontSize: responsiveFontSize(2), fontWeight: 'bold'}}>
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
                  this.setState({cheeseFlag: !this.state.cheeseFlag});
                }}>
                <Text
                  style={{fontSize: responsiveFontSize(2), fontWeight: 'bold'}}>
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
                  this.setState({oliveflag: !this.state.oliveflag});
                }}>
                <Text
                  style={{fontSize: responsiveFontSize(2), fontWeight: 'bold'}}>
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
                  this.setState({mashroomflag: !this.state.mashroomflag});
                }}>
                <Text
                  style={{fontSize: responsiveFontSize(2), fontWeight: 'bold'}}>
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
                  style={{fontSize: responsiveFontSize(2), fontWeight: 'bold'}}>
                  {this.state.quantity}
                </Text>
                <Text
                  style={{fontSize: responsiveFontSize(2), fontWeight: 'bold'}}>
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
                        ? this.setState({quantity: 1})
                        : this.setState({quantity: this.state.quantity - 1});
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
                        ? this.setState({quantity: 10})
                        : this.setState({quantity: this.state.quantity + 1});
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
          forceInset={{top: 'never'}}
          style={{flex: 1, backgroundColor: colorWhite}}>
          <StatusBar translucent backgroundColor="transparent" />
          <View style={{flex: 1}}>
            <ImageBackground
              style={{
                height: responsiveHeight(30),
                width: responsiveWidth(100),
              }}
              resizeMode="cover"
              source={{uri: item.image?item.image:item.menu.image}}>
              <LinearGradient
                colors={['rgba(255,255,255,0) ', 'rgba(255,255,255,0.9)']}
                start={{x: -0.1, y: -0.19}}
                end={{x: -0.21, y: 0.9}}
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
              <View style={{height: responsiveHeight(6)}}>
                <Text
                  style={{
                    fontSize: responsiveFontSize(2.5),
                    fontWeight: 'bold',
                  }}>
                  {item.name?item.name:item.menu.name}
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
                  {item.description?item.description:item.menu.description}
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
              {item.is_small == '1'||item.menu.is_small=="1" ? (
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
                    Small
                  </Text>
                  <View
                    style={{
                      marginLeft: responsiveHeight(3),
                      flexDirection: 'row',
                    }}>
                    <Text style={styles.priceTextStyle}>
                      £{item.small_price?item.small_price:item.menu.small_price}
                    </Text>
                  </View>
                  <View
                    style={{
                      marginTop: responsiveHeight(0.45),
                      right: responsiveHeight(3),
                      position: 'absolute',
                      height: responsiveHeight(3),
                      width: responsiveWidth(20),
                      justifyContent: 'space-around',
                      borderBottomColor: '#000',
                      borderWidth: 1,
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}>
                    <FontAwesome5
                      name="plus"
                      size={responsiveFontSize(1.5)}
                      color={'#000'}
                      onPress={() => {
                        this.calculateprice(item.small_price?item.small_price:item.menu.small_price, false);
                        this.state.SmallFlag == 10
                          ? this.setState({SmallFlag: 10})
                          : this.setState({
                              SmallFlag: this.state.SmallFlag + 1,
                            });
                      }}
                    />
                    <Text>{this.state.SmallFlag}</Text>
                    <FontAwesome5
                      name="minus"
                      size={responsiveFontSize(1.5)}
                      color={'#000'}
                      onPress={() => {
                        this.calculateprice(item.small_price?item.small_price:item.menu.small_price, true);
                        this.state.SmallFlag == 0
                          ? this.setState({SmallFlag: 0})
                          : this.setState({
                              SmallFlag: this.state.SmallFlag - 1,
                            });
                      }}
                    />
                  </View>
                </View>
              ) : null}
              {item.is_medium == '1' || item.menu.is_medium=='1'? (
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
                    Medium
                  </Text>
                  <View
                    style={{
                      marginLeft: responsiveHeight(3),
                      flexDirection: 'row',
                    }}>
                    <Text style={styles.priceTextStyle}>
                      £{item.medium_price?item.medium_price:item.menu.medium_price}
                    </Text>
                  </View>

                  <View
                    style={{
                      marginTop: responsiveHeight(0.45),
                      right: responsiveHeight(3),
                      position: 'absolute',
                      height: responsiveHeight(3),
                      width: responsiveWidth(20),
                      justifyContent: 'space-around',
                      borderBottomColor: '#000',
                      borderWidth: 1,
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}>
                    <FontAwesome5
                      name="plus"
                      size={responsiveFontSize(1.5)}
                      color={'#000'}
                      onPress={() => {
                        this.calculateprice(item.medium_price?item.medium_price:item.menu.medium_price, false);
                        this.state.mediumFlag == 10
                          ? this.setState({mediumFlag: 10})
                          : this.setState({
                              mediumFlag: this.state.mediumFlag + 1,
                            });
                      }}
                    />
                    <Text>{this.state.mediumFlag}</Text>
                    <FontAwesome5
                      name="minus"
                      size={responsiveFontSize(1.5)}
                      color={'#000'}
                      onPress={() => {
                        this.calculateprice(item.medium_price?item.medium_price:item.menu.medium_price, true);
                        this.state.mediumFlag == 0
                          ? this.setState({mediumFlag: 0})
                          : this.setState({
                              mediumFlag: this.state.mediumFlag - 1,
                            });
                      }}
                    />
                  </View>
                </View>
              ) : null}
              {item.is_large == '1'||item.menu.is_large ? (
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
                    Large
                  </Text>
                  <View
                    style={{
                      marginLeft: responsiveHeight(3),
                      flexDirection: 'row',
                    }}>
                    <Text style={styles.priceTextStyle}>
                      £{item.large_price?item.large_price:item.menu.large_price}
                    </Text>
                  </View>
                  <View
                    style={{
                      marginTop: responsiveHeight(0.45),
                      right: responsiveHeight(3),
                      position: 'absolute',
                      height: responsiveHeight(3),
                      width: responsiveWidth(20),
                      justifyContent: 'space-around',
                      borderBottomColor: '#000',
                      borderWidth: 1,
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}>
                    <FontAwesome5
                      name="plus"
                      size={responsiveFontSize(1.5)}
                      color={'#000'}
                      onPress={() => {
                        this.calculateprice(item.large_price?item.large_price:item.menu.large_price, false);
                        this.state.largeFlag == 10
                          ? this.setState({largeFlag: 10})
                          : this.setState({
                              largeFlag: this.state.largeFlag + 1,
                            });
                      }}
                    />
                    <Text>{this.state.largeFlag}</Text>
                    <FontAwesome5
                      name="minus"
                      size={responsiveFontSize(1.5)}
                      color={'#000'}
                      onPress={() => {
                        this.calculateprice(item.large_price?item.large_price:item.menu.large_price, true);
                        this.state.largeFlag == 0
                          ? this.setState({largeFlag: 0})
                          : this.setState({
                              largeFlag: this.state.largeFlag - 1,
                            });
                      }}
                    />
                  </View>
                </View>
              ) : null}
              {item.is_super == '1'||item.menu.is_super=='1' ? (
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
                    Super
                  </Text>
                  <View
                    style={{
                      marginLeft: responsiveHeight(3),
                      flexDirection: 'row',
                    }}>
                    <Text style={styles.priceTextStyle}>
                      £{item.super_price?item.super_price:item.menu.super_price}
                    </Text>
                  </View>
                  <View
                    style={{
                      marginTop: responsiveHeight(0.45),
                      right: responsiveHeight(3),
                      position: 'absolute',
                      height: responsiveHeight(3),
                      width: responsiveWidth(20),
                      justifyContent: 'space-around',
                      borderBottomColor: '#000',
                      borderWidth: 1,
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}>
                    <FontAwesome5
                      name="plus"
                      size={responsiveFontSize(2.5)}
                      color={'#000'}
                      onPress={() => {
                        this.calculateprice(item.super_price?item.super_price:item.menu.super_price, false);
                        this.state.superFlag == 10
                          ? this.setState({superFlag: 10})
                          : this.setState({
                              superFlag: this.state.superFlag + 1,
                            });
                      }}
                    />
                    <Text>{this.state.superFlag}</Text>
                    <FontAwesome5
                      name="minus"
                      size={responsiveFontSize(2.5)}
                      color={'#000'}
                      onPress={() => {
                        this.calculateprice(item.super_price?item.super_price:item.menu.super_price, true);
                        this.state.superFlag == 0
                          ? this.setState({superFlag: 0})
                          : this.setState({
                              superFlag: this.state.superFlag - 1,
                            });
                      }}
                    />
                  </View>
                </View>
              ) : null}
              {item.extras&&item.extras.length > 0 ? (
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
              {item.extras&&item.extras.map(itm => {
                console.log('ite', item);
                return (
                  <View>
                    {itm.name == 'cheese' ? (
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
                          if (!this.state.cheeseFlag) {
                            this.calculateprice(itm.price, false);
                            this.setState({
                              cheeseFlag: true,
                              cheese_id: itm.id,
                            });
                          } else {
                            this.calculateprice(itm.price, true);
                            this.setState({
                              cheeseFlag: false,
                              cheese_id: itm.id,
                            });
                          }
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
                    ) : itm.name == 'olive' ? (
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
                          if (this.state.oliveflag) {
                            this.calculateprice(itm.price, true);
                            this.setState({
                              oliveflag: false,
                              olive_id: itm.id,
                            });
                          } else {
                            this.calculateprice(itm.price, false);
                            this.setState({oliveflag: true, olive_id: itm.id});
                          }
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
                    ) : (
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
                          if (this.state.mashroomflag) {
                            this.calculateprice(itm.price, true);
                            this.setState({
                              mashroomflag: false,
                              mashroom_id: itm.id,
                            });
                          } else {
                            this.calculateprice(itm.price, false);
                            this.setState({
                              mashroomflag: true,
                              mashroom_id: itm.id,
                            });
                          }
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
                    )}
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
                onPress={() => this.navi()}
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
});
