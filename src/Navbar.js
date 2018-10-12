import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

export default class Navbar extends React.Component {
  render(){
    return (
      <View style={styles.navbarContainer}>
        <Text style={styles.headerText}>INSPIRO 2018</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  navbarContainer: {
    height: 80,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    color: '#fff',
    fontSize: 30
  }
});
