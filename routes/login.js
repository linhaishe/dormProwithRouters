var express = require("express");
var router = express.Router();
var db = require("../utils/db");

//登入页面查询
router.get("/login/getuser", function (req, res) {
  // if (req.query.type == "管理员") {
  //   var sql =
  //     "select * from admins where adminId = " +
  //     req.query.username +
  //     " and adminPwd =" +
  //     req.query.password +
  //     "";
  //   db.query(sql, function (err, data) {
  //     //数据库返回的数据在data里
  //     if (!err) {
  //       if (data.length) {
  //         res.json({ error: 0, msg: "登入成功", data: data });
  //       } else {
  //         res.json({ error: 1, msg: "登入失败" });
  //       }
  //     }
  //   });
  // } else {
  //   var sql =
  //     "select * from students where stuId = " +
  //     req.query.username +
  //     " and stuPwd =" +
  //     req.query.password +
  //     "";
  //   db.query(sql, function (err, data) {
  //     //数据库返回的数据在data里
  //     if (!err) {
  //       if (data.length) {
  //         res.json({ error: 0, msg: "登入成功", data: data });
  //       } else {
  //         res.json({ error: 1, msg: "登入失败" });
  //       }
  //     }
  //   });
  // }

  //for vue 增删改查
  //1. 死数据
  // console.log("有人登入了", req.query);
  // if (req.query.username == "aaa" && req.query.password == "111") {
  //   res.json({ error: 0, msg: "登录成功！" });
  // } else {
  //   res.json({ error: 1, msg: "登录失败！" });
  // }

  //2. 非死数据方式，连接数据库
  console.log("有人登入了", req.query);
  var sql =
    "select * from admins where adminId = " +
    req.query.username +
    " and adminPwd =" +
    req.query.password +
    "";
  db.query(sql, function (err, data) {
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
