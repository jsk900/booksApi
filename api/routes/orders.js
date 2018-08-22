const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Order = require("../models/order");

router.get("/", (req, res, next) => {
    Order.find()
        .exec()
        .then(docs => {
            console.log(docs);
            if (docs.length > 0) {
                res.status(200).json({ docs });
            } else {
                res.status(404).json({
                    message: "No records found on Database"
                });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

router.post("/", (req, res, next) => {
    //Here I would get data sent from frontend as json data.......
    const order = new Order({
        _id: new mongoose.Types.ObjectId(),
        bookId: "123iuoiuoi",
        userId: "456kljlkjlkj",
        // orderDate: "",
        qtyOrdered: 10
    });
    order
        .save()
        .then(result => {
            console.log(result);
            res.status(201).json({
                message: "Handling POST requests to /orders",
                createdOrder: result
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

router.get("/:orderId", (req, res, next) => {
    const id = req.params.orderId;
    Order.findById(id)
        .exec()
        .then(doc => {
            console.log(doc);
            if (doc) {
                res.status(200).json({ doc });
            } else {
                res.status(404).json({
                    message: "This ID was not found on Database"
                });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

// Not expected to use this for orders at this time. But good to have the code for future refs
// router.patch("/:orderId", (req, res, next) => {
//     const id = req.params.orderId;
//     Order.update(
//         { _id: id },
//         { $set: { qtyOrdered: req.params.newQtyOrdered, more: " stuff etc" } }
//     )
//         .exec()
//         .then(result => {
//             console.log(result);
//             res.status(200).json(result);
//         })
//         .catch(err => {
//             console.log(err);
//             res.status(500).json({ error: err });
//         });
// });

router.delete("/:orderId", (req, res, next) => {
    const id = req.params.orderId;
    Order.remove({ _id: id })
        .exec()
        .then(result => {
            res.status(200).json(result);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        });
});

module.exports = router;
