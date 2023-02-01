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
  View,
  SafeAreaView,
  KeyboardAvoidingView,
  TouchableOpacity
} from 'react-native';
import { Cell, Section, TableView } from 'react-native-tableview-simple';
import {LoginEditCell} from '../TableCellComponent/ProfileCells';
import res from '../../Helper/index';
import DeviceInfo from 'react-native-device-info';
import ApiHelper from '../../Helper/ApiHelper/ApiHelper';
import {BackButton} from '../../Helper/Navigation/TabBarController';
import { globalVariables } from '../../Helper/Constant';

export default class Login extends React.Component
{
  constructor(props) {
    super(props);
    this.state = {
      email: '',
    };
  }


  ApiCallForgotPass()
  {
    var param = {
      Email: this.state.email,
    };
   new ApiHelper().serviceCallGet(
      param,
      `${res.api.baseUrlCommon}${res.api.ForgotPassword}`,
      (data, err) => {
        if (err) {
          alert(err);
        } else {
          console.log(data)
          alert(data.Message)
      }
    })
  }

  render() {
    return (
      <SafeAreaView style={{marginTop:Platform.OS === 'android' ? 40:0}}>
        <BackButton isWhite = {false} nav = {this.props.navigation} />
        <ScrollView contentContainerStyle={styles.stage}>
          <KeyboardAvoidingView>
            <Text style={{fontFamily:res.strings.boldFont, fontWeight:'bold', fontSize:24,marginLeft:'5%',marginTop:20,marginStart:20,marginEnd:20,textAlign:'left'}}> {res.strings.forgotPassword} </Text>  
            <Text style={{fontFamily:res.strings.ragularFont, color:res.color.midGrayColor,marginLeft:'5%',marginTop:8,marginStart:20,marginEnd:20,textAlign:'left'}}> {res.strings.EnterTheEmailAddressAssosiatedWithYourAccount} </Text>  
            <TableView>
              <Section>
                <LoginEditCell
                  name={res.strings.email}
                  type="text"
                  value={this.state.email}
                  onChange={(text) => {
                    this.setState({
                        email: text.text,
                    });
                  }}
                />
              </Section>
            </TableView>
            <TouchableOpacity style={styles.blackButtonViewCart} onPress={()=>{this.ApiCallForgotPass()}}>
              <Text style={{color:res.color.whilteColor,fontFamily:res.font.semiBoldFont,fontSize:20}}> {res.strings.Submit} </Text>
            </TouchableOpacity>
          </KeyboardAvoidingView>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  stage: {
    backgroundColor: '#EFEFF4',
    paddingTop: 20,
    paddingBottom: 20,
  },
  blackButtonViewCart: {margin:'5%',width:'80%',alignItems:'center',backgroundColor:res.color.blackColor,height:40,alignSelf:'center',justifyContent:'center',borderRadius:10},
});
