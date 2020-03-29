// request.js 文件
// 展示进度条的网络请求
// url:网络请求的url
// params:请求参数
// message:进度条的提示信息
// success:成功的回调函数
// fail：失败的回调
var serversUrl ='http://192.168.0.101:8080';//服务器地址
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
      'Content-Type': 'application/json' //默认
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

module.exports = {
  request,
  test,
}