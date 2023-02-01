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

export default class AddressView extends React.Component {


  constructor(props) {
    super(props);
    this.state = {
      dataSource: {},
    };
  }

  navToEditAddress()
  {
    this.props.navigation.navigate('AddressAdd',{
      itemId: this.state.dataSource.ShippingAddressId,
     // title: item.title.rendered,
   })
  }
 

  componentDidMount() {
   const title = this.props.route.params.title ? this.props.route.params.title : res.strings.myAddress
    this.props.navigation.setOptions({
      title: title,
      headerRight: () => (
        <TouchableOpacity style={{marginRight:20}} onPress={() => {this.navToEditAddress()}}>
        <Text style={{fontFamily:res.font.boldFont,color:res.color.blueColor}}>{res.strings.Edit}</Text>
      </TouchableOpacity>
      ),
    })
   
    var param = {
      StrQuery: `SP_MyAccount 'Get_UserShippingAddressBy_Id_Apps','${globalVariables.userId}','${this.props.route.params.itemId}','','','',${res.api.companyId},1`,
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
          <TableView>
            <Section>
              <ProfileShowCell item={this.state.dataSource.CountryName} title={res.strings.country} />
              <ProfileShowCell item={this.state.dataSource.CityName} title={res.strings.city} />
              <ProfileShowCell item={this.state.dataSource.Area} title={res.strings.area} />
              <ProfileShowCell item={this.state.dataSource.Block} title={res.strings.Block} />
              <ProfileShowCell item={this.state.dataSource.HouseNo} title={res.strings.BuildingNum} />
              <ProfileShowCell item={this.state.dataSource.Avenue} title={res.strings.Avenue1} />
              <ProfileShowCell item={this.state.dataSource.FlatNo} title={res.strings.flatNum} />
              <ProfileShowCell item={this.state.dataSource.Note} title={res.strings.note} />
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