const express = require("express");
const bodyParser = require("body-parser");
const bookRouter = require("./source/routers/bookRooter");
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/book", bookRouter);
app.listen(8080, () => console.log("API RUNNING IN PORT 8080"))