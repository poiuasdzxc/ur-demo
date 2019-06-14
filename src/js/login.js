require(['./config'],()=>{
    require(['url','header','footer','cookie'],(url,header,footer) =>{
        class Login {
            constructor(){
                this.bindEvent();
            }

            bindEvent(){
                // 手机号登陆
                $('#numLogo').on('click',()=>{
                    $('.container').show();
                    $('#container2').hide();
                }),
                 // 账号登陆
                 $('#userlogo').on('click',()=>{
                    $('.container').hide();
                    $('#container2').show();
                }),

                // 验证码
                $('#code').on('click',()=>{
                    if(confirm("确定发生验证码？")){
                        alert("您已经发送验证码了，请稍后再发送")
                    }else{
                        alert("请重新发送验证码");
                    }
                })
                // 登陆存信息
                $('#logo').on('click',()=>{
                    $.ajax({
                        method:"GET",
                        url:'http://localhost/UR/login.php',
                        data:{username:$('.username').val(),password:$('.password').val()}
                      }).done(function(msg){
                        // 发送成功做的事情
                        console.log(msg)
                         if(msg == '登陆成功'){
                            if($('#autoLogo').prop("checked")){
                                $.cookie('username',$('.username').val(),{ expires: 10, path: '/' })
                                $.cookie('password',$('.password').val(),{ expires: 10, path: '/' })
                            }else{
                                $.cookie('username',$('.username').val(),{path:'/'})
                                $.cookie('password',$('.password').val(),{path: '/'})
                            }
                         }else{
                            console.log("no"); 
                         }
                        // console.log((Array.from(msg).splice(4,4)).join(""),3333)
                       
                      });


                })
            }
        }

        new Login()
        
    })
})