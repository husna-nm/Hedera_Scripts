# Task 4
Create a script that creates a scheduled transaction to transfer 10
Hbar from Account1 to Account2.
Serialise and export the transaction to a base 64 format and use
this as the input to the next step.
Make a second script that reads in the serialised format and
provides the required signature and submit it.

## Instructions
- using node v18.9.0 (npm v8.19.1)
- Clone Repo
- go to root (4.ScheduledTransaction_Services)
- `npm install`

### To run script
run command  `npm start`

### output
Transaction is encoded
TX 0.0.12739@1674832017.466606233 status: SUCCESS
The schedule ID is 0.0.16195
The scheduledId you queried for is:  0.0.16195
The memo for it is:  This messege submitted at 1674832026176
It got created by:  0.0.12739
It got payed by:  0.0.12739
The expiration time of the scheduled tx is:  2023-01-27T15:37:06.000Z
The time of execution of the scheduled tx is:  2023-01-27T15:07:06.000Z

