<template>
  <div id="songdetail">
    <van-nav-bar :title="title" left-text="首页" left-arrow @click-left="onClickLeft" />
    <div class="wrap">
      <div class="ul" ref="ul">
        <p class="p" ref="p" v-for="(item,index) in word" :key="index">{{item.words}}</p>
      </div>
    </div>
    <div class="progressbar" @click="click">
      <van-progress color="#ee0a24" :percentage="playtime" :show-pivot="false" />
    </div>
    <div class="bottom">
      <i class="iconfont" @click="before">&#xe698;</i>
      <i class="iconfont" @click="play" ref="iconfont">&#xe68e;</i>
      <i class="iconfont" @click="next">&#xe611;</i>
    </div>
  </div>
</template>

<script>
export default {
  name: "songdetail",
  data() {
    return {
      word: [],
      songarr: [],
      i: "",
      // 歌曲名
      title: "",
      // 进度条
      playtime: 0
    };
  },
  inject: ["reload", "playaudio"],
  methods: {
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
      let playtime = this.$store.state.audio.currentTime;
      for (var i = this.songarr.length - 1; i > 0; i--) {
        var liobject = this.songarr[i];
        if (playtime >= liobject.time) {
          return i;
        }
      }
      return -1;
    },
    setroll() {
      // 动态添加class
      let index = this.getindex();
      let ul = document.querySelector(".ul");
      let p = document.querySelector(".active");
      if (p) {
        p.className = "";
      }
      if (index !== -1) {
        ul.children[index].className = "active";
      }
      // 歌词滚动
      let config = {
        ulheight: 500,
        liheight: 33
      };
      var midHeight = config.ulheight / 2 - config.liheight / 2;
      var margintop = midHeight - index * config.liheight;

      if (margintop > 0) {
        margintop = 0;
      }
      ul.style.marginTop = margintop + "px";
    },
    // 移动进度条
    click(res) {
      let audio = document.getElementsByClassName("audio")[0];
      // 当前点击距离
      let clicktime = res.clientX;
      // 进度条距离
      this.playtime = parseInt((clicktime / 375) * 100);
      // 更新播放时间
      audio.currentTime = parseInt(
        (this.playtime * this.$store.state.audio.maxTime) / 100
      );
      this.setroll();
    },
    // 播放
    play(e) {
      let audio = document.getElementsByClassName("audio")[0];
      if (audio !== null) {
        //检测播放是否已暂停
        if (audio.paused) {
          let playpromise = audio.play();
          if (playpromise) {
            playpromise
              .then(() => {
                setTimeout(() => {
                  e.target.innerHTML = "&#xe68e;";
                  this.$toast.success("开始播放");
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
        } else {
          audio.pause(); // 这个就是暂停
          e.target.innerHTML = "&#xe612;";
          this.$toast.fail("暂停播放");
        }
      }
    },
    //上一曲
    before() {
      let audio = document.getElementsByClassName("audio")[0];
      audio.pause();
      let nowid = JSON.parse(sessionStorage.getItem("current"));
      let number = this.$store.state.songid.indexOf(nowid);
      let song = JSON.parse(sessionStorage.getItem("song"));
      if (number == 1) {
        number = song.length - 1;
      } else {
        number = number - 1;
      }
      let id = Number(this.$store.state.songid[number]);
      setTimeout(() => {
        this.getsongurl(id);
        this.getdetail(id);
        this.playaudio(id, song);
        this.getword(id);
        this.$store.state.showfooter = false;
      }, 1000);
    },
    // 下一曲
    next() {
      let audio = document.getElementsByClassName("audio")[0];
      audio.pause();
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
        this.getdetail(id);
        this.playaudio(id, song);
        this.getword(id);
        this.$store.state.showfooter = false;
      }, 1000);
    },
    // 音乐url
    getsongurl(id) {
      this.axios.get("/song/url?id=" + id).then(res => {
        this.$store.state.src = res.data.data[0].url;
      });
    },
    // 返回首页
    onClickLeft() {
      this.$router.push("/sheet");
    },
    // 获取歌名
    getdetail(id) {
      this.axios.get("/song/detail?ids=" + id).then(res => {
        this.title = res.data.songs[0].name;
      });
    }
  },
  mounted() {
    this.getword(this.$route.params.id);
    this.getdetail(this.$route.params.id);
    let audio = document.getElementsByClassName("audio")[0];
    if (audio.paused == false) {
      this.$refs.iconfont.innerHTML = "&#xe68e;";
    } else {
      this.$refs.iconfont.innerHTML = "&#xe612;";
    }
    const timer = setInterval(() => { 
      this.setroll();
      this.playtime = this.$store.state.playtime;
    }, 1600);
    // 销毁
    this.$once("hook:beforeDestroy", () => {
      clearInterval(timer);
    });
  }
};
</script>
<style scoped>
.van-nav-bar__title {
  color: red;
}
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
.ul {
  transition: 0.7s;
}
p {
  padding-top: 10px;
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
    background-position: left 800px top 0px;
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