<template>
  <div id="songer">
    <transition-group
      enter-active-class="animated rollIn"
      leave-active-class="animated rotateInDownRight"
      tag="div"
    >
      <div class="wrap" v-for="(item,index) in songer" :key="index">
        <router-link :to="'/singer/'+item.id">
          <img v-lazy="item.img1v1Url" />
        </router-link>
        <div class="describe">
          <div class="title">{{item.name}}</div>
          <div class="album">专辑数:{{item.albumSize}}</div>
        </div>
      </div>
    </transition-group>
  </div>
</template>

<script>
export default {
  name: "songer",
  data() {
    return {
      songer: []
    };
  },
  methods: {
    getsonger() {
      this.axios.get("/top/artists?offset=0&limit=30").then(res => {
        this.songer = res.data.artists;
      });
    }
  },
  mounted() {
    this.getsonger();
  }
};
</script>
<style scoped>
#songer{
  margin-top: -2rem;
}
.wrap {
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-top: 1rem;
  box-shadow: 0 1px 10px black;
  margin-left: 1rem;
  margin-right: 1rem;
}
.wrap:hover {
  background: rgb(210, 69, 55);
}
.wrap img {
  width: 9rem;
  margin-left: 1rem;
}
.describe {
  font-size: 0.8rem;
  font-weight: 700;
  opacity: 0.8;
  text-align: center;
  color: cadetblue;
}
</style>
