import React, { Component } from 'react';
import { StyleSheet, Text, View, Modal, StatusBar } from 'react-native';

class CustomModal extends Component {
    componentDidMount() {
        // StatusBar.setHidden(true);
        //  
        // StatusBar.setBarStyle('dark-content')
        // StatusBar.setBackgroundColor("rgba(0,0,0,0.6)");

    }
    render() {
        return (
            <Modal
                visible={this.props.isVisible}
                transparent={true}>
                <View style={styles.container}>
                    {this.props.children}
                </View>
            </Modal>

        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.6)",
        justifyContent:'center',
        alignItems:'center'
        // backgroundColor: colorWhite
    },
});
export default CustomModal;