import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, StatusBar, TextInput, ImageBackground, Image, 
//    SafeAreaView 
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient'
import { responsiveHeight, responsiveWidth, responsiveFontSize } from "react-native-responsive-dimensions";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Input, Button } from 'react-native-elements'
import { colorWhite, colorBlack, blue, } from './../../../GlobalCons/colors'
//import ModalDropdown from 'react-native-modal-dropdown';
import { SafeAreaView } from 'react-navigation';

export default class Menu extends Component {
    state = {

    }
    componentDidMount() {
        this._navListener = this.props.navigation.addListener('willFocus', () => {
             
            StatusBar.setBarStyle('light-content')
            StatusBar.setBackgroundColor(blue);
        });
    }
    render() {
        return (
            <SafeAreaView forceInset={{ top: 'never'}} style={styles.container}>
                <StatusBar translucent backgroundColor="transparent" />
                <View style={styles.container}>
                    <Button
                        title="Menu"
                        type="Solid"
                        // onPress={() => this.props.navigation.openDrawer()}
                        containerStyle={{ backgroundColor: 'pink' }}
                    />
                </View>
            </SafeAreaView >

        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colorWhite,
        justifyContent: 'center',
        alignItems: 'center',
    },


}); 