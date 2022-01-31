import React, { Component } from 'react';
import { View, StatusBar, SafeAreaView, StyleSheet } from 'react-native';
import { colorWhite, themeColor } from '../../../GlobalCons/colors';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from "react-native-responsive-dimensions";
import LinearGradient from 'react-native-linear-gradient';
export const Divider = (props) => (<View style={{ height: props.height, width: responsiveWidth(100) }} />)
class CustomSafeAreaView extends Component {

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <StatusBar translucent backgroundColor="transparent" />
                <View style={styles.container}>
                    {this.props.children}
                </View>
            </SafeAreaView>

        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colorWhite
    },
});
export default CustomSafeAreaView;
