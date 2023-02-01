import React, {Component} from 'react';
import {View, Text, Button, StyleSheet,SectionList,FlatList,Image,StatusBar,ImageBackground,Dimensions,TouchableOpacity} from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import strings from '../../res/Translation/strings';
import {ListItem,Avatar, SearchBar} from 'react-native-elements'
import ImageAssets from '../../Helper/ImageAssets';
import res from '../../Helper/index'
import { globalVariables } from '../../Helper/Constant';

const width = Dimensions.get('window').width;
const DATA = ["red", "blue", "green", "yellow"];

export default class WishList extends React.Component{
    
    constructor(props){
        super(props);
        this.state={
            dataSource:[],
        };
    }
    componentDidMount(){
      this.getWishlist()
       
    }

    getWishlist()
  {
    var param = {
      StrQuery: `SP_MyAccount 'Get_Wishlist_App','','${globalVariables.userId}','','','KW',${res.api.companyId},${globalVariables.CultureId}`,
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
            dataSource: data.row,
          });
        }
      },
    );
  }

    RenderTableComponent = ({ item }) => {
        return (
          <View style={{flexDirection: 'column', margin: 1, width: '100%'}}>
            <TouchableOpacity onPress={() => this.onPressCell(item)}>
              <View style={styles.container}>
                <Image style={styles.userImage} source={{ uri: res.api.baseUrlProductImage.concat(
                item.Image1
                )}} />
                <View style={styles.subContainer}>
                  <Text style={styles.nameTitleMyAcc} numberOfLines={1}>{item.XName}</Text>
                  <Text style={[styles.nameSubTitleMyAcc,{fontFamily:res.font.ragularFont}]}>{item.NewPrice.toFixed(3)}</Text>
                </View>
                <TouchableOpacity style={{backgroundColor:res.color.blackColor, height:'80%',marginRight: 20,alignSelf:'center',alignItems:'center',justifyContent:'center'}} onPress={() => this.onPressCell(item)}>
                  <Text style={{color:res.color.whilteColor, fontFamily:res.font.ragularFont,margin:8}}>
                   {res.strings.ShopNow}
                  </Text>
                </TouchableOpacity>
                      
              </View>
            </TouchableOpacity>
          </View>
      );
      };

      renderItem =({item}) => {<this.RenderTableComponent item={item}/>};
      rendreBannerItem({item}){
          return <View style={{height:100, width:width, backgroundColor:item,borderColor:'black',borderWidth:2}}/>
      }
      onscroll(e){
          this.setState({progress:e.NativeEvent.contentOffset.x/((DATA.length-1)*width)})
      }

      //cell back
      onPressCell(item){
          this.props.navigation.navigate('ProductDetail', {
            itemId: item.XCode,
           // title: item.title.rendered,
         });
      }
      
      render() {
        return (
          <View style={styles.MainContainer}>
            <FlatList
              style={{height:'100%'}}
              data={this.state.dataSource}
              renderItem={this.RenderTableComponent}
              keyExtractor={(item, index) => index.toString()}
              numColumns={1}
            />
          </View>
        );
      }
}
const styles=StyleSheet.create({
    MainContainer:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        height: '100%'
    },
    imageThumbnail: {
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        height: 100,
      },
      container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
      },
      subContainer: {
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        width: '50%',
      },
      userImage: {
        width: 50,
        height: 50,
        borderRadius: 5,
        alignSelf: 'flex-end',
        alignContent: 'flex-end',
        marginRight: 20,
        marginLeft: 20,
        justifyContent: 'center',
      },
      nameTitleMyAcc: {
        fontSize: 20,
        fontWeight: '300',
        justifyContent: 'center',
        paddingBottom: 8,
        fontFamily: res.font.ragularFont,
      },
      quantityButton: {
        borderColor: 'black',
        borderWidth: 1,
        textAlign:'center',
        alignSelf: 'center',
        borderRadius: 5,
        height: '100%',
        width: 80,
      },
});