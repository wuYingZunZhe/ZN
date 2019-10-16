// pages/share/share.js\
var app = getApp();
var util = require('../../utils/util.js');
import QRCode from '../../utils/QRcode.js';
var user_id = '';
var order_id = '';
Page({

  /**
   * 页面的初始数据
   */ 
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let systemInfo= wx.getSystemInfoSync() 
    let width = systemInfo.screenWidth;
    let height = systemInfo.screenHeight;

    // let store_id = e.currentTarget.dataset.store_id;
    // let order_id = e.currentTarget.dataset.order_id;
    this.shareSave(options.store_id, options.order_id)
    this.setData({
      width, height
    })
    // this.getCode(2, 147316);
  },
  shareSave(store_id,order_id) {

    let that = this;
    that.getCode(store_id, order_id);
   /* //判断用户是否授权"保存到相册"
    wx.getSetting({
      success(res) {
        console.log(533333, '保存到相册', res)
        //没有权限，发起授权
        if (!res.authSetting['scope.writePhotosAlbum']) {
          console.log(55)
          wx.authorize({
            scope: 'scope.writePhotosAlbum',
            success() {//用户允许授权，保存图片到相册
              that.getCode(store_id, order_id);
            },
            fail() {//用户点击拒绝授权，跳转到设置页，引导用户授权
              wx.openSetting({
                success() {
                  wx.authorize({
                    scope: 'scope.writePhotosAlbum',
                    success() {
                      that.getCode(store_id, order_id);
                    }
                  })
                }
              })
            }
          })
        } else {//用户已授权，保存到相册
          console.log(74, store_id, order_id)
          that.getCode(store_id, order_id);
        }
      }
    })
    //若二维码未加载完毕，加个动画提高用户体验
    wx.showLoading({
      title: '正在保存图片',
    })*/
  },
  getCode(store_id, order_id, num) {
    let that = this;
    let gram = util.returnGram();
    num = num || 2;
    wx.showLoading({
      title: '加载中',
    })
    let globalKey = wx.getStorageSync('globalKey')
    console.log(store_id, order_id, 200, globalKey)
    wx.request({
      url: app.globalData.url + '/api/store_order/get_share_qrcode',
      data: {
        order_id: order_id,
        store_id: store_id,
        timestamp: gram.timestamp,
        process: gram.process,
        token: gram.token,
        user_id: globalKey.user_id || that.data.user_id,
        request_object: app.globalData.request_object,
      },
      method: "post",
      success(res) {
        console.log(res)
        if (res.data.status == 1) {
          let mydata = res.data.data;
          console.log(mydata)
          let qrcode ='';
          // let qrcode = app.globalData.url + mydata.share_qrcode;
          let share_url = mydata.share_url;
          console.log(share_url,101111111)
          // let share_url = mydata.share_qrcode;
          let nowDate = new Date();
          let Year = nowDate.getFullYear();//获取系统的年；
          let M = (nowDate.getMonth() + 1 < 10 ? '0' + (nowDate.getMonth() + 1) : nowDate.getMonth() + 1);
          let Dates = nowDate.getDate() < 10 ? '0' + nowDate.getDate() : nowDate.getDate();
          let effective_date = mydata.effective_date.replace(/年/g, '');
          effective_date = effective_date.replace(/月/g, '');
          effective_date = effective_date.replace(/日/g, '');
          let now = Year + M + Dates + '';
          console.log(now, effective_date)
          
          if (now > effective_date) {
            wx.showModal({
              title: '提示',
              content: '您的分享码已过期',
            })
            return;
          }
          if (num == 2) {

            // console.log(res)
            that.setData({
              store_name: mydata.store_name,
              account_money: mydata.account_money,
              save_money: mydata.save_money
            })
           console.log(share_url)

            that.drawImage(share_url)
            that.code1(share_url).then((res)=>{
              console.log(res,12777)
              wx.canvasGetImageData({
                canvasId: 'canvas1',
                x: 0,
                y: 0,
                width: 300,
                height: 300,
                success(res) {
                  console.log(res.data instanceof Uint8ClampedArray, 172222)
                  wx.canvasPutImageData({
                    canvasId: 'canvas',
                    data: res.data,
                    x: 0,
                    y: 0,
                    // 0, 0, 300, 300, width - 86 - 48, height - 86 - 40, 86, 86
                    width: 86,
                    height: 86,
                    success: (res) => {
                      console.log(res)
                    },
                    fail: (err) => {
                      console.error(err)
                    }
                  })
                  
                 
                  // ...
                }
              })
              // that.drawImage(res)
              // wx.downloadFile({
              //   url: res,
              //   success(res) {
              //     console.log(res, 172)
              // that.drawImage(res.tempFilePath)
                // }
              // })
            })
          }

        } else {
          let title = res.data.message;
          wx.showToast({
            title,
            icon: 'none'
          })
        }
      },
      fail() {
        app.showMind();
      }
    })
  },
  code1(share_url){
    return new Promise((resolve)=>{
      QRCode.api.draw(share_url, "canvas1", 300, 300);
     
      wx.canvasToTempFilePath({
        x: 0,
        y: 0,
        width: 300,
        height: 300,
        destWidth: 300,
        destHeight: 300,
        canvasId: 'canvas1',
        success: function (res) {
          if (res.errMsg == "canvasToTempFilePath:ok") {
            console.log('downloadFile1', res.tempFilePath)
            resolve(res.tempFilePath)
          }
        },
        fail: function (res) { }
      })
    })
  },
  drawImage(code, texts) {
    let that = this;
    var canvas = wx.createCanvasContext('canvas');
    let bigImg = '../../images/12.png';
    let width = 375;
    let height = 667;
    // 绘制背景图
    canvas.drawImage(bigImg, 0, 0, width, height);
    // // 绘制活动二维码
    // console.log
    // canvas.drawImage(code,0,0,300,300, width - 86 - 48, height - 86 - 40, 86, 86);
    let arr = [{
      text: '刚刚消费' + that.data.account_money.toString() + '元',
      size: 18,
      color: '#FFFFFF',
      top: 328,
    }, {
      text: that.data.save_money.toString() + '元',
      size: 36,
      color: '#ffffff',
      top: 420,
    }
    ];
    //绘制文本
    var text = that.data.store_name;
    let textL = text.length;
    var text1 = '';
    var text2 = '';
    let fz = 20;
    let textY = 192;

    if (textL > 9) {
      text1 = text.slice(0, textL / 2 + 1);
      text2 = text.slice(textL / 2 + 1, textL);
      fz = 16;
    }
    canvas.setFontSize(fz)
    canvas.setFillStyle("#ffffff")
    canvas.setStrokeStyle('#ffffff')
    if (text2.length > 0) {
      textY = 178
      canvas.fillText(text1, (width - canvas.measureText(text1).width) / 2, textY);
      textY = 204;
      canvas.fillText(text2, (width - canvas.measureText(text2).width) / 2, textY);
    } else {
      canvas.fillText(text, (width - canvas.measureText(text).width) / 2, textY);
    }


    let cost = arr[0].text;

    canvas.moveTo((width - parseFloat(canvas.measureText(cost).width)) / 2 + 6, 340);       //设置起点状态
    canvas.lineTo((width + parseFloat(canvas.measureText(cost).width)) / 2 - 6, 340);       //设置末端状态
    canvas.lineWidth = 1;          //设置线宽状态
    canvas.strokeStyle = '#ffffff';  //设置线的颜色状态
    canvas.stroke();


    for (let i = 0; i < arr.length; i++) {
      console.log(canvas.measureText(arr[i].text).width)
      arr[i].left = width / 2,
        this.drawText(canvas, arr[i]);
    }

    canvas.draw();
    console.log(2399999999999999)
    setTimeout(function () {
      wx.canvasToTempFilePath({
        x: 0,
        y: 0,
        width: width,
        height: height,
        destWidth: width,
        destHeight: height,
        canvasId: 'canvas',
        success: function (res) {
          if (res.errMsg == "canvasToTempFilePath:ok") {
            console.log('downloadFile1', res.tempFilePath)
            wx.hideLoading()           
            that.imgsrc =[];
            that.imgsrc.push(res.tempFilePath)
            that.setData({
              imgsrc: that.imgsrc
            })
          }
        },
        fail: function (res) { }
      })
    }, 500)
  },
  drawText(canvas, obj) {
    canvas.fillStyle = obj.color;
    canvas.setFontSize(obj.size);
    canvas.textAlign = 'center';
    canvas.fillText(obj.text, obj.left, obj.top)
  },
  shareImage(){
    console.log(this.imgsrc)
    wx.previewImage({
      urls: this.imgsrc // 需要预览的图片http链接列表  
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    let title = '我在一鹿省边省边赚，你也快来吧！';
    let that = this;
    if (res.from === 'menu') {
      console.log(res)
    }
    return {
      title,
      imageUrl: '/images/5.png',
      path: 'pages/home/index',
      success: function (res) {
        console.log(res)

      }
    }
  }
})