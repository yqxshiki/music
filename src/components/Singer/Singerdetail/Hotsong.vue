<template>
  <div id="hotsong">
    <h3>推荐歌曲</h3>
    <div class="wrap" v-for="(item,index) in songs" :key="index">
      <div class="index">{{index+1}}</div>
      <div class="song">
        <div class="name">{{item.name}}</div>
        <div class="singer">{{item.ar[0].name}}--{{item.al.name}}</div>
      </div>
      <div class="meun">
        <router-link :to="'/songdetail/'+item.id">
          <van-icon name="ellipsis" class="ellipsis" />
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "hotsong",
  data() {
    return {
      songs: []
    };
  },
  props: ["gid"],
  methods: {
    getsongs(id) {
      this.axios.get("/artists?id=" + id).then(res => {
        this.songs = res.data.hotSongs;
        console.log(this.songs);
      });
    }
  },
  mounted() {
    this.getsongs(this.gid);
  }
};
</script>
<style scoped>
#hotsong {
  margin-left: 1rem;
}
.wrap {
  display: flex;
  justify-content: space-around;
  align-items: center;
  text-align: center;
  width: 100%;
  height: 4rem;
}
.index {
  color: black;
  font-size: 1rem;
}
.song {
  width: 8rem;
  text-align: center;
  margin-left: 1rem;
}
.name {
  font-size: 0.6rem;
  font-weight: 400;
}
.singer {
  font-size: 0.1rem;
}
</style>