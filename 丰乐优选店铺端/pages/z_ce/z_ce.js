const app = getApp();
Page({
  //刷新Token
  refreshToken: function() {
    console.log(wx.getStorageSync('phoneNumber'))
    console.log(wx.getStorageSync('password'))
    if (wx.getStorageSync('phoneNumber') != '' && wx.getStorageSync('password') == '') {
      wx.request({
        url: app.globalData.baseUrl + "/wechat/store/api/login",
        data: {
          "phoneNumber": wx.getStorageSync('phoneNumber'),
          "password": wx.getStorageSync('password')
        },
        header: {
          'Content-Type': 'application/json'
        },
        method: 'post',
        success: function(res) {
          console.log("登陆成功：", res.data.msg)
          wx.setStorageSync('storeToken', res.data.msg); // 更新Token
        }
      })

    } else {
      wx.navigateTo({
        url: '/pages/index/login/login'
      })
    }
  }
})