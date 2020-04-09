// pages/order/order_1/order_1.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navIndex: 0, //记录当前点击的类目
    navTextArr: ["全部", "消费者订单", "代客下单"],
    showModal: false, //是否显示弹出框
    allChecked: false, //是否全部选中
    orderData_4: [ //测试数据
      {
        "id": 0,
        "orderId": 2004567895622,
        "orderStatus": 0,
        "orderimgs": ["https://images.unsplash.com/photo-1551214012-84f95e060dee?w=640", "https://images.unsplash.com/photo-1551214012-84f95e060dee?w=640", "https://images.unsplash.com/photo-1551214012-84f95e060dee?w=640"],
        orderTime: '2020-04-01 :00:27:57',
        goodsNum: 5,
        goodsPrice: 39.86,
        userName: '李奕琦',
        pickId: '1',
        userPhone: '12345678952',
        "checked": false
      }, {
        "id": 1,
        "orderId": 2,
        "orderStatus": 1,
        "orderimgs": ["https://images.unsplash.com/photo-1551214012-84f95e060dee?w=640", "https://images.unsplash.com/photo-1551214012-84f95e060dee?w=640", "https://images.unsplash.com/photo-1551214012-84f95e060dee?w=640"],
        orderTime: '2020-04-01 :00:27:57',
        goodsNum: 5,
        goodsPrice: 39.86,
        userName: '李奕琦',
        pickId: '1',
        userPhone: '12345678952',
        "checked": false
      }, {
        "id": 2,
        "orderId": 2,
        "orderStatus": 0,
        "orderimgs": ["https://images.unsplash.com/photo-1551214012-84f95e060dee?w=640", "https://images.unsplash.com/photo-1551214012-84f95e060dee?w=640", "https://images.unsplash.com/photo-1551214012-84f95e060dee?w=640"],
        orderTime: '2020-04-01 :00:27:57',
        goodsNum: 5,
        goodsPrice: 39.86,
        userName: '李奕琦',
        pickId: '1',
        userPhone: '12345678952',
        checked: false
      }, {
        "id": 3,
        "orderId": 2,
        "orderStatus": 1,
        "orderimgs": ["https://images.unsplash.com/photo-1551214012-84f95e060dee?w=640", "https://images.unsplash.com/photo-1551214012-84f95e060dee?w=640", "https://images.unsplash.com/photo-1551214012-84f95e060dee?w=640"],
        orderTime: '2020-04-01 :00:27:57',
        goodsNum: 5,
        goodsPrice: 39.86,
        userName: '李奕琦',
        pickId: '1',
        userPhone: '12345678952',
        checked: false
      },
    ],
  },
  //导航栏点击切换
  navChange: function(e) {
    this.setData({
      navIndex: e.currentTarget.dataset.index
    })
  },
  //弹出框显示隐藏
  showModal() {
    this.setData({
      showModal: !this.data.showModal
    });

  },
  // 过滤器
  filter: function(num) {
    return '0123'
  },

  // 单个按钮选中
  checked: function(e) {
    let that = this;
    let index = e.currentTarget.dataset.index;
    let checked = this.data.orderData_4[index].checked
    console.log(this.data.orderData_4[index].checked)
    this.setData({
      [`orderData_4[${index}].checked`]: !checked
    })
  },
  // 全选按钮
  allChecked: function() {
    let that = this;
    let allChecked = !that.data.allChecked;
    for (var i = 0; i < that.data.orderData_4.length; i++) {
      that.setData({
        [`orderData_4[${i}].checked`]: allChecked,
        allChecked: allChecked
      })
    }
  },
  //提醒发货
  remind: function() {
    let that = this;
    let remindArr = []; //选择提醒列表
    for (var i = 0; i < that.data.orderData_4.length; i++) {
      if (that.data.orderData_4[i].checked) {
        remindArr.push(that.data.orderData_4[i])
      }
    }
    console.log('需要提醒', remindArr)
    if (remindArr==[]) {
      wx.showToast({
        title: '至少选择一个提醒！',
        icon: 'success',
        duration: 2000
      })
    } else {
      wx.showToast({
        title: '提醒发货！',
        icon: 'success',
        duration: 2000
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