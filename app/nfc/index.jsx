import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import NfcManager, {Ndef, nfcManager, NfcTech} from 'react-native-nfc-manager';
import { readNFCTag, writeNFCTag } from "./adapter";

NfcManager.start();

async function readNdef(){
	console.log("Testing...");
    try {
		// register for the NFC tag with NDEF in it
		await NfcManager.requestTechnology(NfcTech.Ndef);
		// the resolved tag object will contain `ndefMessage` property
		const tag = await NfcManager.getTag();
		console.warn('Tag found', tag);
		console.log('Payload', tag.ndefMessage[0].payload);
	  } catch (ex) {
		console.warn('Oops!', ex);
	  } finally {
		// stop the nfc scanning
		NfcManager.cancelTechnologyRequest();
	  }
}

async function writeNdef(value){
	let result = false;

	try {
		await NfcManager.requestTechnology(NfcTech.Ndef);
		const payload = buildPayload(value);
		
		await NfcManager.ndefHandler.writeNdefMessage(payload);
		console.log('success!' + payload);
	} catch (e) {
		console.log('Could not write.', e);
	} finally {
		NfcManager.cancelTechnologyRequest();
	}
}

function buildPayload(value){
	return Ndef.encodeMessage([Ndef.uriRecord(value)])
}

export default function Index(){
	return(
		<View style={styles.container}>
			<TouchableOpacity onPress={readNFCTag} style={styles.readNFC}>
				<Text>
					Scan a tag
				</Text>
			</TouchableOpacity>
			<TouchableOpacity onPress={() => {writeNFCTag("Hello World")}} style={styles.writeNFC}>
				<Text>
					Write a tag
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
		gap: 10
	},
	readNFC: {
		padding: 3,
		borderWidth: 3,
	},
	writeNFC: {
		padding: 3,
		borderWidth: 3,
	}
})