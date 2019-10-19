<template>
  <div id="navigation">
    <van-nav-bar
      :title="title"
      left-text="返回"
      :right-text="search"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
    />
  </div>
</template>

<script>
import detail from "./Detail";
export default {
  name: "navigation",
  components: {
    detail
  },
  props: ["title", "search"],
  methods: {
    // 返回
    onClickLeft() {
      this.$router.go(-1);
    },
    // 搜索
    onClickRight() {
      this.$router.push("/search");
    }
  }
};
</script>
<style>
</style>