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
  Picker,
  View,
  Alert,
} from 'react-native';
import { NavigationProp, NavigationActions } from '@react-navigation/native';
import strings from '../../res/Translation/strings';
import {ListItem,Avatar,FlatList, colors} from 'react-native-elements'
import { Cell, Section, TableView } from 'react-native-tableview-simple';
import ImageAssets from '../../Helper/ImageAssets';
import res from '../../Helper/index';
 import RNPickerSelect from 'react-native-picker-select';
import { Value } from 'react-native-reanimated';
import { globalVariables } from '../../Helper/Constant';
// import {Picker} from '@react-native-community/picker';



export const ProfileShowCell = ({item, title}) => (
  <View style={styles.container}>
    <Text style={[styles.profileLabel,{textAlign: 'left'}]}>{title}</Text>
    <Text style={[styles.profileDataLabel,{textAlign: 'left'}]}>{item}</Text>
  </View>
);

export const ProfileEditCell = ({value, name, type, onChange}) => (
  <View style={styles.container}>
    <TextInput
      style={[styles.textinputStyle,{width:'90%',textAlign: globalVariables.keyAppLanguageGlobal==='ar'?'right':'left'}]}
      value={value}
      placeholder={name}
      maxLength={name === strings.mobileno ? 8 : null}
      keyboardType={name === strings.mobileno ? 'phone-pad' : name === strings.firstName ? 'name-phone-pad' : name === strings.lastName ? 'name-phone-pad' : 'default'}
      secureTextEntry={name === strings.password ? true : name === strings.confirmPassword ? true : false}
      onChangeText={(text) => name === strings.mobileno ? text === '1' ? '' : text === '2' ? '' : text === '3' ? '' : text === '4' ? '' : text === '0' ? '' : onChange({name, type, text})
      : onChange({name, type, text})}
    />
  </View>
);

export const PromoCodeCell = ({value, name, type, onChange}) => (
  <View style={styles.container}>
    <TextInput
      style={styles.textinputStyle}
      value={value}
      placeholder={name}
      placeholderTextColor={res.color.blueColor}
      secureTextEntry={name === strings.password ? true : false}
      onChangeText={(text) => onChange({name, type, text})}
    />
  </View>
);

export const LoginEditCell = ({value, name, type, onChange}) => (
  <View style={[styles.container,{flexDirection:'row',height:40}]}>
    <Text style={{fontFamily:res.font.ragularFont,marginLeft:'5%'}}>{name}</Text>
    <TextInput
      style={styles.textinputStyleLogin}
      value={value}
      placeholder={name}
      secureTextEntry={name === strings.password ? true : false}
      onChangeText={(text) => onChange({text})}
    />
  </View>
);



const sports = [
  {
    label: 'Football',
    value: 'football',
  },
  {
    label: 'Baseball',
    value: 'baseball',
  },
  {
    label: 'Hockey',
    value: 'hockey',
  },
];

export const ProfilePickerEditCell = ({value, name, type, onChange}) => (
  <View style={styles.container}>
     <RNPickerSelect
            placeholder='asdadadadaadadsa'
            items={sports}
            onValueChange={value => {
              // this.setState({
              //   favSport3: value,
              // });
              alert(value)
            }}
            style={{
              inputAndroid: {
                backgroundColor: 'transparent',
              },
              iconContainer: {
                top: 5,
                right: 15,
              },
            }}
            value={value}
            useNativeAndroidPickerStyle={false}
            textInputProps={{ underlineColorAndroid: 'cyan' }}
            // Icon={() => {
            //   return <Chevron size={1.5} color="gray" />;
            // }}
          />
  </View>
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
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'white',
    padding:8
  },
  profileLabel: {
    fontSize: 20,
    padding: 8,
    width: '40%',
    justifyContent: 'center',
    fontFamily:res.font.ragularFont,
  },
  profileDataLabel: {
    fontSize: 20,
    padding: 8,
    width: '60%',
    color: 'gray',
    justifyContent: 'center',
    fontFamily:res.font.ragularFont,
  },
  profileInput: {
    fontSize: 20,
    padding: 8,
    width: '60%',
    color: 'gray',
    justifyContent: 'center',
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
    paddingTop: 8,
  },
  nameSubTitle: {
    fontSize: 18,
    fontWeight: '300',
    paddingLeft: 20,
    justifyContent: 'center',
    paddingBottom: 8,
  },
  menuTitle: {
    fontSize: 20,
    fontWeight: '300',
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
  },
  nameTitleMyAcc: {
    fontSize: 24,
    fontWeight: '300',
    paddingLeft: 20,
    justifyContent: 'center',
    paddingBottom: 8,
  },

  nameSubTitleMyAcc: {
    fontSize: 18,
    fontWeight: '300',
    paddingLeft: 20,
    justifyContent: 'center',
    paddingBottom: 8,
    color: 'gray',
  },
  textinputStyle: {
    paddingLeft: 20,
    color: res.color.blueColor,
    paddingRight:20,
    alignSelf:'stretch',
    fontFamily: res.font.ragularFont,
  },
  textinputStyleLogin: {
    paddingLeft: 20,
    color: res.color.blueColor,
    paddingRight:20,
    alignSelf:'stretch',
    width:'70%',
    height: Platform.OS==='ios'? '100%' : 30,
    fontFamily: res.font.ragularFont,
    paddingTop:0,
    paddingBottom:0,
    paddingRight:20,
    textAlign: globalVariables.keyAppLanguageGlobal==='ar' ? 'right' :'left'
  },
  pickerStyle:{  
    height: 150,  
    width: "80%",  
    color: '#344953',  
    justifyContent: 'center',  
},  
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: 'purple',
    borderRadius: 8,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
});
