// components/magazineBox/magazineBox.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    item:{
      type: Object,
      value: {}
    },
    imgW:{
      type: Number,
      value: 320
    },
    imgH:{
      type: Number,
      value: 320
    },
    boxH: {
      type: Number,
      value: 460
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    magazineOnClick: function(e){
      var options = {};
      console.log(e)
      // let mag_id = 
      this.triggerEvent("magazineOnTap",e,options);
    }
  }
})
