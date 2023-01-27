import {
  PrivateKey,
  KeyList,
} from '@hashgraph/sdk';

export default async function createKeyList(privateKey1, privateKey2, privateKey3) {
  const key1 = PrivateKey.fromString(privateKey1).publicKey;
  const key2 = PrivateKey.fromString(privateKey2).publicKey;
  const key3 = PrivateKey.fromString(privateKey3).publicKey;

  let keys = [key1, key2, key3];
  //Create a key list with 3 keys , 2 are mandatory
  const keyList = new KeyList(keys, 2);
  return keyList;
};


