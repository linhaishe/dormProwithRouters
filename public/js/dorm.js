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

// $(".exit a").on("click", function () {
//   //导向登入页面
//   $(location).attr("href", "index.html");

//   //清空缓存
//   localStorage.clear();
// });

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
                <a href="#" class="addSinglePro">添加和查看财产</a>\
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
      case "addSinglePro":
        $("a")
          .eq(i)
          .on("click", function () {
            $("#add-dorm-pro-single-container").show();
            $("#selfDormId").val($(this).parents("tr").children().eq(0).html());
            id = $(this).parents("tr").attr("data-id");
            getDormProperty();
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

var dormPropertyArr = [];
var dormCount = 10; //一页多少条数据
var dormPage = 1; //当前的页数
//添加和查看宿舍财产
//获取后台某个宿舍的财产信息
function getDormProperty() {
  $.ajax({
    url: "/getDormProperty",
    data: { id: id, page: dormPage, count: dormCount },
    success: function (res) {
      if (res.error == 0) {
        dormPropertyArr = res.data;
        createDormPro();
        createDormPage(res.count);
        console.log("dormPropertyArr", dormPropertyArr);
      }
      if (res.error == 1) {
        noPro();
      }
    },
  });
}

//无财产信息返回页面显示
function noPro() {
  $("#addSingleProTbody").html("");
  $("#addSingleProTbody").append('<tr><td colSpan="4">暂无财产</td></tr>');
}

//页面渲染,创建宿舍财产页面
function createDormPro() {
  $("#addSingleProTbody").html("");
  $.each(dormPropertyArr, function (i, v) {
    var stateRender;
    var stateNum = v.proState;
    switch (stateNum) {
      case 1:
        stateRender = "良好";
        break;
      case 2:
        stateRender = "损坏";
        break;
      case 3:
        stateRender = "正在修复";
        break;
      case 4:
        stateRender = "废弃";
        break;
    }
    $("#addSingleProTbody").append(
      '              <tr>\
                <th scope="row">' +
        v.id +
        "</th>\
                <td>" +
        v.proName +
        "</td>\
                <td>" +
        stateRender +
        '</td>\
                <td>\
                  <a class="delDormPro" href="#">删除</a\
                  ><a class="updateDormPro" href="#">修改</a>\
                </td>\
              </tr>\
'
    );
  });
}

//创建页码
function createDormPage(n1) {
  $("#checkfee-page-switch a").remove();
  n = Math.ceil(n1 / dormCount);
  for (var i = 1; i <= n; i++) {
    $(".checkpro-before").before($('<a href="javascript:;">' + i + "</a>"));
  }
}

//子元素有点击事件的时候，将点击事件加给父元素

$("#checkpro-page-switch").on("click", "a", function () {
  dormPage = $(this).text();
  getDormProperty();
});

// 点击向后退
$(".checkpro-before").on("click", function () {
  if (dormPage > 1) {
    dormPage--;
  }
  getDormProperty();
});

//点击前进
$(".checkpro-next").on("click", function () {
  if (dormPage <= n) {
    dormPage++;
  }
  getDormProperty();
});

//所有未使用的财产渲染
var noUseArr = [];
var proUniId;
$.ajax({
  url: "/getNoUseProperty",
  success: function (res) {
    if (res.error == 0) {
      noUseArr = res.data;
      console.log("noUseArr", noUseArr);
      addsingleProSelectRender();
      $(function () {
        //选项点击事件
        $(".addSingleproDormBtn li a").click(function () {
          proUniId = $(this).parent().attr("data-proUniqueId");
          //buttom赋值
          $("#add-pro-dorm").text($(this).text());
          //button添加class
          $("#add-publicProBtn").attr("data-proUniqeId", proUniId);
        });
        // $(".updateproDormBtn li a").click(function () {
        //   var dormUniqueId = $(this).parent().attr("data-dormUniqueId");
        //   dormUniId = dormUniqueId;
        //   console.log(dormUniqueId);
        //   $("#modify-pro-dorm").text($(this).text());
        //   $(".modify-dorm-dropdown-btn").attr("data-dormid", dormUniqueId);
        // });
      });
    }
  },
});

function addsingleProSelectRender() {
  $(".addSingleproDormBtn").html();
  $.each(noUseArr, function (i, v) {
    $(".addSingleproDormBtn").append(
      "<li data-proUniqueId=" +
        v.id +
        '><a class="dropdown-item" href="#">' +
        v.proName +
        "</a></li>"
    );
  });
  // $(".updateproDormBtn").html();
  // $.each(dormArr, function (i, v) {
  //   $(".updateproDormBtn").append(
  //     "<li data-dormUniqueId=" +
  //       v.id +
  //       '><a class="dropdown-item" href="#">' +
  //       v.dormName +
  //       "</a></li>"
  //   );
  // });
}

//单个宿舍添加财产
$(".add-dorm-pro-single-confirm").on("click", function () {
  $.ajax({
    url: "/addProSigle",
    type: "post",
    data: {
      dormid: id,
      proUniId: $("#add-publicProBtn").attr("data-proUniqeId"),
    },
    success: function (res) {
      if (res.error == 0) {
        $("#add-dorm-pro-single-container").hide();
        createDormPro();
      }
    },
  });
});
