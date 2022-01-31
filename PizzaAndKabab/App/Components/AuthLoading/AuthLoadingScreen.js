import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import {colorOrange, colorWhite, phColor} from './../../../GlobalCons/colors';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import * as Animatable from 'react-native-animatable';
import AsyncStorage from '@react-native-community/async-storage';

export default class AuthLoadingScreen extends Component {
  componentDidMount = async () => {
    let data = await AsyncStorage.getItem('token');
    setTimeout(() => {
      if (data) {
        this.props.navigation.navigate('Resturents');
      } else {
        this.props.navigation.navigate('Auth');
      }
    }, 4000);
  };
  render() {
    return (
      <SafeAreaView style={styles.container}>
        {/* <StatusBar
          backgroundColor={'#fbfdfa'}
          barStyle="dark-content"
        // translucent={true}
        /> */}
        <View style={styles.container}>
          <Image
            style={{
              marginTop: responsiveHeight(10),
              width: responsiveWidth(90),
            }}
            source={require('../../Assets/piza.gif')}
          />
          <View
            style={{
              height: '8%',
              bottom: responsiveHeight(5),
              position: 'absolute',
              width: '100%',
              backgroundColor: '#dc4b3e',
            }}>
            <Animatable.Text
              animation={'fadeOutRight'}
              duration={3500}
              direction={'normal'}
              style={{
                color: colorWhite,
                fontWeight: 'bold',
                fontSize: responsiveFontSize(3),
                alignSelf: 'center',
                alignItems: 'center',
                justifyContent: 'center',
                top: responsiveHeight(1.6),
              }}>
              NUMBER 1 PIZZA & KABAB
            </Animatable.Text>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
    backgroundColor: '#fbfdfa',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
