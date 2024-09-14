import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import NfcManager, {Ndef, NfcTech} from 'react-native-nfc-manager';
import { HCESession, NFCTagType4NDEFContentType, NFCTagType4 } from 'react-native-hce';
import { NdefTools } from 'react-native-nfc-sdk';

let session;
const ndef = new NdefTools();

NfcManager.start().then(() => {
	console.log("NFC started");
}).catch((error) => {
	console.warn("NFC failed to start", error);
});

async function readNdef(){
    const readTag = async () => {
        // The read tag function sets an event handler for when a tag
        // is read and returns a js object of
        // {id: 'nfc-id', content: 'decoded-payload'}
        try {
          const tag = await ndef.readTag();
          if (tag) console.log("Got tag", tag.content);   
        } catch (err) {
          console.err(err);
        } 
        ndef.cancelRequest(); // Cancel the request to the nfc hardware
    }
	console.log(await readTag());
}

const startSession = async () => {
	const tag = new NFCTagType4({
	  type: NFCTagType4NDEFContentType.Text,
	  content: "Hello world",
	  writable: false
	});
  
	session = await HCESession.getInstance();
	session.setApplication(tag);
	await session.setEnabled(true);
  }

  
async function writeNdef(value){
	const emulate = () => {
        // The start emulation function receives a content, which
        // corresponds to a NFC tag payload, and a writable boolean,
        // which will define if the NFC card you emulate can be written
        // The second parameter is a callback which will be called once
        // your emulated tag is read
        hce.startEmulation(
          {content: 'Hello World!', writable: false},
          () => {
            console.log('Yes!');
            setTimeout(() => console.log('No'), 15000);
          }
        )
    }
	emulate()
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
