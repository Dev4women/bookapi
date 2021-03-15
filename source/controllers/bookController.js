const Book = require("../models/book")
const getBooks = async (req, res) => {
  try {
    const result = await Book.find();
    if (!result) return res.status(400).json({ err: "ERROR" })
    return res.status(200).json(result);
  } catch (err) {
    console.log(err.message)
    return res.status(500).json({ msg: "INTERNAL SERVER ERROR !" })
  }
}
const addBook = async (req, res) => {
}
const updateBook = async (req, res) => {
}
const deleteBook = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) res.status(400).json({ err: "ERROR" });
    const result = await Book.deleteOne({ _id: id });
    if (!result) return res.status(400).json({ msg: "ERROR" });
    return res.status(200).json({ result });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ msg: "INTERNAL SERVER ERROR !" });
  }
}
module.exports = {
  getBooks,
  addBook,
  updateBook,
  deleteBook,
}