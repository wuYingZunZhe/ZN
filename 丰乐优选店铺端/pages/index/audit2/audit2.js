// pages/index/audit/audit.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    step: 1,
    detailShopName:'',
    shopArea:'',
    selectLocation: '',
    detailAddress: '',
    licenseName: '',
    registrationNum: '',
    formComplete: true,
    chooseLocation:'',

  },
  chooseLocation:function(){
    let that=this;
    console.log('123')
    wx.chooseLocation({
      success: function (res) {
        console.log(res);
        wx.setStorageSync('chooseLocation', res);
        that.setData({
          chooseLocation:res
        }) 
      },
      fail: function () {
        app.getChooseLocation();
      }
    })  
  },
 
  detailShopName: function (e) {
    this.setData({
      detailShopName: e.detail.value
    })
    this.formCheck();
  },
  
  shopArea: function (e) {
    this.setData({
      shopArea: e.detail.value
    })
    this.formCheck();
  },
 
  selectLocation: function (e) {
    this.setData({
      selectLocation: e.detail.value
    })
    this.formCheck();
  },
 
  detailAddress: function (e) {
    this.setData({
      detailAddress: e.detail.value
    })
    this.formCheck();
  },
  
  licenseName: function (e) {
    this.setData({
      licenseName: e.detail.value
    })
    this.formCheck();
  },

  registrationNum: function (e) {
    this.setData({
      registrationNum: e.detail.value
    })
    this.formCheck();
  },



 
  selectLocation:function(e){
    console.log("123",e.detail.value)
    this.setData({
      selectLocation: e.detail.value
    })
  },
 
  detailAddress:function(e){
    this.setData({
      detailAddress:e.detail.value
    })
  },

  chooseImage: function (e) {
    var that = this;
    wx.chooseImage({
      success: function (res) {
        var tempFilePaths = res.tempFilePaths
        wx.uploadFile({
          url: app.globalData.baseUrl +'/wechat/upload', 
          filePath: tempFilePaths[0],
          name: 'file',
          
          success: function (res) {
            
            var data = res.data
            that.setData({
              files: that.data.files.concat(res.tempFilePaths)
            });
          }
        })
      }
    })
  },
  toAudit: function () {
    wx.navigateTo({
      url: '../audit/audit'
    })
  },
 
  submit: function (e) {
    console.log('提交数据')
    
  },
  formCheck: function () {
    let that = this;
    if (that.data.detailShopName != '' && that.data.shopArea != '' && that.data.selectLocation != '' && that.data.detailAddress != '' && that.data.licenseName != '' && that.data.registrationNum != '') {
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
   
    wx.setStorageSync('shopInfo', e.detail.value);

    if (true) {
      wx.navigateTo({
        url: '../audit3/audit3'
      })
    }

 
    

    


  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      uplaodFile: app.uplaodFile.bind(this),
      chooseLocation: wx.getStorageSync('chooseLocation'),
    });
    // app.getUserInfo(); 
    
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