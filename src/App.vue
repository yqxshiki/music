<template>
  <div id="app">
    <appfooter v-show="footer" v-if="showfooter" />
    <audio
      class="audio"
      ref="audio"
      loop
      @timeupdate="onTimeupdate"
      @loadedmetadata="onLoadedmetadata"
    ></audio>
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
      footer: true,
      showfooter: true
    };
  },
  // 提供可注入子组件属性
  provide() {
    return {
      reload: this.reload,
      iffooter: this.iffooter,
      playaudio(id) {
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
                audio.play();
                playicon.innerHTML = "&#xe68e;";
                this.$toast.success("开始播放");
                // 数字变成字符串
                let gid = id.toString();
                //把播放过的歌曲id 存入localStorage
                //防止页面刷新后vuex里面的数据消失
                if (this.$store.state.songid.length == 0) {
                  this.$store.state.songid = JSON.parse(
                    localStorage.getItem("songid")
                  );
                }
                //点击同一首歌，不添加
                if (this.$store.state.songid.indexOf(gid) == -1) {
                  this.$store.state.songid.push(gid);
                  let songid = JSON.stringify(this.$store.state.songid);
                  localStorage.setItem("songid", songid);
                }
                this.iffooter();
              } else {
                audio.pause();
                playicon.innerHTML = "&#xe612;";
                this.$toast.fail("暂停播放");
              }
            }
          }
        }, 600);
      }
    };
  },
  methods: {
    onTimeupdate(res) {},
    // 获取歌曲总时长
    onLoadedmetadata(res) {},
    // 刷新主页面
    reload() {
      this.isShow = false;
      // $nextTick() 将回调延迟到下次 DOM 更新循环之后执行
      this.$nextTick(() => {
        this.isShow = true;
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
    this.footer = this.$store.state.footer;
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
