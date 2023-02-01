import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {View, Text} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

export default class BarButtonComponent extends React.Component {
  static propstype = {
    accessibilityLabel: PropTypes.string,
    accessible: PropTypes.bool,
    text: PropTypes.string,
    onClick: PropTypes.object,
    disable: PropTypes.bool,
  };

  static defultProps = {
    accessibilityLabel: '',
    testID: '',
    accessible: true,
    text: '',
    onClick: undefined,
    disable: false,
  };

  constructor(props) {
    super(props);
    this.buttonClickHandler = this.buttonClickHandler.bind(this);
  }

  buttonClickHandler() {
    if (this.props && this.props.onClick) {
      this.props.onClick();
    }
  }

  render() {
    return (
      <View>
      {/* <TouchableOpacity onPress={() => this.navigation.navigate('ProfileEdit')}>
        <Text>Edit</Text>
      </TouchableOpacity> */}
      </View>
    );
  }
}
