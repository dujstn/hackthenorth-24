import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import NfcManager, {nfcManager, NfcTech} from 'react-native-nfc-manager';

NfcManager.start();

async function readNdef(){
	console.log("Testing...");
    try {
		// register for the NFC tag with NDEF in it
		await NfcManager.requestTechnology(NfcTech.Ndef);
		// the resolved tag object will contain `ndefMessage` property
		const tag = await NfcManager.getTag();
		console.warn('Tag found', tag);
	  } catch (ex) {
		console.warn('Oops!', ex);
	  } finally {
		// stop the nfc scanning
		NfcManager.cancelTechnologyRequest();
	  }
}

export default function Index(){
	return(
		<View style={styles.container}>
			<TouchableOpacity onPress={readNdef}>
				<Text>
					Scan a tag
				</Text>
			</TouchableOpacity>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	}
})