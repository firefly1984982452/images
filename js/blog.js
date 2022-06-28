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
          return i;
        });
        return v;
      });
    });
  },
});
