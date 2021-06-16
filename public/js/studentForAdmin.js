//判断是否是学生，显示对应的页面
// var json = localStorage.getItem("data");
// var jsonObj = JSON.parse(json);

// console.log("json", json);
// console.log("jsonObj", jsonObj);
// console.log("jsonObjtype", jsonObj.type);

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

//添加学生点击事件

$(".add-student").on("click", function () {
  $("#addStuContainer").show();
  $(".dropdown button").text("请选择所属宿舍");
  $(".warning").hide();
});

// 取消和关闭事件
$(".close").on("click", function () {
  $("#addStuContainer").hide();
  $("#deleteStuContainer").hide();
  $("#modifyStuContainer").hide();
  $("#charge-record-container").hide();
  $("#reportDormProperty").hide();
  $("#stuDormRepair").hide();
  $("#stu-charge-fee-container").hide();
});

for (let i = 0; i < $(".cancel").length; i++) {
  $(".cancel")
    .eq(i)
    .on("click", function () {
      $("#addStuContainer").hide();
      $("#deleteStuContainer").hide();
      $("#modifyStuContainer").hide();
      $("#charge-record-container").hide();
      $("#stuDormRepair").hide();
      $("#reportDormProperty").hide();
      $("#stu-charge-fee-container").hide();
    });
}

function renderTime(date) {
  var dateee = new Date(date).toJSON();
  return new Date(+new Date(dateee) + 8 * 3600 * 1000)
    .toISOString()
    .replace(/T/g, " ")
    .replace(/\.[\d]{3}Z/, "");
}

var arr = [];
var count = 10; //一页多少条数据
var page = 1; //当前的页数
var id;
var n;

//查看缴费记录信息渲染
var checkFeeArr = [];
var FeeCount = 10; //一页多少条数据
var FeePage = 1; //当前的页数
var dormKeyId;

function getStudents() {
  $.ajax({
    url: "/student/getstudent",
    // data: {},
    type: "get",
    success: function (res) {
      if (res.data.length) {
        arr = res.data;
        stuRender();
        createStuPage();
      }
    },
  });
}

getStudents();

function stuRender() {
  $("#mainPageTbody").html("");
  $.each(arr.slice((page - 1) * count, page * count), function (i, v) {
    $("#mainPageTbody").append(
      "            <tr data-dormKeyId=" +
        v.stuDormId +
        " data-pass=" +
        v.stupwd +
        " data-id=" +
        v.id +
        '>\
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
        (v.dormType == 1 ? "正常" : "催费") +
        '</td>\
              <td>\
                <a class="delStu" href="#">删除</a><a class="stuUpdate" href="#">修改</a\
                ><a class="stuCheckFee" href="#">查看缴费记录</a><a class="stuFeeCharge" href="#">充值</a><a class="stuDormReport" href="#">宿舍报修</a>\
              </td>\
            </tr>\
'
    );
  });
  //学生管理增删改查点击事件

  for (let i = 0; i < $("a").length; i++) {
    var clickText = $("a").eq(i).attr("class");
    switch (clickText) {
      case "delStu":
        $("a")
          .eq(i)
          .on("click", function () {
            $("#deleteStuContainer").show();
            id = $(this).parents("tr").attr("data-id");
          });
        break;
      case "stuUpdate":
        $("a")
          .eq(i)
          .on("click", function () {
            $("#modifyStuContainer").show();
            id = $(this).parents("tr").attr("data-id");
            $("#modify-stuId").val(
              $(this).parents("tr").children().first().text()
            );
            $("#modify-stuName").val(
              $(this).parents("tr").children().eq(1).text()
            );
            $("#modify-stuAccount").val(
              $(this).parents("tr").children().eq(2).text()
            );
            $("#modifyStuPwd").val($(this).parents("tr").attr("data-pass"));
            id = $(this).parents("tr").attr("data-id");
            $(".dropdown button").text("请选择所属宿舍");
          });
        break;
      case "stuCheckFee":
        $("a")
          .eq(i)
          .on("click", function () {
            $("#charge-record-container").show();
            id = $(this).parents("tr").attr("data-id");
            getPayRecords();
            console.log(id);
          });
        break;
      case "stuDormReport":
        $("a")
          .eq(i)
          .on("click", function () {
            $("#stuDormRepair").show();
            id = $(this).parents("tr").attr("data-id");
          });
        break;
      case "stuFeeCharge":
        $("a")
          .eq(i)
          .on("click", function () {
            $("#stu-charge-fee-container").show();
            dormId = $(this).parents("tr").children().eq(3).text();
            id = $(this).parents("tr").attr("data-id");
            dormKeyId = $(this).parents("tr").attr("data-dormKeyId");
            console.log("dormId", dormId);
            $("#chargefeeAmount").val("");
          });
        break;
    }
  }

  for (let i = 0; i < $("a").length; i++) {
    if ($("a").eq(i).html() == "报修") {
      $("a")
        .eq(i)
        .on("click", function () {
          $("#reportDormProperty").show();
        });
    }
  }

  // for (let i = 0; i < $("a").length; i++) {
  //   if ($("a").eq(i).html() == "充值") {
  //     $("a")
  //       .eq(i)
  //       .on("click", function () {
  //         $("#stu-charge-fee-container").show();
  //         id = $(this).parents("tr").attr("data-id");
  //       });
  //   }
  // }

  // for (let i = 0; i < $("a").length; i++) {
  //   if ($("a").eq(i).html() == "修改") {
  //     $("a")
  //       .eq(i)
  //       .on("click", function () {
  //         $("#modifyStuContainer").show();
  //         $("#modify-stuId").val(
  //           $(this).parents("tr").children().first().text()
  //         );
  //         $("#modify-stuName").val(
  //           $(this).parents("tr").children().eq(1).text()
  //         );
  //         $("#modify-stuAccount").val(
  //           $(this).parents("tr").children().eq(2).text()
  //         );
  //         $("#modifyStuPwd").val($(this).parents("tr").attr("data-pass"));
  //         id = $(this).parents("tr").attr("data-id");
  //         $(".dropdown button").text("请选择所属宿舍");
  //       });
  //   }
  //}
}

