// pages/index/audit/audit.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    step: 1,//步骤条状态
    detailShopName:'',//店铺详细名称
    shopArea:'',//店铺面积
    selectLocation: '',//选择省份地址
    detailAddress: '',//详细地址
    licenseName: '',//营业执照中的名称
    registrationNum: '',//统一社会信息代码或注册号
    formComplete: false,//表单验证状态

  },
  
  //店铺详细名称非空验证
  detailShopName: function (e) {
    this.setData({
      detailShopName: e.detail.value
    })
    this.formCheck();
  },
  //店铺面积非空验证
  shopArea: function (e) {
    this.setData({
      shopArea: e.detail.value
    })
    this.formCheck();
  },
  //选择省份地址非空验证
  selectLocation: function (e) {
    this.setData({
      selectLocation: e.detail.value
    })
    this.formCheck();
  },
  //详细地址非空验证
  detailAddress: function (e) {
    this.setData({
      detailAddress: e.detail.value
    })
    this.formCheck();
  },
  //营业执照中的名称非空验证
  licenseName: function (e) {
    this.setData({
      licenseName: e.detail.value
    })
    this.formCheck();
  },
  //统一社会信息代码或注册号非空验证
  registrationNum: function (e) {
    this.setData({
      registrationNum: e.detail.value
    })
    this.formCheck();
  },



  // 选择省市区地址
  selectLocation:function(e){
    console.log("123",e.detail.value)
    this.setData({
      selectLocation: e.detail.value
    })
  },
  //输入详细地址
  detailAddress:function(e){
    this.setData({
      detailAddress:e.detail.value
    })
  },
  // // 上传门店门头照
  // putShopPhoto: function (){
  //   wx.chooseImage({
  //     success(res) {
  //       const tempFilePaths = res.tempFilePaths
  //       wx.uploadFile({
  //         url: 'https://xxxxxxxxx', //仅为示例，非真实的接口地址
  //         filePath: tempFilePaths[0],
  //         name: 'file',
  //         formData: {
  //           'user': 'test'
  //         },
  //         success(res) {
  //           const data = res.data
  //           //do something
  //         }
  //       })
  //     }
  //   })
  // },
  //图片上传到服务器
  chooseImage: function (e) {
    var that = this;
    wx.chooseImage({
      success: function (res) {
        var tempFilePaths = res.tempFilePaths
        wx.uploadFile({
          url: 'https://xxxxxx/upload', //图片上传
          filePath: tempFilePaths[0],
          name: 'file',
          formData: {
            "phoneNumber": "18888888888",
            "password": "123",
            "token":'',
          },
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
  // 跳到老板个人信息提交页
  toAudit: function () {
    wx.navigateTo({
      url: '../audit/audit'
    })
  },
  // 提交审核数据
  submit: function () {
    console.log('提交数据')
  },
  //表单数据检查
  formCheck: function () {
    let that = this;
    //console.log(this.data)
    if (that.data.detailShopName != '' && that.data.shopArea != '' && that.data.selectLocation != '' && that.data.detailAddress != '' && that.data.licenseName != '' && that.data.registrationNum != '') {
      that.setData({
        formComplete: true,
      })
    }
  },
  
  //表单数据提交
  formSubmit: function (e) {
    console.log('提交', e.detail.value)
    


  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      uplaodFile: app.uplaodFile.bind(this)
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

  }
})