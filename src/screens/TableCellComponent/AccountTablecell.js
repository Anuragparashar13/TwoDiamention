import React, {Component} from 'react';
import {
  ActivityIndicator,
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  
} from 'react-native';
import { NavigationProp, NavigationActions } from '@react-navigation/native';
import strings from '../../res/Translation/strings';
import {ListItem,Avatar,FlatList} from 'react-native-elements'
import { Cell, Section, TableView } from 'react-native-tableview-simple';
import ImageAssets from '../../Helper/ImageAssets';
import res from '../../Helper/index';
import {globalVariables} from '../../Helper/Constant';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome';

export const AccountTitleCell = () => (
  <View style={[styles.container,{height:100,alignItems:'flex-end'}]}>
    <Text style={styles.mainTitle}>{res.strings.myAccount}</Text>
    {/* <TouchableOpacity>
      <Image style={styles.userImage} source={ImageAssets.cartSelected} />
    </TouchableOpacity> */}
  </View>
);

export const AccountBasicCell = ({navigation}) => (
  <TouchableOpacity onPress={() => globalVariables.userId === 0 ? navigation.navigate('Login') : navigation.navigate('MyAccount')}>
    <View style={styles.container}>
      <View style={styles.subContainer}>
        <Text style={styles.nameTitle}>{res.strings.myAccount}</Text>
        <Text style={styles.nameSubTitle}>{res.strings.logingAddressWishList}</Text>
      </View>
     
      <Icon name='angle-right' style={styles.imageDetail} size={25} color={res.color.lightGrayColor}/>
    </View>
  </TouchableOpacity>
);

export const AccountBasicMenuCell = ({item,navigation}) => (
  <TouchableOpacity onPress={() => {navigatinofromAccount(item,navigation)}}>
  <View style={styles.container}>
    <Text style={styles.menuTitle}>{item}</Text>
    <Icon name='angle-right' style={styles.imageDetail} size={25} color={res.color.lightGrayColor}/>
  </View>
  </TouchableOpacity>
);
export const AccountLanguageMenuCell = ({item, navigation}) => (
  <TouchableOpacity onPress={() => {navigatinofromAccount(item,navigation)}}>
  <View style={styles.container}>
    <Text style={styles.menuTitle}>{item}</Text>
    <Text style={styles.menuTitle}>{globalVariables.keyAppLanguageGlobal==='ar' ? res.strings.arabic : 'English'}</Text>
  </View>
  </TouchableOpacity>
);

export const AccountLogoutMenuCell = ({item, navigation}) => (
  <TouchableOpacity onPress={() => {navToLogin(item,navigation)}} >
    <View style={{backgroundColor:'white'}}>
      <Text style={styles.signOutTitle}>{res.strings.signOut}</Text>
    </View>
  </TouchableOpacity>
);

export function navToLogin (item, navigation){
  if (globalVariables.userId != 0)
    {
      globalVariables.userId = 0
      this.clearData()
      navigation.navigate('Login')
    }
}

clearData = async () => {
  try {
    const userId = await AsyncStorage.removeItem('userId');
    console.log(globalVariables.userId)
    globalVariables.userId = 0
  } catch (e) {
    alert('Failed to fetch the data from storage')
  }

 
}

