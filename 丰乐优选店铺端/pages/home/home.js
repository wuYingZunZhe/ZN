const app = getApp();
const request = require('../../utils/request.js')
Page({
  data: {
    homeData:{},
    addressData: '', 
    signText: '一天又一天，温暖陪伴，我一直在！', 
    routers: [{
        name: '商品分享',
        url: 'share',
        width: 60,
        height: 60
      },
      // {
      //   name: '我要咨询',
      //   url: 'consult',
      //   width: 60,
      //   height: 60
      // },
      {
        name: '我的提成',
        url: 'deduct',
        width: 60,
        height: 60
      },
      {
        name: '提现/记录',
        url: 'withdraw',
        width: 64,
        height: 64
      },
      /*{
        name: '销量比拼',
        url: 'sales',
        width: 58,
        height: 58
      },
      {
        name: '门店晒单',
        url: 'bask',
        width: 64,
        height: 64
      },
      {
        name: '图文提取',
        url: 'image-text',
        width: 68,
        height: 68
      },*/
      {
        name: '快捷报单',
        url: 'report',
        width: 48,
        height: 48
      },
      {
        name: '查看会员',
        url: 'member',
        width: 74,
        height: 48
      },
      {
        name: '扫一扫',
        url: 'scan',
        width: 74,
        height: 48
      },
      {
        name: '我要售后',
        url: 'refund',
        width: 60,
        height: 60
      },
      {
        name: '修改密码',
        url: 'password',
        width: 74,
        height: 48
      },
      /*{
        name: '门店录入',
        url: 'entering',
        width: 74,
        height: 48
      },
      {
        name: '配送评价',
        url: 'comment',
        width: 64,
        height: 58
      },*/
      {
        name: '门店歇业申请',
        url: 'close',
        width: 64,
        height: 58
      },
      /*{
        name: '代客下单',
        url: 'client',
        width: 64,
        height: 50
      }*/
    ],

  },
  share:function(){
    wx.navigateToMiniProgram({
      appId: 'wx4bb80b8ba3605cdc',
      path: 'page/index/index?shop=123',
      extraData: {
        foo: 'bar'
      },
      envVersion: 'develop',
      success(res) {
        
      }
    })
  },
  getHomeData: function() {
    let that=this;
    request.getData('/wechat/store/api',(res) => {
      console.log(res);
      console.log('成功:', res.data);
      that.setData({
        homeData:res.data
      })
      
    });
  },
  chooseLocation: function() {
    var that = this;
    wx.chooseLocation({
      success: function(res) {
        console.log('data', that.data.addressData.addressName);
        console.log(res.address)
        that.setData({
          'addressData.address': res.address,
          'addressData.addressName': res.name
        })
      },
    });

  },
  signature: function(e) {
    let that =this;
    console.log(e.detail.value)
    this.setData({
      signText: e.detail.value
    })
    let postData = {
      "individuality": e.detail.value
    };
    let headerToken = {
      'context-type': 'application/json'
    }
    headerToken['Authorization'] = wx.getStorageSync('storeToken')
    wx.request({
      url: app.globalData.baseUrl+'/wechat/store/api/individuality',
      data: postData ? postData : {},
      header: headerToken,
      method: 'PUT',
      success: function (res) {
        that.getHomeData();
      }
    })
  },
  toOrder: function(e) {
    let index = e.currentTarget.dataset.index;
    wx.navigateTo({
      url: '../order/order_' + index + '/order_' + index,
    })
  },
  toSales: function() {
    wx.navigateTo({
      url: '../sales/sales'
    })
  },
  toNews: function() {
    wx.navigateTo({
      url: '../news/news'
    })
  },
  canvas: function(sum, num) {
    var context = wx.createCanvasContext('Canvas');
    var context2 = wx.createCanvasContext('Canvas');
    var array = [sum, num];
    var colors = ["rgb(17, 146, 233)", "rgb(17, 208, 233)", "#008B8B"];
    var total = 0;
    for (var val = 0; val < array.length; val++) {
      total += array[val];
    }
    var point = {
      x: 55,
      y: 55
    };
    var radius = 50;
    for (var i = 0; i < array.length; i++) {
      context.beginPath();
      var start = 0;
      if (i > 0) {
        for (var j = 0; j < i; j++) {
          start += array[j] / total * 2 * Math.PI;
        }
      }
      context.arc(point.x, point.y, radius, start, start + array[i] / total * 2 * Math.PI, false);
      context.setLineWidth(2)
      context.lineTo(point.x, point.y);
      context.setStrokeStyle(colors[i]);
      context.setFillStyle(colors[i]);
      context.fill();
      context.closePath();
      context.stroke();
    }
    context.draw();
  },
  putPortrait: function() {
    let that = this;
    wx.chooseImage({
      success(res) {
        const tempFilePaths = res.tempFilePaths
        wx.uploadFile({
          url: app.globalData.baseUrl+'/wechat/upload', 
          filePath: tempFilePaths[0],
          name: 'file',
          formData: {
            
          },
          success(res) {
            let url = JSON.parse(res.data);
            url = url.data.url;
            let headerToken = {
              'context-type': 'application/json'
            };
            headerToken['Authorization'] = wx.getStorageSync('storeToken');
            wx.request({
              url: app.globalData.baseUrl + "/wechat/store/api/storeAvatar",
              header: headerToken,
              method: 'PUT',
              data:{
                "storeAvatar": url
              },
              success: function (res) {
                if(res.data.code==200){
                  that.getHomeData();
                }   
              }
            })
          }
        })
      }
    })
  },
  quit: function() {
    let that = this;
    let headerToken = {
      'context-type': 'application/json'
    };
    console.log(wx.getStorageSync('storeToken'));
    headerToken['Authorization'] = wx.getStorageSync('storeToken');
    wx.request({
      url: app.globalData.baseUrl + "/wechat/store/api/logout",
      header: headerToken,
      method: 'get',
      success: function(res) {
        console.log('成功:', res);
        wx.setStorageSync('phoneNumber', '');
        wx.setStorageSync('password', '');
        wx.setStorageSync('storeToken', '');

        if (res.data.code == 200) {
          wx.navigateTo({
            url: '/pages/index/login/login'
          })
        }

      },
      fail: function(err) {
        console.log(err)
      }
    })
  },
  

  onLoad: function(options) {
    this.canvas(100, 5);
    this.getHomeData();
  }
})