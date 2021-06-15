// 点击添加显示页面
$(".add-property").on("click", function () {
  $("#addPropertyContainer").show();
  $("#add-pro-name").val("");
  $("#add-pro-type").text("请选择财产状态");
  $("#add-pro-use").text("请选择使用状态");
  $("#add-publicProBtn").text("请选择所属宿舍");
  $(".warning").hide();
});

// 点击关闭则关闭页面
$(".close").on("click", function () {
  $("#addPropertyContainer").hide();
  $("#deletePropertyContainer").hide();
  $("#modifyProContainer").hide();
});

//点击取消关闭页面
for (let i = 0; i < $(".cancel").length; i++) {
  $(".cancel")
    .eq(i)
    .on("click", function () {
      // console.log("取消按钮点击");
      $("#addPropertyContainer").hide();
      $("#deletePropertyContainer").hide();
      $("#modifyProContainer").hide();
    });
}

//获取财产页面
var arr = []; //存所有的数据;
var count1 = 10; //一页多少条数据
var pageCount = 1; //当前的页数
var id;
var n;
var type;

//所属宿舍数据

var dormArr = [];
var dormIdName = [];
var dormUniId;

//进入页面后调用数据并渲染
function getProperties() {
  $.ajax({
    url: "/getProperties",
    data: { page: page, count: count1 },
    success: function (res) {
      if (res.data.length) {
        arr = res.data;
        propertyRender();
        createPropertyPage(res.count);
      }
    },
  });
}

getProperties();

//页面渲染获取数据
function propertyRender() {
  $("#propertyTbody").html("");

  $.each(arr, function (i, v) {
    var stateRender;
    var usedRender;
    var stateNum = v.proState;
    var useNum = v.isUsed;

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

    switch (useNum) {
      case 1:
        usedRender = "未使用";
        break;
      case 2:
        usedRender = "已使用";
        break;
    }
    $("#propertyTbody").append(
      "            <tr data-dormId=" +
        v.proDormId +
        '>\
              <th scope="row">' +
        v.id +
        "</th>\
              <td>" +
        v.proName +
        "</td>\
              <td>" +
        stateRender +
        "</td>\
              <td>" +
        (v.proDormId == null ? "未分配宿舍" : v.dormName) +
        "</td>\
              <td>" +
        usedRender +
        '</td>\
              <td>\
                <a class="delProperty" href="#">删除</a\
                ><a class="PropertyUpdate" href="#">修改</a>\
              </td>\
            </tr>\
'
    );
    //删除修改事件

    for (let i = 0; i < $("a").length; i++) {
      var clickText = $("a").eq(i).attr("class");
      switch (clickText) {
        case "delProperty":
          $("a")
            .eq(i)
            .on("click", function () {
              $("#deletePropertyContainer").show();
              // id = $(this).parents("tr").attr("data-id");
              id = $(this).parents("tr").children().first().text();
            });
          break;
        case "PropertyUpdate":
          $("a")
            .eq(i)
            .on("click", function () {
              $("#modifyProContainer").show();
              // id = $(this).parents("tr").attr("data-id");
              id = $(this).parents("tr").children().first().text();
              //buttom赋值

              $("#modify-pro-id").val(
                $(this).parents("tr").children().first().text()
              );
              $("#modify-pro-name").val(
                $(this).parents("tr").children().eq(1).text()
              );
              $("#modify-pro-type").text(
                $(this).parents("tr").children().eq(2).text()
              );
              $("#modify-pro-dorm").text(
                $(this).parents("tr").children().eq(3).text()
              );
              $("#modify-pro-use").text(
                $(this).parents("tr").children().eq(4).text()
              );
            });
          break;
      }
    }
  });
}

//创建页码
function createPropertyPage(n1) {
  $("#pro-page-switch a").remove();
  n = Math.ceil(n1 / count1);
  for (var i = 1; i <= n; i++) {
    $(".pro-next").before($('<a href="javascript:;">' + i + "</a>"));
  }
}

//子元素有点击事件的时候，将点击事件加给父元素

$("#pro-page-switch").on("click", "a", function () {
  page = $(this).text();
  getProperties();
});

// 点击向后退
$(".pro-before").on("click", function () {
  if (page > 1) {
    page--;
  }
  getProperties();
});

