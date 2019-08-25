import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";
import HomeScreen                           from "../screens/HomeScreen";
import { createAppContainer }               from 'react-navigation';

const MainNavigator = createMaterialBottomTabNavigator({
    Home: {
      screen: HomeScreen
    }
}, {
    initialRouteName: 'Home',
    activeColor: '#3e2465',
    inactiveColor: '#999999',
    barStyle: { backgroundColor: '#f2f2f2' },
});
  
const AppContainer = createAppContainer(MainNavigator);

export default AppContainer;