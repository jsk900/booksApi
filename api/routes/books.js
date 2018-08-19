const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
    res.status(200).json({
        message: "Handling GET requests to /books"
    });
});

router.post("/", (req, res, next) => {
    res.status(201).json({
        message: "Handling POST requests to /books"
    });
});

router.get("/:bookId", (req, res, next) => {
    const id = req.params.bookId;
    res.status(200).json({
        message: "Handling GET requests to /books:id",
        id: id
    });
});

router.patch("/:bookId", (req, res, next) => {
    const id = req.params.bookId;
    res.status(200).json({
        message: "Handling PATCH requests to /books:id",
        id: id
    });
});

router.delete("/:bookId", (req, res, next) => {
    const id = req.params.bookId;
    res.status(200).json({
        message: "Handling DELETE requests to /books:id",
        id: id
    });
});

module.exports = router;