//点击前进
$(".pro-next").on("click", function () {
  if (page <= n) {
    page++;
  }
  getProperties();
});

//添加财产
var proState;
var proUsed;
var dormUniId;

$(".add-pro-confirm").on("click", function () {
  var stateText = $("#add-pro-type").text();
  var usedText = $("#add-pro-use").text();

  switch (stateText) {
    case "良好":
      proState = 1;
      break;
    case "损坏":
      proState = 2;
      break;
    case "正在修复":
      proState = 3;
      break;
    case "废弃":
      proState = 4;
      break;
  }

  switch (usedText) {
    case "未使用":
      proUsed = 1;
      break;
    case "已使用":
      proUsed = 2;
      break;
  }
  $.ajax({
    url: "/addProperties",
    type: "post",
    data: {
      proName: $("#add-pro-name").val(),
      proState: proState,
      proDorm: dormUniId,
      proUsed: proUsed,
    },
    success: function (res) {
      //弹框隐藏
      $("#addPropertyContainer").hide();
      getProperties();
      $("#add-pro-type").text("请选择财产状态");
      $("#add-pro-use").text("请选择使用状态");
      $("#add-pro-dorm").text("请选择所属宿舍");
    },
  });
});

//add-pro-dorm
//proDormBtn
//dropdown click func
$(function () {
  $(".proStateBtn li a").click(function () {
    $("#add-pro-type").text($(this).text());
  });
  $(".updateproDormBtn li a").click(function () {
    $("#modify-pro-dorm").text($(this).text());
  });
  $(".addProUseBtn li a").click(function () {
    $("#add-pro-use").text($(this).text());
  });
});

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

      addProSelectRender();
      //dropdown click func
      $(function () {
        //选项点击事件
        $(".add-publicPro li a").click(function () {
          var dormUniqueId = $(this).parent().attr("data-dormUniqueId");
          //buttom赋值
          dormUniId = dormUniqueId;
          $("#add-publicProBtn").text($(this).text());
          //button添加class
          $("#add-publicProBtn").attr("data-dormid", dormUniqueId);
        });
        $(".updateproDormBtn li a").click(function () {
          var dormUniqueId = $(this).parent().attr("data-dormUniqueId");
          dormUniId = dormUniqueId;
          console.log(dormUniqueId);
          $("#modify-pro-dorm").text($(this).text());
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

function addProSelectRender() {
  $(".add-publicPro").html();
  $.each(dormArr, function (i, v) {
    console.log("dormArr", dormArr);
    $(".add-publicPro").append(
      "<li data-dormUniqueId=" +
        v.id +
        '><a class="dropdown-item" href="#">' +
        v.dormName +
        "</a></li>"
    );
  });
  $(".updateproDormBtn").html();
  $.each(dormArr, function (i, v) {
    $(".updateproDormBtn").append(
      "<li data-dormUniqueId=" +
        v.id +
        '><a class="dropdown-item" href="#">' +
        v.dormName +
        "</a></li>"
    );
  });
}

//公共财产删除
$(".delete-pro-confirm").on("click", function () {
  $.ajax({
    url: "/deleProperty",
    type: "post",
    data: { id: id },
    success: function (res) {
      if (res.error == 0) {
        $("#deletePropertyContainer").hide();
        getProperties();
      }
    },
  });
});

//公共财产更新

$(".modify-pro-confirm").on("click", function () {
  var stateText = $("#modify-pro-type").text();
  var usedText = $("#modify-pro-use").text();

  switch (stateText) {
    case "良好":
      proState = 1;
      break;
    case "损坏":
      proState = 2;
      break;
    case "正在修复":
      proState = 3;
      break;
    case "废弃":
      proState = 4;
      break;
  }

  switch (usedText) {
    case "未使用":
      proUsed = 1;
      break;
    case "已使用":
      proUsed = 2;
      break;
  }

  $.ajax({
    url: "/updateProperty",
    type: "post",
    data: {
      id: id,
      proName: $("#modify-pro-name").val(),
      proState: proState,
      proDorm: dormUniId,
      proUsed: proUsed,
    },
    success: function (res) {
      if (res.error == 0) {
        $("#modifyProContainer").hide();
        getProperties();
      }
    },
  });
});
