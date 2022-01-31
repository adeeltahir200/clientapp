import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  //SafeAreaView,
  StatusBar,
  TextInput,
  Image,
  Modal,
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
  colorBlack,
} from '../../../GlobalCons/colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CategoriesFlatList from './CategoriesFlatList';
import {SafeAreaView} from 'react-navigation';
import AsyncStorage from '@react-native-community/async-storage';
import {ActivityIndicator} from 'react-native-paper';
import {ListItem, Input, Button} from 'react-native-elements';
import CustomModal from '../CustomComponents/CustomModal';
import NetInfo from '@react-native-community/netinfo'

export default class Resturents extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      data: [],
      visible: false,
    };
  }
  componentDidMount = async () => {
    NetInfo.addEventListener(state => {
      if(!state.isConnected){
        alert('Error:Please connect to internet.')
      }
    });
    this._navListener = this.props.navigation.addListener('willFocus', () => {
      if (Platform.OS === 'ios') {
        StatusBar.setBarStyle('light-content');
      } else {
        StatusBar.setBarStyle('light-content');
        StatusBar.setBackgroundColor('transparent');
      }
    });
    let data = await AsyncStorage.getItem('token');
    var myHeaders = new Headers();
    myHeaders.append('Authorization', `Bearer ${data}`);

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
    };

    fetch(
      'https://pizzakebab.ranglerztech.website/api/get-branches',
      requestOptions,
    )
      .then(response => response.text())
      .then(result => {
        let dataa = JSON.parse(result);
        if (dataa.successData) {
          this.setState({data: dataa.successData, loading: false});
          console.log('Resturants', dataa);
        } else {
          this.setState({loading: false});
          alert(dataa.message);
          console.log(result, 'test');
        }
      })
      .catch(error =>{
        this.setState({loading: false});
         alert( error.message,'Error:Please connect to internet.')});
  };
  printCards = post => {
    console.log(post.item);
    let item = post.item;
    let index = post.index;
    return (
      <TouchableOpacity
        style={Styles.cardContainer}
        activeOpacity={0.7}
        onPress={async () => {
          let data = await AsyncStorage.getItem('resturant');
          // await AsyncStorage.removeItem("data")
          await AsyncStorage.setItem("r_id",JSON.stringify(item.id))
                  await AsyncStorage.setItem("r_name",item.name)
          console.log(data);
          if (data == null) {
            { 
              this.props.navigation.navigate('Categories', {
                id: {id: item.id, name: item.name},
              });
            }
          } else if (data == JSON.stringify(item.id)) {
            this.props.navigation.navigate('Categories', {
              id: {id: item.id, name: item.name},
            });
          } else {
            this.setState({visible: true});
          }
        }}>
        <View style={Styles.cardLeftContainer}>
          <Image
            source={require('../../Assets/number1.png')}
            style={{height: '90%', width: '80%', resizeMode: 'contain'}}
          />
        </View>

        <CustomModal isVisible={this.state.visible}>
          <View
            style={{
              flex: 1,
              alignSelf: 'center',
              justifyContent: 'center',
            }}>
            {/* <Divider height={responsiveHeight(15)} /> */}
            <View style={Styles.modalMainContainer}>
              <View style={Styles.modalTextContainer}>
                <Text style={Styles.modalTextStyle}>
                  By leaving this restaurant page,the item you've added to your
                  cart will be cleared.
                </Text>
              </View>
              <Button
                title="Cancel"
                onPress={() => {
                  // this.props.navigation.navigate('Resturents');
                  this.setState({visible: false});
                }}
                titleStyle={Styles.buttonTitleStyle}
                buttonStyle={[
                  Styles.buttonStyle,
                  {borderRadius: responsiveWidth(10),top:responsiveHeight(5)},
                ]}
                containerStyle={Styles.modalButtonContainer}
              />
              <Button
                title="Ok"
                onPress={async() => {
                  await AsyncStorage.removeItem('adeelarray')
                  await AsyncStorage.removeItem("resturant")             
                  await AsyncStorage.removeItem("data")
              this.props.navigation.navigate('Categories', {
                id: {id: item.id, name: item.name},
              });
                  // this.cancel(item.id)
                  // this.props.navigation.navigate('Resturents');
                  this.setState({visible: false});
                }}
                titleStyle={Styles.buttonTitleStyle}
                buttonStyle={[
                  Styles.buttonStyle,
                  {
                    borderRadius: responsiveWidth(10),
                    backgroundColor: '#e12c2c',top:responsiveHeight(2)
                  },
                ]}
                containerStyle={Styles.modalButtonContainer}
              />
            </View>
          </View>
        </CustomModal>
        <View style={Styles.cardRightContainer}>
          <Text style={Styles.cardTextStyle} numberOfLines={2}>
            {item.name}
            {/* {'No 1 Pizza and Kebab'} */}
          </Text>
          <Text style={Styles.cardTextStyle1}>{item.email}</Text>
          <Text style={Styles.cardTextStyle1}>{item.address}</Text>
          <Text style={Styles.cardTextStyle1}>{item.phone}</Text>
          {/* <View flexDirection={'row'}>{this.renderRatings(5)}</View> */}
        </View>
      </TouchableOpacity>
    );
  };
  render() {
    if (Platform.OS === 'ios') {
      // StatusBar.setBarStyle('dark-content');
      return (
        <>
          <View style={{backgroundColor: blue, height: 1}}>
            <StatusBar
              barStyle={'light-content'}
              translucent
              backgroundColor={blue}
            />
          </View>

          <SafeAreaView style={Styles.container}>
            <StatusBar
              barStyle={'light-content'}
              translucent
              backgroundColor={blue}
            />
            <View style={Styles.Header}>
              <View style={Styles.topHeader}>
                <TouchableOpacity
                  onPress={() => {
                    this.props.navigation.openDrawer();
                  }}>
                  <Image
                    style={{
                      height: responsiveHeight(4),
                      width: responsiveWidth(6),
                    }}
                    source={require('../../Assets/icons-Menu-1.png')}
                  />
                </TouchableOpacity>
              </View>

              <View style={Styles.SearchHeader}>
                <View style={Styles.SearchView}>
                  <TouchableOpacity style={Styles.Left}>
                    <Ionicons
                      color={'#D5D5D5'}
                      size={responsiveFontSize(3)}
                      name={'ios-search'}
                    />
                  </TouchableOpacity>
                  <View style={Styles.Right}>
                    <TextInput
                      placeholder={'Post Code'}
                      placeholderTextColor={'#D5D5D5'}
                      style={Styles.Textinput}
                    />
                  </View>
                </View>
              </View>
            </View>{' '}
            {this.state.loading ? (
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <ActivityIndicator color="#303f88" size={'large'} />
              </View>
            ) : (
              <CategoriesFlatList {...this.props} />
            )}
          </SafeAreaView>
        </>
      );
    } else if (Platform.OS === 'android') {
      return (
        <>
          <View style={{backgroundColor: blue, height: 1}}>
            <StatusBar
              barStyle={'light-content'}
              translucent
              backgroundColor={blue}
            />
          </View>

          <SafeAreaView style={Styles.container}>
            <StatusBar
              barStyle={'light-content'}
              translucent
              backgroundColor={blue}
            />
            <View style={Styles.Header}>
              <View style={Styles.topHeader}>
                <TouchableOpacity
                  onPress={() => {
                    this.props.navigation.openDrawer();
                  }}>
                  <Image
                    style={{
                      height: responsiveHeight(4),
                      width: responsiveWidth(6),
                    }}
                    source={require('../../Assets/icons-Menu-1.png')}
                  />
                </TouchableOpacity>
              </View>
              <View style={Styles.SearchHeader}>
                    <Text
                      style={{
                        color:'white',
                        marginLeft:'10%',
                        fontWeight:'bold',
                        fontSize:responsiveHeight(5)
                      }}
                    >
                      Resturants
                    </Text>
              </View>

              {/*<View style={Styles.SearchHeader}>
                <View style={Styles.SearchView}>
                  <TouchableOpacity style={Styles.Left}>
                    {/*<Ionicons
                      color={'#D5D5D5'}
                      size={responsiveFontSize(3)}
                      name={'ios-search'}
                    />
                  </TouchableOpacity>
                  <View style={Styles.Right}>
                    <TextInput
                      placeholder={'Post Code'}
                      placeholderTextColor={'#D5D5D5'}
                      style={Styles.Textinput}
                    />
                  </View>
                </View>
              </View>*/}
            </View>
            {this.state.loading ? (
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <ActivityIndicator color="#303f88" size={'large'} />
              </View>
            ) : this.state.data.length > 0 ? (
              <FlatList
                data={this.state.data}
                keyExtractor={item => item.id}
                contentContainerStyle={Styles.contentContainerStyle}
                ItemSeparatorComponent={() => <View style={Styles.Seprator} />}
                renderItem={item => this.printCards(item)}
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
                  {'No Resturent Found'}
                </Text>
              </View>
            )}
          </SafeAreaView>
        </>
      );
    }
  }
}
const Styles = StyleSheet.create({
  contentContainerStyle: {
    paddingVertical: responsiveHeight(2),
  },
  modalMainContainer: {
    height: responsiveHeight(50),
    width: responsiveWidth(85),
    alignSelf: 'center',
    backgroundColor: colorWhite,
    borderRadius: responsiveWidth(2),
    justifyContent: 'space-evenly',
    alignItems: 'center',
    padding: responsiveWidth(4),
  },
  Seprator: {
    marginTop: responsiveHeight(3),
  },
  MainCard: {
    height: responsiveHeight(23),
    borderRadius: 15,
    width: '90%',
    alignSelf: 'center',
    backgroundColor: colorWhite,
    elevation: 5,
  },
  overlay: {
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderRadius: 15,
  },
  cardContainer: {
    padding: responsiveWidth(1),
    backgroundColor: colorWhite,
    elevation: 10,
    width: responsiveWidth(90),
    flex: 1,
    // maxHeight:responsiveHeight(17),
    // height: responsiveHeight(13),
    // top: responsiveHeight(34),
    marginRight: responsiveWidth(4),
    marginLeft: responsiveWidth(5),
    flexDirection: 'row',
    borderRadius: responsiveWidth(1),
    borderWidth: 1.5,
    borderColor: '#f2c129',
    justifyContent: 'space-between',
  },
  cardLeftContainer: {
    // backgroundColor: 'red',
    width: '30%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardRightContainer: {
    // backgroundColor: 'blue',
    width: '65%',
    height: '100%',
  },

  cardTextStyle: {
    color: colorBlack,
    fontSize: responsiveFontSize(2),
  },
  cardTextStyle1: {
    color: '#b8b8b8',
    fontSize: responsiveFontSize(1.8),
  },
  container: {
    flex: 1,
    backgroundColor: colorWhite,
  },
  Header: {
    height: responsiveHeight(20),
    width: '100%',
    backgroundColor: blue,
  },
  topHeader: {
    height: responsiveHeight(10),
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingHorizontal: responsiveWidth(5),
    // backgroundColor:'red'
  },
  HeaderText: {
    color: colorWhite,
    fontSize: responsiveFontSize(2),
    marginBottom: responsiveWidth(1),
  },
  SearchHeader: {
    height: responsiveHeight(10),
    width: '100%',
    justifyContent: 'center',
  },
  SearchView: {
    width: '91%',
    alignSelf: 'center',
    height: responsiveHeight(6),
    backgroundColor: colorWhite,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  Left: {
    width: '14%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  Right: {
    width: '86%',
    justifyContent: 'center',
  },
  Textinput: {
    padding: 0,
    margin: 0,
    fontSize: responsiveFontSize(2),
  },
  modalTextContainer: {
    height: responsiveHeight(15),
    width: '90%',
    alignItems: 'center',
    // backgroundColor: 'red'
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
  modalTextStyle: {
    fontSize: responsiveFontSize(3),
    fontWeight: 'bold',
    color: colorBlack,
    textAlign: 'center',
  },
});
