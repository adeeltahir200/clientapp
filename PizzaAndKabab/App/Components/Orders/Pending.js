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
} from '../../../GlobalCons/colors';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default class Categories extends Component {
  state = {
    Data: [
      {
        id: 0,
        date: '12/12/20',
        time: '4:30PM',
        Order: [
          {id: 1, item: 'Large Pizza', quantity: '1'},
          {id: 2, item: 'Cheese Burger', quantity: '2'},
          {id: 3, item: 'Drinks', quantity: '4'},
        ],
        Total: '60.00',
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
                {'£'}
                {item.Total}
              </Text>
            </View>
          </View>

          <FlatList
            data={item.Order}
            keyExtractor={item => item.id}
            renderItem={post => {
              let item2 = post.item;
              let index2 = post.index;
              return (
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Text style={Styles.SmallText}>
                    {item2.quantity}
                    {'x '}
                    {item2.item}
                  </Text>
                  {item.Order.length - 1 === index2 ? (
                    <Text style={Styles.SmallText}>{'Cancel'}</Text>
                  ) : null}
                </View>
              );
            }}
          />
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
});
