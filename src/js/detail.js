// 一个页面对应一个js，这个js里要依赖别的模块
require(['./config'],()=>{
    // 引入config以后就有短名称了
    require(['template','url','header','footer','elevatezoom','fly'],(template,url,header,footer) =>{
          // 写详情页逻辑
          class  Details{
              constructor(){
                 // 引入假数据
                this.falsData();
                this.leftTab();
                this.size="";
                this.number=0;
               console.dir($)  
              }

          // 引入假数据方法
          falsData(){
            // 负责渲染热销模块
            // console.log("假数据")
           $.get(url.baseUrl +'/list/get',resp=> {
               if(resp.res_code ===200){
                // console.log("假数据",2222)
                this.renderHot(resp.res_body)
                this.init();
                 //放大镜
                 this.addElevateZoom()
                 //图片切换
                this.changeImg()
                // 详情菜单
                this.detailTab();
                this.changeNum();
                this.bindEvent();
                // 加购物车
                this.addCart()
               }
           })
       }
        // 渲染热销产品 
        renderHot(resBody){
          // 第一个参数是模板的id，第二个参数是这个模板里面需要的数据
          let html=template('shop-template',{
            list: resBody.list,
            bigImg: resBody.bigImg,
            id:resBody.id,
            title:resBody.title,
            price:resBody.price,
            origin:resBody.origin,
            

          })
          $('#shop-container').html(html)
         }

            init(){
              console.log($("#shopCartNUM"))
              console.log($('.zoom-img'),"789");
                this.detail = {
                  id: Number(location.search.slice(4)),
                  title: $('#shopTitle').html(),
                  price: $('#shopPrice').html(),
                  image:$('.zoom-img').attr('src'),
                  origin:$('#origin').html(),
                  size:this.size,
                  number:this.number,
                
                }
                console.log(this.detail,"123")
               
            }
            bindEvent(){
              // console.log($('#sizeTab'))
              $('#sizeTab').on('click',()=>{
                this.sizeTab();
              });
              $('.size').each((index,item)=>{
                console.log(item,1111)
                $(item).on('click',()=>{
                  this.size=$(item).html();
                  this.init();
                  console.log(this.size,156)
                })
              })
              
             
            }
              // 下拉菜单
            leftTab(){
                // console.log(123)
                $('.aside-left').on('click','.weeknew',function(){
                    console.log($(this).parent());
                    if($(this).parent().children('ul').height()===0){
                     $(this).parent().children('ul').height('auto');
                    }else{
                        $(this).parent().children('ul').height(0);
                       }
                    //  console.log(this)
                   })
            }
           
          // 详情菜单
          detailTab(){
            // console.log(456)
            $('.detailTab').on('click','.detail',function(){
                console.log($(this).children('p'));
                console.log($(this).children('p').height());
                if($(this).children('p').height()===0){
                 $(this).children('p').height('auto');
                }else{
                    $(this).children('p').height(0);
                   }
                //  console.log(this)
               })
          }
         

         //放大镜
        addElevateZoom(){
          $('.zoom-img').elevateZoom()
        }
        //图片切换
        changeImg(){
          // console.log($('.list-img'),1111111111)
          $('.list-img').each((index,item)=>{
               $(item).on('mouseenter',() => {
                $('.zoom-img').attr("src",$(item).attr('src'));
                $('.zoom-img').elevateZoom();
              })
          })
         
        }
        // 添加购物袋
        addCart (){
          $('#add-cart').on('click',()=>{
            this.detail={
              ...this.detail,
              num:Number($("#num-input").val()),
            }
            let cartList=localStorage.getItem('cart');
            if(cartList){
              // 拿到的cartList是字符串，需要转换
              cartList=JSON.parse(cartList);
              let i=-1;
              let isExit=cartList.some((cart,index)=>{
                i=index;
                return cart.id===this.detail.id;
              })
              if(isExit){
                cartList[i].num +=this.detail.num;
              }else{
                cartList.push(this.detail);
              }
              localStorage.setItem('cart',JSON.stringify(cartList));
            }else{
              // var arr=[];
              // arr[0]=this.detail;
              // let str=JSON.stringify(arr);
              // localStorage.setItem("cart",str);
              localStorage.setItem('cart',JSON.stringify([this.detail]))
            }
             // 抛物线 fly购物车
            let _this=this;
            // console.log($("#add-cart"),4553)
           console.log($("#add-cart").offset().top,123)
           $('<img src="https://gw-img.ur.com.cn//urmall/uploadImportTmp/1ff84e32-4652-4bf5-a64e-6b75587da0ee/WG20S7ET2000_B6/1.jpg" style=" width: 30px;height: 30px;" alt=""/>').fly({
           
            start:{
              left:$("#add-cart").offset().left,
              top:$("#add-cart").offset().top,
            },
            end: $("#shopCartNUM").offset(),
            speed:0.6,
            onEnd: function(){
              console.log(_this,4777)
              this.destroy();
              let num = Number($("#shopCartNUM").html());
              num += _this.detail.num;
              $("#shopCartNUM").html(num);
            }
          })
        })
      }
      changeNum(){
        $('#reduceNum').on('click',()=>{
          let num=$('#num-input').val();
            if(num>0){
              num--;
            }else{
              num=0;
            }
            $('#num-input').val(num);
            this.number=num;
            this.init();

        })
        $('#addNum').on('click',()=>{
          let num=$('#num-input').val();
           num++;
           $('#num-input').val(num);
           this.number=num;
            this.init();
        })
      }
      // 推荐尺码
      sizeTab(){
        // modal遮罩
        let modal=$('<div></div>');
          modal.addClass("modal");
          $('body').append(modal);
           $('#popBox')[0].style.display="block";
           $('#delBtn').on('click',()=>{
             modal.remove();
             $('#popBox')[0].style.display="none";
           })
      }
    }
        new  Details();
    })
})