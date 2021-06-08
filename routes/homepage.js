var express = require("express");
var router = express.Router();
var db = require("../utils/db");

//公告页面数据库查询
router.get("/news/getnews", function (req, res) {
  console.log("here we are checknews", req.query);
  var sql = "select * from news";
  console.log(sql);
  db.query(sql, function (err, data) {
    console.log(err, data);
    //数据库返回的数据在data里
    if (!err) {
      if (data.length) {
        res.json({ error: 0, msg: "登入成功", data: data });
      } else {
        res.json({ error: 1, msg: "登入失败" });
      }
    }
  });
});

module.exports = router;
