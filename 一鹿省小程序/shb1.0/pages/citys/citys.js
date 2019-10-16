
var amap = require('../../utils/amap-wx.js');
var util = require('../../utils/util.js');
var md5 = require('../../utils/md5.js');
var app = getApp();
var wxMarkerData = [];
Page({
  data: {
    titlename:'定位',
    searchLetter: [],
    showLetter: "",
    winHeight: 0,
    localH: true,
    cityList: [],
    isShowLetter: false,
    scrollTop: 0,//置顶高度
    scrollTopId: '',//置顶id
    city: "",
    isSelect:false,
    hotcityList: [],
    result:[],                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  
  },
  onLoad: function (option) {
    // 生命周期函数--监听页面加载
    var that = this;
    var sysInfo = wx.getSystemInfoSync();
    var winHeight = sysInfo.windowHeight;
    console.log('citys',option)

    if(option.city==''){

      app.showMind();
      wx: wx.getLocation({
        type: 'gcj02',
        altitude: true,
        success: function (res) {
          console.log(res)

          var myAmapFun = new amap.AMapWX({ key: 'd909b59416287f4eeecfd7f57d4251c4' });
          myAmapFun.getRegeo({
            location: '' + res.longitude + ',' + res.latitude + '',
            success: function (data) {

              //成功回调
              let city = data[0].regeocodeData.addressComponent.city;
              that.city = city;
              wx.hideLoading();
              that.setData({ city })
            },
            fail: function (info) {
              //失败回调
              console.log(info)
              wx.showLoading({
                title: 'myAmapFunW',
              })
            }
          })

        },
        fail: function (res) { },
        complete: function (res) { },
      })
    }else{
      let city = option.city ;
      if(option.fcity){
        city = option.fcity;
      }

      util.addHistory('nearCity', city);//加入到最近定位缓存中
     
      that.setData({ city})
    }
    // 获取缓存城市列表
    let localDataCur = wx.getStorageSync('localDataCur') || [];

    if (localDataCur.length==0){
      that.getlocalDataCur('list_city', winHeight)
     
    }else{
      that.setlocalDataCur(winHeight, localDataCur);
    }

  },
  getLocal: function () {
    let that = this;
    var local = wx.getStorageSync('local') || {};
    wx.showModal({
      title: '提示',
      content: '是否重新定位当前城市',
      success(r){
        if (r.confirm) {
          app.showLoading();
          wx: wx.getLocation({
            type: 'gcj02',
            altitude: true,
            success: function (res) {
              console.log(res, 47)
              if (res.longitude) {
                let longitude = res.longitude;
                let latitude = res.latitude;
                console.log(local, 477777)
                local.longitude = longitude;
                local.latitude = latitude;
                wx.setStorageSync('local', local)
                var myAmapFun = new amap.AMapWX({ key: 'd909b59416287f4eeecfd7f57d4251c4' });

                myAmapFun.getRegeo({
                  location: '' + longitude + ',' + latitude + '',
                  success: function (data) {
                    console.log(data, 53)
                    //成功回调
                    if (data.length > 0) {
                      wx.hideLoading();
                      let city = data[0].regeocodeData.addressComponent.city;
                      let store_area = data[0].regeocodeData.addressComponent.district;
                      let store_street = data[0].regeocodeData.addressComponent.streetNumber.street + data[0].regeocodeData.addressComponent.streetNumber.number;
                      let re = new RegExp("市");
                      city = city.replace(re, "");
                      let cityInfos = wx.getStorageSync('cityInfos') || {};
                      that.setData({
                        city
                      })

                      that.backHome(city, '', 0)
                      local.city = city;
                      wx.setStorageSync('local', local);
                    }
                  },
                  fail: function (info) {
                    //失败回调

                  }
                })
              }

            },
            fail: function (res) {
              console.log(res, 65)
              //判断是否获得了用户地理位置授权
              wx.getSetting({
                success: (res) => {
                  if (!res.authSetting['scope.userLocation'])
                    that.openConfirm()
                }
              })

            },
            complete: function (res) { },
          })
        } else if(r.confirm){
          console.log(111)
        }
      }
    })

  },
  getlocalDataCur: function (urlName, winHeight){
    var that=this;
    var timestamp = Date.parse(new Date());
    var val = 'fanbuyhainan' + timestamp.toString();
    var process = md5.hexMD5(val);
    let city ='';
    if (that.data.isSelect) {
      city=that.value;
    }else{
      city =that.city || that.data.city;
    }

    let re = new RegExp("市");
    city = city.replace(re, "");
    wx.request({
      url: app.globalData.url + "/api/mini_homepage/" + urlName,
      method: "POST",
      data: {
        request_object: app.globalData.request_object,
        process,
        timestamp,
        city,
      },
      success: function (res) {
        console.log(res, res.data.status);
        //  请求到数据 存在本地
        if (res.data.status == 1) {
          let data = res.data.data;
          if (urlName == 'list_city') {
            if (winHeight) {
              wx.hideLoading();
              that.setlocalDataCur(winHeight, data);
            }else{

            }
          } else if (urlName =='list_area'){
            that.setData({
              nextLocal: res.data.data
            })
          }
        } else {
          wx.showToast({
            title: '数据加载失败请稍后重试',
          })
        }
      },
      fail() {
        app.showMind();
      }
    })
  },
  setlocalDataCur: function (winHeight, data) {
    // console.log(data.list_letter,103)
    var that = this;
    var searchLetter = [];
    var tempObj = [];
    let itemH = data.list_letter.length;

    for (var i = 0; i < itemH; i++) {
      var temp = {};
      temp.name = data.list_letter[i].letter;
      temp.tHeight = i * itemH;
      temp.bHeight = (i + 1) * itemH;
      tempObj.push(temp)
    }
    console.log(data, data.list_hot, itemH, winHeight, data.is_show,218)
    that.getAreaData(data, that.value);
    let is_show = data.is_show;
    
    wx.setStorageSync('localDataCur', data);
    that.setData({
      cityList: data.list_letter,
      itemH,
      hotcityList: data.list_hot,
      searchLetter: tempObj,
      winHeight: winHeight,
      is_show:1
    })
  },
  // 切换区县
  changeLocal:function(){
    let that=this;
    let localH = this.data.localH;
    if (localH) {
      that.getlocalDataCur('list_area')
    }
    localH = !localH;
    this.setData({
      localH
    })

  },
  inputup: function (e) {
    this.value = e.detail.value;

  },
  select: function () {
    let selectCity = this.value;
    let isSelect=false
    let localDataCur = wx.getStorageSync('localDataCur') || [];
    console.log(selectCity,localDataCur)

    if (selectCity ){
      isSelect = true;
      if (localDataCur.length == 0) {
        this.getlocalDataCur('list_city', this.data.winHeight);
      }else{
        this.getAreaData(localDataCur, selectCity);
      }
    }else{
      wx.showToast({
        title: '该城市暂未开通服务！',
      })
      isSelect=false;
    }
    this.setData({ isSelect})
  },
  getAreaData: function (localDataCur, selectCity){
    var that=this;
    let tempList = [];
    let arr = []
    for (let i = 0; i < localDataCur.list_letter.length; i++) {

      for (let j = 0; j < localDataCur.list_letter[i].list_city.length; j++) {

        tempList.push(localDataCur.list_letter[i].list_city[j].city)
      }
    }
    for (let i = 0; i < tempList.length; i++) {
      if (tempList[i].indexOf(selectCity) >= 0) {
        arr.push(tempList[i])
      }
    }
    console.log(arr)
    this.setData({
      result: arr
    })
  },
  onReady: function () {
    // 生命周期函数--监听页面初次渲染完成

  },
  onShow: function () {
    // 生命周期函数--监听页面显示
    let nearCity = wx.getStorageSync('nearCity') || [];
    console.log(222, nearCity.length != 0, nearCity)
    
    if(nearCity.length !=0){
      this.setData({
        nearCity
      })
    }

  },
  onHide: function () {
    // 生命周期函数--监听页面隐藏

  },
  onUnload: function () {
    // 生命周期函数--监听页面卸载

  },
  onPullDownRefresh: function () {
    // 页面相关事件处理函数--监听用户下拉动作

  },
  onReachBottom: function () {
    // 页面上拉触底事件的处理函数

  },
  clickLetter: function (e) {
    console.log(e.currentTarget.dataset.letter)
    var showLetter = e.currentTarget.dataset.letter;
    this.setData({
      showLetter: showLetter,
      isShowLetter: true,
      scrollTopId: showLetter,
    })
    var that = this;
    setTimeout(function () {
      that.setData({
        isShowLetter: false
      })
    }, 1000)
  },
  //选择城市
  bindCity: function (e) {
    console.log("bindCity")
    let city = e.currentTarget.dataset.city;
    let area =e.currentTarget.dataset.area;
    let isarea = e.currentTarget.dataset.isarea
    this.backHome(city, area, isarea)
  },
  backHome(city, area, isarea){
    let cityInfos = {};
    cityInfos['city'] = city
    cityInfos['area'] = area

    cityInfos['isarea'] = isarea
    let pages = getCurrentPages(); //获取当前页面js里面的pages里的所有信息。
    let prevPage = pages[pages.length - 2];
    let curCity = city;
    cityInfos['status'] = 1

    if (cityInfos['isarea'] == '1') {
      cityInfos['status'] = 2;
      curCity = cityInfos['area'];
    }
    
    app.globalData.citystatus=2;
    util.addHistory('nearCity', city);// 加入最近搜索的城市
    wx.setStorageSync('cityInfos', cityInfos)
    prevPage.setData({ curCity, status: cityInfos['status'], fcity: city })



    wx.navigateBack({

      delta: 1  // 返回上一级页面。


    })
  },
  //点击热门城市回到顶部
  hotCity: function () {
    this.setData({
      scrollTop: 0,
    })
  },
 
})