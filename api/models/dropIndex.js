import mongoose from "mongoose";

const dropUserIdUniqueIndex = async () => {
  try {
    await mongoose.connect("mongodb+srv://jugal:jugal123@mern-blog.anxshzk.mongodb.net/mern-blog?retryWrites=true&w=majority&appName=mern-blog", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const db = mongoose.connection.db;
    const collection = db.collection("posts");

    // List indexes
    const indexes = await collection.indexes();
    console.log("Indexes before dropping:", indexes);

    // Drop the unique index on userId
    await collection.dropIndex("userId_1");

    // List indexes after dropping
    const updatedIndexes = await collection.indexes();
    console.log("Indexes after dropping:", updatedIndexes);

    console.log("Unique index on userId dropped successfully.");
  } catch (error) {
    console.error("Error dropping unique index:", error);
  } finally {
    await mongoose.connection.close();
  }
};

dropUserIdUniqueIndex();
