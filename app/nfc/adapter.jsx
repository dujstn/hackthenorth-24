import NfcManager, { NfcTech } from "react-native-nfc-manager";

export async function readNFCTag() {
    NfcManager.setEventListener({
        onStateChange: (state) => {
            NfcManager.requestTechnology(NfcTech.NfcA).then(() => {
                NfcManager.getTag().then((tag) => {
                    const message = tag.ndefMessage[0].payload;
                    console.log('Received NFC data:', NfcManager.nfcAHandler.textDecoder(message));
                }).catch((err) => {
                    console.log(err);
                }).finally(() => {
                    NfcManager.cancelTechnologyRequest();
                });
            }).catch((err) => {
                console.log(err);
            });
        }
    })
};

export async function writeNFCTag(text) {
    try {
        await NfcManager.requestTechnology(NfcTech.NfcA);
        await NfcManager.nfcAHandler.writeNdefMessage([NfcManager.nfcAHandler.textRecord(text)]);
        console.log('Successfully wrote to tag');
    } catch (ex) {
        console.warn('Error writing to tag', ex);
    } finally {
        NfcManager.cancelTechnologyRequest();
    }
};