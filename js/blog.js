var app = new Vue({
  el: '#app',
  data: {
    showNav: false,
    list: [],
    title: '2022博客日记',
    errorImgSrc: './img/img-default.png',
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
    onErrorImg: function (imgSrc) {
      return 'this.οnerrοr=null;this.src=' + '"' + imgSrc + '";';
    },
  },
  mounted: function () {
    this.$nextTick(function () {
      this.list = window.list.reverse();
      this.list = this.list.map((v) => {
        v.children = v?.children?.map((i) => {
          i.img = i.imgs[0];
          i.currentImgIndex = 0;
          return i;
        });
        return v;
      });
    });
  },
});
