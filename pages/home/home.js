const network = require('../../utils/network.js')
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    camption:null,
    recommend:{
      
    },
    magazineList:[
      
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let windowW = 750;
    let magBoxW = (windowW-40)/3 + 10;
    let magImgH = magBoxW * 1.38;
    let magBoxH = magImgH + 120;
    console.log(magBoxW,magBoxH,magImgH)
    this.setData({
      magBoxH: magBoxH,
      magBoxW:magBoxW,
      magImgH: magImgH
    })
    this.loadCampaign()
    this.loadMagData()
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
  // 加载首页活动数据
  loadCampaign: function(){
    network.homeCampaign().then(res => {
      console.log(res)
      if(res.code == 0){
        this.setData({
          camption: res.data
        })
        
      }
    })
  },
  // 加载首页刊数据
  loadMagData: function(){
    network.homeMagList().then(res => {
      console.log(res)
      if(res.code == 0){
        app.globalData.shareImg = res.data.focus.logo
        this.setData({
          recommend: res.data.focus,
          magazineList: res.data.top
        })
      }
    })
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
  magazineReadClick:function(e){
    console.log(e);
    let magid = e.currentTarget.dataset.magazineid;
    let title = e.currentTarget.dataset.main_title;
    wx.navigateTo({
      url: `/pages/magPreview/magPreview?mag_id=${magid}&mag_title=${title}`,
    })
  },
  // 点击了某本杂志
  magazineClick: function(e){
    console.log(e);
    let magid = e.detail.currentTarget.dataset.magazine_id;
    let title = e.detail.currentTarget.dataset.main_title
    wx.navigateTo({
      url: `/pages/magPreview/magPreview?mag_id=${magid}&mag_title=${title}`,
    })
  },
  // 去明星电子刊小程序 
  goOtherMiniPro: function(e){
    wx.navigateToMiniProgram({
      appId: "wx5dc3f339b8477675",
      path:"/pages/index/index",
      envVersion:"release",
      success(res){

      },
      fail:function(err){
        console.log(err)
      }
    })
  },
  camptionClick: function(e){
    wx.navigateTo({
      url: `/pages/webpage/webpage?webUrl=${this.data.camption.campaign_url}`,
    })
  }
})