const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config({
    path: 'server/config/dbconfig.env'
});

// Custom middleware
const { isAuthenticated } = require('./controllers/authController');
const handleAppErrors = require('./utils/appErrorHandler');

// Routers
const userRouter = require('./routes/userRoutes');
const warehouseRouter = require('./routes/warehouseRoutes');
const shelfRouter = require('./routes/shelfRoutes');
const containerRouter = require('./routes/containerRoutes');
const itemRouter = require('./routes/itemRoutes');
const authRouter = require('./routes/authRoutes');

const app = express();

// Third party middleware
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
}));
app.use(cookieParser(process.env.COOKIE_SECRET))


// Apply routers to routes.
app.use('/auth', authRouter);
app.use('/users', userRouter);

app.use(isAuthenticated); // Authorize the user for all database resources
app.use('/warehouses', warehouseRouter);
app.use('/shelves', shelfRouter);
app.use('/containers', containerRouter);
app.use('/items', itemRouter);

// Error handling
app.use(handleAppErrors);

module.exports = app;