//判断是否是学生，显示对应的页面
var json = localStorage.getItem("data");
var jsonObj = JSON.parse(json);
// if (jsonObj.type == undefined) {
//   $("#nav-left ul").children().eq(1).hide();
//   $("#nav-left ul").children().eq(3).hide();
//   $("#nav-left ul").children().eq(4).hide();
// }

//页眉导航栏显示用户名
// if (jsonObj.name) {
//   $(".userNamePanel").html(jsonObj.name);
//   console.log(jsonObj.name);
// } else {
//   $(".userNamePanel").html(jsonObj.stuName);
//   console.log(jsonObj.stuName);
// }

//用户点击退出时，强制登入页面并清空用户数据

$(".exit a").on("click", function () {
  //导向登入页面
  $(location).attr(
    "href",
    "/DormitoryManagementSystemProject/pages/login.html"
  );

  //清空缓存
  localStorage.clear();
});

//警告隐藏

// 点击添加显示页面
$(".add-admin").on("click", function () {
  $("#addAdminContainer").show();
  $("#add-admin-type").text("请选择管理员类型");
  $("#add-admin-name").val("");
  $("#add-psw").val("");
  $("#add-admin-account").val("");
  $(".warning").hide();
});

// 点击关闭则关闭页面
$(".close").on("click", function () {
  $("#addAdminContainer").hide();
  $("#deleteAdminContainer").hide();
  $("#modifyAdminContainer").hide();
});

//删除和和修改的点击事件放进创建函数中，在创建的时候创建监听事件
//否则页面加载完成后不会有点击事件产生
// for (let i = 0; i < $("a").length; i++) {
//   if ($("a").eq(i).html() == "删除") {
//     $("a")
//       .eq(i)
//       .on("click", function () {
//         $("#deleteAdminContainer").show();
//       });
//   }
// }

// for (let i = 0; i < $("a").length; i++) {
//   if ($("a").eq(i).html() == "修改") {
//     $("a")
//       .eq(i)
//       .on("click", function () {
//         $("#modifyAdminContainer").show();
//       });
//   }
// }

//点击取消关闭页面
for (let i = 0; i < $(".cancel").length; i++) {
  $(".cancel")
    .eq(i)
    .on("click", function () {
      // console.log("取消按钮点击");
      $("#addAdminContainer").hide();
      $("#deleteAdminContainer").hide();
      $("#modifyAdminContainer").hide();
    });
}

//dropdown click func
$(function () {
  $(".modify-admin-ul li a").click(function () {
    $("#modify-admin-type").text($(this).text());
  });
  $(".Button-addAdmin li a").click(function () {
    $("#add-admin-type").text($(this).text());
  });
});

//为了便于获取用户数据将此功能进行封装
function getAdmin() {
  $.ajax({
    url: "/admins/getadmin",
    success: function (res) {
      console.log(res);
      if (res.data.length) {
        arr = res.data;
        console.log("arr", arr);
        adminRender();
        createAdminPage();
      }
    },
  });
}

//页面第一次加载时自动调用，获取数据
getAdmin();

var loginUserArr = [];
loginUserArr.push(jsonObj);

console.log("loginUserArr", loginUserArr);

function adminRender() {
  $("#adminTbody").html("");
  if (jsonObj.adminType == 2) {
    $.each(arr.slice((page - 1) * count, page * count), function (i, v) {
      $("#adminTbody").append(
        "            <tr data-pass=" +
          v.adminPwd +
          '>\
              <th scope="row">' +
          v.id +
          "</th>\
              <td>" +
          v.adminName +
          "</td>\
              <td>" +
          v.adminId +
          "</td>\
              <td>" +
          (v.adminType == 1 ? "普通管理员" : "超级管理员") +
          '</td>\
              <td><a class="delAdmin" href="#" >删除</a><a class="updateAdmin" href="#" >修改</a></td>\
            </tr>\
'
      );
    });
  }

  if (jsonObj.adminType == 1) {
    $(".add-admin").hide();
    $.each(loginUserArr, function (i, v) {
      $("#adminTbody").append(
        "            <tr data-pass=" +
          v.adminPwd +
          '>\
                <th scope="row">' +
          v.id +
          "</th>\
                <td>" +
          v.adminName +
          "</td>\
                <td>" +
          v.adminId +
          "</td>\
                <td>" +
          (v.adminType == 1 ? "普通管理员" : "超级管理员") +
          '</td>\
                <td><a class="updateAdmin" href="#" >修改</a></td>\
              </tr>\
  '
      );
    });
  }

  for (let i = 0; i < $("a").length; i++) {
    var clickText = $("a").eq(i).attr("class");
    switch (clickText) {
      case "delAdmin":
        $("a")
          .eq(i)
          .on("click", function () {
            $("#deleteAdminContainer").show();
            // id = $(this).parents("tr").attr("data-id");
            id = $(this).parents("tr").children().first().text();
            console.log(id);
          });
        break;
      case "updateAdmin":
        $("a")
          .eq(i)
          .on("click", function () {
            $("#modifyAdminContainer").show();
            // id = $(this).parents("tr").attr("data-id");
            id = $(this).parents("tr").children().first().text();
            console.log(id);
            $("#modify-admin-id").val(
              $(this).parents("tr").children().first().text()
            );
            $("#modify-admin-name").val(
              $(this).parents("tr").children().eq(1).text()
            );
            $("#modify-admin-account").val(
              $(this).parents("tr").children().eq(2).text()
            );
            $("#modify-admin-pwd").val($(this).parents("tr").attr("data-pass"));
            $("#modify-admin-type").text(
              $(this).parents("tr").children().eq(3).text()
            );
          });
        break;
    }
  }
}

