var app = getApp();
var md5 = require('../../utils/md5.js');
var md51 = require('../../utils/md51.js');
var util = require('../../utils/util.js');

var order_id='';
var store_id = '';
var user_id = '';
var newopenid1 = '';

var order_status='';
Page({

    /**
     * 页面的初始数据
     */
    data: {
      titlename:'订单详情',
      store_name:'',
      store_logo:'',
      orderList: [],
      account_money: '',
      discount_price: '',
      service_money: '',
      save_money: '',
      no_discount_price: '',
      add_time:'',
      remark:'',
      order_number:'',
      table_number:'',
      actual_money:'',
      myQrcodeSrc:[],
      isShowcode:false,
      order_sn:'',
        // order_money:''
  },
  onLoad: function (options) {
    console.log(options, 30)
    order_id = options.order_id;
    store_id = options.store_id;
    order_status = options.order_status;
    let wrapH =wx.getSystemInfoSync().screenHeight-77;
    
    var that = this;
   
    let globalKey = wx.getStorageSync('globalKey');
    let gram = util.returnGram();
    user_id = globalKey.user_id;
    wx.request({
      url: app.globalData.url + '/api/store_order/get_order_info',
      data: {
        request_object: app.globalData.request_object,
        user_id,
        order_id,
        timestamp: gram.timestamp,
        process: gram.process,
        token: gram.token
      },
      method: 'POST',
      header: {
        'Content-Type': "application/x-www-form-urlencoded"
      },
      success: function (res) {
        if (res.data.status == 1) {
          let data = res.data.data;
          console.log("我的订单详情返回数据", res.data)
          let qrcode_pic =app.globalData.url+ data.qrcode_pic;


          let myQrcodeSrc=[];
          myQrcodeSrc.push(qrcode_pic)

          that.setData({
            wrapH: wrapH,
            myQrcodeSrc,
            order_sn: data.order_sn,
            qrcode_pic,
            qrcode_expire_time: data.qrcode_expire_time,
            business_hours: data.business_hours,
            qrcode_url: data.qrcode_url,
            order_number: data.order_number,
            overdue_time: data.overdue_time,
            add_time: data.add_time,
            actual_money: data.actual_money,
            textareaValue: data.remark,
            store_logo: data.store_logo,
            store_name: data.store_name,
            account_money: data.account_money,
            actual_money: data.actual_money,
            discount_price: data.discount_price,
            save_money: data.save_money,
            service_money: data.service_money,
            no_discount_price: data.no_discount_price,
            orderList: data.list_goods,
            table_number: data.table_number,
            people_number: data.people_count,
            msg: data.msg,
            order_status: order_status,
            order_code: data.order_code,
            store_id,
          })
        } else {
          console.log("我的订单详情请求失败", res.data)
        }
      },
      fail: function () {
        // fail
        console.log("服务器响应失败");

        app.showMind();
      },
      complete: function () {
        // complete
      }
    })
    util.storeInfo(that, store_id, user_id, 1,app);
  },
  clearInput(e){

    let store_info = wx.getStorageSync('store_info');
    store_info.textareaValue='';
    wx.setStorageSync('store_info', store_info)
    this.setData({
      textareaValue:''
    })
    
  },
  copy(e){
    let that=this;
    console.log(this.data.order_sn,e)
    wx.setClipboardData({
      data: that.data.order_sn,
      success: function (res) {
        wx.getClipboardData({
          success: function (res) {
            wx.showToast({
              title: '复制成功'
            })
          }
        })
      }
    })
  },
  // 备注
  handleContentInput(event) {
    let textareaValue = event.detail.value;
    this.setData({
      textareaValue
    });

  },
  // 桌号
  table_number: function (e) {

    let store_info = wx.getStorageSync('store_info');
    let index = e.target.dataset.index;
    let value = e.detail.value;
    if (index == 1 ) {

      this.data.people_number = value;
      store_info.people_number = value;
    } else {
      this.data.table_number = value;
      store_info.table_number = value;
    }
    wx.setStorageSync('store_info', store_info)
    console.log(this.data.table_number, this.data.people_number,value)
  },

  // 放大二维码
  tapQrcode(e){
    let myQrcodeSrc = this.data.myQrcodeSrc;
    wx.previewImage({
      urls: myQrcodeSrc, isShowcode:true,
    })
  },
    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
      console.log('pendingPayment')
    },
  bindblur(e){
    if(e.detail.value==0){
      this.setData({
        people_number:''
      })
    }
  },
  wetchatPay: function () {
    let globalKey = wx.getStorageSync('globalKey');
    let store_info = wx.getStorageSync('store_info');
    
    var that = this;
    let gram = util.returnGram();
    
    newopenid1 = app.globalData.newopenid1 || globalKey.newopenid1 || newopenid1;
    user_id = globalKey.user_id || user_id;
    var token= gram.token;
    //支付订单
    if (this.data.people_number == '') {
      wx.showToast({
        title: '请输入人数',
        icon: 'none'
      })
    } else if (this.data.people_number ==0){
      wx.showToast({
        title: '人数不能为0',
        icon: 'none'
      })
      this.setData({
        people_number:''
      })
    } else if (this.data.textareaValue.length > 50) {
      wx.showToast({
        title: '备注不能超过50个字',
        icon: 'none'
      })
    }else {
      wx.request({
        url: app.globalData.url+'/api/mini_program/get_prepay_id',
        data: {
          request_object: app.globalData.request_object,
          openid: newopenid1,
          store_id,
          user_id ,
          token,
          timestamp: gram.timestamp,
          process: gram.process,
          order_id,
          paid_type: 2,
          remark: that.data.textareaValue || store_info.textareaValue || '',//备注
          table_number: that.data.table_number || store_info.table_number || '',
          people_count: that.data.people_number || store_info.people_number || '',
        },
        method: 'POST',
        header: {
          'Content-Type': "application/x-www-form-urlencoded"
        },
        success: function (res) {
          console.log( "支付账单返回数据", res.data)
          //此时应调用微信支付界面
          if (res.data.status == 1) {
            
            let strmd5 = 'appId=' + res.data.data.appid + '&nonceStr=' + res.data.data.noncestr + '&package=prepay_id=' + res.data.data.prepayid + '&signType=MD5&timeStamp=' + res.data.data.timestamp + '&key=rImE3xCA7U22TWYxFvA2eYq4Umy1NVgP';
            let mypaySign = md51.md5(strmd5);
            let mypackage = 'prepay_id=' + res.data.data.prepayid;
            console.log(mypackage)

            //此时应调用微信支付界面
            if (res.data.status == 1) {
              wx.requestPayment({
                timeStamp: res.data.data.timestamp,
                nonceStr: res.data.data.noncestr,
                package: mypackage,
                signType: 'MD5',
                paySign: mypaySign,
                success(res) {
                  if (res.errMsg == "requestPayment:ok") {
                    wx.redirectTo({
                      url: '../code/code?store_id=' + store_id + '&user_id=' + user_id + '&order_id=' + order_id + '&token=' + token + '&newopenid1=' + newopenid1 + '&store_name=' + that.data.store_name+'&actual_money=' + that.data.actual_money
                    })
                  }
                },
                fail(res) {
                  console.log(94, res)
                }
              })
              // 将缓存的ol清空
            } else {
              wx.showToast({
                title: res.data.message,
                icon: 'none',
                duration: 2000,
              })
              // console.log("咋啦", res.data)
            }
          } else {
            wx.showToast({
              title: res.data.message,
              icon: 'none',
              duration: 2000,
            })
            // console.log("咋啦", res.data)
          }
        },
        fail: function (res) {
          // fail
          if (res.errMsg =='requestPayment:fail cancel'){

            console.log("支付订单请求失败");
            wx.showToast({
              title: "支付订单请求取消",
              icon: 'none',
              duration: 2000,
            })
          }
        },
        complete: function () {
          // complete
        }
      })
    }
  },
  cancleOrder: function () {
    let that=this;
    let globalKey = wx.getStorageSync('globalKey');
    let gram = util.returnGram();
    wx.request({
      url: app.globalData.url +'/api/store_order/update_order_status',
      data: {
        order_id,
        request_object: app.globalData.request_object,
        user_id: globalKey.user_id,
        timestamp: gram.timestamp,
        process: gram.process,
        token: gram.token,
      },
      method: 'POST',
      header: {
          'Content-Type': "application/x-www-form-urlencoded"
      },
      success: function (res) {
        if (res.data.status==1){
            wx.showModal({
                title: '提示',
                content: '确认取消订单?',
                success(res) {
                    if (res.confirm) {
                      that.navigateback()
                    } else if (res.cancel) {
                        console.log('用户点击取消')
                    }
                }
            })
        }else{
            wx.showToast({
                title: '订单取消失败',
                icon: 'none',
                duration: 2000,
            })
        }
      },
      fail:function(){
        wx.showToast({
            title: '服务器响应失败',
            icon: 'none',
            duration: 2000,
        })
      }
    })
       
  },
  navigateback() {
    let pages = getCurrentPages(); //获取当前页面js里面的pages里的所有信息。
    let prevPage = pages[pages.length - 2];
    prevPage.setData({
      isActive:1
    })
    app.globalData.order_status=1;
    wx.switchTab({
      url: '/pages/myorder/myorder',
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

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

  app.onshare()

},
})