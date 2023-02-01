/* eslint-disable no-undef */
import React from 'react';
import {View, Text, Image, StyleSheet, ImageBackground, TouchableOpacity, I18nManager} from 'react-native';
import ImageAssets from '../Helper/ImageAssets';
import RNRestart from 'react-native-restart';
import AsyncStorage from '@react-native-async-storage/async-storage';
import strings from '../res/Translation/strings';
import { changeLaguage } from '../res/Translation/strings'
import {Button} from 'react-native-elements';
import {globalVariables, asyncKeys} from '../Helper/Constant';
import res from '../Helper/index';
import UUIDGenerator from 'react-native-uuid-generator';


//https://builderx.io/login
export default class SplashScreen extends React.Component {
  saveData = async (lang) => {
    try {
      //  strings.setLanguage(lang);
      await AsyncStorage.setItem('save_language', lang)
      //  await AsyncStorage.setItem('@save_language', lang);
      // this.props.navigation.navigate('Home');
       const userLang = await AsyncStorage.getItem('save_language');
      globalVariables.keyAppLanguageGlobal = lang;
      if (userLang !== null) {
        if (globalVariables.keyAppLanguageGlobal === 'ar') {
          globalVariables.CultureId = 2
          strings.setLanguage('ar');
          I18nManager.forceRTL(true);
          
        } else {
          globalVariables.CultureId = 1
          strings.setLanguage('en');
          I18nManager.forceRTL(false);
          
        }
         RNRestart.Restart();
        
      }

      // alert('Data successfully saved')
    } catch (e) {
      alert(e)
    }
    
  }

  uuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

  

  readData = async () => {
    try {
      const userLang = await AsyncStorage.getItem('save_language');
      const userId = await AsyncStorage.getItem('userId');
      console.log(globalVariables.userId)
      await setTimeout(() => {
        if (userLang !== null) {
          globalVariables.keyAppLanguageGlobal = userLang
          globalVariables.UniqueId = this.uuid()
          console.log(this.uuid())
         
          if (userId !== null){
            globalVariables.userId = userId
          }
          if (userLang === 'ar') {
            globalVariables.CultureId = 2
            strings.setLanguage('ar');
          }
          else
          {
            globalVariables.CultureId = 1
            strings.setLanguage('en');
          }
          globalVariables.UniqueId = this.uuid()
          globalVariables.keyAppLanguageGlobal = userLang
         
          this.props.navigation.replace('Home');
        }
        else
        {
          this.props.navigation.replace('LanguageSelection');
        }
          }, 2000);
     
    } catch (e) {
      alert('Failed to fetch the data from storage')
    }

   
  }

  componentDidMount() {
    // do stuff while splash screen is shown
      // After having done stuff (such as async tasks) hide the splash screen
      // SplashScreen.hide();
      this.readData();
  }

  constructor(props)
  {
    super(props);
    
    
  }


  render() {
    
    return (
      <View>
        <ImageBackground
          source={ImageAssets.splashIcon}
          style={{width: '100%', height: '100%'}}>
            <View style={{width: '100%', height: '80%',justifyContent:'center'}}>
          
         </View>
          
     </ImageBackground>
        
      </View>
    );
  }
}




{/* <View
          // eslint-disable-next-line react-native/no-inline-styles
          style={{
            width: '100%',
            height: '100%',
            backgroundColor: 'red',
            flexDirection: 'row',
          }}>
          <Button title="Outline button" type="outline" />
          <Button title="Outline button" type="outline" />
        </View>
        <Text> Language selection</Text>
        <Button
          title="Change Lang"
          onPress={() => {
            strings.setLanguage('ar');
          }}
        /> */}

var styles = StyleSheet.create({
  buttonLanguag: {
    borderBottomColor: 'black',
    borderWidth: 1,
    width: '46%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover', // or 'stretch'
  },
  loginForm: {
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0
  },
});