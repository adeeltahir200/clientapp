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
  ScrollView,
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
  phColor,
} from '../../../GlobalCons/colors';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import { SafeAreaView } from 'react-navigation';

export default class Categories extends Component {
  state = {
    datasource: [1, 2, 4, 5, 6],
  };
  componentDidMount() {
    this._navListener = this.props.navigation.addListener('willFocus', () => {
      StatusBar.setBarStyle('light-content');
      StatusBar.setBackgroundColor('transparent');
    });
  }
  renderRatings = rating => {
    const stars = new Array(5).fill(0);
    return stars.map((_, index) => {
      const activeStar = Math.floor(rating) >= index + 1;
      return (
        <FontAwesome
          name="star"
          key={`star-${index}`}
          size={responsiveWidth(3.5)}
          color={activeStar ? '#ffd523' : 'gray'}
          style={{marginRight: 4}}
        />
      );
    });
  }; 
  render() {
    return (
      <SafeAreaView forceInset={{ top: 'never'}} style={Styles.container}>
         <StatusBar
                    barStyle="light-content"
                    translucent={true}
                />
        <View style={Styles.Header}>
          <View style={Styles.topHeader}>
            {/* <TouchableOpacity>
              <Ionicons
                size={responsiveFontSize(4)}
                color={colorWhite}
                name={'ios-menu'}
              />
            </TouchableOpacity> */}
            {/* <TouchableOpacity>
              <Text style={Styles.HeaderText}>{'Filter'}</Text>
            </TouchableOpacity> */}
          </View>

          <View style={Styles.SearchHeader}>
            <View style={Styles.SearchView}>
              <TouchableOpacity style={Styles.Left}>
                <Entypo
                  color={phColor}
                  size={responsiveFontSize(3)}
                  name={'location-pin'}
                />
              </TouchableOpacity>
              <View style={Styles.Right}>
                <TextInput
                  placeholder={'Postcode'}
                  placeholderTextColor={'#000'}
                  style={Styles.Textinput}
                />
                <View style={{right: responsiveWidth(2), position: 'absolute'}}>
                  <Entypo
                    color={phColor} 
                    size={responsiveFontSize(3)}
                    name={'circle-with-cross'}
                  />
                </View>
              </View>
            </View>
          </View>
        </View>

        <View style={Styles.mapcon}>
          <MapView
            provider={PROVIDER_GOOGLE} // remove if not using Google Maps
            style={Styles.map}
            region={{
              latitude: 37.78825,
              longitude: -122.4324,
              latitudeDelta: 0.015,
              longitudeDelta: 0.0121,
            }}>
            <MapView.Marker
              coordinate={{
                latitude: 37.78825,
                longitude: -122.4324,
              }}
              address={'H#352 est Hall, california'}>
              {/* <Image source={require('../../Assets/CombinedShape.png')} style={{height:40,width:40,resizeMode:'contain'}} /> */}
              <View
                style={{
                  height: responsiveHeight(20),
                  width: responsiveHeight(20),
                  borderRadius: responsiveHeight(15),
                  backgroundColor: 'rgba(255, 0, 0, 0.09)',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                    <View
                style={{
                  height: responsiveHeight(5),
                  width: responsiveHeight(5),
                  borderRadius: responsiveHeight(3),
                  backgroundColor: 'rgba(255, 0, 0, 0.6)',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                   <FontAwesome5
                  name="location-arrow"
                  color="#fff"
                  size={responsiveFontSize(2)}
                />
                </View>
               
              </View>
            </MapView.Marker>
            {/* <MapView.Circle
              center={{
                latitude: 37.78825,
                longitude: -122.4324,
              }}
              radius={responsiveWidth(50)}
              strokeWidth={0.5}
              strokeColor="rgba(255, 0, 0, 0.09)"
              fillColor="rgba(255, 0, 0, 0.09)"
              
                          /> */}
          </MapView>
        </View>
        <ScrollView
          style={{top: responsiveHeight(84), position: 'absolute'}}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          >
          {this.state.datasource.map(item => (
            <TouchableOpacity
              style={Styles.cardContainer}
              activeOpacity={0.7}
              onPress={() => this.props.navigation.navigate('Categories')}>
              <View style={Styles.cardLeftContainer}>
                <Image
                  source={require('../../Assets/number1.png')}
                  style={{height: '90%', width: '80%', resizeMode: 'contain'}}
                />
              </View>
              <View style={Styles.cardRightContainer}>
                <Text style={Styles.cardTextStyle} numberOfLines={2}>
                  {'No 1 Pizza and Kebab'}
                  {/* {'No 1 Pizza and Kebab'} */}
                </Text>

                <Text style={Styles.cardTextStyle1}>{'London Address'}</Text>
                <View flexDirection={'row'}>{this.renderRatings(5)}</View>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </SafeAreaView>
    );
  }
}
const Styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colorWhite,
  },
  Header: {
    height: responsiveHeight(20),
    // marginTop:responsiveHeight(-2)
    width: '100%',
    backgroundColor: blue,
  },
  topHeader: {
    height: responsiveHeight(11),
    width: responsiveWidth(92),
    // backgroundColor:'red',
    flexDirection: 'row',
    alignSelf: 'center',
    justifyContent: 'space-between',
    alignItems: 'flex-end',

    // paddingHorizontal: responsiveWidth(4),
  },
  HeaderText: {
    color: colorWhite,
    fontSize: responsiveFontSize(2),
    marginBottom: responsiveWidth(2),
  },
  SearchHeader: {
    height: responsiveHeight(8),
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
  mapcon: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
    height: responsiveHeight(80),
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  cardContainer: {
    padding: responsiveWidth(1),
    backgroundColor: colorWhite,
    elevation: 10,
    width: responsiveWidth(70),
    height: responsiveHeight(13),
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
});
