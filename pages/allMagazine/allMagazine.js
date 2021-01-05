const network = require('../../utils/network.js')
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nav_list:[
      {
        zinetype_id:'0',
        zinetype_name:'全部'
      },
      {
        zinetype_id:'113',
        zinetype_name:'瑞丽服饰美容'
      },
      {
        zinetype_id:'114',
        zinetype_name:'伊人风尚'
      },
      {
        zinetype_id:'115',
        zinetype_name:'男人风尚'
      },
      {
        zinetype_id:'116',
        zinetype_name:'家居设计'
      },
      {
        zinetype_id:'117',
        zinetype_name:'筛选'
      }
    ],
    sub_nav_list:[
      {
        year_id:'0',
        year_name:'全部'
      },
      {
        year_id:'113',
        year_name:'2020'
      },
      {
        year_id:'114',
        year_name:'2019'
      },
      {
        year_id:'115',
        year_name:'2018'
      },
      {
        year_id:'116',
        year_name:'2017'
      },
      {
        year_id:'117',
        year_name:'2016'
      },
      {
        year_id:'118',
        year_name:'2015'
      }
    ],
    magazineList:[
      
    ],
    currentPage: 0,
    currentMagid: null,
    currentYear:null,
    pageNum: 10
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let windowW = 750;
    let magBoxW = (windowW-70)/2;
    let magImgH = magBoxW * 1.38;
    let magBoxH = magImgH + 120;
    console.log(magBoxW,magBoxH,magImgH)
    this.setData({
      magBoxH: magBoxH,
      magBoxW:magBoxW,
      magImgH: magImgH
    })
    this.laodAllMagList(this.data.currentMagid,this.data.currentYear,this.data.currentPage,this.data.pageNum)
    this.loadZineType();
  },
  // 加载所有杂志列表接口
  laodAllMagList: function(zineType_id,year,page){
    
    network.magAllList(zineType_id,year,page,10).then(res=>{
      console.log(res);
      if(res.code == 0 ){
        let list = res.data;
        if(page == 0){
          this.setData({
            magazineList: list,
            currentPage: page++
          })
        }else{
          let newList = this.magazineList.concat(list)
          this.setData({
            magazineList: newList,
            currentPage: page++
          })
        }
      }else{
        if(page == 0 && res.code == 407){
          wx.showToast({
            title: '没有数据',
            icon:'none'
          })
          this.setData({
            magazineList:[]
          })
        }else{
          wx.showToast({
            title: res.message,
            icon:'none'
          })
        }
        
      }
    })
  },
  // 加载 分类
  loadZineType: function(){
    network.zineType().then(res => {
      if(res.code == 0){
        console.log(res)
        res.data.unshift({
          zinetype_id:'0',
          zinetype_name:'全部'
        },)
        this.setData({
          nav_list: res.data
        })
      }else{
        wx.showToast({
          title: res.message,
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
    this.setData({
      currentPage: 0
    })
    this.laodAllMagList(this.data.currentMagid,this.data.currentYear,this.data.currentPage,this.data.pageNum)
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.laodAllMagList(null,null,this.data.currentPage,10)
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
  // 点击切换tab
  switchTabClick: function(e){
    console.log(e)
    let index = e.detail.index;
    let zinetype_id = e.detail.zinetype_id;
    if(zinetype_id == '0'){
      zinetype_id = null
    }
    this.setData({
      currentMagid: zinetype_id,
      currentPage: 0
    })
    this.laodAllMagList(this.data.currentMagid,this.data.currentYear,this.data.currentPage,this.data.pageNum)
  },
  yearSwitchTap: function(e){
    console.log(e)
    let index = e.detail.index;
    let year_id = this.data.sub_nav_list[index].year_name;
    console.log(year_id)
    if(year_id == '全部'){
      year_id = null
    }
    this.setData({
      currentYear: year_id,
      currentPage: 0
    })
    this.laodAllMagList(this.data.currentMagid,this.data.currentYear,this.data.currentPage,this.data.pageNum)
  },
  // 去搜索杂志页
  toMagazineSearch: function(e){
    wx.navigateTo({
      url: '/pages/magSearch/magSearch',
    })
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