<template>
  <div id="ranking">
    <van-nav-bar title="排行榜" left-text="返回" left-arrow @click-left="onClickLeft" />
    <div class="content">
      <div class="wrap" v-for="(item,index) in rankarr" :key="index">
        <router-link :to="'/ranking/'+item.id">
          <div class="img">
            <img :src="item.coverImgUrl" alt />
            <div class="title">{{item.updateFrequency}}</div>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ranking",
  data() {
    return {
      rankarr: []
    };
  },
  methods: {
    // 所有榜单内容摘要
    getdetail() {
      this.axios.get("/toplist/detail").then(res => {
        // console.log(res);
        this.rankarr = res.data.list;
        // console.log(this.rankarr);
      });
    },
    onClickLeft() {
      this.$router.go(-1);
    }
  },
  mounted() {
    this.getdetail();
  }
};
</script>
<style scoped>
#ranking {
  width: 100%;
  height: 100vh;
}
.content {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
}
.wrap {
  width: 50%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.img {
  position: relative;
  flex: 5;
}
.img img {
  width: 9rem;
  margin-left: 1rem;
}
.title {
  font-size: 0.3rem;
  position: absolute;
  left: 2rem;
  bottom: 0.6rem;
}
.songs {
  flex: 5;
  color: #000;
  font-size: 0.1rem;
  text-align: center;
  display: flex;
}
</style>