require("dotenv").config(); // Load environment variables
const express = require("express");
const cors = require("cors");

const { connectToMongoDB } = require("./connect");
const urlRoute = require('./routes/url');
const URL = require('./models/url');

const app = express();
const PORT = process.env.PORT || 8001;
const MONGODB_URI = process.env.MONGODB_URI;

app.use(cors());
app.use(express.json());

// Connect to MongoDB Atlas
connectToMongoDB(MONGODB_URI)
  .then(() => console.log("✅ Connected to MongoDB Atlas"))
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1); // Exit if DB fails to connect
  });

// Routes
app.use('/url', urlRoute);

// Redirect Route
app.get('/:shortId', async (req, res) => {
  try {
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate(
      { shortId },
      {
        $push: {
          visitHistory: {
            timestamp: Date.now(),
          },
        },
      }
    );

    if (!entry) {
      return res.status(404).json({ error: 'Short URL not found' });
    }

    res.redirect(entry.redirectURL);
  } catch (err) {
    console.error("Error fetching short URL:", err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Start server
app.listen(PORT, () => console.log(`🚀 Server running on Port ${PORT}`));
