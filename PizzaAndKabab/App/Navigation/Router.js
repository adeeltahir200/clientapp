import React from 'react';
import { View, Image, StyleSheet, Dimensions } from 'react-native';
import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import {
  createDrawerNavigator,
  DrawerNavigatorItems,
} from 'react-navigation-drawer';
import {
  createBottomTabNavigator,
  createMaterialTopTabNavigator,
} from 'react-navigation-tabs';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import LinearGradient from 'react-native-linear-gradient';
//Custom Drawer
import CustomDrawer from '../Navigation/CustomDrawer';
//AuthLoadingScreen
import AuthLoadingScreen from '../Components/AuthLoading/AuthLoadingScreen';
import AuthLoadingScreen2 from '../Components/AuthLoading/AuthLoadingScreen2';
//Login
import Login from '../Components/Login/Login';
import SignUp from '../Components/SignUp/SignUp';
import CategoryDetail from '../Components/CategoryDetails/CategoryDetail';
//Home
import Home from '../Components/Home/Home';
import Categories from '../Components/Categories/Categories';
import CategoryItems from '../Components/CategoryItems/CategoryItems';
import FavouriteDeals from '../Components/Deals/FavouriteDeals';
import Menu from '../Components/Menu/Menu';
import OrderHistory from '../Components/Orders/OrderHistory';
import Adeelorderhistory from '../Components/Orders/Adeelorderhistory';
import TrackOrder from '../Components/Orders/TrackOrder';
import Profile from '../Components/Profile/Profile';
import EditProfile from '../Components/Profile/EditProfile';
import ChangePassword from '../Components/Profile/ChangePassword';
import { responsiveWidth } from 'react-native-responsive-dimensions';
import Cart from '../Components/Cart/Cart';
import Checkout from '../Components/Checkout/Checkout';
import Topup from '../Components/TopUp/Topup';
import DeliveryAddress from '../Components/DeliveryAddress/DeliveryAddress';
import Resturents from '../Components/Resturents/Resturents';
import FavoriteDeal from '../Components/CategoryDetails/FavoriteDeal';
import Payment from '../Components/Payment/Payment';


console.disableYellowBox = true;
import Mycart from '../Components/Mycart/Mycart';
var width = Dimensions.get('window').width / 1.2;

const AuthLoadingStack = createStackNavigator(
  {
    
    AuthLoading2:AuthLoadingScreen2,
    AuthLoading1:AuthLoadingScreen,
  },
  {
    defaultNavigationOptions: {
      headerShown: false,
      headerStyle: { backgroundColor: '#212121', },
      headerMode: 'none'
    },
  },
  {
    // initialRouteName: 'AuthLoading2',
  },
);
const AuthStack = createStackNavigator(
  {
    Login: Login,
    SignUp: SignUp,
  },
  {
    defaultNavigationOptions: {
      headerShown: false,
      headerStyle: { backgroundColor: '#212121', },
      headerMode: 'none'
    },
  },
  {
    initialRouteName: 'Login',
  },
);

const MainStack = createStackNavigator(
  {
    // Home: Home,
    Categories: Categories,
    CategoryItems: CategoryItems,
    FavouriteDeals: FavouriteDeals,
    FavoriteDeal:FavoriteDeal,
    Menu: Menu,
    OrderHistory: OrderHistory,
    Profile: Profile,
    TrackOrder: TrackOrder,
    ChangePassword: ChangePassword,
    EditProfile: EditProfile,
    Cart: Mycart,
    Checkout: Checkout,
    CategoryDetail: CategoryDetail,
    Topup: Topup,
    DeliveryAddress: DeliveryAddress,
    Resturents:Resturents,
    Payment:Payment
  },
  {
    initialRouteName: 'Resturents',
    defaultNavigationOptions: {
      headerShown: false,
      headerStyle: { backgroundColor: '#212121', },
      headerMode: 'none',
      safeAreaInsets: { top: 0 },
      gesturesEnabled: false
    },
  },
);
const AppDrawerNavigator = createDrawerNavigator(
  {
    Home: {
      screen: Resturents,
      /*navigationOptions: ({ navigation }) => ({
        drawerLockMode: 'locked-closed',
      })*/
    },
    MainStack: MainStack,
  },
  {
    contentComponent: props => <CustomDrawer {...props} />,
    drawerWidth: responsiveWidth(75),
    drawerType: 'back',
    drawerBackgroundColor:"#fff",
    overlayColor: 'rgba(0,0,0, 0.5)',
  },
);

// MainStack.navigationOptions = ({ navigation }) => {
//   let drawerLockMode = 'locked-closed';

//   //logic here to change conditionaly, if needed
//   return {
//     drawerLockMode,
//  };
// };
export default createAppContainer(
  createSwitchNavigator(
    {
      AuthLoadingStack: AuthLoadingStack,
      App: AppDrawerNavigator,
      Auth: AuthStack,
    },
    {
      initialRouteName: 'AuthLoadingStack',
      // navigationOptions: { headerStyle: { backgroundColor: '#212121', } },
      // headerMode: 'none'
    },
  ),
);

const styles = StyleSheet.create({});
