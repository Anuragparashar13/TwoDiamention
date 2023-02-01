import React, {Component,Fragment} from 'react';
import {View, Text, Button, StyleSheet,SectionList,FlatList,Image,StatusBar,ImageBackground,Dimensions,TouchableOpacity,Animated} from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import {ListItem,Avatar, SearchBar} from 'react-native-elements'
import ImageAssets from '../../Helper/ImageAssets';
import res from '../../Helper/index'
import ApiHelper from '../../Helper/ApiHelper/ApiHelper';
import Font from '../../res/Font/Font';
import { ScrollView } from 'react-native-gesture-handler';
import { globalVariables } from '../../Helper/Constant';


const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const DATA = ["red", "blue", "green", "yellow"];



export default class Categories extends Component {
  constructor(props) {
    super(props);
    this.state = {
      category:[],
      progress: Number,
      translateValue: new Animated.Value(height - 80),
    };
  }

  componentDidMount() {
   this.ApiCallProceedCheckout()
  }


  ApiCallProceedCheckout()
  {
    var param = {
      CultureId: globalVariables.CultureId,
    };
    console.log(param)
   new res.ApiHelper().serviceCallGet(
      param,
      `${res.api.baseUrlCommon}${res.api.Get_OnlineShop_Menu_List}`,
      (data, err) => {
        if (err) {
          alert(err);
        } else {
          console.log(data)
          this.setState({
            category: data.row,
            // itemList: data.row[0].CartItemsList,
          });
      }
    })
  }  

  RenderTableComponent = ({ item }) => {
    // if (item.header)
    // {
    //   return (
    //     <View>
    //     <View style={{backgroundColor:res.color.darkGrayColor,height:45,justifyContent:'center'}}>
    //       <Text style={{color:res.color.blackColor,marginLeft:20}}> fdffdfdd </Text>
    //     </View>
    //     <View style={styles.vwStyle}>
    //       <TouchableOpacity style={{width:'100%',height:'100%',alignItems:'center',justifyContent:'center'}} onPress={() => this.onPressCell(item)}>
    //       <Text style={styles.TitleStyle}> Hello </Text>  
    //      </TouchableOpacity> 
    //    </View>
    //    </View>
    // );

    // }
    console.log(item.XName)
    return (
    
      <View style={styles.vwStyle}>
        <TouchableOpacity style={{width:'100%',height:'100%',alignItems:'center',justifyContent:'center'}} onPress={() => this.moveTosubCat(item)}>
        <Text style={[styles.TitleStyle,{textAlignVertical:'center',flexShrink: 1,textAlign:'center', fontSize:16 }]}> {item.XName}  </Text>  
       </TouchableOpacity> 
    </View>
  );
  };

render_FlatList_header = ({item}) => {
 
    var header_View = (
    <View style={{backgroundColor:res.color.lightGrayColor,height:45,justifyContent:'center'}}>
      <Text style={{color:res.color.blackColor,marginLeft:20,fontFamily:res.font.ragularFont}}> {res.strings.category} </Text>
    </View>
    );
    return header_View ;
  };

  moveTosubCat(item)
  {
    this.props.navigation.navigate('ProductListIns', {
      type: 'onlineShop',
      title: item.XName,
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
      <ScrollView>
       {this.state.category.map((prop, key) => {
         return (
          <View> 
          <Text style={{fontFamily:res.font.semiBoldFont,fontSize:25,margin:20,fontFamily:res.font.ragularFont}}>{prop.XName}</Text>
          <FlatList
          
          data={prop.Sub_List}
          renderItem={this.RenderTableComponent}
          keyExtractor={(item, index) => index.toString()}
          numColumns={3}
          scrollEnabled={false}
        />
        </View>
         );
      })}
     </ScrollView>
    
        

{/* <SectionList
      sections={this.state.dataSource}
      keyExtractor={(item, index) => index.toString()}
      renderItem={this.RenderTableComponent}
      renderSectionHeader={this.render_FlatList_header}
      numColumns={3}

      // {({ section: { title } }) => (
      //   <Text style={styles.header}>{title}</Text>
      // )}
    /> */}
    

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
      fontSize: 17,
      marginLeft:5,
      marginRight:5
  },
  vwStyle:{width:'28%',margin:'2.5%',shadowColor:res.color.darkGrayColor,alignSelf:'center',backgroundColor:res.color.whilteColor,height:140,borderRadius:15,shadowOpacity:5.0,shadowOffset:{height:2}}
});
