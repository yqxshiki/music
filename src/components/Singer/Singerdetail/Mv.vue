<template>
  <div id="mv">
    <h3>推荐MV</h3>
    <div class="wrap" v-for="(item,index) in mv" :key="index">
      <div class="img">
        <router-link :to="'/videoplay/'+item.id">
          <img v-lazy="item.imgurl" alt />
        </router-link>
        <div class="playcount">
          <van-icon name="play-circle-o" />
          {{item.playCount}}
        </div>
      </div>
      <div class="detail">
        <p class="name">{{item.name}}</p>
        <p class="duration">播放时间:{{item.duration | tiems}}分钟</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "mv",
  props: ["gid"],
  data() {
    return {
      mv: []
    };
  },
  filters: {
    tiems(value) {
      return Math.ceil(value / (1000 * 60));
    }
  },
  methods: {
    getmv(id) {
      this.axios.get("/artist/mv?id=" + id).then(res => {
        this.mv = res.data.mvs;
      });
    }
  },
  mounted() {
    this.getmv(this.gid);
  }
};
</script>
<style scoped>
#mv {
  margin-left: 1rem;
}
.wrap {
  display: flex;
  justify-content: space-around;
  align-items: center;
  text-align: center;
  margin-top: 1rem;
}
.img img {
  width: 10rem;
}
.playcount {
  font-size: 0.8rem;
  color: #fff;
  position: absolute;
  left: 28%;
  margin-top: -128px;
}
.detail {
  width: 50%;
  height: 5rem;
}
.name {
  font-size: 0.4rem;
  word-wrap: break-word;
  word-break: normal;
}
.duration {
  font-size: 0.8rem;
  height: 10%;
}
</style>