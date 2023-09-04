require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const expenseRoutes = require('./routes/expenseRoutes');
const categoryRoutes = require('./routes/categoryRoutes');

const app = express();

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(process.env.PORT), () => {
            console.log('Connected to db & listening on port', process.env.PORT);
        }
    }).catch(err => {
        console.log(err);
    })

app.use(express.json());
app.use('/api/expenses', expenseRoutes);
app.use('/api/categories', categoryRoutes);