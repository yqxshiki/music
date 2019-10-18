<template>
  <div id="display">
    <div class="search">
      <van-icon name="arrow-left" @click="goreturn" />
      <input type="text" placeholder="请输入你想要搜索的内容" v-model="vaule" @click="getsearch(vaule)" />
      <van-icon name="cross" @click="clean" class="cross" />
    </div>
    <div class="title">
      <span class="danqu">单曲</span>
    </div>
    <!-- 展示 -->
    <div class="warp" v-for="(item,index) in songarr" :key="index">
      <div class="searchsong" @click="playaudio(item.id)">
        <audio class="audio" :src="audio.url"></audio>
        <div class="name">{{item.name}}</div>
        <div class="songer">{{item.artists[0].name}}--{{item.album.name}}</div>
      </div>
      <div class="details">
        <van-icon name="ellipsis" class="ellipsis" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "display",
  data() {
    return {
      songarr: [],
      vaule: "",
      audio: []
    };
  },
  methods: {
    //   从其余地方搜索的结果
    getsongs(value) {
      this.axios.get("/search?keywords=" + value).then(res => {
        // console.log(res);
        this.songarr = res.data.result.songs;
      });
    },
    // 搜索结果
    getsearch(value) {
      if (this.vaule == "") {
        console.log("kong");
      } else {
        this.axios.get("/search?keywords=" + value).then(res => {
          //   console.log(res);
          this.songarr = res.data.result.songs;
        });
      }
    },
    clean() {
      this.vaule = "";
    },
    goreturn() {
      this.$router.go(-1);
    },
    // 音乐url
    getsongurl(id) {
      this.axios.get("/song/url?id=" + id).then(res => {
        // console.log(res);
        this.audio = res.data.data[0];
        // console.log(this.audio);
      });
    },
    playaudio(id) {
      this.getsongurl(id);
      let audio = document.getElementsByClassName("audio")[0];
      if (audio !== null) {
        //检测播放是否已暂停.audio.paused 在播放器播放时返回false.
        console.log(audio.paused);
        if (audio.paused) {
          audio.play(); //audio.play();// 这个就是播放
        } else {
          audio.pause(); // 这个就是暂停
        }
      }
    }
  },
  mounted() {
    this.getsongs(this.$route.params.vaule);
  }
};
</script>
<style scoped>
/* 搜索 */
.search {
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.input {
  border: none;
  background: #ccc;
}
.title {
  font-weight: bold;
  width: 100%;
  font-size: 1rem;
  margin-top: 1rem;
  border-bottom: 2px solid #ccc;
}
.danqu {
  margin: 2rem;
}
/* 搜索到的结果 */
.warp {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.warp:hover {
  background: linear-gradient(45deg, #f40, skyblue);
}
.searchsong {
  margin: 1rem;
  flex: 8;
}
.name {
  font-size: 0.8rem;
  font-weight: 200;
  color: red;
}
.songer {
  font-size: 0.2rem;
  opacity: 0.6;
}
/* icon */
.details {
  font-size: 1.2rem;
  flex: 2;
  color: rosybrown;
}
.ellipsis {
  margin-left: 1rem;
}
</style>