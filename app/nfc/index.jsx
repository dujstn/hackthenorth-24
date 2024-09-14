import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import NfcManager, {Ndef, NfcTech} from 'react-native-nfc-manager';

NfcManager.start().then(() => {
	console.log("NFC started");
}).catch((error) => {
	console.warn("NFC failed to start", error);
});

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

async function readNdef_old(){
	// console.log("Testing...");
    // try {
	// 	// register for the NFC tag with NDEF in it
	// 	await NfcManager.requestTechnology(NfcTech.NfcA);
	// 	// the resolved tag object will contain `ndefMessage` property
	// 	// const tag1 = await NfcManager.ndefHandler.getNdefMessage();
	// 	// const tag2 = await NfcManager.getTag();
	// 	const tag3 = await NfcManager.getNdefMessage();
	// 	console.warn('Tag found', { tag1, tag2, tag3 });
	//   } catch (ex) {
	// 	console.warn('Oops!', ex);
	//   } finally {
	// 	// stop the nfc scanning
	// 	NfcManager.cancelTechnologyRequest();
	//   }
}

async function writeNdef(value){
	let result = false;

	try {
		await NfcManager.requestTechnology(NfcTech.Ndef);
		const payload = Ndef.encodeMessage([Ndef.uriRecord(value)]);
		if (payload) {
			await NfcManager.ndefHandler.writeNdefMessage(payload);
		}
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
			<TouchableOpacity onPress={readNdef} style={styles.readNFC}>
				<Text>
					Scan a tag
				</Text>
			</TouchableOpacity>
			<TouchableOpacity onPress={() => {writeNdef("https://google.com")}} style={styles.writeNFC}>
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
});
