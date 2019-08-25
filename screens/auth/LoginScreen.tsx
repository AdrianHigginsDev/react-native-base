import React from 'react';
import {Platform, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import Request from "../../system/request/Request";
import environment from "../../config/environment.json";

export default class LoginScreen extends React.Component<{login: Function}, {email: string, password: string, errorMsg: string}> {

    state = {
      email: "",
      password: "",
      errorMsg: ""
    }

    render() {
      return (
        <View style={styles.container}>
            <Text style={styles.header}>SIGN IN REQUIRED</Text>

            <Text style={styles.error}>{this.state.errorMsg}</Text>

            <Text style={styles.label}>Email</Text>
            <TextInput style={styles.formInput} placeholder='Email' value={this.state.email} onChangeText={(text) => {this.setState({email: text})}}/>
            
            <Text style={styles.label}>Password</Text>
            <TextInput style={styles.formInput} placeholder='Password' secureTextEntry value={this.state.password} onChangeText={(text) => {this.setState({password: text})}}/>

            <TouchableOpacity
                style={styles.button}
                onPress={this.validate}
            >
                <Text style={styles.buttonText}> Log In </Text>
            </TouchableOpacity>
        </View>
      );
    }

    validate = (): void => {
        Request
        .post(environment.auth_login_url, {'email': this.state.email, 'password': this.state.password})
        .then((res) => {
            if(res.success == true) {
                this.props.login(JSON.stringify(res.user));
            } else {
                this.setState({errorMsg: "Login Attempt Failed! Try Again!"});
            }      
        });
    }
}



const styles = StyleSheet.create({
    header: {
        textAlign: 'center',
        fontSize: 20,
        fontWeight: '700',
        marginBottom: 200
    },
    error: {
      color: 'red',
      textAlign: 'center',
      marginBottom: 15
    },
    container: {
      flex: 1,
      flexDirection: 'column',
      backgroundColor: '#fff',
      justifyContent: 'center'    
    },
    label: {
        textAlign: 'center',
        fontWeight: "900"
    },
    button: {
        justifyContent: 'center'
    },
    buttonText: {
        textAlign: 'center',
        fontWeight: "900",
        fontSize: 20
    },
    formInput: {
        height: 50,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 10,
        marginLeft: 50,
        marginRight: 50,
        paddingLeft: 10,
        marginBottom: 50
    },
    developmentModeText: {
      marginBottom: 20,
      color: 'rgba(0,0,0,0.4)',
      fontSize: 14,
      lineHeight: 19,
      textAlign: 'center',
    },
    contentContainer: {
      paddingTop: 30,
    },
    welcomeContainer: {
      alignItems: 'center',
      marginTop: 10,
      marginBottom: 20,
    },
    welcomeImage: {
      width: 100,
      height: 80,
      resizeMode: 'contain',
      marginTop: 3,
      marginLeft: -10,
    },
    getStartedContainer: {
      alignItems: 'center',
      marginHorizontal: 50,
    },
    homeScreenFilename: {
      marginVertical: 7,
    },
    codeHighlightText: {
      color: 'rgba(96,100,109, 0.8)',
    },
    codeHighlightContainer: {
      backgroundColor: 'rgba(0,0,0,0.05)',
      borderRadius: 3,
      paddingHorizontal: 4,
    },
    getStartedText: {
      fontSize: 17,
      color: 'rgba(96,100,109, 1)',
      lineHeight: 24,
      textAlign: 'center',
    },
    tabBarInfoContainer: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      flex: 1,
      flexDirection: 'row',
      ...Platform.select({
        ios: {
          shadowColor: 'black',
          shadowOffset: { width: 0, height: -3 },
          shadowOpacity: 0.1,
          shadowRadius: 3,
        },
        android: {
          elevation: 20,
        },
      }),
      alignItems: 'center',
      backgroundColor: '#fbfbfb',
      paddingVertical: 20,
    },
    tabBarInfoText: {
      fontSize: 17,
      color: 'rgba(96,100,109, 1)',
      textAlign: 'center',
    },
    navigationFilename: {
      marginTop: 5,
    },
    helpContainer: {
      marginTop: 15,
      alignItems: 'center',
    },
    helpLink: {
      paddingVertical: 15,
    },
    helpLinkText: {
      fontSize: 14,
      color: '#2e78b7',
    },
    navItem: {
      width: 100,
      textAlign: 'center'
    }
  });