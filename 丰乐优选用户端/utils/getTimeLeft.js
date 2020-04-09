//getTimeLeft.js

//取倒计时（天时分秒）
function getTimeLeft(datetimeTo) {
  // 计算目标与现在时间差（毫秒）
  let time1 = new Date(datetimeTo).getTime();
  let time2 = new Date().getTime();
  let mss = time1 - time2;
  // 将时间差（毫秒）格式为：天时分秒
  let days = parseInt(mss / (1000 * 60 * 60 * 24));
  days = this.zeroFill('' + days, 2);
  let hours = parseInt((mss % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  hours = this.zeroFill('' + hours, 2);
  let minutes = parseInt((mss % (1000 * 60 * 60)) / (1000 * 60));
  minutes = this.zeroFill('' + minutes, 2);
  let seconds = parseInt((mss % (1000 * 60)) / 1000);
  seconds = this.zeroFill('' + seconds, 2);
  return days + " : " + hours + " : " + minutes + " : " + seconds 
}
//补零方法，str为数字字符串 n为需要的位数，不够补零
function zeroFill(str, n){
  if (str.length < n) {
    str = '0' + str
  }
  return str
}

module.exports = {
  getTimeLeft: getTimeLeft,
  zeroFill: zeroFill,
}