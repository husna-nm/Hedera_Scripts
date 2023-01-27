import { AccountBalanceQuery } from "@hashgraph/sdk";

export default async function getAccountBalance(client, myAccountId) {
    try {
        // getting account balance
        const accountBalance = await new AccountBalanceQuery()
            .setAccountId(myAccountId)
            .execute(client);

        if (accountBalance) {
            console.log("The new account balance is: " + accountBalance.hbars.toTinybars() + " tinybar.");
            console.log(`The account balance for account ${myAccountId} is ${accountBalance.hbars} HBar`);

            console.log("All account Info:")
            console.log(JSON.stringify(accountBalance));
        }
        return accountBalance;
    } catch (error) {
        console.log("Err: ", error)
    }
}
