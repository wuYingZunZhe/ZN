// var baseUrl = 'http://192.168.0.101:8080';//司俊阳
var baseUrl = 'http://192.168.0.118:8080'; //程方圆
//验证店铺端Token是否有效
function checkToken(success) {
  console.log('验证店铺端Token是否有效')
  if (wx.getStorageSync('storeToken') != '') { //token是否已经缓存
    let headerToken = {
      'context-type': 'application/json'
    }
    headerToken['Authorization'] = wx.getStorageSync('storeToken')

    wx.request({ //判断缓存的token是否过期
      url: baseUrl + "/wechat/store/api/checkToken",
      header: headerToken,
      method: 'get',
      success: function(res) {
        console.log('token:', res)
        if (res.data.code != 200) { //token已经过期,需要重新获取新token

          if (wx.getStorageSync('phoneNumber') != '' && wx.getStorageSync('password') == '') { //是否已缓存手机号和密码
            wx.request({
              url: baseUrl + "/wechat/store/api/login",
              data: {
                "phoneNumber": wx.getStorageSync('phoneNumber'),
                "password": wx.getStorageSync('password')
              },
              header: {
                'Content-Type': 'application/json'
              },
              method: 'post',
              success: function(res) {
                console.log('新token', res)
                wx.setStorageSync('storeToken', res.data.msg); // 更新Token
                success ? success(res.data) : ''; //执行回调函数
              },
              fail: function(err) { //存储手机或密码错误，需要重新登陆
                console.log(err);
                wx.navigateTo({
                  url: '/pages/index/login/login'
                })
              }
            })
          } else { //重新登陆
            wx.navigateTo({
              url: '/pages/index/login/login'
            })
          }
        } else {
          success ? success(res.data) : ''; //执行回调函数
        }
      }
    })
  } else { //重新获取
    wx.navigateTo({
      url: '/pages/index/login/login'
    })
  }

}


//请求封装
function request(api, method ='post', postData, success, fail) {
  //console.log('参数:', api, postData, success, fail)
  wx.showNavigationBarLoading() //导航条加载动画
  wx.showLoading({ //显示loading
    title: '正在加载',
  })
  wx.request({
    url: baseUrl + api,
    data: postData,
    header: {
      'Content-Type': 'application/json'
    },
    method: 'post',
    success: function(res) {
      wx.hideNavigationBarLoading()
      wx.hideLoading() //关闭loding
      if (res.statusCode == 200) {
        success ? success(res.data) : '';
        // checkToken()
      } else {
        fail ? fail() : '';
      }
    },
    fail: function(res) {
      wx.hideNavigationBarLoading()
      wx.hideLoading()
      fail ? fail() : '';
    },
    complete: function(res) {},
  })
}



module.exports = {
  checkToken,
  request,
}