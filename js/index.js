/**
 * Created by Jepson on 2017/5/30.
 */
$(function() {

    // �������˵����ݣ���ʵ�� �鿴���๦��
    setMenu($('#menu > .row'));
    // ʡǮ�ص�һҳ����չʾ���ۿ��Ƽ���
    setMoneyCtrlProduct($('.product-list'));


    // �������ݣ��������˵����ݣ���ʵ�� �鿴���๦��
    function setMenu( dom, callback ) {
        // ����ĸ���Ҫ���ص�Ԫ��
        var $lastFour;

        // ��ȡ�˵�����
        Route.getindexmenu(function( res ){
            var data = res.result;
            var menuHtml = "";
            data.forEach(function( item, index ) {
                menuHtml += '<div class="menu-item">'
                            +   '<a href="' + item.titlehref + '">'
                            +       item.img
                            +       '<p>' + item.name + '</p>'
                            +   '</a>'
                            +'</div>';
            });
            $(dom).html(menuHtml);

            // �����ɺ���ܻ�ȡ����ĸ�Ԫ�أ���������ĸ�Ԫ������
            $lastFour = $(dom).children('.menu-item:nth-last-child(-n+4)')
            $lastFour.addClass('hide');

            // more���ఴť ���Ƶ����ĸ���ʾ����
            menuMore($(dom).find('.menu-item:nth-child(8) > a'));
        })

        // ���Ƶ����ĸ���ʾ����
        function menuMore(dom, callback) {
            $(dom).on('click', function() {
                $lastFour.toggleClass('hide');
            })
        }
    }

    // ʡǮ�ص�һҳ����չʾ���ۿ��Ƽ���
    function setMoneyCtrlProduct(dom, pageid, callback) {
        // getmoneyctrl �������ݽ��
        Route.getmoneyctrl(function( data ){
            var html = template('moneyCtrl', data);
            dom.html(html);
        })
    }

});
