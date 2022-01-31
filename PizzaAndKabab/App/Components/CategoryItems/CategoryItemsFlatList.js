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
} from '../../../GlobalCons/colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import StarRating from 'react-native-star-rating';

export default class Categories extends Component {
  state = {
    data: [
      {
        id: 1,
        Title: 'Mexician Passion',
        Ratings: '3.5',
        Price: '£7.00',
        image: require('../../Assets/item.png'), 
      },
      {
        id: 2,
        Title: 'Mexician Passion',
        Ratings: '4',
        Price: '£7.00',
        image: require('../../Assets/item.png'),
      },
      {
        id: 3,
        Title: 'Mexician Passion',
        Ratings: '3.8',
        Price: '£7.00',
        image: require('../../Assets/item.png'),
      },
      {
        id: 4,
        Title: 'Mexician Passion',
        Ratings: '2',
        Price: '£7.00',
        image: require('../../Assets/item.png'),
      },
      {
        id: 5,
        Title: 'Mexician Passion',
        Ratings: '1',
        Price: '£7.00',
        image: require('../../Assets/item.png'),
      },
      {
        id: 6,
        Title: 'Mexician Passion',
        Ratings: '4',
        Price: '£7.00',
        image: require('../../Assets/item.png'),
      },
      {
        id: 7,
        Title: 'Mexician Passion',
        Ratings: '5',
        Price: '£7.00',
        image: require('../../Assets/item.png'),
      },
      {
        id: 8,
        Title: 'Mexician Passion',
        Ratings: '3.5',
        Price: '£7.00',
        image: require('../../Assets/item.png'),
      },
    ],
  };
  PrintCards = post => {
    let item = post.item;
    let index = post.index;
    return (
      <TouchableOpacity
        onPress={() => {
          // this.props.navigation.navigate('Details');
          
          this.props.navigation.navigate('CategoryDetail');
        }}
        activeOpacity={.7}
        style={Styles.MainCard}>
        <Image
          borderTopLeftRadius={8}
          borderTopRightRadius={8}
          source={item.image}
          style={{width: responsiveWidth(45), height: responsiveHeight(17)}}
        />
        <View style={Styles.contentView}>
          <View style={Styles.Left}>
            <Text style={Styles.SmallText}>{item.Title}</Text>
            {
              item.Ratings?  <View style={{width: '80%'}}>
              <StarRating
                disabled={false}
                maxStars={5}
                rating={item.Ratings}
                emptyStar={'ios-star-outline'}
                fullStar={'ios-star'}
                halfStar={'ios-star-half'}
                iconSet={'Ionicons'}
                fullStarColor={'rgb(253,194,40)'}
                starSize={responsiveFontSize(2.5)}
              />
            </View>
         :null
            }
           </View>
          <View style={Styles.Right}>
            <TouchableOpacity
            
            onPress={() => {
              this.props.navigation.navigate('Cart');
            }}
            activeOpacity={.7}
            >
              <Ionicons
                color={Pink}
                size={responsiveFontSize(3.5)}
                name={'md-cart'}
              />
            </TouchableOpacity>
           {
            item.Price? <Text style={[Styles.SmallText, {marginTop: responsiveHeight(1)}]}>
              {item.Price}
            </Text>:null
           }
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  render() {
    return (
      <FlatList
        data={this.state.data}
        keyExtractor={item => item.id}
        numColumns={2}
        contentContainerStyle={Styles.contentContainerStyle}
        ItemSeparatorComponent={() => <View style={Styles.Seprator} />}
        renderItem={item => this.PrintCards(item)}
      />
    );
  }
}
const Styles = StyleSheet.create({
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
});
