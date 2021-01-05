const API_BASE_URL = "https://zine.raylimobile.com/"
// https://zine.raylimobile.com/
// https://zine.rayligirl.com/
// https://zine.raylimobile.com/
let request = function request(url, method, data){
  let _url = API_BASE_URL + url;
  let token = wx.getStorageSync('token')
  if(data.token){
    token = data.token
  }else if(token && token.length>0){
    console.log(token)
    data.tokens = token
  }
  console.log("=====url=====")
  console.log(_url)
  console.log("=====data=====")
  console.log(data)
  console.log("===============")
  return new Promise(function(resolve, reject){
    wx.request({
      url: _url,
      method: method,
      data: data,
      header:{
        'Content-Type': 'application/x-www-form-urlencoded',
        'tokens': token
      },
      success: function(res){
        resolve(res.data)
      },
      fail(err){
        reject(err);
      },
      complete: function(aaa){

      }
    })
  })

}

module.exports = {
  request: request,
  userLogin: function(code,iv,encryptedData){
    return request('ezine/api/member/login','post',{
      code,
      iv,
      encryptedData
    })
  },
  getUserPhone: function(code,iv,encryptedData,tks){
    return request('ezine/api/member/phone','post',{
      code: code,
      iv: iv,
      encryptedData: encryptedData,
      tks:tks
    })
  },
  homeCampaign: function(){
    return request('ezine/api/index/campaign','post',{})
  },
  homeMagList: function(){
    return request('ezine/api/index/magazine','post',{})
  },
  magAllList: function(zinetype_id=null,year=null,pagenum,pagecount){
    let parms = {'pagenum':pagenum,'pagecount':pagecount}
    if(zinetype_id){
      parms.zinetype_id = zinetype_id
    }
    if(year){
      parms.year = year
    }
    return request('ezine/api/whole/list','post',parms)
  },
  searchMag: function(key){
    return request('ezine/api/whole/search','post',{
      key:key
    })
  },
  searchMagTag: function(){
    return request('ezine/api/whole/push','post',{})
  },
  magDetail: function(mag_id){
    return request('ezine/api/whole/details','post',{
      magazine_id:mag_id
    })
  },
  collectMag: function(mag_id){
    return request('ezine/api/whole/collect','post',{
      magazine_id: mag_id
    })
  },
  collectCancel: function(mag_id){
    return request('ezine/api/whole/cancelCollect','post',{
      magazine_id: mag_id
    })
  },
  acitivateReadCode: function(mag_id,readCode){
    return request('ezine/api/readcode/activate','post',{
      magazine_id: mag_id,
      readcode: readCode
    })
  },
  myMagList: function(){
    return request('ezine/api/mine/magazine','post',{
      
    })
  },
  myReadCodeList: function(mag_id,page,count){
    let parms = {magazine_id: mag_id}
    if(page){
      parms.pagenum = page
    }
    if(count){
      parms.pagecount = count
    }
    return request('ezine/api/mine/readcode','post',{
      magazine_id: mag_id,
      pagenum: page,
      pagecount: count
    })
  },
  myCollectList: function(){
    return request('ezine/api/mine/collect','post',{})
  },
  myAddressList: function(){
    return request('ezine/api/mine/addressList','post',{})
  },
  addNewAddress: function(name,address,mobile,province,city,district,postcode){
    let parms = {
      name: name,
      address: address,
      mobile: mobile,
      province: province,
      city: city,
      district: district,
    }
    if(postcode){
      parms.postcode = postcode
    }
    return request('ezine/api/mine/addressAdd','post',parms)
  },
  addressEdit: function(address_id, name, address, mobile,province,city,district,postcode){
    let parms = {
      address_id: address_id,
      name: name,
      address: address,
      mobile: mobile,
      province: province,
      city: city,
      district: district
    }
    if(postcode){
      parms.postcode = postcode
    }
    return request('ezine/api/mine/addressEdit','post',parms)
  },
  addressDel:function(address_id){
    return request('ezine/api/mine/addressDel','post',{})
  },
  zineType: function(){
    return request('ezine/api/whole/zinetype','post',{})
  },
  getwxPayParams: function(mag_id,count){
    return request('ezine/api/weixin/pay','post',{
      magazine_id: mag_id,
      amount: count
    })
  },
  uploadActiveAddress: function(mag_id,cam_id,address_id,amount){
    return request('ezine/api/mine/gift','post',{
      magazine_id: mag_id,
      campaign_id: cam_id,
      address_id: address_id,
      amount: amount
    })
  }
}