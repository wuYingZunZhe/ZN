// var baseUrl = 'http://192.168.0.101:8080';//司俊阳
var baseUrl = 'http://192.168.0.118:8080'; //程方圆

function checkToken(api, method, postData, success, fail) {
  console.log('001')
  let that = this;
  if (wx.getStorageSync('storeToken') != '') {
    console.log('002')
    let headerToken = {
      'context-type': 'application/json'
    }
    headerToken['Authorization'] = wx.getStorageSync('storeToken')
    wx.request({
      url: baseUrl + "/wechat/store/api/checkToken",
      header: headerToken,
      method: 'get',
      success: function(res) {
        console.log('003',res.data.code)
        if (res.data.code != '200') {
          console.log('004')
          if (wx.getStorageSync('phoneNumber') != '' && wx.getStorageSync('password') == '') {
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
                wx.setStorageSync('storeToken', res.data.msg);
                that.postData(api, method, postData, success, fail);
              },
              fail: function(err) {
                wx.navigateTo({
                  url: '/pages/index/login/login'
                })
              }
            })
          } else {
            console.log('005')
            wx.navigateTo({
              url: '/pages/index/login/login'
            })
          }
        } else {
          console.log('006')
          that.postData(api, method, postData, success, fail);
        }
      },
      fail: function(err) { // 
        if (true) {
          if (wx.getStorageSync('phoneNumber') != '' && wx.getStorageSync('password') == '') {
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
                wx.setStorageSync('storeToken', res.data.msg);
                that.postData(api, method, postData, success, fail);
              },
              fail: function(err) {
                console.log(err);
                wx.navigateTo({
                  url: '/pages/index/login/login'
                })
              }
            })
          } else {
            wx.navigateTo({
              url: '/pages/index/login/login'
            })
          }
        } else {
          that.postData(api, method, postData, success, fail);
        }
      }
    })
  } else {
    wx.navigateTo({
      url: '/pages/index/login/login'
    })
  }

}

function getToken(api, method, postData, success, fail) {
  console.log('a001')
  let that = this;
  if (wx.getStorageSync('phoneNumber') != '' && wx.getStorageSync('password') == '') {
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
        wx.setStorageSync('storeToken', res.data.msg);
        that.postData(api, method, postData, success, fail);
      },
      fail: function(err) {
        console.log(err);
        wx.navigateTo({
          url: '/pages/index/login/login'
        })
      }
    })
  } else {
    wx.navigateTo({
      url: '/pages/index/login/login'
    })
  }
}

function postData(api, method, postData, success, fail) {
  console.log('b001')
  wx.showNavigationBarLoading()
  wx.showLoading({
    title: '正在加载',
  })
  let headerToken = {
    'context-type': 'application/json'
  }
  headerToken['Authorization'] = wx.getStorageSync('storeToken')
  wx.request({
    url: baseUrl + api,
    data: postData ? postData:{},
    header: headerToken,
    method: method,
    success: function(res) {
      wx.hideNavigationBarLoading()
      wx.hideLoading()
      console.log('res', res)
      if (res.statusCode == 200) {
        success ? success(res.data) : '';
      } else {
        fail ? fail(res) : '';
      }
    },
    fail: function(err) {
      wx.hideNavigationBarLoading()
      wx.hideLoading()
      fail ? fail(err) : '';
    },
    complete: function(res) {},
  })
}

function getData(api,success, fail) {
  wx.showNavigationBarLoading()
  wx.showLoading({
    title: '正在加载',
  })
  let headerToken = {
    'context-type': 'application/json'
  }
  headerToken['Authorization'] = wx.getStorageSync('storeToken')
  wx.request({
    url: baseUrl + api,
    header: headerToken,
    method: 'get',
    data: {
    },
    success: function (res) {
      success(res.data);
      wx.hideNavigationBarLoading()
      wx.hideLoading()
    }
  })
}

function putData(api, putData,success, fail){
  wx.showNavigationBarLoading()
  wx.showLoading({
    title: '正在加载',
  })
  let headerToken = {
    'context-type': 'application/json'
  }
  headerToken['Authorization'] = wx.getStorageSync('storeToken')
  wx.request({
    url: baseUrl + api,
    header: headerToken,
    method: 'PUT',
    data: postData ? postData : {},
    success: function (res) {
      success(res.data);
      wx.hideNavigationBarLoading()
      wx.hideLoading()
    }
  })
}

module.exports = {
  check: checkToken,
  request: postData,
  postData,
  getData,
  putData,
}