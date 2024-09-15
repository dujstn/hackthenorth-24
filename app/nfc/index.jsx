import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { ActivityIndicator, IconButton } from 'react-native-paper';
import NfcManager, { Ndef, NfcTech } from 'react-native-nfc-manager';
import { urlToken } from '../../screens/NewProfileScreen';

export default function SharingScreen({ navigation }) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Start NFC Manager
    NfcManager.start()
      .then(() => {
        console.log("NFC started successfully");
        writeNdef();
      })
      .catch(e => {
        console.warn("NFC failed to start", e);
        setError("NFC failed to start. Please ensure your device supports NFC.");
        setLoading(false);
      });
  }, []);

  async function getUrl() {
	const params = {
		name: "John Doe",
		phone: "111-222-3333",
		email: "abc@abc.com"
	};
	console.log("here")
	try {
		const res = await fetch("https://jisecay129.pythonanywhere.com/create", {
			headers: {
				"Content-Type": "application/json",
			},
			method: "POST",
			body: JSON.stringify(params),
		});
		console.log("Status", res.status);
		const url = `https://jisecay129.pythonanywhere.com/${await res.text()}`;

		const res2 = await fetch(`https://ulvis.net/api.php?url=${url}`);
		const finalUrl = await res2.text();
		return finalUrl;
	} catch (e) {
		console.warn("Failed to get URL", e);
		setError("Failed to generate profile URL. Please try again.");
	}
  }

  async function writeNdef() {
    // const url = await getUrl();
	const url = urlToken[0];
	urlToken.pop();
	console.log(url)
    let success = false;
    try {
      const tech = await NfcManager.requestTechnology(NfcTech.Ndef);
      if (tech !== NfcTech.Ndef) {
        throw new Error('Wrong NFC technology');
      }
      const bytes = Ndef.encodeMessage([Ndef.uriRecord(url)]);
      if (bytes.length) {
        await NfcManager.ndefHandler.writeNdefMessage(bytes);
        success = true;
        console.log('NDEF message written successfully');
      } else {
        throw new Error('Failed to encode NDEF (0 bytes)');
      }
    } catch (e) {
      console.warn('An error occurred!', { e });
      setError("Failed to write NFC tag. Please try again.");
    } finally {
      await NfcManager.cancelTechnologyRequest();
      setLoading(false);
    }
    return success;
  }

  return (
    <View style={styles.container}>
      <IconButton 
        icon="close" 
        size={24} 
        onPress={() => { NfcManager.cancelTechnologyRequest(); navigation.goBack() }} 
        style={styles.closeButton}
      />

      {loading ? (
        <View style={styles.spinnerContainer}>
		<ActivityIndicator animating={true} size={150} color="#7BAF9A" />
		<Text style={{...styles.statusText, marginTop: 20}}>Sharing Profile 1...</Text>
	  </View>
      ) : (
        error ? (
          <Text style={styles.errorText}>{error}</Text>
        ) : (
          <Text style={styles.successText}>NFC Tag Written Successfully!</Text>
        )
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#d9e7d6", // Light green background
    justifyContent: "center",
    alignItems: "center",
  },
  closeButton: {
    position: "absolute",
    top: 40,
    right: 20,
  },
  spinnerContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 40,
  },
  statusText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
  },
  errorText: {
    fontSize: 18,
    color: "red",
    textAlign: "center",
	marginHorizontal: 20,
  },
  successText: {
    fontSize: 18,
    color: "green",
    textAlign: "center",
	marginHorizontal: 20,
  },
});
