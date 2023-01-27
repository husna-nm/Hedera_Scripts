import { PrivateKey, AccountCreateTransaction, Hbar } from "@hashgraph/sdk";

export default async function createAccount(client) {
    try {
        //Create new keys
        const newAccountPrivateKey = PrivateKey.generateED25519();
        const newAccountPublicKey = newAccountPrivateKey.publicKey;
        console.log("newAccountPrivateKey", newAccountPrivateKey.toStringRaw())
        console.log("newAccountPublicKey", newAccountPublicKey.toStringRaw())
        //Create a new account with 1,000 tinybar starting balance
        const newAccountTransactionResponse = await new AccountCreateTransaction()
            .setKey(newAccountPublicKey)
            .setInitialBalance(new Hbar(200))
            .execute(client);

        // Get the new account ID
        const getReceipt = await newAccountTransactionResponse.getReceipt(client);
        const newAccountId = getReceipt.accountId;

        console.log("The new account ID is: " + newAccountId);
        return newAccountId;
    } catch (error) {
        console.log("Err: ", error)
    }
}
