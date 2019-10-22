<template>
  <div id="sheet">
    <div class="pic">
      <van-swipe :autoplay="3000">
        <van-swipe-item v-for="(image, index) in pic" :key="index">
          <img v-lazy="image.pic" />
        </van-swipe-item>
      </van-swipe>
    </div>
    <div class="title">推荐歌单</div>
    <div class="wrap">
      <div class="list" v-for="(item,index) in sheetarray" :key="index">
        <div class="img">
          <div class="count">
            <van-icon name="service-o" />
            :
            {{item.playCount}}
          </div>
          <router-link :to="'/sheet/'+item.id">
            <img v-lazy="item.coverImgUrl" />
          </router-link>
          <div class="describe">{{item.name}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "sheet",
  data() {
    return {
      pic: [],
      sheetarray: []
    };
  },
  methods: {
    getsheet() {
      this.axios.get("/top/playlist").then(res => {
        // console.log(res.data);
        this.sheetarray = res.data.playlists;
      });
    },
    getpic() {
      this.axios.get("/banner?type=1").then(res => {
        // console.log(res);
        this.pic = res.data.banners;
      });
    }
  },
  mounted() {
    this.getsheet();
    this.getpic();
  }
};
</script>
<style scoped>
/* 轮播图 */
.pic {
  margin-top: -55px;
  background: rgb(210, 69, 55);
  height: 10rem;
}
.pic img {
  width: 85%;
  height: 9rem;
  margin-top: 1rem;
  margin-left: 1.5rem;
}
.title {
  font-size: 1rem;
  border-left: 4px solid red;
  margin: 1rem;
  font-weight: bolder;
  text-indent: 1rem;
}
/* 歌单 */
.wrap {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
}
.list {
  width: 40%;
}
.img {
  position: relative;
}
.img img {
  width: 8rem;
  margin: 0.6rem;
}
/* 描述 */
.describe {
  font-size: 0.01rem;
  color: rgb(40, 46, 46);
  text-shadow: 0 5px 5px red;
}
/* 播放量 */
.count {
  font-size: 0.5rem;
  position: absolute;
  right: 20px;
  top: 10px;
  color: #ffffff;
}
.count img {
  border-radius: 1rem;
}
</style>