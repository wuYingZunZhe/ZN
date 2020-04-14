//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    chooseLocation:'',
    active:false,
    formData:{
      phone:'',
      code:'',
      name:'',
      idCard:'',
      company:'',
      legalPerson:'',
      applyProduct:'',
      area:'',
      referee:'',
      binRemarks:'',
      addTime:'',

    },
    formComplete: true, 
  },
  phone:function(e){
    this.setData({
      ['formData.phone']: e.detail.value
    })
     this.check();
  },
  code: function (e) {
    this.setData({
      ['formData.code']: e.detail.value
    })
    this.check();
  },
  name: function (e) {
    this.setData({
      ['formData.name']: e.detail.value
    })
    this.check();
  },
  idCard: function (e) {
    this.setData({
      ['formData.idCard']: e.detail.value
    })
    this.check();
  },
  company: function (e) {
    this.setData({
      ['formData.company']: e.detail.value
    })
    this.check();
  },
  legalPerson: function (e) {
    this.setData({
      ['formData.legalPerson']: e.detail.value
    })
    this.check();
  },
  applyProduct: function (e) {
    this.setData({
      ['formData.applyProduct']: e.detail.value
    })
    this.check();
  },
  // area: function (e) {
  //   this.setData({
  //     ['formData.area']: e.detail.value
  //   })
  //   this.check();
  // },
  referee: function (e) {
    this.setData({
      ['formData.referee']: e.detail.value
    })
    this.check();
  },
  binRemarks: function (e) {
    this.setData({
      ['formData.binRemarks']: e.detail.value
    })
    this.check();
  },
  addTime: function (e) {
    this.setData({
      ['formData.addTime']: e.detail.value
    })
    this.check();
  },
  binPhone:function(e){
    let that=this;
    if (e.detail.value == '') {
      wx.showToast({
        title: '请填写手机号',
        icon: 'none',
        duration: 2000
      })
      return
    } else {
      if (!(/^1[34578]\d{9}$/.test(e.detail.value))) {
        wx.showToast({
          title: '手机号有误',
          icon: 'none',
          duration: 2000
        })
        return
      }else{
        that.setData({
          ['formData.phone']: e.detail.value
        })
      }
    }
  },


  chooseLocation: function () {
    let that = this;
    wx.chooseLocation({
      success: function (res) {
        console.log(res)
        that.setData({
          ['formData.area']: res
        })
      },
      fail: function () {
        app.getChooseLocation();
      }
    })
  },
  formSubmit: function (e) {
    let that = this;
    let timestamp = Date.parse(new Date());
    timestamp = timestamp / 1000;
    let n = timestamp * 1000;
    let date = new Date(n); 
    let Y = date.getFullYear();
    let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
    let D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate(); 
    let h = date.getHours();
    let m = date.getMinutes();
    let s = date.getSeconds();
    let addTime = Y + "年" + M + "月" + D + "日" + " " + h + ":" + m + ":" + s;
    that.setData({
      ['formData.addTime']: addTime
    })
    console.log(e.detail.value); 
      let postData = that.data.formData;
    console.log('data:', postData, '01', that.data.formData, '02', that.data.formData.phone)
      wx.request({
        url: app.globalData.baseUrl + "/wechat/api/providerapply/addProvider" + that.data.formData.phone,
        header: {
          'Content-Type': 'application/json'
        },
        method: 'POST',
        data: postData,
        success: function (res) {
          console.log(res)
          if (res.data.msg.code == 200) {
           console.log(res)
          }
        },
        fail:function(err){
          console.log(err)
        }
      })
    



    
    
  },
  
  check:function(){
    let that=this;
    if (that.data.formData.phone != '' && that.data.formData.code != '' && that.data.formData.name != '' && that.data.formData.idCard != '' && that.data.formData.company != '' && that.data.formData.legalPerson != '' && that.data.formData.applyProduct != '' && that.data.formData.area != '' && that.data.formData.referee != '' && that.data.formData.binRemarks != '' && that.data.formData.addTime != '' ) {
      that.setData({
        formComplete:true,
      })
    } else {
      that.setData({
        formComplete: false,
      })
    }
  },
  zeroFill:function (str, n){
    if(str.length <n) {
      str = '0' + str
    }
  return str
  },
  sendMsg: function () {
    let that = this;
    wx.request({
      url: app.globalData.baseUrl + "/wechat/store/api/sendSMS/" + '18888888888',
      header: {
        'Content-Type': 'application/json'
      },
      method: 'POST',
      success: function (res) {
        console.log(res)
      },
      fail:function(err){
        console.log(err)
      }
    })
  },
  
  onLoad: function () {
    
  },
  
})
