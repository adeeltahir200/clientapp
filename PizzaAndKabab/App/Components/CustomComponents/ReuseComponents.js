import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from "react-native-responsive-dimensions";
import { Button } from 'react-native-paper'
import { colorOrange, colorWhite, } from '../../../GlobalCons/colors'
const TitleBarTextColor = '#3A3A3A'
export const TitleBar = (props) => {
    return (
        <View style={TitleBarStyle.container} >
            <View style={TitleBarStyle.titleContainer}>
                <Text style={[TitleBarStyle.titleTextStyle,{fontSize:props.fsize ?props.fsize:responsiveFontSize(2.4)}]}>
                    {props.title}
                </Text>
                <View style={TitleBarStyle.divider} />
            </View>
            <View style={TitleBarStyle.rightContainer}>
                <Button labelStyle={TitleBarStyle.buttonTextStyle} uppercase={false} mode="text" compact={true}
                    color={colorWhite}
                    onPress={props.detailClick}
                    style={{ height: '54%', width: "80%", borderRadius: 8, elevation: 5, padding: 0,  }}
                    contentStyle={{ height: '100%', backgroundColor: colorWhite }}>
                    {props.buttonTitle ? props.buttonTitle : 'More'}
                </Button>
            </View>
        </View>)
}
const TitleBarStyle = StyleSheet.create({
    container: {
        // backgroundColor: 'red',
        width: responsiveWidth(92),
        height: responsiveHeight(8),
        alignSelf: 'center',
        alignItems: 'center',
        flexDirection: 'row'
    },
    titleContainer: {
        // backgroundColor: 'blue',
        width: '75%', height: '100%', justifyContent: 'center'
    },
    titleTextStyle: {
        color: TitleBarTextColor,
        fontFamily: 'Recoleta-Bold',
        fontSize: responsiveFontSize(2.4)
    },
    divider: {
        backgroundColor: TitleBarTextColor,
        width: responsiveWidth(4),
         height: responsiveHeight(.6)
    },
    rightContainer: {
        // backgroundColor: 'green',
        width: '25%',
        height: '100%', justifyContent: 'center', alignItems: 'center'
    },
    buttonTextStyle: {
        color: TitleBarTextColor,
        fontFamily: 'Gilroy-Bold',
        fontSize: responsiveFontSize(1.5)
    }

})