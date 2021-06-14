var express = require("express");
var router = express.Router();
var db = require("../utils/db");

//管理员信息渲染
router.get("/admins/getadmin", function (req, res) {
  var sql = "select * from admins";
  db.query(sql, function (err, data) {
    //数据库返回的数据在data里
    if (!err) {
      if (data.length) {
        res.json({ error: 0, msg: "查询成功", data: data });
      } else {
        res.json({ error: 1, msg: "查询失败" });
      }
    }
  });
});

//添加管理员
router.post("/admin/addadmin", function (req, res) {
  var insertSql =
    "insert into admins values(null," +
    req.body.userId +
    ',"' +
    req.body.name +
    '",' +
    req.body.password +
    "," +
    req.body.type +
    ");";

  db.query(insertSql, function (err, data) {
    if (!err) {
      if (!data.length) {
        res.json({ error: 0, msg: "管理员添加成功", data: data });
      } else {
        res.json({ error: 1, msg: "管理员添加失败" });
      }
    }
  });
});

//删除管理员
router.post("/admin/deladmin", function (req, res) {
  var delSql = "delete from admins where id = " + req.body.id + "";
  db.query(delSql, function (err, data) {
    if (!err) {
      if (!data.length) {
        res.json({ error: 0, msg: "管理员删除成功", data: data });
      } else {
        res.json({ error: 1, msg: "管理员删除失败" });
      }
    }
  });
});

//修改管理员
router.post("/admin/updateadmin", function (req, res) {
  var updateSql =
    'update admins set adminName="' +
    req.body.name +
    '",adminPwd=' +
    req.body.password +
    ",adminType=" +
    req.body.type +
    " where id=" +
    req.body.id +
    "";

  db.query(updateSql, function (err, data) {
    if (!err) {
      if (!data.length) {
        res.json({ error: 0, msg: "管理员修改成功", data: data });
      } else {
        res.json({ error: 1, msg: "管理员修改失败" });
      }
    }
  });
});

module.exports = router;
