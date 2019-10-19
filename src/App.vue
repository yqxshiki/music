<template>
  <div id="app">
    <appheader />
    <div class="bottom">
      <!-- <appfooter /> -->
    </div>
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
@font-face {
  font-family: "iconfont"; /* project id 1462857 */
  src: url("//at.alicdn.com/t/font_1462857_yrz7iv4en5q.eot");
  src: url("//at.alicdn.com/t/font_1462857_yrz7iv4en5q.eot?#iefix")
      format("embedded-opentype"),
    url("//at.alicdn.com/t/font_1462857_yrz7iv4en5q.woff2") format("woff2"),
    url("//at.alicdn.com/t/font_1462857_yrz7iv4en5q.woff") format("woff"),
    url("//at.alicdn.com/t/font_1462857_yrz7iv4en5q.ttf") format("truetype"),
    url("//at.alicdn.com/t/font_1462857_yrz7iv4en5q.svg#iconfont") format("svg");
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
