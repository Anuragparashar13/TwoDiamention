import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {View, StyleSheet, Text} from 'react-native';
import R from '../../../res/index';
import constants from '../../app/Constants';

const componentStyle =
  R && R.style && R.style.componentStyle ? R.style.componentStyle : {};

export default class ErrorComponent extends PureComponent {
  static propTypes = {
    errorText: PropTypes.string,
    accessibilityLabel: PropTypes.string,
    testID: PropTypes.string,
    accessible: PropTypes.bool,
  };

  static defaultProps = {
    errorText: '',
    accessibilityLabel: '',
    testID: '',
    accessible: '',
  };

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <>
        <View style={styles && styles.container}>
          <Text
            accessibilityLabel={
              this.props.accessibilityLabel + constants.automationId.error
            }
            testID={this.props.testID + constants.automationId.error}
            accessible={this.props.accessible}
            style={componentStyle.errorTextBox}>
            {this.props.errorText}
          </Text>
        </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'center',
  },
});
