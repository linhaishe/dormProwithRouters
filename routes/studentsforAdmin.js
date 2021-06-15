var express = require("express");
var router = express.Router();
var db = require("../utils/db");

//学生信息渲染
router.get("/student/getstudent", function (req, res) {
  var sql =
    "select students.id,students.stuId,students.stuName,students.stuUserId,students.stuDormId,students.stupwd,dorms.balance,dorms.dormId,dorms.dormName,dorms.dormType from students left join dorms on students.stuDormId = dorms.id";

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

//学生添加
router.route("/students/addstudent").post(function (req, res) {
  var updateSql =
    "insert into students values (null," +
    req.body.stuId +
    ",'" +
    req.body.stuName +
    "'," +
    req.body.stuUserId +
    "," +
    req.body.stuDormId +
    "," +
    req.body.stuPas +
    ")";

  db.query(updateSql, function (err, data) {
    if (!err) {
      if (!data.length) {
        res.json({ error: 0, msg: "学生添加成功", data: data });
      } else {
        res.json({ error: 1, msg: "学生添加失败" });
      }
    }
  });
});

//学生删除
router.post("/students/delstudent", function (req, res) {
  var delSql = "DELETE FROM students WHERE id = " + req.body.id + "";
  db.query(delSql, function (err, data) {
    if (!err) {
      if (!data.length) {
        res.json({ error: 0, msg: "学生删除成功", data: data });
      } else {
        res.json({ error: 1, msg: "学生删除失败" });
      }
    }
  });
});

//学生修改
router.post("/students/updatestudent", function (req, res) {
  var updateSql =
    'update students set stuName = "' +
    req.body.stuName +
    '" , stuPwd = ' +
    req.body.stuPas +
    ", stuDormId = " +
    req.body.stuDormId +
    "  where id = " +
    req.body.id +
    "";

  db.query(updateSql, function (err, data) {
    if (!err) {
      if (!data.length) {
        res.json({ error: 0, msg: "学生修改成功", data: data });
      } else {
        res.json({ error: 1, msg: "学生修改失败" });
      }
    }
  });
});

//充值信息渲染
router.post("/getPayRecords", function (req, res) {
  var sql = "SELECT * FROM payRecords where stuId = " + req.body.id + "";

  db.query(sql, function (err, data) {
    //数据库返回的数据在data里
    if (!err) {
      if (data.length) {
        res.json({ error: 0, msg: "充值记录查询成功", data: data });
      } else {
        res.json({ error: 1, msg: "充值记录查询失败" });
      }
    }
  });
});

//学生缴费充值,宿舍余额更改
router.post("/chargeFee", function (req, res) {
  var sqlSelfRecord2 =
    "UPDATE dorms SET balance = balance + " +
    req.body.amount +
    " where dormId = " +
    req.body.dormId +
    "";

  db.query(sqlSelfRecord2, function (err, data) {
    //数据库返回的数据在data里
    if (!err) {
      if (!data.length) {
        res.json({ error: 0, msg: "充值成功", data: data });
      } else {
        res.json({ error: 1, msg: "充值失败" });
      }
    }
  });
});

//学生缴费充值,充值记录更改
router.post("/chargeFeeRecord", function (req, res) {
  var sqlSelfRecord22 =
    "insert into payRecords values(null,now()," +
    req.body.amount +
    "," +
    req.body.dormId +
    "," +
    req.body.stuId +
    ")";
  console.log("sqlSelfRecord22", sqlSelfRecord22);
  db.query(sqlSelfRecord22, function (err, data) {
    //数据库返回的数据在data里
    if (!err) {
      if (!data.length) {
        res.json({ error: 0, msg: "充值成功", data: data });
      } else {
        res.json({ error: 1, msg: "充值失败" });
      }
    }
  });
});

module.exports = router;
