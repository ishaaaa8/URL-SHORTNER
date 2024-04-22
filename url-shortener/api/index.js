const express=require("express");
const app=express();
const PORT = 8001;
const urlRoute = require('./routes/url');

app.use('/url',urlRoute);

app.listen(PORT, () => console.log(`Server at Port 8001`));

