const express = require('express');
const app = express();

const bodyParser = require('body-parser');
const cors = require('cors');
const PORT = 8000;
const cookieParser = require('cookie-parser');
const apiRoutes = require('./Routes/operations');

const port = process.env.PORT || 7000; // Use port 3000 by default if PORT environment variable is not set
require('dotenv').config();
require('./connection/db')

app.use(bodyParser.json());
const allowedOrigins = ['http://localhost:3000']; // Add more origins as needed

app.use(
    cors({
        origin: function (origin, callback) {
            if (!origin || allowedOrigins.includes(origin)) {
                callback(null, true);
            } else {
                callback(new Error('Not allowed by CORS'));
            }
        },
        credentials: true, // Allow credentials
    })
);

app.get('/',(req,res)=>{
    res.send("api working")    
})

app.use(cookieParser());

app.use('/api', apiRoutes);
// Sever listening
app.listen(port, () => {
    try{
        console.log(`server is runnning on the port ${port}`);
        
    }catch(e){
        console.log(e);
        console.log("An error is accured.....");
    }
});