<template>
  <div id="navigation">
    <van-nav-bar
      :title="title"
      left-text="返回"
      right-text="首页"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
    />
    <!-- :right-text="search" -->
  </div>
</template>

<script>
export default {
  name: "navigation",
  props: ["title", "search"],
  methods: {
    // 返回
    onClickLeft() {
      this.$router.go(-1);
    },
    // 返回首页
    onClickRight() {
      this.$router.push("/sheet");
    }
  }
};
</script>
<style>
</style>