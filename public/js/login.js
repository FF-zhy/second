console.log("login.js ");
// 绑定登录按钮的事件
$(".login-btn").on("click",(event) => {
    event.preventDefault();
    var data = $(".login-form").serialize();
    const url = "/api/users/login"
    // post请求
    $.post(url, data, (data) => {
        if( data.res_body.status === 1){
            // 验证成功，保存登录用户名
            sessionStorage.username = data.res_body.data.username;
            location.href = "/" ;
        } else {
            $(".login-error").removeClass("hidden");
        }
    })
})