//https://www.npmjs.com/package/@react-native-community/segmented-control

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
import RNPickerSelect from 'react-native-picker-select';
import {buttonStyles, BackButton} from '../../Helper/Navigation/TabBarController'
import DeviceInfo from 'react-native-device-info';
import { globalVariables } from '../../Helper/Constant';
export default class AddressAdd extends React.Component
{
  constructor(props) {
    super(props);
    this.state = {
      Area: '',
      BlockNum: '',
      StreetNum: '',
      BuildingNum: '',
      Avenue: '',
      country: res.strings.country,
      city: res.strings.city,
      floor: '',
      writeANote: '',
      selectedCountryKey:'',
      selectedCityKey:'',
      arrCountry: [],
      arrCity: [],
    };

    this.props.navigation.setOptions({
      headerLeft: () => <BackButton nav={this.props.navigation} isWhite={false}/>,
      title: res.strings.addressAdd,
      headerRight: () => (
        <TouchableOpacity
        style={buttonStyles.saveButton}
        onPress={() => {this.ApiCallSave()}}>
        <Text style={{color: res.color.whilteColor, margin: 8,fontFamily:res.font.boldFont}}>
          {res.strings.Save}
        </Text>
      </TouchableOpacity>
      ),
    })

  }

  componentDidMount() {
   this.getCountry()
   if (this.props.route.params && this.props.route.params.itemId)
   {
     this.getAddressData()
   }
   
  }

