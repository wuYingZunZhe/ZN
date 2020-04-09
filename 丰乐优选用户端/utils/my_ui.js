export default{
  //模态窗
  showModal: function (content, title = '', confirmText = '确定', cancelText = '取消', showCancel = true) {
    wx.showModal({
      title: title,//标题(可为空或者省略)
      content: '是否删除当前数据',
      confirmText: confirmText,
      //confirmColor: '#333',
      cancelText: cancelText,
      //cancelColor: '0f0f0f',
      showCancel: showCancel,//设置cancel是否展示
      success: function (res) {
        if (res.confirm) {
          console.log('确定')
          return true;
        } else if (res.cancel) {
          console.log('取消')
          return false;
        }
      }
    })
  }
}