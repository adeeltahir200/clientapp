
import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from "react-native-responsive-dimensions";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { goldenColor2, sfLight } from './../../../GlobalCons/colors'
import { Divider } from '../CustomComponents/CustomSafeAreaView';
import LinearGradient from 'react-native-linear-gradient'
export default class Header extends Component {

    render() {
        return (
            <LinearGradient
                start={{ x: 0, y: 1 }}
                end={{ x: 1, y: 0 }}
                colors={['#043A80', '#15A8D2']} style={styles.LinearGradientContainer}>

                <View style={styles.container}>
                    <View style={styles.leftContainer}>
                        <TouchableOpacity activeOpacity={.5} onPress={this.props.goBack}>
                            <Ionicons name={'ios-arrow-back'} color={goldenColor2} size={responsiveWidth(7)} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.titleContainer}>
                        <Text style={styles.titleStyle}>
                            {this.props.title}
                        </Text>
                    </View>
                </View>

            </LinearGradient>
        );
    }
}

const styles = StyleSheet.create({

    LinearGradient: {
        width: responsiveWidth(100),
        flexDirection: 'row',
         alignItems: 'center',
    },
    container: {
        height: 55, width: responsiveWidth(100),
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: responsiveHeight(3.5)
    },
    leftContainer: {
        height: '100%',
        width: '15%', justifyContent: 'center',
        alignItems: 'center'
    },
    titleContainer: {
        height: '100%',
        width: '75%', justifyContent: 'center',
        alignItems: 'center'
    },
    titleStyle: {
        fontSize: responsiveFontSize(2.8),
        color: goldenColor2,
        fontFamily: sfLight
    }
});
