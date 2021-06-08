var mysql = require("mysql");

//链接数据库
var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "dromProject2",
});

module.exports = connection;
