import NfcManager, { NfcTech } from "react-native-nfc-manager";

export async function readNFCTag() {
    NfcManager.setEventListener({
        onStateChange: (state) => {
            NfcManager.requestTechnology(NfcTech.NfcA).then(() => {
                NfcManager.getTag().then((tag) => {
                    const message = tag.ndefMessage[0].payload;
                    console.log('Received NFC data:', NfcManager.ndef.textDecoder(message));
                }).catch((err) => {
                    console.log(err);
                }).finally(() => {
                    // NfcManager.cancelTechnologyRequest();
                });
            })
        }
    })
};

export async function writeNFCTag(text) {
    try {
        await NfcManager.requestTechnology(NfcTech.NfcA);
        await NfcManager.writeNdefMessage([NfcManager.ndef.textRecord(text)]);
        console.log('Successfully wrote to tag');
    } catch (ex) {
        console.warn('Error writing to tag', ex);
    } finally {
        NfcManager.cancelTechnologyRequest();
    }
};