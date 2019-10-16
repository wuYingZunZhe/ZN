// pages/myorder/myorder.js
var app = getApp();
var util = require('../../utils/util.js');
var user_id = '';
var order_id = '';

var timer = null;
var msg = '';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    titlename: '我的订单',
    redBack:1,
    isActive:0,
    isUser: false,
    isPhone: false,
    nodata:false,
    orderData:[],
    isAdd:true,
    page:1,
    order_status:0,
    isOpenset:false,
  },
 
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var sysInfo = wx.getSystemInfoSync();
    var windowHeight = sysInfo.windowHeight;
   
    let that = this;
    this.setData({
      scrollH: windowHeight - 132, width:375,height: 667
    })


  },
  //点击保存图片
  /*shareSave(e) {
    let store_id = e.currentTarget.dataset.store_id;
    let order_id = e.currentTarget.dataset.order_id;
    wx.navigateTo({
      url: '/pages/share/share?store_id=' + store_id + '&order_id='+order_id,
    })
  }, */
  shareSave(e) {
    let store_id = e.currentTarget.dataset.store_id;
    let order_id = e.currentTarget.dataset.order_id;

    this.getImgSet(store_id, order_id)
  },
  getImgSet(store_id, order_id ) {
    let that = this;
    //判断用户是否授权"保存到相册"
    wx.getSetting({
      success(res) {
        console.log(533333, '保存到相册', res)
        //没有权限，发起授权
        if (!res.authSetting['scope.writePhotosAlbum']) {
          console.log(55)
          wx.authorize({
            scope: 'scope.writePhotosAlbum',
            success(res) {//用户允许授权，保存图片到相册
              console.log(res)
              that.getCode(store_id, order_id);
            },
            fail() {//用户点击拒绝授权，跳转到设置页，引导用户授权
              console.log(57)
              wx.hideLoading();
              that.setData({
                isOpenset:true
              })
              // wx.openSetting({
              //   success(res) {
              //     console.log(res,58)
              //     wx.authorize({
              //       scope: 'scope.writePhotosAlbum',
              //       success() {
              //         that.getCode(store_id, order_id);
              //       }
              //     })
              //   }
              // })
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
    })
  },
  handleSetting(e){
    console.log(e)
    if (!e.detail.authSetting['scope.writePhotosAlbum']) {
      wx.showModal({
        title: '警告',
        content: '若不打开授权，则无法将图片保存在相册中！',
        showCancel: false
      })
      this.setData({
        isOpenset: true
      })
    } else {
      wx.showModal({
        title: '提示',
        content: '您已授权，赶紧将图片保存在相册中吧！',
        showCancel: false
      })
      this.setData({
        isOpenset: false
      })
    }
  },
  drawImage(code,texts) {
    let that=this;
    var canvas = wx.createCanvasContext('canvas');
    let bigImg = '../../images/12.png';
    let width = this.data.width;
    let height = this.data.height;
    // 绘制背景图
    canvas.drawImage(bigImg, 0, 0, width, height);
    // // 绘制活动二维码
    canvas.drawImage(code, 0, 0, 392, 392, width - 86 - 48, height - 86 - 40, 86, 86);
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

    canvas.draw()
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
            wx.saveImageToPhotosAlbum({
              filePath: res.tempFilePath,
              success(res){
                wx.showModal({
                  title: '温馨提示',
                  content: '图片成功保存到相册了，快去分享朋友圈吧',
                })
              }
            })
            // wx.downloadFile({
            //   url: res.tempFilePath,
            //   success: function (res) {
            //     wx.saveImageToPhotosAlbum({
            //       filePath: res.tempFilePath,
            //       success(res) {
            //         wx.showModal({
            //           title: '温馨提示',
            //           content: '图片成功保存到相册了，快去分享朋友圈吧',
            //         })
            //       }
            //     })
            //   }
            // })
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
  getCode(store_id, order_id,num) {
    let that = this;
    let gram = util.returnGram();
    num=num || 2;
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
        user_id: globalKey.user_id ||that.data.user_id,
        request_object: app.globalData.request_object,
      },
      method: "post",
      success(res) {
        console.log(res)
        if (res.data.status == 1) {
          let mydata = res.data.data;
          console.log(mydata)
          let qrcode = app.globalData.url + mydata.share_qrcode;
          let nowDate=new Date();
          let Year = nowDate.getFullYear();//获取系统的年；
          let M = (nowDate.getMonth() + 1 < 10 ? '0' + (nowDate.getMonth() + 1) : nowDate.getMonth() + 1) ;
          let Dates = nowDate.getDate() < 10 ? '0' + nowDate.getDate() : nowDate.getDate() ;
          let effective_date = mydata.effective_date.replace(/年/g, '');
          effective_date = effective_date.replace(/月/g, '');
          effective_date = effective_date.replace(/日/g, '');
          let now = Year + '' + M + '' + Dates+'';
          // console.log(Year, M, Dates,now,effective_date)
          if(now>effective_date){
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
            wx.downloadFile({
              url: qrcode,
              success(res) {
                console.log(res)
                that.drawImage(res.tempFilePath)
              }
            })
          }
          
        }else{
          let title = res.data.message;
          wx.showToast({
            title,
            icon:'none'
          })
        }
      },
      fail(){
        app.showMind();
      }
    })
  },
  //保存图片到相册，提示保存成功
  savePhoto() {

  },
  
  drawCanvas() {
    var canvas = wx.createCanvasContext('canvas');

  },
  
  
  cancleOrder: function (e) {
    let order_id = e.currentTarget.dataset.order_id;
    let index = e.currentTarget.dataset.index;
    let that=this;
    wx.showModal({
      title: '提示',
      content: '确认取消订单?',
      success(res) {
        if (res.confirm) {

          let globalKey = wx.getStorageSync('globalKey');
          let gram = util.returnGram();
          
          wx.request({
            url: app.globalData.url + '/api/store_order/update_order_status',
            data: {
              order_id,
              request_object: app.globalData.request_object,
              user_id: globalKey.user_id,
              timestamp: gram.timestamp,
              process: gram.process,
              token: gram.token,
            },
            method: 'POST',
            header: {
              'Content-Type': "application/x-www-form-urlencoded"
            },
            success: function (res) {
              if (res.data.status == 1) {
                wx.showToast({
                  title: '订单取消成功',
                  icon: 'none',
                  duration: 2000,
                })
                let orderData = that.data.orderData;
                let nodata=false;
                orderData.splice(index, 1);
                let oL = orderData.length;
                if(oL==0){
                  nodata=true;
                }
                that.setData({
                  unpaid_count: parseInt(that.data.unpaid_count) - 1,
                  orderData, nodata,isActive: 1,
                })
              } else {
                wx.showToast({
                  title: '订单取消失败',
                  icon: 'none',
                  duration: 2000,
                })
              }
            },
            fail: function () {
              wx.showToast({
                title: '服务器响应失败',
                icon: 'none',
                duration: 2000,
              })
            }
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })

  },

  getPhoneNumber: function (e) {
    let that = this;
    app.getPhoneNumber(e, that,1)
  
  },

  getUserInfo: function (e) {
    let that = this;
    app.getUserInfo(e,that,1)
  },
  
  //getData的参数
  returnArr: function () {
    var globalKey = wx.getStorageSync('globalKey');
    let arr = [{
      url: 'store_order/list_order_new',
      user_id: this.data.user_id || globalKey.user_id ,
      order_status: this.data.order_status,
      page: this.data.page,
    }]
    return arr;
  },
  getData(arr){
    console.log(1116, arr)
    let gram = util.returnGram();
    let that = this;
    wx.request({
      url: app.globalData.url + '/api/' + arr.url,
      method: 'post',
      data: {
        city: arr.city,
        type: arr.type,
        user_id: arr.user_id || '',
        order_status: arr.order_status || 0,
        page: arr.page,
        limit: 10,
        request_object: app.globalData.request_object,
        timestamp: gram.timestamp,
        token: gram.token,
        process: gram.process
      },
      success(res) {
        console.log(res, 50, arr.order_status)
        if (res.data.status == 1) {
          let newData = res.data.data;
          let orderData  = that.data.orderData;          
          if (newData.hasOwnProperty('list_order') && newData.list_order.length>0) {
            let list_order = newData.list_order;
            if(arr.page==1){
              orderData=[];              
            }
            if(that.data.isActive !=1){
              that.data.isAdd = true;
            }else {
              that.data.isAdd = false;
            }
            list_order = util.addUrl(list_order, 'store_logo')
            list_order = util.addUrl(list_order, 'share_qrcode')
            console.log(newData,404)
            let unpaid_count = newData.unpaid_count;
            for (let i = 0; i < list_order.length; i++) {
              list_order[i].msg = false;

              if (list_order[i].order_status == 1) {
                let over_time = new Date(list_order[i].overdue_time);
                let nowDate = new Date();
                list_order[i].remainTime = over_time - nowDate;
              }
              orderData.push(list_order[i]);
            }
            
            that.setData({
              nodata: false,
              unevaluate_count: res.data.data.unevaluate_count,
              unpaid_count,
              nomoreL:2,
              unused_count: res.data.data.unused_count,
            })

            that.countdown(orderData, unpaid_count);
            
          } else {
            wx.hideLoading()
            if (arr.page > 1) {
              wx.showModal({
                title: '温馨提示',
                content: '您的相关订单信息已经全部加载完了哦！',
              })
              return;
            }
            that.setData({
              nodata: true,
              nomoreL:1,
              orderData: newData
            })
          }
        }else{
          wx.hideLoading()
          let title = '温馨提示';
          let content = '数据加载失败，请重试';
          if (res.data.message == "您的账号在另外一台设备登录，请及时关注账号安全！"){
            title = "您的账号在另外一台设备登录，请及时关注账号安全！"
          }
          wx.showModal({
            title, content,
          })
        }
      },
      fail(){

        app.showMind();
      }
    })
  },
  countdown(orderData, unpaid_count) {
    // console.log('countdown', 174, orderData)
    let that = this;

    clearInterval(timer);
    if (unpaid_count > 0) {        
    timer = setInterval(function () {
        for (let i = 0; i < orderData.length; i++) {
          orderData[i].remainTime -= 1000
          let t = orderData[i].remainTime
          if (t > 0) {
            let day = Math.floor(t / 86400000)
            let hour = Math.floor((t / 3600000) % 24)
            let min = Math.floor((t / 60000) % 60)
            let sec = Math.floor((t / 1000) % 60)
            day = day < 10 ? '0' + day : day
            hour = hour < 10 ? '0' + hour : hour
            min = min < 10 ? '0' + min : min
            sec = sec < 10 ? '0' + sec : sec
            // let format =min + '分' + sec +' 秒'
            orderData[i].msg = '0小时' + min + '分'
          } else {
            // 进行判断 如果数据内所有的倒计时已经结束，那么结束定时器， 如果没有那么继续执行定时器
            let flag = orderData.every((val, ind) =>

              val.remainTime <= 0)
            if (flag) clearInterval(timer)
            orderData[i].msg = ''// 结束文案
          }
          // console.log(orderData[i].msg )
          that.setData({
            orderData,
          })
          wx.hideLoading()
        }
      }, 1000)
    } else {
      wx.hideLoading();
      that.setData({
        orderData,
      })
    }
  },
  
  changeoption(e){
    let index = e.target.dataset.index;
    let orderDataL = this.data.orderData.length;
    
    app.showLoading();
    app.toTop();
    this.setData({
      isActive: index, order_status: index, page: 1, isAdd:false
    })
    let arr = this.returnArr();
    arr[0].order_status = index;
    arr[0].page = 1;
    this.getData(arr[0]);
    
  },
  methods(e){
    let that=this;
    console.log(e)
    let index= e.target.dataset.index;
    let order_id = e.currentTarget.dataset.order_id;
    let store_id = e.currentTarget.dataset.store_id;
    
    if (index == 1) {//去支付

    }else if(index==2){//去支付

    } else if (index == 3) {//评价

    } else if (index == 4) {//立即分享

    }
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
    console.log('myorder', app.globalData.order_status)
    let isActive=0;
    if (app.globalData.order_status==2){
      isActive=2
      app.globalData.order_status=0
    }
    if (app.globalData.order_status == 1) {
      isActive = 1      ;
      app.globalData.order_status = 0;
      this.data.isAdd=false;
    }

    this.setData({
      isActive
    })

    this.showModal();
  },
  showLoading(){
    app.showLoading();
  },
  showModal() {
    let me = this;
    app.showLoading();
    app.checkOpenid().then(()=>{
      util.showModal(me, app);
    })
    let globalKey = wx.getStorageSync('globalKey');
    let newuser1 = globalKey.newuser1;
    console.log(newuser1)
    if (globalKey.hasOwnProperty('newuser1')) { 
      me.showList(newuser1);
    } else {
      let timer = setTimeout(function () {
        me.showList();
        clearTimeout(timer);
      }, 1000)

    } 
  },
  showList(newuser1){
    console.log(5222, newuser1)
    let arr = this.returnArr();
    if (newuser1) {
      app.showLoading()
      arr[0].order_status = this.data.isActive;
      arr[0].page = 1;
      if (this.data.isActive==1){
        this.data.unpaid_count-=1;
      }
      this.getData(arr[0]);
      this.setData({
        nodata: false,
        isPhone: false,
        isUser: false,
        isshowModal: false,
        unpaid_count: this.data.unpaid_count,
      })
    }
  },
  closeshowModal(e){
    console.log(e)
    let index=e.target.dataset.index || '';
    if(index==1){
      app.showText('您若不登录将无法查看订单信息哦', this);
    }  
    
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
  onReachBottom(ev) {
    // contentScroll: function (ev) {
   
    let arr = this.returnArr();
    console.log('onReachBottom')
    if (this.data.isAdd) {
      arr[0].page++;
      this.data.page++;
      app.showLoading();
      this.getData(arr[0]);
    }

  },
 
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (res) {

    app.onshare()
  },
  
})