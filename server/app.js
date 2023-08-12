const express = require('express');
const cors = require('cors');

const userRouter = require('./routes/userRoutes');
const warehouseRouter = require('./routes/warehouseRoutes');
const shelfRouter = require('./routes/shelfRoutes');
const containerRouter = require('./routes/containerRoutes');

const appErrorHandler = require('./utils/appErrorHandler');

const app = express();

app.use(express.json());
app.use(cors());


// Routers
app.use('/users', userRouter);
app.use('/warehouses', warehouseRouter);
app.use('/shelves', shelfRouter);
app.use('/containers', containerRouter);

// Error handling
app.use(appErrorHandler);


module.exports = app;