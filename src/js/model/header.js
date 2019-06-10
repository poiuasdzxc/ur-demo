

define(['jquery'],() =>{
    class Header {
        constructor (){
            this.container=$('#header-container')
            this.load().then(() => {
                // 操作header里面的DOM
                 this.search()
            })
        }
        load(){
            return new Promise (resolve => {
                // 由于header模块要在不同的页面使用，所以路径一定是绝对路径 /html/....
                 this.container.load('/html/model/header.html', () => {
                // 异步加载完成
                 resolve()
                })
            })
        }
        search(){
           
        //     this.input=$('#search');
        //     this.btn=$('.header-bottom button');
        //     this.ul=$('.header-bottom ul');
        //     console.log(this.input,this.btn,this.ul,);
        //     $('.header-bottom button').on('click',function(){
        //        	//每次点击清空ul里面的li
        //         this.ul.html()="";
        //         //获取input的值
        //      let   inpval=this.input.val();
        //         $.getScript("https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su","searchInfo",{wd:inpval})
        //     })
        }

    }
    return new Header()
})