//创建页码
function createStuPage() {
  n = Math.ceil(arr.length / count);
  $("#page-switch a").remove();
  for (var i = 1; i <= n; i++) {
    $(".next").before($('<a href="javascript:;">' + i + "</a>"));
  }
}

//子元素有点击事件的时候，将点击事件加给父元素

$("#page-switch").on("click", "a", function () {
  page = $(this).text();
  getStudents();
});

// 点击向前
$(".before").on("click", function () {
  if (page > 1) {
    page--;
  }
  getStudents();
});

//点击向后
$(".next").on("click", function () {
  if (page < n) {
    page++;
  }
  getStudents();
});

//添加学生

$(".add-stu-confirm").on("click", function () {
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
    url: "/students/addstudent",
    data: {
      stuDormId: $(".add-dorm-dropdown-btn").attr("data-dormid"),
      stuId: $("#stuId").val(),
      stuName: $("#stuName").val(),
      stuPas: $("#stuPwd").val(),
      stuUserId: $("#stuAccount").val(),
    },
    type: "post",
    success: function (res) {
      //弹框隐藏
      $("#addStuContainer").hide();
      getStudents();
    },
  });
});

//删除学生

$(".delete-stu-confirm").on("click", function () {
  $.ajax({
    url: "/students/delstudent",
    data: { id: id },
    type: "post",
    success: function (res) {
      $("#deleteStuContainer").hide();
      getStudents();
    },
  });
});

//修改学生

$(".modify-stu-confirm").on("click", function () {
  $.ajax({
    url: "/students/updatestudent",
    data: {
      id: id,
      stuDormId: $(".modify-dorm-dropdown-btn").attr("data-dormid"),
      stuName: $("#modify-stuName").val(),
      stuPas: $("#modifyStuPwd").val(),
    },
    type: "post",
    success: function (res) {
      if (res.error == 0) {
        $("#modifyStuContainer").hide();
        getStudents();
      }
    },
  });
});

//所属宿舍数据

var dormArr = [];
var dormIdName = [];

$.ajax({
  url: "/dorm/getdorms",
  type: "get",
  success: function (res) {
    if (res.data.length) {
      dormArr = res.data;

      //将id和dormid存储在数组中
      $.each(dormArr, function (i, v) {
        var obj = {};
        obj.id = v.id;
        obj.dormId = v.dormId;
        // obj[dormId] = v.dormId;
        dormIdName.push(obj);
      });

      selectRender();
      //dropdown click func
      $(function () {
        $(".add-select-dorm li a").click(function () {
          var dormUniqueId = $(this).parent().attr("data-dormUniqueId");
          $("#add-select-dorm").text($(this).text());
          $(".add-dorm-dropdown-btn").attr("data-dormid", dormUniqueId);
        });
        $(".modify-select-dorm li a").click(function () {
          var dormUniqueId = $(this).parent().attr("data-dormUniqueId");
          $("#modify-select-dorm").text($(this).text());
          $(".modify-dorm-dropdown-btn").attr("data-dormid", dormUniqueId);
        });
      });
    }
  },
});

