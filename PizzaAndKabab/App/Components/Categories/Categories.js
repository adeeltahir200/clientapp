import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  //SafeAreaView,
  StatusBar,
  TextInput,
  Image,
  ImageBackground,
} from 'react-native';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import { blue, colorWhite, lightBlack } from '../../../GlobalCons/colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CategoriesFlatList from './CategoriesFlatList';
import { SafeAreaView } from 'react-navigation';
import AsyncStorage from '@react-native-community/async-storage';
import { ActivityIndicator } from 'react-native-paper';
import { NavigationEvents } from 'react-navigation';
import NetInfo from '@react-native-community/netinfo'
import {Icon} from 'react-native-elements';

export default class Categories extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      data: [],
      searchdata: [],
      item: this.props.navigation.state.params.id.id,
      name: this.props.navigation.state.params.id.name,
      searchtext: ''
    };
  }
  onFocusFunction = async () => {
    this.setState({ loading: true })
    // do some stuff on every screen focus
    let data = await AsyncStorage.getItem('token');
    let id = await AsyncStorage.getItem("r_id")
    let name = await AsyncStorage.getItem("r_name")
    console.log("data3323", data, id);
    this.setState({ item: id, name: name })
    var myHeaders = new Headers();
    myHeaders.append('Authorization', `Bearer ${data}`);

    var formdata = new FormData();
    formdata.append('branch_id', this.state.item == JSON.parse(id) ? this.state.item : id);
    var requestOptions = {
      method: 'POST',
      body: formdata,
      headers: myHeaders,
      redirect: 'follow',
    };

    fetch(
      `https://pizzakebab.ranglerztech.website/api/get-categories`,
      requestOptions,
    )
      .then(response => response.text())
      .then(result => {
        let dataa = JSON.parse(result);
        if (dataa.successData) {
          console.log('Menu', dataa.successData);
          this.setState({ data: dataa.successData, searchdata: dataa.successData, loading: false });
        } else {
          this.setState({ loading: false });
          alert(dataa.message);
        }
      })
      .catch(error => {
        this.setState({ loading: false });
        alert('Error:Please connect to internet.', error)
      });
  }
  componentDidMount = async () => {
    NetInfo.addEventListener(state => {
      if (!state.isConnected) {
        alert('Error:Please connect to internet.')
      }
    });
    const { params } = this.props.navigation.state;
    console.log("params.id", params.id);
    this._navListener = this.props.navigation.addListener('willFocus', async () => {

      if (Platform.OS === 'ios') {
        StatusBar.setBarStyle('light-content');
      } else {
        StatusBar.setBarStyle('light-content');
        StatusBar.setBackgroundColor('transparent');
      }

    });
    this.onFocusFunction()
  };
  printCards = post => {
    const { params } = this.props.navigation.state;
    let item = post.item;
    let index = post.index;
    return (
      <TouchableOpacity
        onPress={() => {
          this.props.navigation.navigate('CategoryItems', {
            id: item.id,
            branch_id: this.state.item,
            branch_name: this.state.name,
          });
        }}
        activeOpacity={0.7}
        style={Styles.MainCard}>
        <NavigationEvents onWillFocus={() => this.onFocusFunction()} />
        <ImageBackground
          source={{ uri: item.image }}
          borderRadius={15}
          resizeMode="stretch"
          style={{ width: '100%', height: '100%' }}>
          <View style={Styles.overlay}>
            <View
              style={{
                flex: 1,
                justifyContent: 'flex-end',
                alignItems: 'center',
                marginBottom: responsiveHeight(2),
              }}>
              <Text
                style={{
                  fontSize: responsiveFontSize(3),
                  color: 'rgba(255,255,255,0.7)',
                  fontWeight: 'bold',
                }}>
                {item.name}
              </Text>
            </View>
          </View>
        </ImageBackground>
      </TouchableOpacity>
    );
  };
  searchcategory(texttosearch) {
    let newdata = this.state.data.filter((value) => {
      let dataname = value.name.toUpperCase();
      let typedtext = texttosearch.toUpperCase();
      return (dataname == typedtext)
    })
    //alert(JSON.stringify(newdata))
    this.setState({ data: newdata })
    //alert(texttosearch)
    /*this.setState({
      searchdata:this.state.data.filter((i)=>
        i.name.toUpperCase().include(texttosearch.toUpperCase())
      )
    });*/
  }
  SearchFilterFunction(text) {
    //passing the inserted text in textinput
    const newData = this.state.data.filter(function(item) {
      //applying filter for the inserted text in search bar
      const itemData = item.name ? item.name.toUpperCase() : ''.toUpperCase();
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });
    this.setState({
      //setting the filtered newData on datasource
      //After setting the data it will automatically re-render the view
      searchdata: newData,
      searchtext: text,
    });
  }
  render() {
    if (Platform.OS === 'ios') {
      // StatusBar.setBarStyle('dark-content');
      return (
        <>
          <View style={{ backgroundColor: blue, height: 1 }}>
            <StatusBar
              barStyle={'light-content'}
              translucent
              backgroundColor={blue}
            />
          </View>
          {this.state.loading ? (
            <View
              style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <ActivityIndicator color="#303f88" size={'large'} />
            </View>
          ) : (
              <SafeAreaView style={Styles.container}>
                <View
                  style={{
                    height: responsiveHeight(22),
                    width: '100%',
                    backgroundColor: blue,
                    paddingTop: 10,
                  }}>
                  <View style={Styles.topHeader}>
                    <TouchableOpacity
                      style={{
                        width: 35,
                        height: 35,
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginBottom: -5,
                        // backgroundColor:"red"
                      }}
                      onPress={() => {
                        this.props.navigation.openDrawer();
                      }}>
                      <Image
                        style={{
                          height: responsiveHeight(4),
                          width: responsiveWidth(6),
                        }}
                        source={require('../../Assets/icons-Menu-1.png')}
                      />
                    </TouchableOpacity>
                    <Text style={Styles.HeaderText}>{'Filter'}</Text>
                  </View>
                  <View style={Styles.SearchHeader}>
                    <View style={Styles.SearchView}>
                      <View style={Styles.Left}>
                        <Ionicons
                          color={'#D5D5D5'}
                          size={responsiveFontSize(3)}
                          name={'ios-search'}
                        />
                      </View>
                      <View style={Styles.Right}>
                        <TextInput
                          placeholder={'Search...'}
                          placeholderTextColor={'#D5D5D5'}
                          style={Styles.Textinput}
                        />
                      </View>
                    </View>
                  </View>
                </View>
                <FlatList
                  data={this.state.data}
                  keyExtractor={item => item.id}
                  contentContainerStyle={Styles.contentContainerStyle}
                  ItemSeparatorComponent={() => <View style={Styles.Seprator} />}
                  renderItem={item => this.printCards(item)}
                />
              </SafeAreaView>
            )}
        </>
      );
    } else if (Platform.OS === 'android') {
      return (
        <>

          <View style={{ backgroundColor: blue, height: 1 }}>
            <StatusBar
              barStyle={'light-content'}
              translucent
              backgroundColor={blue}
            />
          </View>
          <SafeAreaView style={Styles.container}>
            <View
              style={{
                height: responsiveHeight(22),
                width: '100%',
                backgroundColor: blue,
                paddingTop: 10,
              }}>
              <View style={Styles.topHeader}>
                <TouchableOpacity
                  style={{
                    width: 35,
                    height: 35,
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginBottom: -5,
                    // backgroundColor:"red"
                  }}
                  onPress={() => {
                    this.props.navigation.openDrawer();
                  }}>
                  <Image
                    style={{
                      height: responsiveHeight(4),
                      width: responsiveWidth(6),
                    }}
                    source={require('../../Assets/icons-Menu-1.png')}
                  />
                </TouchableOpacity>
                {/*<Text style={Styles.HeaderText}>{'Filter'}</Text>*/}
              </View>
              <View style={Styles.SearchHeader}>
                <View style={Styles.SearchView}>
                  <View style={Styles.Left}>
                    <Icon
                      color={'#D5D5D5'}
                      size={responsiveFontSize(3)}
                      name={'search'}
                      type='font-awesome'
                    />
                  </View>
                  <View style={Styles.Right}>
                    <TextInput
                      placeholder={'Search...'}
                      placeholderTextColor={'#D5D5D5'}
                      style={Styles.Textinput}
                      /*onSubmitEditing={() => {
                        //console.log('Starts here'+text.toString()+'Ends here')
                        alert(this.state.searchtext)
                        let newdata = this.state.data.filter((value) => {
                          let dataname = value.name.toUpperCase();
                          let typedtext = this.state.searchtext.toUpperCase();
                          return (dataname == typedtext)
                        })
                        //alert(JSON.stringify(newdata))
                        this.setState({ data: newdata })
                      }}*/
                      onChangeText={(text) => {
                        //this.setState({ searchtext: text })
                        this.SearchFilterFunction(text);
                        //alert(this.state.data[0].name);
                      }}
                    />
                  </View>
                </View>
              </View>
            </View>
            {this.state.loading ? (
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <NavigationEvents onWillFocus={() => this.onFocusFunction()} />
                <ActivityIndicator color="#303f88" size={'large'} />
              </View>
            ) : this.state.data.length > 0 ? (
              <FlatList
                data={this.state.searchdata}
                keyExtractor={item => item.id}
                contentContainerStyle={Styles.contentContainerStyle}
                ItemSeparatorComponent={() => <View style={Styles.Seprator} />}
                renderItem={item => this.printCards(item)}
              />
            ) : (
                  <View
                    style={{
                      flex: 1,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Text
                      style={{
                        color: blue,
                        fontWeight: 'bold',
                        fontSize: responsiveFontSize(3),
                        letterSpacing: 1,
                        textAlign: 'center',
                      }}>
                      {'No Categories Found'}
                    </Text>
                  </View>
                )}
          </SafeAreaView>
        </>
      );
    }
  }
}
const Styles = StyleSheet.create({
  contentContainerStyle: {
    paddingVertical: responsiveHeight(2),
  },
  Seprator: {
    marginTop: responsiveHeight(3),
  },
  MainCard: {
    height: responsiveHeight(23),
    borderRadius: 15,
    width: '90%',
    alignSelf: 'center',
    backgroundColor: colorWhite,
    elevation: 5,
  },
  overlay: {
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderRadius: 15,
  },
  container: {
    flex: 1,
    backgroundColor: colorWhite,
  },
  Header: {
    height: responsiveHeight(20),
    width: '100%',
    backgroundColor: blue,
  },
  topHeader: {
    height: responsiveHeight(10),
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingHorizontal: responsiveWidth(4),
  },
  HeaderText: {
    color: colorWhite,
    fontSize: responsiveFontSize(2),
    marginBottom: responsiveWidth(1),
  },
  SearchHeader: {
    height: responsiveHeight(10),
    width: '100%',
    justifyContent: 'center',
  },
  SearchView: {
    width: '91%',
    alignSelf: 'center',
    height: responsiveHeight(6),
    backgroundColor: colorWhite,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  Left: {
    width: '14%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  Right: {
    width: '86%',
    justifyContent: 'center',
  },
  Textinput: {
    padding: 0,
    margin: 0,
    fontSize: responsiveFontSize(2),
  },
});
