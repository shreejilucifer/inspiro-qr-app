import React, { createContext } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { createBottomTabNavigator } from 'react-navigation';

// Screens
import HomeScreen from './src/Screens/HomeScreen';
import LunchScreen from './src/Screens/LunchScreen';
import SessionScreen from './src/Screens/SessionScreen';
import Navbar from './src/Navbar';

// Import context store
import store from './Context/Store/';
import actions from './Context/Actions/';

// Initialize a context
const Context = createContext();
const { Provider, Consumer } = Context;

const Router = createBottomTabNavigator({
  HomeScreen: { screen: ()=><HomeScreen Consumer={Consumer} />},
  LunchScreen: { screen: ()=><LunchScreen Consumer={Consumer} /> },
  SessionScreen: { screen: ()=><SessionScreen Consumer={Consumer} />}
}, {initialRouteName: 'LunchScreen'});

export default class App extends React.Component {

  constructor() {
    super();
    this.state = store
  }

  render() {

    for(let f in actions) {
      if(typeof actions[f] === "function"){
        actions[f] = actions[f].bind(this);
      }
    }

    return (
      <Provider value={{
        state: this.state,
        actions
      }}>
      <View style={styles.container}>
        <Navbar />
        <Router />
      </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column'
  }
});
