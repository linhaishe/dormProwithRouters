// //判断是否是学生，显示对应的页面
var json = localStorage.getItem("data");
var jsonObj = JSON.parse(json);
// if (jsonObj.type == undefined) {
//   $("#nav-left ul").children().eq(1).hide();
//   $("#nav-left ul").children().eq(3).hide();
//   $("#nav-left ul").children().eq(4).hide();
// }

//页眉导航栏显示用户名
if (jsonObj.name) {
  $(".userNamePanel").html(jsonObj.name);
} else {
  $(".userNamePanel").html(jsonObj.stuName);
}

//用户点击退出时，强制登入页面并清空用户数据

$(".exit a").on("click", function () {
  //导向登入页面
  $(location).attr("href", "index.html");

  //清空缓存
  localStorage.clear();
});

//添加宿舍点击事件
$(".add-dorm").on("click", function () {
  $("#add-container").show();
  $(".warning").hide();
});

//添加宿舍财产点击事件
$(".add-dorm-pro").on("click", function () {
  $("#add-dorm-pro-single-container").show();
  $(".warning").hide();
});

$(".close").on("click", function () {
  $("#add-container").hide();
  $("#delete-container").hide();
  $("#modify-container").hide();
  $("#getFee-container").hide();
  $("#add-dorm-pro-single-container").hide();
  $("#check-dorm-pro-container").hide();
});

for (let i = 0; i < $(".cancel").length; i++) {
  $(".cancel")
    .eq(i)
    .on("click", function () {
      $("#add-container").hide();
      $("#delete-container").hide();
      $("#modify-container").hide();
      $("#getFee-container").hide();
      $("#add-dorm-pro-single-container").hide();
      $("#check-dorm-pro-container").hide();
    });
}

//获取宿舍页面
var arr = []; //存所有的数据;
var count = 10; //一页多少条数据
var page = 1; //当前的页数
var id;
var n;
var type;

function getDorm() {
  $.ajax({
    url: "/dorm/getdorms",
    //   data: {},
    //   type: "",
    success: function (res) {
      if (res.data.length) {
        arr = res.data;

        dormRender();
        createDormPage();
      }
    },
  });
}

getDorm();

//主页所有信息渲染
function dormRender() {
  $("#dormTbody").html("");
  $.each(arr.slice((page - 1) * count, page * count), function (i, v) {
    $("#dormTbody").append(
      "            <tr data-id=" +
        v.id +
        '>\
              <th scope="row">' +
        v.dormId +
        "</th>\
              <td>" +
        v.dormName +
        "</td>\
              <td>" +
        v.peopleNum +
        "</td>\
              <td>" +
        v.balance +
        "</td>\
              <td>" +
        (v.dormType == 1 ? "正常" : "催缴中") +
        '</td>\
              <td>\
                <a href="#" class="delDorm">删除</a\
                ><a href="#" class="dormUpdate">修改</a><a href="#">' +
        (v.dormType == 1 ? "发起催款" : "改为正常") +
        '</a>\
                <a href="#" class="checkPro">查看财产</a><a href="#" class="addSinglePro">添加财产</a>\
              </td>\
            </tr>\
'
    );
  });

  //增删改查点击事件

  for (let i = 0; i < $("a").length; i++) {
    var clickText = $("a").eq(i).attr("class");
    switch (clickText) {
      case "delDorm":
        $("a")
          .eq(i)
          .on("click", function () {
            $("#delete-container").show();
            id = $(this).parents("tr").attr("data-id");
            // type =
          });
        break;
      case "dormUpdate":
        $("a")
          .eq(i)
          .on("click", function () {
            $("#modify-container").show();
            id = $(this).parents("tr").attr("data-id");
            $("#modify-dormId").val(
              $(this).parents("tr").children().eq(0).html()
            );
            $("#modify-dormName").val(
              $(this).parents("tr").children().eq(1).html()
            );
            $("#numOfPeople").val(
              $(this).parents("tr").children().eq(2).html()
            );
            $("#chargefee").val($(this).parents("tr").children().eq(3).html());
          });
        break;
      case "checkPro":
        $("a")
          .eq(i)
          .on("click", function () {
            $("#check-dorm-pro-container").show();
          });
        break;
      case "addSinglePro":
        $("a")
          .eq(i)
          .on("click", function () {
            $("#add-dorm-pro-single-container").show();
          });
        break;
    }
  }

  //改为正常，发起催款
  for (let i = 0; i < $("a").length; i++) {
    if ($("a").eq(i).html() == "改为正常") {
      $("a")
        .eq(i)
        .on("click", function () {
          $("#getFee-container").show();
          id = $(this).parents("tr").attr("data-id");
          type = $(this).parents("tr").children().eq(4).text();
        });
    }
  }
  for (let i = 0; i < $("a").length; i++) {
    if ($("a").eq(i).html() == "发起催款") {
      $("a")
        .eq(i)
        .on("click", function () {
          $("#getFee-container").show();
          id = $(this).parents("tr").attr("data-id");
          type = $(this).parents("tr").children().eq(4).text();
        });
    }
  }
}

//创建页码
function createDormPage() {
  n = Math.ceil(arr.length / count);
  $("#page-switch a").remove();
  for (var i = 1; i <= n; i++) {
    $(".next").before($('<a href="javascript:;">' + i + "</a>"));
  }
}

$("#page-switch").on("click", "a", function () {
  // $("#page-switch a").remove();
  page = $(this).text();
  dormRender();
});

