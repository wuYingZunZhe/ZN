var app=getApp();
var goods_id = null;

var util = require('../../utils/util.js');
Page({
  data: {
    titlename: '商品详情',
        imgUrls: [],
        goodsDetails:[],
        goods_id:null,
        list_type: [],
        list_tag: [],
        list_evaluate: [],
        evaHeadPic: [],

    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var that = this;
        if (!options && !options.goods_id){
            return;
        }
        goods_id= options.goods_id;
        let goods_type = options.goods_type
      console.log(goods_type)
        wx.request({
            url:app.globalData.url + '/api/store_detail/get_goods_info',
          data: {
            request_object: app.globalData.request_object,
            goods_id: goods_id, goods_type
            },
            method: 'POST', 
            header: {
                'Content-Type': "application/x-www-form-urlencoded"
            }, 
            success: function (res) {
              console.log('goodsDetails',res.data)
                var pics = res.data.data.goods_pics;
                    pics =  pics.split(',')
                var pictures = [];
                for (let i = 0; i < pics.length;i++){
                  let goods_pic={};
                  goods_pic.goods_pic = pics[i]
                  pictures.push(goods_pic)
                }

              pictures = util.addUrl(pictures, 'goods_pic')
              console.log(pictures,48)
              that.setData({
                    goodsDetails: res.data.data,
                imgUrls: pictures
                })
               
            },
            fail: function () {
              // fail
              app.showMind();
            },
            complete: function () {
                // complete
            }
      })
      var store_id = app.globalData.store_id || wx.getStorageSync('store_info').store_id;
        wx.request({
            url: app.globalData.url+'/api/store_detail/list_user_evaluate',
          data: {
            request_object: app.globalData.request_object,
                store_id
            },
            method: 'POST',
            header: {
                'Content-Type': "application/x-www-form-urlencoded"
            }, // 设置请求的 header
            success: function (res) {
                console.log(res.data)
              if (res.data.status=='1'){
                
              }

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
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

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
      path: 'pages/orderOrPayment/orderOrPayment?store_id=' + store_info.store_id,
      success: function (res) {

      }
    }

  },
})