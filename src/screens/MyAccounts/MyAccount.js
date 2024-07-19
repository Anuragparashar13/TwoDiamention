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
  Alert,
  TouchableOpacity
} from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import strings from '../../res/Translation/strings';
import {ListItem,Avatar,FlatList} from 'react-native-elements'
import { Cell, Section, TableView } from 'react-native-tableview-simple';
import {MyAccountListCell} from '../TableCellComponent/AccountTablecell';
import res from '../../Helper/index'
import {AccountTitleCell, AccountBasicCell, AccountBasicMenuCell, AccountDeleteMenuCell, AccountLanguageMenuCell} from '../TableCellComponent/AccountTablecell';
import { globalVariables } from '../../Helper/Constant';
import ApiHelper from '../../Helper/ApiHelper/ApiHelper'
import Toast from 'react-native-simple-toast';
export default class MyAccount extends React.Component{


showAlert(){
  Alert.alert(
    `${res.strings.deleteAccount}`,
    `${res.strings.deleteAccountMessage}`,
    [
      {text: 'OK', onPress: () => {this.deleteAccount()}},
      {text: 'Cancel', onPress: () => {}},
    ],
    {cancelable: false},
  )
}

deleteAccount()
  {
    var param = {
      userId: globalVariables.userId,
    };
    console.log('========',param);
    new ApiHelper().serviceCallGet(
      param,
      `${res.api.baseUrlCommon}${res.api.DeleteUser}`,
      (data, err) => {
        console.log('========',data,err);
        if (err) {
          alert(err);
        } else {
          Toast.show(data.Message)
          if (data.ResponseCode === '2'){
            this.props.navigation.naigate('Login')
          }
          console.log(data)
          
      }
    })
  }
  

  render() {
    return (
      <ScrollView contentContainerStyle={styles.stage}>
        <TableView>
          <MyAccountListCell
            title={strings.myAccount}
            navigation={this.props.navigation}
            subTitle={strings.personalDetailEmailPassword}
          />
          <MyAccountListCell
            title={strings.myOrders}
            navigation={this.props.navigation}
            subTitle={strings.orderHistoryAndSummery}
          />
          <MyAccountListCell
            title={strings.myAddresses}
            navigation={this.props.navigation}
            subTitle={strings.shippingBilling}
          />
          <MyAccountListCell title={strings.wishList} navigation={this.props.navigation} subTitle="" />
        </TableView>
        <AccountDeleteMenuCell item={res.strings.deleteAccount} onpress={()=>{this.showAlert()}} />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  stage: {
    backgroundColor: '#EFEFF4',
    paddingTop: 20,
    paddingBottom: 20,
    justifyContent:'space-between',
    height:'100%'
  },
});