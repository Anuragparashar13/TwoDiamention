import React, {Component,Fragment} from 'react';
import {View, Text, Button, StyleSheet,SectionList,FlatList,Image,StatusBar,ImageBackground,Dimensions,TouchableOpacity,Animated} from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import {ListItem,Avatar, SearchBar} from 'react-native-elements'
import ImageAssets from '../../Helper/ImageAssets';
import res from '../../Helper/index'
import ApiHelper from '../../Helper/ApiHelper/ApiHelper';
import Font from '../../res/Font/Font';


const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const DATA = ["red", "blue", "green", "yellow"];



export default class SubCategories extends Component {
  constructor(props) {
    super(props);
    this.props.navigation.setOptions({
      title: this.props.route.params.title
    })
    this.state = {
     subCate:  this.props.route.params.subCate
    };

  }

  componentDidMount() {

  }

  RenderTableComponent = ({ item }) => {
    return (
    
      <View style={styles.vwStyle}>
        <TouchableOpacity style={{width:'100%',height:'100%',alignItems:'center',justifyContent:'center'}} onPress={() => this.moveTosubCat(item)}>
        <Text style={styles.TitleStyle}> {item.XName} </Text>  
       </TouchableOpacity> 
    </View>
  );
  };

  moveTosubCat(item)
  {
    
    this.props.navigation.navigate('ProductListIns', {
      type: 'onlineShop',
      catID: item.XLink,
      subCatID: item.XCode,
      url: `${res.api.baseUrlCommon}${res.api.Get_Online_shop_products}`,
      filterUrl: `${res.api.baseUrlCommon}${res.api.Get_Online_shop_products_Filter_List}`,
      filteredProduct: `${res.api.baseUrlCommon}${res.api.Get_Online_shop_products_Filterwise}`
    });
  }




  render() {
    return (
      

    <View style={styles.MainContainer}>
    
        <FlatList
          data={this.state.subCate}
          renderItem={this.RenderTableComponent}
          keyExtractor={(item, index) => index.toString()}
          numColumns={3}
        />

      </View>
    
    )
};

};

const styles = StyleSheet.create({
  MainContainer: {
    justifyContent: 'center',
    flex: 1,
    paddingTop: 0,
  },
  TitleStyle: {
      fontFamily: res.font.semiBoldFont,
      fontSize: 20,
  },
  vwStyle:{width:'28%',margin:'2.5%',shadowColor:res.color.darkGrayColor,alignSelf:'center',backgroundColor:res.color.whilteColor,height:140,borderRadius:15,shadowOpacity:10.0,}
});
