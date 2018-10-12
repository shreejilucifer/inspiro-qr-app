import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

class HomeScreen extends React.Component {
  static navigationOptions = {
  title: 'Home',
  };

  render(){
    const Consumer = this.props.Consumer;

    return (
      <Consumer>
        {({ state, actions }) => (
      <View style={styles.homeContainer}>
        <Text>Hello World</Text>
      </View>
    )}
    </Consumer>
    );
  }

}

const styles = StyleSheet.create({
  homeContainer: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default HomeScreen;
