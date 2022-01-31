import React, { Component } from 'react';
import { View, Text, Button, StyleSheet, ScrollView, FlatList } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import AsyncStorage from '@react-native-community/async-storage';
import NetInfo from '@react-native-community/netinfo';
import CustomModal from '../CustomComponents/CustomModal';
import {
    blue,
    colorWhite,
    lightBlack,
    headerColor,
    Pink,
    greyText,
    yellow,
} from '../../../GlobalCons/colors';
import {
    responsiveFontSize,
    responsiveHeight,
    responsiveWidth,
} from 'react-native-responsive-dimensions';
import moment from 'moment';
import { ListItem } from 'react-native-elements';

class Adeelorderhistory extends Component {

    constructor(props) {
        super(props);
        this.state = {
            Pending: true,
            Completed: false,
            data: [],
            complete: [],
            loading: true,
            isVisible: false,
            refresh: false
        }
    }
    componentDidMount = async () => {
        NetInfo.addEventListener(state => {
            if (!state.isConnected) {
                alert('Error:Please connect to internet.')
            }
        });
        //this._navListener = this.props.navigation.addListener('willFocus', () => {
        //StatusBar.setBarStyle('dark-content');
        //StatusBar.setBackgroundColor('transparent');
        //});
        let dataa = await AsyncStorage.getItem('token');
        var myHeaders = new Headers();
        myHeaders.append('Authorization', `Bearer ${dataa}`);

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow',
        };

        fetch(
            'https://pizzakebab.ranglerztech.website/api/order-history',
            requestOptions,
        )
            .then(response => response.text())
            .then(result => {
                let dataa = JSON.parse(result);
                if (dataa.successData) {
                    let data = [];
                    let arr = data.push(dataa.successData);
                    console.log('mrs.saleh', dataa.successData)
                    dataa.successData.map(item => {
                        if (item.status == 'delivered') {
                            let data = [];
                            data.push(dataa.successData);
                            this.setState({ complete: dataa.successData });
                            this.setState({ loading: false });
                        } else {
                            let pending = [];
                            pending.push(dataa.successData);

                            this.setState({ data: dataa.successData });
                            this.setState({ loading: false })
                        }
                    });
                } else {
                    this.setState({ loading: false });
                    alert(dataa.message);
                }
            })
            .catch(error => console('error', error));
    };
    splited(item) {
        var data = item.split(' ');
        return data[0];
    }
    addSmall = item => {
        console.log(item.length);
        let quantity = 0;
        item.map(data => {
            console.log(data);
            let dataa = quantity;
            quantity = dataa + JSON.parse(data.quantity);
        });

        return quantity;
    };
    PrintCard = post => {
        let item = post.item;
        let index = post.index;
        // console.log('>>>>>>>>>>>item<<<<<<<<<<<<<', item.menu_detail);
        // console.log('hjhjj', item.menu_detail);

        return (
            <View style={Styles.MainCard}>
                <View style={Styles.InnerCardView}>
                    <View style={Styles.DateView}>
                        <View style={{ width: '80%' }}>
                            <Text style={Styles.MediumText}>
                                {this.splited(item.created_at)}
                                {' at '}
                                {moment(item.created_at, ' hh:mm a').format(' hh:mm a')}
                            </Text>
                        </View>
                        <View style={{ width: '80%' }}>
                            <Text style={[Styles.MediumText, { color: Pink }]}>
                                {'£'}
                                {item.total}
                            </Text>
                        </View>
                    </View>

                    {item.order_menu && (
                        <FlatList
                            data={item.order_menu}
                            keyExtractor={item => item.id}
                            renderItem={itm => {
                                let post = itm.item;
                                console.log("majid", post.menu);
                                return (
                                    <View
                                        style={{
                                            justifyContent: 'space-between',
                                        }}>
                                        {post.menu_detail.map(item => {
                                            console.log(item);
                                            return (
                                                item.quantity && <Text style={Styles.SmallText}>
                                                    {item.quantity}
                                                    {'x '}
                                                    {item.size}{" "}
                                                    {post.menu.name}
                                                </Text>
                                            );
                                        })}
                                    </View>
                                );
                            }}
                        />
                    )}
                    {item.status == 'pending' && (
                        <Text
                            onPress={() => {
                                //this.setState({isVisible: true})
                            }}
                            style={{
                                left: responsiveWidth(67),
                                color: greyText,
                                fontSize: responsiveFontSize(2.2),
                            }}>
                            {'Cancel'}
                        </Text>
                    )}
                    {item.status == 'InKitchen' && (
                        <Text
                            style={{
                                left: responsiveWidth(63),
                                color: greyText,
                                fontSize: responsiveFontSize(2.2),
                            }}>
                            {'InKitchen'}
                        </Text>
                    )}
                    {item.status == 'OnRoute' && (
                        <Text
                            style={{
                                left: responsiveWidth(64.5),
                                color: greyText,
                                fontSize: responsiveFontSize(2.2),
                            }}>
                            {'OnRoute'}
                        </Text>
                    )}
                    {item.status == 'FoodReady' && (
                        <Text
                            style={{
                                left: responsiveWidth(63),
                                color: greyText,
                                fontSize: responsiveFontSize(2.2),
                            }}>
                            {'FoodReady'}
                        </Text>
                    )}
                </View>
            </View>
        );
    };
    renderItem = ({item}) =>(
        <ListItem
            title={item.total}
        />
    )

    render() {
        //ok
        if (this.state.loading == true) {
            return (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <ActivityIndicator
                        size='large'
                        color='blue'
                    />
                </View>
            )
        } else {
            return (
                <View style={{ flex: 1, marginTop: '5%' }}>
                    <FlatList
                        data={this.state.data}
                        contentContainerStyle={Styles.contentContainerStyle}
                        keyExtractor={(item, index) => index.toString()}
                        ItemSeparatorComponent={() => <View style={Styles.Seprator} />}
                        renderItem={this.renderItem}
                    />
                </View>
            );
        }
    }
}

