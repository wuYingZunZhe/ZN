// pages/z_ce/new/new.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabCurrentIndex: 1,//订单状态
    navList: [{//订单标题导航栏数据
      state: 0,
      text: '全部',
      loadingType: 'more',
      orderList: []
    },

    {
      state: 1,
      text: '待付款',
      loadingType: 'more',
      orderList: []
    },

    {
      state: 2,
      text: '待收货',
      loadingType: 'more',
      orderList: []
    },

    {
      state: 3,
      text: '已提货',
      loadingType: 'more',
      orderList: []
    },
    ]
  },
  my_ce: function () {
    console.log('456');
  },
  //订单导航栏切换
  navbar: function (e) {
    this.setData({
      tabCurrentIndex: e.target.dataset.index,
    })
  },

  //获取订单列表
  loadData: function (source) {
    console.log('获取订单列表');
    wx.showLoading({
      title: '请稍后'
    });
    /*
    var _this = this;
    //这里是将订单挂载到tab列表下
    var index = this.tabCurrentIndex;
    var navItem = this.navList[index];
    var state = navItem.state;

    if (source === 'tabChange' && navItem.loaded === true) {
      //tab切换只有第一次需要加载数据
      return;
    }
    if (navItem.loadingType === 'loading') {
      //防止重复加载
      return;
    }
    navItem.loadingType = 'loading';
    setTimeout(function() {
      var orderList = _Json.default.orderList.filter(function(item) {
        //添加不同状态下订单的表现形式
        item = Object.assign(item, _this.orderStateExp(item.state));
        //演示数据所以自己进行状态筛选
        if (state === 0) {
          //0为全部订单
          return item;
        }
        return item.state === state;
      });
      orderList.forEach(function(item) {
        navItem.orderList.push(item);
      });
      //loaded新字段用于表示数据加载完毕，如果为空可以显示空白页
      _this.$set(navItem, 'loaded', true);

      //判断是否还有数据， 有改为 more， 没有改为noMore 
      navItem.loadingType = 'more';
    }, 600);*/
  },


  
    //swiper 切换
    changeTab: function (e) {
      this.tabCurrentIndex = e;
      //this.loadData('tabChange');
      //this.setdata({})
  },/*
    //顶部tab点击
    tabClick: function (index) {
      this.tabCurrentIndex = index;
    },
    //删除订单
    deleteOrder: function (index) {
      var _this2 = this;
      uni.showLoading({
        title: '请稍后'
      });
  
      setTimeout(function() {
        _this2.navList[_this2.tabCurrentIndex].orderList.splice(index, 1);
        uni.hideLoading();
      }, 600);
    },
    //取消订单
    cancelOrder: function (item) {
      var _this3 = this;
      uni.showLoading({
        title: '请稍后'
      });
  
      setTimeout(function() {
        var _this3$orderStateExp =
          _this3.orderStateExp(9),
          stateTip = _this3$orderStateExp.stateTip,
          stateTipColor = _this3$orderStateExp.stateTipColor;
        item = Object.assign(item, {
          state: 9,
          stateTip: stateTip,
          stateTipColor: stateTipColor
        });
  
  
        //取消订单后删除待付款中该项
        var list = _this3.navList[1].orderList;
        var index = list.findIndex(function(val) {
          return val.id === item.id;
        });
        index !== -1 && list.splice(index, 1);
  
        uni.hideLoading();
      }, 600);
    },
  */
    //订单状态文字和颜色
    orderStateExp: function (state) {
      var stateTip = '',
        stateTipColor = '#fa436a';
      switch (+state) {
        case 1:
          stateTip = '待付款';
          break;
        case 2:
          stateTip = '待发货';
          break;
        case 9:
          stateTip = '订单已关闭';
          stateTipColor = '#909399';
          break;
  
          //更多自定义
      }
    },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that=this;
    let index;
    console.log('options', options.state,options);

    if (options.state){
       index = Number(options.state);
    }else{
       index = 0;
    }
    
    this.setData({
      tabCurrentIndex:index
    })
    //this.tabCurrentIndex = +options.state;
    //if (options.state == 0) {
    //this.loadData();
    // }


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