<template>
  <div id="display">
    <div class="red">
      <navigation :title="title" />
    </div>

    <form>
      <van-search
        v-model="value"
        placeholder="请输入搜索关键词"
        show-action
        @search="onSearch(value)"
        @cancel="onCancel"
      />
    </form>
    <div class="title">
      <span class="danqu">单曲</span>
    </div>
    <!-- 展示 -->
    <div class="warp" v-for="(item,index) in songarr" :key="index">
      <div class="searchsong" @click="play(item.id)">
        <div class="name">{{item.name}}</div>
        <div class="songer">{{item.artists[0].name}}--{{item.album.name}}</div>
      </div>
      <div class="details">
        <router-link :to="'/songdetail/'+item.id">
          <van-icon name="ellipsis" class="ellipsis" />
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import navigation from "../Common/Navigation";
export default {
  name: "display",
  components: {
    navigation
  },
  data() {
    return {
      title: "搜索",
      songarr: [],
      value: ""
    };
  },
  inject: ["iffooter", "playaudio"],
  methods: {
    //   从其余地方搜索的结果
    getsongs(value) {
      this.axios.get("/search?keywords=" + value).then(res => {
        this.songarr = res.data.result.songs;
      });
    },
    // 搜索结果
    onSearch(value) {
      if (this.vaule == "") {
        console.log("kong");
      } else {
        this.axios.get("/search?keywords=" + value).then(res => {
          this.songarr = res.data.result.songs;
        });
      }
    },
    onCancel() {
      this.vaule = "";
    },
    goreturn() {
      this.$router.go(-1);
    },
    // 音乐url
    getsongurl(id) {
      this.axios.get("/song/url?id=" + id).then(res => {
        this.$store.state.src = res.data.data[0].url;
      });
    },
    play(id) {
      this.getsongurl(id);
      this.playaudio(id);
    }
  },
  mounted() {
    this.getsongs(this.$route.params.vaule);
  }
};
</script>
<style scoped>
.red {
  border-bottom: 2px solid red;
}
.title {
  font-weight: bold;
  width: 100%;
  font-size: 1rem;
  border-bottom: 2px solid #ccc;
}
.danqu {
  margin: 2rem;
  text-shadow: 0 5px 5px #aaa;
}
/* 搜索到的结果 */
.warp {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid black;
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