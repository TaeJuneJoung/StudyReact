import { MongoClient, ObjectId } from "mongodb";

import { MONGODB_PASSWORD, MONGODB_USER } from "@/_secret";

const collectList = {
  meetups: "meetups",
};

async function _connectDB() {
  const client = await MongoClient.connect(
    `mongodb+srv://${MONGODB_USER}:${MONGODB_PASSWORD}@nextjsstudy.wlk59ct.mongodb.net/meetups?retryWrites=true&w=majority&appName=NextJSStudy`
  );

  return client;
}

function _closeDB(client) {
  client.close();
}

function _selectCollection(client, collect) {
  const db = client.db();
  const collection = db.collection(collect);
  return collection;
}

/**
 * InsertRowData
 * @param {*} payload: formData
 * @returns result
 * : 작성한 데이터 MongoDB에 추가
 */
export async function insertRowData(payload) {
  const client = await _connectDB();
  const collection = _selectCollection(client, collectList.meetups);
  const result = await collection.insertOne(payload);
  _closeDB(client);

  return result;
}

/**
 * getSomeData
 * @param {*} payload: option
 * @returns dataArray
 * : 옵션으로 설정한 데이터에 맞는 데이터 배열 반환
 */
export async function getSomeData(payload) {
  const client = await _connectDB();
  const collection = _selectCollection(client, collectList.meetups);
  const dataArray = await collection.find(payload).toArray();
  _closeDB(client);

  return dataArray;
}

/**
 * getDataIdRow
 * @param {*} id
 * @returns data
 * : id값에 맞는 데이터 Row 반환
 */
export async function getDataIdRow(id) {
  const client = await _connectDB();
  const collection = _selectCollection(client, collectList.meetups);
  const data = await collection.findOne({ _id: new ObjectId(id) });
  _closeDB(client);

  return data;
}
