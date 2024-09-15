import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { AntDesign, MaterialIcons } from '@expo/vector-icons';

export default function HomeScreen({ navigation }) { // Add navigation prop
    return (
      <View style={styles.container}>
        <View style={{ height: 10 }} />
        <View style={styles.headerContainer}>
          <Text style={styles.header}>Profiles</Text>
          <TouchableOpacity>
            <Text style={styles.logout}
            onPress={() => navigation.navigate('Login')} 
            >Logout</Text>
          </TouchableOpacity>
        </View>
        <View style={{ height: 15 }} />
        <TouchableOpacity 
          style={styles.createProfileContainer}
          onPress={() => navigation.navigate('NewProfile')} // Add navigation to NewProfileScreen
        >
          <AntDesign name="plus" size={24} color="gray" />
          <Text style={styles.createProfileText}>Create Profile</Text>
        </TouchableOpacity>

      <TouchableOpacity style={styles.profileContainer}
      onPress={() => navigation.navigate('Sharing')} // Add navigation to SharingScreen
      >
        <Text style={styles.profileText}>Profile 1</Text>
        <MaterialIcons name="edit" size={24} color="#015719" />
      </TouchableOpacity>

      <TouchableOpacity style={styles.profileContainer2}>
        <Text style={styles.profileText2}>Profile 2</Text>
        <MaterialIcons name="edit" size={24} color="#570B01" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  header: {
    fontSize: 28,
    fontWeight: "bold",
  },
  logout: {
    fontSize: 18,
    color: "gray",
  },
  createProfileContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    borderRadius: 10,
    borderColor: "gray",
    borderWidth: 1,
    backgroundColor: "#f8f8f8",
    marginBottom: 20,
  },
  createProfileText: {
    fontSize: 18,
    color: "gray",
    marginLeft: 10,
  },
  profileContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 20,
    borderRadius: 10,
    backgroundColor: "#d9e7d6", // Light green for Profile 1
    marginBottom: 20,
    height: 80,
  },
  profileText: {
    fontSize: 18,
    color: "#2f4f2f", // Green text for Profile 1
  },
  profileContainer2: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 20,
    borderRadius: 10,
    backgroundColor: "#DDCECC", // Light red for Profile 2
    marginBottom: 20,
    height: 80,
  },
  profileText2: {
    fontSize: 18,
    color: "#570B01", // Red text for Profile 2
  },
});