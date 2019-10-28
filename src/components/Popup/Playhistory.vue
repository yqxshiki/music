<template>
  <div id="playhistory">
    <div class="top">
      <div class="title">列表总数:({{length}}首)</div>
    </div>
    <div class="song" v-for="(item,index) in detail" :key="index">
      <div class="name" @click="play(item.id)">{{item.name}}</div>
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
  inject: ["iffooter", "playaudio", "refooter"],
  methods: {
    // 移除播放列表
    remove(e) {
      let index = e.target.dataset.index;
      this.song.splice(index, 1);
      let songid = JSON.stringify(this.song);
      sessionStorage.setItem("songid", songid);
      this.refooter();
      this.getid;
    },
    // 音乐url
    getsongurl(id) {
      this.axios.get("/song/url?id=" + id).then(res => {
        this.$store.state.src = res.data.data[0].url;
      });
    },
    play(id) {
      this.getsongurl(id);
      this.playaudio(id);
    }
  },
  computed: {
    // 获取播放列表信息
    getid() {
      this.song = JSON.parse(sessionStorage.getItem("songid"));
      this.length = this.song.length;
      for (let i = 0; i < this.length; i++) {
        let playid = this.song[i];
        this.axios.get("/song/detail?ids=" + playid).then(res => {
          this.detail.push({
            name: res.data.songs[0].name,
            id: res.data.songs[0].id
          });
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