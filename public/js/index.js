setInterval(
    "document.getElementById('webTime').innerHTML = new Date().toLocaleString();"
    //$("#webTime").innerHTML = new Date().toLocaleTimeString()
,1000);

function Header(){
    this.addListener();
    // 判断seesionc存在用户名
    this.haveUser();
    //默认加载 账单管理数据
    this.loadTable();
}
$.extend(Header.prototype,{
    addListener(){
        
    },
    haveUser(){
        const name = sessionStorage.username;
        console.log("用户名————",name);
        if(name){
            $(".login-success li:first").html( "你好，"+name);
            $(".login-none").addClass("hidden").next().removeClass("hidden");
            // 数据显示区域出现
            $(".no-user").css("display","none");
            // 暂时未在服务器上验证
            $(".have-user").removeClass("hidden");
            // 加载注销函数
            $(".logout-btn").on("click",this.logoutHander);  
        }
    },
    // 注销函数
    logoutHander(){
        $(".login-success").addClass("hidden").prev("ul").removeClass("hidden");
        sessionStorage.removeItem("username")  ;
        $.getJSON("/api/users/logout", (data) => {
            console.log("logoutHander_______________",data);
        });
        // 重载页面
        //location.reload();
    },
    // 点击右边加载数据内容
    loadTable(){
        new BillManage();
    }
   
})

// 实例
new Header();