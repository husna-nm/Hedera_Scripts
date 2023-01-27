# Task 5
Create a new wallet with an initial balance of 20 Hbar, and 3 keys
(Account1, Account2 and Account3) in a key list, with a key
threshold of 2 (2 Signers out of the three keys must sign).
Create transaction to transfer 10 Hbar to Account4 and sign it with
Account1 only, show that the transfer fails.
Now create a new transaction where Account1 and Account2
sign the transaction and show that the transfer succeeds.

## Instructions
- using node v18.9.0 (npm v8.19.1)
- Clone Repo
- go to root (5.Multi_Sig)
- `npm install`

### To run script
run command  `npm start`

### output
```
Key list created:  KeyList {
  _keys: [
    PublicKey { _key: [PublicKey] },
    PublicKey { _key: [PublicKey] },
    PublicKey { _key: [PublicKey] }
  ],
  _threshold: 2
}

The Multi Signature Account ID is: 0.0.15326
The new account balance is: 22000000000 tinybar.
The account balance for account 0.0.12751 is 220 ℏ HBar
All account Info:
{"hbars":"220 ℏ","tokens":[]}
Account 4 balance (Initial value):  0.0.12751
The transaction status is SUCCESS
The new account balance is: 23000000000 tinybar.
The account balance for account 0.0.12751 is 230 ℏ HBar
All account Info:
{"hbars":"230 ℏ","tokens":[]}
Account 4 balance (After Transfer):  0.0.12751
```