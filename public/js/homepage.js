//判断是否是学生，显示对应的页面
var json = localStorage.getItem("data");
var jsonObj = JSON.parse(json);
if (jsonObj.adminType == undefined) {
  $("#nav-left ul").children().eq(1).hide();
  $("#nav-left ul").children().eq(3).hide();
  $("#nav-left ul").children().eq(4).hide();
  $("#nav-left ul").children().eq(2).find("a").attr("href", "student.html");
}

//jsonObj.stuName
//页眉导航栏显示用户名
if (jsonObj.adminName) {
  $(".userNamePanel").html(jsonObj.adminName);
} else {
  $(".userNamePanel").html(jsonObj.stuName);
}

//左侧导航栏点击事件
$(".menu-list").hide();
$(".menu-list").eq(0).show();

//登入成功提示框
$(document).ready(function () {
  $("#login-success").fadeIn(500, function () {
    $(this).fadeOut(1000);
  });
});

function addColor(_this) {
  $(_this).parent().siblings().children().css({ color: "" });
  $(_this).attr("style", "color: #0f6efd");
  $(_this).siblings().attr("style", "color: #0f6efd");
}

//左侧导航栏点击事件

$(".nav-link").each(function (i) {
  $(this).on("click", function () {
    var _this = $(this);
    if ($(this).attr("data-name") == "homepage") {
      $("#homepage").show();
      $("#dorm-homepage").hide();
      $("#student-admin-homepage").hide();
      $("#bulletin-homepage").hide();
      $("#admin-homepage").hide();
      addColor(_this);
      //点击后顶部导航栏显示事件，颜色改变
      $(".menu-list").eq(0).show();
      $(".menu-list").removeClass("active");
      $(".menu-list").children().css({ color: "black" });
      $(".menu-list").eq(0).addClass("active");
      $(".menu-list").eq(0).children().css({ color: "white" });
      $("tbody tr").show();
    }
    if ($(this).attr("data-name") == "dorm") {
      var _this = $(this);
      $("#dorm-homepage").show();
      $("#homepage").hide();
      $("#student-admin-homepage").hide();
      $("#bulletin-homepage").hide();
      $("#admin-homepage").hide();
      addColor(_this);
      $(".menu-list").eq(1).show();
      $(".menu-list").removeClass("active");
      $(".menu-list").children().css({ color: "black" });
      $(".menu-list").eq(1).addClass("active");
      $(".menu-list").eq(1).children().css({ color: "white" });
      $("tbody tr").show();
    }
    if ($(this).attr("data-name") == "student") {
      var _this = $(this);
      $("#student-admin-homepage").show();
      $("#dorm-homepage").hide();
      $("#homepage").hide();
      $("#bulletin-homepage").hide();
      $("#admin-homepage").hide();
      addColor(_this);
      $(".menu-list").eq(2).show();
      $(".menu-list").removeClass("active");
      $(".menu-list").children().css({ color: "black" });
      $(".menu-list").eq(2).addClass("active");
      $(".menu-list").eq(2).children().css({ color: "white" });
      $("tbody tr").show();
    }
    if ($(this).attr("data-name") == "bulletin") {
      var _this = $(this);
      $("#bulletin-homepage").show();
      $("#student-admin-homepage").hide();
      $("#dorm-homepage").hide();
      $("#homepage").hide();
      $("#admin-homepage").hide();
      addColor(_this);
      $(".menu-list").eq(3).show();
      $(".menu-list").removeClass("active");
      $(".menu-list").children().css({ color: "black" });
      $(".menu-list").eq(3).addClass("active");
      $(".menu-list").eq(3).children().css({ color: "white" });
      $("tbody tr").show();
    }
    if ($(this).attr("data-name") == "admin") {
      var _this = $(this);
      $("#admin-homepage").show();
      $("#bulletin-homepage").hide();
      $("#student-admin-homepage").hide();
      $("#dorm-homepage").hide();
      $("#homepage").hide();
      addColor(_this);
      $(".menu-list").eq(4).show();
      $(".menu-list").removeClass("active");
      $(".menu-list").children().css({ color: "black" });
      $(".menu-list").eq(4).addClass("active");
      $(".menu-list").eq(4).children().css({ color: "white" });
      $("tbody tr").show();
    }
  });
});

//横向导航栏点击事件

//获得按钮
//点击后显示相应页面，并更改样式
$(".menu-list").each(function (i) {
  $(this).on("click", function () {
    //清除所有样式
    $(".menu-list").removeClass("active");
    $(".menu-list").children().css({ color: "black" });
    //点击按钮添加样式
    $(".menu-list").eq(i).addClass("active");
    $(".menu-list").eq(i).children().css({ color: "white" });
    //点击后显示相应页面
    var text = $.trim(
      $(this)
        .text()
        .substring(0, $(this).text().length - 1)
    );

    // function addColor(_this) {
    //   $(_this).parent().siblings().children().css({ color: "" });
    //   $(_this).attr("style", "color: #0f6efd");
    //   $(_this).siblings().attr("style", "color: #0f6efd");
    // }

    if (text == "公告主页x") {
      $("#homepage").show();
      $("#dorm-homepage").hide();
      $("#student-admin-homepage").hide();
      $("#bulletin-homepage").hide();
      $("#admin-homepage").hide();
      //左侧导航栏更改相应颜色
      addColor($(".nav-link").eq(0));
    }
    if (text == "宿舍管理") {
      $("#homepage").hide();
      $("#dorm-homepage").show();
      $("#student-admin-homepage").hide();
      $("#bulletin-homepage").hide();
      $("#admin-homepage").hide();
      addColor($(".nav-link").eq(1));
    }

    if (text == "学生管理") {
      $("#homepage").hide();
      $("#dorm-homepage").hide();
      $("#student-admin-homepage").show();
      $("#bulletin-homepage").hide();
      $("#admin-homepage").hide();
      addColor($(".nav-link").eq(2));
    }

    if (text == "公告管理") {
      $("#homepage").hide();
      $("#dorm-homepage").hide();
      $("#student-admin-homepage").hide();
      $("#bulletin-homepage").show();
      $("#admin-homepage").hide();
      addColor($(".nav-link").eq(3));
    }

    if (text == "管理员管理") {
      $("#homepage").hide();
      $("#dorm-homepage").hide();
      $("#student-admin-homepage").hide();
      $("#bulletin-homepage").hide();
      $("#admin-homepage").show();
      addColor($(".nav-link").eq(4));
    }
  });
});

