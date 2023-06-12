const express = require("express");
const bodyParser = require("body-parser");
const fauna = require("faunadb");
const serverless = require("serverless-http");

const app = express();

const router = express.Router();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/.netlify/functions/server", router);

router.get("/test", (req, res) => {
  res.json({ hello: "world" });
});

module.exports.handler = serverless(app);
