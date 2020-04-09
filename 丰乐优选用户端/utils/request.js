
// var serversUrl = 'http://192.168.0.101:8080';//司俊阳
var serversUrl = 'http://192.168.0.118:8080';//程方圆


//请求封装
function request(api, postData, success, fail) {
  //console.log('参数:', api, postData, success, fail)
  wx.showNavigationBarLoading() //导航条加载动画
  wx.showLoading({ //显示loading
    title: '正在加载',
  })
  wx.request({
    url: serversUrl + '/wechat/api/' + api,
    data: postData,
    header: {
      'Content-Type': 'application/json' 
    },
    method: 'post',
    success: function(res) {
      wx.hideNavigationBarLoading()
      wx.hideLoading() //关闭loding
      if (res.statusCode == 200) {
        success(res.data)
      } else {
        fail()
      }
    },
    fail: function(res) {
      wx.hideNavigationBarLoading()
      wx.hideLoading()
      fail()
    },
    complete: function(res) {
    },
  })
}

//请求测试
function test(num){
  let dataList = { userId: '1', name: '张三' }
  this.request('index/getData', dataList, function (res) {
    console.log(res)//请求成功回调
  }, function (res) {
    console.log(res)//请求失败回调
  })
}

//获取Token
function getToken() {
  wx.request({
    url: serversUrl+"/wechat/store/api/login",
    data: {
      "phoneNumber": "18888888888",
      "password": "123"
    },
    header: {
      'Content-Type': 'application/json'
    },
    method: 'post',
    success: function (res) {
       console.log(res.data.msg)
    }
  })
}

module.exports = {
  request,
  test,
  getToken
}