var app = getApp();
Page({
  data: {
    currentDate: "2017年05月03日",
    dayList: '',
    currentDayList: '',
    currentObj: '',
    currentDay: '',
    DateNow: '',
    shwoRowText: [false, false, false, false, false, false],
    bintapItme: '100',//这个常量是随便写的，用于取消点击
    lastBinTapRow: '10',//这个常量是随便写的，用于记录上一次点击的是第几行
    dataList: [{ name: '￥398' },
    { name: ' ￥398' },
    { name: ' ￥398' },
    { name: ' ￥398' },
    { name: ' ￥198' },
    { name: ' ￥398' },
    { name: ' ￥398' },
    { name: ' ￥98' },
    { name: '' },
    { name: ' ￥398' }
    ]
  },
  onLoad: function (options) {
    this.getDay();
    var currentObj = this.getCurrentDayString()
    this.setData({
      currentDate: currentObj.getFullYear() + '年' + (currentObj.getMonth() + 1) + '月' + currentObj.getDate() + '日',
      currentDay: currentObj.getDate(),
      currentObj: currentObj,
      DateNow: currentObj.getFullYear() + '年' + (currentObj.getMonth() + 1) + '月' + currentObj.getDate() + '日'
    })
    console.log('currentDate=' + this.data.currentDate + ' DateNow ' + this.data.DateNow)
    this.setSchedule(currentObj)
  },
  doDay: function (e) {
    var that = this
    var currentObj = that.data.currentObj
    var Y = currentObj.getFullYear();
    var m = currentObj.getMonth() + 1;
    var d = currentObj.getDate();
    var str = ''
    if (e.currentTarget.dataset.key == 'left') {
      m -= 1
      if (m <= 0) {
        str = (Y - 1) + '/' + 12 + '/' + d
      } else {
        str = Y + '/' + m + '/' + d
      }
    } else {
      m += 1
      if (m <= 12) {
        str = Y + '/' + m + '/' + d
      } else {
        str = (Y + 1) + '/' + 1 + '/' + d
      }
    }
    currentObj = new Date(str)
    this.setData({
      currentDate: currentObj.getFullYear() + '年' + (currentObj.getMonth() + 1) + '月' + currentObj.getDate() + '日',
      currentObj: currentObj,
      shwoRowText: [false, false, false, false, false, false],
      bintapItme: '100'

    })
    console.log('年' + that.data.currentDate + 'DateNow ' + this.data.DateNow)
    currentObj = new Date(str)
    this.setSchedule(currentObj);
  },
  getCurrentDayString: function () {
    var objDate = this.data.currentObj
    if (objDate != '') {
      return objDate
    } else {
      var c_obj = new Date()
      var a = c_obj.getFullYear() + '/' + (c_obj.getMonth() + 1) + '/' + c_obj.getDate()
      return new Date(a)
    }
  },
  setSchedule: function (currentObj) {
    var that = this
    var m = currentObj.getMonth() + 1
    var Y = currentObj.getFullYear()
    var d = currentObj.getDate();
    var dayString = Y + '/' + m + '/' + currentObj.getDate()
    var currentDayNum = new Date(Y, m, 0).getDate()
    var currentDayWeek = currentObj.getUTCDay() + 1
    var result = currentDayWeek - (d % 7 - 1);
    var firstKey = result <= 0 ? 7 + result : result;
    var currentDayList = []
    var f = 0
    console.log('currentObj===' + currentObj)


    for (var i = 0; i < 42; i++) {
      let data = []
      if (i < firstKey - 1) {
        currentDayList[i] = ''
      } else {
        if (f < currentDayNum) {
          currentDayList[i] = f + 1
          f = currentDayList[i]
        } else if (f >= currentDayNum) {
          currentDayList[i] = ''
        }
      }
    }
    that.setData({
      currentDayList: currentDayList
    })
  },
  getDay: function () {//获取是周几
    var d = new Date();
    var weekday = new Array(7);
    var current = d.getDay()
    console.log('当前是周几' + current)
    return current;
  },
  selectDay: function (event) {//点击日期
    var that = this
    var row = event.currentTarget.dataset.idxrow
    var colum = event.currentTarget.dataset.idxcolum
    var select

    if (that.data.lastBinTapRow == '10') {//第一次点击
      console.log('第一次点击')
      select = row * 7 + colum
      that.data.shwoRowText[row] = true
    } else {
      console.log('非第一次点击')

      if (row == that.data.lastBinTapRow) {
        console.log('同一行点击')
        if ((row * 7 + colum) == that.data.bintapItme) {
          console.log('同一行点击同一个')
          if (that.data.shwoRowText[row]) {//如果是已经选择
            select = '100'
            that.setData({
              shwoRowText: [false, false, false, false, false, false],
            })
          } else {//如果未选择
            select = row * 7 + colum
            that.data.shwoRowText[row] = true
          }

        } else {
          select = row * 7 + colum
          console.log('同一行点击不同一个')
          that.data.shwoRowText[row] = true
        }

      } else {
        console.log('不在同一行')
        that.setData({
          shwoRowText: [false, false, false, false, false, false],
        })
        select = row * 7 + colum
        that.data.shwoRowText[row] = true

      }
    }
    var shwoRowText = that.data.shwoRowText
    console.log('select' + select)
    that.setData({
      shwoRowText: shwoRowText,
      bintapItme: select,
      lastBinTapRow: row
    })
  },
  nodoAnything: function () {//不做任何处理

  }
})  