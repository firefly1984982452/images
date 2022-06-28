var app = new Vue({
  el: '#detail',
  data: {
    errorImgSrc: './img/img-default.png',
    videoSrc: './img/video-default.png',
    backImgURL: './img/back.png',
    item: {},
    hasHEIC: false,
  },
  methods: {
    onErrorImg(imgSrc) {
      return 'this.οnerrοr=null;this.src=' + '"' + imgSrc + '";';
    },
    backFn() {
      history.back();
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
      const str = window.location.search.substring(1);
      let param = Object.fromEntries(new URLSearchParams(str));
      let item = JSON.parse(param.item);
      this.item = item;
      this.hasHEIC = this.item.imgs.some((v) => /.heic$/i.test(v));
      this.item.imgs = this.item.imgs.map((v, index) => {
        if (/.heic$/i.test(v)) {
          this.heic2anyFn(v).then((url) => {
            this.item.imgs[index] = url;
            this.$forceUpdate();
          });
        } else {
          return v;
        }
      });
    });
  },
});
