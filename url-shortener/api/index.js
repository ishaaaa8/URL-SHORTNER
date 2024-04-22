const express = require("express");
const cors = require("cors"); // Import cors module
const { connectToMongoDB } = require("./connect");

const app = express(); // Initialize express app
const PORT = 8001;
const urlRoute = require('./routes/url');
const URL = require('./models/url');

// Enable CORS middleware
app.use(cors());

connectToMongoDB('mongodb://localhost:27017/short-url')
    .then(() => console.log('Connection established'))
    .catch(error => console.error('MongoDB connection error:', error));

app.use(express.json());
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

app.listen(PORT, () => console.log(`Server at Port ${PORT}`));
