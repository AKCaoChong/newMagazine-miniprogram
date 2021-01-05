
const app = getApp()
const network = require('../../utils/network.js')
const Auth = require("../../utils/auth")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    src:"http://app.raylihome.com.cn/furniture/Public/magazine/2020-09-28/5f71b5a3c57e9.jpg",
    isShowCode:false,
    isShowShare: false,
    articleTitle:"瑞丽家居设计",
    lastIndex:0,
    pricePrivew:{previews:[
      {
        discount: "0",
        goodname: "1本",
        id: "1",
        num: "1",
        price: "6"
      },
      {
        discount: "0",
        goodname: "10本",
        id: "2",
        num: "10",
        price: "60"
      },
      {
        discount: "0",
        goodname: "100本",
        id: "3",
        num: "100",
        price: "600"
      },
      {
        discount: "0",
        goodname: "1000本",
        id: "4",
        num: "1000",
        price: "6000"
      }
    ]},
    num:'1',
    customPrice:6,
    minusStatus:'disable',
    ani:{},
    magDetail:{},
    swiperItems:[

    ],
    gmsm_ani:{},
    is_free: false,
    is_mine: false,
    showPhoneLogin: false,
    wxlogin: true,
    selAddress:null,
    hasActive: false
  },

  start: function(){
    var ani = wx.createAnimation({
      delay: 1000,
      timingFunction:'ease',
      duration:1000
    })
    ani.right(0).opacity(0.5).step()
    this.setData({
      funcRightAni: ani.export()
    })
  },

  showBottomAni:function(isshow){
    var ani = wx.createAnimation({
      delay: 0,
      timingFunction:'ease',
      duration:500
    })
    this.setData({
      bottomAni: ani.export()
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    let mag_id = ''
    let title = ''
    if (options.scene) {
      console.log('===++++++=====+++++')
     
      var scene = decodeURIComponent(options.scene);
      let arrPara = scene.split("=")
      if(arrPara[0] == 'mag_id'){
        mag_id = arrPara[1]
      }
      
      
    }else{
      mag_id = options.mag_id;
      title = options.mag_title;
    }
    
    wx.setNavigationBarTitle({
      title: title 
    })
    this.loadMagDetail(mag_id)
    this.start()
    this.setData({
      mag_id: mag_id,
      isIos: app.globalData.isIOS,
      isIosX: app.globalData.isIPhoneX,
      swiperH: app.globalData.windowH
    })
  },
  // 加载杂志详情
  loadMagDetail: function(mag_id){
    network.magDetail(mag_id).then(res => {
      console.log(res)
      if(res.code == 0){
        wx.setNavigationBarTitle({
          title: res.data.main_title 
        })
        this.setData({
          magDetail: res.data,
          swiperItems: res.data.prewview,
          is_mine: res.data.is_mine,
          is_free: res.data.is_free,
          wxqrcode: res.data.wxcodeimg
        })
       if(res.data.campaign_id){
         this.setData({
          campaign_id: res.data.campaign_id,
          hasActive: true
         })
       }
      }else{
        wx.showToast({
          title: res.message,
          icon:'none'
        })
      }
    })
  },
  

  // 激活阅读码
  activeReadCode: function(mag_id, readCode){
    network.acitivateReadCode(mag_id, readCode).then(res => {
      if(res.code == 0){
        wx.showToast({
          title: '激活成功',
          icon: 'none'
        })
      }else{

      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this
    Auth.checkHasLogined().then(res => {
      that.setData({
        wxlogin: res
      })
      if(res == true){
        that.loadMagDetail(this.data.mag_id)
      }
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    var shareObj = {
      title: '瑞丽电子刊',
      path: '/pages/home/home',
      imageUrl: app.globalData.shareImg
    }
    return shareObj;
  },
  readClick:function(){
    if(!this.data.wxlogin){
      this.onShow()
      return
    }
    if(this.data.is_free || this.data.is_mine){
      wx.navigateTo({
        url: `/pages/webpage/webpage?webUrl=${this.data.magDetail.wapurl}`,
      })
    }else{
      this.setData({
        isShowCode: true,
        animateMask: "wrapAnimate",
        codeAnimate: "frameAnimate"
      })
    }
  },
  hideMask:function(){
    this.setData({
      animateMask: "wrapAnimateOut",
      codeAnimate: "frameAnimateOut",
      shareAnimate:"frameAnimateOut"
    })
    setTimeout(() => {
      this.setData({
        isShowCode: false,
        isShowShare: false,
      })
    }, 500);
    
  },

  closeCode:function(){
    this.setData({
      animateMask: "wrapAnimateOut",
      codeAnimate: "frameAnimateOut"
    })
    setTimeout(() => {
      this.setData({
        isShowCode: false
      })
    }, 500);
  },

  closeShare: function(){
    this.setData({
      animateMask: "wrapAnimateOut",
      shareAnimate:"frameAnimateOut"
    })
    setTimeout(() => {
      this.setData({
        isShowShare: false,
      })
    }, 500);
  },

  shareClick: function(){
    this.setData({
      isShowShare: true,
      animateMask: "wrapAnimate",
      shareAnimate: "frameAnimate"
    })
  },
  collectClick: function(){
    if(!this.data.wxlogin){
      this.onShow()
      return
    }
    if(this.data.magDetail.is_collect == 1){
      //取消收藏
      network.collectCancel(this.data.mag_id).then(res => {
        if(res.code == 0){
          wx.showToast({
            title: '已取消收藏',
            icon:'none'
          })
          let magDetail = this.data.magDetail
          magDetail.is_collect = 0;
          this.setData({
            magDetail: magDetail
          })
        }else{
          wx.showToast({
            title: res.message,
            icon:'none'
          })
        }
      })  
    }else{
      network.collectMag(this.data.mag_id).then(res => {
        console.log(res)
        if(res.code == 0){
          wx.showToast({
            title: '收藏成功',
            icon:'none'
          })
          let magDetail = this.data.magDetail
          magDetail.is_collect = 1;
          this.setData({
            magDetail: magDetail
          })
        }else{
          wx.showToast({
            title: res.message,
            icon:'none'
          })
        }
      })
    }
    
    
  },

  previewPayBtn:function() {
    if(!this.data.wxlogin){
      this.onShow()
      return
    }
    var that = this;
    // var shelf = that.data.shelf;
    // if(shelf=='0'){
    //   wx.showToast({
    //     title: '此刊为免费刊不需购买',
    //     icon: 'none'
    //   })
    //   return;
    // }
    this.setData({
      animateMaskPay:"wrapAnimate",
      isShowPay: true
    })
    var animation = wx.createAnimation({
      duration: 200
    })
    animation.translateY("0%").step();
    this.setData({
      ani: animation.export()
    })
  },
  choseMoney: function(e) {
    console.log(e);
    var that = this;
    var index = e.currentTarget.dataset.index;
    var pricePrivew = that.data.pricePrivew;
    var price = pricePrivew.previews[index].price;
    var num = pricePrivew.previews[index].num;
    var typeid = pricePrivew.previews[index].id;
    that.setData({
      num: num,
      pricePrivew: pricePrivew,
      selPrice: price,
      lastIndex: index,
      customPrice: price,
      typeId: typeid
    })
  },
  /**close buyview */
  closePreview: function() {
    
    var animation = wx.createAnimation({
      duration: 200
    })
    animation.translateY("100%").step();
    this.setData({
      ani: animation.export()
    })
    this.setData({
      animateMaskPay:"wrapAnimateOut"
    })
    setTimeout(() => {
      this.setData({
        isShowPay: false
      })
    }, 500);
  },
  /**
   * 购买说明
   */
  gmsmClick: function() {
    var animation = wx.createAnimation({
      duration: 200
    })
    animation.translateY("0%").step();
    this.setData({
      gmsm_ani: animation.export()
    })
  },
  /**
   * 关闭购买说明
   */
  closePreview_gmsm: function() {
    var animation = wx.createAnimation({
      duration: 200
    })
    animation.translateY("100%").step();
    this.setData({
      gmsm_ani: animation.export()
    })
  },
  hideMaskPay: function(){
    this.closePreview()
  },
  addressSelClick: function(){
    console.log('sel address')
    wx.navigateTo({
      url: '/pages/ucenter/myAddress/myAddress?selAddress=1',
    })
  },

  /**
   * 调用登录
   */
  processLogin: function (e) {
    console.log(e)

    if (e.detail.errMsg == 'getUserInfo:fail auth deny') {
      wx.showModal({
        title: '提示',
        content: '您已拒绝授权,请点击确定后换手机号码登录或重新允许授权',
        success: function (res) { }
      })
      this.setData({
        wxlogin: true
      })
      return false;
    }
    var encrypted = encodeURI(e.detail.encryptedData);
    var iv = encodeURI(e.detail.iv);
    
    Auth.login(this, iv, encrypted)
  },

  getphonenumber: function(e){
    console.log('获取手机号')
    console.log(e)
    if (e.detail.errMsg == 'getUserInfo:fail auth deny') {
      wx.showModal({
        title: '提示',
        content: '您已拒绝授权,请点击确定后换手机号码登录或重新允许授权',
        success: function (res) { }
      })
      this.setData({
        wxlogin: true
      })
      return false;
    }
    var encrypted = encodeURI(e.detail.encryptedData);
    var iv = encodeURI(e.detail.iv);
    
    Auth.getUserPhone(this, iv, encrypted)
  },
  saveImageOnClick:function(){
    this.closeShare();
    wx.navigateTo({
      url: '/pages/createSharePoster/createSharePoster?bigUrl=' + this.data.magDetail.logo + '&erWeiMaUrl=' + this.data.wxqrcode,
    })
  },
  //画分享图
  drawShopImage () {
    var that = this;
    wx.showLoading({
      title: '绘制分享图片中',
      mask: true
    })
    this.setData({
      painting: {
        width: 375,
        height: 555,
        clear: true,
        views: [
          {
            type: 'image',
            url: 'https://newapi.xinginshijie.com/public/images/1531103986231.png',
            top: 0,
            left: 0,
            width: 375,
            height: 555
          },
          {
            type: 'image',
            url: app.globalData.userInfo.avatar,
            top: 27.5,
            left: 29,
            width: 55,
            height: 55
          },
          {
            type: 'image',
            url: 'https://newapi.xinginshijie.com/public/images/1531401349117.png',
            top: 27.5,
            left: 29,
            width: 55,
            height: 55
          },
          {
            type: 'text',
            content: '您的好友' + '【' + app.globalData.userInfo.nickname+ '】',
            fontSize: 16,
            color: '#402D16',
            textAlign: 'left',
            top: 33,
            left: 96,
            bolder: true
          },
          {
            type: 'text',
            content: '发现一件好货，邀请你一起Shopping！',
            fontSize: 15,
            color: '#563D20',
            textAlign: 'left',
            top: 59.5,
            left: 96
          },
          {
            type: 'image',
            url: that.data.goodsDetail.logo,
            top: 136,
            left: 42.5,
            width: 290,
            height: 186
          },
          {
            type: 'image',
            url: that.data.goodsDetail.qrcode,
            top: 443,
            left: 85,
            width: 68,
            height: 68
          },
          {
            type: 'text',
            content: that.data.goodsDetail.title,
            fontSize: 16,
            lineHeight: 21,
            color: '#383549',
            textAlign: 'left',
            top: 336,
            left: 44,
            width: 287,
            MaxLineNumber: 2,
            breakWord: true,
            bolder: true
          },
          {
            type: 'text',
            content: that.data.goodsDetail.introduce,
            fontSize: 13,
            color: '#E62004',
            textAlign: 'left',
            top: 387,
            left: 44.5,
            bolder: true
          },
          {
            type: 'text',
            content: '品牌' + that.data.goodsDetail.brand,
            fontSize: 13,
            color: '#7E7E8B',
            textAlign: 'left',
            top: 391,
            left: 200
           
          },
          {
            type: 'text',
            content: '长按识别图中二维码,一起来Shopping',
            fontSize: 14,
            color: '#383549',
            textAlign: 'left',
            top: 460,
            left: 165.5,
            lineHeight: 20,
            MaxLineNumber: 2,
            breakWord: true,
            width: 125
          }
        ]
      }
    })
  },
  //获取画出的图片
  eventGetImage (event) {
    console.log(event)
    wx.hideLoading()
    const { tempFilePath, errMsg } = event.detail
    if (errMsg === 'canvasdrawer:ok') {
      this.setData({
        posterImg: tempFilePath,
        showposterImg: true
      })
    }else{
      console.log(errMsg);
    }
  },

  //保存到相册
  savePosterPic() {
    const _this = this
    wx.saveImageToPhotosAlbum({
      filePath: this.data.posterImg,
      success: (res) => {
        wx.showModal({
          content: '已保存到手机相册',
          showCancel: false,
          confirmText: '知道了',
          confirmColor: '#333'
        })
      },
      complete: () => {
        _this.setData({
          showposterImg: false
        })
      },
      fail: (res) => {
        wx.showToast({
          title: res.errMsg,
          icon: 'none',
          duration: 2000
        })
      }
    })
  },
  codeInputClick: function(e){
    console.log(e)
    let code = e.detail.value
    this.setData({
      currentCode: code
    })
  },
  // 阅读码激活
  readcodeActive: function(){
    network.acitivateReadCode(this.data.mag_id,this.data.currentCode).then(res => {
      console.log(res)
      if(res.code == 0){

      }else{
        wx.showToast({
          title: res.message,
          icon: "none"
        })
      }
    })
  },
  //购买
  androidBuy: function(){
    let that = this;
    wx.showToast({
      title: '正在申请支付',
      icon: 'loading',
      duration: 60000,
      mask: 'true'
    })
    let index = that.data.lastIndex;
    let pricePrivew = that.data.pricePrivew;
    let price = pricePrivew.previews[index].price;
    let num = pricePrivew.previews[index].num;
    let typeid = pricePrivew.previews[index].id;
    let customNum = that.data.num;
    let paramNum= num;
    let paramid = null;
    if(customNum != num){
      paramNum = customNum
    }else{
      paramid = typeid;
    }
    if(paramNum >3000){
      wx.showToast({
        title: '每次最多购买3000本哦!',
        icon:'none'
      })
      return
    }
    network.getwxPayParams(this.data.mag_id,paramNum).then(res => {
      console.log(res)
      if(res.code == 0){
        wx.requestPayment({
          nonceStr: res.data.nonceStr,
          package: res.data.package,
          paySign: res.data.paySign,
          signType: res.data.signType,
          timeStamp: res.data.timeStamp,
          success: function(){
            wx.hideToast();
            that.closePreview();
            wx.showToast({
              title: '购买成功'
            })
            that.setData({
              is_mine: true
            })
            // 有活动 上报地址
            if(that.data.hasActive && that.selAddress){
              network.uploadActiveAddress(that.data.mag_id,that.data.campaign_id,that.data.selAddress.address_id,paramNum).then(res => {
                console.log(res)
              })
            }
          },
          fail: function(err){
            console.log(err);
            wx.hideToast();
            wx.showToast({
              title: '失败,请重新支付',
              icon:'none',
              duration: 2000,
              mask:true
            })
          },
          complete: function(res){

          }
        })
      }else{
        wx.showToast({
          title: res.message,
          icon:'none'
        })
      }
    })
  },
  //--
  bindMinus: function (){
    var num = this.data.num;
    if(num>1){
      num--;
    }
    var minusStatus = num>1 ? 'normal':'disable';
    var price = 6;
    if (num > 10) {
      price = num * 6;
    } else {
      price = num * 6;
    }
    this.setData({
      num: num,
      minusStatus: minusStatus,
      customPrice: price.toFixed(2),
      selPrice: price.toFixed(2)
    })
  },
  //++
  bindPlus: function(){
    var num = this.data.num;
    num++;
    var minusStatus = num > 1? 'normal' : 'disable';
    var price = 6;
    if (num > 10) {
      price = num * 6 ;
    } else {
      price = num * 6;
    }
    this.setData({
      num: num,
      minusStatus: minusStatus,
      customPrice: price.toFixed(2),
      selPrice: price.toFixed(2)
    })
  },
  //修改数量
  bindManual: function(e){
    var num = e.detail.value;
    var minusStatus = num > 1 ? 'normal' : 'disable';
    var price = 6;
    if (num>10){
      price=num*6;
    }else{
      price=num*6;
    }
    this.setData({
      num:num,
      minusStatus: minusStatus,
      customPrice: price.toFixed(2),
      selPrice: price.toFixed(2)
    })
  },


})