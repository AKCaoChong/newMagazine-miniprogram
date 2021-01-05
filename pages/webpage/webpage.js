var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    webViewUrl:'',
    // goods:{
    //   logo:'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic2.zhimg.com%2F50%2Fv2-b13075f7535cd89615af5cb9f146d7a0_hd.jpg&refer=http%3A%2F%2Fpic2.zhimg.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1611391211&t=e1633346a6d7eecd0a27b52447808f48',
    //   title:'这个是商品',
    //   price:'这个是价格',
    //   goods_id:'0'
    // },
    goodsList:[
      {
        logo:'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic2.zhimg.com%2F50%2Fv2-b13075f7535cd89615af5cb9f146d7a0_hd.jpg&refer=http%3A%2F%2Fpic2.zhimg.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1611391211&t=e1633346a6d7eecd0a27b52447808f48',
        title:'这个是商品',
        price:'这个是价格',
        goods_id:'0'
      },
      {
        logo:'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201712%2F25%2F20171225123356_eXNhJ.jpeg&refer=http%3A%2F%2Fb-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1611391211&t=0fcdc7375f64b525d8fd10f57a1b7cfb',
        title:'这个是商品',
        price:'这个是价格',
        goods_id:'1'
      },
      {
        logo:'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic4.zhimg.com%2F50%2Fv2-12a313d718f9c3d770498b1693d57ddc_hd.jpg&refer=http%3A%2F%2Fpic4.zhimg.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1611391211&t=9f148bef1c30037369921500812d013f',
        title:'这个是商品',
        price:'这个是价格',
        goods_id:'2'
      },
      {
        logo:'https://pics3.baidu.com/feed/574e9258d109b3de36af3080b100f287810a4c08.jpeg?token=1107012ecdd6249255e01c2919686ca6',
        title:'这个是商品',
        price:'这个是价格',
        goods_id:'3'
      },
      {
        logo:'',
        title:'这个是商品',
        price:'这个是价格',
        goods_id:'4'
      },
      {
        logo:'',
        title:'这个是商品',
        price:'这个是价格',
        goods_id:'5'
      }
      ,
      {
        logo:'https://pics3.baidu.com/feed/574e9258d109b3de36af3080b100f287810a4c08.jpeg?token=1107012ecdd6249255e01c2919686ca6',
        title:'这个是商品',
        price:'这个是价格',
        goods_id:'6'
      }

    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      webViewUrl: options.webUrl
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
  goodsListClick: function(){
    console.log('goods click')
    let ani = wx.createAnimation({
      delay: 0,
      duration:200
    })
    ani.translateY('0').step()
    this.setData({
      listAni: ani
    })
  },
  closeClick: function(){
    console.log('close')
    let ani = wx.createAnimation({
      delay: 0,
      duration:200
    })
    ani.translateY('100%').step()
    this.setData({
      listAni: ani
    })
  }
})