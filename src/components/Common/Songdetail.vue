<template>
  <div id="songdetail">
    <div class="wrap">
      <div class="word" v-for="(item,index) in word" :key="index">
        <p>{{item.words}}</p>
      </div>
    </div>
    <div class="bottom">
      <i class="iconfont">&#xe698;</i>
      <i class="iconfont">&#xe612;</i>
      <i class="iconfont">&#xe611;</i>
      <i class="iconfont">&#xe61e;</i>
    </div>
  </div>
</template>

<script>
import lyric from "lyric-parser";
export default {
  name: "songdetail",
  data() {
    return {
      word: []
    };
  },
  methods: {
    getword(id) {
      this.axios.get("/lyric?id=" + id).then(res => {
        // console.log(res);
        let wordarr = res.data.lrc.lyric;
        let songarr = wordarr.split("\n"); //变为数组
        for (let i = 0; i < songarr.length; i++) {
          let str = songarr[i];
          songarr[i] = this.createobject(str);
        }
        this.word = songarr;
        this.getindex();
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
      let playtime = audio.currentTime;
      for (var i = this.songarr.length - 1; i > 0; i--) {
        var liobject = this.songarr[i];
        // console.log(liobject.time);
        if (playtime >= liobject.time) {
          this.i = i;
        }
      }
    }
  },
  mounted() {
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
}
i:hover {
  background: #555;
  opacity: 0.6;
}
</style>