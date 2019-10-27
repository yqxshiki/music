<template>
  <div id="sidebar">
    <div class="header">
      <div class="img">
        <img ref="img" :src="user.avatarUrl" alt />
      </div>
      <div ref="name" class="name">{{user.signature}}</div>
    </div>
    <div ref="nickname" class="nickname">{{user.nickname}}</div>
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
      <router-link to="/login">
        <div class="login">切换账号</div>
      </router-link>
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
  inject: ["reload"],
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
          localStorage.removeItem("uid");
          this.reload();
          this.$router.push("/login");
        })
        .catch(() => {});
    },
    // 获取用户信息
    getuser() {
      if (!JSON.parse(localStorage.getItem("uid"))) {
        // 默认，无登录时
        this.$refs.img.src =
          "https://blog-1259178461.cos.ap-chengdu.myqcloud.com/vue-music/default.jpg";
        this.$refs.name.innerHTML = "当前无账号,请登录!";
        this.$notify({
          type: "danger",
          message: "当前没有登录账号，请登录账号"
        });
      } else {
        if (this.$store.state.uid == "") {
          this.$store.state.uid = JSON.parse(localStorage.getItem("uid"));
        }
        // 取vuex的id获取信息
        this.axios
          .get("/user/detail?uid=" + this.$store.state.uid)
          .then(res => {
            this.user = res.data.profile;
          });
      }
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
  overflow-y: hidden;
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
.name {
  font-size: 0.8rem;
  text-indent: 2rem;
  margin-left: 0.4rem;
  color: rgb(41, 172, 196);
}
.nickname {
  font-size: 0.8rem;
  font-weight: 400;
  text-indent: 1rem;
}
/* icon */
.icon {
  display: flex;
  justify-content: space-around;
  flex-wrap: nowrap;
  margin-top: 1rem;
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
  margin-top: 1.8rem;
}
.nav div {
  width: 100%;
  height: 2rem;
  background: #ccc;
  text-align: center;
  margin-top: 10%;
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