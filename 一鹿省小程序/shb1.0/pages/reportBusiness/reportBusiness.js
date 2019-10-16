var app = getApp();
var util = require('../../utils/util.js');
var md5 = require('../../utils/md5.js');
var timestamp = 0;

var store_id = '';
var user_id = '';
var currentid = 0;
var textcontent = '';
var contentCount = '';
var imgList = Object;
var newImgs = Array();
Page({
  data: {
    titlename: '举报商家',
        store_logo: '',
        store_name: '',
        images: [],
        selectall: [{
            type: 1,
            title: "商家资质问题",
        }, {
            title: "商品价格问题",
            type: 2,
        }, {
            title: "商家地址问题",
            type: 3,
        }, {
            title: "其他问题",
            type: 4,
        }],
        currentid: 0,
    },
    submit: function(e) {
        var _this = this
        var id = e.currentTarget.dataset.id;
        //设置当前样式
        _this.setData({
            'currentid': id
        })
        currentid = id;
    },

    // 图片操作的具体函数
    ImageOperator() {

      const imageList = this.data.images;
      // 原来的图片数量
      let imageLenght = imageList.length;
      if (imageLenght == 2) {
        wx.showModal({
          title: '提示',
          content: "数量已经有2张，请删除在添加...",
        })
        return;
      }
      // 当前的图片数量
        wx.chooseImage({
            count: 2,
            sizeType: ['original', 'compressed'],
            sourceType: ['album', 'camera'],
            success: res => {
              // 上传的图片数据
              const imgList = res.tempFilePaths;
                // 原始的图片数据
              // console.log(imageLenght);
              let nowLenght = imgList.length;

                
                if (imageLenght < 2) {
                    let images = [];
                    // 获取缺少的图片张数
                    let residue = 2 - imageLenght;
                    // 如果缺少的张数大于当前的的张数  
                    if (residue >= nowLenght) {
                        // 直接将两个数组合并为一个  
                        images = imageList.concat(imgList);
                    } else {
                        // 否则截取当前的数组一部分  
                        images = imageList.concat(imgList.slice(0, residue));
                    }
                    this.setData({
                        images
                    })
                }
                // images.push(JSON.stringify(imgList))
                for (var i = 0; i < imgList.length; i++) {
                    newImgs.push(imgList[i])
                }
            }

        })

    },
    // 图片获取
    chooseImage() {
        if (this.data.images.length == 0) {
            wx.showToast({
                title: '最多只能上传2张图片!',
                icon: 'none',
                duration: 2000,
                success: res => {
                    this.ImageOperator()
                }
            })
        } else {
            this.ImageOperator()
        }

    },
    // 删除图片
    deleteImage(event) {
        //获取数据绑定的data-id的数据
        const nowIndex = event.currentTarget.dataset.id;
        let images = this.data.images;
        images.splice(nowIndex, 1);
        this.setData({
            images
        })
    },
    // 预览图片
    previewIamge(event) {
        const nowIndex = event.currentTarget.dataset.id;
        const images = this.data.images;
        wx.previewImage({
            current: images[nowIndex], //当前预览的图片
            urls: images, //所有要预览的图片
        })
    },
    // 内容操作
    handleContentInput(event) {
        let textareaValue = event.detail.value;
        let contentCount = textareaValue.length;
        textcontent = textareaValue;
    },
    // 表单提交事件
    submitClick: function(e) {
        var that = this
        console.log("textcontent:", textcontent)
        console.log("images:", newImgs)
        console.log("currentid:", currentid)
        if (currentid == 0) {
            wx.showToast({
                title: '请选择举报类型',
                icon: 'none'
            })
      }
      let globalKey = wx.getStorageSync('globalKey');
      var store_id = app.globalData.store_id || wx.getStorageSync('store_info').store_id;
      let token = app.globalData.token || globalKey.token
      timestamp = Date.parse(new Date())
      var val = 'fanbuyhainan' + timestamp.toString() + token;
      var hexMD5 = md5.hexMD5(val);
        wx.request({
            url: app.globalData.url+'/api/store_detail/insert_report',
          data: {
            request_object: app.globalData.request_object,
            user_id: user_id || globalKey.user_id,
                store_id,
                token,
                type: currentid,
                pics: newImgs,
                content: textcontent,
                timestamp: timestamp,
              process: hexMD5
            },
            method: 'POST',
            header: {
                'Content-Type': "application/x-www-form-urlencoded"
            }, // 设置请求的 header
            success: function(res) {
                console.log(res.data)
               if(res.data.status==1){
                   wx.showToast({
                       title: '提交成功',
                    //    icon: 'none',
                    //    duration: 2000,
                       success: function(res){
                         wx.navigateBack({
                            url: '/pages/storeDetails/storeDetails?store_id=' + store_id,
                              //如果已经评价成功了的话就把评论按钮隐藏
                          })
                        }
                   })
               }else{
                   wx.showToast({
                       title: '参数有误',
                          icon: 'none',
                          duration: 2000,
                   })
                   wx.showToast({
                       title: '提交失败,稍后再试',
                       icon: 'none',
                       duration: 5000,
                       success:res=>{
                           wx.navigateBack({
                             url: '/pages/storeDetails/storeDetails?store_id=' + store_id,
                           })
                       }
                   })
               }

            },
            fail: function() {
              // fail
              app.showMind();

            },
            complete: function() {
                // complete
            }
        })

    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
      store_id = options.store_id;
      let store_info = wx.getStorageSync('store_info')
        this.setData({
          store_name: store_info.store_name,
          store_logo: store_info.store_logo,
        })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {

    },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (res) {
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
})