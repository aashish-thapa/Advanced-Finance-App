require('dotenv').config(); // Load environment variables before using them

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const audit = require("express-requests-logger");

const {readdirSync} = require('fs');
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

app.use(audit());



// Simple route
readdirSync('./routes').map((route)=>
    app.use('/api/v1', require('./routes/'+ route)));

// Database connection function
const connectDB = async () => {
    try {
        mongoose.set('strictQuery', false);
        await mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("DB Connected Successfully");
    } catch (error) {
        console.error("DB Connection Error:", error.message);
        process.exit(1); // Exit the process with failure
    }
};

// Start server and connect to DB
const startServer = () => {
    connectDB();
    const PORT = process.env.PORT || 3000; // Default to 3000 if PORT is not defined
    app.listen(PORT, () => {
        console.log(`Listening to PORT ${PORT}`);
    });

    app.on('request', (request, response) => {
        let body = [];
        request.on('data', (chunk) => {
            body.push(chunk);
        }).on('end', () => {
            body = Buffer.concat(body).toString();
    
        console.log(`==== ${request.method} ${request.url}`);
        console.log('> Headers');
            console.log(request.headers);
    
        console.log('> Body');
        console.log(body);
            response.end();
        });
    })
}

startServer();

app.use((req, res, next) => {
    console.log(req);
    next();
  });
  