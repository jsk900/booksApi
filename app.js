const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();

const secrets = require("./secrets");
const bookRoutes = require("./api/routes/books");
const orderRoutes = require("./api/routes/orders");

mongoose.connect(
    `mongodb://${secrets.user}:${
        secrets.pass
    }@ds161710.mlab.com:61710/book-store`,
    { useNewUrlParser: true }
);

app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Cors handling ................................../
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    if (req.method === "OPTIONS") {
        res.header(
            "Access-Control-Allow.Methods",
            "PUT, POST, PATCH, DELETE, GET"
        );
        res.status(200).json({});
    }
    next();
});
// Cors handling end ............................../

app.use("/books", bookRoutes);
app.use("/orders", orderRoutes);

app.use((req, res, next) => {
    const error = new Error("Not found");
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

module.exports = app;
