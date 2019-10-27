<template>
  <div id="songdetail">
    <navigation :title="title" />
    <div class="wrap">
      <div class="ul" ref="ul">
        <div class="word" ref="word" v-for="(item,index) in word" :key="index">
          <p ref="p">{{item.words}}</p>
        </div>
      </div>
    </div>
    <div class="progressbar" @click="click">
      <van-progress color="#ee0a24" :percentage="playtime" :show-pivot="false" />
    </div>
    <audio
      class="audio"
      ref="audios"
      loop="loop"
      :src="audiourl.url"
      @timeupdate="onTimeupdate"
      @loadedmetadata="onLoadedmetadata"
    ></audio>
    <div class="bottom">
      <i class="iconfont">&#xe698;</i>
      <i class="iconfont" @click="playaudio">&#xe612;</i>
      <i class="iconfont">&#xe611;</i>
    </div>
  </div>
</template>

<script>
import navigation from "./Navigation";
export default {
  name: "songdetail",
  components: {
    navigation
  },
  data() {
    return {
      title: "歌词",
      word: [],
      songarr: [],
      audiourl: "",
      i: "",
      audio: {
        currentTime: 0,
        maxTime: 0,
        minTime: 0
      },
      // 进度条
      playtime: 0
    };
  },
  methods: {
    // 音乐url
    getsongurl(id) {
      this.axios.get("/song/url?id=" + id).then(res => {
        this.audiourl = res.data.data[0];
      });
    },
    getword(id) {
      this.axios
        .get("/lyric?id=" + id)
        .then(res => {
          let wordarr = res.data.lrc.lyric;
          this.songarr = wordarr.split("\n"); //变为数组
          for (let i = 0; i < this.songarr.length; i++) {
            let str = this.songarr[i];
            this.songarr[i] = this.createobject(str);
          }
          this.word = this.songarr;
        })
        .catch(err => {
          this.$toast.fail("当前没有歌词");
        });
    },
    // 转化为单句对象
    createobject(str) {
      let object = str.split("]");
      let time = object[0];
      let words = object[1];
      time = time.replace("[", ""); //去掉左边的[
      // 时间化为秒
      let times = time.split(":");
      var minute = times[0];
      var second = times[1];
      time = parseInt(minute * 60) + parseFloat(second);
      return {
        time: time,
        words: words
      };
    },
    getindex() {
      // 获取当前播放时间
      let playtime = this.$refs.audios.currentTime;
      let playtimes = playtime + 0.7;
      for (var i = this.songarr.length - 1; i > 0; i--) {
        var liobject = this.songarr[i];
        if (playtimes >= liobject.time) {
          return i;
        }
      }
      return -1;
    },
    setroll() {
      // 动态添加class
      let index = this.getindex();
      let ul = document.querySelector(".ul");
      let p = ul.querySelector(".active");
      if (p) {
        p.className = "";
      }
      if (index !== -1) {
        this.$refs.p[index].className = "active";
      }
      // 歌词滚动
      let config = {
        ulheight: 500,
        liheight: 44
      };
      var midHeight = config.ulheight / 2 - config.liheight / 2;
      var margintop = midHeight - index * config.liheight;

      if (margintop > 0) {
        margintop = 0;
      }
      this.$refs.ul.style.marginTop = margintop + "px";
    },
    // 更新进度条
    onTimeupdate(res) {
      // 播放时间
      this.audio.currentTime = res.target.currentTime;
      this.setroll();
      // 更新进度条距离
      this.playtime = parseInt(
        (this.audio.currentTime / this.audio.maxTime) * 100
      );
    },
    // 获取歌曲总时长
    onLoadedmetadata(res) {
      this.audio.maxTime = parseInt(res.target.duration);
    },
    // 移动进度条
    click(res) {
      // 当前点击距离
      let clicktime = res.clientX;
      // 进度条距离
      this.playtime = parseInt((clicktime / 375) * 100);
      // 更新播放时间
      this.$refs.audios.currentTime = parseInt(
        (this.playtime / 100) * this.audio.maxTime
      );
      this.setroll();
    },
    // 播放
    playaudio(e) {
      let audio1 = document.getElementsByClassName("audio")[0];
      audio1.pause();
      let audio = document.getElementsByClassName("audio")[1];
      if (audio !== null) {
        //检测播放是否已暂停.audio.paused 在播放器播放时返回true
        if (audio.paused) {
          let playpromise = audio.play();
          if (playpromise == undefined) {
            playpromise
              .then(() => {
                audio.play();
              })
              .catch(err => {
                console.log(err);
              });
          }
          e.target.innerHTML = "&#xe68e;";
          this.$toast.success("开始播放");
          //把播放过的歌曲id 存入localStorage
          //防止页面刷新后vuex里面的数据消失
          if (this.$store.state.songid.length == 0) {
            this.$store.state.songid = JSON.parse(
              localStorage.getItem("songid")
            );
          }
          //点击同一首歌，不添加
          if (this.$store.state.songid.indexOf(this.$route.params.id) == -1) {
            this.$store.state.songid.push(this.$route.params.id);
            let songid = JSON.stringify(this.$store.state.songid);
            localStorage.setItem("songid", songid);
          }
        } else {
          audio.pause(); // 这个就是暂停
          e.target.innerHTML = "&#xe612;";
          this.$toast.fail("暂停播放");
        }
      }
    }
  },
  mounted() {
    this.getsongurl(this.$route.params.id);
    this.getword(this.$route.params.id);
  },
  beforeRouteLeave(to, from, next) {
    // 退出前关闭播放
    if (this.$refs.audios.paused == false) {
      this.$refs.audios.pause();
    }
    // 防止在退出时,还在调用currentTime
    setTimeout(() => {
      this.$store.state.footer = true;
      next();
    }, 100);
  }
};
</script>
<style scoped>
#songdetail {
  width: 100%;
  height: 100vh;
  background: rgb(219, 203, 203);
}
.wrap {
  text-align: center;
  opacity: 0.6;
  font-size: 0.8rem;
  width: 100%;
  height: 500px;
  overflow-x: hidden;
}
.word {
  padding-top: 10px;
}
.ul {
  transition: 0.7s;
}
.active {
  font-size: 1.2rem;
  color: #2c3e5036;
  background-image: url("../../assets/wenzi.jpeg");
  background-clip: text;
  -webkit-background-clip: text;
  animation: change 3s infinite;
}
@keyframes change {
  0% {
    background-position: left 0 top 0px;
  }

  100% {
    background-position: left 400px top 0px;
  }
}
/* 进度条 */
.progressbar {
  margin: 2rem auto;
}
/* 按钮 */
.bottom {
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.bottom i {
  font-size: 3rem;
  color: skyblue;
  cursor: pointer;
  z-index: 10000;
}
i:hover {
  background: #555;
  opacity: 0.6;
  transition: 0.7s;
}
</style>