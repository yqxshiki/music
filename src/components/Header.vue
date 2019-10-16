<template>
  <div id="appheader">
    <div class="icon">
      <van-icon name="wap-nav" />
    </div>
    <div class="wrap">
      <van-tabs v-model="active" animated>
        <van-tab v-for="(item,index) in tab" :title="item.title" :key="index">{{item.content}}</van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
export default {
  name: "appheader",
  data() {
    return {
      active: 1,
      tab: [
        { title: "我的", content: "我的1" },
        { title: "发现", content: "发现1" },
        { title: "视频", content: "视频1" }
      ]
    };
  }
};
</script>
<style scoped>
#appheader {
  display: flex;
  justify-content: space-around;
}
.icon {
  flex: 2;
}
.wrap {
  flex: 8;
}
.icon i {
  font-size: 2rem;
  cursor: pointer;
}
</style>