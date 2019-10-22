<template>
  <div id="album">
    <h3>推荐专辑</h3>
    <div class="wrap" v-for="(item,index) in album" :key="index">
      <div class="img">
        <router-link :to="'/album/'+item.id">
          <img v-lazy="item.blurPicUrl" alt />
        </router-link>
      </div>
      <div class="detail">
        <p class="name">{{item.name}}</p>
        <p class="songer">{{songer.name}}&nbsp;{{item.alias[0]}}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "album",
  data() {
    return {
      album: [],
      songer: ""
    };
  },
  props: ["gid"],
  methods: {
    getalbum(id) {
      this.axios.get("/artist/album?id=" + id).then(res => {
        this.album = res.data.hotAlbums;
        this.songer = res.data.artist;
      });
    }
  },
  mounted() {
    this.getalbum(this.gid);
  }
};
</script>
<style scoped>
#album {
  margin-left: 1rem;
}
.wrap {
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-top: 1rem;
  line-height: 3rem;
}
.img img {
  width: 8rem;
}
.detail {
  font-size: 0.6rem;
  width: 50%;
  height: 8rem;
  margin-left: 2rem;
}
.songer {
  color: blue;
}
</style>