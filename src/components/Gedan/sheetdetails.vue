<template>
  <div id="sheetid">
    <div class="wrap">
      <detail :title="title" />
    </div>
  </div>
</template>

<script>
import detail from "../Common/Detail";
export default {
  name: "sheetid",
  components: {
    detail
  },
  data() {
    return {
      title: "歌单详情" //传递到子组件的值
    };
  }
};
</script>
<style>
</style>