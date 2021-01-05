const network = require('../../../utils/network')
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    user:{
      
    },
    magazineList:[
      
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let windowW = 750;
    let magBoxW = (windowW-70)/2;
    let magImgH = magBoxW * 1.28;
    let magBoxH = magImgH + 120;
    console.log(magBoxW,magBoxH,magImgH)
    this.setData({
      magBoxH: magBoxH,
      magBoxW:magBoxW,
      magImgH: magImgH
    })
    this.loadMyCollect()
    let name = wx.getStorageSync('nickname')
    let headimg = wx.getStorageSync('avatar')
    this.setData({
      user:{
        head: headimg,
        name: name
      }
    })
  },  
  // 加载我的收藏列表
  loadMyCollect(){
    network.myCollectList().then(res => {
      console.log(res)
      if(res.code == 0){
        this.setData({
          magazineList: res.data
        })
      }else{
        if(res.code = 407){
          wx.showToast({
            title: '没有数据',
            icon: 'none'
          })
        }else{
          wx.showToast({
            title: res.message,
            icon: 'none'
          })
        }
        
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
  magazineClick: function(e){
    console.log(e);
    let magid = e.detail.currentTarget.dataset.magazine_id;
    let title = e.detail.currentTarget.dataset.main_title
    wx.navigateTo({
      url: `/pages/magPreview/magPreview?mag_id=${magid}&mag_title=${title}`,
    })
  }
})