var app = new Vue({
  el: '#app',
  data: {
    showNav: false,
    list: [],
    title: '2022 test',
    errorImgSrc: './img/img-default.png',
    videoSrc: './img/video-default.png',
    menuImgURL: './img/menu.png',
  },
  methods: {
    showMenu() {
      this.showNav = !this.showNav;
    },
    onErrorImg(imgSrc) {
      return 'this.οnerrοr=null;this.src=' + '"' + imgSrc + '";';
    },

    heic2anyFn(fileURL) {
      let resultURL = '';
      return new Promise((resolve, reject) => {
        fetch(fileURL)
          .then((res) => res.blob())
          .then((blob) =>
            heic2any({
              blob, // 将heic转换成一个buffer数组的图片
              toType: 'image/jpg', //要转化成具体的图片格式，可以是png/gif
              quality: 0.1, // 图片的质量，参数在0-1之间
            }).then((resultBlob) => {
              file = new File([resultBlob], +'test.jpg', {
                type: 'image/jpeg',
                lastModified: new Date().getTime(),
              });
              const reader = new FileReader();
              reader.readAsDataURL(file);
              reader.onload = (e) => {
                // 转换base64
                resultURL = e.target.result;
                resolve(resultURL);
              };
            })
          );
      });
    },
    detailFn(item, index) {
      window.location.href = 'blog-detail.html?item=' + JSON.stringify(item);
    },
  },
  mounted: function () {
    this.$nextTick(function () {
      this.list = window.list.reverse();
      this.list = this.list.map((v) => {
        v.children = v?.children?.map((i) => {
          i.type = i.type === 'video' ? 'video' : 'img';
          if (i.type === 'img') {
            if (/.heic$/i.test(i.imgs[0])) {
              this.heic2anyFn(i.imgs[0]).then((url) => {
                i.imgs[0] = url;
                this.$forceUpdate();
              });
            }
          }
          return i;
        });
        return v;
      });
    });
  },
});
