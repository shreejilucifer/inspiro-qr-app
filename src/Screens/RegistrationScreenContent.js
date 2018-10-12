import React from 'react';
import { StyleSheet, Text, View, Picker } from 'react-native';
import { BarCodeScanner } from 'expo';

export default class RegistrationScreenContent extends React.Component {

  render(){
    const Consumer = this.props.Consumer;
    return (
      <Consumer>
        {({ state, actions }) => (
          <View style={styles.lunchContainer}>

            <Text style={styles.lunchText}>Registration</Text>

            <Picker
              selectedValue={state.sessionValue}
              style={styles.lunchPicker}
              onValueChange={(itemValue, itemIndex)=>actions.onSessionPickerChange(itemValue, itemIndex)}
              mode="dropdown">
              <Picker.Item label="DAY 1" value="SESSION 1" />
              <Picker.Item label="DAY 2" value="SESSION 2" />
            </Picker>

            <BarCodeScanner
                onBarCodeRead={({type, data})=>{
                  this.setState({myValue: data});
                  actions.handleBarCodeReadSession(data, state.sessionValue);
                }}
                style={styles.qrContainer}
              />

            <Text>{state.qrNameSession}</Text>
            <Text>{state.responseMessageSession}</Text>
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
