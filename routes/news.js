var express = require("express");
var router = express.Router();
var db = require("../utils/db");

//公告管理信息渲染
router.get("/news/getnewscontrol", function (req, res) {
  console.log("here we are checkstudents", req.query);
  var sql = "select * from news";
  console.log(sql);
  db.query(sql, function (err, data) {
    console.log(err, data);
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

//公告添加
router.post("/news/addnews", function (req, res) {
  var insertSql =
    "insert into news values (null," +
    req.body.adminId +
    ',"' +
    req.body.adminName +
    '","' +
    req.body.title +
    '","' +
    req.body.content +
    '",now())';

  db.query(insertSql, function (err, data) {
    if (!err) {
      if (!data.length) {
        res.json({ error: 0, msg: "公告添加成功", data: data });
      } else {
        res.json({ error: 1, msg: "公告添加失败" });
      }
    }
  });
});

//公告删除
router.post("/news/delNews", function (req, res) {
  var delSql = "delete from news where id = " + req.body.id + "";
  db.query(delSql, function (err, data) {
    if (!err) {
      if (!data.length) {
        res.json({ error: 0, msg: "公告删除成功", data: data });
      } else {
        res.json({ error: 1, msg: "公告删除失败" });
      }
    }
  });
});

//公告修改
router.post("/news/updateNews", function (req, res) {
  var updateSql =
    'update news set title="' +
    req.body.title +
    '",content="' +
    req.body.content +
    '" where id = ' +
    req.body.id +
    "";
  db.query(updateSql, function (err, data) {
    if (!err) {
      if (!data.length) {
        res.json({ error: 0, msg: "公告修改成功", data: data });
      } else {
        res.json({ error: 1, msg: "公告修改失败" });
      }
    }
  });
});

module.exports = router;
