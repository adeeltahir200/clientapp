import React, { Component } from 'react';
import { View, Text, FlatList, StyleSheet, StatusBar, TextInput, SafeAreaView, ScrollView, ToastAndroid, TouchableOpacity, Image, Alert, Button } from 'react-native';
import { ListItem, Input } from 'react-native-elements';
import { connect } from 'react-redux';
import { additemtocart, deleteitemfromcart } from '../../Redux/Action/Action';
import AsyncStorage from '@react-native-community/async-storage';
//import { ScrollView } from 'react-native-gesture-handler';
import NetInfo from '@react-native-community/netinfo';
import { ActivityIndicator } from 'react-native-paper';

import {
    responsiveHeight,
    responsiveWidth,
    responsiveFontSize,
} from 'react-native-responsive-dimensions';

let myarray = []
let myarray2 = []
let checktext = 'checktext'
let theitemname = 'Helloo';
let theitemdescription = 'World';
let theitemimage = ' ';
let theprice;
let menuarray = [];
let adeelextraid;
let globaldeliverycharges = 0
let globaltaxes = 0
let appstartchek = 'false';
//let checkforarraygettinglengthzero = true;
//let thefrom = '';



const mapStateToProps = state => {
    return {
        theitemsincart: state.itemsincart
    }
}

const mapDispatchToProps = dispatch => {
    return ({
        additemtocartthroughdispatch: (item, qty) => dispatch(additemtocart(item, qty))
    })
}

class Mycart extends Component {

    constructor(props) {
        super(props);
        //theitem = JSON.stringify(this.props.navigation.state.params.item);
        //theorder = JSON.stringify(this.props.navigation.state.params.order);
        this.state = {
            item: this.props.navigation.state.params.item,
            order: this.props.navigation.state.params.order,
            refersh: false,
            comment: '',
            texs: 0,
            deliveryCharges: 0,
            loading: false,
            totalprice: 0,
            subTotal: 0,
            refersh: false,
            notmyarray: [],
            data: null,
            loading: false,
        }
    }
    //old code


    //old code



