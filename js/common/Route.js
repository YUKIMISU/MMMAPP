/**
 * Created by Jepson on 2017/5/30.
 */

/* �ӿڵ�ַ���� Route��ajax�����װ��������� jquery */
(function(window) {

    var Route = {
        /* ��� URL �Ա� ��ȡ�ӿ� ���Լ��й��� */
        baseUrl : 'http://127.0.0.1:9090',

        /* ------ ��ҳ api �������� ------ */
        // ��ȡ��ҳ����Ĳ˵�������
        getindexmenu: getindexmenu,


        /* ------ ���๦�ܽ��� ------- */
        // ��ȡ��Ʒ�������
        getcategorytitle: getcategorytitle,
        // ��ȡ�����б�
        getcategory: getcategory,


        /* ------ ��Ʒ�б��ܽ��� ------- */
        // ���ݷ����id ��ȡ���������
        getcategorybyid: getcategorybyid,
        // ���ݷ���id �� pageid ��ȡ�÷������Ʒ�б�
        getproductlist: getproductlist,


        /* ------ ��Ʒ���� ------- */
        // ������Ʒid ��ȡ��Ʒ����ϸ��Ϣ
        getproduct: getproduct,
        // ������Ʒid ��ȡ����Ʒ��������Ϣ
        getproductcom: getproductcom,


        /* ------ ʡǮ��ҳ�� ------- */
        // ����ҳ��������ȡʡǮ�ص�ÿһҳ����Ʒ�б�, ������Ĭ�ϻ�ȡ��һҳ
        getmoneyctrl: getmoneyctrl,
        // ������Ʒid��ȡʡǮ����Ʒ����ϸ��Ϣ
        getmoneyctrlproduct : getmoneyctrlproduct,


        /* ------- �����ۿ���Ʒ����ҳ --------- */
        // �����ۿ���Ʒ�б���Ϣ
        getinlanddiscount: getinlanddiscount,
        // ������Ʒid��ȡ�����ۿ���Ʒ����ϸ��Ϣ
        getdiscountproduct: getdiscountproduct,


        /* ------- �ײ˼���Ʒҳ�� -------- */
        // ��ȡ�ײ˼�ҳ���tab����������
        getbaicaijiatitle: getbaicaijiatitle,
        // ���ݱ���id��ȡ�ñ����Ӧ����Ʒ�б�
        getbaicaijiaproduct: getbaicaijiaproduct,



        /* -------- �Ż�ȯҳ�� -------- */
        // ��ȡ�Ż�ȯ������Ϣ
        getcoupon: getcoupon,
        // �����Ż�ȯ����id��ȡ�ñ����Ӧ���б�
        getcouponproduct: getcouponproduct,


        /* ------- �յ�Ʒҳ�� --------- */
        // ��ȡ�յ�Ʒ�ĵ��̵���Ϣ
        getgsshop: getgsshop,
        // ��ȡ�յ�Ʒ���������Ϣ
        getgsshoparea: getgsshoparea,
        // ���ݵ��̵�id�������id��ȡ�õ��̸��������Ʒ�б���Ϣ
        getgsproduct: getgsproduct,



        /* -------- �̳ǵ���ҳ�� ---------- */
        // ��ȡ�����̳ǵ������б���Ϣ
        getsitenav: getsitenav,



        /* ------- Ʒ�ƴ�ȫҳ�� --------- */
        // ��ȡƷ�ƴ�ȫ�ı�����Ϣ
        getbrandtitle: getbrandtitle,
        // ����Ʒ�Ƶı���id��ȡ��Ʒ�Ʊ����µ�ʮ��Ʒ���б�
        getbrand: getbrand,
        // ����Ʒ�Ƶı���id��ȡ��Ʒ�Ʊ����µ�ʮ��Ʒ�Ƶ����������б���Ʒ
        getbrandproductlist: getbrandproductlist

    }


    /* ����չ���� */
    Route.extend = function(obj) {
        for (var k in obj) {
            // һ�㻹�����һ���ж� if obj.hasOwnProperty( k )
            // ����ֻ�Ǽ򵥵� �����࣬�ȼ���д
            this[k] = obj[k];
        }
    };

    /**
     * ��ȡ��ҳ����Ĳ˵�������
     * ��������getindexmenu
     * ����ʽ��get
     * ����:��
     * ��������������
     *     {
                "result": [{
                    "indexmenuId": ���˵���id��,
                    "name": "�˵�������",
                    "img": "�˵���ͼƬ",
                    "titlehref": "�˵������ӵ�ַ"
                }]
            }
     */
    function getindexmenu(callback) {
        var url = Route.baseUrl + '/api/getindexmenu';
        $.get( url, function( res ) {
            callback && callback( res );
        }, 'json');
    }


    /**
     * ��ȡ�ۿ��б�����
     * ��������getmoneyctrl
     * ����ʽ��get
     * ���������pageid : ҳ��id   (Number) ����Ĭ�Ϸ��ص�һҳ����
     * ��������������
     * {
             "result": [{
                 "productId": "��Ʒid",
                 "productName": "��Ʒ����",
                 "productPinkage": "��Ʒ�۸�",
                 "productFrom": "��Ʒ��Դ",
                 "productTime": "��Ʒ�����¼�",
                 "productImgSm": "��ƷͼƬСͼ",
                 "productComCount": "��Ʒ����"
             }]
          }
    * */
    // getmoneyctrl( callback ) �����һҳ���ݣ� pageid Ĭ��Ϊ 0
    // getmoneyctrl( pageid, callback ) ���� pageid+1 ҳ����
    function getmoneyctrl() {
        var pageid;
        var callback;
        if ( arguments.length === 1 ) {
            pageid = 0;
            callback = arguments[ 0 ];
        } else {
            pageid = arguments[ 0 ];
            callback = arguments[ 1 ];
        }

        var url = Route.baseUrl + '/api/getmoneyctrl';
        $.get( url, { pageid : pageid }, function( res ) {
            callback && callback( res );
        }, 'json');
    }

    /**
     * ��ȡ����ı�����Ϣ
     * ��������getcategorytitle
     * ����ʽ��get
     * �����������
    *  ���ز���: {
                     "result": [{
                     "indexmenuId": ���˵���id��,
                     "name": "�˵�������",
                     "img": "�˵���ͼƬ",
                     "titlehref": "�˵������ӵ�ַ"
                     }]
                 }
     * */
    function getcategorytitle( callback ) {
        var url = Route.baseUrl + '/api/getcategorytitle';
        $.get( url, function( res ) {
            callback && callback( res );
        }, 'json');
    }

    /**
     * ���ݷ���ı����ȡ�����Ӧ�ķ����б�
     * ��������getcategory
     * ����ʽ��get
     * ���������titleid �������� id ( Number ���� )
     * ���ز���:
     *       {
                 "result": [{
                     "productId": "��Ʒid",
                     "productName": "��Ʒ����",
                     "productPinkage": "��Ʒ�۸�",
                     "productFrom": "��Ʒ��Դ",
                     "productTime": "��Ʒ�����¼�",
                     "productImgSm": "��ƷͼƬСͼ",
                     "productComCount": "��Ʒ����"
                 }]
             }
     * */
    function getcategory( titleid, callback ) {
        var url = Route.baseUrl + '/api/getcategory';
        $.get( url, { titleid: titleid }, function( res ) {
            callback && callback( res );
        }, 'json');
    }

    /**
     * ���ݷ����id��ȡ���������
     * ��������getcategorybyid
     * ����ʽ��get
     * ���������categoryid ����� id ( Number ���� )
     * ���ز���:
     *       {
                 "result": [{
                     "categoryId": "����id",
                     "category": "��������",
                     "titleId": "�������id"
                 }]
             }
     * */
    function getcategorybyid( categoryid, callback ) {
        var url = Route.baseUrl + '/api/getcategorybyid';
        $.get( url, { categoryid: categoryid }, function( res ) {
            callback && callback( res );
        }, 'json');
    }

    /**
     * ���ݷ���id �� pageid ��ȡ�÷������Ʒ�б�
     * ��������getproductlist
     * ����ʽ��get
     * ���������titleid �������� id ( Number ���� )
     * ���ز���:
     *       {
                 "pagesize": "ÿҳ��С",
                 "totalCount": "������"
                 "result": [{
                     "productId": "��Ʒid",
                     "categoryId": "��Ʒ����id",
                     "productListId": "��Ʒ�б�id",
                     "productName": "��Ʒ����",
                     "productImg": "��ƷͼƬ",
                     "productPrice": "��Ʒ�۸�",
                     "productQuote": "��Ʒ����",
                     "productCom": "��Ʒ������",
                     "brandName": "Ʒ������",
                     "brandTitleId": "Ʒ�Ʊ���id"
                 }]
            }
     * */
    function getproductlist( categoryid, pageid, callback ) {
        var url = Route.baseUrl + '/api/getproductlist';
        var data = {
            categoryid : categoryid ? categoryid : 0,
            pageid: pageid ? pageid : 1
        }
        $.get( url, data, function( res ) {
            callback && callback( res );
        }, 'json');
    }




    /**
     * ������Ʒ id ��ȡ��Ʒ����ϸ��Ϣ
     * ��������getproduct
     * ����ʽ��get
     * ���������productid  ��Ʒid ( Number ���� )
     * ���ز���:
             {
                 "result": [{
                     "productId": "��Ʒid",
                     "productName": "��Ʒ����",
                     "productImg": "��ƷͼƬ",
                     "bjShop": "��Ʒ�ȼ۹������",
                     "categoryId": "����id"
                 }]
             }
    * */
    function getproduct( productid, callback ) {
        var url = Route.baseUrl + '/api/getproduct';
        $.get( url, { productid: productid }, function( res ) {
            callback && callback( res );
        }, "json")
    }

    /**
     * ������Ʒid ��ȡ����Ʒ��������Ϣ
     * ��������getproductcom
     * ����ʽ��get
     * ���������productid  ��Ʒid ( Number ���� )
     * ���ز���:
             {
                 "result": [{
                     "comId": "��Ʒ����id",
                     "comName": "��Ʒ��������",
                     "comTime": "��Ʒ����ʱ��",
                     "comFrom": "��Ʒ������Դ",
                     "comContent": "��Ʒ��������",
                     "productId": "��Ʒid",
                     "categoryId": "����id"
                 }]
             }
     * */
    function getproductcom( productid, callback ) {
        var url = Route.baseUrl + '/api/getproductcom';
        $.get( url, { productid : productid }, function( res ) {
            callback && callback( res );
        }, 'json' );
    }

    /**
     * ������Ʒid��ȡ�����ۿ���Ʒ����ϸ��Ϣ
     * ��������getmoneyctrlproduct
     * ����ʽ��get
     * ���������productid  ��Ʒid ( Number ���� )
     * ���ز���:
        *{
             "result": [{
                 "productId": "��Ʒid",
                 "productName": "��Ʒ����",
                 "productPinkage": "��Ʒ�۸�",
                 "productFrom": "��Ʒ��Դ",
                 "productTime": "��Ʒ����ʱ��",
                 "productTips": "��Ʒ����С��",
                 "productInfo": "��Ʒ��������Ϣ1",
                 "productInfo1": "��Ʒ��������Ϣ2",
                 "productImgSm": "��Ʒ��ͼƬСͼ",
                 "productImgLg": "��Ʒ��ͼƬ��ͼ",
                 "productCity": "��Ʒ�Ŀ�����",
                 "productInfo2": "��Ʒ��������Ϣ3",
                 "productImg2": "��Ʒ��2��ͼƬ",
                 "productImg3": "��Ʒ��3��ͼƬ",
                 "productComment": "",
                 "productComCount": "��Ʒ��������"
             }]
        }
     * */
    function getmoneyctrlproduct( productid, callback ) {
        var url = Route.baseUrl + '/api/getmoneyctrlproduct';
        $.get( url, { productid : productid }, function( res ) {
            callback && callback( res );
        }, "json" );
    }



    /**
     * �����ۿ���Ʒ�б���Ϣ
     * ��������getinlanddiscount
     * ����ʽ��get
     * ����: ��
     * ��������ʾ����
     *  {
            "result": [{
                "productId":  "��Ʒid",
                "productName": "��Ʒ����",
                "productPrice": "��Ʒ�۸�",
                "productFrom": "��Ʒ��Դ",
                "productTime": "��Ʒ����ʱ��",
                "productImg": "��Ʒ��ͼƬ",
            }]
        }
     * */
    function getinlanddiscount( callback ) {
        var url = Route.baseUrl + '/api/getinlanddiscount';
        $.get( url, function( res ) {
            callback && callback( res );
        });
    }

    /**
     * ������Ʒid��ȡ�����ۿ���Ʒ����ϸ��Ϣ
     * ��������getdiscountproduct
     * ����ʽ��get
     * ���������productid : ��Ʒid (Number����)
     * ���ز�����
     * {
            "result": [{
                "productId": "��Ʒid",
                "productName": "��Ʒ����",
                "productPinkage": "��Ʒ�۸�",
                "productFrom": "��Ʒ��Դ",
                "productTime": "��Ʒ����ʱ��",
                "productTips": "��Ʒ����С��",
                "productInfo": "��Ʒ��������Ϣ1",
                "productInfo1": "��Ʒ��������Ϣ2",
                "productImgSm": "��Ʒ��ͼƬСͼ",
                "productImgLg": "��Ʒ��ͼƬ��ͼ",
                "productCity": "��Ʒ�Ŀ�����",
                "productInfo2": "��Ʒ��������Ϣ3",
                "productImg2": "��Ʒ��2��ͼƬ",
                "productImg3": "��Ʒ��3��ͼƬ",
                "productComment": "",
                "productComCount": "��Ʒ��������"
            }]
        }
     **/
    function getdiscountproduct( productid, callback ) {
        var url = Route.baseUrl + '/api/getdiscountproduct';
        $.get( url, { productid: productid }, function( res ) {
            callback && callback( res );
        }, "json" );
    }




    /**
     * ��ȡ�ײ˼�ҳ���tab����������
     * ��������getbaicaijiatitle
     * ����ʽ��get
     * �����������
     * ���ز�����
     *  {
            "result": [{
                "titleId": "����id",
                "title": "��������"
            }]
        }
     **/
    function getbaicaijiatitle( callback ) {
        var url = Route.baseUrl + '/api/getbaicaijiatitle';
        $.get( url, function( res ) {
            callback && callback( res );
        })
    }

    /**
     * ���ݱ���id��ȡ�ñ����Ӧ����Ʒ�б�
     * ��������getbaicaijiaproduct
     * ����ʽ��get
     * ���������titleid : ����id (Number)
     * ���ز�����
     *     {
                "result": [{
                    "titleId": "����id",
                    "productId": "��Ʒid",
                    "productName": "��Ʒ����",
                    "productPrice": "��Ʒ�۸�",
                    "productImg": "��ƷͼƬ",
                    "productCoupon": "�����ȡ�Ż�ȯ",
                    "productHref": "�µ�����",
                    "productCouponRemain": "��������"
                }]
            }
     **/
    function getbaicaijiaproduct( titleid, callback ) {
        var url = Route.baseUrl + "/api/getbaicaijiaproduct";
        $.get( url, { titleid : titleid }, function( res ) {
            callback && callback( res );
        }, 'json' );
    }




    /**
     * ��ȡ�Ż�ȯ������Ϣ
     * ��������getcoupon
     * ����ʽ��get
     * �����������
     * ���ز�����
     *  {
            "result": [{
                "couponId": "�Ż�ȯ����id",
                "couponImg": "�Ż�ȯ����ͼƬ",
                "couponLink": "�Ż�ȯ�б�����",
                "couponTitle": "�Ż�ȯ��������"
            }]
        }
     **/
    function getcoupon( callback ) {
        var url = Route.baseUrl + '/api/getcoupon';
        $.get( url, function( res ) {
            callback && callback( res );
        }, 'json' );
    }

    /**
     * �����Ż�ȯ����id��ȡ�ñ����Ӧ���б�
     * ��������getcouponproduct
     * ����ʽ��get
     * ���������couponid���Ż�ȯ����id  (Number)
     * ���ز�����
     *      {
                "result": [{
                    "couponProductId": "�Ż�ȯ��Ʒid",
                    "couponId": "�Ż�ȯ����id",
                    "couponProductTime": "�Ż�ȯ��Ʒ��Ч��",
                    "couponProductImg": "�Ż�ȯ��ƷͼƬ",
                    "couponProductName": "�Ż�ȯ��Ʒ����",
                    "couponProductPrice": "�Ż�ȯ��Ʒ�۸�"
                }]
            }
     **/
    function getcouponproduct( couponid, callback ) {
        var url = Route.baseUrl + '/api/getcouponproduct';
        $.get( url, { couponid: couponid }, function( res ) {
            callback && callback( res );
        }, "json" );
    }




    /**
     * ��ȡ�յ�Ʒ�ĵ��̵���Ϣ
     * ��������getgsshop
     * ����ʽ��get
     * �����������
     * ���ز�����
     *  {
            "result": [{
                "shopId": "����id",
                "shopName": "��������"
            }]
        }
     **/
    function getgsshop( callback ) {
        var url = Route.baseUrl + '/api/getgsshop';
        $.get( url, function( res ) {
            callback && callback( res );
        }, 'json' );
    }

    /**
     * ��ȡ�յ�Ʒ���������Ϣ
     * ��������getgsshoparea
     * ����ʽ��get
     * �����������
     * ���ز�����
     *      {
                "result": [{
                    "areaId": "����id",
                    "areaName": "��������"
                }]
            }
     **/
    function getgsshoparea( callback ) {
        var url = Route.baseUrl + '/api/getgsshoparea';
        $.get( url, function( res ) {
            callback && callback( res );
        }, 'json' );
    }

    /**
     * ���ݵ��̵�id�������id��ȡ�õ��̸��������Ʒ�б���Ϣ
     * ��������getgsproduct
     * ����ʽ��get
     * ���������shopid : ����id  (Number)
     *          areaid : ����id  (Number)
     * ���ز�����
     *  {
            "result": [{
                "productId": "��Ʒid",
                "areaId": "����id",
                "shopId": "����id",
                "productPrice": "��Ʒ�۸�",
                "productImg": "��ƷͼƬ",
                "productName": "��Ʒ����"
            }]
        }
     **/
    function getgsproduct( shopid, areaid, callback ) {
        var url = Route.baseUrl + '/api/getgsproduct';
        var data = {
            shopid: shopid,
            areaid: areaid
        };
        $.get( url, data, function( res ) {
            callback && callback( res );
        }, 'json');
    }



    /**
     * ��ȡ�����̳ǵ������б���Ϣ
     * ��������getsitenav
     * ����ʽ��get
     * �����������
     * �������ݸ�ʽ��
     *      {
                "result": [{
                    "navId": "����id",
                    "navImg": "����ͼƬ",
                    "navTitle": "��������",
                    "navHref": "��������	"
                }]
            }
     **/
    function getsitenav( callback ) {
        var url = Route.baseUrl + '/api/getsitenav';
        $.get( url, function( res ) {
            callback && callback( res );
        }, 'json' );
    }



    /**
     * ��ȡƷ�ƴ�ȫ�ı�����Ϣ
     * ��������getbrandtitle
     * ����ʽ��get
     * �����������
     * �������ݸ�ʽ��
     *      {
                "result": [{
                    "brandTitleId": "Ʒ�Ʊ���id",
                    "brandTitle": "Ʒ�Ʊ�������",
                    "categoryId": "����id"
                }]
            }
     **/
    function getbrandtitle( callback ) {
        var url = Route.baseUrl + '/api/getbrandtitle';
        $.get( url, function( res ) {
            callback && callback( res );
        }, 'json' );
    }

    /**
     * ����Ʒ�Ƶı���id��ȡ��Ʒ�Ʊ����µ�ʮ��Ʒ���б�
     * ��������getbrand
     * ����ʽ��get
     * ���������brandtitleid��Ʒ�Ʊ���id  (Number)
     * �������ݸ�ʽ��
     *       {
                "result": [{
                    "brandId": "Ʒ��id",
                    "brandTitleId": "Ʒ�Ʊ���id",
                    "brandName": "Ʒ������",
                    "brandInfo": "Ʒ��ȫ��������",
                    "categoryId": "����id"
                }]
            }
     **/
    function getbrand( brandtitleid, callback ) {
        var url = Route.baseUrl + '/api/getbrand';
        $.get(url, { brandtitleid : brandtitleid }, function( res ) {
            callback && callback( res );
        }, 'json' )
    }



    /**
     * ����Ʒ�Ƶı���id��ȡ��Ʒ�Ʊ����µ�ʮ��Ʒ�Ƶ����������б���Ʒ
     * ��������getbrandproductlist
     * ����ʽ��get
     * ���������brandtitleid��Ʒ�Ʊ���id  (Number)
                pagesize ��չʾ�������� Ĭ��Ϊ4�� (Number)
     * �������ݸ�ʽ��
     *      {
                "pagesize": "ÿҳ��С",
                "totalCount": "������"
                "result": [{
                    "productId": "��Ʒid",
                    "categoryId": "��Ʒ����id",
                    "productListId": "��Ʒ�б�id",
                    "productName": "��Ʒ����",
                    "productImg": "��ƷͼƬ",
                    "productPrice": "��Ʒ�۸�",
                    "productQuote": "��Ʒ����",
                    "productCom": "��Ʒ������",
                    "brandName": "Ʒ������",
                    "brandTitleId": "Ʒ�Ʊ���id",
                    "brandId": "Ʒ��id"
                }]
            }
     **/
    function getbrandproductlist( brandtitleid, pagesize, callback ) {
        var url = Route.baseUrl + '/api/getbrandproductlist';
        var data = {
            brandtitleid : brandtitleid,
            pagesize : pagesize
        };
        $.get( url, data, function( res ) {
            callback && callback( res );
        }, 'json' );
    }




    window.Route = Route; /* ���Ⱪ¶ Route */

})(window);