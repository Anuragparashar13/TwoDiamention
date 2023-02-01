import React, {Component, useState, useLayoutEffect} from 'react';
import {
  ActivityIndicator,
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  Button,
  View,
  TouchableOpacity,
  TouchableHighlight,
  SafeAreaView,
} from 'react-native';
import { NavigationProp,NavigationContainer, useNavigation } from '@react-navigation/native';
import strings from '../../res/Translation/strings';
import {ListItem,Avatar,FlatList} from 'react-native-elements'
import { Cell, Section, TableView } from 'react-native-tableview-simple';
import {ProfileShowCell} from '../TableCellComponent/ProfileCells';
import { globalVariables } from '../../Helper/Constant';
import ApiHelper from '../../Helper/ApiHelper/ApiHelper'
import res from '../../Helper/index'

// export const EventButton = ({navigation}) => {
//   // const navigation = useNavigation();
//   let testButton = (
//     <TouchableOpacity>
//       <Text>Edit</Text>
//     </TouchableOpacity>
//   );
//   return testButton;
// };

export default class ProfileView extends React.Component {


  constructor(props) {
    super(props);
    this.state = {
      dataSource: {},
    };
  }
 

  componentDidMount() {

    this.focusListener = this.props.navigation.addListener('focus', () => {
     
      this.apiGetProfile()
      //Put your Data loading function here instead of my this.LoadData()
  });

   
  }


  apiGetProfile(){
    var param = {
      StrQuery: `SP_MyAccount 'Get_UserDetails','',${globalVariables.userId},'','','',${res.api.companyId},${globalVariables.CultureId}`,
    };
    console.log(param)
    new ApiHelper().serviceCallGet(
      param,
      `${res.api.urlForSp}`,
      (data, err) => {
        if (err) {
          alert(err);
        } else {
          console.log(data)
          this.setState({
            dataSource: data.row[0],
          });
        }
      },
    );
  }

  render() {
    return (
      <SafeAreaView>
        <ScrollView contentContainerStyle={styles.stage}>
        <Text style={{color:res.color.midGrayColor,fontFamily:res.font.ragularFont,marginLeft:20,marginRight:20,textAlign: 'left'}}>{res.strings.personalDetails}</Text>
          <TableView>
            <Section>
            <ProfileShowCell item={this.state.dataSource.FirstName}   title={res.strings.firstName} />
              <ProfileShowCell item={this.state.dataSource.LastName} title={res.strings.lastName} />
              <ProfileShowCell item={this.state.dataSource.Email} title={res.strings.email} />
              <ProfileShowCell item={this.state.dataSource.CountryName} title={res.strings.country} />
              <ProfileShowCell item={this.state.dataSource.MobileNo} title={res.strings.mobileno} />
              <ProfileShowCell item={this.state.dataSource.Password} title={res.strings.password} />
            </Section>
          </TableView>
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