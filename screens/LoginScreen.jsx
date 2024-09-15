import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

const LoginScreen = ({ navigation }) => {
  // const { authorize } = useAuth0();

  const login = async () => {
    try {
      // await authorize();
      navigation.navigate('Home');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.loginButton} onPress={login}>
        <Text style={styles.loginText}>Login</Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={styles.continueWithoutAccountButton} 
        onPress={() => navigation.navigate('Home')}
      >
        <Text style={styles.continueWithoutAccountText}>Continue without an account</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  loginButton: {
    backgroundColor: "#d9e7d6", // Light green color
    paddingVertical: 15,
    paddingHorizontal: 85,
    borderRadius: 10,
    marginBottom: 20,
    alignItems: "center",
  },
  loginText: {
    color: "#2f4f2f", // Dark green color
    fontSize: 18,
    fontWeight: "bold",
  },
  continueWithoutAccountButton: {
    marginTop: 10,
  },
  continueWithoutAccountText: {
    color: "#2F4F2F", // Dark green color
    fontSize: 16,
  },
});

export default LoginScreen;