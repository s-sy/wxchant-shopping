// pages/home/home/home.js
let col1H = 0;
let col2H = 0;
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    swiper: [
      { id: 0, src: "../../../static/wxImage/355-blue.jpg" },
      { id: 1, src: "../../../static/wxImage/356-greend.jpg" }, 
      { id: 2, src: "../../../static/wxImage/357-green.jpg" }, 
      { id: 3, src: "../../../static/wxImage/360-all.jpg" }
     ],
    scrollH: 0,
    imgWidth: 0,
    loadingCount: 0,
    images: [],
    col1: [],
    col2: []
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onImageLoad: function (e) {
      let imageId = e.currentTarget.id;
      let oImgW = e.detail.width;         //图片原始宽度
      let oImgH = e.detail.height;        //图片原始高度
      let imgWidth = this.data.imgWidth;  //图片设置的宽度
      let scale = imgWidth / oImgW;        //比例计算
      let imgHeight = oImgH * scale;      //自适应高度

      let images = this.data.images;
      let imageObj = null;

      for (let i = 0; i < images.length; i++) {
        let img = images[i];
        if (img.id === imageId) {
          imageObj = img;
          break;
        }
      }

      imageObj.height = imgHeight;

      let loadingCount = this.data.loadingCount - 1;
      let col1 = this.data.col1;
      let col2 = this.data.col2;

      if (col1H <= col2H) {
        col1H += imgHeight;
        col1.push(imageObj);
      } else {
        col2H += imgHeight;
        col2.push(imageObj);
      }

      let data = {
        loadingCount: loadingCount,
        col1: col1,
        col2: col2
      };

      if (!loadingCount) {
        data.images = [];
      }

      this.setData(data);
    },
    loadImages: function () {
      let images = [
        { pic: "../../../static/wxImage/355-blue.jpg", height: 0 },
        { pic: "../../../static/wxImage/355-blue.jpg", height: 0 },
        { pic: "../../../static/wxImage/355-blue.jpg", height: 0 },
        { pic: "../../../static/wxImage/355-blue.jpg", height: 0 },
        { pic: "../../../static/wxImage/355-blue.jpg", height: 0 },
        { pic: "../../../static/wxImage/355-blue.jpg", height: 0 },
        { pic: "../../../static/wxImage/355-blue.jpg", height: 0 },
        { pic: "../../../static/wxImage/355-blue.jpg", height: 0 },
        { pic: "../../../static/wxImage/355-blue.jpg", height: 0 },
        { pic: "../../../static/wxImage/355-blue.jpg", height: 0 },
        { pic: "../../../static/wxImage/355-blue.jpg", height: 0 },
        { pic: "../../../static/wxImage/355-blue.jpg", height: 0 },
        { pic: "../../../static/wxImage/355-blue.jpg", height: 0 },
        { pic: "../../../static/wxImage/355-blue.jpg", height: 0 }
      ];

      let baseId = "img-" + (+new Date());

      for (let i = 0; i < images.length; i++) {
        images[i].id = baseId + "-" + i;
      }

      this.setData({
        loadingCount: images.length,
        images: images
      });
    },
    toDetail(e){
      console.log(e)
    }
  },
  lifetimes: {
    attached: function () {
      // 在组件实例进入页面节点树时执行
      wx.getSystemInfo({
        success: (res) => {
          let ww = res.windowWidth;
          let wh = res.windowHeight;
          let imgWidth = ww * 0.48;
          let scrollH = wh;

          this.setData({
            scrollH: scrollH,
            imgWidth: imgWidth
          });

          this.loadImages();
        }
      })
    },
    detached: function () {
      // 在组件实例被从页面节点树移除时执行
    },
  },
  // 以下是旧式的定义方式，可以保持对 <2.2.3 版本基础库的兼容
  attached: function () {
    // 在组件实例进入页面节点树时执行
  },
  detached: function () {
    // 在组件实例被从页面节点树移除时执行
  },
  // ...
})
