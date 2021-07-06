import {
  AppRegistry,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  Dimensions,
} from 'react-native';

import Slider from '@react-native-community/slider';
import QuickPinchZoom from 'react-quick-pinch-zoom';

import {ImageEditor} from '@wwimmo/react-native-sketch-canvas';
import {TriangleColorPicker, fromHsv} from 'react-native-color-picker';

import React, {Component} from 'react';
import FlashMessage, {showMessage} from 'react-native-flash-message';

export default class example extends Component {
  constructor(props) {
    super(props);

    this.SketchCanvas = React.createRef();
    this.state = {
      strokeWidth: 5,
      strokeColor: 'white',
      showStrokeChanger: false,
      showColorPicker: false,
      defaultColor: 'black',
    };
  }

  // componentDidMount() {
  //   this.SketchCanvas.current
  // }

  render() {
    const saveCanvas = () => {
      const paths = this.SketchCanvas.current.getPaths();
      showMessage({
        message: 'Saved the page.',
        type: 'default',
        backgroundColor: this.state.defaultColor, // background color
        color: '#FF0000', // text color
      });
    };

    const clearCanvas = () => {
      this.SketchCanvas.current.clear();
      showMessage({
        message: 'Cleared the page.',
        type: 'default',
        backgroundColor: this.state.defaultColor, // background color
        color: '#FF0000', // text color
      });
    };

    const undoAction = () => {
      this.SketchCanvas.current.undo();
      showMessage({
        message: 'Undone the last action.',
        type: 'default',
        backgroundColor: this.state.defaultColor, // background color
        color: '#FF0000', // text color
      });
    };

    const showStrokeChanger = () => {
      if (this.state.showColorPicker && !this.state.showStrokeChanger)
        this.setState({showColorPicker: !this.state.showColorPicker});

      this.setState({showStrokeChanger: !this.state.showStrokeChanger});
    };

    const showColorPicker = () => {
      if (this.state.showStrokeChanger && !this.state.showColorPicker)
        this.setState({showStrokeChanger: !this.state.showStrokeChanger});

      this.setState({showColorPicker: !this.state.showColorPicker});
    };

    return (
      <View style={styles.container}>
        <QuickPinchZoom>
          <View style={{flex: 1, flexDirection: 'row'}}>
            <ImageEditor
              ref={this.SketchCanvas}
              style={{flex: 1, backgroundColor: this.state.defaultColor}}
              strokeColor={this.state.strokeColor}
              strokeWidth={this.state.strokeWidth}
              localSourceImage={{
                directory: '',
                filename: 'note.png',
                mode: 'AspectFill',
              }}
            />
          </View>
        </QuickPinchZoom>

        {this.state.showStrokeChanger && (
          <Slider
            style={{
              width: Dimensions.get('window').width,
              height: Dimensions.get('window').height / 17,
            }}
            minimumValue={1}
            maximumValue={20}
            onValueChange={v => this.setState({strokeWidth: v})}
            value={this.state.strokeWidth}
          />
        )}

        {this.state.showColorPicker && (
          <TriangleColorPicker
            onColorChange={color =>
              this.setState({strokeColor: fromHsv(color)})
            }
            defaultColor={this.state.strokeColor}
            style={{flex: 1, width: 400, height: 400}}
          />
        )}

        <View style={styles.row}>
          <TouchableOpacity onPress={showStrokeChanger}>
            <Text style={styles.text}>Line Width</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={saveCanvas}>
            <Text style={styles.text}>Save</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={undoAction}>
            <Text style={styles.text}>Undo</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={clearCanvas}>
            <Text style={styles.text}>Clear</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={showColorPicker}>
            <Text style={styles.text}>Color Picker</Text>
          </TouchableOpacity>
        </View>

        <FlashMessage position="top" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  text: {
    color: 'white',
    margin: 10,
  },
});

AppRegistry.registerComponent('example', () => example);
