function BillManage(){
    this.createDom();
    // 加载一次数据库的数据
    $.proxy(this.loadData(),this);
}
// 带添加数据
BillManage.theadTr = `
<tr>
  <th>账单编号</th>
  <th>商品名称</th>
  <th>商品单位</th>
  <th>供应商</th>
  <th>数量</th>
  <th>账单金额</th>
  <th>是否付款</th>
  <th>创建时间</th>
  <th>操作</th>
</tr>  
    
`;
BillManage.tbodyTr = `
<tr>
  <td><%= billNumber +" [unique]"%></td>
  <td><%= foodName%></td>
  <td>……</td>
  <td>……</td>
  <td><%= foodAmount%></td>
  <td><%= billAmount%></td>
  <td><%= payment%></td>
  <td>[mongodb]</td>
  <td>
    <img class="read-img" src="/images/read.png" data-toggle="modal" data-target="#myBillModal" title='查看' alt="">
    <img class="updata-img" src="/images/updata.png" data-toggle="modal" data-target="#myBillModal" title='更新' alt="">
    <img class="delete-img" src="/images/delete.png" alt="删除">
  </td>
</tr>  
  
`;
// 账单管理的模态框实例
BillManage.modal = `
    <div class="modal fade" id="myBillModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
              <h4 class="modal-title" id="myModalLabel">添加订单管理</h4>
            </div>
            <div class="modal-body">
              <!-- 数据收集表单 -->
              <form class="form-horizontal my-bill-form">
                  <div class="form-group">
                    <div class="alert alert-danger hidden add-pos-error">添加账单有误</div>
                    <label for="billNumber" class="col-sm-2 control-label">账单编号</label>
                    <div class="col-sm-9">
                      <input type="text" class="form-control" id="billNumber" name="billNumber" placeholder="请输入账单编号">
                    </div>
                  </div>

                  <div class="form-group">
                    <label for="foodName" class="col-sm-2 control-label">商品名称</label>
                    <div class="col-sm-9">
                      <input type="text" class="form-control" id="foodName" name="foodName" placeholder="请输入商品名称">
                    </div>
                  </div>

                  <div class="form-group">
                    <label for="foodUnit" class="col-sm-2 control-label">商品单位</label>
                    <div class="col-sm-9">
                      <input type="text" class="form-control" id="foodUnit" name="foodUnit" placeholder="请输入商品单位">
                    </div>
                  </div>

                  <div class="form-group">
                    <label for="supplier" class="col-sm-2 control-label">供应商</label>
                    <div class="col-sm-9">
                      <input type="text" class="form-control" id="supplier" name="supplier" placeholder="请输入供应商">
                    </div>
                  </div>

                  <div class="form-group">
                    <label for="foodAmount" class="col-sm-2 control-label">商品数量</label>
                    <div class="col-sm-9">
                      <input type="text" class="form-control" id="foodAmount" name="foodAmount" placeholder="请输入商品数量">
                    </div>
                  </div>

                  <div class="form-group">
                    <label for="billAmount" class="col-sm-2 control-label">账单金额</label>
                    <div class="col-sm-9">
                      <input type="text" class="form-control" id="billAmount" name="billAmount" placeholder="请输入账单金额">
                    </div>
                  </div>

                  <div class="form-group" >
                    <label for="billAmount" class="col-sm-2 control-label">是否付款</label>
                    <div class="col-sm-9">
                      <label class="col-sm-offset-2" for="no-payment">未付款</label>
                      <input type="radio"  name="payment" id="no-payment" >
                      <label class="col-sm-offset-2"  for="has-payment">已付款</label>
                      <input type="radio" name="payment" id="has-payment" >
                    </div>
                  </div>
                  

                </form>
            </div>
            <div class="modal-footer form-opration">
              <button type='button' class='btn my-first-updata ' >更新数据</button>
              <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
              <button type="button" class="btn btn-primary">添加数据</button>
            </div>
          </div>
        </div>
      </div>`;

