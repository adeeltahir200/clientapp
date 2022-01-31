import React, { Component, useState, useEffect } from 'react';
import { View, Text, StyleSheet, Modal } from 'react-native';

const Checkmodal = (props) => {
    return (
        <Modal
            animationType='slide'
            transparent={false}
            visible={true}
        >
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>This is the check Modal</Text>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({

});


export default Checkmodal;
