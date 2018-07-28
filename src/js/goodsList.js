import $ from 'jquery';

import '../css/goodsList.css';

init();

function init() {
    getdata();
    bindEvent();
}

function getdata() {
    $.ajax({
        type: 'get',
        url: 'http://localhost:8080/src/api/goodsList.json',
        success: function (data) {
            renderdata(data);
        },
        error: function () {
            console.log('error!');
        }
    })
}

function renderdata(data) {
    var arr = data.list,
        item,
        str,
        price;
    arr.forEach(function (ele, index) {
        ele.spectList.sort(function () {
            return arguments[0].price - arguments[1].price;
        })
        if (ele.id === getId()) {
            item = ele;
        }
    })

    $('.img-box').html('<img src="' + item.imgurl[0] + '" alt="">');
    $('.name-box .name').html(item.name);
    if (item.spectList.length !== 1 && item.spectList[0].price !== item.spectList[item.spectList.length - 1].price) {
        price = '¥' + item.spectList[0].price + '~¥' + item.spectList[item.spectList.length - 1].price;
    } else {
        price = '¥' + item.spectList[0].price;
    }
    $('.name-box .price').html(price);

    $('.wrapper .choose .per .per-b').html(price);
    $('.wrapper .choose .size .size-b').empty();
    item.spectList.forEach(function (ele, index) {
        $('.wrapper .choose .size .size-b').append('<span class="' + index + '">' + ele.spect + '</span>');
        $('.wrapper .choose .size .size-b .' + index).on('click', function (e) {
            $('.size-b span.active').removeClass('active');
            $(this).addClass('active');
        })
    })
    $('.goods-info .title').html('<p>商品详情</p>');
    item.imgurl.forEach(function (ele, index) {
        $('.goods-info .title').append('<img src="' + ele + '" alt="">');
    })
    $('.inner').html(1);
}

function getId() {
    var arr = location.search.slice(1).split('&');
    var idNum;
    arr.forEach(function (ele, index) {
        if (ele.indexOf('id=') != -1) {
            idNum = ele.slice(3);
        }
    })
    return idNum;
}

function bindEvent() {
    $('.foot').on('click', function (e) {
        $('.foot').addClass('active');
        $('.choose').removeClass('active');
        $('.mask').addClass('active');
    });
    $('.ensure').on('click', function (e) {
        alert('购买成功!');
    });
    $('.mask').on('click', function (e) {
        $('.foot').removeClass('active');
        $('.choose').addClass('active');
        $('.mask').removeClass('active');
    });
    $('.goods-size').click(function (e) {
        $('.foot').addClass('active');
        $('.choose').removeClass('active');
        $('.mask').addClass('active');
    });
    $('.btn-left').on('click', function (e) {
        var num = $('.inner').html();
        if (num > 1) {
            $('.inner').html(--num);
        } else {

        }
    })
    $('.btn-right').on('click', function (e) {
        var num = $('.inner').html();
        $('.inner').html(++num);
    })
}