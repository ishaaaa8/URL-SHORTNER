require("dotenv").config(); // Load environment variables from .env
const express = require("express");
const cors = require("cors");
const { connectToMongoDB } = require("./connect");

const app = express();
const PORT = process.env.PORT || 8001; // fallback to 8001 if not set
const MONGODB_URI = process.env.MONGODB_URI;

const urlRoute = require('./routes/url');
const URL = require('./models/url');

app.use(cors());
app.use(express.json());

connectToMongoDB(MONGODB_URI)
    .then(() => console.log('Connection established'))
    .catch(error => console.error('MongoDB connection error:', error));

app.use('/url', urlRoute);

app.get('/:shortId', async (req, res) => {
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
});

app.listen(PORT, () => console.log(`Server running on Port ${PORT}`));
