import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import res from '../../Helper/index';
import MultiSlider from '@ptomasroos/react-native-multi-slider';

// export default const RangeSlider extends React.Component {
//     state = {
//         values: [3, 7],
//     };

//     multiSliderValuesChange = (values) => {
//         this.setState({
//             values,
//         });
//     }

//     render() {
//         return (
//             <View>
//                 <MultiSlider
//                     values={[this.state.values[0], this.state.values[1]]}
//                     sliderLength={280}
//                     selectedStyle={{backgroundColor:'black',height:3}}
//                     markerStyle={{backgroundColor:'black'}}
//                     onValuesChange={this.multiSliderValuesChange}
//                     min={0}
//                     max={10}
//                     step={1}
//                 />
//                 <Text>Two Markers:</Text>
//                 <Text>{this.state.values[0]}</Text>
//                 <Text>{this.state.values[1]}</Text>
//             </View>
//         )
//     }
// }



export const RangeSlider = ({minVal, maxVal, step, onChange}) => (

            <View>

                    

                <MultiSlider
                    values={[minVal, maxVal]}
                    sliderLength={280}
                    selectedStyle={{backgroundColor:'black',height:3}}
                    markerStyle={{backgroundColor:'black'}}
                    onValuesChange={(value) => onChange(value)}
                    min={minVal}
                    max={maxVal}
                    step={step}
                />
                
            </View>
  );