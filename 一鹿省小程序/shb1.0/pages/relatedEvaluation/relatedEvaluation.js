var app = getApp();

var util = require('../../utils/util.js');
Page({
    data: {
        menuTapCurrent: 0,
        list_type: [],
        list_tag: [],
        list_evaluate: [],
        stars: [0, 1, 2, 3, 4],
        normalSrc: '../../images/storeDetails/normal.png',
        selectedSrc: '../../images/storeDetails/selected.png',
        halfSrc: '../../images/storeDetails/half.png',

    },
    menuTap: function (e) {
        var current = e.currentTarget.dataset.current;//获取到绑定的数据
        //改变menuTapCurrent的值为当前选中的menu所绑定的数据
        this.setData({
            menuTapCurrent: current
        });
    },
    onLoad:function(){
      var that = this
      var store_id = app.globalData.store_id || wx.getStorageSync('store_info').store_id;
        wx.request({
            url: app.globalData.url+'/api/store_detail/list_user_evaluate',
            data: {
                store_id,
              request_object: app.globalData.request_object,
            },
            method: 'POST',
            header: {
                'Content-Type': "application/x-www-form-urlencoded"
            }, // 设置请求的 header
            success: function (res) {
                console.log(res.data)
                // 获取到的评论类型
                // console.log("type",res.data.data.list_type)
                // // 获取到的评论标签
                // console.log(res.data.data.list_tag)
                // // 获取到的评论详情
                // console.log("a",res.data.data.list_evaluate)
                var array = new Array();
                var array1 = new Array();
                var array2 = new Array();
                var list = res.data.data.list_evaluate;
                for (var i = 0; i < list.length; i++) {
                  array1.push(util.addUrl(list[i]["head_pic"],'head_pic'));
                    array.push(list[i])
                }
                that.setData({
                    list_type: res.data.data.list_type,
                    list_tag: res.data.data.list_tag,
                    list_evaluate: array,
                    evaHeadPic: array1,
                })

            },
            fail: function () {
                // fail
              console.log("获取失败");
              app.showMind();
            },
            complete: function () {
                // complete
            }
        })
    },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (res) {
    let store_info = wx.getStorageSync('store_info');
    console.log(store_info)
    if (res.from === 'button') {
    }
    return {
      title: '转发',
      path: 'pages/orderOrPayment/orderOrPayment?store_id=' + store_info.store_id + '&store_name=' + store_info.store_name,
      success: function (res) {

      }
    }

  },
})