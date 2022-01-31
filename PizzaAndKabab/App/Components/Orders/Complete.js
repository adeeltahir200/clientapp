import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Image,
  TextInput,
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

export default class Categories extends Component {
  state = {
    Data: [
      {
        id: 0,
        date: '12/12/20',
        time: '4:30PM',
        Total: '60.00',
        ratings: '4.8',
      },
      {
        id: 1,
        date: '12/12/20',
        time: '4:30PM',
        Total: '60.00',
        ratings: '4.4',
      },
    ],
  };
  PrintCard = post => {
    let item = post.item;
    let index = post.index;
    return (
      <View style={Styles.MainCard}>
        <View style={Styles.InnerCardView}>
          <View style={Styles.DateView}>
            <View style={{width: '80%'}}>
              <Text style={Styles.MediumText}>
                {item.date}
                {' at '}
                {item.time}
              </Text>
            </View>
            <View style={{width: '80%'}}>
              <Text style={[Styles.MediumText, {color: Pink}]}>
              {'£ '}
                {item.Total}
              </Text>
            </View>
          </View>
          <View style={{flexDirection: 'row'}}>
            <View style={{width: '80%'}}>
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
                  {color: lightBlack, marginLeft: responsiveWidth(1)},
                ]}>
                {item.ratings}
              </Text>
            </View>
          </View>
          <View style={Styles.OrderAgainView}>
            <Text style={[Styles.SmallText, {color: Pink}]}>
              {'Order Again'}
            </Text>
          </View>
        </View>
      </View>
    );
  };
  render() {
    return (
      <SafeAreaView style={Styles.container}>
        <FlatList
          data={this.state.Data}
          contentContainerStyle={Styles.contentContainerStyle}
          keyExtractor={item => item.id}
          ItemSeparatorComponent={() => <View style={Styles.Seprator} />}
          renderItem={item => this.PrintCard(item)}
        />
      </SafeAreaView>
    );
  }
}
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
  OrderAgainView: {
    marginTop: responsiveHeight(1),
    height: responsiveHeight(5),
    width: '100%',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
});
