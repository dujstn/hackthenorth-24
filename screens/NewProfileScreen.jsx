import React, { useState } from 'react';
import { StyleSheet, View, ScrollView, Button, TouchableOpacity } from 'react-native';
import { Text, TextInput, IconButton } from 'react-native-paper';

export const urlToken = [];

export default function ProfileScreen({ navigation }) {
  // State for each input field
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [description, setDescription] = useState('');
  const [linkedIn, setLinkedIn] = useState('');
  const [instagram, setInstagram] = useState('');
  const [gitHub, setGitHub] = useState('');
  const [facebook, setFacebook] = useState('');
  const [twitter, setTwitter] = useState('');

  // Function to handle form submission
  const handleSubmit = async () => {
    const formData = {
      name,
      phone,
      email,
      description,
      linkedIn,
      instagram,
      gitHub,
      facebook,
      twitter
    };

    try {
      const response = await fetch('https://jisecay129.pythonanywhere.com/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.text();
        console.log("Success:", data);

        const url = `https://jisecay129.pythonanywhere.com/${data}`;
        const res2 = await fetch(`https://ulvis.net/api.php?url=${url}`);
		    const finalUrl = await res2.text();
        urlToken.push(finalUrl);
      } else {
        console.error("Error:", response.statusText);
      }
    } catch (error) {
      console.error("Request failed", error);
    }
  };

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
        <TextInput label="Name" mode="outlined" style={styles.input} value={name} onChangeText={setName} />
        <TextInput label="Phone Number" mode="outlined" style={styles.input} value={phone} onChangeText={setPhone} />
        <TextInput label="Email" mode="outlined" style={styles.input} value={email} onChangeText={setEmail} />
        <TextInput
          label="Description"
          mode="outlined"
          multiline
          numberOfLines={4}
          style={[styles.input, { height: 100 }]}
          value={description}
          onChangeText={setDescription}
        />
        <TextInput label="LinkedIn" mode="outlined" style={styles.input} value={linkedIn} onChangeText={setLinkedIn} />
        <TextInput label="Instagram" mode="outlined" style={styles.input} value={instagram} onChangeText={setInstagram} />
        <TextInput label="GitHub" mode="outlined" style={styles.input} value={gitHub} onChangeText={setGitHub} />
        <TextInput label="Facebook" mode="outlined" style={styles.input} value={facebook} onChangeText={setFacebook} />
        <TextInput label="Twitter" mode="outlined" style={styles.input} value={twitter} onChangeText={setTwitter} />

        <TouchableOpacity style={styles.submit} onPress={ () => {handleSubmit(); navigation.navigate('Home')}}>
        <Text style={styles.submitText}>Submit</Text>
      </TouchableOpacity>
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
    fontSize: 28,
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
  submit: {
    backgroundColor: "#d9e7d6", // Light green color
    paddingVertical: 15,
    paddingHorizontal: 85,
    borderRadius: 10,
    marginBottom: 20,
    alignItems: "center",
  },
  submitText: {
    color: "#2f4f2f", // Dark green color
    fontSize: 18,
    fontWeight: "bold",
  },
});
