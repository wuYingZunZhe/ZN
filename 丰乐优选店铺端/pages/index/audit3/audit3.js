// pages/index/audit/audit.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    step: 2, 
    phoneNumber:'123',
    invitation:'',
    code:'',
    formComplete: false,


  

  },
  binInvitation:function(e){
    this.setData({
      invitation: e.detail.value
    })
    console.log(e.detail.value)
    this.formCheck();
  },
  binCode: function (e) {
    this.setData({
      code: e.detail.value
    })
    this.formCheck();
  },
  

  formCheck: function () {
    let that = this;
    console.log(that.data)
    if (that.data.invitation != '' && that.data.code != '' ) {
      that.setData({
        formComplete: true,
      })
    }else{
      that.setData({
        formComplete: false,
      })
    }
  },
 
  formSubmit: function (e) {
    console.log('提交', e.detail.value)
    console.log(wx.getStorageSync('bossInfo'), wx.getStorageSync('shopInfo'))
  },
  
  sendMsg: function () {
    let that = this;
    wx.request({
      url: app.globalData.baseUrl + "/wechat/store/api/sendSMS/" + that.data.phoneNumber,
      header: {
        'Content-Type': 'application/json'
      },
      method: 'POST',
      success: function (res) {
        console.log(res)
      },
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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