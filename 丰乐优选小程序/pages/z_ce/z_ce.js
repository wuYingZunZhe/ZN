// pages/z_ce/new/new.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    addressData: {
      name: '',
      mobile: '',
      addressName: '在地图选择',
      address: '',
      area: '',
      default: false
    }
  },
  methods: {
    switchChange: function switchChange(e) {
      this.addressData.default = e.detail;
    },

    //地图选择地址
    chooseLocation: function chooseLocation() {
      var _this = this;
      uni.chooseLocation({
        success: function success(data) {
          _this.addressData.addressName = data.name;
          _this.addressData.address = data.name;
        }
      });
    },
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var title = '新增收货地址';
    if (option.type === 'edit') {
      title = '编辑收货地址';

      this.addressData = JSON.parse(option.data);
    }
    this.manageType = option.type;
    uni.setNavigationBarTitle({
      title: title
    });

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