const network = require('../../../utils/network.js')
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    user:{
      
    },
    magazineList:[
      
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.loadMyMagazine()
    let name = wx.getStorageSync('nickname')
    let headimg = wx.getStorageSync('avatar')
    this.setData({
      user:{
        head: headimg,
        name: name
      }
    })
  },
  // 我的期刊接口
  loadMyMagazine: function(){
    network.myMagList().then(res => {
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
  // 点击阅读码
  readCodeTap: function(e){
    console.log(e)
    let mag_id = e.detail.currentTarget.dataset.magid;
    let mag = e.detail.currentTarget.dataset.mag;
    let magData = JSON.stringify(mag)
    wx.navigateTo({
      url: `/pages/ucenter/myReadCode/myReadCode?mag=${magData}`,
    })
  }
})