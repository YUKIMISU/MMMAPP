/**
 * Created by Jepson on 2017/5/30.
 */
$(function() {
    setMoneyCtrlProduct($('.money-ctrl'), $.getUrlParam('pageid') || 1);

    function setMoneyCtrlProduct(dom, pageid, callback) {
        // ���ǼƵڼ�ҳ�Ǵ� 1 ��ʼ�ģ���������ʱ�� 0 Ϊ��һҳ������Ҫ��һ
        Route.getmoneyctrl( pageid-1, function( data ) {
            data.pageCount = Math.floor(data.totalCount / data.pagesize);
            data.pageid = pageid || 1;
            data.page = [];
            for (var i = 0; i < data.pageCount; i++) {
                data.page.push({ 'pageid': i + 1, 'pageCount': data.pageCount });
            }
            var html = template('moneyCtrl', data);
            dom.html(html);
            $('#selectPage').on('change', function(e) {
                window.location.href = "moneyctrl.html?pageid=" + $(this).val();
                $(this).attr('selected',"selected");
            })
        });
    }
})
