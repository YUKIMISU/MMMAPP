$(function () {
    setCoupon($('.coupon-title'));

    // ��ȡ�Ż�ȯ������Ϣ ����Ⱦ��ҳ��
    function setCoupon(dom, callback) {
        Route.getcoupon(function( data ) {
            var html = template('couponTitle', data);
            dom.html(html);
        });
    }
});