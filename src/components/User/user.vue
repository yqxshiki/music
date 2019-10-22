<template>
  <div id="user">
    <navigation :title="message" :search="search" />
    <div class="gedan">收藏的歌单</div>
    <div class="user" v-for="(item,index) in userarr" :key="index">
      <div class="wrap">
        <router-link :to="'/sheet/'+item.id">
          <div class="img">
            <img v-lazy="item.coverImgUrl" />
          </div>
        </router-link>
        <div class="message">
          <p>{{item.name}}</p>
          <p>播放{{item.playCount}}次</p>
          <p>创建者{{item.creator.nickname}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import navigation from "../Common/Navigation";
export default {
  name: "user",
  components: {
    navigation
  },
  data() {
    return {
      message: "个人信息",
      search: "",
      userarr: []
    };
  },
  methods: {
    // 获取用户信息
    getuser() {
      this.axios.get("/user/playlist?uid=32953014").then(res => {
        // console.log(res);
        this.userarr = res.data.playlist;
      });
    }
  },
  mounted() {
    this.getuser();
  }
};
</script>
<style scoped>
.gedan {
  font-weight: bold;
  font-size: 1.2rem;
  margin: 1rem;
}
.user {
  margin: 1rem;
}
.wrap {
  display: flex;
}
.img img {
  width: 9rem;
  margin-right: 0.5rem;
}
</style>