const express = require('express');
const serverless = require('serverless-http');
const app = express();
const authRouter = require("./routers/youtube");

app.use(express.static('public'));
app.use('/youtube',authRouter);

app.listen(3000, function(){
    console.log('Conneted 3000 port!');
});