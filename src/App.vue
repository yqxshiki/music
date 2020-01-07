<template>
  <div id="app">
    <appfooter v-if="showfooter" />
    <audio class="audio" ref="audio" @timeupdate="onTimeupdate" @loadedmetadata="onLoadedmetadata"></audio>
    <router-view v-if="isShow"></router-view>
  </div>
</template>

<script>
import appfooter from "./components/Footer";
export default {
  name: "app",
  components: {
    appfooter
  },
  data() {
    return {
      isShow: true,
      showfooter: false
    };
  },
  // 提供可注入子组件属性
  provide() {
    return {
      reload: this.reload,
      iffooter: this.iffooter,
      playaudio: this.playaudio
    };
  },
  methods: {
    // 记录播放时间
    onTimeupdate(res) {
      this.$store.state.audio.currentTime = res.target.currentTime;
      this.$store.state.playtime = parseInt(
        (this.$store.state.audio.currentTime /
          this.$store.state.audio.maxTime) *
          100
      );
      // 顺序播放
      if (
        this.$store.state.audio.currentTime >= this.$store.state.audio.maxTime
      ) {
        let nowid = JSON.parse(sessionStorage.getItem("current"));
        let number = this.$store.state.songid.indexOf(nowid);
        let song = JSON.parse(sessionStorage.getItem("song"));
        if (number == song.length - 1) {
          number = 0;
        } else {
          number = number + 1;
        }
        let id = Number(this.$store.state.songid[number]);
        setTimeout(() => {
          this.getsongurl(id);
          this.playaudio(id, song);
          setTimeout(() => {
            this.iffooter();
            this.reload();
          },600);
        }, 1000);
      }
    },
    // 获取歌曲总时长
    onLoadedmetadata(res) {
      this.$store.state.audio.maxTime = parseInt(res.target.duration);
    },
    playaudio(id, song) {
      setTimeout(() => {
        let audio = document.getElementsByClassName("audio")[0];
        let playicon = document.getElementById("playicon");
        // 同一次点击时,根据状态是否播放
        if (audio.src == this.$store.state.src) {
          if (audio.paused) {
            audio.play();
            playicon.innerHTML = "&#xe68e;";
            this.$toast.success("开始播放");
          } else {
            audio.pause();
            playicon.innerHTML = "&#xe612;";
            this.$toast.fail("暂停播放");
          }
        } else {
          audio.src = this.$store.state.src;
          if (audio !== null) {
            if (audio.paused) {
              let playpromise = audio.play();
              if (playpromise) {
                playpromise
                  .then(() => {
                    setTimeout(() => {
                      if (this.$store.state.showfooter === true) {
                        playicon.innerHTML = "&#xe68e;";
                        this.$toast.success("开始播放");
                      }
                    }, 2000);
                  })
                  .catch(err => {
                    console.log(err);
                    this.$notify({
                      type: "danger",
                      message: "该资源无法加载,请选择别的歌曲"
                    });
                  });
              }
              // 数字变成字符串
              let gid = id.toString();
              //每次点击播放都去除当前播放列表
              sessionStorage.removeItem("songid");
              this.$store.state.songid = [];
              // 把当前播放的歌单存入到vuex 显示到播放列表
              sessionStorage.setItem("song", JSON.stringify(song));
              let songlist = song.map((item, index, arr) => {
                return item.id.toString();
              });
              let list = songlist.map((item, index, arr) => {
                this.$store.state.songid.push(item);
              });
              let songid = JSON.stringify(this.$store.state.songid);
              sessionStorage.setItem("songid", songid);

              // 保存播放的id
              this.$store.state.current = gid;
              let current = JSON.stringify(this.$store.state.current);
              sessionStorage.setItem("current", current);
              if (this.$store.state.showfooter === true) {
                this.iffooter();
              }
            } else {
              audio.pause();
              playicon.innerHTML = "&#xe612;";
              this.$toast.fail("暂停播放");
            }
          }
        }
      }, 1000);
    },
    reload() {
      this.isShow = false;
      // $nextTick() 将回调延迟到下次 DOM 更新循环之后执行
      this.$nextTick(() => {
        this.isShow = true;
      });
    },
    // 音乐url
    getsongurl(id) {
      this.axios.get("/song/url?id=" + id).then(res => {
        this.$store.state.src = res.data.data[0].url;
      });
    },
    // 刷新footer
    iffooter() {
      this.showfooter = false;
      this.$nextTick(() => {
        this.showfooter = true;
      });
    }
  },
  updated() {
    this.showfooter = this.$store.state.showfooter;
  }
};
</script>

<style>
.bottom {
  width: 100%;
  height: 60px;
  position: fixed;
  bottom: 0;
}
a {
  color: #000;
}
@font-face {
  font-family: "iconfont"; /* project id 1462857 */
  src: url("//at.alicdn.com/t/font_1462857_mp8rtqz0oba.eot");
  src: url("//at.alicdn.com/t/font_1462857_mp8rtqz0oba.eot?#iefix")
      format("embedded-opentype"),
    url("//at.alicdn.com/t/font_1462857_mp8rtqz0oba.woff2") format("woff2"),
    url("//at.alicdn.com/t/font_1462857_mp8rtqz0oba.woff") format("woff"),
    url("//at.alicdn.com/t/font_1462857_mp8rtqz0oba.ttf") format("truetype"),
    url("//at.alicdn.com/t/font_1462857_mp8rtqz0oba.svg#iconfont") format("svg");
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
</style>
