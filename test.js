import React, {Component} from 'react';
import {
  Alert,
  AppRegistry,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';

import {
  SketchCanvas,
} from '@terrylinla/react-native-sketch-canvas';

export default class example extends Component {
  constructor() {
    super();
    this.SketchCanvas = React.createRef();
  }
  render() {
    const saveCanvas = () => {
      const paths = this.SketchCanvas.current.getPaths();
      console.log(paths);
      Alert('Saved the current canvas.');
    };

    const undoAction = () => {
      this.SketchCanvas.current.undo();
      Alert('Undone the last action.');
    };

    return (
      <View style={styles.container}>
        <View style={{flex: 1, flexDirection: 'row'}}>
          <SketchCanvas
            ref={this.SketchCanvas}
            style={{flex: 1}}
            strokeColor={'red'}
            strokeWidth={5}
          />
        </View>
        <TouchableOpacity onPress={saveCanvas}>
          <Text>Save</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={undoAction}>
          <Text>Undo</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});

AppRegistry.registerComponent('example', () => example);
