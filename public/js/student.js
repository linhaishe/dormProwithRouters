//判断是否是学生，显示对应的页面

// var json = localStorage.getItem("data");
// var jsonObj = JSON.parse(json);
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

// $(".add-student").on("click", function () {
//   $("#add-container").css("display", "block");
// });

$(".close").on("click", function () {
  $("#add-container").css("display", "none");
  $("#charge-record-container").css("display", "none");
  $("#charge-container").css("display", "none");
});

for (let i = 0; i < $(".cancel").length; i++) {
  $(".cancel")
    .eq(i)
    .on("click", function () {
      $("#add-container").css("display", "none");
      $("#charge-record-container").css("display", "none");
      $("#charge-container").css("display", "none");
    });
}

//获取宿舍信息并筛选

// var allDormData = [
//   { balance: 0, dormId: 1004, dormName: "dormName1", id: 4, num: 0, type: 2 },
//   { balance: 0, dormId: 1004, dormName: "dormName1", id: 321, num: 0, type: 2 },
// ];
// console.log(dormData);

var arr = [];
var loginUserInfoArr;
$.ajax({
  url: "/api/student/getstudent",
  // data: {},
  type: "get",
  success: function (res) {
    if (res.data.length) {
      arr = res.data;
      loginUserInfoArr = arr.filter((item) => item.id == jsonObj.id);
      render();
    }
  },
});

//根据用户id筛选出对应的学生数据
// var userId = jsonObj.id;
// var loginUserArr = [];
// loginUserArr.push(jsonObj);
// console.log("userId", userId);
// console.log("jsonObj", jsonObj);
// console.log("loginUserArr", loginUserArr);

//数据筛选

//在宿舍数据里找到此id的数据并渲染

function render() {
  $("#mainPageTbody").html("");
  $.each(loginUserInfoArr, function (i, v) {
    $("#mainPageTbody").append(
      '            <tr>\
              <th scope="row">' +
        v.stuId +
        "</th>\
              <td>" +
        v.stuName +
        "</td>\
              <td>" +
        v.stuUserId +
        "</td>\
              <td>" +
        v.dormId +
        "</td>\
              <td>" +
        v.balance +
        "</td>\
              <td>" +
        (v.type == 1 ? "正常" : "催费") +
        '</td>\
              <td><a href="#">查看缴费记录</a><a href="#">充值</a></td>\
            </tr>\
'
    );
  });

  for (let i = 0; i < $("a").length; i++) {
    if ($("a").eq(i).html() == "查看缴费记录") {
      $("a")
        .eq(i)
        .on("click", function () {
          $("#charge-record-container").css("display", "block");
        });
    }
  }

  for (let i = 0; i < $("a").length; i++) {
    if ($("a").eq(i).html() == "充值") {
      $("a")
        .eq(i)
        .on("click", function () {
          $("#charge-container").css("display", "block");
        });
    }
  }
}
render();

// $(".nav-link").on("click", function () {
//   localStorage.setItem("nav-link", $(this).html());
// });

//面包屑导航事件

//点击获取数据，存在localstorage的nav 数组中

// $(".nav-link").each(function (i) {
//   $(this).on("click", function () {
//     localStorage.setItem($(this).attr("data-name"), $(this).html());
//   });
// });

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

//面包屑点击事件

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
