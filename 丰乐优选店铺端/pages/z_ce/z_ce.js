Page({
  data: {
    array: ['美国', '中国', '巴西', '日本'],
    
    pickerIndex: 0,//
   
  },
  //
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      pickerIndex: e.detail.value
    })
  },
  
})