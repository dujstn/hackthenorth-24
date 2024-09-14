import {Button} from 'react-native';
import {useAuth0} from 'react-native-auth0';

const LoginScreen = ({navigation}) => {
  const {authorize} = useAuth0();

  const login = async () => {
    try {
      await authorize();
      navigation.navigate('Home');
    } catch (error) {
      console.log(error);
    }
  };

  return <Button title="Log In" onPress={login}/>;
};

export default LoginScreen;
