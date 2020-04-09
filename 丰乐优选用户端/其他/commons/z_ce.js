const app = getApp()

Page({
  data: {

  },
  onLoad: function () {
  },
  /**
   * 获取公共顶部菜单的高度
   * @param {object} e 
   */
  commonNavAttr(e) {
    console.log(e);
    console.log('852')
    if (e.detail) {
      this.setData({
        commonNavAttr: e.detail
      })
    }
  },
})
