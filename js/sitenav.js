/**
 * Created by Jepson on 2017/5/31.
 */

$(function() {
   	setSiteNav($('.site-nav'))

    // ��ȡ�����̳ǵ������б���Ϣ ����Ⱦ��ҳ����
    function setSiteNav(dom, callback) {
        Route.getsitenav( function( data ) {
            var html = template('siteNav', data);
            dom.html(html);
        });
    }
})
