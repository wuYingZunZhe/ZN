// pages/index/audit/audit.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    step: 0, //步骤条状态
    bossName: '', //老板姓名
    bossIdentity: '', //老板身份证
    bossPhone: '18888888888', //老板手机号
    bossPhoneUse:false,//手机号是否已注册
    bossWeChat: '', //常用微信号
    bossBankCard: '', //银行卡号
    bankOpenName: '', //开户行名称
    bankOpenId: '', //开户行行号
    formComplete: false, //表单验证状态

  },
  //老板姓名非空验证
  bossName: function(e) {
    this.setData({
      bossName: e.detail.value
    })
    this.formCheck();
  },
  //老板身份证非空验证
  bossIdentity: function(e) {
    this.setData({
      bossIdentity: e.detail.value
    })
    this.formCheck();
  },
  //老板手机号非空验证
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
  //常用微信号非空验证
  bossWeChat: function(e) {
    this.setData({
      bossWeChat: e.detail.value
    })
    this.formCheck();
  },
  //银行卡号非空验证
  bossBankCard: function(e) {
    this.setData({
      bossBankCard: e.detail.value
    })
    this.formCheck();
  },
  //开户行名称非空验证
  bankOpenName: function(e) {
    this.setData({
      bankOpenName: e.detail.value
    })
    this.formCheck();
  },
  //开户行行号非空验证
  bankOpenId: function(e) {
    this.setData({
      bankOpenId: e.detail.value
    })
    this.formCheck();
  },

  //表单数据检查
  formCheck: function() {
    let that = this;
    //console.log(this.data)
    if (that.data.bossName != '' && that.data.bossIdentity != '' && that.data.bossPhone != '' && that.data.bossWeChat != '' && that.data.bossBankCard != '' && that.data.bankOpenName != '') {
      that.setData({
        formComplete: true,
      })
    }
  },
  //表单数据提交
  formSubmit: function(e) {
    console.log('提交', e.detail.value)
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