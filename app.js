//app.js
App({
  onLaunch: function () {
   var res = wx.getSystemInfoSync()
   console.log(res)
   if(res.platform == "ios"){
     this.globalData.isIOS = true
   }else{
     this.globalData.isIOS = false
   }
   if(res.safeArea.top > 20){
     this.globalData.isIPhoneX = true
   }else{
     this.globalData.isIPhoneX = false
   }
   this.globalData.windowH = res.windowHeight
   this.globalData.windowW = res.windowWidth
  },
  globalData: {
    userInfo: null,
    isIOS: false,
    isIPhoneX: false,
    windowH:0,
    windowW:0,
    shareImg:''
  }
})