import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import NfcManager, {Ndef, NfcTech} from 'react-native-nfc-manager';

NfcManager.start().then(() => {
	console.log("NFC started successfully");
}).catch(e => {
	console.warn("NFC failed to start");
	// TODO: DISPLAY ERROR MESSAGE IN GUI
});

async function getUrl() {
	return "https://duckduckgo.com";
}

async function writeNdef() {
	const url = await getUrl();
	let success = false;
	try {
		const tech = await NfcManager.requestTechnology(NfcTech.Ndef);
		if (tech != NfcTech.Ndef) {
			throw new Error('Wrong NFC technology');
		}
		const bytes = Ndef.encodeMessage([Ndef.uriRecord(url)]);
		if (bytes.length) {
			await NfcManager.ndefHandler.writeNdefMessage(bytes);
			success = true;
		} else {
			throw new Error('Failed to encode NDEF (0 bytes)');
		}
	} catch (e) {
		console.warn('An error occured!', e);
	} finally {
		await NfcManager.cancelTechnologyRequest();
		return success;
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
});
