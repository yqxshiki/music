<template>
  <div id="rankdetail">
    <navigation :title="message" :search="search" />
    <detail />
  </div>
</template>

<script>
import navigation from "../Common/Navigation";
import detail from "../Common/Detail";
export default {
  name: "rankdetail",
  components: {
    navigation,
    detail
  },
  data() {
    return {
      message: "",
      search: "搜索"
    };
  }
};
</script>
<style>
</style>