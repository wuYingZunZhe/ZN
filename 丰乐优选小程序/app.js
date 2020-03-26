require('./common/runtime.js')
require('./common/vendor.js')
require('./common/main.js')




App({
  //全局变量
  globalData: {
    //用户微信数据
    avatarUrl: '',
    city: '',
    country: '',
    gender: '',
    language: '',
    nickName: '',
    province: '',
    registerUrl: 'xxxxxxxxxx', //服务器请求地址
  },
  //------通用功能-----

  //显示loading
  showLoading: function() {
    wx.showToast({
      title: '加载中...',
      mask: true,
      icon: 'loading'
    })
  },
  //获取用户信息并存入全局变量
  getUserInfo: function() {
    let that = this;
    wx.getUserInfo({
      withCredentials: true,

      success: function(res) {
        consolr.log(res, 'res');

        that.globalData.avatarUrl = res.userInfo.avatarUrl;
        that.globalData.city = res.userInfo.city;
        that.globalData.country = res.userInfo.country;
        that.globalData.gender = res.userInfo.gender;
        that.globalData.language = res.userInfo.language;
        that.globalData.nickName = res.userInfo.nickName;
        that.globalData.province = res.userInfo.province;
      },
      fail: function(res) {
        console.log(res)
      },
      complete: function(res) {},
    })
  },
  //获取用户信息------------
  getUserInfo_3: function(e, that, num) {
    let app = this;

    console.log('获取用户信息')

    if (app.globalData.canIUse) {
      if (e.detail.errMsg == "getUserInfo:ok") { //授权
        console.log('329getUserInfo', e)
        util.login(e.detail.userInfo, mobile, that, num, app, scene);
        that.setData({
          logosrc: e.detail.userInfo.avatarUrl,
          userInfo: e.detail.userInfo
        })
      } else if (e.detail.errMsg == "getUserInfo:fail auth deny") { //拒绝授权
        console.log('拒绝授权个人信息')
        app.showText('您若不登录将无法使用小程序部分功能哦', that);
      } else {
        wx.hideLoading()
        app.showText('网络加载失败，请稍后重试哦', that);
        that.setData({
          isUser: true,
          isshowModal: true,
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success(res) {
          console.log("获取用户信息成功", res, 171)
          if ('getUserInfo:ok' == res.errMsg) {
            console.log(scene, 2600000, num)
            util.login(res.userInfo, mobile, that, num, app, scene);
            that.setData({
              logosrc: res.userInfo.avatarUrl,
              userInfo: res.userInfo
            })
          }
          if (app.userInfoReadyCallback) {
            app.userInfoReadyCallback(res)
          }
        },
        fail(res) {
          console.log("获取用户信息失败", res)
          wx.showModal({
            title: '请授权',
            content: '为了让您更好的体验点单服务，请授权！！！',
          })
          wx.hideLoading()
        }
      })
    }


  },
  //获取token
  getToken() {
    let token = wx.getStorageSync('token')
    if (!token) {
      wx.reLaunch({
        url: 'pages/login/login' //无token跳转到登录页
      })
    } else {
      wx.reLaunch({
        url: "pages/index/index" //有token跳转到首页
      })
    }
  },
  //----获取微信登陆凭证---
  register: function(ph, ver) {
    wx.login({
      success(res) {
        if (res.code) {
          console.log('登录成功！' + res.code)
          return res.code
        } else(
          console.log('登录失败！' + res.errMsg)
        )
      }
    })
  },
  //请求封装
  request: function(data) {
    let that = this;
    wx.request({
      url: this.globalData.registerUrl,
      data: data,
      method: 'POST',
      header: {
        'content-type': 'application/json',
      },
      success(res) {
        console.log(res.data, '请求成功！');
        return res
      },
      fail(err) {
        console.log(err, '请求失败！');
      }
    })
  },
  //获取当前位置信息
  getLocation: function() {
    wx.getLocation({
      type: 'wgs84',
      success(res) {
        const latitude = res.latitude
        const longitude = res.longitude
        const speed = res.speed
        const accuracy = res.accuracy
        console.log(res)
      }
    })
  },
  showLoading: function(e) {
    wx.showLoading({
      title: '加载中',
      mask: true
    })
  },
  //--------------------------------------
  onLaunch: function() {
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              console.log(this.globalData)
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
    var that = this
    //获取屏幕尺寸，放到全局结构中
    wx.getSystemInfo({
      success: function(res) {
        that.globalData.scHeight = res.windowHeight
        that.globalData.scWidth = res.windowWidth
      },
    })
    console.log(this.globalData.scWidth)
    console.log(this.globalData.scHeight)
  },
  globalData: {
    userInfo: null,
    scWidth: 0, //全局的屏幕尺寸，已经去掉了上边的标题栏
    scHeight: 0
  },

  //---------------------------------------
  /*
  //同步存储数据到本地缓存
  setStorage: function(key, value) {
    try {
      wx.setStorageSync(key, value)
    } catch (e) {
      wx.setStorage({
        key: key,
        data: value,
      })
    }
    var dep_value = wx.getStorageSync(key);
    console.log(dep_value);
  },*/

  //当小程序初始化完成时触发 （全局只触发一次）
  onLaunch: function() {
    //this.getUserInfo(); //获取用户信息
    //console.log('小程序启动', this.globalData.userInfo)
  },
  onShow: function(options) {
    //this.getUserInfo(); //获取用户信息
    //console.log(this.globalData.userInfo, '002', this.globalData.userInfo);
    //console.log('小程序启动2')
  },

})