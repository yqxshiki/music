<template>
  <div id="rankdetail">
    <!-- 图片描述 -->
    <div class="gedan">
      <img :src="details.coverImgUrl" alt />
      <div class="description">{{details.name}}</div>
    </div>
    <div class="song">
      <van-row type="flex" justify="space-between">
        <van-col span="18">
          <div class="play">
            <span>播放全部</span>
            <span>(共{{details.trackCount}}首)</span>
          </div>
        </van-col>
        <van-col span="6">
          <van-icon name="bar-chart-o" />
        </van-col>
      </van-row>

      <div class="list" v-for="(item,index) in song" :key="index">
        <div class="id">{{index+1}}</div>

        <div class="dansong" @click="playaudio(item.id)">
          <audio class="audio" :src="audio.url"></audio>
          <div class="name">{{item.al.name}}</div>
          <div class="songer">{{item.ar[0].name}}</div>
        </div>
        <van-icon name="ellipsis" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "rankdetail",
  data() {
    return {
      details: [],
      song: [],
      audio: [],
      key: 0
    };
  },
  methods: {
    getsong(id) {
      this.axios.get("/playlist/detail?id=" + id).then(res => {
        // console.log(res);
        this.details = res.data.playlist;
        // console.log(this.details);
        this.song = res.data.playlist.tracks;
      });
    },
    // 音乐url
    getsongurl(id) {
      this.axios.get("/song/url?id=" + id).then(res => {
        // console.log(res);
        this.audio = res.data.data[0];
      });
    },
    playaudio(id) {
      this.getsongurl(id);
      let audio = document.getElementsByClassName("audio")[0];
      this.key++;
      // 播放
      if ((this.key = 1)) {
        audio.play();
      }
      // 暂停
      if (this.key == 2) {
        audio.pause();
        this.key = 0;
      }
    }
  },
  mounted() {
    this.getsong(this.$route.params.id);
  }
};
</script>
<style scoped>
.gedan {
  display: flex;
  justify-content: space-around;
  align-items: center;
  text-align: center;
  /* border-radius: 1rem; */
}
.gedan img {
  height: 7rem;
}
.description {
  font-size: 0.1rem;
}
.song {
  margin-top: 1rem;
  width: 100%;
  background: linear-gradient(right, skyblue, rgb(201, 131, 131));
}
.play {
  font-size: 0.8rem;
}
.list {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 2rem;
  margin: 1rem;
}
.list:hover {
  background: #fff;
}
.van-icon {
  color: #000;
  flex: 2;
}
.id {
  flex: 2;
  font-size: 0.3rem;
}
.list .audio {
  flex: 6;
}
.dansong {
  font-size: 0.1rem;
  flex: 6;
}
.dansong .name {
  font-size: 0.8rem;
  color: #000;
}
.songer {
  color: #555;
  opacity: 0.6;
}
</style>