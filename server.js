var express = require("express");
var bodyParser = require("body-parser");

var app = express();

//import files
var adminRouter = require("./routes/admins");
var dormsRouter = require("./routes/dorms");
var homePageRouter = require("./routes/homepage");
var newsRouter = require("./routes/news");
var stuRouter = require("./routes/studentsforAdmin");
var loginRouter = require("./routes/login");

app.use(adminRouter);
app.use(dormsRouter);
app.use(homePageRouter);
app.use(newsRouter);
app.use(stuRouter);
app.use(loginRouter);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static("public"));

//主页面信息查询

app.listen(3000);
console.log("listening to port 3000");
