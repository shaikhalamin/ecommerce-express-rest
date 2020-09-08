const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const compression = require("compression");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();


const middlewares = require("./middlewares");

const api = require("./api");

const mongoConfig = require("./config/mongo.config");
mongoose.connect(
  `mongodb+srv://${mongoConfig.USER}:${mongoConfig.PASSWORD}@${mongoConfig.HOST}/${mongoConfig.DB}?retryWrites=true&w=majority`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
);

const app = express();
app.set("trust proxy", 1);

app.use(morgan("dev"));
app.use(helmet());

app.use(express.json());

// gzip compression
app.use(compression());

// enable cors
app.use(cors());

app.get("/", (req, res, next) => {
  let data = 0;

  if (data > 2) {
    throw Error("random error"); // Pass errors to Express.
  }

  console.log(__dirname);

  res.status(200).json({
    message: "Hello world by mycom"
  });
});

const mysqlmodel = require("./models");
mysqlmodel.sequelize.sync().then(() => {
  console.log('Connected to db');
}).catch((err) => {
  console.log('Something went wrong please see the erro :' + err)
})


let db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("Connected to mongo atlas");
});

app.use("/api/v1", api);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

module.exports = app;