  getAddressData()
  {
    var param = {
      StrQuery: `SP_MyAccount 'Get_UserShippingAddressBy_Id_Apps','${globalVariables.userId}','${this.props.route.params.itemId}','','','',${res.api.companyId},${globalVariables.CultureId}`,
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
            country: data.row[0].CountryName,
            city: data.row[0].CityName,
            Area: data.row[0].Area,
            BlockNum: data.row[0].Block,
            StreetNum: data.row[0].StreetName,
            BuildingNum: data.row[0].HouseNo,
            Avenue: data.row[0].Avenue,
            floor: data.row[0].FlatNo,
            writeANote: data.row[0].Note,
          });
          console.log(this.state.country)
        }
      },
    );
  } 

  ApiCallSave()
  {
    console.log(this.props.route.params)
    if(this.state.BlockNum === ''){
      alert(res.strings.emptySBlock)
    }else if(this.state.streetName === ''){ 
      alert(res.strings.emptystreetName)
    }else if(this.state.BuildingNum ===''){
      alert(res.strings.emptyAddress)
    }else if(this.state.selectedCityKey === ''){
      alert(res.strings.emptyCity)
    }else if(this.state.selectedCountryKey === ''){
      alert(res.strings.emptyCountry)
    }else{
            var param = {
              UserId: globalVariables.userId,
              ShippingAddressId: this.props.route.params ? this.props.route.params.itemId : 0,
              SBlock: this.state.BlockNum,
              SJaddah: this.state.Area,
              SStreetName: this.state.StreetNum,
              SHouseNo: this.state.BuildingNum,
              SAddress: this.state.Avenue,
              SCountry: this.state.selectedCountryKey,
              SCity: this.state.selectedCityKey,
              SPostCode: this.state.floor,
              Note: this.state.writeANote,
              IpAddress: DeviceInfo.getUniqueId(),
              Command : this.props.route.params && this.props.route.params.itemId ? 'UPDATE' : 'SAVE'
            };
          new res.ApiHelper().serviceCallGet(
              param,
              `${res.api.baseUrlCommon}${res.api.Save_ShippingAddress}`,
              (data, err) => {
                if (err) {
                  alert(err);
                } else {
                  console.log(data)
                  if (globalVariables.isCheckout == true)
                  {
                    this.props.navigation.navigate('Checkout',{
                      addId: data.Attribute1,
                    })
                  }
                  else
                  {
                    alert(data.Message)
                  this.props.navigation.navigate('AddressList')
                  }
              }
            })
       }
  }

  getCountry()
  {
    var param = {
      StrQuery: `SP_MyAccount 'COUNTRY','','','','','',${res.api.companyId},${globalVariables.CultureId}`,
    };
    console.log(param)
    new res.ApiHelper().serviceCallGet(
      param,
      `${res.api.urlForSp}`,
      (data, err) => {
        if (err) {
          alert(err);
        } else {
          console.log(data)
          this.setState({
            arrCountry: data.row,
          });
        }
      },
    );
  }

  getCity(countryID)
  {
    var param = {
      StrQuery: `SP_MyAccount 'CITY','${countryID}','','','','',${res.api.companyId},${globalVariables.CultureId}`,
    };
    console.log(param)
    new res.ApiHelper().serviceCallGet(
      param,
      `${res.api.urlForSp}`,
      (data, err) => {
        if (err) {
          alert(err);
        } else {
          console.log(data)
          this.setState({
            arrCity: data.row,
          });
        }
      },
    );
  }


  pickerViewCountry = () =>
  {
    const ItemArr = this.state.arrCountry.map(({XCode, XName, ShippingAddressId}) => {
      return {
        label: XName === null ? '' : XName,
        value: XName === null ? '' : XName,
        key: XCode === null ? '1' : XCode
      }
    });

    return(
    
    <RNPickerSelect
    placeholder={{label:this.state.country,inputLabel:this.state.country}}
    items={ItemArr}
    inputLabel={this.state.country}
    doneText={res.strings.doneText}
    onValueChange= {(value,index) => {
      if (index > 0)
      {
        this.setState({
          country: value,
          selectedCountryKey: ItemArr[index-1].key,
        });
        if(Platform.OS === 'android')
        {
         { this.getCity(ItemArr[index-1].key) }
        }
      
      }
      
    }}

    value={this.state.country}
    useNativeAndroidPickerStyle={false}    
    onDonePress={()=>{this.getCity(this.state.selectedCountryKey)}}
    
    style={pickerStyle}

    // style={{color:res.color.blueColor,fontFamily:res.font.semiBoldFont,width:'100%',height:'100%'}}
  />
  
  );
  }

  pickerViewCity = () =>
  {
    
    const ItemArr = this.state.arrCity.map(({XCode, XName}) => {
      return {
        label: XName === null ? '' : XName,
        value: XName === null ? '' : XName,
        key: XCode === null ? '1' : XCode
      }
    });
   
    return(    
    <RNPickerSelect
    placeholder={{label:this.state.city,inputLabel:this.state.city}}
    items={ItemArr.length > 0 ? ItemArr : []}
    inputLabel={this.state.city}
    doneText={res.strings.doneText}
    onValueChange={(value,index) => {
      if (index > 0)
      {
      this.setState({
        city: value,
        selectedCityKey: ItemArr[index-1].key,
      });
    }
      
    }}
    useNativeAndroidPickerStyle={false}
    value={this.state.city}
    style={pickerStyle}
    // style={{color:res.color.blueColor,fontFamily:res.font.semiBoldFont,width:'100%',height:'100%'}}
  />
  
  );
  
  }

  render() {
    return (
      <SafeAreaView>
        <ScrollView contentContainerStyle={styles.stage}>
          <KeyboardAvoidingView>
            <TableView>
              <Section>
              <View style={styles.container}>
                <View style={{paddingLeft: 20,width:'100%'}}>
                {this.pickerViewCountry()}
               </View> 
              </View> 
              <View style={styles.container}>
                <View style={{paddingLeft: 20,width:'100%'}}>
                {this.pickerViewCity()}
               </View> 
              </View>   
               
                <ProfileEditCell
                  name={strings.area}
                  type="text"
                  value={this.state.Area}
                  onChange={(text) => {
                    this.setState({
                      Area: text.text,
                    });
                  }}
                />
                <ProfileEditCell
                  name={strings.blockNumber}
                  type="text"
                  value={this.state.BlockNum}
                  onChange={(text) => {
                    this.setState({
                      BlockNum: text.text,
                    });
                  }}
                />
                <ProfileEditCell
                  name={strings.streetName}
                  type="text"
                  value={this.state.StreetNum}
                  onChange={(text) => {
                    this.setState({
                      StreetNum: text.text,
                    });
                  }}
                />
                <ProfileEditCell
                  name={strings.BuildingNumber}
                  type="text"
                  value={this.state.BuildingNum}
                  onChange={(text) => {
                    this.setState({
                      BuildingNum: text.text,
                    });
                  }}
                />
                 <ProfileEditCell
                  name={strings.Avenue}
                  type="text"
                  value={this.state.Avenue}
                  onChange={(text) => {
                    this.setState({
                      Avenue: text.text,
                    });
                  }}
                />
                 <ProfileEditCell
                  name={strings.FloorAndFlat}
                  type="text"
                  value={this.state.floor}
                  onChange={(text) => {
                    this.setState({
                      floor: text.text,
                    });
                  }}
                />
                 <ProfileEditCell
                  name={strings.writeANote}
                  type="text"
                  value={this.state.writeANote}
                  onChange={(text) => {
                    this.setState({
                      writeANote: text.text,
                    });
                  }}
                />
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
  textinputStyle: {
    paddingLeft: 20,
    color: res.color.blueColor,
    width: '80%',
    alignSelf: 'flex-end'
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    height: 40,
    width: '100%',
    alignItems:'center',
    
  },
});

const pickerStyle = {
  underline: { borderTopWidth: 0 },
  placeholder: {
    color: res.color.blueColor,
  },
  inputIOS: {
    color: res.color.blueColor,
    paddingLeft:10,
    paddingRight:10,
    alignSelf: 'flex-start',   //globalVariables.CultureId === 2 ? 'flex-start' : 'flex-end',
    font: res.font.ragularFont,
    color:res.color.blueColor
    },
  inputAndroid: {
    color: res.color.blueColor,
    font: res.font.ragularFont,
    alignSelf: 'flex-start', 
    paddingLeft:10,
    paddingRight:10,
    },
  icon: {
  position: 'absolute',
  backgroundColor: 'transparent',
  borderTopWidth: 5,
  borderTopColor: '#99',
  borderRightWidth: 5,
  borderRightColor: 'transparent',
  borderLeftWidth: 5,
  borderLeftColor: 'transparent',
  width: 0,
  height: 0,
  top: 20,
  right: 15,
  },
  };