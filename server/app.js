const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config({
    path: 'server/config/dbconfig.env'
});

const userRouter = require('./routes/userRoutes');
const warehouseRouter = require('./routes/warehouseRoutes');
const shelfRouter = require('./routes/shelfRoutes');
const containerRouter = require('./routes/containerRoutes');
const itemRouter = require('./routes/itemRoutes');
const authRouter = require('./routes/authRoutes');

const appErrorHandler = require('./utils/appErrorHandler');

const app = express();

app.use(express.json());
app.use(cors());
app.use(cookieParser(process.env.COOKIE_SECRET))


// Routers
app.use('/users', userRouter);
app.use('/warehouses', warehouseRouter);
app.use('/shelves', shelfRouter);
app.use('/containers', containerRouter);
app.use('/items', itemRouter);
app.use('/auth', authRouter);

// Error handling
app.use(appErrorHandler);

module.exports = app;