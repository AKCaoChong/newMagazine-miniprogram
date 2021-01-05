const network = require('../../../utils/network')
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    magzine:{
      magazine_id:'1',
      logo:"http://app.raylihome.com.cn/furniture/Public/magazine/2020-09-28/5f71b5a3c57e9.jpg",
      main_title:"复古情结",
      sub_title:"2020年10月刊",
      type:"瑞丽家居设计"
    },
    codeList:[
      {
        code:'ASDFWEEFSEA',
        status:'1',
        time:'2020-10-20',
        user:{
          head:"https://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTLSrpu0ZJm6p3r89jvSzYowf0r0OM1Jliatr8uKrxUibpQRj81YF1YZSia4xXGckYaz34aOO0py45krg/132",
          name:"ZedLine"
        }
      },
      {
        code:'ASDFWEEFSEA',
        status:'2',
        
      },
      {
        code:'ASDFWEEFSEA',
        status:'1',
        time:'2020-10-20',
        user:{
          head:"https://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTLSrpu0ZJm6p3r89jvSzYowf0r0OM1Jliatr8uKrxUibpQRj81YF1YZSia4xXGckYaz34aOO0py45krg/132",
          name:"ZedLine"
        }
      },
      {
        code:'ASDFWEEFSEA',
        status:'2',
        
      },
      {
        code:'ASDFWEEFSEA',
        status:'0',
        
      },
      {
        code:'ASDFWEEFSEA',
        status:'0',
        
      },
    ],
    currentPage: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let mag = JSON.parse(options.mag);
    let nickName = wx.getStorageSync('nickname')
    let headImg = wx.getStorageSync('avatar')
    this.setData({
      magzine: mag,
      nickname: nickName,
      headImg: headImg
    })
    this.readCodeList(this.data.magzine.magazine_id,this.data.currentPage,10)
  },
  // 获取阅读码列表
  readCodeList: function(mag_id,page,count){
    network.myReadCodeList(mag_id,page,count).then(res => {
      console.log(res)
      if(res.code == 0){
        let list = res.data
        if(page == 0){
          this.setData({
            codeList: list,
            currentPage: page++
          })
        }else{
          let newList = this.codeList.concat(res.data)
          this.setData({
            codeList: newList,
            currentPage: page++
          })
        }

      }else{
        if(res.code == 407){
          wx.showToast({
            title: "没有数据",
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
    this.readCodeList(this.data.magzine.id,0,10)
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.readCodeList(this.data.magzine.id,this.data.currentPage,10)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (options) {
    var that = this
    let shareObj = []
    if(options.from == 'button'){
      console.log(options)
      let codeStr = options.target.dataset.codestr;
      let magData = JSON.stringify(this.data.magzine)
      shareObj = {
        title:that.data.nickname + '请你免费看' + '《' + that.data.magzine.main_title + '》',
        path: `/pages/ucenter/activeCode/activeCode?codestr=${codeStr}&magdata=${magData}`,
        imageUrl: that.data.magzine.logo,
      }
      return shareObj;
    }
    shareObj = {
      title: '瑞丽电子刊',
      path: '/pages/home/home',
      imageUrl: app.globalData.shareImg
    }
    return shareObj;
  },
  copyClick: function(e){
    console.log(e)
    let code = e.currentTarget.dataset.code
    wx.setClipboardData({
      data: code,
      success: function (res) {
        wx.showModal({
          title: '提示',
          content: '复制成功',
          success: function (res) {
            if (res.confirm) {
              console.log('确定')
            } else if (res.cancel) {
              console.log('取消')
            }
          }
        })
      }
    })
  },
  sendClick:function(e){
    let code = e.currentTarget.dataset.code
  }
})