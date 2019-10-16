var app = getApp();
var md5 = require('../../utils/md5.js');
var md51 = require('../../utils/md51.js');
var util = require('../../utils/util.js');
var timestamp =0;

var textcontent = '';
var table_number = ''; 
var store_id='';
var user_id='';
var token='';
Page({ 
  data: {
    titlename: '提交订单',
      showModalStatus: false,
    disabled:false,
      statu:'open',
      orderList: [],
      orderCost: 0,
      account_money: '',
      discount_price: '',
      service_money: '', 
      save_money: '',
      no_discount_price: '',
      store_name :'',
      store_logo:'',
      actual_money:'',
      userInput:'',
      isShowmore:true,
    isMask:false,
    table_number: '',
    people_number: '',
    textareaValue:'',
  },
  clearInput: function () {
    this.setData({
      userInput: ''
    });
  },
  powerDrawer: function(e) {
      var currentStatu = e.currentTarget.dataset.statu;
    console.log(currentStatu)
    this.util(currentStatu);
    // // 显示抽屉
    if (currentStatu == "open") {
        this.setData({
          showModalStatus: true,
          statu: 'close'
        });
      } else {
        this.setData({
          showModalStatus: false,
          statu: 'open'
        });
      }
  },
  util: function(currentStatu) {
      /* 动画部分 */
      // 第1步：创建动画实例 
      var animation = wx.createAnimation({
          duration: 200, //动画时长
          timingFunction: "linear", //线性
          delay: 0 //0则不延迟
      });

      // 第2步：这个动画实例赋给当前的动画实例
      this.animation = animation;

      // 第3步：执行第一组动画：Y轴偏移240px后(盒子高度是240px)，停
      animation.translateY(240).step();

      // 第4步：导出动画对象赋给数据对象储存
      this.setData({
          animationData: animation.export()
      })

      // 第5步：设置定时器到指定时候后，执行第二组动画
      setTimeout(function() {
          // 执行第二组动画：Y轴不偏移，停
          animation.translateY(0).step()
          // 给数据对象储存的第一组动画，更替为执行完第二组动画的动画对象
          this.setData({
              animationData: animation
          })
        
      }.bind(this), 200)

  },
  onLoad: function (option) {
    
    let globalKey = wx.getStorageSync('globalKey');
    let store_info = wx.getStorageSync('store_info');

    store_id = option.store_id;
    token = option.token || globalKey.token;
    user_id = option.user_id || globalKey.user_id;
    let choosedList = wx.getStorageSync('choosedList')
    console.log(option, 89, store_info, store_info.table_number)
    if (store_info.table_number !=''){
      table_number = store_info.table_number ;
      this.data.disabled=true;
    } else {
      table_number = '';
    }
    if (!choosedList) {
      console.log("没有选择菜品");
    } else {
      for (let k in choosedList) {
        choosedList[k].cost = choosedList[k].goods_selenum * choosedList[k].discount_price;
      }
      let olLen = choosedList.length;
      let isShowmore = true;
      if (olLen > 3) {
        isShowmore = false;
      }
      this.setData({
        orderList: choosedList, isShowmore, category_id: option.category_id, table_number, disabled: this.data.disabled
      })
    }
    this.getData();
    
  },
  onShow: function () {
  },

  // 备注
  handleContentInput(event) {
      let textareaValue = event.detail.value;
    textcontent = textareaValue;
    let store_info = wx.getStorageSync('store_info');
    store_info.textareaValue = textareaValue;
      this.setData({
          userInput: textareaValue
    });
    wx.setStorageSync('store_info', store_info)
      
  },
  // 桌号
  table_number:function(e){

    let store_info = wx.getStorageSync('store_info');
    let index=e.target.dataset.index;
    if(index==1){
      this.data.people_number = e.detail.value;
      store_info.people_number = e.detail.value;
    }else{
      this.data.table_number = e.detail.value;
      store_info.table_number = e.detail.value;
    }
    wx.setStorageSync('store_info', store_info)
    console.log(this.data.table_number, this.data.people_number, e.detail.value)
  },
  returnDiscountGood(){
    var choosedList = wx.getStorageSync('choosedList') || that.data.choosedList;
    var discount_goods = new Array();
    for (var item in choosedList) {
      var obj1 = {
        goods_id: choosedList[item]["goodsid"],
        goods_num: choosedList[item]["goods_selenum"],
        goods_type: choosedList[item]["goods_type"],
      }
      discount_goods.push(obj1)

    }
    discount_goods = JSON.stringify(discount_goods);
    return discount_goods
  },
  getData: function () {
    let that = this;
    
    let discount_goods = that.returnDiscountGood();
    let gram=util.returnGram();
    // 提交订单
    wx.request({
      url: app.globalData.url + '/api/store_detail/get_bill_info_new',
      data: {
        request_object: app.globalData.request_object,
        user_id,
        store_id,
        discount_goods: discount_goods,
        timestamp: gram.timestamp,
        process: gram.process,
        token: gram.token
      },
      method: 'POST',
      header: {
        'Content-Type': "application/x-www-form-urlencoded"
      },
      success: function (res) {
        console.log(token, 243, '生成订单', res)
        if (res.data.status == 1) {
          var store_info = wx.getStorageSync('store_info')
          that.setData({
            account_money: res.data.data.account_money,
            discount_price: res.data.data.discount_price,
            service_money: res.data.data.service_money,
            save_money: res.data.data.save_money,
            no_discount_price: res.data.data.no_discount_price,
            actual_money: res.data.data.actual_money,
            store_name: store_info.store_name,
            store_logo: store_info.store_logo,
            store_address: store_info.store_address,
            isMask: false,
          })
          
         
        } else {
          if (res.data.message) {

            wx.showToast({
              title: res.data.message,
              icon: 'none',
              duration: 2000,
            })
          }
        }
      },
      fail: function () {
        // fail
        console.log("服务器响应失败");
        wx.showToast({
          title: '服务器响应失败',
          icon: 'none',
          duration: 2000,
        })
      },
      complete: function () {
        // complete
      },

    })
    
  },
  bindblur(e) {
    if (e.detail.value == 0) {
      this.setData({
        people_number: ''
      })
    }
  },
  wechatPay: function () {
    var that = this;

    let store_info = wx.getStorageSync('store_info');
    let discount_goods = that.returnDiscountGood();
    let gram =util.returnGram();
    //去微信支付
    if (this.data.people_number == ''){
      wx.showToast({
        title: '请输入人数',
        icon:'none'
      })
    } else if (this.data.people_number == 0){
      wx.showToast({
        title: '人数不能为0',
        icon: 'none'
      })
      this.setData({
        people_number: ''
      })
    } else if (this.data.userInput.length > 50) {
      wx.showToast({
        title: '备注不能超过50个字',
        icon: 'none'
      })
    }else{
      
    wx: wx.request({
      url: app.globalData.url + '/api/store_detail/insert_order_new',
      data: {
        request_object: app.globalData.request_object,
        user_id,
        store_id,
        discount_goods: discount_goods,
        remark: that.data.userInput || '',//备注
        table_number: that.data.table_number || store_info.table_number || '',
        people_count: that.data.people_number || store_info.people_number,
        timestamp: gram.timestamp,
        process: gram.process,
        token: gram.token

      },
      method: 'POST',
      header: {
        'Content-Type': "application/x-www-form-urlencoded"
      },
      success: function (res) {
        console.log(token, 243, '生成订单号', res)
        if (res.data.status == 1) {
          util.resetGoods()
          wx.redirectTo({
            url: '../pay/pay?order_id=' + res.data.data.order_id + '&user_id=' + user_id + '&store_id=' + store_id + '&actual_money=' + that.data.actual_money,
          })
        } else {
          if (res.data.message) {

            wx.showToast({
              title: res.data.message,
              icon: 'none',
              duration: 2000,
            })
          }
        }
      },
      fail: function () {
        // fail
        app.showMind()
      },
      complete: function () {
        // complete
      },

      })
    }
  },

  
  showMore(){
    let num = parseInt(this.data.orderList.length);
    if (num > 3) {
      console.log(this.data.orderList)
      this.setData({
        moreH: num * 150,
        isShowmore: true,
      })
    }
  },


  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () { 
    
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (res) {
    let store_info = wx.getStorageSync('store_info');
    console.log(store_info)
    if (res.from === 'button') {
    }
    return {
      title: '转发',
      path: 'pages/orderOrPayment/orderOrPayment?store_id=' + store_id + '&store_name=' + store_info.store_name,
      success: function (res) {

      }
    }

  },
})