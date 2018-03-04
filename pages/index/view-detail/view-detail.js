import { View, star, getViewData, dateNow } from "../../../utils/util.js"
Page({
  data: {
    active: 0,
    date: [],
    ratings:{},
    viewDetail: {},
    collect:0,
    moblie:'13692950061'
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    let sid = 30;//options.sid;
    let obj = {};
    let _this = this;
    // 设置日期
    let date = dateNow();
    date[0].today = "今天";
    date[1].tomorrow = "明天";
    this.setData({
      date: date
    })
    // 接口为根据sid查寻景点详情 
    let url = "http://shop.shensigzs.com/data/view-detail.json"
    new View(url, "get").send((res) => {
      if (res.data.error_code == 0) {
        let result = res.data.result;
        for (let i = 0, len = result.length; i < len; i++) {
          if (result[i].sid == sid) {
            obj = result[i];
          }
        }

      }
      for(let i=0,len=obj.ratings.length;i<len;i++){
         let item=obj.ratings[i];
      item.stars = star(item.score);
      }
      
      _this.setData({
        viewDetail: obj,
        ratings:obj.ratings[0]
      })
    })
  },
  // tab切换
  productClick() {
    this.setData({
      active: 0
    })
  },
  detailClick() {
    this.setData({
      active: 1
    })
  },
  ratingClick() {
    this.setData({
      active: 2
    })
  },
  //收藏
  collectClick(event){
    if(event.currentTarget.dataset.c==0){
      this.setData({
        collect:1
      })
    }else{
      this.setData({
        collect:0
      })
    }
    //接口提交收藏
  },
  //拨打电话
  callClick(){
    wx.makePhoneCall({
      phoneNumber:this.data.moblie
    })
  }
})