import React, { Component } from 'react';
import {
    View,
    TextInput,
    Text,
    ToastAndroid,
    Button,
    StyleSheet,
    SafeAreaView,
    StatusBar,
    TouchableOpacity,
    ScrollView,
    KeyboardAvoidingView,
    Image,
    Alert
} from 'react-native';
import {
    responsiveHeight,
    responsiveWidth,
    responsiveFontSize,
} from 'react-native-responsive-dimensions';
import { colorWhite, colorBlack, lightBlack } from './../../../GlobalCons/colors';
import { Icon, Input } from 'react-native-elements';
import { ActivityIndicator } from 'react-native-paper';
import AsyncStorage from '@react-native-community/async-storage';
import CustomModal from '../CustomComponents/CustomModal';
class Payment extends Component {

    constructor(props) {
        super(props);
        //this.expiryyearref = React.createRef();
        //this.expirymonthref = React.createRef();
        //this.cardnumberref = React.createRef();
        //this.cvcref = React.createRef();
        this.state = {
            cardnumber: 0,
            expiryyear: 0,
            expirymonth: 0,
            cvc: 0,
            anotherscreen: false,
            loading: false,
            isVisible: false,
            loadingbutton: false,

        }
    }

    componentDidMount() {

    }
    async addcardtoserver() {
        if (this.state.cardnumber == 0 || this.state.expirymonth == 0 || this.state.expiryyear == 0 || this.state.cvc == 0) {
            ToastAndroid.show('Please enter all the fields', ToastAndroid.LONG);
        }else if(this.state.expirymonth>12 || this.state.expiryyear<=2020){
            ToastAndroid.show('Please input coreect expiry month and year',ToastAndroid.LONG)
        }
        else {
            this.setState({ loadingbutton: true })
            let dataa = await AsyncStorage.getItem('token');
            //console.log(dataa)
            //alert(dataa)
            var myHeaders = new Headers();
            myHeaders.append('Authorization', `Bearer ${dataa}`);
            var formdata = new FormData();
            let tempobj = {
                type: 'card',
                number: this.state.cardnumber,
                cvc: this.state.cvc,
                expiry_month: this.state.expirymonth,
                expiry_year: this.state.expiryyear,
            }
            let temparray = [tempobj]
            formdata.append('cards', JSON.stringify(temparray));

            var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: formdata,
                redirect: 'follow',
            };
            //alert(JSON.stringify(temparray))
            console.log(temparray)
            //this.setState({ loadingbutton: false })

            fetch("https://pizzakebab.ranglerztech.website/api/add-card", requestOptions)
                .then(response => response.text())
                .then((result) => {
                    let dataa = JSON.parse(result);
                    if(dataa.status == 200){
                        this.setState({ loadingbutton: false })
                        this.setState({ isVisible: true })
                    }else{
                        Alert.alert(
                            'Slight error',
                            JSON.stringify(dataa.messsage)
                        )
                    }
                    //alert(result);
                    
                    //
                }).catch((error) => {
                    alert(JSON.stringify(error))
                    this.setState({ loadingbutton: false })
                })

            /*setTimeout(() => {
                ToastAndroid.show('COnfirmed', ToastAndroid.SHORT);
                this.setState({ loadingbutton: false })
            }, 3000)*/


        }
    }

    render() {
        if (this.state.anotherscreen == true) {
            return (
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <Text>
                        modal
                    </Text>
                </View>
            )
        } else {
            return (
                <SafeAreaView forceInset={{ top: 'never' }} style={styles.maincontainer}>
                    <StatusBar backgroundColor='#393b82' translucent={true} />
                    <CustomModal isVisible={this.state.isVisible}>
                        <View
                            style={{
                                flex: 1,
                                alignSelf: 'center',
                                justifyContent: 'center',
                            }}>
                            <View style={styles.modalMainContainer}>
                                <View style={styles.modalImageContainer}>
                                    <Image
                                        source={require('../../Assets/icon-check-alt2.png')}
                                        style={styles.modalImageStyle}
                                    />
                                </View>
                                <View style={styles.modalTextContainer}>
                                    <Text style={styles.modalTextStyle}>
                                        {'Your card is added'}
                                    </Text>
                                </View>

                                <TouchableOpacity
                                    style={{ backgroundColor: 'red', height: '10%', width: '90%', borderRadius: 30, justifyContent: 'center', alignItems: 'center' }}
                                    onPress={() => {
                                        this.setState({ isVisible: false })
                                        this.props.navigation.goBack()
                                    }}
                                >
                                    <Text style={{ color: 'white', fontWeight: 'bold' }}>
                                        OK
                                    </Text>
                                </TouchableOpacity>

                            </View>
                        </View>
                    </CustomModal>
                    <View style={styles.header}>
                        <View style={styles.iconcontainer}>
                            <Icon
                                name='chevron-left'
                                type='font-awesome'
                                color='white'
                                size={responsiveWidth(8)}
                                onPress={() => {
                                    this.props.navigation.goBack();
                                }}
                            />
                        </View>
                        <View style={styles.titlecontainer}>
                            <Text
                                style={{
                                    color: 'white',
                                    fontWeight: 'bold',
                                    fontSize: responsiveWidth(8),
                                    marginLeft: responsiveWidth(3)
                                }}
                            >
                                Payment Method
                            </Text>
                        </View>
                    </View>
                    <View style={styles.body}>
                        <View style={styles.card}>
                            <View style={{ height: '90%', width: '90%' }}>
                                <View
                                    style={{
                                        marginHorizontal: responsiveHeight(2),
                                        flexDirection: 'row',
                                    }}>
                                    <Image
                                        style={{
                                            height: responsiveHeight(5),
                                            width: responsiveWidth(15),
                                            marginRight: responsiveHeight(1),
                                            resizeMode: 'contain',
                                        }}
                                        source={require('../../Assets/cc-mastercard.png')}
                                    />
                                    <Image
                                        style={{
                                            height: responsiveHeight(5),
                                            width: responsiveWidth(15),
                                            resizeMode: 'contain',
                                        }}
                                        source={require('../../Assets/Shape.png')}
                                    />
                                </View>

                                <View
                                    style={{
                                        flexDirection: 'row',
                                        height: responsiveHeight(9),
                                        width: '100%',
                                        borderWidth: 1,
                                        borderColor: 'black',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        //marginHorizontal: responsiveHeight(1),
                                        backgroundColor: 'rgba(214,207,199,0.1)',
                                        borderRadius: 5,
                                        marginTop: responsiveHeight(1),
                                        marginTop: '5%'

                                    }}>
                                    <Icon
                                        name='credit-card'
                                        type='font-awesome'

                                    />
                                    <TextInput
                                        placeholder="**** **** **** ****"
                                        style={{ width: '80%', textAlign: "left", letterSpacing: 3, paddingHorizontal: responsiveHeight(2) }}
                                        placeholderTextColor={'#000'}
                                        keyboardType="decimal-pad"
                                        maxLength={16}
                                        value={this.state.cardnumber}
                                        onChangeText={text => {
                                            this.setState({ cardnumber: text })
                                        }}
                                    />


                                </View>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: '5%' }}>
                                    <View style={{ flexDirection: 'row', flex: 1 }}>
                                        <View
                                            style={{
                                                height: responsiveHeight(9),
                                                width: '40%',
                                                borderWidth: 1,
                                                borderColor: 'black',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                //marginHorizontal: responsiveHeight(1),
                                                backgroundColor: 'rgba(214,207,199,0.1)',
                                                borderRadius: 5,
                                                marginTop: responsiveHeight(1),
                                            }}>
                                            <TextInput
                                                placeholder="MM"
                                                style={{ width: '100%', textAlign: "center", paddingHorizontal: responsiveHeight(2) }}
                                                placeholderTextColor={'#000'}
                                                keyboardType="decimal-pad"
                                                maxLength={2}
                                                value={this.state.expirymonth}
                                                onChangeText={text => {
                                                    this.setState({ expirymonth: text })
                                                }}
                                            />

                                        </View>
                                        <View
                                            style={{
                                                height: responsiveHeight(9),
                                                width: '40%',
                                                borderWidth: 1,
                                                borderColor: 'black',
                                                justifyContent: 'center',
                                                alignItems: 'center',

                                                marginHorizontal: responsiveHeight(1),
                                                backgroundColor: 'rgba(214,207,199,0.1)',
                                                borderRadius: 5,
                                                marginTop: responsiveHeight(1),
                                            }}>
                                            <TextInput
                                                placeholder="YY"
                                                style={{ width: '100%', textAlign: "center", paddingHorizontal: responsiveHeight(2) }}
                                                placeholderTextColor={'#000'}
                                                keyboardType="decimal-pad"
                                                maxLength={4}
                                                value={this.state.expiryyear}
                                                onChangeText={text => {
                                                    this.setState({ expiryyear: text })
                                                }}
                                            />

                                        </View>
                                    </View>
                                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                        <View
                                            style={{
                                                height: responsiveHeight(9),
                                                width: '100%',
                                                borderWidth: 1,
                                                borderColor: 'black',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                //marginHorizontal: responsiveHeight(1),
                                                backgroundColor: 'rgba(214,207,199,0.1)',
                                                borderRadius: 5,
                                                marginTop: responsiveHeight(1),
                                            }}>
                                            <TextInput
                                                placeholder="CVC"
                                                style={{ width: '100%', textAlign: "center", letterSpacing: 5, paddingHorizontal: responsiveHeight(2) }}
                                                placeholderTextColor={'#000'}
                                                keyboardType="decimal-pad"
                                                maxLength={3}
                                                secureTextEntry={true}
                                                value={this.state.cvc}
                                                onChangeText={text => {
                                                    this.setState({ cvc: text })
                                                }}
                                            />

                                        </View>
                                    </View>
                                </View>
                                <TouchableOpacity
                                    style={{
                                        marginHorizontal: responsiveHeight(3),
                                        height: responsiveHeight(8),
                                        backgroundColor: '#e12c2c',
                                        marginBottom: responsiveHeight(5),
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        borderRadius: responsiveHeight(2),
                                        marginTop: responsiveHeight(5),
                                        //marginBottom: responsiveHeight(5)
                                    }}
                                    activeOpacity={0.7}
                                    onPress={() => {
                                        this.addcardtoserver();
                                    }}
                                >
                                    {this.state.loadingbutton ? (
                                        <ActivityIndicator size={'small'} color="#fff" />
                                    ) : (
                                            <Text
                                                style={{ fontSize: responsiveFontSize(2.5), color: 'white' }}>
                                                Confirm
                                            </Text>
                                        )}
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </SafeAreaView>
            )
        }
    }
}

