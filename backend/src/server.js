const express = require('express');
require('express-async-errors');
const mongoose = require('mongoose');
const cors = require('cors');
const requireDir = require('require-dir');
requireDir('./models');
const routes = require('./routes');

const app = express();

mongoose.connect('mongodb+srv://admin:admin@draco.nxvti.mongodb.net/omnistack8?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.use(express.json());
app.use(routes);
app.use(cors());

app.use((err, req, res, next) => {
    console.log(err);

    return res.status(500).json({
        message: 'An unexpected error has occured, please try again later'
    });
});

app.listen(3000);