var express = require("express");
var router = express.Router();
var db = require("../utils/db");

//公告页面数据库查询
router.get("/news/getnews", function (req, res) {
  console.log("here we are checknews", req.query);
  var sqlCount = "select count(1) total from news";
  var sqlteacher =
    "select * from news limit " +
    (req.query.page - 1) * req.query.count +
    "," +
    req.query.count;

  var sqlLimit =
    "select * from news limit " +
    (req.query.page - 1) * req.query.count +
    "," +
    req.query.count +
    "";
  console.log(sqlCount);
  console.log(sqlLimit);

  // db.query(sqlCount, function (err, data) {
  //   console.log(err, data);
  //   //数据库返回的数据在data里
  //   if (!err) {
  //     if (data.length) {
  //       res.json({ error: 0, msg: "查询成功", data: data });
  //     } else {
  //       res.json({ error: 1, msg: "查询失败" });
  //     }
  //   }
  //   db.query(sqlLimit, function (err, data) {
  //     if (!err) {
  //       if (data.length) {
  //         res.json({ error: 0, msg: "查询成功", data: data });
  //       } else {
  //         res.json({ error: 1, msg: "查询失败" });
  //       }
  //     }
  //   });
  // });

  db.query(sqlteacher, function (err, data) {
    console.log("公告公告limitdata", data);
    if (err) {
      res.json({ error: 1, msg: err });
    } else {
      db.query(sqlCount, function (err2, data2) {
        console.log("公告公告sqlCountt", data2);
        if (err2) {
          res.json({ error: 1, msg: err2 });
        } else {
          console.log("data22222", data);
          res.json({ error: 0, data: data, count: data2[0].total });
        }
      });
    }
  });
});

module.exports = router;
