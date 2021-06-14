// //判断是否是学生，显示对应的页面

var json = localStorage.getItem("data");
var jsonObj = JSON.parse(json);
// if (jsonObj.type == undefined) {
//   $("#nav-left ul").children().eq(1).hide();
//   $("#nav-left ul").children().eq(3).hide();
//   $("#nav-left ul").children().eq(4).hide();
// }
// console.log("jsonObj", jsonObj);

// console.log("jsonObj.name", jsonObj.name);
// console.log("jsonObj.stuName", jsonObj.stuName);

// //jsonObj.stuName
// //页眉导航栏显示用户名
// if (jsonObj.name) {
//   $(".userNamePanel").html(jsonObj.name);
//   console.log(jsonObj.name);
// } else {
//   $(".userNamePanel").html(jsonObj.stuName);
//   console.log(jsonObj.stuName);
// }

// 公告添加事件

$(".add-news").on("click", function () {
  $("#addBulletinContainer").show();
  $(".warning").hide();
});

$(".close").on("click", function () {
  $("#addBulletinContainer").hide();
  $("#deleteNewscontainer").hide();
  $("#modifyNewscontainer").hide();
});

for (let i = 0; i < $(".cancel").length; i++) {
  $(".cancel")
    .eq(i)
    .on("click", function () {
      $("#addBulletinContainer").hide();
      $("#deleteNewscontainer").hide();
      $("#modifyNewscontainer").hide();
    });
}

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

var arr = [];
var count = 10; //一页多少条数据
var page = 1; //当前的页数
var id;
var n;

function getNews() {
  $.ajax({
    url: "/news/getnewscontrol",
    // data: {},
    type: "get",
    success: function (res) {
      if (res.data.length) {
        arr = res.data;
        newsRender();
        createNewsPage();
      }
    },
  });
}

getNews();

function newsRender() {
  $("#newsTbody").html("");
  $.each(arr.slice((page - 1) * count, page * count), function (i, v) {
    $("#newsTbody").append(
      '            <tr>\
              <th scope="row">' +
        v.id +
        "</th>\
              <td>" +
        v.title +
        "</td>\
              <td>" +
        v.content +
        "</td>\
              <td>" +
        v.uploadTime +
        "</td>\
              <td>" +
        v.userName +
        '</td>\
              <td><a class="delNews" href="#">删除</a><a class="newsUpdate" href="#">修改</a></td>\
            </tr>\
'
    );
  });
  for (let i = 0; i < $("a").length; i++) {
    var clickText = $("a").eq(i).attr("class");
    switch (clickText) {
      case "delNews":
        $("a")
          .eq(i)
          .on("click", function () {
            $("#deleteNewscontainer").show();
            id = $(this).parents("tr").children().eq(0).text();
            // type = console.log(id);
          });
        break;
      case "newsUpdate":
        $("a")
          .eq(i)
          .on("click", function () {
            $("#modifyNewscontainer").show();
            id = $(this).parents("tr").children().eq(0).text();
            $("#modifyNewscontainer").show();
            $("#newsId").val($(this).parents("tr").children().first().text());
            $("#newTitle").val($(this).parents("tr").children().eq(1).html());
            $("#modify-news-content").val(
              $(this).parents("tr").children().eq(2).html()
            );
            $("#uploadTime").val($(this).parents("tr").children().eq(3).text());
            $("#uploader").val($(this).parents("tr").children().eq(4).text());
          });
        break;
    }
  }
}

//创建页码
function createNewsPage() {
  n = Math.ceil(arr.length / count);
  $("#page-switch a").remove();
  for (var i = 1; i <= n; i++) {
    $(".next").before($('<a href="javascript:;">' + i + "</a>"));
  }
}

//子元素有点击事件的时候，将点击事件加给父元素

$("#page-switch").on("click", "a", function () {
  page = $(this).text();
  render();
});

// 点击向前
$(".before").on("click", function () {
  if (page > 1) {
    page--;
  }
  render();
});

//点击向后
$(".next").on("click", function () {
  if (page < n) {
    page++;
  }
  render();
});
$(".warning").hide();
//添加公告
$(".add-bulletin-confirm").on("click", function () {
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
    url: "/news/addnews",
    data: {
      content: $("#news-content").val(),
      title: $("#newsTitle").val(),
      adminId: jsonObj.adminId,
      adminName: jsonObj.adminName,
    },
    type: "post",
    success: function (res) {
      if (res.error == 0) {
        $("#addBulletinContainer").hide();
        getNews();
      }
    },
  });
});

//删除公告
$(".delete-bulletin-confirm").on("click", function () {
  $.ajax({
    url: "/news/delNews",
    data: { id: id },
    type: "post",
    success: function (res) {
      if (res.error == 0) {
        $("#deleteNewscontainer").hide();
        getNews();
      }
    },
  });
});

//修改公告
$(".modify-bulletin-confirm").on("click", function () {
  $.ajax({
    url: "/news/updateNews",
    data: {
      content: $("#modify-news-content").val(),
      title: $("#newTitle").val(),
      id: id,
    },
    type: "post",
    success: function (res) {
      if (res.error == 0) {
        $("#modifyNewscontainer").hide();
        getNews();
      }
    },
  });
});

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

//搜索
// $(".search").on("click", function () {
//   var searchText = $(".bulletinSearch").val();
//   if ($.trim(searchText) != "") {
//     $("tbody tr")
//       .hide()
//       .filter(":contains('" + searchText + "')")
//       .show();
//   }
// });

// //重置
// $(".reset").on("click", function () {
//   $(".bulletinSearch").val("");
//   render();
//   createPage();
// });

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

// for (let i = 0; i < $("a").length; i++) {
//   if ($("a").eq(i).html() == "删除") {
//     $("a")
//       .eq(i)
//       .on("click", function () {
//         $("#deleteNewscontainer").show();
//         id = $(this).parents("tr").children().first().text();
//         console.log(id);
//       });
//   }
// }

// for (let i = 0; i < $("a").length; i++) {
//   if ($("a").eq(i).html() == "修改") {
//     $("a")
//       .eq(i)
//       .on("click", function () {
//         $("#modifyNewscontainer").show();
//         $("#newsId").val($(this).parents("tr").children().first().text());
//         $("#newTitle").val($(this).parents("tr").children().eq(1).html());
//         $("#modify-news-content").val(
//           $(this).parents("tr").children().eq(2).html()
//         );
//         $("#uploadTime").val($(this).parents("tr").children().eq(3).text());
//         $("#uploader").val($(this).parents("tr").children().eq(4).text());
//         id = $(this).parents("tr").children().first().text();
//       });
//   }
// }
