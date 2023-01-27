import { AccountBalanceQuery, Hbar, TransferTransaction } from "@hashgraph/sdk";

export default async function transferHbars(client, myAccountId, toAccountID, amount) {
    try {
        console.log("___________________________________________________");
        console.log("ACCOUNT BALANCE: BEFORE TRANSFER");
        console.log("___________________________________________________");
        //Verify the account balance
        let getSenderAccountBalance = await new AccountBalanceQuery()
            .setAccountId(myAccountId)
            .execute(client);

        console.log("Sender Account(" + myAccountId + "): " + getSenderAccountBalance.hbars + " hbar.");
        let getRecieverAccountBalance = await new AccountBalanceQuery()
            .setAccountId(toAccountID)
            .execute(client);

        console.log("Receiver Account(" + toAccountID + ":)" + getRecieverAccountBalance.hbars + " hbar.");
        console.log("___________________________________________________");
        //Create the transfer transaction
        const sendHbarTxHash = await new TransferTransaction()
            .addHbarTransfer(myAccountId, new Hbar(-amount))
            .addHbarTransfer(toAccountID, new Hbar(amount))
            .execute(client);
        console.log("___________________________________________________");
        console.log("TRANSACTION DETAILS");
        console.log("___________________________________________________");
        //Verify the transaction reached consensus
        // console.log(JSON.stringify(sendHbarTxHash));
        console.log("Transaction Id: " + sendHbarTxHash.transactionId.toString());
        const transactionReceipt = await sendHbarTxHash.getReceipt(client);
        console.log("Transaction status: " + transactionReceipt.status.toString());

        //Request the cost of the query
        const queryCost = await new AccountBalanceQuery()
            .setAccountId(toAccountID)
            .getCost(client);

        console.log("The cost of query is: " + queryCost);
        console.log("___________________________________________________");
        console.log("___________________________________________________");
        console.log("ACCOUNT BALANCE: AFTER TRANSFER");
        console.log("___________________________________________________");
        //Check the new account's balance
        getSenderAccountBalance = await new AccountBalanceQuery()
            .setAccountId(myAccountId)
            .execute(client);
        console.log("Sender Account(" + myAccountId + "): " + getSenderAccountBalance.hbars + " hbar.")

        getRecieverAccountBalance = await new AccountBalanceQuery()
            .setAccountId(toAccountID)
            .execute(client);

        console.log("Reciever Account(" + toAccountID + "): " + getRecieverAccountBalance.hbars + " hbar.")
        console.log("___________________________________________________");
    } catch (error) {
        console.log("Err: ", error)
    }
}
