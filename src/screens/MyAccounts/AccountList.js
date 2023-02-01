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
import res from '../../Helper/index'
import {AccountTitleCell, AccountBasicCell, AccountBasicMenuCell, AccountLogoutMenuCell, AccountLanguageMenuCell} from '../TableCellComponent/AccountTablecell';
import { globalVariables } from '../../Helper/Constant';

export default class AccountList extends React.Component
{

  componentDidMount() {
    this.focusListener = this.props.navigation.addListener('focus', () => {
     this.forceUpdate()
     this.onScreenFocus
     globalVariables.isCheckout=false
  });
    
  }

  render() {
    return (
      <ScrollView contentContainerStyle={styles.stage}>
        <TableView>
          <Section>
            <AccountTitleCell />
          </Section>
          <Section>
            <AccountBasicCell navigation={this.props.navigation} />
          </Section>
          <Section>
            <AccountLanguageMenuCell item={res.strings.Language} navigation={this.props.navigation} />
            <AccountBasicMenuCell item={res.strings.Service} navigation={this.props.navigation} />
            <AccountBasicMenuCell item={res.strings.About} navigation={this.props.navigation} />
            <AccountBasicMenuCell item={res.strings.TermsAndconditions} navigation={this.props.navigation} />
            <AccountBasicMenuCell item={res.strings.Contact} navigation={this.props.navigation}/>
            <AccountBasicMenuCell item={res.strings.PrivacyPolicy} navigation={this.props.navigation}/>
          </Section>
          {globalVariables.userId != 0 ?
          <Section>
            <AccountLogoutMenuCell item={res.strings.signOut} navigation={this.props.navigation} />
          </Section>
          : null }
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