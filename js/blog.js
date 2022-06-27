var app = new Vue({
  el: "#app",
  data: {
    showNav: false,
    list: [],
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
  },
  mounted: function () {
    this.$nextTick(function () {
      this.list = window.list;
      this.list = this.list.map((v) => {
        v.children = v.children.map((i) => {
          i.img = i.imgs[0];
          i.currentImgIndex = 0;
          return i;
        });
        return v;
      });
    });
  },
});
