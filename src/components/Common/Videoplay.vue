<template>
  <div id="videoplay">
    <navigation :title="title"/>
    <div class="wrap">
      <div class="video">
        <video :src="resources[1080]" controls preload="auto"></video>
      </div>
      <div class="mvbottom">
        <div class="singer">{{video.artistName}}--{{video.name}}</div>
        <div class="playcount">播放量:{{video.playCount}}</div>
      </div>
    </div>
    <div class="commonmv" v-for="(item,index) in commonmv" :key="index">
      <div class="img">
        <router-link :to="'/videoplay2/'+item.id">
          <img v-lazy="item.cover" alt />
        </router-link>
      </div>
      <div class="mvbottom">
        <div class="singer">{{item.artistName}}--{{item.name}}</div>
        <div class="playcount">播放量:{{item.playCount}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import navigation from "./Navigation";
export default {
  name: "videoplay",
  components: {
    navigation
  },
  data() {
    return {
      title: "视频",
      video: [],
      commonmv: [],
      resources: ""
    };
  },
  methods: {
    // mv详情
    getvideo(id) {
      this.axios.get("/mv/detail?mvid=" + id).then(res => {
        this.video = res.data.data;
        this.resources = this.video.brs;
      });
    },
    // 相似mv
    getcommonmv(id) {
      this.axios.get("/simi/mv?mvid=" + id).then(res => {
        this.commonmv = res.data.mvs;
      });
    }
  },
  mounted() {
    this.getvideo(this.$route.params.id);
    this.getcommonmv(this.$route.params.id);
  }
};
</script>
<style scoped>
.wrap {
  margin-top: -1rem;
}
.video video {
  width: 100%;
  height: 15rem;
}
.mvbottom {
  display: flex;
  justify-content: space-around;
}
.singer {
  font-size: 1rem;
  font-weight: 700;
  color: brown;
}
.playcount {
  font-size: 0.6rem;
  opacity: 0.8;
}

/* common */
.commonmv {
  margin-top: 2rem;
}
.img img {
  width: 100%;
  height: 11rem;
}
</style>