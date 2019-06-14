require(['./config'],()=>{
    require(['url','header','footer',],(url,header,footer)=>{
         // 写购物页逻辑
         class shopCart{
             constructor(){
                this.n=0;
                this.init();
               console.log(this.n,00000)
                //  console.log(this.checks.get(1).checked,2222)
               //获取localstorge信息
                this.getLocalStorge();
               
             }
             init(){
                // console.log($('#shopCartNUM'),147852)
                // console.log(JSON.parse(localStorage.getItem('cart')),123456)
                let shopNum=JSON.parse(localStorage.getItem('cart')).length;
                $(".shopCartNUM").html(shopNum);
             }
             getLocalStorge(){
              let localShop =JSON.parse( localStorage.getItem('cart'))
              localShop.forEach((index,item)=>{
                console.log(item,"0000000")
                $('.shop-container').prepend(`
               <div class="section1"> 
                <div class="section1-left">
                <dl>
                    <dd><input type="checkbox"></dd>
                    <dt><img src="{{item.bigImg}}" alt=""></dt>
                    <dd> 
                        <a href="javascript:;">${item.title}</a>
                        <p>商品编号：</p>
                        <p>${item.origin}</p>
                    </dd>
                </dl>
            </div>
            <div class="section1-right">
                <p>本白</p>
                <p>M</p>
                <p>
                        <span class="reduceNum">-</span><input id= "num-input" class="number" value="2"></input><span class="addNum">+</span>
                </p>
                <p>￥<span class="price">139</span></p>
                <p><span class="delBtn">X</span></p>
            </div> 
            </div> `)
            //增减数量
            this. changeNum();
            // 全选单选事件
            this.bindEvent();
            this.checks=$('.section1 input:checkbox');
            console.log(this.checks,"input数量");
              })

             }


             changeNum(){
               $('.reduceNum').each((index,item)=>{
                //  console.log($(item),"qqq");
                 $(item).on('click',()=>{
                   console.log($(item).siblings('.number'),123333)
                  let num=$(item).siblings('.number').val();
                  if(num>0){
                    num--;
                  }else{
                    num=0;
                  }
                  $(item).siblings('.number').val(num);
                 })
                 this.calcMoney();
               })
               
               $('.addNum').each((index,item)=>{
                $(item).on('click',()=>{
                 let num=$(item).siblings('.number').val();
                 num++;
                 $(item).siblings('.number').val(num);
                })
                this.calcMoney();
              })
              }
              
              // 按钮绑定事件
              bindEvent(){
                // 全选按钮
                  $('#allCheck').on('change',()=>{
                    console.log(this.checks,"iiii")
                    // this.checks.get(0).checked=$('#allCheck').get(0).checked;
                  this.checks.each((index,item)=>{
                    item.checked=$('#allCheck').get(0).checked;
                  })

                    this.n=$('#allCheck').get(0).checked? this.checks.length: 0;
                     console.log(this.n,"n的值")
                    this.calcMoney();
                  })

                 // 单选按钮
                  // $('.section1 input:checkbox').each((index,item)=>{
                  //   $(item).on('change',()=>{
                  //     // console.log(this.n,147)
                  //     this.n +=item.checked? 1:-1;
                  //     $('#allCheck').get(0).checked= this.n===this.checks.length;
                  //     // console.log(this.n)
                  //     this.calcMoney();
                  //   })
                  // })
                  // 删除按钮
                  $('.delBtn').each((index,item)=>{
                    $(item).on('click',()=>{
                      if(confirm("确定删除吗?")){
                        let section=$(item).parent().parent().parent()
                        // console.log(section,133)
                        let inpChange=$(item).parent().parent().siblings().children()[0].children[0].children[0];
                        if(inpChange.checked) this.n--;
                          section.remove();
                       
                        this.checks=$('.section1 input:checkbox');
                        // console.log(this.checks,"新的n个数")
                         $('#allCheck').get(0).checked=this.n===this.checks.length;
                        //  console.log(this.n,1111);
                      }
                      this.calcMoney();
                    })
                  })
                  
                  if(this.n==0){$('#allCheck').get(0).checked="check";}
                  // 付款按钮
                  $('#payMoney').on('click',()=>{
                    this.payMoney();
                    console.log("fukuan")
                  })
                  

              }
              // 专门用来计算总价
	            calcMoney(){
                var arr=[];
                this.checks=$('.section1 input:checkbox');
                this.checks.each((index,item)=>{
                  arr.push(item);
                })
                // console.log(arr,"shuzu")
                 // 计算总价
                 let money=arr.reduce(function(money,check){
                  // console.log(money,check,123);
                 if(check.checked){
                   let section=$(check).parent().parent().parent().siblings();
                   // console.log(section,"zhu")
                   let number=section.find('.number').val()
                   let price=section.find('.price').html();
                    console.log(number,price,"mmm");
                   let totalTd=number*price;
                   money += totalTd;
                 }
                 return money;
               },0);
               $('#tolMon').html(money);
              
               // 计算总件数
                let tolNum=arr.reduce(function(tolNum,check){
                //  console.log(tolNum,check,123);
                 if(check.checked){
                   let section=$(check).parent().parent().parent().siblings();
                   let number=Number(section.find('.number').val());
                  tolNum += number;
                 }
                 return tolNum;
                },0);
                console.log(tolNum)
                 $('#tolNum').html(tolNum);
              }
              payMoney(){
                if(confirm("确定付款吗？")){
                  alert("请前往付款页面")
                }
              }
         }
         new shopCart();
    })
})