import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    StatusBar,
    Image,
    TouchableOpacity,
    SafeAreaView
} from 'react-native';
import { colorOrange, colorWhite, phColor } from './../../../GlobalCons/colors';
import {
    responsiveFontSize,
    responsiveHeight,
    responsiveWidth,
} from 'react-native-responsive-dimensions';

export default class AuthLoadingScreen extends Component {
    handleViewRef = ref => this.view = ref;
    componentDidMount = async () => {
        setTimeout(() => {
            this.props.navigation.navigate('AuthLoading1'); 
        }, 2500);
    };
    render() {
        return (
            <SafeAreaView style={styles.container}>
                {/* <StatusBar
                    backgroundColor={colorWhite}
                    barStyle="dark-content"
                    // translucent={true}
                /> */}
                <View style={styles.container}>

                    <View style={styles.logoContainer}>
                        <Image
                            style={{
                                width: '100%',
                                resizeMode: 'contain',

                            }}
                            source={require('../../Assets/Rectangle1.png')}
                        />
                    </View>
                    </View>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent:'center',
        backgroundColor: 'white',
    },
    logoContainer: {
        width: responsiveWidth(100),
        justifyContent: 'flex-end'
    },

});
