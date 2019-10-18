<template>
  <div id="appheader">
    <div class="flex">
      <div class="icon">
        <van-cell @click="showPopup">
          <van-icon name="wap-nav" />
        </van-cell>
        <van-popup v-model="show" round position="left" :style="{ width: '80%',height:'100%'}">
          <sidebar />
        </van-popup>
      </div>
      <div class="wrap">
        <van-row>
          <van-col span="8">新曲</van-col>
          <router-link to="/sheet">
            <van-col span="8">歌单</van-col>
          </router-link>
          <router-link to="/ranking">
            <van-col span="8">排行榜</van-col>
          </router-link>
        </van-row>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import sidebar from "./Sidebar";
export default {
  name: "appheader",
  components: {
    sidebar
  },
  data() {
    return {
      active: 1,
      show: false
    };
  },
  methods: {
    showPopup() {
      this.show = true;
    }
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
  line-height: 3rem;
}
.icon i {
  font-size: 2rem;
  cursor: pointer;
}
</style>