const blueBG = '#393b82';
const Styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colorWhite,
    },
    contentContainerStyle: {
        paddingVertical: responsiveHeight(4),
    },
    Seprator: {
        marginTop: responsiveHeight(2),
    },
    MainCard: {
        width: '90%',
        borderRadius: 8,
        elevation: 5,
        backgroundColor: colorWhite,
        alignSelf: 'center',
        paddingVertical: responsiveHeight(2),
    },
    InnerCardView: {
        width: '90%',
        alignSelf: 'center',
    },
    modalMainContainer: {
        height: responsiveHeight(30),
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
    DateView: {
        width: '100%',
        flexDirection: 'row',
    },
    MediumText: {
        color: blue,
        fontSize: responsiveFontSize(2.5),
    },
    SmallText: {
        color: greyText,
        fontSize: responsiveFontSize(2.2),
    },
    Header: {
        height: responsiveHeight(20),
        width: '100%',
        backgroundColor: headerColor,
    },
    ArrowView: {
        height: responsiveHeight(10),
        width: '90%',
        alignSelf: 'center',
        justifyContent: 'flex-end',
    },
    HeaderTextView: {
        paddingTop: responsiveHeight(1),
        width: '90%',
        alignSelf: 'center',
    },
    headerImageStyle: {
        resizeMode: 'contain',
        width: responsiveWidth(10),
        height: responsiveHeight(5),
    },
    ButtonsOutlineView: {
        width: '80%',
        height: responsiveHeight(5),
        alignSelf: 'center',
        borderRadius: 50,
        borderColor: Pink,
        borderWidth: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    defaultButtonTouch: {
        height: '100%',
        width: '49%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    pressedButtonTouch: {
        height: '100%',
        width: '49%',
        backgroundColor: Pink,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
        borderColor: Pink,
        borderWidth: 1,
    },
    defaultButtonText: {
        color: Pink,
        fontSize: responsiveFontSize(2),
    },
    pressedButtonText: {
        color: colorWhite,
        fontSize: responsiveFontSize(2),
    },
    OrderAgainView: {
        marginTop: responsiveHeight(1),
        height: responsiveHeight(5),
        width: '100%',
        justifyContent: 'center',
        alignItems: 'flex-end',
    },
});

export default Adeelorderhistory;