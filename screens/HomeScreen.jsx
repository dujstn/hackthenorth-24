import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { AntDesign, MaterialIcons } from '@expo/vector-icons';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Profiles</Text>
        <TouchableOpacity>
          <Text style={styles.logout}>Logout</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.createProfileContainer}>
        <AntDesign name="plus" size={24} color="gray" />
        <Text style={styles.createProfileText}>Create Profile</Text>
      </TouchableOpacity>

      <View style={styles.profileContainer}>
        <Text style={styles.profileText}>Profile 1</Text>
        <MaterialIcons name="edit" size={24} color="#015719" />
      </View>

      <View style={styles.profileContainer2}>
        <Text style={styles.profileText2}>Profile 2</Text>
        <MaterialIcons name="edit" size={24} color="#570B01" />
      </View>
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
    fontSize: 16,
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
  },
  profileText: {
    fontSize: 18,
    fontWeight: "bold",
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
  },
  profileText2: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#570B01", // Red text for Profile 2
  },
});