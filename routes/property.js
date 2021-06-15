var express = require("express");
var router = express.Router();
var db = require("../utils/db");

//公告页面数据库查询
router.get("/getProperties", function (req, res) {
  var sqlCount = "select count(1) total from dormProperties";
  var sqlteacher =
    "select * from dormProperties limit " +
    (req.query.page - 1) * req.query.count +
    "," +
    req.query.count;

  var sqlLimit =
    "select dormProperties.id,dormProperties.proName,dormProperties.proState,dormProperties.isUsed,dormProperties.proDormId,dorms.balance,dorms.dormId,dorms.dormName,dorms.dormtype from dormProperties left join dorms on dormProperties.proDormId = dorms.id limit " +
    (req.query.page - 1) * req.query.count +
    "," +
    req.query.count +
    "";

  db.query(sqlLimit, function (err, data) {
    if (err) {
      res.json({ error: 1, msg: err });
    } else {
      db.query(sqlCount, function (err2, data2) {
        if (err2) {
          res.json({ error: 1, msg: err2 });
        } else {
          res.json({ error: 0, data: data, count: data2[0].total });
        }
      });
    }
  });
});

router.post("/addProperties", function (req, res) {
  var addSql =
    'insert into dormProperties values(null,"' +
    req.body.proName +
    '",' +
    req.body.proState +
    "," +
    req.body.proUsed +
    "," +
    req.body.proDorm +
    ");";
  console.log(addSql);
  db.query(addSql, function (err, data) {
    if (!err) {
      if (!data.length) {
        res.json({ error: 0, msg: "添加成功", data: data });
      } else {
        res.json({ error: 1, msg: "添加失败" });
      }
    }
  });
});

router.post("/deleProperty", function (req, res) {
  var addSql = "delete from dormProperties where id = " + req.body.id + "";
  db.query(addSql, function (err, data) {
    if (!err) {
      if (!data.length) {
        res.json({ error: 0, msg: "删除成功", data: data });
      } else {
        res.json({ error: 1, msg: "删除失败" });
      }
    }
  });
});

router.post("/updateProperty", function (req, res) {
  var updateSql =
    'UPDATE dormProperties SET proName="' +
    req.body.proName +
    '",proState=' +
    req.body.proState +
    ",isUsed=" +
    req.body.proUsed +
    ",proDormId=" +
    req.body.proDorm +
    " where id = " +
    req.body.id +
    "";
  console.log(updateSql);
  db.query(updateSql, function (err, data) {
    if (!err) {
      if (!data.length) {
        res.json({ error: 0, msg: "删除成功", data: data });
      } else {
        res.json({ error: 1, msg: "删除失败" });
      }
    }
  });
});

module.exports = router;
