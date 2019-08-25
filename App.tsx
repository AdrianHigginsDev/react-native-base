import React            from "react";
import { AppLoading }   from 'expo';
import { AsyncStorage } from 'react-native';
import Authenticate     from "./system/authenticate/Authenticate";

import LoginScreen      from "./screens/auth/LoginScreen";
import AppContainer     from "./containers/AppContainer";

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.login   = this.login.bind(this);
    this.logout  = this.logout.bind(this);
  }

  state = {
    authenticated: false,
    user: {},
    isReady: false
  }

  render() {
    if (!this.state.isReady) {
      return (
        <AppLoading
          startAsync={this._find_user}
          onFinish={() => this.setState({ isReady: true })}
          onError={console.warn}
        />
      ); 
    }
    if(!this.state.authenticated) {
      return <LoginScreen  login={this.login}/>
    } else {
      return <AppContainer screenProps={{logout: this.logout}}/>
    }
  }
  
  /**
   * @param user 
   */
  public login(user: any): void {
    this.setState(Authenticate.login(user));
  }

  /**
   * @param void
   */
  public logout(): void {
    this.setState(Authenticate.logout());
  }

  /**
   * @param void
   */
  private _find_user = async (): Promise<void> => {
    try {
      const user = await AsyncStorage.getItem('Library@User');
      if(user !== null) {
        this.setState({
          authenticated: true,
          user: user
        })
      }
    } catch (error) {

    }
  }

}
