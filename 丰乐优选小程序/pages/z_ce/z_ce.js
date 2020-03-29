const ajax = require('../../utils/request.js')
var app = getApp();
Page({
  data: {},
  onLoad() {
    //ajax.test()
    app.getLocation();
    app.getChooseLocation();
  }
})