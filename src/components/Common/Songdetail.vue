<template>
  <div id="songdetail">
    <navigation :title="title" />
    <div class="wrap">
      <div class="word" v-for="(item,index) in word" :key="index">
        <div class="contain">
          <p>{{item.words}}</p>
        </div>
      </div>
    </div>
    <audio class="audio" :src="audio.url" @ontimeupdate="ends()"></audio>
    <div class="bottom">
      <i class="iconfont">&#xe698;</i>
      <i class="iconfont" @click="playaudio">&#xe612;</i>
      <i class="iconfont">&#xe611;</i>
    </div>
  </div>
</template>

<script>
import navigation from "./Navigation";
import lyric from "lyric-parser";
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
      audio: "",
      i: ""
    };
  },
  methods: {
    // 音乐url
    getsongurl(id) {
      this.axios.get("/song/url?id=" + id).then(res => {
        this.audio = res.data.data[0];
      });
    },
    getword(id) {
      this.axios.get("/lyric?id=" + id).then(res => {
        let wordarr = res.data.lrc.lyric;
        this.songarr = wordarr.split("\n"); //变为数组
        for (let i = 0; i < this.songarr.length; i++) {
          let str = this.songarr[i];
          this.songarr[i] = this.createobject(str);
        }
        this.word = this.songarr;
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
      let audio = document.getElementsByClassName("audio")[0];
      // 获取当前播放时间
      let playtime = this.audio.currentTime;
      console.log(playtime);
      for (var i = this.songarr.length - 1; i > 0; i--) {
        var liobject = this.songarr[i];
        if (playtime >= liobject.time) {
          return i;
        }
      }
      return  1;
    },
    setroll() {
      let index=this.getindex();
      let wrap = document.querySelector(".wrap");
      var p = wrap.querySelector(".active");
      if (p) {
        p.className = "";
      }
      if (index !== -1) {
        wrap.children[index].classList.add(active);
      }
      wrap.style.marginTop = 40 + "px";
    },
    ends() {
      this.setroll();
      console.log(1);
    },
    playaudio(e) {
      let audio = document.getElementsByClassName("audio")[0];
      if (audio !== null) {
        //检测播放是否已暂停.audio.paused 在播放器播放时返回false.
        // console.log(audio.paused);
        if (audio.paused) {
          audio.play(); //audio.play();// 这个就是播放
          e.target.innerHTML = "&#xe68e;";
          this.$toast.success("开始播放");
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
  }
};
</script>
<style scoped>
.wrap {
  text-align: center;
  opacity: 0.6;
  font-size: 0.8rem;
  width: 100%;
  height: 500px;
  overflow: hidden;
}
.active {
  color: #f40;
  font-size: 1rem;
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
}
</style>