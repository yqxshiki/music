<template>
  <div id="sheet">
    <div class="title">全部歌单</div>
    <div class="wrap">
      <div class="list" v-for="(item,index) in sheetarray" :key="index">
        <div class="img">
          <div class="count">
            <van-icon name="service-o" />
            :
            {{item.playCount}}
          </div>
          <router-link :to="'/sheet/'+item.id">
            <img :src="item.coverImgUrl" alt />
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
      sheetarray: []
    };
  },
  methods: {
    getsheet() {
      this.axios.get("/top/playlist").then(res => {
        // console.log(res.data);
        this.sheetarray = res.data.playlists;
      });
    }
  },
  mounted() {
    this.getsheet();
  }
};
</script>
<style scoped>
.title {
  font-size: 1rem;
  border-left: 4px solid red;
  margin: 1rem;
}

/* 歌单 */
.wrap {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
}
.list {
  width: 50%;
}
.img {
  position: relative;
}
.img img {
  width: 9rem;
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
</style>