// 点击向前
$(".before").on("click", function () {
  if (page > 1) {
    page--;
  }
  dormRender();
});

//点击向后
$(".next").on("click", function () {
  if (page < n) {
    page++;
  }
  dormRender();
});

//添加宿舍
$(".add-dorm-confirm").on("click", function () {
  //非空判断
  // for (var i = 0; i < $("input").length; i++) {
  //   if (
  //     $("input").eq(i).val() == "" ||
  //     $("#add-admin-type").text("请选择管理员类型")
  //   ) {
  //     $(".warning").show();
  //   }
  // }
  $.ajax({
    url: "/dorm/adddorm",
    data: {
      balance: $("#bill").val(),
      dormId: $("#dormId").val(),
      dormName: $("#dormName").val(),
    },
    type: "post",
    success: function (res) {
      //弹框隐藏
      $("#add-container").hide();
      getDorm();
      $("#bill").val("");
      $("#dormId").val("");
      $("#dormName").val("");
    },
  });
});

//删除宿舍
$(".delete-dorm-confirm").on("click", function () {
  $.ajax({
    url: "/dorm/deldorm",
    //这里的dormId是主键id,不是数组里的dormId
    data: { dormId: id },
    type: "post",
    success: function (res) {
      $("#delete-container").hide();
      getDorm();
    },
  });
});

//修改宿舍
$(".modify-dorm-confirm").on("click", function () {
  $.ajax({
    url: "/dorm/updatedorm",
    data: {
      balance: $("#chargefee").val(),
      dormId: $("#modify-dormId").val(),
      dormName: $("#modify-dormName").val(),
      id: id,
      num: $("#numOfPeople").val(),
    },
    type: "post",
    success: function (res) {
      $("#modify-container").hide();
      getDorm();
    },
  });
});

//修改状态
$(".push-get-fee").on("click", function () {
  $.ajax({
    url: "/dorm/deptdorm",
    data: { id: id, type: type == "正常" ? 2 : 1 },
    type: "post",
    success: function (res) {
      $("#getFee-container").hide();
      getDorm();
    },
  });
});

//数据去重

function unique(arr) {
  return Array.from(new Set(arr));
}

var navArr = [];
var uniqueArr = unique(navArr);

for (var i = 0; i < uniqueArr.length; i++) {}

var homepage = localStorage.getItem("homepage");
var dorm = localStorage.getItem("dorm");
var student = localStorage.getItem("student");
var bulletin = localStorage.getItem("bulletin");
var admin = localStorage.getItem("admin");

//添加样式
// function addCss() {
//   $(".menu-list").css({
//     height: "25px",
//     width: "100px",
//     background: "#0f6efd",
//     color: "white",
//     "text-align": "center",
//     "line-height": "25px",
//     "border-radius": "3px",
//     margin: "10px",
//     "font-size": "14px",
//   });
//   $(".menu-row").css({
//     display: "flex",
//     " align-items": "center",
//     "align-content": "center",
//   });
//   $(".menu-list a").css({
//     "text-decoration": "none",
//     color: "white",
//     "margin-left": "10px",
//   });
// }

// if (homepage) {
//   navArr.push(homepage);
//   $(".menu-row").append(
//     $(
//       '<div class="menu-list">' +
//         localStorage.getItem("homepage") +
//         '<a href="javascript:;">x</a></div>'
//     )
//   );
//   addCss();
// }
// if (student) {
//   navArr.push(student);
//   $(".menu-row").append(
//     $(
//       '<div class="menu-list">' +
//         localStorage.getItem("student") +
//         '<a href="javascript:;">x</a></div>'
//     )
//   );
//   addCss();
// }
// if (bulletin) {
//   navArr.push(bulletin);
//   $(".menu-row").append(
//     $(
//       '<div class="menu-list">' +
//         localStorage.getItem("bulletin") +
//         '<a href="javascript:;">x</a></div>'
//     )
//   );
//   addCss();
// }
// if (admin) {
//   navArr.push(admin);
//   $(".menu-row").append(
//     $(
//       '<div class="menu-list">' +
//         localStorage.getItem("admin") +
//         '<a href="javascript:;">x</a></div>'
//     )
//   );
//   addCss();
// }
// if (dorm) {
//   navArr.push(dorm);
//   $(".menu-row").append(
//     $(
//       '<div class="menu-list">' +
//         localStorage.getItem("dorm") +
//         '<a href="javascript:;">x</a></div>'
//     )
//   );
//   addCss();
// }

// //面包屑点击事件

// var navDiv = document.getElementsByClassName("menu-list");

// for (var i = 0; i < navDiv.length; i++) {
//   navDiv[i].onclick = function () {
//     //获得点击数据
//     var clickTest = this.firstChild.nodeValue;
//     console.log(this.firstChild.nodeValue);
//     if (clickTest == "公告主页") {
//       console.log("zhelizhelizheli", clickTest);
//       localStorage.removeItem("homepage");
//       window.history.go(0);
//     }
//     if (clickTest == "宿舍管理") {
//       localStorage.removeItem("dorm");
//       window.history.go(0);
//     }
//     if (clickTest == "学生管理") {
//       localStorage.removeItem("student");
//       window.history.go(0);
//     }
//     if (clickTest == "公告管理") {
//       localStorage.removeItem("bulletin");
//       window.history.go(0);
//     }
//     if (clickTest == "管理员管理") {
//       localStorage.removeItem("admin");
//       window.history.go(0);
//     }
//   };
// }
