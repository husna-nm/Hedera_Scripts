import { PrivateKey, Hbar, TransferTransaction } from "@hashgraph/sdk";

export default async function transferHbars(client, multiSigAccountID, accountId4, privateKey1, privateKey2) {

    const transaction = new TransferTransaction()
        .addHbarTransfer(multiSigAccountID, Hbar.fromString(`-10`))
        .addHbarTransfer(accountId4, Hbar.fromString('10'))
        .freezeWith(client);

    const signedTxn = await transaction.sign(PrivateKey.fromString(privateKey1));

    const multiSignedTxn = await signedTxn.sign(
        PrivateKey.fromString(privateKey2)
    );

    //Sign with the client operator key to pay for the transaction and submit to a Hedera network
    const txResponse = await multiSignedTxn.execute(client);

    //Get the receipt of the transaction
    const receipt = await txResponse.getReceipt(client);

    //Get the transaction status
    const transactionStatus = receipt.status;
    console.log('The transaction status is ' + transactionStatus.toString());
}
