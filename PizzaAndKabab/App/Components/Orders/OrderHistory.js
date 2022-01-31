import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  //  SafeAreaView,
  StatusBar,
  Image,
  TextInput,
  ActivityIndicator,
  Alert,
  ToastAndroid,
} from 'react-native';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {
  blue,
  colorWhite,
  lightBlack,
  headerColor,
  Pink,
  greyText,
  yellow,
} from '../../../GlobalCons/colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Pending from './Pending';
import Completed from './Complete';
import { SafeAreaView } from 'react-navigation';
import AsyncStorage from '@react-native-community/async-storage';
import moment from 'moment';
import { ListItem, Input, Button } from 'react-native-elements';
import NetInfo from '@react-native-community/netinfo'
import CustomModal from '../CustomComponents/CustomModal';
export default class Categories extends Component {
  state = {
    Pending: true,
    Completed: false,
    data: [],
    complete: [],
    loading: true,
    isVisible: false,
    refresh: false,
    myitemid:0,
  };
  componentDidMount = async () => {
    NetInfo.addEventListener(state => {
      if (!state.isConnected) {
        alert('Error:Please connect to internet.')
      }
    });
    //this._navListener = this.props.navigation.addListener('willFocus', () => {
      //StatusBar.setBarStyle('dark-content');
      //StatusBar.setBackgroundColor('transparent');
    //});
    let dataa = await AsyncStorage.getItem('token');
    var myHeaders = new Headers();
    myHeaders.append('Authorization', `Bearer ${dataa}`);

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
    };

