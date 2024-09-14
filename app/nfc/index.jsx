import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import NfcManager, {Ndef, NfcTech} from 'react-native-nfc-manager';

NfcManager.start().then(() => {
	console.log("NFC started");
}).catch((error) => {
	console.warn("NFC failed to start", error);
});

async function readNdef(){
    try {
		await NfcManager.requestTechnology([NfcTech.NfcA, NfcTech.Ndef]);
		const tag = await NfcManager.getTag();
		console.warn('Tag found', { tag, payload: tag?.ndefMessage });
	  } catch (e) {
		console.warn('Read failed', { e });
	  } finally {
		await NfcManager.cancelTechnologyRequest();
	  }
}

async function writeNdef(value){
	try {
		const tech = await NfcManager.requestTechnology([NfcTech.NfcA, NfcTech.Ndef]);
		const handler = tech == NfcTech.Ndef ? NfcManager.ndefHandler : NfcManager.nfcAHandler;
		const bytes = Ndef.encodeMessage([Ndef.textRecord(value)]);
		if (bytes) {
			(tech == NfcTech.Ndef ? handler.writeNdefMessage : handler.transceive)(bytes);
		}
	} catch (e) {
		console.warn('Write failed', e);
	} finally {
		await NfcManager.cancelTechnologyRequest();
	}
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
