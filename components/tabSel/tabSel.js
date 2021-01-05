// components/tabSel/tabSel.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    nav_list:{
      type: Array,
      value: []
    },
    sub_nav_list:{
      type: Array,
      value:[]
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    x:0,
    yearX:0,
    zinetype_id:0,
    showFilter: false,
    year_id:0
  },

  /**
   * 组件的方法列表
   */
  methods: {
    switchTap: function(e){
      console.log(this);
      let screenWidth = wx.getSystemInfoSync().windowWidth;
      let itemWidth = screenWidth/5;
      let { index,zinetype_id } = e.currentTarget.dataset;
      // const { nav_list } = this.data;
      let scrollX = itemWidth * index - itemWidth*2;
      let maxScrollX = (this.data.nav_list.length+1) * itemWidth;
      if(scrollX<0){
        scrollX = 0;
      } else if (scrollX >= maxScrollX){
        scrollX = maxScrollX;
      }
      // let zinetype_id = this.data.nav_list[index].zinetype_id
      this.setData({
        x: scrollX,
        zinetype_id:zinetype_id
      })
      let dataDic ={
        index: index,
        zinetype_id: zinetype_id
      }
      this.triggerEvent("switchTap", dataDic);
    },
    filterClick: function(e){
      console.log(e)
      let filter = this.data.showFilter
      if(!filter){
        let showAni = wx.createAnimation({
          delay: 0,
          duration: 250
        })
        showAni.height('100%').opacity(1).step()
        this.setData({
          filterAni:showAni.export()
        })
      }else{
        let hideAni = wx.createAnimation({
          delay: 0,
          duration: 250
        })
        hideAni.height('0%').opacity(0).step()
        this.setData({
          filterAni:hideAni.export()
        })
      }
      this.setData({
        showFilter: !filter
      })
    },
    yearSwitchTap: function(e){
      console.log(this);
      let screenWidth = wx.getSystemInfoSync().windowWidth;
      let itemWidth = screenWidth/5;
      let { index,year_id } = e.currentTarget.dataset;
      // const { nav_list } = this.data;
      let scrollX = itemWidth * index - itemWidth*2;
      let maxScrollX = (this.data.sub_nav_list.length+1) * itemWidth;
      if(scrollX<0){
        scrollX = 0;
      } else if (scrollX >= maxScrollX){
        scrollX = maxScrollX;
      }
      // let year_id = this.data.sub_nav_list[index].year_id
      this.setData({
        yearX: scrollX,
        year_id:year_id
      })
      let dataDic ={
        index: index,
        year_id: year_id
      }
      this.triggerEvent("yearSwitchTap", dataDic);
    }
  }
})