const styles = StyleSheet.create({
    maincontainer: {
        flex: 1,
        //backgroundColor: 'red'
        //justifyContent:'center'
    },
    header: {
        flex: 2,
        backgroundColor: '#393b82',
        borderBottomLeftRadius: 60,
        borderBottomRightRadius: 60
    },
    iconcontainer: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'flex-start',
        marginLeft: responsiveWidth(3),
        //margin:
        //backgroundColor:'red'
    },
    titlecontainer: {
        flex: 2,
        //backgroundColor: 'black'
    },
    body: {
        flex: 4,
        //backgroundColor: 'green',
        alignItems: 'center'
    },
    card: {
        height: responsiveHeight(50),
        width: responsiveWidth(90),
        //backgroundColor: 'red',
        marginTop: -responsiveHeight(15),
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 2,
        backgroundColor: colorWhite,
        elevation: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    modalMainContainer: {
        height: responsiveHeight(70),
        width: responsiveWidth(85),
        alignSelf: 'center',
        backgroundColor: colorWhite,
        borderRadius: responsiveWidth(3),
        justifyContent: 'space-evenly',
        alignItems: 'center',
        padding: responsiveWidth(4),
    },
    modalImageContainer: {
        height: responsiveHeight(20),
        width: '80%',
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalImageStyle: {
        height: '90%',
        width: '90%',
        resizeMode: 'contain',
    },
    modalTextContainer: {
        height: responsiveHeight(10),
        width: '90%',
        alignItems: 'center',
        // backgroundColor: 'red'
    },
    modalTextStyle: {
        fontSize: responsiveFontSize(2.5),
        fontWeight: 'bold',
        color: '#e12c2c',
        textAlign: 'center',
    },
    modalDecTextStyle: {
        fontSize: responsiveFontSize(2.2),
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalButtonContainer: {
        height: responsiveHeight(8),
        width: responsiveWidth(70),
        alignSelf: 'center',
        borderRadius: responsiveWidth(10),
        // backgroundColor:red,
        //  backgroundColor: 'red',
        padding: 0,
    },
})

export default Payment
