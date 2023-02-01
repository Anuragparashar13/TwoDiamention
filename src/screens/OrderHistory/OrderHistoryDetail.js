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
import {buttonStyles} from '../../Helper/Navigation/TabBarController'

// export const EventButton = ({navigation}) => {
//   // const navigation = useNavigation();
//   let testButton = (
//     <TouchableOpacity>
//       <Text>Edit</Text>
//     </TouchableOpacity>
//   );
//   return testButton;
// };

export default class OrderHistoryDetail extends React.Component {


  constructor(props) {
    super(props);
    this.state = {
      dataSource: {},
    };
  }
 

  componentDidMount() {

    this.props.navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
        style={[buttonStyles.saveButton,{flexDirection:'row'}]}
        onPress={() => {this.props.navigation.navigate('AddressList', {
          isCheckout: true
        })}}>
        <Text style={{color: res.color.whilteColor, margin: 8,fontFamily:res.font.boldFont}}>
          {res.strings.reOrder}
        </Text>
      </TouchableOpacity>
      ),
    })

    var param = {
      StrQuery: `SP_MyAccount 'Get_MyOrder_Details_ByTrackId','${res.api.baseCountry}',${globalVariables.userId},'${this.props.route.params.itemId}','${this.props.route.params.XCode}','',${res.api.companyId},${globalVariables.CultureId}`,
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


  RenderPrductComponent(item) {
    return (
    <View style={{width:'100%',alignSelf:'center'}}>  
    <TouchableOpacity onPress={() => this.onPressCell(item)} >
      <View style={styles.container}>
        <Image style={styles.userImage} source={{ uri: res.api.baseUrlProductImage.concat(
                item.Image1
                )}} />
        <View style={styles.subContainer}>
          <Text style={[styles.nameTitleMyAcc,{textAlign: 'left'}]} numberOfLines={1}>{item.XName}</Text>
          <Text style={[styles.nameSubTitleMyAcc,{textAlign: 'left'}]}>{ item.NewPrice ? item.NewPrice.toFixed(3) : 0.000} {item.Currency}</Text>
        </View>
        <Text style={{fontFamily:res.font.ragularFont,marginright:20,color:res.color.darkGrayColor,alignItems:'center'}}>QTY: {item.Quantity}</Text>
      </View>
    </TouchableOpacity>
  </View>
  );
  };

  render() {
    return (
      <SafeAreaView>
        <ScrollView contentContainerStyle={styles.stage}>
          <TableView>
            <Section>
              {this.RenderPrductComponent(this.state.dataSource)}
              <ProfileShowCell item={this.state.dataSource.TrackId} title={res.strings.OrderNum} />
              <ProfileShowCell item={this.state.dataSource.OrderOn} title={res.strings.OrderOn} />
              <ProfileShowCell item={this.state.dataSource.OrderOn} title={res.strings.DeliveredOn} />
              <ProfileShowCell item={this.state.dataSource.OrderTotal + this.state.dataSource.Currency} title={res.strings.OrderTotal} />
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
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding:10,
    backgroundColor:'white'
  },
  userImage: {
    width: 50,
    height: 50,
    alignSelf: 'flex-end',
    alignContent: 'flex-end',
    marginRight: 20,
    marginLeft: 20,
    justifyContent: 'center',
  },
  subContainer: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    width: '60%',
  },
  nameTitleMyAcc: {
    fontSize: 20,
    fontWeight: '300',
    justifyContent: 'center',
    paddingBottom: 8,
    textAlign: 'left',
  },
});