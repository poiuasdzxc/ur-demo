// 一个页面对应一个js，这个js里要依赖别的模块
require(['./config'],() =>{
     // 引入config以后就有短名称了
     require(['template','url','header','footer'],(template,url,header,footer)=>{
         // 写列表页逻辑
         class List {
             constructor (){
                this.leftTab();
                this.falsData();
             }

             // 引入假数据方法
             falsData(){
                 // 负责渲染热销模块
                $.get(url.baseUrl +'/shophot/get',resp=> {
                    console.log(resp);
                    if(resp.res_code ===200){
                        this.renderHot(resp.list)
                    }
                })
                console.log(456)
            }
           // 渲染热销产品 
            renderHot(resBody){
                 // 第一个参数是模板的id，第二个参数是这个模板里面需要的数据
                 let html=template('shop-template',{
                     list:resBody,
                 })
                 $('#shop-container').html(html)
                 console.log(html)
            }
            // 下拉菜单
            leftTab(){
                console.log(123)
                $('.aside-left').on('click','.weeknew',function(){
                    console.log($(this).parent());
                    if($(this).parent().children('ul').height()===0){
                     $(this).parent().children('ul').height('auto');
                    }else{
                        $(this).parent().children('ul').height(0);
                       }
                     console.log(this)
                   })
            }

   
        }
        new List()
     })
})