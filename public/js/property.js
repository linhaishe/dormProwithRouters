// 点击添加显示页面
$(".add-property").on("click", function () {
  $("#addPropertyContainer").show();
  $("#add-pro-type").text("请选择财产状态");
  $("#add-pro-use").text("请选择使用状态");
  $("#add-pro-dorm").text("请选择所属宿舍");
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

//dropdown click func
$(function () {
  $(".proStateBtn li a").click(function () {
    $("#add-pro-type").text($(this).text());
  });
  $(".proDormBtn li a").click(function () {
    $("#add-pro-dorm").text($(this).text());
  });
  $(".addProUseBtn li a").click(function () {
    $("#add-pro-use").text($(this).text());
  });
});

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
          $("#modify-pro-id").val(
            $(this).parents("tr").children().first().text()
          );
          $("#modify-pro-name").val(
            $(this).parents("tr").children().eq(1).text()
          );
          $("#modify-pro-type").text(
            $(this).parents("tr").children().eq(2).text()
          );
          $("#modify-pro-dorm").text($(this).parents("tr").attr("data-pass"));
          $("#modify-pro-use").text(
            $(this).parents("tr").children().eq(4).text()
          );
        });
      break;
  }
}
