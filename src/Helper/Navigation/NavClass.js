import * as React from 'react';
import { Button, Text, View, Image, TouchableOpacity } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator, HeaderBackground } from '@react-navigation/stack';
import HomeScreen from '../../screens/Home'
import LanguageSelection from '../../screens/LanguageSelection'
import TabBarControl, {buttonStyles,BackImage,BackButton} from './TabBarController'
import ScrollableModal from '../../screens/FilterScreens/Filter';
import Checkout from '../../screens/Checkoutpage/Checkout';
import res from '../index';
import ProjectDetail from '../../screens/ProjectPage/ProjectDetail';
import WebViewComponent from '../../screens/Wishlist/WebViewComponent';
import Login from '../../screens/Login/Login';
import SignUp from '../../screens/Login/SignUp';
import SearchList from '../../screens/FilterScreens/SearchList';
import ProductDetail from '../../screens/Products/ProductDetail';
import AppLoader, { loaderRef } from '../ApiHelper/AppLoader';
import SplashScreen from '../../screens/SplashScreen'
import AddressList from '../../screens/Address/AddressList';
import AddressAdd from '../../screens/Address/AddressAdd';
import AddressView from '../../screens/Address/AddressView';
import FullImage from '../../screens/Products/FullImage'

import ForgotPassword from '../../screens/Login/ForgotPassword'
const Stack = createStackNavigator();

export default function NavClass() {
  // const navigation = useNavigation();
  return(
    
    <Stack.Navigator
    screenOptions={{
      headerBackImage: () => <BackImage />,
      headerBackTitleVisible: false,
      gesturesEnabled: false,
    }} >
      
      <Stack.Screen name="SplashScreen" component={SplashScreen} options={{ headerShown: false}} />
      <Stack.Screen name="LanguageSelection" component={LanguageSelection} options={{ headerShown: false }} />
      <Stack.Screen name="Home" component={TabBarControl} options={{ headerShown: false, stackPresentation: 'modal', gestureEnabled: false }}/>
      <Stack.Screen name="Checkout" component={Checkout} 
        options={{
          title: res.strings.Checkout ,
          headerShown: true,
          headerBackImage: () => <BackImage isWhite = {false} />,
          headerBackTitleVisible: false,
          headerRight: () => (
            <TouchableOpacity
              style={buttonStyles.saveButton}
              onPress={() => navigation.navigate('AddressAdd')}>
              <Text style={{color: res.color.whilteColor, margin: 8, fontFamily:res.font.ragularFont}}>
                {res.strings.proceed}
              </Text>
            </TouchableOpacity>
          ),
        }}/>
      <Stack.Screen name="ScrollableModal" component={ScrollableModal} options={{ headerShown: false, stackPresentation: 'modal' }}/>
      <Stack.Screen name="ProjectDetail" component={ProjectDetail} options={{ headerShown: false, stackPresentation: 'modal', title: res.strings.projectDetail }}/>
      <Stack.Screen name="WebViewComponent" component={WebViewComponent} options={{ headerShown: true, stackPresentation: 'modal' }}/>
      <Stack.Screen name="Login" component={Login} options={{ headerShown: false}}  />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} options={{ headerShown: false}}  />
      <Stack.Screen name="SignUp" component={SignUp} options={{ headerShown: true, title: res.strings.register, headerStyle: {
      backgroundColor: 'black'
    },
    headerTintColor: 'white',
    headerBackImage: () => <BackImage isWhite = {true}/>,
    headerBackTitleVisible: false,
     }}  />
      <Stack.Screen name="SearchList" component={SearchList} options={{ headerShown: true, title: res.strings.searchProduct, headerStyle: {
      backgroundColor: 'black'
    },
   
    headerTintColor: 'white',
    headerBackImage: () => <BackImage isWhite = {true}/>,
    headerBackTitleVisible: false,
   
     }}  />
     <Stack.Screen
        name="AddressList"
        component={AddressList}
        options={{
          headerShown: true,
          title: res.strings.AllAddresses,
          headerRight: () => (
            <TouchableOpacity
              style={buttonStyles.saveButton}
              onPress={() => navigation.navigate('AddressAdd')}>
              <Text style={{color: res.color.whilteColor, margin: 8,fontFamily:res.font.ragularFont}}>
                {res.strings.Save}
              </Text>
            </TouchableOpacity>
          ),
        }}
      />
       <Stack.Screen
        name="AddressAdd"
        component={AddressAdd}
        options={{
          title: res.strings.AddressAdd,
          headerShown: true,
          headerRight: () => (
            <TouchableOpacity
              style={buttonStyles.saveButton}
              onPress={() => navigation.navigate('AddressAdd')}>
              <Text style={{color: res.color.whilteColor, margin: 8,fontFamily:res.font.ragularFont}}>
                {res.strings.Save}
              </Text>
            </TouchableOpacity>
          ),
        }}
      />

      <Stack.Screen
        name="AddressView"
        component={AddressView}
        options={{
          title: res.strings.myAddresses,
          headerShown: true,
          headerRight: () => (
            <TouchableOpacity style={{marginRight:20}} onPress={() => navigation.navigate('AddressAdd')}>
            <Text style={{fontFamily:res.font.ragularFont,color:res.color.blueColor}}>{res.strings.Edit}</Text>
          </TouchableOpacity>
          ),
        }}
      />
     <Stack.Screen name="ProductDetail" component={ProductDetail} options={{ headerShown: false}}  />
     <Stack.Screen name="FullImage" component={FullImage} options={{ headerShown: false}}  />
    </Stack.Navigator>

    

  );
}

