<template>
  <div id="playhistory">
    <div class="top">
      <div class="title">列表总数:({{length}}首)</div>
    </div>
    <div class="song" v-for="(item,index) in detail" :key="index">
      <div class="name">{{item}}</div>
      <van-icon name="cross" @click="remove" :data-index="index" />
    </div>
  </div>
</template>

<script>
export default {
  name: "playhistory",
  data() {
    return {
      song: "",
      detail: [],
      length: ""
    };
  },
  inject: ["refooter"],
  methods: {
    // 移除播放列表
    remove(e) {
      let index = e.target.dataset.index;
      this.song.splice(index, 1);
      let songid = JSON.stringify(this.song);
      localStorage.setItem("songid", songid);
      this.refooter();
      this.getid;
    }
  },
  computed: {
    getid() {
      this.song = JSON.parse(localStorage.getItem("songid"));
      this.length = this.song.length;
      for (let i = 0; i < this.length; i++) {
        let playid = this.song[i];
        this.axios.get("/song/detail?ids=" + playid).then(res => {
          this.detail.push(res.data.songs[0].name);
        });
      }
    }
  },
  mounted() {
    this.getid;
  }
};
</script>
<style scoped>
#playhistory {
  color: black;
}
/* 顶部 */
.top {
  margin-left: -200px;
}
/* 歌曲信息 */
.song {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1rem;
  border-bottom: 2px solid #ccc;
}
.name {
  margin-left: 0.6rem;
  color: rgb(141, 135, 135);
  font-size: 1rem;
  text-indent: 1rem;
}
.van-icon {
  font-size: 1.6rem;
  margin-right: 0.6rem;
  opacity: 0.6;
}
</style>