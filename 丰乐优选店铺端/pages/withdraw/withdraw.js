Page({
  data: {
   
  },
  onLoad: function () {
   
  },
  //跳转到申请提现页面
  toApplyWithdraw() {
    wx.navigateTo({
      url: './applyWithdraw/applyWithdraw'
    })
  },
  //跳转到交易记录页面
  toTransactionRecord() {
    wx.navigateTo({
      url: './transactionRecord/transactionRecord'
    })
  },
  //跳转到到账查询页面
  toAccountQuery() {
    wx.navigateTo({
      url: './accountQuery/accountQuery'
    })
  },
  //跳转到提现记录页面
  toWithdrawRecord() {
    wx.navigateTo({
      url: './withdrawRecord/withdrawRecord'
    })
  },
  //跳转到我的提成页面
  toMyDeduct() {
    wx.navigateTo({
      url: '../deduct/deduct'
    })
  },
  //跳转到提现账户页面
  toWithdrawAccount() {
    wx.navigateTo({
      url: './withdrawAccount/withdrawAccount'
    })
  },
  
})