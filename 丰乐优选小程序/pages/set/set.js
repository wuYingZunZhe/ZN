// pages/z_ce/new/new.js
var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    isLogin: true,
  },
  /*
  //获取位置信息
  getLocation: function () {
    app.getLocation();
  },
 
  //获取用户信息
  getUserInfo:function(){
    let that=this;
    wx.getSetting({//判断授权
      success(res) {
        if (res.authSetting['scope.userInfo']){//已授权
          wx.getUserInfo({//获取用户信息
            success: function (res) {
              console.log('用户信息',res)
            }
          })
        }else{
          that.toSetting();//前往授权
        }
      }
    })
  },
  
  //授权面板
  toSetting:function() {
    wx.showModal({
      title: '提示',
      content: '需要先授权,是否前往授权？',
      success(res) {
        if (res.confirm) {//用户点击确定
          console.log('用户点击确定')
          wx.openSetting({
            success: (res) => {
              console.log('授权成功：',res)
            },
            fail: function (fres) {
              console.log('授权失败：',fres)
            }
          })
        } else if (res.cancel) {//用户点击取消
          console.log('用户点击取消')
        }
      }
    })    
  },

*/

//打开授权页面
  openSet:function(){
    wx.openSetting({
      success: (res) => {
        console.log('授权成功：', res)
      },
      fail: function (fres) {
        console.log('授权失败：', fres)
      }
    })  
  },
 
  //退出登陆
  quit: function () {
    console.log('退出登陆');
    this.setData({
      isLogin: false,
    })
  },
  //授权登陆
  login: function () {
    console.log('授权登陆')
    this.setData({
      isLogin: true,
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //app.getLocation();
    //app.getChooseLocation();
    //app.getUserInfo();
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