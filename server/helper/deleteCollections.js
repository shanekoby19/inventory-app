const mongoose = require('mongoose');
require('dotenv').config({
    path: 'server/config/dbconfig.env'
});

async function deleteAllCollections() {
    const collections = await mongoose.connection.db.collections();
  
    for (let collection of collections) {
      if(collection.collectionName !== 'users') await collection.deleteMany();
    }
  
    console.log('All collections removed.');
    mongoose.connection.close();
}

const { DB_USERNAME, DB_PASSWORD } = process.env;
const connectionString = `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@cluster0.ta4kr3w.mongodb.net/?retryWrites=true&w=majority`;

// REPLACE WITH REAL SERVER CONNECTION
mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
  deleteAllCollections().catch(console.error)
});