const express=require('express');
const router=require.Router();
const {handleGenerateNewShortURL} = require("../controllers/url");

router.post('/',handleGenerateNewShortURL);


module.exports=router;