import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  StatusBar,
  //SafeAreaView,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { SafeAreaView } from 'react-navigation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { blue, colorWhite, phColor } from '../../../GlobalCons/colors';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import AsyncStorage from '@react-native-community/async-storage';
import { ActivityIndicator } from 'react-native-paper';
import { connect } from 'react-redux';
import { Data, subTotal } from '../../Redux/Action/Action';
import { NavigationEvents } from 'react-navigation';
import { SUBTotal } from '../../Redux/Action/Type';
import NetInfo from '@react-native-community/netinfo'
class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      item: this.props.navigation.state.params.item,
      order: this.props.navigation.state.params.Order,
      tex: 0,
      deliveryCharges: 0,
      loading: true,
      comment: '',
      subtotal: 0,
      total: null,
      check: null,
      menu: [],
      data: null,
      texs: 0
    };
  }
  componentDidMount = async () => {
    console.log('majid pagl',this.state.order)
    if(this.state.order){
    NetInfo.addEventListener(state => {
      if (!state.isConnected) {
        alert('Error:Please connect to internet.')
      }
    });
    await AsyncStorage.getItem("data").then(res => {
      let arr = new Array()
      if (res && this.state.order !== 1) {
        // this.setState({item:JSON.parse(res)})
        this.setState({ data: JSON.parse(res) }, () => {
          arr = this.state.data;
          setTimeout(async () => {
            await AsyncStorage.setItem("data", JSON.stringify(arr))
          }, 200)
          console.log("res>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>", this.state.item)
          arr.push(this.state.item);
        })

      }
      else if (res && !this.state.order) {

        this.setState({ data: JSON.parse(res) })
        arr.push(this.state.item);
        setTimeout(async () => {
          await AsyncStorage.setItem("data", JSON.stringify(arr))
        }, 200)
      }
      else if (this.state.order == 1) {
        this.setState({ data: JSON.parse(res) })
      }
      else {
        arr.push(this.state.item);
        setTimeout(async () => {
          // console.log("datarrrrrrrrrrrrrrrrrrrrrrrrrr", arr)
          await AsyncStorage.setItem("data", JSON.stringify(arr))
        }, 200)
        console.log("data")
        this.setState({ data: arr })
      }
    })

    let dataa = await AsyncStorage.getItem('token');
    let branch = await AsyncStorage.getItem("branch_id")
    this._navListener = this.props.navigation.addListener('willFocus', () => {
      if (Platform.OS === 'ios') {
        StatusBar.setBarStyle('light-content');
      } else {
        StatusBar.setBarStyle('light-content');
        StatusBar.setBackgroundColor('transparent');
      }
    });
    var myHeaders = new Headers();
    myHeaders.append('Authorization', `Bearer ${dataa}`);

    var formdata = new FormData();
    formdata.append('branch_id', branch && branch !== undefined ? branch : Array.isArray(this.state.item) ? this.state.item[0].item.branch_id : this.state.item.item.branch_id);

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: formdata,
      redirect: 'follow',
    };

    await fetch('https://pizzakebab.ranglerztech.website/api/get-tax', requestOptions)
      .then(response => response.text())
      .then(result => {
        let dataa = JSON.parse(result);
        console.log("sibgha pagala ",dataa)
        if (dataa.status == 200&&dataa.successData&&dataa.successData.length>0) {
          dataa.successData.map(async item => {
            // let check=await AsyncStorage.getItem("subTotal")
            // let check2=await AsyncStorage.getItem("total")
            this.setState({ tex: item.percent })
          });
        } else {
          this.setState({ tex: 0 })
          // alert(dataa.message);
        }
      })
      .catch(error => {
        this.setState({ loading: false });
        alert(error.message)
      });

    await fetch(
      'https://pizzakebab.ranglerztech.website/api/get-delivery-charges',
      requestOptions,
    )
      .then(response => response.text())
      .then(result => {
        let dataa = JSON.parse(result);
        if (dataa.status == 200) {
          this.setState({
            deliveryCharges: dataa.successData?dataa.successData.charges:"0",
            loading: false,
          });
          // if (this.state.deliveryCharges != 0 && this.state.tex != 0) {
            console.log('sa', this.state.tex)
            this.culculateSubTotal()
          
        } else {
          alert(dataa.message);
        }
      })
      .catch(error => {
        this.setState({ loading: false });
        alert(error.message)
      });
    }
    else{
      this.setState({loading:false})
    }
  };



  culculateSubTotal() {
    if (this.state.data && this.state.data.length > 1) {
      let data = 0;
      this.state.data.map(async (item, index) => {
        console.log("Majidoooo333", item.total)
        let datta = 0;
        this.state.subtotal = JSON.parse(this.state.subtotal) + JSON.parse(Array.isArray(item) ? item[index].total : item.total);
      });
      console.log('sa', this.state.tex)
      this.state.texs = (this.state.subtotal * this.state.tex) / 100
      console.log('sa111', this.state.texs)
      this.setState({ subtotal: this.state.subtotal })

      this.state.total = this.state.subtotal +
        JSON.parse(this.state.deliveryCharges) + (this.state.subtotal * this.state.tex) / 100
      this.setState({ total: this.state.total })

      console.log('sibgha', this.state.total, this.state.subtotal,
        JSON.parse(this.state.deliveryCharges), JSON.parse(this.state.tex))
      this.setState({ total: this.state.total })
      this.setState({ subtotal: this.state.subtotal })
      this.setState({ texs: this.state.texs })

    } else {
      this.state.texs = (this.state.item && this.state.item.total * this.state.tex) / 100
      this.state.total = JSON.parse(this.state.item && this.state.item.total) +
        JSON.parse(this.state.deliveryCharges) + (this.state.item && this.state.item.total * this.state.tex) / 100
      this.state.subtotal = JSON.parse(this.state.item && this.state.item.total)
      this.setState({ total: this.state.total })
      this.setState({ subtotal: this.state.subtotal })
      this.setState({ texs: this.state.texs })

    }
  }
  render() {
    return (
      <SafeAreaView forceInset={{ top: 'never' }} style={{ flex: 1 }}>
        <StatusBar
          barStyle={'light-content'}
          translucent
          backgroundColor="transparent"
        />
        {/* <NavigationEvents onWillFocus={() => this.onFocusFunction()} /> */}
        {this.state.order==null ? (
          <View style={{ flex: 1 }}>
            <StatusBar
              barStyle={'light-content'}
              translucent
              backgroundColor="transparent"
            />
            <View
              style={{
                height: responsiveHeight(15),
                backgroundColor: '#393b82',
                flexDirection: "row"
              }}>
              <View
                style={{
                  marginTop: responsiveHeight(7.5),
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
                      width: responsiveWidth(8),
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
                    fontSize: responsiveFontSize(3.8),
                    color: 'white',
                    marginTop: responsiveHeight(6.6),
                  }}>
                  Cart
                  </Text>
              </View>

            </View>
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  color: '#393b82',
                  fontSize: responsiveFontSize(4),
                  marginTop: responsiveHeight(5),
                }}>
                No item in cart.
              </Text>
            </View>

          </View>
        ) : this.state.loading ? (
          <View style={{ flex: 1 }}>
            <View
              style={{
                height: responsiveHeight(15),
                backgroundColor: '#393b82',
                flexDirection: "row"
              }}>
              <View
                style={{
                  marginTop: responsiveHeight(7.5),
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
                      width: responsiveWidth(8),
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
                    fontSize: responsiveFontSize(3.8),
                    color: 'white',
                    marginTop: responsiveHeight(6.6),
                  }}>
                  Cart
                  </Text>
              </View>

            </View>
            <ActivityIndicator
              size={'large'}
              style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
              color="#393b82"
            />
          </View>
        ) : (
              <View style={{ flex: 1 }}>
                <View
                  style={{
                    height: responsiveHeight(25),
                    borderBottomLeftRadius: responsiveHeight(6.5),
                    borderBottomRightRadius: responsiveHeight(6.5),
                    backgroundColor: '#393b82',
                    zIndex: 0,
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
                          width: responsiveWidth(8),
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
                      Cart
                  </Text>
                  </View>
                </View>

                <ScrollView
                  style={{
                    // top: responsiveHeight(-6.5),
                    // bottom: responsiveHeight(-6.5),
                    // flex: 1,
                    // top: responsiveHeight(-8),
                    marginTop: '-16%',
                    width: responsiveWidth(100),
                    height: responsiveHeight(100),
                  }}>
                  {/* <View style={{
                width:'100%',
              height:'100%',
              
              }}> */}
                  <View
                    style={{
                      height: responsiveHeight(25),
                      width: responsiveWidth(90),
                      // top: responsiveHeight(-5),
                      alignSelf: 'center',
                      shadowColor: '#000',
                      shadowOffset: { width: 0, height: 2 },
                      shadowOpacity: 0.5,
                      shadowRadius: 2,
                      elevation: 10,
                      borderRadius: responsiveWidth(2),
                      backgroundColor: '#fff',
                      zIndex: 1,
                    }}>
                    <View>
                      <View
                        style={{
                          flexDirection: 'row',
                          height: responsiveHeight(5),
                          alignItems: 'center',
                          marginHorizontal: responsiveHeight(3),
                        }}>
                        <Text style={{ fontSize: responsiveFontSize(1.5) }}>
                          Subtotal
                      </Text>
                        <View
                          style={{
                            marginLeft: responsiveHeight(3),
                            flexDirection: 'row',
                            right: 0,
                            position: 'absolute',
                          }}>
                          <Text
                            style={{
                              fontSize: responsiveFontSize(1.7),
                              color: 'rgba(0,0,0,0.3)',
                            }}>
                            £{this.state.subtotal}
                          </Text>
                        </View>
                      </View>
                      <View
                        style={{
                          flexDirection: 'row',
                          height: responsiveHeight(5),
                          alignItems: 'center',
                          marginHorizontal: responsiveHeight(3),
                        }}>
                        <Text style={{ fontSize: responsiveFontSize(1.5) }}>
                          Tax & Fees
                      </Text>
                        <View
                          style={{
                            marginLeft: responsiveHeight(3),
                            flexDirection: 'row',
                            right: 0,
                            position: 'absolute',
                          }}>
                          <Text
                            style={{
                              fontSize: responsiveFontSize(1.7),
                              color: 'rgba(0,0,0,0.3)',
                            }}>
                            £{this.state.texs}
                          </Text>
                        </View>
                      </View>
                      <View
                        style={{
                          flexDirection: 'row',
                          height: responsiveHeight(5),
                          alignItems: 'center',
                          marginHorizontal: responsiveHeight(3),
                        }}>
                        <Text style={{ fontSize: responsiveFontSize(1.5) }}>
                          Delivery
                      </Text>
                        <View
                          style={{
                            marginLeft: responsiveHeight(3),
                            flexDirection: 'row',
                            right: 0,
                            position: 'absolute',
                          }}>
                          {/* <FontAwesome5
                  name="pound-sign"
                  size={responsiveFontSize(1.5)}
                  style={{marginTop: responsiveHeight(0.45)}}
                /> */}
                          <Text
                            style={{
                              fontSize: responsiveFontSize(1.7),
                              color: 'rgba(0,0,0,0.3)',
                            }}>
                            £{this.state.deliveryCharges}
                          </Text>
                        </View>
                      </View>
                      <View
                        style={{
                          flexDirection: 'row',
                          height: responsiveHeight(2.5),
                          alignItems: 'center',
                          marginHorizontal: responsiveHeight(3),
                          borderColor: '#0D0d0d',
                          borderBottomWidth: 0.71,
                        }}
                      />
                      <View
                        style={{
                          top: responsiveHeight(1.5),
                          flexDirection: 'row',
                          height: responsiveHeight(5),
                          alignItems: 'center',
                          marginHorizontal: responsiveHeight(3),
                        }}>
                        <Text
                          style={{
                            fontSize: responsiveFontSize(2.5),
                            color: '#e12c2c',
                          }}>
                          Total
                      </Text>
                        <View
                          style={{
                            marginLeft: responsiveHeight(3),
                            flexDirection: 'row',
                            right: 0,
                            position: 'absolute',
                          }}>
                          <Text
                            style={{
                              fontSize: responsiveFontSize(2.5),
                              color: '#e12c2c',
                            }}>
                            £{this.state.total}
                          </Text>
                        </View>
                      </View>
                    </View>
                  </View>
                  <View
                    style={{
                      width: responsiveWidth(90),
                      top: responsiveHeight(2),
                      alignSelf: 'center',
                      shadowColor: '#000',
                      shadowOffset: { width: 0, height: 2 },
                      shadowOpacity: 0.5,
                      shadowRadius: 2,
                      elevation: 10,
                      borderRadius: responsiveWidth(2),
                      backgroundColor: '#fff',
                    }}>
                    {this.state.data && this.state.data.map((item, index) => {
                      return (Array.isArray(item) ?
                        item.map(itmm => {
                          return (
                            <View>
                              <View
                                style={{
                                  borderBottomColor: 'black',
                                  borderBottomWidth: 0.71,
                                  marginHorizontal: responsiveHeight(2),
                                  marginVertical: responsiveHeight(1.5),
                                  flexDirection: 'row',
                                  alignItems: 'center',
                                }}>
                                <Image
                                  style={{
                                    height: responsiveHeight(8),
                                    width: responsiveWidth(15),
                                    resizeMode: 'cover',
                                  }}
                                  source={{ uri: itmm.item.image }}
                                />
                                <View style={{ marginHorizontal: responsiveHeight(2) }}>
                                  <Text>{itmm.item.name}</Text>
                                  {
                                    itmm.menu.map(itm => {
                                      return (
                                        <Text style={{ color: 'rgba(0,0,0,0.3)' }}>
                                          <Text>
                                            {itm.quantity} x {itm.size} {itmm.item.name}{' '}
                                          </Text>
                                  ,{itmm.extra_name}
                                        </Text>
                                      );
                                    })
                                  }

                                  <Text>£ {itmm.total}</Text>
                                </View>
                              </View>
                            </View>
                          )
                        })
                        :
                        <View>
                          {
                            console.log("iteeeeeeeeeeeeeeeeeeeeeeeeem", this.state.data)
                          }
                          <View
                            style={{
                              borderBottomColor: 'black',
                              borderBottomWidth: 0.71,
                              marginHorizontal: responsiveHeight(2),
                              marginVertical: responsiveHeight(1.5),
                              flexDirection: 'row',
                              alignItems: 'center',
                            }}>
                            <Image
                              style={{
                                height: responsiveHeight(8),
                                width: responsiveWidth(15),
                                resizeMode: 'cover',
                              }}
                              source={{ uri: Array.isArray(item) ? item[index].item.image : item.item.image }}
                            />
                            <View style={{ marginHorizontal: responsiveHeight(2) }}>
                              <Text>{Array.isArray(item) ? item[index].item.name : item.item.name}</Text>
                              {Array.isArray(item) ? item[index].menu.map(itm => {
                                return (
                                  <Text style={{ color: 'rgba(0,0,0,0.3)' }}>
                                    <Text>
                                      {itm.quantity} x {itm.size} {Array.isArray(item) ? item[index].item.name : item.item.name}{' '}
                                    </Text>
                                  ,{item.extra_name}
                                  </Text>
                                );
                              }) :
                                item.menu.map(itm => {
                                  return (
                                    <Text style={{ color: 'rgba(0,0,0,0.3)' }}>
                                      <Text>
                                        {itm.quantity} x {itm.size} {Array.isArray(item) ? item[index].item.name : item.item.name}{' '}
                                      </Text>
                                  ,{item.extra_name}
                                    </Text>
                                  );
                                })
                              }

                              <Text>£ {Array.isArray(item) ? item[index].total : item.total}</Text>
                            </View>
                          </View>
                        </View>
                      )
                    })}
                  </View>
                  <View
                    style={{
                      height: responsiveHeight(14),
                      width: responsiveWidth(90),
                      alignSelf: 'center',
                      shadowColor: '#000',
                      shadowOffset: { width: 0, height: 2 },
                      shadowOpacity: 0.5,
                      shadowRadius: 2,
                      elevation: 10,
                      top: responsiveHeight(4),
                      borderRadius: responsiveWidth(2),
                      backgroundColor: '#fff',
                    }}>
                    <View
                      style={{
                        height: responsiveHeight(10),
                        flexDirection: 'row',
                        marginHorizontal: responsiveHeight(3),
                        borderBottomColor: 'black',
                        borderBottomWidth: 0.71,
                        alignItems: 'flex-end',
                      }}>
                      <TextInput
                        placeholder="Add your comments"
                        value={this.state.comment}
                        onChangeText={text => {
                          this.setState({ comment: text });
                        }}
                        // style={{flex:1,backgroundColor:"red",height:50}}
                        placeholderTextColor="rbga(0,0,0,0.3)"
                      />
                    </View>
                  </View>

                  <TouchableOpacity
                    style={{
                      marginHorizontal: responsiveHeight(3),
                      height: responsiveHeight(8),
                      backgroundColor: '#e12c2c',
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderRadius: responsiveHeight(2),
                      marginTop: responsiveHeight(8),
                      marginVertical: responsiveHeight(6),
                      zIndex: 0,
                    }}
                    activeOpacity={0.7}
                    onPress={() => {
                      // this.save();
                      this.props.navigation.navigate('Checkout', {
                        item: this.state.item,
                        comment: this.state.comment,
                        total: this.state.total,
                        subTotal: this.state.subtotal,
                        texs: this.state.texs,
                        deliveryCharges:this.state.deliveryCharges
                      });
                      // this.review();
                    }}>
                    <Text
                      style={{ fontSize: responsiveFontSize(2.5), color: 'white' }}>
                      Checkout
                  </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={{
                      marginHorizontal: responsiveHeight(3),
                      height: responsiveHeight(8),
                      backgroundColor: '#393b82',
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderRadius: responsiveHeight(2),
                      zIndex: 0,
                      marginTop: responsiveHeight(-3),
                      marginBottom: responsiveHeight(6),
                    }}
                    activeOpacity={0.7}
                    onPress={async () => {
                      await AsyncStorage.removeItem("total")
                      this.props.navigation.navigate('Categories', {
                        id: {
                          id: Array.isArray(this.state.item) ? this.state.item[0].item.branch.id : this.state.item.item.branch.id,
                          name: Array.isArray(this.state.item) ? this.state.item[0].item.branch.name : this.state.item.item.branch.name,
                        },
                      });
                    }}>
                    <Text
                      style={{ fontSize: responsiveFontSize(2.5), color: 'white' }}>
                      Continue eating
                  </Text>
                  </TouchableOpacity>
                  {/* <View height={responsiveHeight(5)}/> */}
                  {/* </View> */}
                </ScrollView>
              </View>
            )}
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => {
  return {
    data: state.data,
  };
};
const actions = {
  Data
};

export default connect(
  mapStateToProps,
  actions,
)(Cart);
