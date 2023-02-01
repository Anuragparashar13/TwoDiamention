import * as React from 'react';
import { Button, Text, View, Image, TouchableOpacity,StyleSheet } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator, HeaderBackground } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import res from '../../Helper/index';
import ImageAssets from '../ImageAssets';
import HomeScreen from '../../screens/Home'
import AccountList from '../../screens/MyAccounts/AccountList'
import ProductList from '../../screens/ProductList';
import MyAccount from '../../screens/MyAccounts/MyAccount';
import ProfileView from '../../screens/MyAccounts/ProfileView';
import ProfileEdit from '../../screens/MyAccounts/ProfileEdit';
import ProjectList from '../../screens/ProjectPage/ProjectList';
import NewsAndEventList from '../../screens/NewsAndEvent/NewsAndEventList';
import NewsAndEventDetail from '../../screens/NewsAndEvent/NewsAndEventDetail';

import CartList from '../../screens/Cart/CartList';
import Filter from '../../screens/FilterScreens/Filter';
import Explore from '../../screens/Explore/Explore';
import SubCategories from '../../screens/Explore/SubCategories';
import Categories from '../../screens/Explore/Categories'
import ScrollableModal from '../../screens/FilterScreens/Filter';

import InspritationList from '../../screens/Inspriation/InspritationList'
import OrderHistoryList from "../../screens/OrderHistory/OrderHistoryList";
import Login from '../../screens/Login/Login';
import WishList from '../../screens/Wishlist/WishList';
import SignUp from '../../screens/Login/SignUp'
import ForgotPassword from '../../screens/Login/ForgotPassword'
import LanguageSelection from '../../screens/LanguageSelection';
import AddressView from '../../screens/Address/AddressView'
import InspritionCateList from '../../screens/Inspriation/InspritionCateList';
import OrderHistoryDetail from '../../screens/OrderHistory/OrderHistoryDetail'
import ProductListIns from '../../screens/Inspriation/ProductListIns'
import { globalVariables } from '../../Helper/';

const HomeStack = createStackNavigator();

function HomeStackScreen() {
  return (
    <HomeStack.Navigator
     screenOptions={{
        headerBackImage: () => <BackImage xisWhite = {false} />,
        headerBackTitleVisible: false,
        gestureEnabled: false,
      
      }}
      initialRouteName={HomeScreen}>
      <HomeStack.Screen name="Home" component={HomeScreen} options={{ headerShown: false,  gestureEnabled: false, }}  />
      <HomeStack.Screen name="ProductList" component={ProductList} options={{ headerShown: true, headerStyle: {
      backgroundColor: 'black'
    },
    headerTintColor: 'white',
    headerBackImage: () => <BackImage isWhite = {true}/>
     }}  />
      <HomeStack.Screen name="Filter" component={Filter} options={{ headerShown: true }}  />
      <HomeStack.Screen name="ProjectList" component={ProjectList} options={{ headerShown: true, title:res.strings.projectList, headerStyle: {
      backgroundColor: 'black'
    },
    headerTintColor: 'white',
    headerBackImage: () => <BackImage isWhite = {true}/>
     }}  />
     <HomeStack.Screen name="NewsAndEventList" component={NewsAndEventList} options={{ headerShown: true, title: res.strings.newsAndEvent, headerStyle: {
      backgroundColor: 'black'
    },
    headerTintColor: 'white',
    headerBackImage: () => <BackImage isWhite = {true}/>
     }}  />
     <HomeStack.Screen name="NewsAndEventDetail" component={NewsAndEventDetail} options={{ headerShown: false}}  />
     <ExploreStack.Screen name="Categories" component={Categories}  options={{ headerShown: true, title: res.strings.onlineShop, headerStyle: {
      backgroundColor: 'black'
    },
    headerTintColor: 'white',
    headerBackImage: () => <BackImage isWhite = {true}/>
     }} />
     {/* <HomeStack.Screen name="ScrollableModal" component={ScrollableModal} options={{ headerShown: false, stackPresentation: 'modal' }}/> */}
    </HomeStack.Navigator>
  );
}

const ExploreStack = createStackNavigator();

function ExploreStackScreen() {
  const navigation = useNavigation();
  return (
    <ExploreStack.Navigator
    initialRouteName={Explore}
     screenOptions={{
        headerBackImage: () => <BackImage />,
        headerBackTitleVisible: false,
        headerLeft: () => <BackButton nav={navigation}/>,
        gesturesEnabled: false,
      }}>
        
      <ExploreStack.Screen name="Explore" component={Explore} options={{ headerShown: false }} />
      <ExploreStack.Screen name="SubCategories" component={SubCategories}  />
      <ExploreStack.Screen name="ScrollableModal" component={ScrollableModal} />
      <ExploreStack.Screen name="InspritationList" component={InspritationList} />
      <ExploreStack.Screen name="InspritionCateList" component={InspritionCateList} />
      <ExploreStack.Screen name="ProductListIns" component={ProductListIns} />
      
    </ExploreStack.Navigator>
  );
}
const CartStack = createStackNavigator();

function CartStackScreen() {
  return (
    <CartStack.Navigator
    initialRouteName={CartList}
     screenOptions={{
        headerBackImage: () => <BackImage isWhite = {true} />,
        headerBackTitleVisible: false,
        title: res.strings.cart,
        gesturesEnabled: false,
      }}>
      <CartStack.Screen name="Cart" component={CartList} options={{ headerShown: false }}  />
    </CartStack.Navigator>
  );
}
const AccountStack = createStackNavigator();

