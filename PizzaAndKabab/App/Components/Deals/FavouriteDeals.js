import React, { Component } from 'react';
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
  Alert,
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
} from '../../../GlobalCons/colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Icon } from 'react-native-elements';
import CategoryItemsFlatList from '../CategoryItems/CategoryItemsFlatList';
import { SafeAreaView } from 'react-navigation';
import AsyncStorage from '@react-native-community/async-storage';
import { ActivityIndicator } from 'react-native-paper';
import StarRating from 'react-native-star-rating';

export default class FavouriteDeals extends Component {
  state = {
    loading: true,
    data: [],
  };
  componentDidMount = async () => {
    let dataa = await AsyncStorage.getItem('token');
    var myHeaders = new Headers();
    myHeaders.append('Authorization', `Bearer ${dataa}`);

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
    };

    fetch(
      'https://pizzakebab.ranglerztech.website/api/get-favorite-list',
      requestOptions,
    )
      .then(response => response.text())
      .then(result => {
        let dataa = JSON.parse(result);
        if (dataa.status == 200) {
          this.setState({ data: dataa.successData, loading: false });
          //Alert.alert(
          //'The data is',
          //JSON.stringify(dataa)
          //)
        } else {
          alert(dataa.message);
        }
      })
      .catch(error => alert('error', error));
    this._navListener = this.props.navigation.addListener('willFocus', () => {
      StatusBar.setBarStyle('dark-content');
      StatusBar.setBackgroundColor('transparent');
    });
  };
  PrintCards = post => {
    console.log('post');
    let item = post.item;
    let index = post.index;
    console.log('ff', post)
    return (
      <TouchableOpacity
        onPress={async () => {
          // this.props.navigation.navigate('Details');
          //Alert.alert(
          //'The item contains',
          //JSON.stringify(post)
          //)
          //alert(JSON.stringify(item.menu))
          let value = await AsyncStorage.getItem('branch_id')
          if (value != item.menu.branch_id) {
            await AsyncStorage.removeItem('adeelarray');
            this.props.navigation.navigate('CategoryDetail', {
              item: item.menu,
              from: 'favouritedeals'
            })
          } else {
            this.props.navigation.navigate('CategoryDetail', {
              item: item.menu,
              from: 'favouritedeals'
            })
          }

          /*this.props.navigation.navigate('CategoryDetail', {
            item: item.menu,
            from: 'favouritedeals'
           });*/
        }}
        activeOpacity={0.7}
        style={Styles.MainCard}>
        {console.log('item', item)}
        <Image
          borderTopLeftRadius={8}
          borderTopRightRadius={8}
          source={{ uri: item.menu.image }}
          style={{ width: responsiveWidth(45), height: responsiveHeight(17) }}
        />
        <View style={Styles.contentView}>
          <View style={Styles.Left}>
            <Text style={Styles.SmallText}>{item.menu.name}</Text>
            {item ? (
              <View style={{ width: '80%' }}>
                <StarRating
                  disabled={false}
                  maxStars={5}
                  rating={0}
                  emptyStar={'ios-star-outline'}
                  fullStar={'ios-star'}
                  halfStar={'ios-star-half'}
                  iconSet={'Ionicons'}
                  fullStarColor={'rgb(253,194,40)'}
                  starSize={responsiveFontSize(2.5)}
                />
              </View>
            ) : null}
          </View>
          <View style={Styles.Right}>
            <TouchableOpacity
              // onPress={() => {
              //   this.props.navigation.navigate('Cart');
              // }}
              activeOpacity={0.7}>
              <Icon
                color='red'
                size={responsiveFontSize(3)}
                name='opencart'
                type='font-awesome'
              />
            </TouchableOpacity>
            {item.small_price ? (
              <Text
                style={[Styles.SmallText, { marginTop: responsiveHeight(1) }]}>
                £{item.small_price}
              </Text>
            ) : null}
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  render() {
    if (Platform.OS === 'ios') {
      return (
        <SafeAreaView style={Styles.container}>
          <View
            style={{
              height: responsiveHeight(15),
              width: '100%',
              backgroundColor: headerColor,
            }}>
            <View
              style={{
                height: responsiveHeight(9),
                width: '90%',
                alignSelf: 'center',
                justifyContent: 'flex-end',
              }}>
              <TouchableOpacity
                style={{
                  width: 30,
                  height: 30,
                }}
                onPress={() => {
                  this.props.navigation.goBack();
                }}>
                   <Icon
                      name={'chevron-left'}
                      color={'#565656'}
                      type='font-awesome'
                      size={responsiveWidth(5)}
                    />
              </TouchableOpacity>
            </View>
            <View style={Styles.HeaderTextView}>
              <Text style={Styles.HeaderLargeText}>{'Favorite Deals'}</Text>
            </View>
          </View>
          <CategoryItemsFlatList {...this.props} />
        </SafeAreaView>
      );
    } else if (Platform.OS === 'android') {
      return (
        <SafeAreaView style={Styles.container}>
          <View style={Styles.Header}>
            <View style={Styles.ArrowView}>
              <TouchableOpacity
                onPress={() => {
                  this.props.navigation.goBack();
                }}>
                <Ionicons
                  name={'ios-arrow-back'}
                  color={blue}
                  size={responsiveFontSize(3.5)}
                />
              </TouchableOpacity>
            </View>
            <View style={Styles.HeaderTextView}>
              <Text style={Styles.HeaderLargeText}>{'Favorite Deals'}</Text>
            </View>
          </View>
          {this.state.loading ? (
            <View style={[Styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
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
              keyExtractor={(item, index) => index.toString()}
              numColumns={2}
              contentContainerStyle={Styles.contentContainerStyle}
              ItemSeparatorComponent={() => <View style={Styles.Seprator} />}
              renderItem={item => this.PrintCards(item)}
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
                    {'No Favourite Deal Yet'}
                  </Text>
                </View>
              )}
        </SafeAreaView>
      );
    }
  }
}
const Styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colorWhite,
  },
  Header: {
    height: responsiveHeight(17),
    width: '100%',
    backgroundColor: headerColor,
  },
  ArrowView: {
    height: responsiveHeight(8.8),
    width: '90%',
    alignSelf: 'center',
    justifyContent: 'flex-end',
  },
  HeaderTextView: {
    paddingTop: responsiveHeight(1),
    width: '90%',
    alignSelf: 'center',
  },
  HeaderLargeText: {
    color: blue,
    fontWeight: 'bold',
    fontSize: responsiveFontSize(4),
    letterSpacing: 1,
  },
  HeaderSmallText: {
    color: blue,
    fontWeight: 'bold',
    fontSize: responsiveFontSize(2.2),
    letterSpacing: 1,
  },
  contentContainerStyle: {
    paddingVertical: responsiveHeight(4),
    width: '100%',
    alignSelf: 'center',
  },
  Seprator: {
    marginBottom: responsiveHeight(2),
  },
  MainCard: {
    width: '45%',
    marginLeft: '3.3%',
    backgroundColor: colorWhite,
    elevation: 5,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
  },
  contentView: {
    paddingVertical: responsiveHeight(2),
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '95%',
    alignSelf: 'center',
  },
  Left: {
    width: '70%',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  Right: {
    width: '20%',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  SmallText: {
    color: 'rgba(0,0,0,0.5)',
    fontSize: responsiveFontSize(1.4),
    fontWeight: 'bold',
  },
  container: {
    flex: 1,
    backgroundColor: colorWhite,
  },
  Header: {
    height: responsiveHeight(22),
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
  HeaderLargeText: {
    color: blue,
    fontWeight: 'bold',
    fontSize: responsiveFontSize(4),
    letterSpacing: 1,
  },
  HeaderSmallText: {
    color: blue,
    fontWeight: 'bold',
    fontSize: responsiveFontSize(2.2),
    letterSpacing: 1,
  },
  headerImageStyle: {
    width: responsiveWidth(8),
    height: responsiveHeight(5),
    resizeMode: 'contain',
  },
});
