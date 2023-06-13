const express = require("express");
const bodyParser = require("body-parser");
const fauna = require("faunadb");
const serverless = require("serverless-http");

const app = express();

const router = express.Router();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/.netlify/functions/server", router);

const format = (answers) => {
  if (answers.length == 0) {
    answers = ["No answers found"];
  }

  let formatted = {
    blocks: [],
  };

  for (answer of answers) {
    formatted["blocks"].push({
      type: "divider",
    });
    formatted["blocks"].push({
      type: "section",
      text: {
        type: "mrkdwn",
        text: answer,
      },
    });
  }

  return formatted;
};

router.get("/test", (req, res) => {
  res.json({ hello: "world" });
});

router.post("/", (req, res) => {
  const text = req.body.text;
  let answers = text;
  const formattedAnswers = format(answers);
  console.log(`Input text: ${text}`);
  res.status(200);
  res.send(formattedAnswers);
});

module.exports.handler = serverless(app);
