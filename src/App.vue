<template>
  <div id="app">
    <appheader />
    <div class="bottom">
      <appfooter />
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
</style>
