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
import {
  blue,
  colorWhite,
  lightBlack,
  colorBlack,
  phColor,
} from '../../../GlobalCons/colors';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

export default class CategoriesFlatList extends Component {
  state = {
    data: [ 
      {
        id: 1,
        Category: 'Category 1',
        image: require('../../Assets/category.png'),
        street:'Street No#4,Pimlico Road',
        place:'Carnaby,London'
      },
      {
        id: 2,
        Category: 'Category 2',
        image: require('../../Assets/category.png'),
        street:'Street No#30,Bank Road',
        place:'Oxford,London'
      },
      {
        id: 3,
        Category: 'Category 3',
        image: require('../../Assets/category.png'),
        street:'Street No#90,Stadium Road',
        place:'Abbey,London'
      },
      {
        id: 4,
        Category: 'Category 4',
        image: require('../../Assets/category.png'),
        street:'Street No#70,Bank Road',
        place:'Brick Lane,London'
      },
      {
        id: 4,
        Category: 'Category 4',
        image: require('../../Assets/category.png'),
        street:'Street No#70,Bank Road',
        place:'Brick Lane,London'
      },
    ],
  };
  componentDidMount=()=>{
    console.log('REST',this.props.data)
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
  printCards = post => {
    let item = post.item;
    let index = post.index;
    return (
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
        <Text style={Styles.cardTextStyle1}>{item.street}</Text>
        <Text style={Styles.cardTextStyle1}>{item.place}</Text>
        <View flexDirection={'row'}>{this.renderRatings(5)}</View>
      </View>
    </TouchableOpacity>
    );
  };
  render() {
    return (
      <FlatList
        data={this.props.data}
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
  }, cardContainer: {
    padding: responsiveWidth(1),
    backgroundColor: colorWhite,
    elevation: 10,
    width: responsiveWidth(90),
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