    fetch(
      'https://pizzakebab.ranglerztech.website/api/order-history',
      requestOptions,
    )
      .then(response => response.text())
      .then(result => {
        let dataa = JSON.parse(result);
        if (dataa.successData) {
          let data = [];
          let arr = data.push(dataa.successData);
          console.log('mrs.saleh', dataa.successData)
          dataa.successData.map(item => {
            if (item.status == 'delivered') {
              let data = [];
              data.push(dataa.successData);
              this.setState({ complete: dataa.successData });
              this.setState({ loading: false });
            } else {
              let pending = [];
              pending.push(dataa.successData);

              this.setState({ data: dataa.successData });
              this.setState({ loading: false })
            }
          });
        } else {
          this.setState({ loading: false });
          alert(dataa.message);
        }
      })
      .catch(error => console('error', error));
  };
  cancel = async item => {
    this.setState({ loading: true });
    let dataa = await AsyncStorage.getItem('token');
    var myHeaders = new Headers();
    myHeaders.append('Authorization', `Bearer ${dataa}`);

    var formdata = new FormData();
    formdata.append('order_id', item);
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: formdata,
      redirect: 'follow',
    };

    fetch(
      'https://pizzakebab.ranglerztech.website/api/cancel-order',
      requestOptions,
    )
      .then(response => response.text())
      .then(async result => {
        let dataa = JSON.parse(result);
        console.log('hghhh', dataa)
        if (dataa.status == 200) {
          let dataa = await AsyncStorage.getItem('token');
          var myHeaders = new Headers();
          myHeaders.append('Authorization', `Bearer ${dataa}`);
          this.setState({ refresh: !this.state.refresh });
          var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow',
          };

          fetch(
            'https://pizzakebab.ranglerztech.website/api/order-history',
            requestOptions,
          )
            .then(response => response.text())
            .then(result => {
              let dataa = JSON.parse(result);
              /*Alert.alert(
                'Response',
                result
              )*/
              if (dataa.successData) {
                console.log("daaaaass", dataa.message, "datat", dataa);
                let data = [];
                let arr = data.push(dataa.successData);
                console.log('saleh', arr[0]);
                dataa.successData.map(item => {
                  if (item.status == 'delivered') {
                    let data = [];
                    data.push(dataa.successData);
                    this.setState({ complete: dataa.successData, loading: false });
                  } else {
                    let pending = [];
                    pending.push(dataa.successData);

                    this.setState({ data: dataa.successData, loading: false });
                  }
                });
                this.setState({ loading: false })
                ToastAndroid.show('Order removed!', ToastAndroid.SHORT);
              } else {
                this.setState({ loading: false });
              }
            })
            .catch(error => console('error', error));
          // alert("dddddddddddddddddddd",dataa.message);


        }
      })
      .catch(error => console('error', error));
  };

  splited(item) {
    var data = item.split(' ');
    return data[0];
  }
  addSmall = item => {
    console.log(item.length);
    let quantity = 0;
    item.map(data => {
      console.log(data);
      let dataa = quantity;
      quantity = dataa + JSON.parse(data.quantity);
    });

    return quantity;
  };

  PrintCard = post => {
    let item = post.item;
    let index = post.index;
    // console.log('>>>>>>>>>>>item<<<<<<<<<<<<<', item.menu_detail);
    // console.log('hjhjj', item.menu_detail);

    return (
      <View style={Styles.MainCard}>
        <View style={Styles.InnerCardView}>
          <View style={Styles.DateView}>
            <View style={{ width: '80%' }}>
              <Text style={Styles.MediumText}>
                {this.splited(item.created_at)}
                {' at '}
                {moment(item.created_at, ' hh:mm a').format(' hh:mm a')}
              </Text>
            </View>
            <View style={{ width: '80%' }}>
              <Text style={[Styles.MediumText, { color: Pink }]}>
                {'£'}
                {item.total}
              </Text>
            </View>
          </View>

          {item.order_menu && (
            <FlatList
              data={item.order_menu}
              keyExtractor={item => item.id}
              renderItem={itm => {
                let post = itm.item;
                console.log("majid", post.menu);
                return (
                  <View
                    style={{
                      justifyContent: 'space-between',
                    }}>
                    {post.menu_detail.map(item => {
                      console.log(item);
                      return (
                        item.quantity && <Text style={Styles.SmallText}>
                          {item.quantity}
                          {'x '}
                          {item.size}{" "}
                          {post.menu.name}
                        </Text>
                      );
                    })}
                  </View>
                );
              }}
            />
          )}
          {/*<CustomModal isVisible={this.state.isVisible}>
            <View
              style={{
                flex: 1,
                alignSelf: 'center',
                justifyContent: 'center',
              }}>
              
              <View style={Styles.modalMainContainer}>
                <View style={Styles.modalTextContainer}>
                  <Text style={Styles.modalTextStyle}>
                    {'Do you want to cancel your order? '}
                  </Text>
                </View>
                <Button
                  title="Yes"
                  onPress={() => {
                    this.cancel(item.id);
                    // this.props.navigation.navigate('Resturents');
                    this.setState({ isVisible: false });
                  }}
                  titleStyle={Styles.buttonTitleStyle}
                  buttonStyle={[
                    Styles.buttonStyle,
                    { borderRadius: responsiveWidth(10) },
                  ]}
                  containerStyle={Styles.modalButtonContainer}
                />
                <Button
                  title="No"
                  onPress={() => {
                    // this.cancel(item.id)
                    // this.props.navigation.navigate('Resturents');
                    this.setState({ isVisible: false });
                  }}
                  titleStyle={Styles.buttonTitleStyle}
                  buttonStyle={[
                    Styles.buttonStyle,
                    {
                      borderRadius: responsiveWidth(10),
                      backgroundColor: '#e12c2c',
                    },
                  ]}
                  containerStyle={Styles.modalButtonContainer}
                />
              </View>
            </View>
          </CustomModal>*/}

          {item.status == 'pending' && (
            <Text
              onPress={() => {
                this.setState({myitemid:item.id});
                this.setState({isVisible: true})
                /*Alert.alert(
                  'Do you want to cancel the order',
                  '',
                  [
                    {
                      text: "Cancel",
                      onPress: () => {
                        console.log("Cancel Pressed")
                      },
                      style: "cancel"
                    },
                    {
                      text: "OK", onPress: () => {
                        this.setState({myitemid:item.id});
                        //console.log("OK Pressed")

                      }
                    }
                  ],
                )*/
              }}
              style={{
                left: responsiveWidth(67),
                color: greyText,
                fontSize: responsiveFontSize(2.2),
              }}>
              {'Cancel'}
            </Text>
          )}
          {item.status == 'InKitchen' && (
            <Text
              style={{
                left: responsiveWidth(63),
                color: greyText,
                fontSize: responsiveFontSize(2.2),
              }}>
              {'InKitchen'}
            </Text>
          )}
          {item.status == 'OnRoute' && (
            <Text
              style={{
                left: responsiveWidth(64.5),
                color: greyText,
                fontSize: responsiveFontSize(2.2),
              }}>
              {'OnRoute'}
            </Text>
          )}
          {item.status == 'FoodReady' && (
            <Text
              style={{
                left: responsiveWidth(63),
                color: greyText,
                fontSize: responsiveFontSize(2.2),
              }}>
              {'FoodReady'}
            </Text>
          )}
        </View>
      </View>
    );
  };
  Print2Card = post => {
    let item = post.item;
    let index = post.index;
    return (
      <View style={Styles.MainCard}>
        <View style={Styles.InnerCardView}>
          <View style={Styles.DateView}>
            <View style={{ width: '80%' }}>
              <Text style={Styles.MediumText}>
                {this.splited(item.created_at)}
                {' at '}
                {moment(item.created_at, ' hh:mm a').format(' hh:mm a')}
              </Text>
            </View>
            <View style={{ width: '80%' }}>
              <Text style={[Styles.MediumText, { color: Pink }]}>
                {'£ '}
                {item.total}
              </Text>
            </View>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <View style={{ width: '80%' }}>
              <TouchableOpacity>
                <Text style={Styles.SmallText}>{'Order Details'}</Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                width: '20%',
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              {/*<Ionicons
                color={yellow}
                name={'ios-star'}
                size={responsiveFontSize(2.5)}
              />*/}
              <Text
                style={[
                  Styles.SmallText,
                  { color: lightBlack, marginLeft: responsiveWidth(1) },
                ]}>
                {item.ratings}
              </Text>
            </View>
          </View>
          <View style={Styles.OrderAgainView}>
            <Text style={[Styles.SmallText, { color: Pink }]}>
              {'Order Again'}
            </Text>
          </View>
        </View>
      </View>
    );
  };

  render() {
    if (Platform.OS === 'ios') {
      return (
        <SafeAreaView style={Styles.container}>
          <View
            style={{
              height: responsiveHeight(22),
              width: '100%',
              backgroundColor: headerColor,
            }}>
            <View
              style={{
                height: responsiveHeight(14),
                width: '90%',
                alignSelf: 'center',
                justifyContent: 'flex-end',
              }}>
              <TouchableOpacity
                onPress={() => {
                  this.props.navigation.goBack();
                }}>
                {/*<Ionicons
                  name={'ios-arrow-back'}
                  color={blueBG}
                  size={responsiveFontSize(3.5)}
                />*/}
              </TouchableOpacity>
            </View>
            <View style={Styles.HeaderTextView}>
              <View style={Styles.ButtonsOutlineView}>
                <TouchableOpacity
                  style={[
                    this.state.Pending
                      ? Styles.pressedButtonTouch
                      : Styles.defaultButtonTouch,
                  ]}
                  onPress={() => {
                    this.setState({ Pending: true, Completed: false });
                  }}>
                  <Text
                    style={[
                      this.state.Pending
                        ? Styles.pressedButtonText
                        : Styles.defaultButtonText,
                    ]}>
                    Pending
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    this.state.Completed
                      ? Styles.pressedButtonTouch
                      : Styles.defaultButtonTouch,
                  ]}
                  onPress={() => {
                    this.setState({ Pending: false, Completed: true });
                  }}>
                  <Text
                    style={[
                      this.state.Completed
                        ? Styles.pressedButtonText
                        : Styles.defaultButtonText,
                    ]}>
                    Completed
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          {this.state.Pending ? (
            <Pending {...this.props} />
          ) : this.state.Completed ? (
            <Completed {...this.props} />
          ) : null}
        </SafeAreaView>
      );
    } else if (Platform.OS === 'android') {
      return (
        <SafeAreaView forceInset={{ top: 'never' }} style={Styles.container}>
          <CustomModal isVisible={this.state.isVisible}>
            <View
              style={{
                flex: 1,
                alignSelf: 'center',
                justifyContent: 'center',
              }}>
              
              <View style={Styles.modalMainContainer}>
                <View style={Styles.modalTextContainer}>
                  <Text style={Styles.modalTextStyle}>
                    {'Do you want to cancel your order? '}
                  </Text>
                </View>
                <Button
                  title="Yes"
                  onPress={() => {
                    this.cancel(this.state.myitemid);
                    // this.props.navigation.navigate('Resturents');
                    this.setState({ isVisible: false });
                  }}
                  titleStyle={Styles.buttonTitleStyle}
                  buttonStyle={[
                    Styles.buttonStyle,
                    { borderRadius: responsiveWidth(10) },
                  ]}
                  containerStyle={Styles.modalButtonContainer}
                />
                <Button
                  title="No"
                  onPress={() => {
                    // this.cancel(item.id)
                    // this.props.navigation.navigate('Resturents');
                    this.setState({ isVisible: false });
                  }}
                  titleStyle={Styles.buttonTitleStyle}
                  buttonStyle={[
                    Styles.buttonStyle,
                    {
                      borderRadius: responsiveWidth(10),
                      backgroundColor: '#e12c2c',
                    },
                  ]}
                  containerStyle={Styles.modalButtonContainer}
                />
              </View>
            </View>
          </CustomModal>
          <View style={Styles.Header}>
            <View style={Styles.ArrowView}>
              <TouchableOpacity
                onPress={() => this.props.navigation.openDrawer()}>
                <Image
                  source={require('../../Assets/icons-Menu-2.png')}
                  style={Styles.headerImageStyle}
                />
              </TouchableOpacity>
            </View>
            <View style={Styles.HeaderTextView}>
              <View style={Styles.ButtonsOutlineView}>
                <TouchableOpacity
                  style={[
                    this.state.Pending
                      ? Styles.pressedButtonTouch
                      : Styles.defaultButtonTouch,
                  ]}
                  onPress={() => {
                    this.setState({ Pending: true, Completed: false });
                  }}>
                  <Text
                    style={[
                      this.state.Pending
                        ? Styles.pressedButtonText
                        : Styles.defaultButtonText,
                    ]}>
                    Pending
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    this.state.Completed
                      ? Styles.pressedButtonTouch
                      : Styles.defaultButtonTouch,
                  ]}
                  onPress={() => {
                    this.setState({ Pending: false, Completed: true });
                  }}>
                  <Text
                    style={[
                      this.state.Completed
                        ? Styles.pressedButtonText
                        : Styles.defaultButtonText,
                    ]}>
                    Completed
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          {this.state.Pending ? (
            this.state.loading ? (
              <View
                style={[
                  Styles.container,
                  { justifyContent: 'center', alignItems: 'center' },
                ]}>
                <ActivityIndicator
                  size="large"
                  styles={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                  color="#393b82"
                />
              </View>
            ) : this.state.data.length > 0 ? (
              <FlatList
                data={this.state.data}
                contentContainerStyle={Styles.contentContainerStyle}
                keyExtractor={item => item.id}
                ItemSeparatorComponent={() => <View style={Styles.Seprator} />}
                renderItem={item => this.PrintCard(item)}
              />
            ) : (
                  <View
                    style={{
                      flex: 1,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Text
                      style={{
                        color: blue,
                        fontWeight: 'bold',
                        fontSize: responsiveFontSize(4),
                        letterSpacing: 1,
                        fontSize: responsiveFontSize(3),
                      }}>
                      {'No order Yet'}
                    </Text>
                  </View>
                )
          ) : this.state.Completed ? (
            this.state.loading ? (
              <View
                style={[
                  Styles.container,
                  { justifyContent: 'center', alignItems: 'center' },
                ]}>
                <ActivityIndicator
                  size="large"
                  styles={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                  color="#393b82"
                />
              </View>
            ) : this.state.complete.length > 0 ? (
              <FlatList
                data={this.state.complete}
                contentContainerStyle={Styles.contentContainerStyle}
                keyExtractor={item => item.id}
                ItemSeparatorComponent={() => <View style={Styles.Seprator} />}
                renderItem={item => this.Print2Card(item)}
              />
            ) : (
                  <View
                    style={{
                      flex: 1,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Text
                      style={{
                        color: blue,
                        fontWeight: 'bold',
                        fontSize: responsiveFontSize(4),
                        letterSpacing: 1,
                        fontSize: responsiveFontSize(3),
                      }}>
                      {'No order Yet'}
                    </Text>
                  </View>
                )
          ) : null}
        </SafeAreaView>
      );
    }
  }
}
const blueBG = '#393b82';
const Styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colorWhite,
  },
  contentContainerStyle: {
    paddingVertical: responsiveHeight(4),
  },
  Seprator: {
    marginTop: responsiveHeight(2),
  },
  MainCard: {
    width: '90%',
    borderRadius: 8,
    elevation: 5,
    backgroundColor: colorWhite,
    alignSelf: 'center',
    paddingVertical: responsiveHeight(2),
  },
  InnerCardView: {
    width: '90%',
    alignSelf: 'center',
  },
  modalMainContainer: {
    height: responsiveHeight(30),
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
  DateView: {
    width: '100%',
    flexDirection: 'row',
  },
  MediumText: {
    color: blue,
    fontSize: responsiveFontSize(2.5),
  },
  SmallText: {
    color: greyText,
    fontSize: responsiveFontSize(2.2),
  },
  Header: {
    height: responsiveHeight(20),
    width: '100%',
    backgroundColor: headerColor,
  },
  ArrowView: {
    height: responsiveHeight(10),
    width: '90%',
    alignSelf: 'center',
    justifyContent: 'flex-end',
  },
  HeaderTextView: {
    paddingTop: responsiveHeight(1),
    width: '90%',
    alignSelf: 'center',
  },
  headerImageStyle: {
    resizeMode: 'contain',
    width: responsiveWidth(10),
    height: responsiveHeight(5),
  },
  ButtonsOutlineView: {
    width: '80%',
    height: responsiveHeight(5),
    alignSelf: 'center',
    borderRadius: 50,
    borderColor: Pink,
    borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  defaultButtonTouch: {
    height: '100%',
    width: '49%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  pressedButtonTouch: {
    height: '100%',
    width: '49%',
    backgroundColor: Pink,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    borderColor: Pink,
    borderWidth: 1,
  },
  defaultButtonText: {
    color: Pink,
    fontSize: responsiveFontSize(2),
  },
  pressedButtonText: {
    color: colorWhite,
    fontSize: responsiveFontSize(2),
  },
  OrderAgainView: {
    marginTop: responsiveHeight(1),
    height: responsiveHeight(5),
    width: '100%',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
});
