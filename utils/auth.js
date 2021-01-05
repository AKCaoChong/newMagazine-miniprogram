const NetWork = require('network.js');
const app = getApp();
async function checkSession() {
  return new Promise((resolve, reject) => {
    wx.checkSession({
      success() {
        return resolve(true)
      },
      fail() {
        return resolve(false)
      }
    })
  })
}

// 检测登录状态，返回 true / false
async function checkHasLogined() {
  const token = wx.getStorageSync('token')
  console.log('=====')
  console.log(token);
  if (!token) {
    return false
  }
  const loggined = await checkSession()
  if (!loggined) {
    wx.removeStorageSync('token')
    return false
  }
  // const checkTokenRes = await NetWork.checkToken(token)
  // if (checkTokenRes.code != 0) {
  //   wx.removeStorageSync('token')
  //   return false
  // }
  return true
}

async function login(page,iv,encryptedData) {
  let _this = this;
  wx.login({
    success: function (res) {
      console.log(res)
      var code = encodeURI(res.code); 
      console.log('res:'+ res.code ,'iv:' + iv ,'encryptedData: ' + encryptedData )
      var params = {
        "code": res.code,
        "iv": iv,
        "encryptedData": encryptedData
      }
      
      NetWork.userLogin(code,iv,encryptedData).then(function (res) {
        console.log('denglu=====')
        console.log(res);
        if(res.code == 0){
          wx.setStorageSync('infotoken', res.data.tks);
          wx.setStorageSync('avatar', res.data.headimg);
          wx.setStorageSync('nickname', res.data.nickname)
          app.globalData.userInfo = {
            nickname: res.data.nickname,
            avatar: res.data.headimg,
            token: res.data.tks
          }
          if (page) {
            page.setData({
              wxlogin:true,
              showPhoneLogin: true
            })
          }
        }
        
      })
    }
  })
  
}



async function getUserPhone(page,iv,encryptedData) {
  let _this = this;
  wx.login({
    success: function (res) {
      console.log(res)
      var code = encodeURI(res.code); 
      let tks = wx.getStorageSync('infotoken')
      console.log('res:'+ res.code ,'iv:' + iv ,'encryptedData: ' + encryptedData +'tks:' + tks)

      var params = {
        "code": res.code,
        "iv": iv,
        "encryptedData": encryptedData,
        "tks": tks
      }
      NetWork.getUserPhone(code,iv,encryptedData,tks).then(function (res) {
        console.log('phone=====')
        console.log(res);
        wx.setStorageSync('token', res.data.tokens);
        wx.setStorageSync('avatar', res.data.headimg);
        wx.setStorageSync('nickname', res.data.nickname)
        app.globalData.userInfo = {
          nickname: res.data.nickname,
          avatar: res.data.headimg,
          token: res.data.token
        }
        if (page) {
          page.setData({
            showPhoneLogin:false
          })
          page.onShow()
        }
      })
    }
  })
}



function loginOut() {
  wx.removeStorageSync('token')
  wx.removeStorageSync('uid')
}

async function checkAndAuthorize(scope) {
  return new Promise((resolve, reject) => {
    wx.getSetting({
      success(res) {
        if (!res.authSetting[scope]) {
          wx.authorize({
            scope: scope,
            success() {
              resolve() // 无返回参数
            },
            fail(e) {
              console.error(e)
              // if (e.errMsg.indexof('auth deny') != -1) {
              //   wx.showToast({
              //     title: e.errMsg,
              //     icon: 'none'
              //   })
              // }
              wx.showModal({
                title: '无权操作',
                content: '需要获得您的授权',
                showCancel: false,
                confirmText: '立即授权',
                confirmColor: '#e64340',
                success(res) {
                  wx.openSetting();
                },
                fail(e) {
                  console.error(e)
                  reject(e)
                },
              })
            }
          })
        } else {
          resolve() // 无返回参数
        }
      },
      fail(e) {
        console.error(e)
        reject(e)
      }
    })
  })
}


module.exports = {
  checkHasLogined: checkHasLogined,
  login: login,
  loginOut: loginOut,
  checkAndAuthorize: checkAndAuthorize,
  getUserPhone:getUserPhone
}