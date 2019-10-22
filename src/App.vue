<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import appheader from "./components/Header";
import appfooter from "./components/Footer";

export default {
  name: "app",
  components: {
    appheader,
    appfooter
  }
};
</script>

<style>
.bottom {
  width: 100%;
  height: 60px;
  position: fixed;
  bottom: 0;
}
a {
  color: #000;
}
@font-face {
  font-family: "iconfont"; /* project id 1462857 */
  src: url("//at.alicdn.com/t/font_1462857_fkf8fd07pci.eot");
  src: url("//at.alicdn.com/t/font_1462857_fkf8fd07pci.eot?#iefix")
      format("embedded-opentype"),
    url("//at.alicdn.com/t/font_1462857_fkf8fd07pci.woff2") format("woff2"),
    url("//at.alicdn.com/t/font_1462857_fkf8fd07pci.woff") format("woff"),
    url("//at.alicdn.com/t/font_1462857_fkf8fd07pci.ttf") format("truetype"),
    url("//at.alicdn.com/t/font_1462857_fkf8fd07pci.svg#iconfont") format("svg");
}
.iconfont {
  font-family: "iconfont" !important;
  font-size: 1.6rem;
  font-style: normal;
  color: #000;
  -webkit-font-smoothing: antialiased;
  -webkit-text-stroke-width: 0.2px;
  -moz-osx-font-smoothing: grayscale;
}
</style>
