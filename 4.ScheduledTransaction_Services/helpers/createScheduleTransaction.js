import {
    TransferTransaction,
    ScheduleCreateTransaction,
    Hbar, PrivateKey
} from "@hashgraph/sdk";

export default async function createScheduleTransaction(client, accountId1, accountId2, privateKey1, memo) {

    privateKey1 = PrivateKey.fromString(privateKey1)
    //Create a transaction to schedule
    const transaction = new TransferTransaction()
        .addHbarTransfer(accountId1, Hbar.fromTinybars(-10))
        .addHbarTransfer(accountId2, Hbar.fromTinybars(10));

    //Schedule a transaction
    const scheduletransaction = new ScheduleCreateTransaction()
        .setScheduledTransaction(transaction)
        .setScheduleMemo(memo)
        .setAdminKey(privateKey1)
        .freezeWith(client);

    const scheduletransactionByte = scheduletransaction.toBytes();
    const scheduletransactionEncoded = Buffer.from(scheduletransactionByte).toString('base64');
    console.log("Transaction is encoded")
    return scheduletransactionEncoded;
}