    componentWillMount = async () => {
        //this.storeData();
        //this.getData();
        if (this.state.subTotal == 0) {
            this.setState({ loading: true })
        } else {
            this.setState({ loading: false })
        }
        if (this.props.navigation.state.params.from == 'stack') {
            theitemname = this.props.navigation.state.params.item.item.name;
            theitemdescription = this.props.navigation.state.params.item.item.description;
            theitemimage = this.props.navigation.state.params.item.item.image;
            theprice = this.props.navigation.state.params.price;
            menuarray = this.props.navigation.state.params.item.menu;
            adeelextraid = this.props.navigation.state.params.item.extra_id;
            let tempitemobj = this.props.navigation.state.params.item;
            let tempobj = {
                name: theitemname,
                description: theitemdescription,
                image: theitemimage,
                price: theprice,
                menu: menuarray,
                extraid: adeelextraid,
            }
            //let tempobj2 = {
            //item: tempitemobj,
            //qty:1
            //}

            console.log('The array is' + JSON.stringify(myarray))
            /*if (myarray.length == 0) {
                this.props.additemtocartthroughdispatch(tempitemobj, 1);
                console.log('The values were dispatched ')
                ///console.log('Value from redux is : '+this.props.)
                myarray.push(tempobj)

                myarray2.push(tempobj)
            }*/
            /*let savedarray = await AsyncStorage.getItem('adeelarray');
            savedarray != null ? JSON.parse(savedarray) : [];
            savedarray.push(tempobj);
            let newsavedarray = JSON.stringify(savedarray);
            await AsyncStorage.setItem('adeelarray',newsavedarray);*/

            let found = myarray.some((value) => value.name == tempobj.name)
            let found2 = myarray2.some((value) => value.name == tempobj.name)
            let _Found = myarray.findIndex((value, index) => {
                if (value.name == theitemname) {
                    return true;
                }
            })
            if (found == true && myarray.length != 0 && theprice != 0) {
                myarray[_Found].price = myarray[_Found].price + theprice
            }

            //ToastAndroid.show(found,ToastAndroid.SHORT)
            //if(tempobj.description)
            if (found == false && theprice != 0) {
                //ToastAndroid.show('The value is present', ToastAndroid.SHORT)
                this.props.additemtocartthroughdispatch(tempitemobj, 1);
                console.log('The values were dispatched')
                myarray.push(tempobj)
                myarray2.push(tempobj);
            } else {
                //ToastAndroid.show('The value was present',ToastAndroid.SHORT)
            }
            let title = 'hello'
            let thesavedarray = []
            let savedarray = await AsyncStorage.getItem('adeelarray');
            savedarray != null ? JSON.parse(savedarray) : null;
            if (JSON.parse(savedarray) == null) {
                title = 'null'
                thesavedarray = [];
            } else {
                title = 'value found'
                thesavedarray = JSON.parse(savedarray);
            }
            /*Alert.alert(
                title,
                JSON.stringify(menuarray)
            )*/
            let found3 = thesavedarray.some(value => value.name == tempobj.name)
            let _Found2 = myarray.findIndex((value, index) => {
                if (value.name == theitemname) {
                    return true;
                }
            })
            if (found3 == true && myarray.length != 0 && theprice != 0) {
                thesavedarray[_Found2].price = thesavedarray[_Found].price + theprice;
                /*Alert.alert(
                    title,
                    JSON.stringify(thesavedarray[_Found2].menu)
                )*/
                menuarray.map((value) => {
                    thesavedarray[_Found2].menu.push(value);
                })
            } else {
                thesavedarray.push(tempobj);
            }
            //savedarray.push(tempobj);
            let newsavedarray = JSON.stringify(thesavedarray);
            await AsyncStorage.setItem('adeelarray', newsavedarray);
            let againsavedarray = await AsyncStorage.getItem('adeelarray');
            myarray = JSON.parse(againsavedarray);
            let idiotbranchid = 0;
            let idiotbranchname = '';
            await AsyncStorage.setItem('myidiotbranchid', JSON.stringify(this.props.navigation.state.params.item.item.branch.id));
            await AsyncStorage.setItem('myidiotbranchname', this.props.navigation.state.params.item.item.branch.name);
        }
        else {
            //console.log('Navigated from drawer')
            //ToastAndroid.show('Navigated from drawer',ToastAndroid.SHORT)
            let savedarray = await AsyncStorage.getItem('adeelarray')
            savedarray != null ? JSON.parse(savedarray) : null;
            if (JSON.parse(savedarray) == null) {
                myarray = []
            } else {
                myarray = JSON.parse(savedarray)
            }
            //Alert.alert(
            //'Check value',
            //typeof(savedarray)
            //)
        }

    }

