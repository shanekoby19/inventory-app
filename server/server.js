const app = require('./app');
const mongoose = require('mongoose');
require('dotenv').config({
    path: 'server/config/dbconfig.env'
});

const { DB_USERNAME, DB_PASSWORD } = process.env;
const connectionString = `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@cluster0.ta4kr3w.mongodb.net/?retryWrites=true&w=majority`;

// REPLACE WITH REAL SERVER CONNECTION
mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log("Successfully connected to your MongoDB server.");

    const server = app.listen(8000, () => {
        console.log("Server is running on port 8000.")
    });

    process.on('uncaughtException', () => {
        console.log('Shutting down the server due to an unhandled exception.');
        server.close();
    })

    process.on('SIGINT', () => {
        console.log("Closing server due to an interrupted signal (Ctrl + C).");
        server.close();
    })
})
.catch((err) => console.log('Error connecting to your mongodb database. -- ', err));

