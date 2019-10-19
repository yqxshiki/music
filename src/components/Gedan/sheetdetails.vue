<template>
  <div id="sheetid">
    <div class="wrap">
      <navigation :title="message" :search="search" />
      <detail />
    </div>
  </div>
</template>

<script>
import navigation from "../Common/Navigation";
import detail from "../Common/Detail";
export default {
  name: "sheetid",
  components: {
    navigation,
    detail
  },
  data() {
    return {
      message: "歌单详情", //传递到自组件的值
      search: "搜索"
    };
  }
};
</script>
<style>
</style>