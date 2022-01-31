import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, SafeAreaView, Image, Modal, FlatList, Dimensions, TouchableOpacity, ScrollView, ImageBackground, Animated } from 'react-native';
import Ionicon from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5, { FA5Style } from 'react-native-vector-icons/FontAwesome5';
import { theamColor, colorBlack, colorWhite } from '../../CSS/Colors'
import CustomSafeAreaView from '../../CustomComponents/CustomSafeAreaView'
import { Avatar, Input, CheckBox, ListItem, Badge, Button, ThemeProvider } from 'react-native-elements'
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import { ScrollableTabView, DefaultTabBar, ScrollableTabBar, } from '@valdio/react-native-scrollable-tabview'
import { Searchbar } from 'react-native-paper';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import MapView, { Marker, PROVIDER_GOOGLE, Callout } from 'react-native-maps';
import { getData, getAllOfCollection } from '../../../backend/utility';
import Geolocation from "react-native-geolocation-service";
import * as geolib from 'geolib';
const LATITUDE_DELTA = 0.04864195044303443;
const LONGITUDE_DELTA = 0.040142817690068;
const { width, height } = Dimensions.get("window");

const CARD_HEIGHT = height / 4;
const CARD_WIDTH = CARD_HEIGHT - 50;
let nearby = []

