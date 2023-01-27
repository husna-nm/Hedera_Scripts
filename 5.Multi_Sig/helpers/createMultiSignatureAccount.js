import {
    AccountCreateTransaction,
    Hbar,
} from '@hashgraph/sdk';

export default async function createMultiSignatureAccount(client, keys) {
    const multiSigAccount = await new AccountCreateTransaction()
        .setKey(keys)
        .setInitialBalance(Hbar.fromString('20'))
        .execute(client);

    // Get the new account ID
    const getReceipt = await multiSigAccount.getReceipt(client);
    const multiSigAccountID = getReceipt.accountId;

    return multiSigAccountID;
};