import React, {Component,Fragment} from 'react';
import {View, Text, Button, StyleSheet,SectionList,FlatList,Image,StatusBar,ImageBackground,Dimensions,TouchableOpacity,Animated} from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import {ListItem,Avatar, SearchBar} from 'react-native-elements'
import ImageAssets from '../../Helper/ImageAssets';
import res from '../../Helper/index'
import ApiHelper from '../../Helper/ApiHelper/ApiHelper';
import Font from '../../res/Font/Font';
import {globalVariables} from '../../Helper/Constant'

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const DATA = ["red", "blue", "green", "yellow"];



export default class NewsAndEventList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: {},
      progress: Number,
      translateValue: new Animated.Value(height - 80),
    };
    
  }

  componentDidMount() {
    
  var param = {
      WebCountryCode: 'KW',
      UserID: 0,
      Corpcentreby: '2',
      CultureId: globalVariables.CultureId,
    };
    console.log('parameters -------',param);
   new ApiHelper().serviceCallGet(
      param,
      this.props.route ? this.props.route.params.url : `${res.api.baseUrlCommon}${res.api.Get_NewCollectionAllProducts}`,
      (data, err) => {
        if (err) {
          alert(err);
        } else {
          this.setState({
            dataSource: data.row,
          });
      }

    })
  }

  RenderTableComponent = ({ item }) => {
    console.log('row render -------',item);
    return (
      
      <View style={{width:'90%',margin:'5%',shadowColor:res.color.lightGrayColor,alignSelf:'center'}}>
        <TouchableOpacity style={{width:'100%',alignItems:'center',justifyContent:'center',backgroundColor:res.color.whilteColor}} onPress={() => this.onPressCell(item)}>
        <View style={[{alignItems:'center',width:'100%'},styles.boxWithShadow]}>
        <Image style={[{width:'100%',height: 300,},styles.boxWithShadow]} resizeMode='contain' source={{
            uri: res.api.baseUrlNewsAndEvent.concat(
              item.Image
              ),
          }} />
        </View>
        <View style={{marginTop:8, width:'100%',backgroundColor:res.color.whilteColor}}>
            <Text style={{fontFamily:res.font.semiBoldFontpl,fontSize:22,fontWeight:'600'}}>{item.Name} </Text>
            <Text style={{fontFamily:res.font.ragularFont,fontSize:18}}>{item.Description} </Text>
        </View>  
       </TouchableOpacity> 
    </View>
  );
  };


  RenderFilterComponentCell = ({ item }) => {
    return (
      <TouchableOpacity onPress={() => navigation.navigate('ProfileView')}>
      <View style={styles.container}>
        <View style={styles.subContainer}>
          <Text style={styles.nameTitleMyAcc}>title</Text>
          <Text style={styles.nameSubTitleMyAcc}>subTitle</Text>
        </View>
        {/* <Image style={styles.userImage} source={ImageAssets.cartSelected} /> */}
      </View>
    </TouchableOpacity>
  );
  };


renderItem = ({item}) => {<RenderTableComponent item={item} />};

  renderBannerItem({item}) {
    return <View style={{height: 100, width: width, backgroundColor: item, borderColor: 'black', borderWidth: 2}} />
  };

  onScroll(e) {
    // Get progress by dividing current FlatList X offset with full FlatList width
    this.setState({ progress : e.nativeEvent.contentOffset.x / ((DATA.length - 1) * width) })
  };


  //cell Click
  onPressCell(item) {
    this.props.navigation.navigate('NewsAndEventDetail', {
       id: item.SrNo,
      // title: item.title.rendered,
    });
  }

  toggleDetails = shouldOpen => {
    let toValue = 0;// if we need to open our subView, we need to animate it to it original hight.
//To do this, we will use 'transform: translateY(0)' 
    if (!shouldOpen) {
      toValue = height - 200;
    } // if it's already open and we need to hide it, we will use 'transform: translateY(200)'
    Animated.spring(this.state.translateValue, {
      toValue: toValue,
      velocity: 3,
      tension: 2,
      friction: 8,
    }).start(); // the actual animation
  };



RenderFilterComponent = () => (
   <View>
      <View style={styles.detailsContainer}>
      <FlatList
          data={this.state.dataSource}
          renderItem={this.RenderFilterComponentCell}
          keyExtractor={(item, index) => index.toString()}
          numColumns={1}
        />
      </View>
  </View>
  );

  render() {
    return (
      

    <View style={styles.MainContainer}>
        <FlatList
          data={this.state.dataSource}
          renderItem={this.RenderTableComponent}
          keyExtractor={(item, index) => index.toString()}
          numColumns={1}
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
    backgroundColor:res.color.whilteColor
  },
  boxWithShadow: {
    shadowColor: res.color.midGrayColor,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,  
    elevation: 5
},
  imageThumbnail: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    height: 100,
  },
  vwfilter: {
    height: 80,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnfilter: {
    backgroundColor: res.color.whilteColor,
    fontFamily: res.font.ragularFont,
    height: 40,
    width: '40%',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    borderRadius: 20,
    shadowOpacity: 5.0,
    shadowColor: res.color.lightGrayColor,
  },
  mainView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#B5F6F8',
  },
  openButton: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 100,
    height: 40,
    backgroundColor: '#5B87E5',
    borderRadius: 30,
  },
  openButtonText: {
    fontSize: 12,
    color: 'white',
  },
  subView: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'white',
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    height: height - 200,
  },
  closeButtonContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 18,
    paddingBottom: 12,
  },
  closeButton: {
    height: 7,
    width: 62,
    backgroundColor: '#D8D8D8',
    borderRadius: 3.5,
  },
  detailsContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  detailsText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#4A4A4A',
  },
});
