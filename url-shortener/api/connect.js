const mongoose = require("mongoose");

async function connectToMongoDB(url) {
  try {
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  } catch (err) {
    console.error("Failed to connect to MongoDB:", err);
    throw err;
  }
}

module.exports = {
  connectToMongoDB,
};
