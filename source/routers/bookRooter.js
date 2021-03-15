const express = require("express");
const bookController = require("../controllers/bookController");
//Or
//const {getBooks, addBook, updateBook, deleteBook} = require("../controllers/bookController");
const bookRouter = express.Router();
bookRouter.get("/", bookController.getBooks);
// bookRouter.get("/", getBooks)
bookRouter.post("/", bookController.addBook);
// bookRouter.get("/", addBook)
bookRouter.put("/:id", bookController.updateBook);
// bookRouter.get("/", updateBook)
bookRouter.delete("/:id", bookController.deleteBook);
// bookRouter.get("/", deleteBook)
module.exports = bookRouter;