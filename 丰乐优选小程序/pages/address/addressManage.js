// pages/z_ce/new/new.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    addressData: {
      name: '',
      mobile: '',
      addressName: '',
      address: '',
      area: '',
      default: false
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('options', options)
    /*var title = '新增收货地址';
   if (option.type === 'edit') {
     title = '编辑收货地址';

     this.addressData = JSON.parse(option.data);
   }
   this.manageType = option.type;
  
   wx.setNavigationBarTitle({
     title: title
   });*/
  },
  switchChange: function switchChange(e) {
    this.addressData.default = e.detail;
  },
  //获取联系人姓名
  inputName: function (e) {
    this.setData({
      'addressData.name': e.detail.value
    })
  },
  //获取手机号
  inputNumber: function (e) {
    this.setData({
      'addressData.mobile': e.detail.value
    })
  },
  //地图选择地址
  chooseLocation: function () {
    var that = this;
    wx.chooseLocation({
      success: function (res) {
        console.log('data', that.data.addressData.addressName);
        console.log(res.address)
        that.setData({
          'addressData.address': res.address,
          'addressData.addressName':res.name
        })
      },      
    });

  },

  //提交
  confirm: function () {
    var data = this.data.addressData;
    console.log(data)
    if (!data.name) {
      wx.showToast({
        title: '请输入联系人',
        icon: 'none',
      })
      return;
    }
    if (!/(^1[3|4|5|7|8][0-9]{9}$)/.test(data.mobile)) {
      wx.showToast({
        title: '请输入正确的手机号码',
        icon: 'none',
      })
      return;
    }
    if (!data.address) {
      wx.showToast({
        title: '请在地图选择所在位置',
        icon: 'none',
      })
      return;
    }
    /*
    if (!data.area) {
      wx.showToast({
        title: '请填写门牌号信息',
        icon: 'none',
      })
      return;
    }*/
    wx.navigateBack({
      delta: 1
    })
    
    /*
    //this.$api.prePage()获取上一页实例，可直接调用上页所有数据和方法，在App.vue定义
    this.$api.prePage().refreshList(data, this.manageType);
    this.$api.msg("\u5730\u5740".concat(this.manageType == 'edit' ? '修改' : '添加', "\u6210\u529F"));
    setTimeout(function () {
      uni.navigateBack();
    }, 800);*/
    
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

  }
})