import {
    ScheduleCreateTransaction,
    PrivateKey
} from "@hashgraph/sdk";

export default async function submitScheduledTxn(client, privateKey, scheduletransactionEncoded) {
    privateKey = PrivateKey.fromString(privateKey)
    const transactionRebuiltRaw1 = Buffer.from(scheduletransactionEncoded, 'base64');
    const transactionRebuilt1 = ScheduleCreateTransaction.fromBytes(transactionRebuiltRaw1);
    const signedTransaction3 = await transactionRebuilt1.sign(privateKey)

    const txResponse = await signedTransaction3.execute(client);
    const receipt = await txResponse.getReceipt(client);
    console.log(`TX ${txResponse.transactionId.toString()} status: ${receipt.status}`);

    //Get the schedule ID
    const scheduleId = receipt.scheduleId;
    console.log("The schedule ID is " + scheduleId);
    return scheduleId;
}
