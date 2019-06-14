// 一个页面对应一个js，这个js里要依赖别的模块
require(['./config'], () => {
  // 引入config以后就有短名称了
  require(['swiper', 'template', 'url', 'header', 'footer'], (Swiper, template, url, header) => {
    // 写首页逻辑
    class Index {
      constructor() {
        // this.container=$(selector);
        // this.bindEvents();
        this.swiper();
        this.hot();
        this.leftTab();
      }


      // 轮播图方法
      swiper() {

        console.log('swiper')
        var mySwiper = new Swiper('.swiper-container', {
          speed: 1000,
          autoplay: true,
          autoplay: {
            disableOnInteraction: false,
          },
          loop: true, // 循环模式选项

          // 如果需要前进后退按钮
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          }
        })
      }
      // 热销产品
      hot() {
        // 负责渲染热销模块
        $.get(url.baseUrl + '/hot/get', resp => {
          console.log(resp)
          // console.log(template);
          if (resp.res_code === 200) {
            this.renderHot(resp.res_body)
          }
        })
      }
      // 渲染热销产品
      renderHot(resBody) {
        // 第一个参数是模板的id，第二个参数是这个模板里面需要的数据
        let html = template('shop-template', {
          list: resBody.list,
          bigImg: resBody.bigImg
        })
        // console.log(html)
        $("#shop-container").html(html)
      }
      // 下拉菜单
      leftTab() {
        $('.aside-left').on('click', '.weeknew', function () {
          if ($(this).parent()[0].getAttribute('showType') == 'false') {
            $(this).parent()[0].setAttribute('showType','ture')
            $(this).parent().children('ul').show()
          } else {
            $(this).parent()[0].setAttribute('showType','falsetrue')
            $(this).parent().children('ul').hide()
          }
        })
      }

    }
    new Index()

  })

})