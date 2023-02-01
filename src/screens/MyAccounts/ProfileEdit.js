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
import strings from '../../res/Translation/strings';
import { Cell, Section, TableView } from 'react-native-tableview-simple';
import {ProfileEditCell, ProfilePickerEditCell} from '../TableCellComponent/ProfileCells';
import res from '../../Helper/index';
import { globalVariables } from '../../Helper/Constant';
import {buttonStyles} from '../../Helper/Navigation/TabBarController'

export default class ProfileEdit extends React.Component
{

  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      mobile: '',
      password: '',
      country: '',
    };
    this.props.navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
        style={buttonStyles.saveButton}
        onPress={() => {this.ApiCallSave()}}>
        <Text style={{color: res.color.whilteColor, margin: 8,fontFamily:res.font.boldFont,fontSize:14}}>
          {res.strings.Save}
        </Text>
      </TouchableOpacity>
      ),
    })
  }

  validateName = (text) => {
    console.log(text);
    let reg = /^[0-9\b]+$/;
    if (reg.test(text) === true) {
      console.log("Email is Not Correct");
      
      // alert(res.strings.inValidEmail)
      return false;
    }
    else {
      return true;
    }
  }

  componentDidMount() {
   
    var param = {
      StrQuery: `SP_MyAccount 'Get_UserDetails','',${globalVariables.userId},'','','',${res.api.companyId},${globalVariables.CultureId}`,
    };

    new res.ApiHelper().serviceCallGet(
      param,
      `${res.api.urlForSp}`,
      (data, err) => {
        if (err) {
          alert(err);
        } else {
          console.log(data)
          this.setState({
            firstName: data.row[0].FirstName,
            lastName: data.row[0].LastName,
            email: data.row[0].Email,
            mobile: data.row[0].MobileNo,
            password: data.row[0].Password,
            country: data.row[0].CountryName,
          });
        }
      },
    );
  }

  ApiCallSave()
  {
    if(this.state.firstName === '')
    {
      alert( res.strings.emptyFirstName)
    }else if (!this.validateName(this.state.firstName.trim())){
      alert(res.strings.invalidFirstname)
    }else if(this.state.lastName === ''){
      alert( res.strings.emptyLastName)
    }else if (!this.validateName(this.state.lastName.trim())){
      alert(res.strings.invalidLastname)
    }else if(this.state.mobile === ''){
      alert( res.strings.emptyMobile)
    }else if(this.state.mobile.length < 8){
      alert(res.strings.invalidMobile)
    }else if(this.state.password === ''){
      alert( res.strings.emptyPassword)
    }else if(this.state.password.length < 6){
      alert( res.strings.invalidPassword)
    }else{
    var param = {
      UserId: globalVariables.userId,
      FirstName: this.state.firstName,
      LastName: this.state.lastName,
      Mobile: this.state.mobile,
      Password: this.state.password,
    };
   new res.ApiHelper().serviceCallGet(
      param,
      `${res.api.baseUrlCommon}${res.api.UpdateUserDetails}`,
      (data, err) => {
        if (err) {
          alert(err);
        } else {
          console.log(data)
          
           alert(data.Message)
      }
    })
  }
  }

  


  render() {
    return (
      <SafeAreaView>
        <ScrollView contentContainerStyle={styles.stage}>
          <KeyboardAvoidingView>
          <Text style={{color:res.color.midGrayColor,fontFamily:res.font.ragularFont,marginLeft:20,marginRight:20,textAlign: 'left'}}>{res.strings.personalDetails}</Text>
            <TableView>
              <Section>
                <ProfileEditCell
                  name={strings.firstName}
                  type="text"
                  value={this.state.firstName}
                  onChange={(text) => {
                    this.setState({
                      firstName: text.text,
                    });
                  }}
                />
                <ProfileEditCell
                  name={strings.lastName}
                  type="text"
                  value={this.state.lastName}
                  onChange={(text) => {
                    this.setState({
                      lastName: text.text,
                    });
                  }}
                />
                <ProfileEditCell
                  name={strings.email}
                  type="text"
                  value={this.state.email}
                  onChange={(text) => {
                    this.setState({
                      email: text.text,
                    });
                  }}
                />
                <ProfileEditCell
                  name={strings.country}
                  type="text"
                  value={this.state.country}
                  onChange={(text) => {
                    this.setState({
                      country: text.text,
                    });
                  }}
                />
                <ProfileEditCell
                  name={strings.mobileno}
                  type="text"
                  value={this.state.mobile}
                  onChange={(text) => {
                    this.setState({
                      mobile: text.text,
                    });
                  }}
                />
                <ProfileEditCell
                  name={strings.password}
                  type="text"
                  value={this.state.password}
                  onChange={(text) => {
                    this.setState({
                      password: text.text,
                    });
                  }}
                />
               
                {/* <ProfilePickerEditCell 
                  name={strings.country}
                  type="text"
                  value={this.state.country}
                  onChange={(text) => {
                    this.setState({
                      country: text,
                    });
                  }}/> */}
              </Section>
            </TableView>
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
});
