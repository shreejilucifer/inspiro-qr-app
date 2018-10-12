import React from 'react';
import { StyleSheet, Text, View, Picker, Button } from 'react-native';
import { BarCodeScanner, Permissions } from 'expo';
import RegistrationScreenContent from './RegistrationScreenContent';

export default class SessionScreen extends React.Component {
  state = {
    hasCameraPermission: null,
    myValue: null
  }

  async componentWillMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({hasCameraPermission: status === 'granted'});
    }

  render(){
    const { hasCameraPermission } = this.state;
    const Consumer = this.props.Consumer;

    if (hasCameraPermission === null) {
      return <Text>Requesting for camera permission</Text>;
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    } else
    return (
      <Consumer>
        {({ state, actions }) => (
          <View style={styles.lunchscreenContainer}>
            {
              (state.error === true && state.success === false && state.loading === false)?
              <View style={styles.contentContainer}>
                <Text style={styles.myTextError}>Error</Text>
                <Text style={styles.myTextError}>{state.responseMessageSession}</Text>
                <Text style={styles.myTextError}>{state.qrNameSession}</Text>
                <Button
                  style={styles.errorButton}
                  title="Try Again"
                  onPress={()=>actions.onClickNextButton()}
                />
              </View> : <View></View>
            }

            {
              (state.success === true && state.error === false && state.loading === false)?
              <View style={styles.contentContainer}>
                <Text style={styles.myText}>{state.responseMessageSession}</Text>
                <Text style={styles.myText}>{state.qrNameSession}</Text>
                <Button
                  title="Register Another"
                  onPress={()=>actions.onClickNextButton()}
                />
              </View> : <View></View>
            }

            {
              (state.loading === true)?
              <View style={styles.contentContainer}>
                <Text style={styles.myText}>Loading</Text>
              </View> : <View></View>
            }

            {
              (state.loading === false && state.success === false && state.error === false)?
              <RegistrationScreenContent Consumer={Consumer} /> : <View></View>
            }

          </View>
    )}
    </Consumer>
    );
  }
}

const styles = StyleSheet.create({
  lunchscreenContainer: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    padding: 10
  },
  contentContainer: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-around',
    padding: 10
  },
  errorButton: {
    backgroundColor: '#ff0000'
  },
  myTextError: {
    fontSize: 20
  },
  myText: {
    fontSize: 20
  }
});
