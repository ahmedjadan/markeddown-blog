const express = require("express");
const app = express();
const mongoose = require("mongoose");
const articlesRouter = require("./routes/articles");
const Article = require("./models/article");

const bodyParser = require("body-parser");
const methodOverride = require('method-override')

app.set("view engine", "ejs");
app.use(express.static("public"));

app.use(methodOverride('_method'))


const PORT = 5000;
app.listen(process.env.PORT || PORT);
mongoose.connect(
  "mongodb://ahmed:ahmed123@markdown-shard-00-00.8b33r.mongodb.net:27017,markdown-shard-00-01.8b33r.mongodb.net:27017,markdown-shard-00-02.8b33r.mongodb.net:27017/markdown?ssl=true&replicaSet=atlas-1o0awr-shard-0&authSource=admin&retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },
  () => console.log("connected to db")
);

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
  const articles = await Article.find()
    .sort({ updatedAt: 'desc' })
    res.render("articles/index", { Articles: articles });
 

  //   const articles = [
  //     {
  //       title: "Test Article",
  //       description: "Test description goes here",
  //     },
  //     {
  //       title: "new Article",
  //       description: "Test description goes here",
  //     },
  //     {
  //       title: "another Article",
  //       description: "Test description goes here",
  //     },
  //   ];
  //   res.render("articles/index", { articles: articles });
});

app.use("/articles", articlesRouter);
