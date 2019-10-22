<template>
  <div id="ranking">
    <div class="content">
      <transition-group
        enter-active-class="animated zoomInRight"
        leave-active-class="animated rotateInDownRight"
        delay-2s
        tag="div"
      >
        <div class="wrap" v-for="(item,index) in rankarr" :key="index">
          <router-link :to="'/ranking/'+item.id">
            <div class="img">
              <img v-lazy="item.coverImgUrl" />
              <div class="title">{{item.updateFrequency}}</div>
            </div>
          </router-link>
        </div>
      </transition-group>
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
.content > div {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  margin-top: -2rem;
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