export default class Search extends Component {
state = {
data: [
{ name: 'Gloria Jean\'s Coffees-F11', image: require('../../../Assets/rest1.jpg'), desc: ' Cakes & Backery, Chicken, CupCakes, Ice Creams', rv: 4.6 },

{ name: 'Gloria Jean\'s Coffees-F11', image: require('../../../Assets/rest.jpg'), desc: ' Cakes & Backery, Chicken, CupCakes, Ice Creams', rv: 4.1 },

{ name: 'Gloria Jean\'s Coffees-F11', image: require('../../../Assets/rest1.jpg'), desc: ' Cakes & Backery, Chicken, CupCakes, Ice Creams', rv: 3.8 },


],
addressVisible: false,
addAddressVisible: false,


markers: [],
region: {
latitude: 45.52220671242907,
longitude: -122.6653281029795,
latitudeDelta: 0.04864195044303443,
longitudeDelta: 0.040142817690068,
},
searchFlag: false, firstQuery: '',
}
getCurrentPosition() {
try {
Geolocation.getCurrentPosition(
position => {
const region = {
latitude: position.coords.latitude,
longitude: position.coords.longitude,
latitudeDelta: LATITUDE_DELTA,
longitudeDelta: LONGITUDE_DELTA,
};
this.setRegion(region);
console.log(region);
},
error => { },
{ enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
);
} catch (e) {
alert(e.message || '');
}
}
setRegion(region) {
this.setState({ region }, () => {
console.log('State region', this.state.region)
});
}
componentWillMount() {
this.index = 0;
this.animation = new Animated.Value(0);
}

componentDidMount = async () => {

this.getCurrentPosition();
await getAllOfCollection('Restaurants').then((restaurants) => {
restaurants.map((item) => {
// console.log('Restaurant',item.Images!==undefined ? item.Images[0].url:null)
let distance = geolib.getPreciseDistance(
{ latitude: this.state.region.latitude, longitude: this.state.region.longitude },
{ latitude: item.location.latitude, longitude: item.location.longitude }
)
if (distance <= 3000) {
nearby.push(item)
this.setState({ markers: nearby })
}
})
})
// We should detect when scrolling has stopped then animate
// We should just debounce the event listener here
this.animation.addListener(({ value }) => {
let index = Math.floor(value / CARD_WIDTH + 0.3); // animate 30% away from landing on the next item
if (index >= this.state.markers.length) {
index = this.state.markers.length - 1;
}
if (index <= 0) {
index = 0;
}

clearTimeout(this.regionTimeout);
this.regionTimeout = setTimeout(() => {
if (this.index !== index) {
this.index = index;
const { location } = this.state.markers[index];
this.map.animateToRegion(
{
...location,
latitudeDelta: this.state.region.latitudeDelta,
longitudeDelta: this.state.region.longitudeDelta,
},
350
);
}
}, 10);
});
}
render() {

const interpolations = this.state.markers.map((marker, index) => {
const inputRange = [
(index - 1) * CARD_WIDTH,
index * CARD_WIDTH,
((index + 1) * CARD_WIDTH),
];
const scale = this.animation.interpolate({
inputRange,
outputRange: [1, 2.5, 1],
extrapolate: "clamp",
});
const opacity = this.animation.interpolate({
inputRange,
outputRange: [0.45, 1, 0.45],
extrapolate: "clamp",
});
return { scale, opacity };
});
return (
<SafeAreaView style={styles.container}>

{/* <View style={{ backgroundColor: colorWhite, height: 80, flexDirection: 'row', width: responsiveWidth(100), alignItems: 'flex-end', }}>
<TouchableOpacity style={{ width: '20%', justifyContent: 'center', alignItems: 'center', marginBottom: 15 }}
onPress={() => this.props.navigation.openDrawer()}
>
<SimpleLineIcons name="menu" size={25} color={theamColor} />
</TouchableOpacity>
<View style={{ width: '55%', height: '100%', alignItems: 'center', justifyContent: 'center' }} >
<Image style={{ height: '70%', width: '60%', marginTop: 5, resizeMode: 'center' }} source={require('../../../Assets/LOGO.png')} />
</View>
<TouchableOpacity style={{ width: '10%', justifyContent: 'center', alignItems: 'center', marginBottom: 15, marginLeft: 10 }} >
<FontAwesome name="search" size={25} color={theamColor} />
</TouchableOpacity>
<TouchableOpacity style={{ width: '10%', justifyContent: 'center', alignItems: 'center', marginBottom: 15 }}
onPress={() => { this.props.navigation.navigate('Feed') }}
>
<FontAwesome name="bell" size={25} color={theamColor} />
</TouchableOpacity>
</View> */}

{this.state.searchFlag ?
<View style={{ backgroundColor: colorWhite, height: 80, flexDirection: 'row', width: responsiveWidth(100), alignItems: 'center', justifyContent: 'center' }}>
<Searchbar
style={{ height: '75%', backgroundColor: '#E5E5E5', width: '90%', alignSelf: 'center' }}
placeholder="Search"
onChangeText={query => { this.setState({ firstQuery: query }); }}
value={this.state.firstQuery}
onIconPress={() => {
console.log('Query', this.state.firstQuery)
this.setState({ searchFlag: false });
}}

iconColor={theamColor}
/>
</View> :
<View style={{ backgroundColor: colorWhite, height: 80, flexDirection: 'row', width: responsiveWidth(100), alignItems: 'flex-end', }}>
<TouchableOpacity style={{ width: '20%', justifyContent: 'center', alignItems: 'center', marginBottom: 15 }}
onPress={() => this.props.navigation.openDrawer()}
>
<SimpleLineIcons name="menu" size={25} color={theamColor} />
</TouchableOpacity>


<View style={{ width: '55%', height: '100%', alignItems: 'center', justifyContent: 'center' }} >
<Image style={{ height: '70%', width: '60%', marginTop: 5, resizeMode: 'center' }} source={require('../../../Assets/LOGO.png')} />
</View>
<TouchableOpacity style={{ width: '10%', justifyContent: 'center', alignItems: 'center', marginBottom: 15, marginLeft: 10 }}
onPress={() => {
this.setState({ searchFlag: true });
}}
>
<FontAwesome name="search" size={25} color={theamColor} />
</TouchableOpacity>
<TouchableOpacity style={{ width: '10%', justifyContent: 'center', alignItems: 'center', marginBottom: 15 }}
onPress={() => { this.props.navigation.navigate('Feed') }}
>
<FontAwesome name="bell" size={25} color={theamColor} />
</TouchableOpacity>
</View>
}

<View style={{ width: responsiveWidth(100), justifyContent: 'center', alignItems: 'center', height: responsiveHeight(10), backgroundColor: theamColor }} >

<Searchbar
placeholder="Search Restaurants"
inputStyle={{ fontSize: responsiveFontSize(1. , padding: 0 }}
onChangeText={query => { this.setState({ firstQuery: query }); }}
value={this.state.firstQuery}

style={{ width: responsiveWidth(95), alignSelf: 'center', borderRadius: 5, height: responsiveHeight(7), alignSelf: 'center', elevation: 5, borderWidth: 0, borderColor: colorWhite }}
/>
</View>




{/* Add Address */}





</SafeAreaView>
);
}
}

const styles = StyleSheet.create({
container: {
flex: 1,

backgroundColor: colorWhite,
},


scrollView: {
position: "absolute",
bottom: 20,
left: 0,
right: 0,
paddingVertical: 10,
},
endPadding: {
paddingRight: width - CARD_WIDTH,
},
card: {
padding: 10,
elevation: 2,
backgroundColor: "#FFF",
marginHorizontal: 10,
shadowColor: "#000",
shadowRadius: 5,
shadowOpacity: 0.3,
shadowOffset: { x: 2, y: -2 },
height: CARD_HEIGHT,
width: CARD_WIDTH,
overflow: "hidden",
},
cardImage: {
flex: 3,
width: "100%",
height: "100%",
alignSelf: "center",
},
textContent: {
flex: 1,
},
cardtitle: {
fontSize: 12,
marginTop: 5,
fontWeight: "bold",
},
cardDescription: {
fontSize: 12,
color: "#444",
},
markerWrap: {
alignItems: "center",
justifyContent: "center",
},
marker: {
width: 15,
height: 15,
borderRadius: 10,
backgroundColor: theamColor
// "rgba(130,4,150, 0.9)",
},
ring: {
width: 40,
height: 40,
borderRadius: 20,
backgroundColor: "rgba(130,4,150, 0.3)",
position: "absolute",
borderWidth: 1,
borderColor: "rgba(130,4,150, 0.5)",
},

});
