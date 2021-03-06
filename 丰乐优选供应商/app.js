//app.js
App({
  getChooseLocation: function () {
    let that = this;
    wx.chooseLocation({
      success: function (res) {
        wx.setStorageSync('chooseLocation', res);
        console.log('选取地址', wx.getStorageSync('chooseLocation'));
        that.getCity(res.latitude, res.longitude);
      },
      fail: function () {
        wx.getSetting({
          success: function (res) {
            var statu = res.authSetting;
            if (!statu['scope.userLocation']) {
              wx.showModal({
                title: '是否授权当前位置',
                content: '需要获取您的地理位置，请确认授权，否则地图功能将无法使用',
                success: function (tip) {
                  if (tip.confirm) {
                    wx.openSetting({
                      success: function (data) {
                        if (data.authSetting["scope.userLocation"] === true) {
                          wx.showToast({
                            title: '授权成功',
                            icon: 'success',
                            duration: 1000
                          })
                          wx.chooseLocation({
                            success: function (res) {
                              wx.setStorageSync('chooseLocation', res);
                              that.getCity(res.latitude, res.longitude);
                            },
                          })
                        } else {
                          wx.showToast({
                            title: '授权失败',
                            icon: 'success',
                            duration: 1000
                          })
                        }
                      }
                    })
                  }
                }
              })
            }
          },
          fail: function (res) {
            wx.showToast({
              title: '调用授权窗口失败',
              icon: 'success',
              duration: 1000
            })
          }
        })
      }
    })
  },



  globalData: {
    isLogin: false, //是否登录
    baseUrl: 'http://192.168.0.165:8080', //服务器地址
  }
})