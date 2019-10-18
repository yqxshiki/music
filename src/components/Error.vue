<template>
  <div id="error">
    <img src="../assets/error.png" alt />
    <div class="wrap">
      <van-button type="info" @click="gohome">返回首页</van-button>
      <van-button plain type="info" @click="goreturn">返回上一步</van-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "error",
  methods: {
    gohome() {
      this.$router.push("/sheet");
    },
    goreturn() {
      this.$router.go(-1);
    }
  }
};
</script>
<style scoped>
#error {
  width: 100%;
  height: 100%;
}
img {
  width: 100%;
  height: 100%;
}
.wrap {
  display: flex;
  justify-content: space-around;
  margin-top: -13rem;
}
.wrap button {
  width: 9rem;
}
</style>