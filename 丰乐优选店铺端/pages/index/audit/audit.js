// pages/index/audit/audit.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    step: 0, 
    bossName: '', 
    bossIdentity: '', 
    bossPhone: '18888888888', 
    bossPhoneUse:false,
    bossWeChat: '', 
    bossBankCard: '', 
    bankOpenName: '', 
    bankOpenId: '', 
    formComplete: true, 
    

  },
  bossName: function(e) {
    this.setData({
      bossName: e.detail.value
    })
    this.formCheck();
  },

  bossIdentity: function(e) {
    this.setData({
      bossIdentity: e.detail.value
    })
    this.formCheck();
  },

  bossPhone: function(e) {
    let that =this;
    console.log(e.detail.value)
    this.setData({
      bossPhone: e.detail.value
    })
    wx.request({
      url: app.globalData.baseUrl + "/wechat/store/api/checkExist/" + e.detail.value,

      header: {
        'Content-Type': 'application/json'
      },
      method: 'GET',
      success: function(res) {
        console.log(res.data)
        if (res.data.code != 200){
          console.log('123')
          that.setData({
            bossPhoneUse:true
          })
          wx.showToast({
            title: '此手机号已注册',
            icon: 'none',
            duration: 2000
          })
        }else{
          that.setData({
            bossPhoneUse: false
          })
        }
      },
    })


    this.formCheck();
  },

  bossWeChat: function(e) {
    this.setData({
      bossWeChat: e.detail.value
    })
    this.formCheck();
  },

  bossBankCard: function(e) {
    this.setData({
      bossBankCard: e.detail.value
    })
    this.formCheck();
  },
  
  bankOpenName: function(e) {
    this.setData({
      bankOpenName: e.detail.value
    })
    this.formCheck();
  },

  bankOpenId: function(e) {
    this.setData({
      bankOpenId: e.detail.value
    })
    this.formCheck();
  },

  formCheck: function() {
    let that = this;
    //console.log(this.data)
    if (that.data.bossName != '' && that.data.bossIdentity != '' && that.data.bossPhone != '' && that.data.bossWeChat != '' && that.data.bossBankCard != '' && that.data.bankOpenName != '') {
      that.setData({
        formComplete: true,
      })
    }else{
      that.setData({
        formComplete: false,
      })
    }
  },
 
  formSubmit: function(e) {
    
    wx.setStorageSync('bossInfo', e.detail.value);

    if (true) {
      wx.navigateTo({
        url: '../audit2/audit2'
      })
    }

  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})