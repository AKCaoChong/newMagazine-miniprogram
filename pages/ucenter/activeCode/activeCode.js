// pages/ucenter/activeCode/activeCode.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    mag:{},
    codeStr:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    let codeStr = options.codestr;
    let magData = JSON.parse(options.magdata);
    console.log(codeStr,magData)
    this.setData({
      mag: magData,
      codeStr: codeStr
    })
  },
  copyActiveClick: function(e){
    console.log(e)
    var that = this;
    wx.setClipboardData({
      data: that.data.codeStr,
      success: function (res) {
        wx.showModal({
          title: '提示',
          content: '复制成功',
          success: function (res) {
            if (res.confirm) {
              wx.navigateTo({
                url: `/pages/magPreview/magPreview?mag_id=${that.data.mag.magazine_id}`,
              })
            } else if (res.cancel) {
              console.log('取消')
            }
          }
        })
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

  }
})