function AccountStackScreen() {
   const navigation = useNavigation();
  return (
    <AccountStack.Navigator
    initialRouteName={AccountList}
      screenOptions={{
        headerBackImage: () => <BackImage  />,
        headerBackTitleVisible: false,
        gesturesEnabled: false,
      }}>
      <AccountStack.Screen name="Account" component={AccountList} options={{ headerShown: false }} />
      <AccountStack.Screen name="MyAccount" component={MyAccount} options={{ headerShown: true, title: res.strings.myAccount}}  />
      <AccountStack.Screen name="WishList" component={WishList} options={{ headerShown: true, title: res.strings.wishList }}  />
      <AccountStack.Screen name="OrderHistoryList" component={OrderHistoryList} options={{ headerShown: true, title: res.strings.myOrders }}  />
     
      <AccountStack.Screen
        name="ProfileView"
        component={ProfileView}
        options={{
          headerShown: true,
          title: res.strings.loginAndSecurity,
          headerRight: () => (
            <TouchableOpacity style={{marginRight:20}} onPress={() => navigation.navigate('ProfileEdit')}>
              <Text style={{fontFamily:res.font.boldFont,color:res.color.blueColor}}>{res.strings.Edit}</Text>
            </TouchableOpacity>
          ),
        }}
        // headerRight: <EventButton />
      />
      <AccountStack.Screen
        name="ProfileEdit"
        component={ProfileEdit}
        options={{
          headerShown: true,
          title: res.strings.loginAndSecurity,
          headerRight: () => (
            <TouchableOpacity
              style={buttonStyles.saveButton}
              onPress={() => {ProfileEdit.ApiCallSave()}}>
              <Text style={{color: res.color.whilteColor, margin: 8,fontFamily:res.font.ragularFont}}>
                {res.strings.Save}
              </Text>
            </TouchableOpacity>
          ),
        }}
      />
     

      <AccountStack.Screen
        name="OrderHistoryDetail"
        component={OrderHistoryDetail}
        options={{
          title: res.strings.orderHistory,
          headerShown: true,
          headerRight: () => (
            <TouchableOpacity style={{marginRight:20}} onPress={() => navigation.navigate('AddressAdd')}>
            <Text style={{fontFamily:res.font.ragularFont}}>{res.strings.Edit}</Text>
          </TouchableOpacity>
          ),
        }}
      />




    </AccountStack.Navigator>
  );
}

const Tab = createBottomTabNavigator();

export default function TabBarControl() {
  return  (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, size}) => {
          let iconName;

          if (route.name === res.strings.Home) {
            iconName = focused
              ? ImageAssets.homeSelected
              : ImageAssets.homeUnSelected;
          } else if (route.name === res.strings.explore) {
            iconName = focused
              ? ImageAssets.exploreSelected
              : ImageAssets.exploreUnSelected;
          } else if (route.name === res.strings.cart) {
            iconName = focused
              ? ImageAssets.cartSelected
              : ImageAssets.cartUnSelected;
          } else if (route.name === res.strings.account) {
            iconName = focused
              ? ImageAssets.accountSelected
              : ImageAssets.accountUnSelected;
          }

        // You can return any component that you like here!
          return <Image source={iconName}  />;
      },
      
      
    })}
    options={{  gestureEnabled: false }}
      tabBarOptions={{
        activeTintColor: 'black',
        inactiveTintColor: 'gray',
      }}>
      <Tab.Screen name={res.strings.Home} component={HomeStackScreen}  options={{unmountOnBlur: true}}
        listeners={({navigation}) => ({
          blur: () => navigation.setParams({screen: undefined}),
        })} />
      <Tab.Screen name={res.strings.explore} component={ExploreStackScreen}  options={{unmountOnBlur: true}}
        listeners={({navigation}) => ({
          
          blur: () => navigation.setParams({screen: undefined}),
        })} />
      <Tab.Screen name={res.strings.cart} component={CartStackScreen}  options={{unmountOnBlur: true}}
        listeners={({navigation}) => ({
          blur: () => navigation.setParams({screen: undefined}),
        })} />
      <Tab.Screen name={res.strings.account} component={AccountStackScreen}  options={{unmountOnBlur: true}}
        listeners={({navigation}) => ({
          blur: () => navigation.setParams({screen: undefined}),
        })} />
    </Tab.Navigator>
  );
}


  

export const BackImage = ({isWhite}) => (

  <Image style={{margin:10}} source={ isWhite ? res.ImageAssets.backButtonWhite : res.ImageAssets.backButton} />
);

export const BackButton = ({isWhite, nav}) => (
  <TouchableOpacity onPress = {()=>{nav.goBack()}}>
      <Image style={{margin:10}} source={ isWhite ? res.ImageAssets.backButtonWhite : res.ImageAssets.backButton} />
  </TouchableOpacity>
);






 

export const buttonStyles = StyleSheet.create({
  saveButton: {
    marginRight: 20,
    backgroundColor: res.color.blackColor,
    borderRadius: 20,
    width: 80,
    alignItems: 'center',
    justifyContent: 'center'
  },
})