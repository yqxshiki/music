<template>
  <div id="appheader">
    <div class="flex">
      <div class="icon">
        <van-cell @click="showPopup">
          <van-icon name="wap-nav" />
        </van-cell>
        <van-popup v-model="show" round position="left" :style="{ width: '70%',height:'100%'}">
          <sidebar />
        </van-popup>
      </div>
      <div class="title">VUE-MUSIC</div>
      <div class="icon">
        <router-link to="/search">
          <van-icon name="search" />
        </router-link>
      </div>
    </div>
    <div class="wrap">
      <van-row>
        <router-link to="/sheet" tag="div">
          <van-col>推荐</van-col>
        </router-link>
        <router-link to="/ranking" tag="div">
          <van-col>排行榜</van-col>
        </router-link>
        <router-link to="/singer" tag="div">
          <van-col>歌手</van-col>
        </router-link>
      </van-row>
    </div>
    <div class="cover">
      <router-view></router-view>
    </div>
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
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: rgb(210, 69, 55);
}
.icon .van-cell {
  background: rgb(210, 69, 55);
}
.icon i {
  font-size: 2rem;
  cursor: pointer;
}
.title {
  font-weight: 600;
  color: #ffffff;
}
.wrap {
  width: 100%;
  background: rgb(210, 69, 55);
  font-size: 0.8rem;
  height: 2rem;
}
.van-row {
  width: 100%;
  display: flex;
  justify-content: space-around;
  color: #ffffff;
}
.van-row div {
  margin-left: 1.5rem;
}

.cover {
  height: 100vh;
  width: 100%;
  margin-top: 3rem;
}
</style>