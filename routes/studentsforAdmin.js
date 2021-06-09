var express = require("express");
var router = express.Router();
var db = require("../utils/db");

//学生信息渲染
router.get("/student/getstudent", function (req, res) {
  console.log("here we are checkstudents", req.query);
  var sql =
    "select students.id,students.stuId,students.stuName,students.stuUserId,students.stuDormId,students.stupwd,dorms.balance,dorms.dormId,dorms.dormName,dorms.peopleNum,dorms.dormType from students left join dorms on students.stuDormId = dorms.id";

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

//学生添加
router.route("/students/addstudent").post(function (req, res) {
  console.log("req.body.stuId", req);
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

  console.log("sql", updateSql);
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
  console.log("delSql", delSql);
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

  console.log("updateSql", updateSql);
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

module.exports = router;
