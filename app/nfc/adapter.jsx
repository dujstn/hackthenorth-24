import NfcManager, { Ndef, NfcTech } from "react-native-nfc-manager";

export async function readNFCTag() {
    NfcManager.setEventListener(NfcEvents.StateChanged, (state) => {
        NfcManager.requestTechnology(NfcTech.Ndef).then(() => {
            NfcManager.getTag().then((tag) => {
                const message = tag.ndefMessage[0].payload;
                console.log('Received NFC data:', Ndef.decodeMessage(message));
            }).catch((err) => {
                console.log(err);
            }).finally(() => {
                NfcManager.cancelTechnologyRequest();
            });
        }).catch((err) => {
            console.log(err);
        });
    });
};

export async function writeNFCTag(text) {
    try {
        await NfcManager.requestTechnology(NfcTech.Ndef);
        await NfcManager.ndefHandler.writeNdefMessage([Ndef.textRecord(text)]);
        console.log('Successfully wrote to tag');
    } catch (ex) {
        console.warn('Error writing to tag', ex);
    } finally {
        NfcManager.cancelTechnologyRequest();
    }
};
