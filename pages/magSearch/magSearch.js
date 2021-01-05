const network = require('../../utils/network.js')
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tags:[
      
    ],
    currentTagItem:0,
    magazineList:[
      
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.loadSearchTags()
  },
  // 加载搜索tag
  loadSearchTags: function(){
    network.searchMagTag().then(res => {
      if(res.code == 0){
        console.log(res)
        this.setData({
          tags: res.data
        })
      }else{
        wx.showToast({
          title: res.message,
          icon:'none'
        })
      }
    })
  },

  //搜索
  searchText: function(key){
    network.searchMag(key).then(res => {
      if(res.code == 0){
        console.log(res)
        this.setData({
          magazineList: res.data
        })
      }else{
        if(res.code == "407"){
          wx.showToast({
            title: "没有数据",
            icon: 'none'
          })
        }
        wx.showToast({
          title: res.message,
          icon: 'none'
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
    var shareObj = {
      title: '瑞丽电子刊',
      path: '/pages/home/home',
      imageUrl: app.globalData.shareImg
    }
    return shareObj;
  },

  // 搜索
  searchOnInput: function(e){
    let searchText = e.detail.value
    this.setData({
      searchText: searchText
    })
    console.log(e)
  },

  // 点击阅读
  readTap:function(e){
    let magid = e.detail.currentTarget.dataset.magid;
    let mag_title = e.detail.currentTarget.dataset.mag_title
    wx.navigateTo({
      url: `/pages/magPreview/magPreview?mag_id=${magid}&mag_title=${mag_title}`,
    })
  },

  // 点击某个item
  itemTagClick: function(e){
    console.log(e);
    let typeid = e.currentTarget.dataset.typeid;
    let typename = e.currentTarget.dataset.typename;
    //开始执行搜索
    this.searchText(typename)
  },
  searchClick: function(e){
    this.searchText(this.data.searchText)
  }
})