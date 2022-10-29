const { MongoClient } = require("mongodb"); //connect to my mongodb database

const newListing = {
  name: "JJ",
  summary: "none",
  bedrooms: 2,
  beds: 10,
};
async function main() {
  const uri = "mongodb+srv://demo:demo@cluster0.wl3hijw.mongodb.net/test";

  //create instance of mongo client
  const client = new MongoClient(uri);
  //connect cluster
  try {
    await client.connect();
    // await listDatabases(client);
    // await createListing(client, newListing);
    // await findOneListingByName(client, "JJ");
    await updateListingByName(client, "JJ", { name: "MM" });
  } catch (e) {
    console.error(e);
  } finally {
    client.close();
  }
}
main().catch(console.error);

async function createListing(client, newListing) {
  const result = await client
    .db("sample_airbnb")
    .collection("listingsAndReviews")
    .insertOne(newListing);
  // .insertMany([]) 插入多个
  console.log(
    `new Listing was created with the following id: ${result.insertedId}`
  );
}

async function findOneListingByName(client, nameOfListing) {
  const result = await client
    .db("sample_airbnb")
    .collection("listingsAndReviews")
    .findOne({ name: nameOfListing });
  //find()
  if (result) {
    console.log(`Listing found with name '${nameOfListing}'`);
  } else {
    console.log(`no Listing found with name '${nameOfListing}'`);
  }
}

async function updateListingByName(client, nameOfListing, updateListing) {
  const result = await client
    .db("sample_airbnb")
    .collection("listingsAndReviews")
    .updateOne({ name: nameOfListing }, { $set: updateListing });
  if (result) {
    console.log(`update Listing found with name '${updateListing}'`);
  } else {
    console.log(`no Listing found with name '${nameOfListing}'`);
  }
}

async function listDatabases(client) {
  const databaseList = await client.db().admin().listDatabases();
  console.log("databaseList:");
  databaseList.databases.forEach((db) => {
    console.log(`- ${db.name}`);
  });
}
