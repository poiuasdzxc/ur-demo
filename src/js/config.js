require.config({
    // 从根路径出发配置
    baseUrl:'/',
    paths:{
        jquery:'libs/jquery/jquery-3.2.1.min',
        header:'js/model/header',
        footer:'js/model/footer',
        url: 'js/model/url',
        template: 'libs/art-template/template-web',
        swiper: 'libs/swiper/js/swiper',
        list: 'js/list',
        elevatezoom: 'libs/jquery-plugains/jquery.elevatezoom',
        fly: 'libs/jquery-plugains/jquery.fly',
        login: 'js/login',
        cookie: 'libs/jquery-plugains/jquery.cookie',
    },
    shim:{
        elevatezoom:{
            deps: ['jquery']
        },
        fly:{
            deps: ['jquery']
        },
        cookie:{
            deps: ['jquery']
        },
    }
})