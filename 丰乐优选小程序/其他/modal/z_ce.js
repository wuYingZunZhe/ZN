var app = getApp();
Page({
  data: {
  },
  onLoad: function () {
  },
  
  //-----------------------
  showModal: function () {
    wx.showModal({
      title: ' ',//标题(可为空或者省略)
      content: '是否删除当前数据',
      /*confirmText: '确定',
      confirmColor: '#333ccc',
      cancelText: '取消',
      cancelColor: '0f0f0f',*/
      //showCancel: false,//设置cancel是否展示
      success: function (res) {
        if (res.confirm) {
          console.log('确定')
        } else if (res.cancel) {
          console.log('取消')
        }
      }
    })
  },

  showLoading: function () {
    app.showLoading();
    app.getUserInfo();
  },
  showSuccess: function () {
    wx.showToast({
      title: '支付成功',
      mask: true,
      icon: 'success'
    })
  },
  DIYImage: function () {
    wx.showToast({
      title: '自定义logo',
      mask: true,
      image: '../../image/zy01.png',//自定义图标(优先级>icon)
      icon: 'success'
    })
  }

})