//index.js
//获取应用实例

var app = getApp();
var util = require('../../utils/util.js');
var amap = require('../../utils/amap-wx.js');
var md5 = require('../../utils/md5.js');
var time=1000;
let homedata=[];
Page({
  data: {
    titlename:'一鹿省',
    url:app.globalData.url,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    currentSwiper:0,
    curCity:'',//当前城市
    weather:'',
    fcity:'',
    page:1,
    isshowModal:false,
    isAdd:true,
    stores:[],
    topNum:0,
    hide: false,
    status: 0,
    isMask:true,
    isShowCate:false,
    logosrc: '../../images/logo.png',
    isUser: false,
    isPhone: false,
    // closeadvert: false,
    // closeH: 96,
    closeadvert: true,
    closeH: 60,
    isCityMask:false,//是否获取城市定位
  },
  /*轮播图单击事件*/
  slideShow:function(e){
    //console.log(e.currentTarget.dataset.id)
    /*第一张图片*/
    if (e.currentTarget.dataset.id==0){
      console.log('789');
      wx.navigateTo({
        url: '../APP/APP'
      })
    }
  },
  onLoad: function (options) {

  },
  closeadvert(){
    this.setData({
      closeadvert:true,
      closeH:60,
    })
  },
  getPhoneNumber: function (e) {
    let that = this;
    app.getPhoneNumber(e, that, 4);
  },

  getUserInfo: function (e) {
    let that = this;
    app.getUserInfo(e, that, 4)
  },
  returnTap(){return false},
  // 获取地址
  getLocal: function (){
    let that = this;
    // app.showLoading();
    var localCur = wx.getStorageSync('localCur') || {};
    wx: wx.getLocation({
      type: 'gcj02',
      altitude: true,
      success: function (res) {
        console.log(res, 47)
        if (res.errMsg == "getLocation:ok"){
          let longitude = res.longitude;
          let latitude = res.latitude;
          localCur.longitude = longitude;
          localCur.latitude = latitude;
          console.log(localCur, 477777)
          wx.setStorageSync('localCur', localCur);
          that.setData({
            isCityMask: false
          })
          var myAmapFun = new amap.AMapWX({ key: 'd909b59416287f4eeecfd7f57d4251c4' });
          myAmapFun.getRegeo({
            location: '' + longitude + ',' +latitude + '',
            success: function (data) {
              console.log(data,53)
              //成功回调
              if (data.length>0){

                let city = data[0].regeocodeData.addressComponent.city;
                let store_area = data[0].regeocodeData.addressComponent.district;
                let store_street = data[0].regeocodeData.addressComponent.streetNumber.street + data[0].regeocodeData.addressComponent.streetNumber.number;
                let re = new RegExp("市");
                city = city.replace(re, "");
                localCur.city = city;
                wx.setStorageSync('localCur', localCur);
                let cityInfos = wx.getStorageSync('cityInfos') || {};
                console.log(cityInfos, cityInfos.hasOwnProperty("city") && cityInfos.city != city)
                if (cityInfos.hasOwnProperty("city") && cityInfos.city != city || util.praseStrEmpty(cityInfos.store_area)!=''){
                  wx.showModal({
                    title: '提示',
                    content: '您当前所在位置已发生变化，是否切换到当前所在位置？',
                    mask:true,
                    success(res){
                      if (res.confirm) {
                        cityInfos={};
                        wx.setStorageSync('cityInfos', cityInfos)
                        that.setData({
                          store_area:'', city, status:1
                        })
                        that.getHomedata(city, localCur.longitude, localCur.latitude);

                      }else if(res.cancel){
                        
                        let city = cityInfos.city;
                        if (cityInfos.area){
                          city = cityInfos.area
                        }
                        
                        that.getHomedata(city, localCur.longitude, localCur.latitude);
                      }
                    }
                  })
                }else{
                  
                  let status = 1
                  
                  that.setData({
                    status
                  })
                  that.getHomedata(city, localCur.longitude, localCur.latitude);
                 
                }
                localCur.city = city;
                console.log(localCur, 477777)
                wx.setStorageSync('localCur', localCur);
              }
            },
            fail: function (info) {
              //失败回调
              
            }
          })
        } else {
          console.log(res, 64)
          // that.showMnew()
          that.isCityMask2()
        }

      },
      fail: function (res) {
        console.log(res, 65)
        //判断是否获得了用户地理位置授权
        
        if (res.errMsg == "getLocation:fail auth deny") {
          that.isCityMask3();
        } else if (res.errMsg == "getLocation:fail authorize no response"){
          that.isCityMask4=true;
          that.isCityMask3();
        } else {
          that.isCityMask2()
        }
        
        },
      complete: function (res) { },
    })
    
  },
  isCityMask2() {
    this.setData({
      isCityMask: true,
      isCityMask1: 2,
      text1: '请检查您的网络是否正常或者手机系统定位是否有打开',
    })
  },
  isCityMask3(){
    let that=this;
    this.setData({
      isCityMask: true,
      isCityMask1: 3,
      text1: '检测到您没打开一鹿省的定位权限，是否去设置打开？',
    })
    if (that.isCityMask4) {
      wx.openSetting({
        success: (res) => {
          console.log(res, 103)
          if (!res.authSetting['scope.userLocation']) {
            that.isCityMask3();
          } else {
            that.getLocal();
          }
        },
        fail(res) {
          console.log(103)
          that.isCityMask3();
        }
      }) 

    }
  },
  showMnew(){
    let that=this;
    that.setData({
      isCityMask: true,
      isCityMask1: 2,
      text1: '如果您不授权定位，将无法体验到大部分小程序功能哦',
    })
   
  },
  handleSetting(e){    
    
    if (!e.detail.authSetting['scope.userLocation']) {  
      this.isCityMask3();
    } else {
      this.getLocal();   
      this.setData({
        isCityMask: false
      })      
    }

   
  },
 

  swiperChange: function (e) {
    console.log(205, e)
    if (e.detail.source=='touch'){

      this.setData({
        swiperCurrent: e.detail.current
      })
    }
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (res) {

    app.onshare()

  },
  changeCity: function () {
    console.log('changeCity', this.data.status)
    let url ='';
    if(this.data.status==2){
      url = '../citys/citys?city='+ this.data.curCity+'&fcity='+this.data.fcity
    }else{
      url = '../citys/citys?city=' + this.data.curCity
    }
    console.log(url)
    wx.navigateTo({
      url,
    })
  },
  onShow:function(){
    let that = this;
    let cityInfos = wx.getStorageSync('cityInfos') || {};
    let localCur = wx.getStorageSync('localCur') || {};
    let userInfo = wx.getStorageSync('userInfoKey') || {};
   
    wx.getSystemInfo({
      success: function (res) {
        console.log(res)
        that.setData({
          contentH: res.screenHeight, nomoreL: 2
        })
      },
    })

    app.checkOpenid().then((res) => {
      console.log(res, 'homeindex')     
      util.showModal(that, app, 'home');
    }) 
    if (app.globalData.citystatus ==1){

      if (!localCur.hasOwnProperty('longitude') && util.praseStrEmpty(localCur.longitude) != 'undefined' ) {       
        this.setData({
          isCityMask:true,
          text1: '我们的小程序需要确定您的城市',
          isCityMask1:1,
        })
      } else if (util.praseStrEmpty(cityInfos.city) != ''){
        this.getLocal();
      } else {

        this.getHomedata(localCur.city, localCur.longitude, localCur.latitude, '');
      }
    }else{
      if (util.praseStrEmpty(cityInfos.city) != '') {
        let curCity = cityInfos['city'];
        if (cityInfos['isarea'] == '1') {
          curCity = cityInfos['area'];
        }
        this.setData({
          status: cityInfos['status'], fcity: cityInfos['city'], curCity, stores: [], store_area: '', store_street: '', isAdd: true, page: 1
        })
        console.log(localCur, 212)
        app.toTop();
        app.globalData.citystatus == 1;
        this.getHomedata(curCity, localCur.longitude, localCur.latitude, '');
      }
    }

    console.log(localCur, util.praseStrEmpty(localCur.longitude),183)

    
    
   
   
    
  },
  

  showModal() {
    let me = this;
    util.showModal(me, app);
  },
  // 返回参数
  returnGram() {
    var timestamp = Date.parse(new Date());
    var val = 'fanbuyhainan' + timestamp.toString();
    var process = md5.hexMD5(val);
    let gram = [{
      timestamp,
      val,
      process
    }]
    return gram[0]
  },
  // 获取数据
  getHomedata: function (curCity, longitude, latitude) {
    console.log('longitude', curCity, longitude, latitude)
    let that = this;
    let gram = this.returnGram();
    let store_city = curCity;
    let store_area = '';
    if(that.data.status==2){
      store_area = curCity;
      store_city =that.data.fcity
      console.log(that.data.fcity, 'fcity', curCity)
    }
    wx.request({
      url: app.globalData.url + '/api/mini_homepage/get_home_info',
      method: "POST",
      data: {
        store_city,
        store_area  ,
        latitude,
        longitude,
        timestamp: gram.timestamp,
        process: gram.process,
        request_object: 'mini_program',
      },
      success: function (res) {
        console.log('index', res.data, 128, store_area)
        var data = res.data;
        if (typeof data === 'string') {
          data = JSON.parse(data.trim());
        }
        if (data.status == '1') {
          let homedata = data.data;
          wx.hideLoading();
          homedata.curCity = curCity;
          homedata.longitude = longitude;
          homedata.latitude = latitude;

          that.setHomeData(homedata, longitude, latitude, store_area, store_city);
        }
      },
      fail(){

        app.showMind();
      }
    })
  },
  // 渲染数据
  setHomeData: function (homedata, longitude, latitude, store_area, curCity){
    let that=this;
    let list_ad = homedata.list_ad;
    let weather = homedata.weather;
    
    let totalcategory = homedata.list_category;
    let list_headlines = homedata.list_headlines;
    let list_store_choice = homedata.list_store_choice;
    let list_store_save = homedata.list_store_save;
    console.log(that.data.fcity, store_area)
    list_ad = util.addUrl(list_ad,'ad_pic');
    totalcategory = util.addUrl(totalcategory, 'category_pic');
    let list_category = totalcategory.slice(0,5);
    let list_category_second = totalcategory.slice(5,10);

    list_store_choice = util.addUrl(list_store_choice,'store_logo');
    list_store_save = util.addUrl(list_store_save, 'store_logo');
    let isShowCate=false;
    if (homedata.is_show==1){
      isShowCate = true
    }
    that.setData({
      list_ad,
      list_category,
      list_headlines,
      list_store_choice,
      list_category_second,
      list_store_save,
      longitude,
      latitude,
      curCity,
      store_area,
      weather,
      isMask:false,
      isShowCate
    })
  },
  
 
  getMoreData: function (page){
    let that=this;
    console.log(that.data.latitude, 'that.data.latitude', page, that.data.status)
    let gram = this.returnGram();
    let store_area = that.data.store_area || '';
    let store_city = that.data.curCity ;
    if (that.data.status==2){
      store_city=that.data.fcity;
    }
    
    wx.request({
      url: app.globalData.url + '/api/mini_homepage/list_store_more',
      method: "POST",
      data: {
        store_city,
        latitude: that.data.latitude,
        longitude: that.data.longitude,
        page,
        store_area,
        timestamp: gram.timestamp,
        process: gram.process,
        request_object: 'mini_program',
        limit: 5,
      },
      success: function (res) {
        console.log('moredata', res.data)
        if (res.data.status == '1') {
          let newData = res.data.data

          let stores=that.data.stores;


          if (newData.length > 0) {
            newData = util.addUrl(newData, 'store_logo');
            if(page==1){
              stores = newData
            }else{
              for(let i=0;i<newData.length;i++){
                stores.push(newData[i])
              }
            }
            that.data.isAdd=true
            that.setData({
              stores,
              page,
              nomoreL: 2
            })
          }else{
            wx.showToast({
              title: '到底了哦！',
            })
            that.setData({
              nomoreL: 1
            })
          }
          
        }
      },
      fail(){

        app.showMind();
      }
    })
  },
  //监听屏幕滚动 判断上下滚动
  onReachBottom(ev) {
    // contentScroll: function (ev) {
    console.log(ev, this.data.isAdd);
    let that = this;
    if (that.data.isAdd) {
      that.data.isAdd = false;
      that.data.page++;
      console.log(that.data.city, that.data.curCity, '|| that.data.curCity')
      that.getMoreData(that.data.page);

    }


  },
  // 获取滚动条当前位置
  onPageScroll: function (e) {
    
    app.onPageScroll(e.scrollTop, this)
  },
  toTop(){
    app.toTop();
  }

})
