<template>
  <div id="rankdetail">
    <detail :title="title" />
  </div>
</template>

<script>
import detail from "../Common/Detail";
export default {
  name: "rankdetail",
  components: {
    detail
  },
  data() {
    return {
      title: "排行榜" //传递到子组件的值
    };
  }
};
</script>
<style>
</style>