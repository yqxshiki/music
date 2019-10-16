<template>
  <div id="appfooter">
    <div class="wrap">
      <div class="image">
        <img src="../assets/logo.png" alt />
      </div>
      <div class="geming">agasgasgas</div>
      <div class="playicon">
        <van-icon name="play-circle-o" class="palyicon" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "appfooter"
};
</script>
<style scoped>
#appfooter {
  width: 100%;
  height: 60px;
}
.wrap {
  width: 100%;
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-content: center;
}
/* 歌的图像 */
.image {
  width: 3rem;
  height: 3rem;
}
.image img {
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
}
/* 开始播放icon */
.palyicon {
  font-size: 2rem;
}
</style>