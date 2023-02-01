import React, {Component} from 'react';
import {
  TouchableOpacity,
  View,
  ActivityIndicator,
  Text,
  Alert,
  Dimensions,
  StyleSheet,
  window,
} from 'react-native';
import Modal from 'react-native-modal';
import AppLoader, { showLoader, hideLoader } from './AppLoader'
import Toast from 'react-native-simple-toast';

// import Loader from "./Component/ActivityIndicator";
// import Spinner from "react-native-spinkit";


//https://satissraj.hashnode.dev/how-to-make-a-global-component-loader-alert-toast-etc-in-react-native-cjxcte48n000aens1w5fb57ls
export default class ApiHelper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
      types: [
        'CircleFlip',
        'Bounce',
        'Wave',
        'WanderingCubes',
        'Pulse',
        'ChasingDots',
        'ThreeBounce',
        'Circle',
        '9CubeGrid',
        'WordPress',
        'FadingCircle',
        'FadingCircleAlt',
        'Arc',
        'ArcAlt',
      ],
      size: 100,
      color: '#FFFFFF',
      isVisible: true,
    };
  }


//   showLoader()
//   {
//     return (
//       <View style={{ flex: 1 }}>
//         <AppLoader ref={loaderRef} />
//       </View>
// );
//   }
  

  // Service Call main function
  serviceCallGet = async (param, url, callback) => {
    // this.showLoader()
    // this.setState({index: 1})

     showLoader()
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(param),
    })
   
      .then((response) => response.json())

      .then((responseJson) => {
        hideLoader()
       
        // if (responseJson.status == false) {
        //   //  Alert.alert(responseJson.msg);
        //   // callback(null, responseJson.msg);
        //   callback(null, 'Anurag callback1');
        // } else {
          
        // }
        if (responseJson.ResponseCode === '-2' || responseJson.ResponseCode === '-4'  || responseJson.ResponseCode === '-6')
        {
          if (url === 'http://api.2d.com.kw/api/TwoDml/UserLogin_Facebook')
          {
            callback(responseJson, null);
          }
          else
          {
          Toast.show(responseJson.Message);
          }
        }
        else
        {     
        callback(responseJson, null);
        }
      })
      .catch((error) => {
        // hideLoader()
        // this.setState({ isVisible: false });
        // alert(error);
        Toast.show(error.message);
        // callback(null, error);
        console.error(error);
      });
  };

  //  // Service Call main function
  //  serviceCallGet = async (param, url, callback) => {
  //   var formData = new FormData();
  //   param = {
  //     WebCountryCode: 'KW',
  //     UserID: 0,
  //     Corpcentreby: '2',
  //     CultureId: globalVariables.CultureId,
  //   };

  //   JSON.stringify(param);

  //   for (var k in param) {
  //     formData.append(k, param[k]);
  //   }
  //   // alert(formData);

  //   fetch(
  //     'http://template2.malakstar.com/api/TwoDml/Get_NewCollectionAllProducts',
  //     {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify(param),
  //     },
  //   )
  //     .then((response) => response.json())

  //     .then((responseJson) => {
  //       // alert(responseJson);
  //       //   this.setState({ isVisible: false });
  //       if (responseJson.status == false) {
  //         //  Alert.alert(responseJson.msg);
  //         // callback(null, responseJson.msg);
  //         callback(null, 'Anurag callback1');
  //       } else {
  //         // console.log(responseJson.result.userId);
  //         // callback(responseJson.result, null);
  //         const userStr = JSON.stringify(responseJson);
  //         // alert(userStr)

  //         console.log(JSON.parse(userStr));
  //         alert(JSON.parse(userStr));
  //         callback(responseJson, null);
  //       }
  //     })
  //     .catch((error) => {
  //       // this.setState({ isVisible: false });
  //       // alert(error);
  //       callback(null, error);
  //       console.error(error);
  //     });
  // };

  render() {
   
    return (
     <View style={{backgroundColor:'red'}}>

      <AppLoader ref={loaderRef} />
      
     </View>   
    );
  }
}

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-around',
    backgroundColor: '#00000040',
  },
  activityIndicatorWrapper: {
    backgroundColor: '#FFFFFF',
    height: 100,
    width: 100,
    borderRadius: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
});
