const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const errorHandler = require('./middleware/errorHandler');

const app = express();
app.use(bodyParser.json());

// Routes
app.use('/users', userRoutes);
app.use('/product', productRoutes);

// Error Handling Middleware
app.use(errorHandler);

module.exports = app;
