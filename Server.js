const express = require('express')
const bodyParser = require('body-parser');
const path=require('path');
const http=require('http');
const app = express();
const api = require('./server/routers/api');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use((req,res,next)=>{
    // console.log(`${req.protocol}://${req.get('host')}${req.originalUrl}`);
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Headers","Origin,X-Requested-With,Content-Type,Accept,Authorization");
    if(req.method==='OPTIONS'){
        res.header("Access-Control-Allow-Methods","Put,Post,Patch,Delete,Get");
        return res.status(200).json({});
    }
    next();
})
app.use('/api',api);
console.log(api)
const port = process.env.PORT || '3000';
app.set('port',port);
const server = http.createServer(app);
server.listen(port,()=>console.log(`Running on ${port}`));
