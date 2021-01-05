const app = getApp()
const network = require('../../../utils/network.js')
const Auth = require("../../../utils/auth")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    user:{
      
    },
    tagList:[
      {
        img:"/images/mine_mag.png",
        title:"我的期刊",
        id:'0'
      },
      {
        img:"/images/mine_collect.png",
        title:"我的收藏",
        id:"1"
      },
      {
        img:"/images/mine_addr.png",
        title:"我的地址",
        id:"2"
      },
      {
        img:"/images/mine_tomag.png",
        title:"明星电子刊",
        id:"3"
      }
    ],
    selList:[
      {
        img:"/images/mine_buy.png",
        title:"购买纸刊",
        id:'0'
      },
      {
        img:"/images/mine_share.png",
        title:"分享小程序",
        id:'1'
      },
      {
        img:"/images/mine_connect.png",
        title:"联系客服",
        id:'2'
      },
      {
        img:"/images/mine_tomag.png",
        title:"明星电子刊",
        id:'3'
      }
    ],
    showPhoneLogin: false,
    wxlogin: true,
    weburl:'https://wx.raylihome.com.cn/public/smalhelper/index.html'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let tagW = 670/4;
    
    this.setData({
      tagW: tagW
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
    Auth.checkHasLogined().then(res => {
      console.log(res)
      this.setData({
        wxlogin: res
      })
    })
    let name = wx.getStorageSync('nickname')
    let headimg = wx.getStorageSync('avatar')
    this.setData({
      user:{
        head: headimg,
        name: name
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
  // 
  tagClick: function(e){
    let id = e.currentTarget.dataset.id
    console.log(id)
    switch(id){
      case "0":
        wx.navigateTo({
          url: '/pages/ucenter/mymag/mymag',
        })
        break
      case "1":
        wx.navigateTo({
          url: '/pages/ucenter/myCollect/myCollect',
        })
        break
      case "2":
        wx.navigateTo({
          url: '/pages/ucenter/myAddress/myAddress',
        })
        break
      case "3":
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
        break
    }

  },
  goAnotherClick: function(e){
    let id = e.currentTarget.dataset.id;
    if(id == 0){
      wx.navigateTo({
        url: `/pages/webpage/webpage?weburl=${this.data.weburl}`,
      })
    }else if(id == 3){
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
    }else{
      return
    }
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
})