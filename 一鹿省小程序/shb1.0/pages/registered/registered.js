var md5 = require('../../utils/md5.js')
var interval = null //倒计时函数
var timestamp = Date.parse(new Date());
var val = 'fanbuyhainan' + timestamp.toString();
var hexMD5 = md5.hexMD5(val);
Page({
    data: {
        text: '获取验证码', //按钮文字
        currentTime: 61, //倒计时
        disabled: false, //按钮是否禁用
        phone: '' //获取到的手机栏中的值
    },
    //获取手机栏input中的值
    phoneInput: function (e) {
        this.setData({
        phone: e.detail.value
        })
        // console.log(phone)
    },
    //获取验证码按钮事件
    bindButtonTap: function () {
        var status = "";
        var that = this;
        that.setData({
            disabled: true, //只要点击了按钮就让按钮禁用 （避免正常情况下多次触发定时器事件）
            color: '#ccc',
        })
        var phone = that.data.phone;
        var currentTime = that.data.currentTime //把手机号跟倒计时值变例成js值
        var warn = null; //warn为当手机号为空或格式不正确时提示用户的文字，默认为空
        if (phone == '') {
            warn = "号码不能为空";
        } else if (phone.trim().length != 11 || !/^1[3|4|5|6|7|8|9]\d{9}$/.test(phone)) {
            warn = "手机号格式不正确";
        } else {
            //当手机号正确的时候提示用户短信验证码已经发送
            wx.showToast({
                title: '短信验证码已发送',
                icon: 'none',
                wx: wx.request({
                    url: 'https://exbuy.double.com.cn/api/users/send_code',
                  data: {
                    request_object: app.globalData.request_object,
                        mobile: phone,
                        type: 1,
                        timestamp: timestamp,
                      process: hexMD5
                    },
                    method: 'POST',
                    dataType: 'json',
                    responseType: 'text',
                    success: function (res) {
                        console.log(res,52)
                        status = res.data.status
                        if (status==1) {
                            wx.showToast({
                                title: '短信发送成功',
                                icon: 'none'
                            })
                        } else {
                            console.log("短信发送失败");
                        }
                    },
                    fail: function (res) { },
                    complete: function (res) {
                    },
                })
            });
            //设置一分钟的倒计时
            var interval = setInterval(function () {
                currentTime--; //每执行一次让倒计时秒数减一
                that.setData({
                    text: currentTime + 's', //按钮文字变成倒计时对应秒数
                })
                //如果当秒数小于等于0时 停止计时器 且按钮文字变成重新发送 且按钮变成可用状态 倒计时的秒数也要恢复成默认秒数 即让获取验证码的按钮恢复到初始化状态只改变按钮文字
                if (currentTime <= 0) {
                    clearInterval(interval)
                    that.setData({
                        text: '重新发送',
                        currentTime: 61,
                        disabled: false,
                        color: '#929fff'
                    })
                }
            }, 1000);
        };
        //判断 当提示错误信息文字不为空 即手机号输入有问题时提示用户错误信息 并且提示完之后一定要让按钮为可用状态 因为点击按钮时设置了只要点击了按钮就让按钮禁用的情况
        if (warn != null) {
            wx.showModal({
                title: '提示',
                content: warn
            })
            that.setData({
                disabled: false,
                color: '#929fff'
            })
            return;
        };
    },
    formSubmit: function (e) {
        console.log(e.detail.value)
        var status = "";
        wx:wx.request({
            url: 'https://exbuy.double.com.cn/api/users/register',
            data: {
                mobile: e.detail.value.mobile,
                code: e.detail.value.vcode,
            },
            method: 'POST',
            dataType: 'json',
            responseType: 'text',
            success: function (res) {
                console.log(res)
                status=res.data.status
                if (status == 1) {
                    wx.navigateTo({
                        url: '../orderOrPayment/orderOrPayment',
                    })
                    
                } else {
                    wx.showToast({
                        title: "验证码错误",
                        icon: 'none'
                    })
                }
            },
            fail: function (res) { },
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

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