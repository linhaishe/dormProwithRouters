$(".warning").hide();

$(".login-btn").click(function () {
  //非空判断
  for (var i = 0; i < $("input").length; i++) {
    if ($("input").eq(i).val() == "") {
      $(".warning").show();
    }
  }

  //后台数据请求
  $.ajax({
    url: "/login/getuser",
    data: {
      username: $(".username").val(),
      password: $(".psw").val(),
      type: $("input:radio:checked").next().html().trim(),
    },
    type: "get",
    success: function (res) {
      console.log("资料获取成功");
      console.log(res);
      //判断如果获取到数据则跳转到homepage页面
      if (res.data.length) {
        // 这个时候我们可以使用JSON.stringify()这个方法，来将JSON转换成为JSON字符串
        var d = JSON.stringify(res.data[0]);
        localStorage.setItem("data", d);
        console.log(localStorage.data);

        //将JSON字符串转换成为JSON对象输出
        var json = localStorage.getItem("data");
        var jsonObj = JSON.parse(json);

        console.log("json", json);
        console.log("jsonObj", jsonObj);
        console.log("jsonObjtype", jsonObj.type);

        //获取localstroange的数据，判断是否为管理员
        //登入成功后页面转换
        // alert("登入成功");
        // window.location.href =
        //   "/DormitoryManagementSystemProject/pages/homepage.html";

        //将登入的用户数据存储在localstorage中，并判断type是否存在，然后进入不同页面
        $(location).attr("href", "homepage.html");

        //用户权限，学生登入将隐藏不相关页面
      } else {
        $(".warning").show();
      }
    },
  });
});