BillManage.selectAlert = `
    <span class="left">商品名称：</span>   
    <input class="left" type="text" placeholder="请输入商品名称" > 

    <span class="left">供应商</span>
    <select class="left" name="" id="" >
        <option value="">-请选择-</option>
        <option value="">供应商1</option>
    </select>

    <span class="left">是否付款</span>
    <select class="left" name="" id="">
        <option value="">-请选择-</option>
        <option value="">已付款</option>
        <option value="">未付款</option>
    </select>

    <button class="left" style="margin-left:10px; background:green;color:white">查询</button>
    <button class="right add-bill" style="margin-right:10px; background:skyblue;color:white" data-toggle="modal" data-target="#myBillModal">添加订单</button>
`;
$.extend(BillManage.prototype, {
    createDom(){
        // 查询条件插入
        $(".alert-success").html (BillManage.selectAlert) ;
        // 表格头部
        $(".table thead").html(BillManage.theadTr);
        //添加数据modal
        $("body").append(BillManage.modal);
        
        // 添加事件监听
        this.addListener();
    },
    addListener(){
        //model添加数据 按钮
        $(".btn-primary").on("click",$.proxy(this.confirmAdd,this));
        $(".add-bill").on("click",() => {
          // 重置表单数据
          $(".my-bill-form input").val("");
        })
    },
    // 添加数据
    confirmAdd(){
        var data = $(".my-bill-form").serialize();
        console.log( $("input[name=payment]")[0].checked );
        if($("input[name=payment]")[0].checked) {
          data += "false" ;
        } else {
          data += "true" ;
        }

        //const data = new FormData( $(".my-bill-form") );
        console.log("待上传的数据___",data);
        const url = "/api/users/add_bill";
        // $.post(url, data, (data) => {
        //     console.log(data);
        // })
        $.ajax({
            type: "post",
            url: url,
            data: data,
            dataType: "json",
            //processData : false, 
            //contentType : false,
            success: function (response) {
                console.log(response.res_body.data);
                const html = ejs.render(BillManage.tbodyTr, response.res_body.data);
                // 显示出来
                $(".table tbody").append(html);
                //console.log( $("#myBillModal") );
                $("#myBillModal").modal("hide");
            },
            error:function(err){ //添加失败
              $(".add-pos-error").removeClass("hidden");
              console.log(err);
            }
        });
    },
    // 加载数据
    loadData(page){
      var _this = this;
      page = page || 1;
      const url = "/api/users/find_by_page?page=" + page;
      $.getJSON(url,
        function (data) {
          if (data.res_code === 1) {
            let html = "";
            data.res_body.list.forEach((curr)=>{
              html += ejs.render(BillManage.tbodyTr, curr);
            });
            // 渲染内容
            $(".table tbody").html(html);

            // 加载绑定点击事件
            $(".table").on("click",".delete-img",$.proxy(_this.tableDelete, _this));
            $(".table").on("click",".read-img",$.proxy(_this.tableRead, _this));
            // 更新数据,这里没有写模态框。。。。
            $(".table").on("click",".updata-img",$.proxy(_this.tableRead, _this));
            $("body").on("click",".my-first-updata",$.proxy(_this.tableUpdata, _this));
          }
        }
      ); 

    },
    // table上的事件监听
    tableDelete(event){
      if(confirm("确认删除？")) {
        var  tr = $(event.target).parents("tr");
        var _tr = tr.find("td:first").text();
        var _id = _tr.slice(-_tr.length,-9);
        const url = "/api/users/delete?billNumber="+_id;
        // get请求
        $.getJSON(url,(data) => {
          if(data.res_body.status === 1) {
            // 数据库删除成功，移出DOM元素
            tr.remove();
          } else {
            console.log("删除失败")
          }
        })

      } else {
        console.log("no-delete")
      }   
    },
    // table上的读取查看具体的数据
    tableRead(event){
        var  tr = $(event.target).parents("tr");
        var _tr = tr.find("td:first").text();
        var _id = _tr.slice(-_tr.length,-9);
        const url = "/api/users/read?billNumber="+_id;
        // get请求
        $.getJSON(url,(data) => {
          if(data.res_body.status === 1) {
            // 数据库查询成功，显示在DOM元素
            const{billAmount, billNumber, foodAmount, foodName, payment} = data.res_body.data
            console.log("read_______",data.res_body.data);
            $("input[name=billAmount]").val(billAmount);
            $("input[name=billNumber]").val(billNumber);
            $("input[name=foodAmount]").val(foodAmount);
            $("input[name=foodName]").val(foodName);
            // 购买状态
            if(!payment) {
              $("input[name=payment]:first").attr("checked","true");
            } else {
              $("input[name=payment]:last").attr("checked","true");
            }

          } else {
            console.log("查看失败");
          }
        })
  
    },
    // table上的更新的数据
    tableUpdata(){
      var td_val ; 
      var data = $(".my-bill-form").serialize();
      data = data.slice(-data.length,-2)
      if($("input[name=payment]")[0].checked) {
        data += "false" ;
        td_val = "false" ;
      } else {
        data += "true" ;
        td_val = "true" ;
      }
      const url = "/api/users/updata";
      // get请求
      $.post(url,data,(data) => {

        if(data.res_body.status === 1) {
          // 数据库查询成功，显示在DOM元素
          console.log("更新成功_______",);
          // 重新加载table
          this.loadData()
          // 关闭模态框
          $("#myBillModal").modal("hide");
        } else {
          console.log("更新失败");
        }
      })
    }
})