    componentDidMount = async () => {
        //let thesubtotalingprice = 0
        //let thedeliverycharges = globaldeliverycharges
        //let thetax = globaltaxes
        //myarray.map(value => {
        //thesubtotalingprice = value.price + thesubtotalingprice
        //})
        //let thetotalprice = 0;
        //thetotalprice = parseInt(thedeliverycharges)+parseInt(thetax)+parseInt(thesubtotalingprice)
        //this.setState({ subTotal: thesubtotalingprice })
        //this.setState({ totalprice: thetotalprice })

        //majid pagal code
        await AsyncStorage.getItem("data").then(res => {

            let arr = new Array()
            if (res && this.state.order !== 1) {
                // this.setState({item:JSON.parse(res)})
                this.setState({ data: JSON.parse(res) }, () => {
                    arr = this.state.data;
                    setTimeout(async () => {
                        await AsyncStorage.setItem("data", JSON.stringify(arr))
                    }, 200)
                    console.log("res>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>", this.state.item)
                    arr.push(this.state.item);
                })

            }
            else if (res && !this.state.order) {

                this.setState({ data: JSON.parse(res) })
                arr.push(this.state.item);
                setTimeout(async () => {
                    await AsyncStorage.setItem("data", JSON.stringify(arr))
                }, 200)
            }
            else if (this.state.order == 1) {
                this.setState({ data: JSON.parse(res) })
            }
            else {
                arr.push(this.state.item);
                setTimeout(async () => {
                    // console.log("datarrrrrrrrrrrrrrrrrrrrrrrrrr", arr)
                    await AsyncStorage.setItem("data", JSON.stringify(arr))
                }, 200)
                console.log("data")
                this.setState({ data: arr })
            }
        })

        //majid pagal code

        //old code
        let dataa = await AsyncStorage.getItem('token');
        let branch = await AsyncStorage.getItem('branch_id');
        //Alert.alert(
        //'BRANCH',
        //branch
        //)
        var myHeaders = new Headers();
        myHeaders.append('Authorization', `Bearer ${dataa}`);
        var formdata = new FormData();
        formdata.append('branch_id', branch && branch !== undefined ? branch : Array.isArray(this.state.item) ? this.state.item[0].item.branch_id : this.state.item.item.branch_id);

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: formdata,
            redirect: 'follow'
        };
        await fetch('https://pizzakebab.ranglerztech.website/api/get-tax', requestOptions)
            .then(Response => Response.text())
            .then(result => {
                let dataa = JSON.parse(result);
                if (dataa.status == 200 && dataa.successData && dataa.successData.length > 0) {
                    dataa.successData.map(async item => {
                        let thesubtotalingprice = 0
                        myarray.map(value => {
                            thesubtotalingprice = value.price + thesubtotalingprice
                        })
                        let actualtax = (item.percent * thesubtotalingprice) / 100
                        this.setState({ texs: actualtax })
                        globaltaxes = actualtax
                    })
                    //Alert.alert(
                    //'Success',
                    //this.state.tex
                    //)
                } else {
                    //let actualtax = (item.percent*thesubtotalingprice)/100

                    this.setState({ texs: 0 })
                    globaltaxes = 0
                }
            }).catch(error => {
                //Alert.alert(
                //'Error',
                //error
                //)
                globaltaxes = 0
            })

