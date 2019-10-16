var app = getApp();
var md5 = require('../../utils/md5.js');
var util = require('../../utils/util.js');
var timestamp = Date.parse(new Date());

var key = 0;

var check = '';

var successUp = 0; //成功个数
var failUp = 0; //失败个数
var uploadImg='';
var user_id='';
var order_id='';
var store_id='';
Page({
  data: {
    titlename: '评价',
    redBack:1,
    isDes:5,
    contentCount:0,
    images: [],
    tags:[],
    textareaValue:'',
    is_anonymous:0, 
    onOff:1,
  },
  onLoad: function (options) {
    store_id = options.store_id;
    order_id = options.order_id;
    let globalKey = wx.getStorageSync('globalKey');
    user_id = globalKey.user_id;
    console.log(globalKey)

    this.setData({
      store_id, order_id,
      store_name: options.store_name, store_logo: options.store_logo
    })
    let urlStar = 'list_score_evaluate';
    let urlTags = 'list_evaluate_tag';
    this.getTagData(urlStar,1);
    this.getTagData(urlTags,2);
  },
  getTagData(url,num){
    let gram = util.returnGram();
    var globalKey = wx.getStorageSync('globalKey');
    let that = this;
    wx.request({
      url: app.globalData.url + '/api/store_order/' + url,
      data: {
        user_id: globalKey.user_id,
        order_id: that.data.order_id,
        store_id: that.data.store_id,
        request_object: app.globalData.request_object,
        timestamp: gram.timestamp,
        process: gram.process,
        token: gram.token,
      },
      method: 'POST',
      header: {
        'Content-Type': "application/x-www-form-urlencoded"
      },
      success: function (res) {
        console.log(res,'eva56')
        if (res.data.status == 1) {
          let tags = '';
          if (num == 1) {
            that.setData({
              stars: res.data.data
            })
          }
          if(num==2){
            tags = res.data.data
            for (var k in tags) {
              tags[k]['ischoice'] = false
            }
            that.setData({
              tags
            })
          }
        } else {
          wx.showToast({
            title: '数据获取失败，请重试',
            icon: 'none',
            duration: 2000,
          })
        }
      },
      fail: function () {
        wx.showToast({
          title: '服务器响应失败',
          icon: 'none',
          duration: 2000,
        })
      }
    })
  },
  upload() {
    let that=this;
    var tempFilePaths = this.data.images; //总共个数
    var length = tempFilePaths.length;
    let gram=util.returnGram();
    for (let i = 0; i <length; i++) {
      wx.uploadFile({
        url: app.globalData.url + '/api/store_order/upload_image',
        filePath: tempFilePaths[i],
        name: 'pics',
        header: {
          "Content-Type": "multipart/form-data"
        },
        formData: {
          request_object:app.globalData.request_object,
          pics: tempFilePaths[0],
          user_id:user_id,
          id: order_id,
          type:'evaluate',
          timestamp:gram.timestamp,
          process: gram.process,
          token: gram.token,

        },
        success: function (res) {
          console.log(res)
        },
        complete(res){
          console.log(res,i,length)
         
        }
      })
    }
   
  },
  sentData(e){

    let onOff = e.currentTarget.dataset.onOff;
    if (onOff == 2) {
      return false;
    }
    this.setData({
      onOff: 2
    })
    var globalKey = wx.getStorageSync('globalKey');
    let gram = util.returnGram();
    let that = this;
    let tags = that.data.tags;
    let temp = '';
    let temp1 = '';
    for (var k in tags) {
      if (tags[k].ischoice) {
        temp +=tags[k].tag_name +','
      } else {
        temp1 += tags[k].tag_name + ','
      }
    }
    console.log(temp1, temp)
    
    wx.request({
      url: app.globalData.url + '/api/store_order/insert_user_evaluate',
      method:'post',
      data: {
        order_id: that.data.order_id,
        user_id: globalKey.user_id,
        store_id: that.data.store_id,
        request_object: app.globalData.request_object,
        timestamp: gram.timestamp,
        process: gram.process,
        token: gram.token,
        score: that.data.isDes || 5,
        tags: temp || temp1,
        pics: uploadImg,
        content: that.data.textareaValue || '系统默认好评',
        is_anonymous: that.data.is_anonymous || 0,
      },
      success: function (res) {
        var data = res.data;
        wx.showToast({
          title: '评价成功，感谢您的评价',
        })
        that.navigateback();

        that.upload();
      },
      fail(){

        app.showMind();
      }
    })
    
  },
  // 是否匿名
  anonymous(e){
    let is_anonymous = this.data.is_anonymous;
    if(is_anonymous==0){
      is_anonymous=1
    }else{
      is_anonymous = 0
    }
    
    this.setData({
      is_anonymous
    })
  },
  selectStar(e) {
    console.log(e,'touchend')
    let index=e.target.dataset.index;
    this.setData({
      isDes:index
    })
  },
  choice(e){
    let index = e.target.dataset.index;
    let tags=this.data.tags;
    tags[index].ischoice = !tags[index].ischoice;
    console.log(tags,index)
    this.setData({
      tags
    })
  },
  select(event) {
    let index = event.target.dataset.index
    this.data.selectall[index].isSelect = !this.data.selectall[index].isSelect;
    this.setData({
        selectall: this.data.selectall
    })
  },
  navigateback(){
    let pages = getCurrentPages(); //获取当前页面js里面的pages里的所有信息。
    let prevPage = pages[pages.length - 2];  
    prevPage.setData({ isActive:3, })
    wx.navigateBack({
      delta: 1  // 返回上一级页面。
    })
  },
  // 内容操作
  handleContentInput(e) {
    let textareaValue = e.detail.value;
    let contentCount = textareaValue.length;
    this.setData({
      contentCount: contentCount,
       textareaValue
    })
  },
 
  // 图片操作的具体函数
ImageOperator() {
  let that=this;
  wx.chooseImage({
      count: 3,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: res => {
        console.log(103333, res)
          
        const imgList = res.tempFilePaths;// 上传的图片数据
          
        const imageList = that.data.images;// 原始的图片数据
          
        let imageLenght = imageList.length;// 原来的图片数量
          
        let nowLenght = imgList.length;// 当前的图片数量
        
        if (imageLenght == 3) {
          wx.showToast({
            title: "数量已经有3张，请删除在添加...",
          })
        }
        if (imageLenght < 3) {
          // console.log(11999)
          let images = [];
          // 获取缺少的图片张数
          let residue = 3 - imageLenght;
          // 如果缺少的张数大于当前的的张数  
          if (residue >= nowLenght) {
              // 直接将两个数组合并为一个  
              images = imageList.concat(imgList);
          } else {
              // 否则截取当前的数组一部分  
              images = imageList.concat(imgList.slice(0, residue));
          }

          that.setData({
            images
          })
          
        }
      }
    })

  },
  
  // 图片获取
  chooseImage() {
    let that=this;
    if (this.data.images.length == 0) {
        wx.showToast({
            title: '只能选中图片上传!',
            icon: 'none',
            duration: 2000,
            success: res => {
              that.ImageOperator()
            }
        })
    } else {
      that.ImageOperator()
    }

  },
  // 删除图片
  deleteImage(event) {
    console.log(event)
      //获取数据绑定的data-id的数据
    const nowIndex = event.currentTarget.dataset.index;
      let images = this.data.images;
      images.splice(nowIndex, 1);
      this.setData({
          images
      })
  },
  // 预览图片
  previewIamge(event) {
    const nowIndex = event.currentTarget.dataset.index;
    const images = this.data.images;
    wx.previewImage({
        current: images[nowIndex],  //当前预览的图片
        urls: images,  //所有要预览的图片
    })
  },


/**
 * 用户点击右上角分享
 */
onShareAppMessage: function (res) {
  let store_info = wx.getStorageSync('store_info');
  let title = '我在一鹿省边省边赚，你也快来吧！';
  let that = this;
  if (res.from === 'menu') {
    console.log(res)
  }
  return {
    title,
    imageUrl: '/images/5.png',
    path: 'pages/orderOrPayment/orderOrPayment?store_id=' + store_info.store_id + '&store_name=' + store_info.store_name,
    success: function (res) {

    }
  }

  },
})
