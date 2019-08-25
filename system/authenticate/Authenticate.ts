import { AsyncStorage } from 'react-native';
import environment from "../../config/environment.json";

class Authenticate {

    public login(user) {
        this._store_user(user);
        return {
          authenticated: true,
          user: user
        };
      }
    
    public logout() {
        AsyncStorage.removeItem(environment.app_name + "@User");
        return {
            authenticated: false,
            user: {},
            isReady: false
        }
    }

    public isActive() {
        return this._find_user();
    }

    public _store_user = async (user) => {
        try {
          await AsyncStorage.setItem(environment.app_name + "@User", user);
        } catch (error) {
    
        }
    }
    
    public _find_user = async () => {
        try {
            const user: string = await AsyncStorage.getItem(environment.app_name + "@User");
            if(user !== null) {
                return [true, {
                    authenticated: true,
                    user: user
                }]
            } else {
                return [false, {
                    authenticated: false,
                    user: {}
                }]
            }
        } catch (error) {

        }
    }
}

export default new Authenticate();