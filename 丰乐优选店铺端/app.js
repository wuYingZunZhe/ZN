//app.js
const request = require('./utils/request.js')
App({
  //刷新Token
  refreshToken: function () {
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
        success: function (res) {
          console.log("登陆成功：", res.data.msg)
          wx.setStorageSync('storeToken', res.data.msg); // 更新Token
        }
      })

    } else {
      wx.navigateTo({
        url: '/pages/index/login/login'
      })
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
  onLoad: function (options) {
    console.log('89652')
    request.getToken()
  },
  onLaunch: function () {
    // 获取小程序更新机制兼容
    if (wx.canIUse('getUpdateManager')) {
      const updateManager = wx.getUpdateManager()
      updateManager.onCheckForUpdate(function (res) {
        // 请求完新版本信息的回调
        if (res.hasUpdate) {
          updateManager.onUpdateReady(function () {
            wx.showModal({
              title: '更新提示',
              content: '新版本已经上线啦~，为了获得更好的体验，建议立即更新',
              showCancel: false,
              confirmColor: "#5677FC",
              success: function (res) {
                // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
                updateManager.applyUpdate()
              }
            })
          })
          updateManager.onUpdateFailed(function () {
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
    isLogin: false,//是否登陆
    baseUrl:'http://192.168.0.118:8080',//服务器地址
  }
})