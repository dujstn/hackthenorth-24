import {Auth0Provider} from 'react-native-auth0';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen';
import NewProfileScreen from '../screens/NewProfileScreen';
import config from '../auth0-configuration'

const Stack = createStackNavigator();

export default function App() {
  return (
    <Auth0Provider domain={config.domain}
                   clientId={config.clientId}>
      <AppNavigator/>
    </Auth0Provider>
  );
}

function AppNavigator() {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={LoginScreen}/>
        <Stack.Screen name="Home" component={HomeScreen}/>
        <Stack.Screen name="NewProfile" component={NewProfileScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

