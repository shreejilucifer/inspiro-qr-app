import React from 'react';
import { StyleSheet, Text, View, Picker } from 'react-native';
import { BarCodeScanner } from 'expo';

export default class LunchScreenContent extends React.Component {

  render(){
    const Consumer = this.props.Consumer;
    return (
      <Consumer>
        {({ state, actions }) => (
          <View style={styles.lunchContainer}>

            <Text style={styles.lunchText}>Lunch</Text>

            <Picker
              selectedValue={state.lunchValue}
              style={styles.lunchPicker}
              onValueChange={(itemValue, itemIndex)=>actions.onLunchPickerChange(itemValue, itemIndex)}
              mode="dropdown">
              <Picker.Item label="LUNCH 1" value="LUNCH 1" />
              <Picker.Item label="LUNCH 2" value="LUNCH 2" />
            </Picker>

            <BarCodeScanner
                onBarCodeRead={({type, data})=>{
                  this.setState({myValue: data});
                  actions.handleBarCodeRead(data, state.lunchValue);
                }}
                style={styles.qrContainer}
              />

            <Text>{state.qrName}</Text>
            <Text>{state.responseMessage}</Text>
          </View>
        )}
      </Consumer>
    )
  }
}

const styles = StyleSheet.create({
  lunchContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  lunchText: {
    fontSize: 20
  },
  lunchPicker: {
    height: 50,
    width: 150,
    borderWidth: 1,
    borderColor: '#000'
  },
  qrContainer: {
    width: 300,
    height: 300
  }
});