        await fetch('https://pizzakebab.ranglerztech.website/api/get-delivery-charges', requestOptions)
            .then(response => response.text())
            .then(result => {
                let dataa = JSON.parse(result);
                if (dataa.status == 200) {
                    this.setState({
                        deliveryCharges: dataa.successData ? dataa.successData.charges : '0',
                        loading: false
                    })
                    //Alert.alert(
                    //'Delivery',
                    //JSON.stringify(dataa.successData.charges)
                    //)
                    globaldeliverycharges = dataa.successData.charges
                    //Alert.alert(
                    //'Error',
                    //result
                    //)
                    /*Alert.alert(
                        'Success',
                        `Taxes: ${this.state.texs} Delivery charges:${this.state.deliveryCharges} Toatal price:${this.state.totalprice}`,
                        [
                            {
                                text: 'Ask me later',
                                onPress: () => console.log('Ask me later pressed')
                            },
                            {
                                text: 'Cancel',
                                onPress: () => console.log('Cancel Pressed'),
                                style: 'cancel'
                            },
                            { text: 'OK', onPress: () => console.log('OK Pressed') }
                        ],
                        { cancelable: false }
                    );*/

                    /*this.props.navigation.navigate('Checkout', {
                        item: this.props.navigation.state.params.item,
                        comment: this.state.comment,
                        total: this.state.totalprice,
                        subTotal: this.state.totalprice + this.state.texs + this.state.deliveryCharges,
                        texs: this.state.texs,
                        deliveryCharges: this.state.deliveryCharges
                    })*/

                } else {
                    //Alert.alert(
                    //'Error',
                    //result
                    //)
                    globaldeliverycharges = 0
                }
            }).catch(error => {
                //Alert.alert(
                //'Error',
                //JSON.stringify(error)
                //)
                globaldeliverycharges = 0
            })
        //old code
        let thesubtotalingprice = 0
        let thedeliverycharges = globaldeliverycharges
        let thetax = globaltaxes
        myarray.map(value => {
            thesubtotalingprice = value.price + thesubtotalingprice
        })
        let thetotalprice = 0;
        thetotalprice = parseInt(thedeliverycharges) + (thetax) + parseInt(thesubtotalingprice)
        this.setState({ subTotal: thesubtotalingprice })
        this.setState({ totalprice: thetotalprice })

    }
    refreshprices = () => {
        if (myarray.length == 0) {
            this.setState({ deliveryCharges: 0 });
            this.setState({ texs: 0 })
            this.setState({ totalprice: 0 })
            this.setState({ subTotal: 0 })
        } else {
            let thesubtotalingprice = 0
            let thedeliverycharges = globaldeliverycharges
            let thetax = globaltaxes
            myarray.map(value => {
                thesubtotalingprice = value.price + thesubtotalingprice
            })
            let thetotalprice = 0;
            thetotalprice = parseInt(thedeliverycharges) + parseInt(thetax) + parseInt(thesubtotalingprice)
            this.setState({ subTotal: thesubtotalingprice })
            this.setState({ totalprice: thetotalprice })
        }


    }
    storeData = async (value) => {
        try {
            const jsonValue = JSON.stringify(myarray)
            await AsyncStorage.setItem('mydata', jsonValue);

        } catch (e) {
            Alert.alert(
                'Error',
                e.toString()
            )
            //ToastAndroid.show('Nope',ToastAndroid.SHORT);
        }
    }

    getData = async () => {
        try {
            const myvalue = await AsyncStorage.getItem('mydata')
            Alert.alert(
                'The stored value is',
                myvalue
            )
            //return myvalue != null ? JSON.parse(myvalue) : null;
        } catch (e) {
            // error reading value
            Alert.alert(
                'Error',
                e.toString()
            )
        }
    }


    keyExtractor = (item, index) => {
        index.toString()
    }
    renderitem = ({ item }) => {
        return (
            <ListItem
                title={item.name}
                subtitle={() => {
                    return (
                        <View>
                            <Text>PRICE: £{item.price}</Text>
                        </View>
                    )
                }}
                leftAvatar={{ source: { uri: item.image } }}
                bottomDivider
                onLongPress={() => {
                    ToastAndroid.show('Item was removed from the cart', ToastAndroid.SHORT)
                    let temparray = myarray
                    myarray = temparray.filter((value) => item.description != value.description)
                    //let itemarraystring = await AsyncStorage.getItem('data');
                    //let itemarrayjson = JSON.stringify(itemarraystring);
                    //let tempitemarrayjson = itemarrayjson;
                    //itemarrayjson = tempitemarrayjson.filter((value)=>value.item)
                    this.setState({ refersh: !this.state.refersh })
                }}
            />
        );
    }


    render() {
        let atheitem = '';
        let atheorder = '';
        //if (this.props.navigation.state.params.item) {
        //atheitem = JSON.stringify(this.props.navigation.state.params.item.item);
        //atheorder = JSON.stringify(this.props.navigation.state.params.order);
        let theitem = this.props.theitemsincart;

        if (myarray.length == 0) {
            return (
                <View style={{ flex: 1 }}>
                    <StatusBar
                        barStyle={'light-content'}
                        translucent
                        backgroundColor="transparent"
                    />
                    <View
                        style={{
                            height: responsiveHeight(15),
                            backgroundColor: '#393b82',
                            flexDirection: "row"
                        }}>
                        <View
                            style={{
                                marginTop: responsiveHeight(7.5),
                                marginHorizontal: responsiveHeight(2.8),
                            }}>
                            <TouchableOpacity
                                activeOpacity={0.7}
                                onPress={() => {
                                    this.props.navigation.openDrawer();
                                }}>
                                <Image
                                    style={{
                                        height: responsiveHeight(4),
                                        width: responsiveWidth(8),
                                    }}
                                    source={require('../../Assets/icons-Menu-1.png')}
                                />
                            </TouchableOpacity>
                        </View>
                        <View
                            style={{
                                marginHorizontal: responsiveHeight(3),
                            }}>
                            <Text
                                style={{
                                    fontSize: responsiveFontSize(3.8),
                                    color: 'white',
                                    marginTop: responsiveHeight(6.6),
                                }}>
                                Cart
                            </Text>
                        </View>

                    </View>
                    <View
                        style={{
                            flex: 1,
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}>
                        <Text
                            style={{
                                color: '#393b82',
                                fontSize: responsiveFontSize(4),
                                marginTop: responsiveHeight(5),
                            }}>
                            No item in cart.
                        </Text>
                    </View>
                </View>
            )
        }
        else {
            return (
                <View style={{ flex: 1 }}>
                    <View
                        style={{
                            height: responsiveHeight(25),
                            borderBottomLeftRadius: responsiveHeight(6.5),
                            borderBottomRightRadius: responsiveHeight(6.5),
                            backgroundColor: '#393b82',
                            zIndex: 0,
                        }}>
                        <View
                            style={{
                                marginTop: responsiveHeight(5.5),
                                marginHorizontal: responsiveHeight(2.8),
                            }}>
                            <TouchableOpacity
                                activeOpacity={0.7}
                                onPress={() => {
                                    this.props.navigation.openDrawer();
                                }}>
                                <Image
                                    style={{
                                        height: responsiveHeight(4),
                                        width: responsiveWidth(8),
                                    }}
                                    source={require('../../Assets/icons-Menu-1.png')}
                                />
                            </TouchableOpacity>
                        </View>
                        <View
                            style={{
                                marginHorizontal: responsiveHeight(3),
                            }}>
                            <Text
                                style={{
                                    fontSize: responsiveFontSize(4),
                                    color: 'white',
                                    marginTop: responsiveHeight(1),
                                }}>
                                Cart
                        </Text>
                        </View>
                    </View>
                    <ScrollView
                        style={{
                            marginTop: '-16%',
                            width: responsiveWidth(100),
                            height: responsiveHeight(100),
                        }}
                    >
                        <View
                            style={{
                                height: responsiveHeight(25),
                                width: responsiveWidth(90),
                                // top: responsiveHeight(-5),
                                alignSelf: 'center',
                                shadowColor: '#000',
                                shadowOffset: { width: 0, height: 2 },
                                shadowOpacity: 0.5,
                                shadowRadius: 2,
                                elevation: 10,
                                borderRadius: responsiveWidth(2),
                                backgroundColor: '#fff',
                                zIndex: 1,
                            }}>
                            <View>
                                <View
                                    style={{
                                        flexDirection: 'row',
                                        height: responsiveHeight(5),
                                        alignItems: 'center',
                                        marginHorizontal: responsiveHeight(3),
                                    }}>
                                    <Text style={{ fontSize: responsiveFontSize(1.5) }}>
                                        Subtotal
                      </Text>
                                    <View
                                        style={{
                                            marginLeft: responsiveHeight(3),
                                            flexDirection: 'row',
                                            right: 0,
                                            position: 'absolute',
                                        }}>
                                        <Text
                                            style={{
                                                fontSize: responsiveFontSize(1.7),
                                                color: 'rgba(0,0,0,0.3)',
                                            }}>
                                            £{this.state.subTotal}
                                        </Text>
                                    </View>
                                </View>
                                <View
                                    style={{
                                        flexDirection: 'row',
                                        height: responsiveHeight(5),
                                        alignItems: 'center',
                                        marginHorizontal: responsiveHeight(3),
                                    }}>
                                    <Text style={{ fontSize: responsiveFontSize(1.5) }}>
                                        Tax & Fees
                      </Text>
                                    <View
                                        style={{
                                            marginLeft: responsiveHeight(3),
                                            flexDirection: 'row',
                                            right: 0,
                                            position: 'absolute',
                                        }}>
                                        <Text
                                            style={{
                                                fontSize: responsiveFontSize(1.7),
                                                color: 'rgba(0,0,0,0.3)',
                                            }}>
                                            £{this.state.texs}
                                        </Text>
                                    </View>
                                </View>
                                <View
                                    style={{
                                        flexDirection: 'row',
                                        height: responsiveHeight(5),
                                        alignItems: 'center',
                                        marginHorizontal: responsiveHeight(3),
                                    }}>
                                    <Text style={{ fontSize: responsiveFontSize(1.5) }}>
                                        Delivery
                      </Text>
                                    <View
                                        style={{
                                            marginLeft: responsiveHeight(3),
                                            flexDirection: 'row',
                                            right: 0,
                                            position: 'absolute',
                                        }}>

                                        <Text
                                            style={{
                                                fontSize: responsiveFontSize(1.7),
                                                color: 'rgba(0,0,0,0.3)',
                                            }}>
                                            £{this.state.deliveryCharges}
                                        </Text>
                                    </View>
                                </View>
                                <View
                                    style={{
                                        flexDirection: 'row',
                                        height: responsiveHeight(2.5),
                                        alignItems: 'center',
                                        marginHorizontal: responsiveHeight(3),
                                        borderColor: '#0D0d0d',
                                        borderBottomWidth: 0.71,
                                    }}
                                />
                                <View
                                    style={{
                                        top: responsiveHeight(1.5),
                                        flexDirection: 'row',
                                        height: responsiveHeight(5),
                                        alignItems: 'center',
                                        marginHorizontal: responsiveHeight(3),
                                    }}>
                                    <Text
                                        style={{
                                            fontSize: responsiveFontSize(2.5),
                                            color: '#e12c2c',
                                        }}>
                                        Total
                      </Text>
                                    <View
                                        style={{
                                            marginLeft: responsiveHeight(3),
                                            flexDirection: 'row',
                                            right: 0,
                                            position: 'absolute',
                                        }}>
                                        <Text
                                            style={{
                                                fontSize: responsiveFontSize(2.5),
                                                color: '#e12c2c',
                                            }}>
                                            £{//parseInt(this.state.subTotal)+parseInt(this.state.deliveryCharges)+parseInt(this.state.texs)
                                                this.state.totalprice
                                            }
                                        </Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                        <View
                            style={{
                                width: responsiveWidth(90),
                                top: responsiveHeight(2),
                                alignSelf: 'center',
                                shadowColor: '#000',
                                shadowOffset: { width: 0, height: 2 },
                                shadowOpacity: 0.5,
                                shadowRadius: 2,
                                elevation: 10,
                                borderRadius: responsiveWidth(2),
                                //marginBottom: '20%',
                                backgroundColor: '#fff',
                            }}
                        >
                            {
                                myarray.map((value) => {
                                    return (
                                        <TouchableOpacity
                                            onLongPress={async () => {
                                                //ToastAndroid.show('Item was removed from the cart', ToastAndroid.SHORT)
                                                //let templocalsavedarray = [];
                                                //let localsavedarray = await AsyncStorage.getItem('adeelarray');
                                                //let localsavedarray2 = JSON.parse(localsavedarray);
                                                //templocalsavedarray = localsavedarray2;
                                                let temparray = myarray
                                                //localsavedarray2 = templocalsavedarray.filter((thevalue) => value.description != thevalue.description)
                                                //await AsyncStorage.setItem('adeelarray',localsavedarray2);
                                                myarray = temparray.filter((thevalue) => value.description != thevalue.description)
                                                await AsyncStorage.setItem('adeelarray', JSON.stringify(myarray));
                                                //let itemarraystring = await AsyncStorage.getItem('data');
                                                //let itemarrayjson = JSON.parse(itemarraystring);
                                                //let tempitemarrayjson = itemarrayjson;
                                                //itemarrayjson = tempitemarrayjson.filter((thevalue) => value.description !=thevalue.item.description)
                                                //await AsyncStorage.setItem('data',JSON.stringify(itemarrayjson))
                                                //.then(()=>{
                                                //this.setState({refersh:!this.state.refersh})
                                                //})
                                                //await AsyncStorage.getItem('adeelarray').then((value)=>{
                                                //Alert.alert(
                                                //'Value',
                                                //value
                                                //)
                                                //})
                                                ToastAndroid.show('Item was removed from the cart', ToastAndroid.SHORT)
                                                this.setState({ refersh: !this.state.refersh })
                                                this.refreshprices();

                                            }}
                                            style={{
                                                borderBottomColor: 'black',
                                                borderBottomWidth: 0.71,
                                                marginHorizontal: responsiveHeight(2),
                                                marginVertical: responsiveHeight(1.5),
                                                flexDirection: 'row',
                                                alignItems: 'center',
                                            }}
                                        >
                                            <Image
                                                style={{
                                                    height: responsiveHeight(8),
                                                    width: responsiveWidth(15),
                                                    resizeMode: 'cover',
                                                }}
                                                source={{ uri: value.image }}
                                            />
                                            <View style={{ marginHorizontal: responsiveHeight(2) }}>
                                                <Text>{value.name}</Text>
                                                {
                                                    value.menu.map(nextvalue => {
                                                        return (
                                                            <View style={{width:responsiveWidth(60)}}>
                                                                <Text style={{color:'grey'}} numberOfLines={1} ellipsizeMode='tail'>{nextvalue.quantity} x {nextvalue.size} {value.name}</Text>
                                                            </View>
                                                            /*<View style={{ flexDirection: "row" }}>
                                                                <Text style={{ color: 'grey' }}>{nextvalue.quantity}</Text>
                                                                <Text style={{ color: 'grey' }}> x </Text>
                                                                <Text style={{ color: 'grey' }}>{nextvalue.size}</Text>
                                                                <Text style={{ color: 'grey' }} numberOfLines={1} ellipsizeMode='tail'> {value.name}</Text>
                                                            </View>*/
                                                        )
                                                    })
                                                }
                                                <Text>£{value.price}</Text>
                                            </View>
                                        </TouchableOpacity>
                                    );
                                })
                            }
                        </View>
                        <View
                            style={{
                                height: responsiveHeight(14),
                                width: responsiveWidth(90),
                                //marginTop: '100%',
                                alignSelf: 'center',
                                shadowColor: '#000',
                                shadowOffset: { width: 0, height: 2 },
                                shadowOpacity: 0.5,
                                shadowRadius: 2,
                                elevation: 10,
                                top: responsiveHeight(4),
                                borderRadius: responsiveWidth(2),
                                backgroundColor: '#fff',
                            }}>
                            <View
                                style={{
                                    height: responsiveHeight(10),
                                    flexDirection: 'row',
                                    marginHorizontal: responsiveHeight(3),
                                    borderBottomColor: 'black',
                                    borderBottomWidth: 0.71,
                                    alignItems: 'flex-end',
                                }}>
                                <TextInput
                                    placeholder="Add your comments"
                                    value={this.state.comment}
                                    onChangeText={text => {
                                        this.setState({ comment: text });
                                    }}
                                    // style={{flex:1,backgroundColor:"red",height:50}}
                                    placeholderTextColor="rbga(0,0,0,0.3)"
                                />
                            </View>
                        </View>
                        <TouchableOpacity
                            style={{
                                marginHorizontal: responsiveHeight(3),
                                height: responsiveHeight(8),
                                backgroundColor: '#e12c2c',
                                justifyContent: 'center',
                                alignItems: 'center',
                                borderRadius: responsiveHeight(2),
                                marginTop: responsiveHeight(8),
                                marginVertical: responsiveHeight(6),
                                zIndex: 0,
                            }}
                            activeOpacity={0.7}
                            onPress={async () => {
                                // this.save();
                                //let branch = await AsyncStorage.getItem('branch_id');
                                //Alert.alert(
                                    //'BRANCH',
                                    //branch
                                //)

                                if (this.state.totalprice == 0) {
                                    ToastAndroid.show('Your cart is empty.Please place some items in cart!', ToastAndroid.SHORT)
                                } else {
                                    if (this.state.loading == true) {
                                        ToastAndroid.show('Please wait while we calculate', ToastAndroid.SHORT)
                                    } else {
                                        let orderarray = [];
                                        myarray.map((value) => {
                                            orderarray.push({
                                                menu_id: `${value.menu[0].menu_id}`,
                                                detail: value.menu,
                                                extra_id: value.extraid,
                                            })
                                        })
                                        //alert(JSON.stringify(this.state.subTotal))
                                        this.props.navigation.navigate('Checkout', {
                                            item: this.state.item,
                                            comment: this.state.comment,
                                            total: this.state.totalprice,
                                            subTotal: this.state.subTotal,
                                            texs: this.state.texs,
                                            deliveryCharges: this.state.deliveryCharges,
                                            orderarray: orderarray,
                                        });
                                    }

                                    /*Alert.alert(
                                        'Data',
                                        `comment: ${this.state.comment}, total: ${this.state.totalprice}, subtotal: ${this.state.subTotal}, taxes: ${this.state.texs},deliverycharges: ${this.state.deliveryCharges}`
                                    )*/
                                }
                                // this.review();
                            }}>
                            {this.state.loading ? (
                                <ActivityIndicator size={'small'} color="#fff" />
                            ) : (
                                    <Text
                                        style={{ fontSize: responsiveFontSize(2.5), color: 'white' }}>
                                        Checkout
                                    </Text>
                                )}
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{
                                marginHorizontal: responsiveHeight(3),
                                height: responsiveHeight(8),
                                backgroundColor: '#393b82',
                                justifyContent: 'center',
                                alignItems: 'center',
                                borderRadius: responsiveHeight(2),
                                zIndex: 0,
                                marginTop: responsiveHeight(-3),
                                marginBottom: responsiveHeight(6),
                            }}
                            activeOpacity={0.7}
                            onPress={async () => {
                                //await AsyncStorage.removeItem("data")
                                //await AsyncStorage.removeItem('adeelarray');
                                //let savedarray = await AsyncStorage.getItem('adeelarray')

                                //savedarray != null ? JSON.parse(savedarray) : null;
                                /*Alert.alert(
                                    'The value in menu',
                                    JSON.stringify(myarray)
                                    //JSON.stringify(this.props.navigation.state.params.item)
                                )*/
                                //this.props.navigation.navigate('Categories')
                                //Alert.alert(
                                //'Item',
                                //JSON.stringify(this.state.order)
                                //)
                                //let thedata = await AsyncStorage.getItem('data');
                                //Alert.alert(
                                //'Data',
                                //thedata
                                //)
                                //Alert.alert(
                                //'Menu array',
                                //JSON.stringify(this.props.navigation.state.params.item.menu)
                                //)
                                if (this.state.loading == true) {
                                    ToastAndroid.show('Please wait while we calculate', ToastAndroid.SHORT)
                                } else {
                                    let idiotbranchid = await AsyncStorage.getItem('myidiotbranchid');
                                    let idiotbranchname = await AsyncStorage.getItem('myidiotbranchname');
                                    this.props.navigation.navigate('Categories', {
                                        id: JSON.parse(idiotbranchid),
                                        name: idiotbranchname
                                    })
                                    //Alert.alert(
                                    //'i got the branch id',
                                    //JSON.stringify(idiotbranchid)
                                    //)
                                }
                            }}>
                            {this.state.loading ? (
                                <ActivityIndicator size={'small'} color="#fff" />
                            ) : (
                                    <Text
                                        style={{ fontSize: responsiveFontSize(2.5), color: 'white' }}>
                                        Continue eating
                                    </Text>
                                )}
                        </TouchableOpacity>

                    </ScrollView>


                </View>
            );
        }
    }
}

const styles = StyleSheet.create({
    maincontainer: {

    }
});


export default connect(mapStateToProps, mapDispatchToProps)(Mycart);
