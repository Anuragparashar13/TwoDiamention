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
} from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import strings from '../../res/Translation/strings';
import {ListItem,Avatar,FlatList} from 'react-native-elements'
import { Cell, Section, TableView } from 'react-native-tableview-simple';
import {MyAccountListCell} from '../TableCellComponent/AccountTablecell';


export default class MyAccount extends React.Component
{
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
      </ScrollView>
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