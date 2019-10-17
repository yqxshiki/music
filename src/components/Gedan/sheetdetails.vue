<template>
  <div id="sheetid">
    <div class="wrap">
      <van-nav-bar title="歌单" left-arrow>
        <van-icon name="search" slot="right" />
      </van-nav-bar>
      <!-- 图片描述 -->
      <div class="gedan">
        <img :src="details.coverImgUrl" alt />
        <div class="description">{{details.name}}</div>
      </div>
      <!-- 操作 -->
      <div class="operation">
        <div class="icon">
          <i class="iconfont">&#xe607;</i>
          <div class="iconwenzi">收藏</div>
        </div>
        <div class="icon">
          <i class="iconfont">&#xe608;</i>
          <div class="iconwenzi">评论</div>
        </div>
        <div class="icon">
          <i class="iconfont">&#xe60b;</i>
          <div class="iconwenzi">分享</div>
        </div>
        <div class="icon">
          <i class="iconfont">&#xe87b;</i>
          <div class="iconwenzi">下载</div>
        </div>
      </div>
      <!-- 歌曲 -->
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
  </div>
</template>

<script>
export default {
  name: "sheetid",
  data() {
    return {
      details: [],
      song: [],
      audio: [],
      key: 0
    };
  },
  methods: {
    // 歌单详情
    getdetails(id) {
      this.axios.get("/playlist/detail?id=" + id).then(res => {
        //   console.log(res);
        this.details = res.data.playlist;
        this.song = res.data.playlist.tracks;
        // console.log(this.song);
      });
    },
    // 音乐url
    getsongurl(id) {
      this.axios.get("/song/url?id=" + id).then(res => {
        console.log(res);
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
    this.getdetails(this.$route.params.id);
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
/* icon */
.operation {
  display: flex;
  justify-content: space-around;
}
.iconwenzi {
  font-size: 0.6rem;
}
@font-face {
  font-family: "iconfont"; /* project id 1462857 */
  src: url("//at.alicdn.com/t/font_1462857_f8a67uylg6.eot");
  src: url("//at.alicdn.com/t/font_1462857_f8a67uylg6.eot?#iefix")
      format("embedded-opentype"),
    url("//at.alicdn.com/t/font_1462857_f8a67uylg6.woff2") format("woff2"),
    url("//at.alicdn.com/t/font_1462857_f8a67uylg6.woff") format("woff"),
    url("//at.alicdn.com/t/font_1462857_f8a67uylg6.ttf") format("truetype"),
    url("//at.alicdn.com/t/font_1462857_f8a67uylg6.svg#iconfont") format("svg");
}
.iconfont {
  font-family: "iconfont" !important;
  font-size: 1.6rem;
  font-style: normal;
  color: #000;
  -webkit-font-smoothing: antialiased;
  -webkit-text-stroke-width: 0.2px;
  -moz-osx-font-smoothing: grayscale;
}
/* 歌曲 */
.song {
  margin: 1rem;
}
.play {
  font-size: 0.8rem;
}
.list {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 2rem;
  margin: 1rem;
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