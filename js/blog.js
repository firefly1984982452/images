var app = new Vue({
  el: '#app',
  data: {
    showNav: false,
    list: [],
    title: '2022博客日记',
    errorImgSrc: './img/img-default.png',
    videoSrc: './img/video-default.png',
  },
  methods: {
    showMenu() {
      this.showNav = !this.showNav;
    },
    nextImg(index, y) {
      let item = this.list[index].children[y];
      let length = item.imgs.length;
      item.currentImgIndex < length - 1 ? ++item.currentImgIndex : (item.currentImgIndex = 0);
      item.img = item.imgs[item.currentImgIndex];
      this.$forceUpdate();
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
  },
  mounted: function () {
    this.$nextTick(function () {
      this.list = window.list.reverse();
      this.list = this.list.map((v) => {
        v.children = v?.children?.map((i) => {
          i.type = i.type === 'video' ? 'video' : 'img';
          if (i.type === 'img') {
            i.img = i.imgs[0];
            i.currentImgIndex = 0;
            if (/.heic$/i.test(i.img)) {
              this.heic2anyFn(i.img).then((url) => {
                i.img = url;
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
