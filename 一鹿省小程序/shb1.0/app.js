//app.js
var md5 = require('./utils/md5.js');
var amap = require('./utils/amap-wx.js');
var util = require('./utils/util.js');
var timestamp = Date.parse(new Date());
var val = 'fanbuyhainan' + timestamp.toString();
var hexMD5 = md5.hexMD5(val);
App({
  onLaunch: function (option) {
    console.log('onLaunch', option)
    let me = this;
    this.autoUpdate();
    me.querykey(option);
    // let str = 'cD5v76XuKGs6AHCFKhttps://exbuyJtptJ+EFQ==.dourwcIbfCH7qhR7RZlPzhD/Tpz5HK9pLtLii9DZU77r10AJBvNue06vXxjzt3e8qi6dI//ble.com.cn/h5/register_user.php?parameter=3xpDB0RPbUmGditkGyF7DNJ5l1MzpayEP1E/WYce6eX5Tl0aB3YvTGGO';
    // console.log(str.length,1444444)
    // me.checkOpenid();
  },
  checkOpenid() {//判断session_key是否过期
    let me = this;
    let flag = true
    return new Promise((resolve)=>{
      var globalKey = wx.getStorageSync('globalKey');
      console.log(globalKey,20000)
      if (util.praseStrEmpty(globalKey.newopenid1)!='') {
        wx.checkSession({
          success() {
            resolve(flag)
          },
          fail() {
            me.getOpenId(resolve);
          }
        })
      } else {
        me.getOpenId(resolve);
      }
    })
  },
  
  querykey(option) {
    let queryKey = {};
    var query = option.query; // 参数二维码传递过来的场景参数
    var scene = decodeURIComponent(option.scene)//参数二维码传递过来的参数
    var sceneInfo = this.sceneInfo(option.scene)
    this.globalData.sceneInfo = sceneInfo;
    this.globalData.query = query;

    queryKey.sceneInfo = sceneInfo;
    queryKey.query = query;
    console.log(38888, queryKey, this.globalData.query)
    wx.setStorageSync('queryKey', queryKey);
  },
  onHide(e) {
    console.log(e, 'onReady')
  },
  onShow: function (option) {
    console.log('onShow', option)

    this.querykey(option);

  },
  onshare() {
    let title = '我在一鹿省边省边赚，你也快来吧！';
    let that = this;
    if (res.from === 'menu') {
      console.log(res)
    }
    return {
      title,
      imageUrl: '/images/5.png',
      path: 'pages/home/index',
      success: function (res) {
        console.log(res)

      }
    }
  },
  // 获取滚动条当前位置
  onPageScroll: function (scrollTop, that) {
    let floorstatus = false;
    if (scrollTop > 100) {
      floorstatus = true
    }
    that.setData({
      floorstatus
    });
  },
  //回到顶部
  toTop: function (e) {  // 一键回到顶部
    wx.pageScrollTo({
      scrollTop: 0,
      duration: 400
    });

  },
  getKey(url){//解码扫码出来的链接
    let obj=new Object();
    if (url.indexOf('?') !=-1){
      let str = url.split('?')[1].split('=');
      obj[str[0]] = str[1]
    }
    return obj
  },
  getquery(qry, g, i) {//判断扫码参数
    let e = this;
    let url = '';
    var q='';
    i = i || 2;
    e.showLoading()
    console.log(qry,999)
    if (qry.hasOwnProperty("q")) {
      console.log("has scene");
      var q = decodeURIComponent(qry.q);
      if(q.indexOf('?')!=-1){
        e.newQ(q,i)
      } else {
        url = 'get_table_info';
        e.globalData.scene = 4;
        e.request(url, q, 4, i);
      }
    } else if (qry.hasOwnProperty("parameter")) {
      console.log("has scene");
      var q = decodeURIComponent(qry.parameter);
      if (q.indexOf('?') != -1) {
        e.newQ(q, i)
      }else{
        url = 'into_store';
        e.globalData.scene = 3;
        e.request(url, q, 3, i);
      }
    } else {
      console.log("no scene");
      wx.hideLoading();
      e.globalData.scene = e.globalData.sceneInfo[3]  || 1;
      if (g.hasOwnProperty("newuser1") || e.globalData.newuser1 == 1 || i == 1) {
        wx.switchTab({
          url: '/pages/home/index',
        })
      }

    }
    
  },
  newQ(q,i){//判断扫出来的是链接后解码参数
    let e=this;
    let newQ = e.getKey(q);
    let url='';
    if (newQ.hasOwnProperty("q")) {
      url = 'get_table_info';
      e.globalData.scene = 4;
      e.request(url, newQ.q, 4, i);

    } else if (newQ.hasOwnProperty("parameter")) {
      url = 'into_store';
      e.globalData.scene = 3;
      e.request(url, newQ.parameter, 3, i);
      console.log(1000001, newQ)
    }
  },
  request(url, q, scene, t) {//将扫码出来的参数传递到后台
    console.log(q,15555)
    let app = this;
    wx.request({
      url: app.globalData.url + '/api/nearby/' + url,
      data: {
        q,
        parameter:q,
        process: hexMD5,
      },
      method: 'POST',
      success(res) {
        console.log(res.data.data, res)
        if (res.data.status == 1) {
          console.log(res.data.data, '11666666666')
          let store_info = wx.getStorageSync('store_info') || {};
          let table_number = '';
          let store_id = res.data.data.store_id;
          if (res.data.data.hasOwnProperty('table_number')) {
            table_number = res.data.data.table_number
          }

          app.globalData.scene = scene;
          store_info.table_number = table_number;
          store_info.store_id_new = store_id;
          app.globalData.store_id_new = store_id;
          store_info.scene = scene;
          wx.setStorageSync('store_info', store_info);

          let globalKey = wx.getStorageSync('globalKey');
          console.log(util.praseStrEmpty(globalKey) != '', 130, util.praseStrEmpty(globalKey) ,app.globalData.newuser1 == 1)
          if (util.praseStrEmpty(globalKey.newuser1) != '' || app.globalData.newuser1==1 || t == 1) {
            wx.redirectTo({
              url: '/pages/orderOrPayment/orderOrPayment?store_id_new=' + store_id + '&table_number=' + table_number + "&scene=" + scene,
            })
          }
          wx.hideLoading();
        } else {
          wx.hideLoading();
          let globalKey = wx.getStorageSync('globalKey');
          console.log(util.praseStrEmpty(globalKey) != '', 130, util.praseStrEmpty(globalKey))
          if (util.praseStrEmpty(globalKey.newuser1) != '' || app.globalData.newuser1 == 1  || t == 1) {
            wx.switchTab({
              url: '/pages/home/index',
            })
          }
          wx.showToast({
            icon:'none',
            title: res.data.message,
          })
        }
      }, fail() {
        wx.hideLoading();
        wx.showModal({
          title: '提示',
          content: '请求超时，请重试或直接搜索店铺进入',
          success(res) {
            if (res.confirm) {
              app.request(app.q);
            } else if (res.cancel) {
              wx.switchTab({
                url: '/pages/home/index',
              })

            }
          }
        })
      }
    })
  },
  process() { return hexMD5 = md5.hexMD5(val); },
  showMind() {
    wx.hideLoading()
    wx.showToast({
      title: '加载超时',
      duration: 1000,
      icon: 'loading'
    })
  },

  getPhoneNumber: function (e, that, num) {//获取手机号
    var globalKey = wx.getStorageSync('globalKey');

    var userinfo = wx.getStorageSync('userInfoKey') || that.data.userinfo;
    var app = this;
    app.showLoading();
    let session_key = app.globalData.session_key || globalKey.session_key;
    console.log(session_key,e, 'session_key')
    if (e.detail.errMsg == 'getPhoneNumber:fail user deny') {//拒绝授权
      wx.hideLoading()
      app.showText('您若不授权将无法下单哦', that);       
      that.setData({
        isPhone: true,
        isshowModal: true,
      })
    } else if (e.detail.errMsg == "getPhoneNumber:ok"){//同意授权
      let gram = util.returnGram();
      wx.request({
        url: app.globalData.url + '/api/mini_program/get_phone_number',
        data: {
          request_object: app.globalData.request_object,
          encryptedData: e.detail.encryptedData,
          iv: e.detail.iv,
          session_key,
          timestamp: gram.timestamp,
          process: gram.process,
        },
        method: 'POST',
        success: function (res) {
          console.log(res, 225, 'phone', globalKey, res.data.data.phoneNumber)
          if (res.data.status == 1) {
            let phoneNumber = res.data.data.phoneNumber;
            globalKey.user_phone = phoneNumber;
            globalKey.countryCode = res.data.data.countryCode;
            wx.setStorageSync('globalKey', globalKey);
            that.mobile = phoneNumber;
            let isUser = true;
            let isshowModal = false
            if (num != 2) {
              isshowModal = true
            }

            that.mobile = phoneNumber;
            wx.hideLoading()
            that.setData({
              hasPhone: true, isUser,
              isPhone: false, isshowModal
            });

          } else {
            wx.showModal({
              title: '提示',
              content: '授权失败，请重新授权',
              success(res){
                if(res.confirm){
                  wx.hideLoading();
                  // if (app.globalData.canIUseP){
                    
                  // }
                } else if (res.cancel) {
                  wx.hideLoading();
                }
              }
            })
            
             
          }

        },
        fail() {

          app.showMind();
        }
      })
    }else{
      wx.hideLoading()
      app.showText('网络加载失败，请稍后重试哦', that);
      that.setData({
        isPhone: true,
        isshowModal: true,
      })
    }

  },
  showLoading: function (e) {
    wx.showLoading({
      title: '加载中',
      mask: true
    })
  },
  getUserInfo: function (e, that, num) {//获取用户信息
    let app = this;
    let globalKey = wx.getStorageSync('globalKey');
    let store_info = wx.getStorageSync('store_info');
    let userInfoKey = wx.getStorageSync('userInfoKey') || [];

    let mobile = that.mobile || globalKey.user_phone;
    console.log(mobile,3255555)
    let scene = util.praseStrEmpty(app.globalData.scene) != '' ? app.globalData.scene : store_info.scene
    // console.log(app.globalData,238)
    this.showLoading()

     
    console.log('327getUserInfo', app.globalData.canIUse, e)
    if (app.globalData.canIUse) {
      if (e.detail.errMsg == "getUserInfo:ok") {//授权
        console.log('329getUserInfo',e)
        util.login(e.detail.userInfo, mobile, that, num, app, scene);
        that.setData({
          logosrc: e.detail.userInfo.avatarUrl, userInfo:e.detail.userInfo
        })
      } else if (e.detail.errMsg == "getUserInfo:fail auth deny"){//拒绝授权
        console.log('拒绝授权个人信息')
        app.showText('您若不登录将无法使用小程序部分功能哦', that);       
      }else{
        wx.hideLoading()
        app.showText('网络加载失败，请稍后重试哦', that);
        that.setData({
          isUser: true,
          isshowModal: true,
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success(res) {
          console.log("获取用户信息成功", res, 171)
          if ('getUserInfo:ok' == res.errMsg) {
            console.log(scene, 2600000, num)
            util.login(res.userInfo, mobile, that, num, app, scene);
            that.setData({
              logosrc: res.userInfo.avatarUrl, userInfo: res.userInfo
            })
          }
          if (app.userInfoReadyCallback) {
            app.userInfoReadyCallback(res)
          }
        },
        fail(res) {
          console.log("获取用户信息失败", res)
          wx.showModal({
            title: '请授权',
            content: '为了让您更好的体验点单服务，请授权！！！',
          })
          wx.hideLoading()
        }
      })
    }
   

  },
  showText(content,that){
    wx.hideLoading()
    wx.showModal({
      title: '提示',
      content: content,
      mask: true,
      success(res) {
        that.setData({          
          isshowModal: true,
        }) 
      }
    })
  },
  onPageNotFound(res) {
    wx.switchTab({
      url: '/pages/home/index'
    }) 
  },
  getOpenId(resolve) {//获取openid和session_key
    let me = this;
    wx.login({
      success: function (res) {
        console.log(200, res.code)
        if (res.code) {
          //发起网络请求
          wx.request({
            url: me.globalData.url + '/api/mini_program/get_openid',
            data: {
              request_object: me.globalData.request_object,
              timestamp,
              process: hexMD5,
              code: res.code,

            },
            method: 'POST',
            success: function (openIdRes) {
              // 判断openId是否获取成功
              console.log('openId', openIdRes)
              if (openIdRes.data.status == '1') {
                me.globalData.newopenid1 = openIdRes.data.data.openid;
                me.globalData.session_key = openIdRes.data.data.session_key;
                me.globalData.user_phone = openIdRes.data.data.mobile;
                // me.globalData.user_phone = '';
                let globalKey = {} || wx.getStorageSync('globalKey');
                globalKey.session_key = openIdRes.data.data.session_key;
                globalKey.newopenid1 = openIdRes.data.data.openid;
                globalKey.user_phone = openIdRes.data.data.mobile || globalKey.user_phone;
                // globalKey.user_phone = '';

                wx.setStorageSync('globalKey', globalKey);
                
                resolve(globalKey.user_phone)
              } else {
                wx.showModal({
                  title: '提示',
                  content: '数据加载失败，请检查您的网络后重新进入小程序',
                  success(res) {
                    if (res.confirm) {
                    } else if (res.cancel) {
                    }
                  }
                })
                
                resolve()
              }

            },
            fail() {
              wx.showModal({
                title: '提示',
                content: '数据加载失败，请检查您的网络后重新进入小程序',
                success(res){
                  if(res.confirm){
                  } else if(res.cancel){
                  }
                }
              })
            }
          })
        } else {
          console.log('获取用户登录态失败！' + res.errMsg)
        }
      }
    });
  },


  //场景值判断
  sceneInfo: function (s) {
    var scene = [];
    switch (s) {
      case 1001:
        console.log(s, 1001)
        scene.push(s, "发现栏小程序主入口", false, 1);
        break;
      case 1005:
        console.log(s, 1005)
        scene.push(s, "顶部搜索框的搜索结果页", false, 1);
        break;
      case 1006:
        console.log(s, 1006)
        scene.push(s, "发现栏小程序主入口搜索框的搜索结果页", false, 1);
        break;
      case 1007:
        console.log(s, 1007)
        scene.push(s, "单人聊天会话中的小程序消息卡片", true, 2);
        break;
      case 1008:
        console.log(s, 1008)
        scene.push(s, "群聊会话中的小程序消息卡片", true, 2);
        break;
      case 1011:
        console.log(s, 1011)
        scene.push(s, "扫描二维码", true, 4);
        break;
      case 1012:
        scene.push(s, "长按图片识别二维码", true, 4);
        break;
      case 1014:
        scene.push(s, "手机相册选取二维码", true, 4);
        break;
      case 1017:
        scene.push(s, "前往体验版的入口页", false, 4);
        break;
      case 1019:
        scene.push(s, "微信钱包", false, 1);
        break;
      case 1020:
        scene.push(s, "公众号profile页相关小程序列表", true, 1);
        break;
      case 1022:
        scene.push(s, "聊天顶部置顶小程序入口", false, 1);
        break;
      case 1023:
        scene.push(s, "安卓系统桌面图标", false, 1);
        break;
      case 1024:
        scene.push(s, "小程序profile页", false, 1);
        break;
      case 1025:
        scene.push(s, "扫描一维码", false, 1);
        break;
      case 1026:
        scene.push(s, "附近小程序列表", false, 1);
        break;
      case 1027:
        scene.push(s, "顶部搜索框搜索结果页“使用过的小程序”列表", false, 1);
        break;
      case 1028:
        scene.push(s, "我的卡包", false, 1);
        break;
      case 1029:
        scene.push(s, "卡券详情页", false, 1);
        break;
      case 1031:
        scene.push(s, "长按图片识别一维码", false, 1);
        break;
      case 1032:
        scene.push(s, "手机相册选取一维码", false, 1);
        break;
      case 1034:
        scene.push(s, "微信支付完成页", false, 1);
        break;
      case 1035:
        scene.push(s, "公众号自定义菜单", false, 1);
        break;
      case 1036:
        scene.push(s, "App分享消息卡片", false, 1);
        break;
      case 1037:
        scene.push(s, "小程序打开小程序", false, 1);
        break;
      case 1038:
        scene.push(s, "从另一个小程序返回", true, 1);
        break;
      case 1039:
        scene.push(s, "摇电视", false, 1);
        break;
      case 1042:
        scene.push(s, "添加好友搜索框的搜索结果页", false, 1);
        break;
      case 1044:
        scene.push(s, "带shareTicket的小程序消息卡片", false, 1);
        break;
      case 1047:
        scene.push(s, "扫描小程序码", true, 1);
        break;
      case 1048:
        scene.push(s, "长按图片识别小程序码", true, 1);
        break;
      case 1049:
        scene.push(s, "手机相册选取小程序码", true, 1);
        break;
      case 1052:
        scene.push(s, "卡券的适用门店列表", false, 1);
        break;
      case 1053:
        scene.push(s, "搜一搜的结果页", false, 1);
        break;
      case 1054:
        scene.push(s, "顶部搜索框小程序快捷入口", false, 1);
        break;
      case 1056:
        scene.push(s, "音乐播放器菜单", false, 1);
        break;
      case 1058:
        scene.push(s, "公众号文章", true, 1);
        break;
      case 1059:
        scene.push(s, "体验版小程序绑定邀请页", false, 1);
        break;
      case 1064:
        scene.push(s, "微信连Wifi状态栏", false, 1);
        break;
      case 1067:
        scene.push(s, "公众号文章广告", true, 1);
        break;
      case 1068:
        scene.push(s, "附近小程序列表广告", true, 1);
        break;
      case 1072:
        scene.push(s, "二维码收款页面", true, 3);
        break;
      case 1073:
        scene.push(s, "客服消息列表下发的小程序消息卡片", true, 1);
        break;
      case 1074:
        scene.push(s, "公众号会话下发的小程序消息卡片", true, 1);
        break;
      case 1089:
        scene.push(s, "微信聊天主界面下拉", false, 1);
        break;
      case 1090:
        scene.push(s, "长按小程序右上角菜单唤出最近使用历史", 1);
        break;
      case 1092:
        scene.push(s, "城市服务入口", false, 1);
        break;
      default:
        scene.push("未知入口", 1);
        break;
    }
    return scene;
  },
  autoUpdate: function () {
    console.log(new Date(), 646)
    var self = this
    if (wx.canIUse('getUpdateManager')) {
      const updateManager = wx.getUpdateManager()
      updateManager.onCheckForUpdate(function (res) {
        if (res.hasUpdate) {
          updateManager.onUpdateReady(function () {
            console.log(new Date(), 646)
            updateManager.applyUpdate()
            /* wx.showModal({
              title: '更新提示',
              content: '新版本已经准备好，是否重启应用？',
              success: function (res) {
                if (res.confirm) {
                  updateManager.applyUpdate()
                } else if (res.cancel) {
                  wx.showModal({
                    title: '温馨提示~',
                    content: '本次版本更新涉及到新的功能添加，旧版本无法正常访问的哦~',
                    success: function (res) {
                      self.autoUpdate()
                      return; 
                      if (res.confirm) {
                        updateManager.applyUpdate()
                      } else if (res.cancel) {
                        self.autoUpdate()
                      }
                    }
                  })
                }
              }
            })*/
          })
          updateManager.onUpdateFailed(function () {
            wx.showModal({
              title: '已经有新版本了哟~',
              content: '新版本已经上线啦~，请您删除当前小程序，重新搜索打开哟~',
            })
          })
        }
      })
    } else {
      wx.showModal({
        title: '提示',
        content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
      })
    }
  },
  globalData: {
    canIUseP: wx.canIUse('button.open-type.getPhoneNumber'),
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    openNum: 1,
    userInfo: '',
    store_info: {},
    store_name: '',
    store_logo: '',
    orderList: {},
    orderCost: 0,
    store_id: '',
    goods_id: '',
    user_id: '',
    account_money: '',
    service_money: '',
    save_money: '',
    no_discount_price: '',
    activity_goods: [],
    discount_goods: [],
    store_score: '',
    order_id: '',
    store_address: '',
    actual_money: '',
    user_phone: '',
    newopenid1:'',
    store_info: {},
    citystatus:1,
    request_object: 'mini_program',
    url: 'https://exbuy.double.com.cn'
    // url:'http://103.27.7.20'
  }
})