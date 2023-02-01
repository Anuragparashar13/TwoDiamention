import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {View, Text} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import R from '../../../res/index';

const componentStyle =
  R && R.style && R.style.componentStyle ? R.style.componentStyle : {};

export default class ButtonComponent extends PureComponent {
  static propstype = {
    accessibilityLabel: PropTypes.string,
    testID: PropTypes.string,
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
      <TouchableOpacity
        accessibilityLabel={this.props.accessibilityLabel}
        testID={this.props.testID}
        accessible={this.props.accessible}
        onPress={this.buttonClickHandler}
        disabled={this.props.disable}>
        <View style={componentStyle.submitButton}>
          <Text style={componentStyle.submitButtonText}>{this.props.text}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}