//获取宿舍
//宿舍数据中 id:主键id，学生添加需要根据宿舍的主键id进行添加
//宿舍数据中 dormId,宿舍名称/编号，显示在下拉选项中
//添加学生数据中 studormId 是宿舍数据中的主键id
//下拉框宿舍渲染

function selectRender() {
  $(".add-select-dorm").html();
  $.each(dormIdName, function (i, v) {
    $(".add-select-dorm").append(
      "<li data-dormUniqueId=" +
        v.id +
        '><a class="dropdown-item" href="#">' +
        v.dormId +
        "</a></li>"
    );
  });
  $(".modify-select-dorm").html();
  $.each(dormIdName, function (i, v) {
    $(".modify-select-dorm").append(
      "<li data-dormUniqueId=" +
        v.id +
        '><a class="dropdown-item" href="#">' +
        v.dormId +
        "</a></li>"
    );
  });
}

//面包屑导航事件

//点击获取数据，存在localstorage的nav 数组中

// $(".nav-link").each(function (i) {
//   $(this).on("click", function () {
//     localStorage.setItem($(this).attr("data-name"), $(this).html());
//   });
// });

//数据去重

function unique(arr) {
  return Array.from(new Set(arr));
}

var navArr = [];
var uniqueArr = unique(navArr);

for (var i = 0; i < uniqueArr.length; i++) {}

//获取后台充值信息
function getPayRecords() {
  $.ajax({
    url: "/getPayRecords",
    type: "post",
    data: { id: id, page: FeePage, count: FeeCount },
    success: function (res) {
      if (res.data.length) {
        checkFeeArr = res.data;
        createPayRecords();
        createPayPage(res.count);
        console.log("checkFeeArr", checkFeeArr);
      }
    },
  });
}

//页面渲染,创建充值页面

function createPayRecords() {
  $("#checkFeeTbody").html("");
  $.each(checkFeeArr, function (i, v) {
    $("#checkFeeTbody").append(
      '            <tr>\
              <th scope="row">' +
        v.amount +
        "</th>\
              <td>" +
        renderTime(v.payTime) +
        "</td>\
            </tr>\
"
    );
  });
}

//创建充值查询页面页码
function createPayPage(n1) {
  $("#checkfee-page-switch a").remove();
  n = Math.ceil(n1 / FeeCount);
  for (var i = 1; i <= n; i++) {
    $(".checkfeeBefore").before($('<a href="javascript:;">' + i + "</a>"));
  }
}

//子元素有点击事件的时候，将点击事件加给父元素

$("#checkfee-page-switch").on("click", "a", function () {
  FeePage = $(this).text();
  getPayRecords();
});

// 点击向后退
$(".checkfeeBefore").on("click", function () {
  if (FeePage > 1) {
    FeePage--;
  }
  getPayRecords();
});

//点击前进
$(".checkfeeAfter").on("click", function () {
  if (FeePage <= n) {
    FeePage++;
  }
  getPayRecords();
});

//学生充值缴费
$(".add-fee-confirm").on("click", function () {
  $.ajax({
    url: "/chargeFee",
    type: "post",
    data: { amount: $("#chargefeeAmount").val(), dormId: dormId },
    success: function (res) {
      if (res.error == 0) {
        $("#stu-charge-fee-container").hide();
        $("#chargefeeAmount").val("");
        getStudents();
      }
    },
  });
  $.ajax({
    url: "/chargeFeeRecord",
    type: "post",
    data: { amount: $("#chargefeeAmount").val(), stuId: id, dormId: dormKeyId },
    success: function (res) {
      if (res.error == 0) {
        $("#stu-charge-fee-container").hide();
        $("#chargefeeAmount").val("");
        getStudents();
      }
    },
  });
});

//宿舍报修
$("#stuDormReport").on("click", function () {
  $.ajax({
    url: "/propertyReport",
    type: "post",
    data: {},
    success: function () {},
  });
});
