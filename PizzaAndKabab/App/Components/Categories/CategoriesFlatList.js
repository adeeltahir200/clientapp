import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  TextInput,
  ImageBackground,
  Image,
} from 'react-native';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {blue, colorWhite, lightBlack} from '../../../GlobalCons/colors';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default class CategoriesFlatList extends Component {
  state = {
    data: [ 
      {
        id: 1,
        Category: 'Category 1',
        image: require('../../Assets/category.png'),
      },
      {
        id: 2,
        Category: 'Category 2',
        image: require('../../Assets/category.png'),
      },
      {
        id: 3,
        Category: 'Category 3',
        image: require('../../Assets/category.png'),
      },
      {
        id: 4,
        Category: 'Category 4',
        image: require('../../Assets/category.png'),
      },
    ],
  };
  printCards = post => {
    let item = post.item;
    let index = post.index;
    return (
      <TouchableOpacity
        onPress={() => {
          this.props.navigation.navigate('CategoryItems');
        }}
        activeOpacity={0.7}
        style={Styles.MainCard}>
        <ImageBackground
          source={item.image}
          borderRadius={15}
          style={{width: '100%', height: '100%'}}>
          <View style={Styles.overlay}></View>
          {/* <Text>{item.Category}</Text> */}
        </ImageBackground>
      </TouchableOpacity>
    );
  };
  render() {
    return (
      <FlatList
        data={this.state.data}
        keyExtractor={item => item.id}
        contentContainerStyle={Styles.contentContainerStyle}
        ItemSeparatorComponent={() => <View style={Styles.Seprator} />}
        renderItem={item => this.printCards(item)}
      />
    );
  }
}
const Styles = StyleSheet.create({
  contentContainerStyle: {
    paddingVertical: responsiveHeight(2),
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
});
