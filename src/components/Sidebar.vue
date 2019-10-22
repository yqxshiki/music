<template>
  <div id="sidebar">
    <div class="header">
      <div class="img">
        <img :src="user.backgroundUrl" alt />
      </div>
      <div class="name">{{user.signature}}</div>
    </div>
    <div class="icon">
      <div class="added" @click="nohave">
        <van-icon name="comment-o" />
        <div class="iconname">我的消息</div>
      </div>
      <div class="added" @click="nohave">
        <van-icon name="friends-o" />
        <div class="iconname">我的好友</div>
      </div>
      <div class="added" @click="nohave">
        <van-icon name="music-o" />
        <div class="iconname">听歌识曲</div>
      </div>
      <div class="added" @click="nohave">
        <van-icon name="star-o" />
        <div class="iconname">个信装扮</div>
      </div>
    </div>
    <div class="nav">
      <router-link to="/user">
        <div class="user">用户信息</div>
      </router-link>
      <div class="tool" @click="nohave">工具</div>
      <div class="Scan" @click="nohave">扫一扫</div>
      <router-link to="/about">
        <div class="about">关于我们</div>
      </router-link>
      <div class="setting" @click="nohave">设置</div>
    </div>
    <footer>
      <div class="imgicon" @click="signout">
        <i class="iconfont">&#xe61b;</i>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  name: "sidebar",
  data() {
    return {
      user: []
    };
  },
  methods: {
    nohave() {
      this.$toast("对不起，你所点击的功能暂时还在开发中！,请你关注我们的消息.");
    },
    //   退出
    signout() {
      this.$dialog
        .confirm({
          message: "您确定要退出当前账号吗?",
          confirmButtonText: "退出", //改变确认按钮上显示的文字
          cancelButtonText: "取消" //改变取消按钮上显示的文字
        })
        .then(() => {
          console.log("点击了确认按钮噢");
        })
        .catch(() => {
          console.log("点击了取消按钮噢");
        });
    },
    getuser() {
      this.axios.get("/user/detail?uid=32953014").then(res => {
        // console.log(res);
        this.user = res.data.profile;
      });
    }
  },
  mounted() {
    this.getuser();
  }
};
</script>
<style scoped>
#sidebar {
  width: 100%;
  height: 100%;
  /* overflow-y: hidden; */
}
/* header */
.header {
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin: 1rem;
}
.img img {
  width: 4rem;
  border-radius: 50%;
}
/* icon */
.icon {
  display: flex;
  justify-content: space-around;
  flex-wrap: nowrap;
  margin-top: 2rem;
}
.added .van-icon {
  font-size: 1.8rem;
  color: red;
  opacity: 0.8;
}

.iconname {
  font-size: 0.2rem;
  text-align: center;
}
/* nav */
.nav {
  margin-top: 4rem;
}
.nav div {
  width: 100%;
  height: 2rem;
  background: #ccc;
  text-align: center;
  margin-top: 2rem;
  border-radius: 1rem;
  line-height: 2rem;
  color: black;
  font-weight: 400;
}
/* 底部 */
footer {
  position: fixed;
  bottom: 0;
  left: 40%;
}
.iconfont {
  font-size: 3rem;
}
</style>