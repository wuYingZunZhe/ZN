// pages/z_ce/new/new.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    source: 0,
    addressList: [{
        name: '张三',
        mobile: '18666666666',
        addressName: '建业购物广场',
        address: '河南省周口市太康县建设路',
        area: '',
        default: true
      },
      {
        name: '李四',
        mobile: '18667766666',
        addressName: '万家乐生活广场',
        address: '河南省周口市沈丘县槐店镇河南商贸对面',
        area: '',
        default: false
      }
    ]

  },
  //选择地址
  checkAddress: function s(item) {
    if (this.source == 1) {
      //this.$api.prePage()获取上一页实例，在App.vue定义
      this.$api.prePage().addressData = item;
      uni.navigateBack();
    }
  },
  addAddress: function (type, item) {
    wx.navigateTo({
      url: "/pages/address/addressManage?type=".concat(type, "&data=").concat(JSON.stringify(item))
    });
  },
  //添加或修改成功之后回调
  refreshList: function refreshList(data, type) {
    //添加或修改后事件，这里直接在最前面添加了一条数据，实际应用中直接刷新地址列表即可
    this.addressList.unshift(data);
    console.log(data, type);
},

/**
 * 生命周期函数--监听页面加载
 */
onLoad: function(options) {
  console.log(options);
  //this.source = options.source;
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