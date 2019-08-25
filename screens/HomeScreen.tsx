import React from 'react';
import {StyleSheet, Text, View, Button} from 'react-native';

export default class HomeScreen extends React.Component<{navigation: any, screenProps: any}> {

  static navigationOptions = {
    title: 'Home',
  };
  
  render() {
    const {navigate} = this.props.navigation;
    return (
      <View style={styles.container}>
        <Text>Welcome To The Home Screen!</Text>
        <Button
          title="Logout"
          onPress={() => this.props.screenProps.logout()}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 50
  }
})