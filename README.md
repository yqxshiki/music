# music

##### 在做完vue-admin-webapp后,看到了好多仿网易云的项目,我也想自己做一个，满足一下自己的虚荣心，自己用自己做的项目听歌。

![](https://blog-1259178461.cos.ap-chengdu.myqcloud.com/vue-music/pkq.png)

本项目是一个移动端项目,采用[Vant框架](https://youzan.github.io/vant/#/zh-CN/intro),当然还有许多的移动端框架可以选择。这个就看自己或者团队了.

**在这里面要感谢binaryify大佬的网易云api                 [NeteaseCloudMusicApi](https://github.com/Binaryify/NeteaseCloudMusicApi)**

github地址[点击进入](https://github.com/yqxshiki/music)
>如果你觉得还行,希望你给我点个star,(不要脸)嘻嘻嘻

本项目使用的技术栈是:

* **Vue 3.10.0**
* **animate 3.7.2**
* **axios**
* **vant**
* **vue-router 3.10.0**
* **vuex 3.10.0**
* **移动端布局 flex rem**

后端接口都是使用的NeteaseCloudMusicApi里面的api

页面展示

![](https://blog-1259178461.cos.ap-chengdu.myqcloud.com/vue-music/pic/sheet.png)&#8195;&#8195;&#8195;&#8195;&#8195;&#8195;&#8195;&#8195;![](https://blog-1259178461.cos.ap-chengdu.myqcloud.com/vue-music/pic/sidebar.png)   &#8195;&#8195;&#8195;&#8195;&#8195;&#8195;![](https://blog-1259178461.cos.ap-chengdu.myqcloud.com/vue-music/pic/ranking.png)

![](https://blog-1259178461.cos.ap-chengdu.myqcloud.com/vue-music/pic/singer.png)&#8195;&#8195;&#8195;&#8195;&#8195;&#8195;![](https://blog-1259178461.cos.ap-chengdu.myqcloud.com/vue-music/pic/login.png)&#8195;&#8195;&#8195;&#8195;&#8195;&#8195;&#8195;&#8195;![](https://blog-1259178461.cos.ap-chengdu.myqcloud.com/vue-music/pic/search.png)

![](https://blog-1259178461.cos.ap-chengdu.myqcloud.com/vue-music/pic/register.png)&#8195;&#8195;&#8195;&#8195;&#8195;&#8195;&#8195;&#8195;![](https://blog-1259178461.cos.ap-chengdu.myqcloud.com/vue-music/pic/hotsearch.png) &#8195;&#8195;&#8195;&#8195;![](https://blog-1259178461.cos.ap-chengdu.myqcloud.com/vue-music/pic/hotranking.png)

![](https://blog-1259178461.cos.ap-chengdu.myqcloud.com/vue-music/pic/song.png)&#8195;&#8195;&#8195;&#8195;&#8195;&#8195;![](https://blog-1259178461.cos.ap-chengdu.myqcloud.com/vue-music/pic/video.png) &#8195;&#8195;&#8195;&#8195;&#8195;![](https://blog-1259178461.cos.ap-chengdu.myqcloud.com/vue-music/pic/singerdetail.png)

![](https://blog-1259178461.cos.ap-chengdu.myqcloud.com/vue-music/pic/detail.png)&#8195;&#8195;&#8195;&#8195;&#8195;![](https://blog-1259178461.cos.ap-chengdu.myqcloud.com/vue-music/pic/singersing.png)

**在多个组件内部我使用了动画 Animate.css**,请自行体验

### 底部播放栏

在App.vue里面调用,会根据用户当前播放的歌曲进行调整

### 登录,注册(手机号登录,信息存入localStorage和Vuex)

**登录账号是网易云的账号**

```javascript
 userlogin() {
      if (this.phone == "" || this.password == "") {
        this.$dialog.alert({
          message: "手机号或者密码不能为空!"
        });
      } else {
        this.axios
          .get(
            "/login/cellphone?phone=" +
              this.phone +
              "&password=" +
              this.password
          )
          .then(res => {
            this.$store.state.uid = res.data.account.id;
            // 存入localStorage 防止刷新数据消失
            let id = JSON.stringify(res.data.account.id);
            localStorage.setItem("uid", id);
            this.$dialog
              .alert({
                message: "登录成功!"
              })
              .then(() => {
                this.$router.push("/sheet");
              });
          });
      }
    },
```

注册使用了验证码,在注册前要判断验证码是否正确,其次对于已经注册过账号的手机号，直接跳到login页面

### 歌单(热门，推荐，收藏)

歌单的详情基本都是一样的，我使用了一个组件来完成，该页面主要展示歌单里面的歌曲,点击可以播放，右边的图标可以进入歌曲详情，查看歌词

### 歌手(歌手榜)

我使用了三个组件 sheet.vue ranking.vue singer.vue 来组成首页的三个部分,歌手榜用的是热门歌手数据。所以有的歌手看不到请见谅！

### 视频(歌手发布的mv)

进入歌手详情,可以看到video，这里我使用了两个videoplay.vue组件来相互跳转.

### 歌词(歌词滚动,进度条拖动)

### 搜索

点击搜索进入热门搜索,会根据当时的热度进行排行,再次点击会显示搜索结果,也可以直接进行播放。

## **本项目正在开发中,请敬请期待！**

![](https://blog-1259178461.cos.ap-chengdu.myqcloud.com/vue-music/pkq.jpeg)