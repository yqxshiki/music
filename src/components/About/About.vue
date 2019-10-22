<template>
  <div id="about">
    <navigation :title="message" :search="search" />
    <div class="middle">
      <i class="iconfont">&#xe6a1;</i>
    </div>
    <div class="title">
      <p>当前版本：vv1.1.201</p>
      <p>本项目是一个人开发，所以会有些慢,请耐心等待新版本的到来.如果你想知道进展，可以关注我的Bolg:https://yqxshiki.com/</p>
    </div>
  </div>
</template>

<script>
import navigation from "../Common/Navigation";
export default {
  name: "about",
  components: {
    navigation
  },
  data() {
    return {
      message: "关于vue-music",
      search: ""
    };
  }
};
</script>
<style scoped>
.middle .iconfont {
  font-size: 5rem;
  color: #f40;
  position: absolute;
  top: 40%;
  left: 40%;
}
.title {
  position: absolute;
  top: 60%;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
}
.title :nth-child(1) {
  color: #f40;
}
.title :nth-child(2) {
  text-indent: 2rem;
  opacity: 0.8;
}
</style>