require(['./config'],()=>{
    require(['url','header','footer','cookie'], (url,header)=>{
        class Register{
            constructor(){
                //建cookie
                //this.addCookie()
                //跨域
                this.registerInfo()
            }
            // addCookie(){
            //   $(".registerBTN").on('click',() => {
            //     //console.log($('.username').val(),$('.password').val());
            //     $.cookie($('.username').val(),$('.password').val(),{path: '/'})
            //   })
            // }

            registerInfo(){
                $(".registerBTN").on('click',() => {
                  $.ajax({
                    method:"GET",
                    url:'http://localhost/UR/register.php',
                    data:{username:$('.username').val(),password:$('.password').val()}
                  }).done(function(msg){
                    alert(msg)
                    console.log(123333)
                    window.location.href = 'http://localhost:2334/html/login.html'
                  })
                })
              }
        }
        new Register()
    })
})