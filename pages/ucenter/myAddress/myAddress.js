const network = require('../../../utils/network')
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    region: ['北京市', '北京市', '东城区'],
    addressStatus: "list",
    user:{
      
    },
    addressList:[
      
    ],
    editingAddress:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let isSel = options.selAddress
    this.setData({
      isSel: isSel
    })
    this.loadMyAddressList()
    let name = wx.getStorageSync('nickname')
    let headimg = wx.getStorageSync('avatar')
    this.setData({
      user:{
        head: headimg,
        name: name
      }
    })
  },

  loadMyAddressList: function(){
    network.myAddressList().then(res => {
      console.log(res)
      if(res.code==0){
        this.setData({
          addressList: res.data
        })
      }else{
        if(res.code == 407){
          wx.showToast({
            title: '没有数据',
            icon: 'none'
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
  // 检查手机号
  checkPhone(mobile){
    if((/^[1][3,4,5,6,7,8,9][0-9]{9}$/.test(mobile))){ 
      return true; 
    }
    return false 
  },
  // 编辑地址
  editMyAddress: function(){
    let addressObj = this.data.editingAddress;
    if(!addressObj.name){
      wx.showToast({
        title: '请输入收件人姓名',
        icon:'none'
      })
      return 
    }
    if(!addressObj.mobile || !this.checkPhone(addressObj.mobile)){
      wx.showToast({
        title: '请输入正确的手机号码',
        icon:'none'
      })
      return 
    }
    if(!addressObj.province || !addressObj.city || !addressObj.district || !addressObj.address){
      wx.showToast({
        title: '请输入完整的收货地址',
        icon:'none'
      })
      return 
    }
    
    network.addressEdit(addressObj.address_id, addressObj.name, addressObj.address, addressObj.mobile,addressObj.province,addressObj.city,addressObj.district,addressObj.postcode).then(res => {
      if(res.code == 0){
        this.setData({
          addressStatus: "list"
        })
        this.loadMyAddressList()
      }else{

      }
    })
  },
  // 添加地址
  addMyAddress: function(){
    let addressObj = this.data.editingAddress;
    if(!addressObj.name){
      wx.showToast({
        title: '请输入收件人姓名',
        icon:'none'
      })
      return 
    }
    if(!addressObj.mobile || !this.checkPhone(addressObj.mobile)){
      wx.showToast({
        title: '请输入正确的手机号码',
        icon:'none'
      })
      return 
    }
    if(!addressObj.province || !addressObj.city || !addressObj.district || !addressObj.address){
      wx.showToast({
        title: '请输入完整的收货地址',
        icon:'none'
      })
      return 
    }
    // name,address,mobile,province,city,district,postcode
    network.addNewAddress(addressObj.name,addressObj.address,addressObj.mobile,addressObj.province,addressObj.city,addressObj.district,addressObj.postcode).then(res => {
      if(res.code == 0){
        this.setData({
          addressStatus: "list"
        })
        this.loadMyAddressList()
      }else{

      }
    })
  },
  // 删除地址
  delMyAddress: function(){
    network.delMyAddress().then(res => {
      if(res.code == 0){
        //删除成功
      }
      wx.showToast({
        title: res.message,
      })
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
  addressClick: function(e){
    console.log(e)
    let index = e.currentTarget.dataset.index
    let address = this.data.addressList[index]
    console.log(address)
    if(this.data.isSel == 1){
      let pages = getCurrentPages();
      let currentPage = null;
      let prevPage = null;
      if(pages.length >= 2){
        currentPage = pages[pages.length - 1]
        prevPage = pages[pages.length - 2]
      }
      if(prevPage){
        
        prevPage.setData({
          selAddress: address
        })
      }
      wx.navigateBack({
        delta: 1,
      })
      return
    }
    
    let region = [address.province,address.city,address.district]
    this.setData({
      addressStatus: "edit",
      editingAddress: address,
      region: region
    })
  },
  //新增地址
  addAddressClick: function(){
    console.log('新增地址')
    let addressObj = this.data.editingAddress
    addressObj.province = this.data.region[0];
    addressObj.city = this.data.region[1];
    addressObj.district = this.data.region[2];
    this.setData({
      addressStatus: "add",
      editingAddress: addressObj
    })
  },
  editAddressClick: function(){
    this.editMyAddress()
    
  },
  saveAddressClick: function(){
    this.addMyAddress()
  },
  cancelAddress: function(){
    this.setData({
      addressStatus: "list"
    })
  },
  //城市选择
  bindRegionChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    let address = e.detail.value;
    let addressObj = this.data.editingAddress
    addressObj.province = address[0];
    addressObj.city = address[1];
    addressObj.district = address[2];
    console.log(this.data.editingAddress)
    this.setData({
      editingAddress: addressObj
    })
  },
  nameInput: function(e){
    console.log(e)
    let name = e.detail.value;
    let addressObj = this.data.editingAddress
    addressObj.name = name;
    // this.setData({
    //   editingAddress:  addressObj
    // })
  },
  mobileInput: function(e){
    console.log(e)
    let mobile = e.detail.value
    let addressObj = this.data.editingAddress
    addressObj.mobile = mobile;
    // this.setData({
    //   editingAddress:  addressObj
    // })
  },
  addressInput: function(e){
    console.log(e)
    let address = e.detail.value
    let addressObj = this.data.editingAddress
    addressObj.address = address;
    // this.setData({
    //   editingAddress:  addressObj
    // })
  },
  emailCodeInput: function(e){
    console.log(e)
    let emailCode = e.detail.value
    let addressObj = this.data.editingAddress
    addressObj.postcode = emailCode;
    // this.setData({
    //   editingAddress:  addressObj
    // })
  }
})