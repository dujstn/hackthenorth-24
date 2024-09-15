import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import NfcManager, {Ndef, NfcTech} from 'react-native-nfc-manager';

NfcManager.start().then(() => {
	console.log("NFC started successfully");
}).catch(e => {
	// TODO: DISPLAY ERROR MESSAGE
});

async function writeNdef(url) {
	try {
		await NfcManager.requestTechnology(NfcTech.Ndef);
		const bytes = Ndef.encodeMessage([Ndef.uriRecord(url)]);
		if (bytes) {
			await NfcManager.ndefHandler.writeNdefMessage(bytes);
		} else {
			throw new Error('Failed to encode NDEF');
		}
	} catch (ex) {
		console.warn('Oops!', ex);
	} finally {
		console.log("Done!");
		NfcManager.cancelTechnologyRequest();
	}
}

export default function Index(){
	return(
		<View style={styles.container}>
			<TouchableOpacity onPress={writeNdef}>
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
	}
})