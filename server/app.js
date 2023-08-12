const express = require('express');
const cors = require('cors');

const userRouter = require('./routes/userRoutes');
const warehouseRouter = require('./routes/warehouseRoutes');
const shelfRouter = require('./routes/shelfRoutes');

const appErrorHandler = require('./utils/appErrorHandler');

const app = express();

app.use(express.json());
app.use(cors());


// Routers
app.use('/users', userRouter);
app.use('/warehouse', warehouseRouter);
app.use('/shelf', shelfRouter);

// Error handling
app.use(appErrorHandler);


module.exports = app;