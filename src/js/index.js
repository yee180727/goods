import $ from 'jquery';
import '../css/style.css';

init();
function init() {
    getdata();
}
function getdata () {
    $.ajax({
        type: 'get',
        url: 'http://localhost:8080/src/api/goodsList.json',
        success: function(data) {
            renderdata(data);
        },
        error: function() {
            console.log('error!');
        }
    })
}
function renderdata(data) {
    var arr = data.list,
    str = '';

    arr.forEach(function (ele, index) {
        str +=  '<a href="http://localhost:8080/goodsList.html?id='+ ele.id +'"><div class="item">' +
                    '<img src="'+ ele.imgurl[0] +'" alt="">' +
                    '<div class="item-disc">' +
                        '<p class="item-disc-name">'+ ele.name +'</p>' +
                        '<p class="item-disc-price">¥'+ ele.spectList[0].price +'</p>' +
                    '</div>' +
                '</div></a>';
    });
    $('.body').append(str);
}










