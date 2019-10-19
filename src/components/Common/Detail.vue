<template>
  <div id="detail">
    <div class="loading" v-show="isloading">
      <van-loading type="spinner" color="#1989fa" />
      <div class="jiazai">加载中</div>
    </div>

    <div class="show" v-show="isshow">
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
            <div class="name">{{item.name}}</div>
            <div class="songer">{{item.ar[0].name}}--{{item.al.name}}</div>
          </div>
          <van-icon name="ellipsis" class="ellipsis" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { setTimeout } from "timers";
export default {
  name: "detail",
  data() {
    return {
      details: [],
      song: [],
      audio: [],
      isshow: false,
      isloading: true
    };
  },
  methods: {
    // 歌单详情
    getdetails(id) {
      this.axios.get("/playlist/detail?id=" + id).then(res => {
        //   console.log(res);
        this.details = res.data.playlist;
        this.song = res.data.playlist.tracks;
      });
    },
    getword(id) {
      this.axios.get("/lyric?id=" + id).then(res => {
        // console.log(res);
      });
    },
    // 音乐url
    getsongurl(id) {
      this.axios.get("/song/url?id=" + id).then(res => {
        // console.log(res);
        this.audio = res.data.data[0];
        this.getword(id);
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
          this.$notify({ type: "success", message: "开始播放" });
        } else {
          audio.pause(); // 这个就是暂停
          this.$notify({ type: "danger", message: "停止播放" });
        }
      }
    },
    onload() {
      if (this.details == "") {
        return;
      } else {
        this.isshow = true;
        this.isloading = false;
      }
    }
  },
  mounted() {
    this.getdetails(this.$route.params.id);
    if (this.details == "") {
      setInterval(() => {
        this.onload();
      });
    } else {
      return;
    }
  }
};
</script>
<style scoped>
.loading {
  position: absolute;
  left: 2%;
  right: 0;
  top: 50%;
  bottom: 0;
  font-size: 2rem;
  text-align: center;
  color: red;
}
.jiazai {
  font-size: 1.4rem;
}
.gedan {
  display: flex;
  justify-content: space-around;
  align-items: center;
  text-align: center;
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
/* 歌曲 */
.song {
  margin-top: 1rem;
  width: 100%;
  background: linear-gradient(right, skyblue, rgb(201, 131, 131));
  border-radius: 1rem;
}
.play {
  font-size: 1rem;
  text-indent: 1rem;
}
.van-icon-bar-chart-o {
  font-size: 1.2rem;
  margin-left: 2rem;
}
.list {
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-align: center;
  width: 100%;
  height: 3rem;
  margin-top: 2rem;
  border-radius: 1rem;
}
.list:hover {
  background: rgb(202, 201, 219);
}
.van-icon {
  color: #000;
  flex: 2;
}
.id {
  flex: 2;
  font-size: 0.3rem;
  margin-left: 1rem;
}
.list .audio {
  flex: 6;
}
.dansong {
  font-size: 0.1rem;
  flex: 6;
}
.dansong .name {
  font-size: 0.6rem;
  color: #000;
}
.songer {
  color: #555;
  opacity: 0.8;
  margin-top: 0.4rem;
}
.ellipsis {
  margin-left: 1rem;
  font-size: 1.2rem;
}
</style>