//获取管理员列表数据
var arr = []; //存所有的数据;
var count = 10; //一页多少条数据
var page = 1; //当前的页数
var id;
var n;

function getAdmin() {
  $.ajax({
    url: "/admins/getadmin",
    //   data: {},
    //   type: "",
    success: function (res) {
      console.log(res.data);
      if (res.data.length) {
        arr = res.data;
        adminRender();
        createAdminPage();
      }
    },
  });
}

getAdmin();

//创建管理员界面

// function createAdminListPage() {
//   $("#adminTbody").html("");
//   if (jsonObj.type == 2) {
//     $.each(jsonObj, function (i, v) {
//       $("#adminTbody").append(
//         "            <tr data-pass=" +
//           v.password +
//           '>\
//               <th scope="row">' +
//           v.id +
//           "</th>\
//               <td>" +
//           v.name +
//           "</td>\
//               <td>" +
//           v.userId +
//           "</td>\
//               <td>" +
//           (v.type == 1 ? "普通管理员" : "超级管理员") +
//           '</td>\
//               <td><a href="#" >删除</a><a href="#" >修改</a></td>\
//             </tr>\
// '
//       );
//     });
//   }
// }

//创建页码
function createAdminPage() {
  //arr
  // 1  1
  //5   1
  //6   2
  //10  2
  //每页5个 页面数字获取 = 数组长度 / 每页显示数量 然后向上取整
  //n   arr.length/count  向上取整
  n = Math.ceil(arr.length / count);
  $("#page-switch a").remove();
  for (var i = 1; i <= n; i++) {
    $(".next").before($('<a href="javascript:;">' + i + "</a>"));
  }
}

//子元素有点击事件的时候，将点击事件加给父元素

$("#page-switch").on("click", "a", function () {
  page = $(this).text();
  getAdmin();
});

// 点击向前
$(".before").on("click", function () {
  console.log("page", page);
  if (page > 1) {
    page--;
  }
  getAdmin();
});

//点击向后
$(".next").on("click", function () {
  console.log("n", n);
  if (page < n) {
    page++;
  }
  getAdmin();
});

//用户名为字符串，密码，类型，用户账号均为数字
//添加管理员
$(".add-admin-confirm").on("click", function () {
  //非空判断
  // for (var i = 0; i < $("input").length; i++) {
  //   if (
  //     $("input").eq(i).val() == "" ||
  //     $("#add-admin-type").text("请选择管理员类型")
  //   ) {
  //     $(".warning").show();
  //   }
  // }
  console.log("管理员添加按钮点击");
  $.ajax({
    url: "/admin/addadmin",
    data: {
      name: $("#add-admin-name").val(),
      password: $("#add-psw").val(),
      type: $(".dropdown .btn").html() == "普通管理员" ? 1 : 2,
      userId: $("#add-admin-account").val(),
    },
    type: "post",
    success: function (res) {
      console.log(res);
      if (res.error == 0) {
        //弹框隐藏
        $("#addAdminContainer").hide();
        $(".dropdown .btn").html("请选择管理员类型");
        getAdmin();
      }
    },
  });
});

//删除管理员
$(".delete-admin-confirm").on("click", function () {
  $.ajax({
    url: "/admin/deladmin",
    data: { id: id },
    type: "post",
    success: function (res) {
      if (res.error == 0) {
        $("#deleteAdminContainer").hide();
        getAdmin();
      }
    },
  });
});

//修改管理员
$(".modify-admin-confirm").on("click", function () {
  $.ajax({
    url: "/admin/updateadmin",
    data: {
      id: $("#modify-admin-id").val(),
      name: $("#modify-admin-name").val(),
      password: $("#modify-admin-pwd").val(),
      type: $("#modify-admin-type").html() == "普通管理员" ? 1 : 2,
    },
    type: "post",
    success: function (res) {
      if (res.error == 0) {
        $("#modifyAdminContainer").hide();
        console.log("修改成功");
        getAdmin();
      }
    },
  });
});

// for (let i = 0; i < $("a").length; i++) {
//   if ($("a").eq(i).html() == "删除") {
//     $("a")
//       .eq(i)
//       .on("click", function () {
//         $("#deleteAdminContainer").show();
//         // console.log("点击删除按钮");
//         console.log($(this).parents("tr").children().first().text());
//         id = $(this).parents("tr").children().first().text();
//       });
//   }
// }

//   for (let i = 0; i < $("a").length; i++) {
//     if ($("a").eq(i).html() == "修改") {
//       $("a")
//         .eq(i)
//         .on("click", function () {
//           $("#modifyAdminContainer").show();
//           //修改点击时将数据内容显示在修改面版上

//           $("#modify-admin-id").val(
//             $(this).parents("tr").children().first().text()
//           );
//           $("#modify-admin-name").val(
//             $(this).parents("tr").children().eq(1).text()
//           );
//           $("#modify-admin-account").val(
//             $(this).parents("tr").children().eq(2).text()
//           );
//           $("#modify-admin-pwd").val($(this).parents("tr").attr("data-pass"));
//           $("#modify-admin-type").text(
//             $(this).parents("tr").children().eq(3).text()
//           );
//         });
//     }
//   }
// }