//顶部导航栏删除事件
$(".menu-list a").on("click", function () {
  event.stopPropagation();
  $(this).parent().css({ display: "none" });
  $("#homepage").show();
  $("#dorm-homepage").hide();
  $("#student-admin-homepage").hide();
  $("#bulletin-homepage").hide();
  $("#admin-homepage").hide();
  //左侧导航栏更改相应颜色
  addColor($(".nav-link").eq(0));
  //顶部导航栏修改颜色
  $(".menu-list").eq(0).show();
  $(".menu-list").removeClass("active");
  $(".menu-list").children().css({ color: "black" });
  $(".menu-list").eq(0).addClass("active");
  $(".menu-list").eq(0).children().css({ color: "white" });
});

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

//搜索
$(".search").on("click", function () {
  var searchText =
    $(".dormSearch").val() ||
    $(".stuSearch").val() ||
    $(".bulletinSearch").val() ||
    $(".adminSearch").val();
  if ($.trim(searchText) != "") {
    $("tbody tr")
      .hide()
      .filter(":contains('" + searchText + "')")
      .show();
    $(".dormSearch").val("");
    $(".stuSearch").val("");
    $(".bulletinSearch").val("");
    $(".adminSearch").val("");
  }
});

//重置
$(".reset").on("click", function () {
  $(".dormSearch").val("");
  $(".stuSearch").val("");
  $(".bulletinSearch").val("");
  $(".adminSearch").val("");
  render();
  createPage();
});

//修改点击事件
// for (let i = 0; i < $("a").length; i++) {
//   if ($("a").eq(i).html() == "修改") {
//     $("a")
//       .eq(i)
//       .on("click", function () {
//         $("#modify-container").show();
//         $("#modify-dormId").val(
//           $(this).parents("tr").children().first().text()
//         );
//         $("#modify-dormName").val(
//           $(this).parents("tr").children().eq(1).text()
//         );
//         $("#numOfPeople").val($(this).parents("tr").children().eq(2).text());
//         $("#chargefee").val($(this).parents("tr").children().eq(3).text());
//         id = $(this).parents("tr").attr("data-id");
//         type = $(this).parents("tr").children().eq(4).text();
//       });
//   }
// }

var arr = []; //存所有的数据;
var count1 = 5; //一页多少条数据
var page = 1; //当前的页数
var n;

function diaoyong() {
  //公告页数据获取和渲染
  $.ajax({
    url: "/news/getnews",
    data: { page: page, count: count1 },
    success: function (res) {
      //获取数据成功后
      // var json2 = JSON.parse(res);
      // var arr = json2.data;

      if (res.data.length) {
        //变成数组对象 [{},{},...]
        //将数据的内容存放到数组中，方便获取和遍历
        arr = res.data;

        //   //创建公告页面
        createBulletin();
        //   //创建page页面
        createPage(res.count);
      }
    },
  });
}

diaoyong();

//获得公告内容，将内容渲染到html中

function createBulletin() {
  // 1  0-4，第一页，第一条到第五条，index 0-4
  // 2  5-9
  // 3  10-14
  // 4  15-19
  // n  (n-1)*5 -  5*n

  //每次调用后先清空页面
  $("#newsPage").html("");

  //遍历arr中的数据添加到节点中，并渲染
  //function中的参数 i,v 的顺序不能变
  //遍历中都有i,v,记得复习

  $.each(arr, function (i, v) {
    $("#newsPage").append(
      '  <a href="#" class="list-group-item list-group-item-action">\
          <div class="d-flex w-100 justify-content-between">\
            <h5 class="mb-1">' +
        v.title +
        "</h5>\
            <small>" +
        v.uploadTime +
        '</small>\
          </div>\
          <p class="mb-1">' +
        v.content +
        "</p>\
        </a>\
"
    );
  });
}

//创建页码
function createPage(n1) {
  $("#news-page-switch a").remove();
  n = Math.ceil(n1 / count1);
  for (var i = 1; i <= n; i++) {
    $(".newsNext").before($('<a href="javascript:;">' + i + "</a>"));
  }
}

//子元素有点击事件的时候，将点击事件加给父元素

$("#news-page-switch").on("click", "a", function () {
  page = $(this).text();
  diaoyong();
});

// 点击向后退
$(".newsBefore").on("click", function () {
  if (page > 1) {
    page--;
  }
  diaoyong();
});

//点击前进
$(".newsNext").on("click", function () {
  if (page <= n) {
    page++;
  }
  diaoyong();
});

//面包屑导航事件

//点击获取数据，存在localstorage的nav 数组中

// $(".nav-link").each(function (i) {
//   $(this).on("click", function () {
//     localStorage.setItem($(this).attr("data-name"), $(this).html());
//   });
// });

//数据去重

// function unique(arr) {
//   return Array.from(new Set(arr));
// }

// var navArr = [];
// var uniqueArr = unique(navArr);

// for (var i = 0; i < uniqueArr.length; i++) {}

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
