const mongoose = require("mongoose")

// const MONGODB_URL = "mongodb//localhost:27017/bookapi"

// const options = {
//      useNewUrlParser:true,
//      useNewUrlParser: true
//  }

//  mongoose.connect(MONGODB_URL, options)

mongoose.connect("mongodb://localhost:27017/bookapi", {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false
})