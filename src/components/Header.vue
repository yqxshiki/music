<template>
  <div id="appheader">
    <div class="flex">
      <div class="icon">
        <van-icon name="wap-nav" />
      </div>
      <div class="wrap">
        <van-row>
          <van-col span="8">新曲</van-col>
          <router-link to="/sheet">
            <van-col span="8">歌单</van-col>
          </router-link>
          <van-col span="8">排行榜</van-col>
        </van-row>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "appheader",
  data() {
    return {
      active: 1
    };
  }
};
</script>
<style scoped>
.flex {
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