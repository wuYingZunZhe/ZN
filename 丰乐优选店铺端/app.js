//app.js
const request = require('./utils/request.js')
const WXMap = require('./utils/qqmap-wx-jssdk.min.js');
App({
  //测试！
  test: function () {
    let postData = {
      "phoneNumber": wx.getStorageSync('phoneNumber'),
      "password": wx.getStorageSync('password')
    };
    request.check('/wechat/store/api/login', 'post', postData, (res) => {
      console.log('成功:', res);
    });
  },






  
  //自动获取用户个人信息
  getUserInfo: function(e) {
    let that = this;
    wx.getUserInfo({
      success: function(res) {
        wx.setStorageSync('userInfo', res.userInfo);
        console.log(wx.getStorageSync('userInfo'));
      },
      fail: function() {
        wx.getSetting({
          success: function(res) {
            var statu = res.authSetting;
            if (!statu['scope.userInfo']) {
              wx.showModal({
                title: '是否授权个人信息',
                content: '需要获取您的个人信息，请确认授权，否则登录功能将无法使用',
                success: function(tip) {
                  if (tip.confirm) {
                    wx.openSetting({
                      success: function(data) {
                        if (data.authSetting['scope.userInfo'] === true) {
                          wx.showToast({
                            title: '授权成功',
                            icon: 'success',
                            duration: 1000
                          })
                          wx.getUserInfo({
                            success: function(res) {
                              wx.setStorageSync('userInfo', res.userInfo);
                              console.log(wx.getStorageSync('userInfo'));
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
          fail: function(res) {
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
  
  getLocation: function() {
    let that = this;
    let latitude, longitude;
    wx.getLocation({
      success: function(res) {
        wx.setStorageSync('getLocation', res);
        that.getCity(res.latitude, res.longitude);
      },
      fail: function() {
        wx.getSetting({
          success: function(res) {
            var statu = res.authSetting;
            if (!statu['scope.userLocation']) {
              wx.showModal({
                title: '是否授权当前位置',
                content: '需要获取您的地理位置，请确认授权，否则地图功能将无法使用',
                success: function(tip) {
                  if (tip.confirm) {
                    wx.openSetting({
                      success: function(data) {
                        if (data.authSetting["scope.userLocation"] === true) {
                          wx.showToast({
                            title: '授权成功',
                            icon: 'success',
                            duration: 1000
                          })
                          wx.getLocation({
                            success: function(res) {
                              wx.setStorageSync('getLocation', res);
                              console.log(wx.getStorageSync('getLocation'));
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
          fail: function(res) {
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


  getChooseLocation: function() {
    let that = this;
    wx.chooseLocation({
      success: function(res) {
        wx.setStorageSync('chooseLocation', res);
        console.log('选取地址', wx.getStorageSync('chooseLocation'));
        that.getCity(res.latitude, res.longitude);
      },
      fail: function() {
        wx.getSetting({
          success: function(res) {
            var statu = res.authSetting;
            if (!statu['scope.userLocation']) {
              wx.showModal({
                title: '是否授权当前位置',
                content: '需要获取您的地理位置，请确认授权，否则地图功能将无法使用',
                success: function(tip) {
                  if (tip.confirm) {
                    wx.openSetting({
                      success: function(data) {
                        if (data.authSetting["scope.userLocation"] === true) {
                          wx.showToast({
                            title: '授权成功',
                            icon: 'success',
                            duration: 1000
                          })
                          wx.chooseLocation({
                            success: function(res) {
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
          fail: function(res) {
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

  // 获取当前省市县
  getCity: function (latitude, longitude) {
    let that = this;
    if (wx.getStorageSync('getLocation')) {
      new WXMap({
        key: 'TA7BZ-BHT3J-43AFC-KMWCP-OLK66-SJBFL'
      }).reverseGeocoder({
        location: {
          latitude: latitude ? latitude : wx.getStorageSync('getLocation').latitude,
          longitude: longitude ? longitude : wx.getStorageSync('getLocation').longitude
        },
        success: function (res) {
          // console.log('获取当前省市县:', res.result);
          wx.setStorageSync('address', res.result);
          
        }
      });
    } else {
      that.getLocation();
    }
  },
  // 文件上传的函数，返回一个promise
  uplaodFile(files) {
    // console.log('upload files', files)
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        reject('some error')
      }, 1000)
    })
  },
  // 页面加载
  onLoad: function(options) {
    
  },
  onShow: function() {
    // this.refreshToken();//刷新toKen
    this.getLocation();//获取位置信息
  },
  onLaunch: function() {
    // 获取小程序更新机制兼容
    if (wx.canIUse('getUpdateManager')) {
      const updateManager = wx.getUpdateManager()
      updateManager.onCheckForUpdate(function(res) {
        // 请求完新版本信息的回调
        if (res.hasUpdate) {
          updateManager.onUpdateReady(function() {
            wx.showModal({
              title: '更新提示',
              content: '新版本已经上线啦~，为了获得更好的体验，建议立即更新',
              showCancel: false,
              confirmColor: "#5677FC",
              success: function(res) {
                // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
                updateManager.applyUpdate()
              }
            })
          })
          updateManager.onUpdateFailed(function() {
            // 新的版本下载失败
            wx.showModal({
              title: '更新失败',
              content: '新版本更新失败，为了获得更好的体验，请您删除当前小程序，重新搜索打开',
              confirmColor: "#5677FC",
              showCancel: false
            })
          })
        }
      })
    } else {
      // 当前微信版本过低，无法使用该功能
    }
  },
  onError(err) {

  },
  globalData: {
    isLogin: false, //是否登录
    baseUrl: 'http://192.168.0.118:8080', //服务器地址
    
  }
})