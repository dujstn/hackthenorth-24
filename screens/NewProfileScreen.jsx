import React from 'react';
import { StyleSheet, View, TouchableOpacity, ScrollView } from 'react-native';
import { Text, TextInput, IconButton } from 'react-native-paper';

export default function ProfileScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Profile 1</Text>
        <IconButton 
          icon="close" 
          size={24} 
          onPress={() => navigation.goBack()} 
          style={styles.closeButton}
        />
      </View>

      <ScrollView contentContainerStyle={styles.formContainer}>
        <TextInput label="Name" mode="outlined" style={styles.input} />
        <TextInput label="Phone Number" mode="outlined" style={styles.input} />
        <TextInput label="Email" mode="outlined" style={styles.input} />
        <TextInput 
          label="Description" 
          mode="outlined" 
          multiline 
          numberOfLines={4} 
          style={[styles.input, { height: 100 }]} 
        />
        <TextInput label="LinkedIn" mode="outlined" style={styles.input} />
        <TextInput label="Instagram" mode="outlined" style={styles.input} />
        <TextInput label="GitHub" mode="outlined" style={styles.input} />
        <TextInput label="FaceBook" mode="outlined" style={styles.input} />
        <TextInput label="Twitter" mode="outlined" style={styles.input} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#d9e7d6", // Light green background
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#d9e7d6",
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
  },
  closeButton: {
    backgroundColor: "transparent",
  },
  formContainer: {
    backgroundColor: "#ffffff",
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  input: {
    marginBottom: 20,
  },
});