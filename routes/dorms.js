var express = require("express");
var router = express.Router();
var db = require("../utils/db");

//宿舍信息渲染

router.get("/dorm/getdorms", function (req, res) {
  var sql = "select * from dorms";
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

//宿舍添加
router.post("/dorm/adddorm", function (req, res) {
  var insertSql =
    "insert into dorms values (null," +
    req.body.balance +
    "," +
    req.body.dormId +
    "," +
    req.body.dormName +
    ",default,default)";

  var insertSql2 =
    "insert into dorms values (null," +
    req.body.balance +
    "," +
    req.body.dormId +
    ',"' +
    req.body.dormName +
    '",default,default)';
  db.query(insertSql2, function (err, data) {
    //数据库返回的数据在data里
    if (!err) {
      if (!data.length) {
        res.json({ error: 0, msg: "添加成功", data: data });
      } else {
        res.json({ error: 1, msg: "添加失败" });
      }
    }
  });
});

//宿舍删除
//宿舍有人不能删除，因为外键的原因
router.post("/dorm/deldorm", function (req, res) {
  var delSql = "DELETE FROM dorms WHERE id = " + req.body.dormId + "";
  db.query(delSql, function (err, data) {
    if (!err) {
      if (!data.length) {
        res.json({ error: 0, msg: "删除成功", data: data });
      } else {
        res.json({ error: 1, msg: "删除失败" });
      }
    }
  });
});

//宿舍修改
router.post("/dorm/updatedorm", function (req, res) {
  var updateSql =
    "UPDATE dorms SET dormName = '" +
    req.body.dormName +
    "', balance = " +
    req.body.balance +
    " WHERE id = " +
    req.body.id +
    "";
  db.query(updateSql, function (err, data) {
    if (!err) {
      if (!data.length) {
        res.json({ error: 0, msg: "宿舍修改成功", data: data });
      } else {
        res.json({ error: 1, msg: "宿舍修改失败" });
      }
    }
  });
});

//宿舍催费状态修改
router.post("/dorm/deptdorm", function (req, res) {
  var updateSql =
    "UPDATE dorms SET dormType = " +
    req.body.type +
    " where id = " +
    req.body.id +
    "";
  db.query(updateSql, function (err, data) {
    if (!err) {
      if (!data.length) {
        res.json({ error: 0, msg: "宿舍状态修改成功", data: data });
      } else {
        res.json({ error: 1, msg: "宿舍状态修改失败" });
      }
    }
  });
});

module.exports = router;