export function navigatinofromAccount (item,navigation){
  const langId = globalVariables.keyAppLanguageGlobal==='ar'?2:1
  if( item===res.strings.myAccount){
    if (globalVariables.userId == 0)
    {
      navigation.navigate('Login')
    }
    else
    {
      navigation.navigate('ProfileView')
    }
    
  }
  else if(item===res.strings.myOrders){
    navigation.navigate('OrderHistoryList')
  }
  else if(item===res.strings.myAddresses){
    navigation.navigate('AddressList', {
      isCheckout: false,
    });
  }
  else if(item===res.strings.wishList){
    navigation.navigate('WishList')
  }
  else if(item===res.strings.Language)
  {
    navigation.navigate('LanguageSelection')
  }
  else if(item===res.strings.Service)
  {
    navigation.navigate('WebViewComponent', {
      url: `${res.api.baseUrl}${res.api.apiServices}/${langId}`,
      title: item,
   });
  }
  else if(item===res.strings.about)
  {
    navigation.navigate('WebViewComponent', {
      url: `${res.api.baseUrl}${res.api.apiAbout}/${langId}`,
      title: item,
   });
  }
  else if(item===res.strings.TermsAndconditions)
  {
    navigation.navigate('WebViewComponent', {
      url: `${res.api.baseUrl}${res.api.apiTermsAndCondition}/${langId}`,
      title: item,
   });
  }
  else if(item===res.strings.Contact)
  {
    navigation.navigate('WebViewComponent', {
      url: `${res.api.baseUrl}${res.api.apiContact}/${langId}`,
      title: item,
   });
  }
  else if(item===res.strings.PrivacyPolicy)
  {
    navigation.navigate('WebViewComponent', {
      url: `${res.api.baseUrl}${res.api.apiPrivacyPolicy}/${langId}`,
      title: item,
   });
  }
  else
  {
    navigation.navigate('WebViewComponent', {
         url: 'item.XCode',
         title: item,
      });
  }
  
  }

export const MyAccountListCell = ({navigation, title, subTitle, onpress}) => (
   <TouchableOpacity onPress={() => {navigatinofromAccount(title,navigation)}}> 
  {/* <TouchableOpacity onPress={() => navigation.navigate('ProfileView')}> */}
    <View style={styles.container}>
      <View style={styles.subContainer}>
        <Text style={[styles.nameTitleMyAcc,{color:res.color.blackColor}]}>{title}</Text>
        <Text style={[styles.nameSubTitleMyAcc,{color:res.color.midGrayColor}]}>{subTitle}</Text>
      </View>
      
      {/* <Image style={styles.userImage} source={ImageAssets.cartSelected} /> */}
    </View>
    <Text style={{backgroundColor:res.color.lightGrayColor, height:1, width:'100%'}}></Text>
  </TouchableOpacity>
);



//Actions
//cell Click
function onPressMyAccount({nav}){
  nav.navigate('MyAccount', {
    // itemId: item.id,
    // title: item.title.rendered,
  });
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  subContainer: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginTop: 8,
  },
  mainTitle: {
    fontSize: 30,
    fontWeight: 'bold',
    paddingStart: 20,
    justifyContent: 'center',
    fontFamily: res.font.ragularFont,
  },
  userImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignSelf: 'flex-end',
    alignContent: 'flex-end',
    marginRight: 20,
    justifyContent: 'center',
  },
  nameTitle: {
    fontSize: 30,
    fontWeight: '400',
    paddingLeft: 20,
    justifyContent: 'center',
    padding: 8,
    fontFamily: res.font.ragularFont,
  },
  nameSubTitle: {
    fontSize: 18,
    fontWeight: '300',
    paddingLeft: 20,
    justifyContent: 'center',
    paddingBottom: 8,
    fontFamily: res.font.ragularFont,
  },
  menuTitle: {
    fontSize: 20,
    fontWeight: '300',
    fontFamily:res.font.ragularFont,
    padding: 12,
    justifyContent: 'center',
  },
  imageDetail: {
    marginRight: 20,
    justifyContent: 'center',
  },
  signOutTitle: {
    fontSize: 24,
    fontWeight: '400',
    padding: 10,
    color: 'red',
    textAlign: 'center',
    justifyContent: 'center',
    fontFamily:res.font.ragularFont,
  },
  nameTitleMyAcc: {
    fontSize: 24,
    paddingLeft: 20,
    justifyContent: 'center',
    paddingBottom: 8,
    fontFamily: res.font.ragularFont,
  },

  nameSubTitleMyAcc: {
    fontSize: 18,
    fontWeight: '300',
    paddingLeft: 20,
    justifyContent: 'center',
    paddingBottom: 8,
    fontFamily:res.font.ragularFont,
    color: 'gray',
  },
});
