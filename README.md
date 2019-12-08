# music


本项目是一个移动端项目,采用[Vant框架](https://youzan.github.io/vant/#/zh-CN/intro),当然还有许多的移动端框架可以选择。这个就看自己或者团队了.

**在这里面要感谢binaryify大佬的网易云api                 [NeteaseCloudMusicApi](https://github.com/Binaryify/NeteaseCloudMusicApi)**

个人博客[点击进入](https://www.yqxshiki.com/)

项目运行地址[点击进入](http://yqxshiki.xyz:3030)

github地址[点击进入](https://github.com/yqxshiki/music)
>如果你觉得还行,希望你给我点个star

本项目使用的技术栈是:

* **Vue 3.10.0**
* **animate 3.7.2**
* **axios**
* **vant**
* **vue-router 3.10.0**
* **vuex 3.10.0**
* **移动端布局 flex rem**

后端接口都是使用的NeteaseCloudMusicApi里面的api

### 目录结构

整个文件的目录结构

```javascript
├── public                     # 静态资源
│   ├── favicon.ico              # favicon图标
│   └── index.html               # html模板
├── src                        # 源代码
│   ├── assets                   # 图片、字体等静态资源
|   ├── components               # 组件
|   │   ├── about                  # 关于页面
|   │   ├── Common                 # 全局公用组件
|   │   ├── Gedan                  # 歌单
|   │   ├── Login                  # 登录注册
|   │   ├── Popup                  # 侧边栏和播放列表栏
|   │   ├── Ranking                # 排行榜
|   │   ├── Search                 # 搜索
|   │   ├── Singer                 # 歌手信息
|   │   ├── User                   # 用户信息
|   │   ├── Error.uve              # 404
|   │   ├── Footer.vue             # 底部栏
|   │   ├── Header.vue             # 顶部
|   │   ├── Home.js                # 入口页面
|   ├── App.vue                  # 入口页面
|   ├── main.js                  # 入口文件 加载组件 初始化等
|   ├── router.js                # 路由
|   ├── store.js                 # vuex
├── .gitignore.js               # git忽略文件设置
├── babelrc.config.js           # babel-loader 配置
├── package.json                # package.json
├── postcss.config.js           # postcss 配置
└── vue.config.js               # vue-cli 配置
```

### 页面展示

![](https://blog-1259178461.cos.ap-chengdu.myqcloud.com/vue-music/pic/sheet.png)&#8195;&#8195;&#8195;&#8195;&#8195;&#8195;&#8195;&#8195;![](https://blog-1259178461.cos.ap-chengdu.myqcloud.com/vue-music/pic/sidebar.png)   &#8195;&#8195;&#8195;&#8195;&#8195;&#8195;![](https://blog-1259178461.cos.ap-chengdu.myqcloud.com/vue-music/pic/ranking.png)

![](https://blog-1259178461.cos.ap-chengdu.myqcloud.com/vue-music/pic/singer.png)&#8195;&#8195;&#8195;&#8195;&#8195;&#8195;![](https://blog-1259178461.cos.ap-chengdu.myqcloud.com/vue-music/pic/login.png)&#8195;&#8195;&#8195;&#8195;&#8195;&#8195;&#8195;&#8195;![](https://blog-1259178461.cos.ap-chengdu.myqcloud.com/vue-music/pic/search.png)

![](https://blog-1259178461.cos.ap-chengdu.myqcloud.com/vue-music/pic/register.png)&#8195;&#8195;&#8195;&#8195;&#8195;&#8195;&#8195;&#8195;![](https://blog-1259178461.cos.ap-chengdu.myqcloud.com/vue-music/pic/hotsearch.png) &#8195;&#8195;&#8195;&#8195;![](https://blog-1259178461.cos.ap-chengdu.myqcloud.com/vue-music/pic/hotranking.png)

![](https://blog-1259178461.cos.ap-chengdu.myqcloud.com/vue-music/pic/song.png)&#8195;&#8195;&#8195;&#8195;&#8195;&#8195;![](https://blog-1259178461.cos.ap-chengdu.myqcloud.com/vue-music/pic/video.png) &#8195;&#8195;&#8195;&#8195;&#8195;![](https://blog-1259178461.cos.ap-chengdu.myqcloud.com/vue-music/pic/singerdetail.png)

![](https://blog-1259178461.cos.ap-chengdu.myqcloud.com/vue-music/pic/detail.png)&#8195;&#8195;&#8195;&#8195;&#8195;![](https://blog-1259178461.cos.ap-chengdu.myqcloud.com/vue-music/pic/singersing.png)

**在多个组件内部我使用了动画 Animate.css**,请自行体验

这个项目中,我把我能实现的都实现了,后续有时间可以继续增加功能.

整个项目中多次使用了播放事件,我就用[**provide/inject**](https://cn.vuejs.org/v2/api/#provide-inject)来实现多次调用，在App.vue页面中实现playaudio事件

*reload和iffooter方法是别的方法,可以忽略*

```javascript
provide() {
    return {
      reload: this.reload,
      iffooter: this.iffooter,
      playaudio(id) {
        setTimeout(() => {
          let audio = document.getElementsByClassName("audio")[0];
          let playicon = document.getElementById("playicon");
          // 同一次点击时,根据状态是否播放
          if (audio.src == this.$store.state.src) {
            if (audio.paused) {
              audio.play();
              playicon.innerHTML = "&#xe68e;";
              this.$toast.success("开始播放");
            } else {
              audio.pause();
              playicon.innerHTML = "&#xe612;";
              this.$toast.fail("暂停播放");
            }
          } else {
            audio.src = this.$store.state.src;
            if (audio !== null) {
              if (audio.paused) {
                let playpromise = audio.play();
                if (playpromise) {
                  playpromise
                    .then(() => {
                      setTimeout(() => {
                        playicon.innerHTML = "&#xe68e;";
                        this.$toast.success("开始播放");
                      }, 2000);
                    })
                    .catch(err => {
                      console.log(err);
                      this.$notify({
                        type: "danger",
                        message: "该资源无法加载,请选择别的歌曲"
                      });
                    });
                }
                // 数字变成字符串
                let gid = id.toString();
                //把播放过的歌曲id 存入sessionStorage
                //防止页面刷新后vuex里面的数据消失
                if (this.$store.state.songid.length == 0) {
                  this.$store.state.songid = JSON.parse(
                    sessionStorage.getItem("songid")
                  );
                }
                //点击同一首歌，不添加
                if (this.$store.state.songid.indexOf(gid) == -1) {
                  this.$store.state.songid.push(gid);
                  let songid = JSON.stringify(this.$store.state.songid);
                  sessionStorage.setItem("songid", songid);
                }
                // 保存播放的id
                this.$store.state.current = gid;
                let current = JSON.stringify(this.$store.state.current);
                sessionStorage.setItem("current", current);
                this.iffooter();
              } else {
                audio.pause();
                playicon.innerHTML = "&#xe612;";
                this.$toast.fail("暂停播放");
              }
            }
          }
        }, 600);
      }
    };
  },
```

### 底部播放栏

在App.vue里面调用,会根据用户当前播放的歌曲进行调整,点击图标可以进入歌曲详情，查看歌词

底部栏每次都显示当前播放的信息

songid为每次用户点击播放歌曲,就会把歌曲id存入到sessionStorage
current为当前播放的歌曲id也存入到sessionStorage

```javascript
 // 获取信息
    getimg() {
      // 默认
      if (JSON.parse(sessionStorage.getItem("songid")).length == 0) {
        this.$refs.img.src =
          "https://hexophoto-1259178461.cos.ap-beijing.myqcloud.com/photos/6.jpg";
        this.$refs.name.innerHTML = "请播放歌曲!";
      } else {
        // 显示当前播放歌曲信息
        this.current = JSON.parse(sessionStorage.getItem("current"));
        // 获取歌曲信息
        this.axios.get("/song/detail?ids=" + this.current).then(res => {
          this.detail = res.data.songs[0];
          this.imgurl = this.detail.al;
        });
      }
    }
```

### 登录,注册(手机号登录,信息存入sessionStorage和Vuex)

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
            // 存入sessionStorage 防止刷新数据消失
            let id = JSON.stringify(res.data.account.id);
            sessionStorage.setItem("uid", id);
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

歌单的详情基本都是一样的，我使用了一个组件来完成 **Detail.vue**,该页面主要展示歌单里面的歌曲,点击可以播放,收藏歌单在登录用户后,点击用户信息可以看到。

### 歌手(歌手榜)

我使用了三个组件 sheet.vue ranking.vue singer.vue 来组成首页的三个部分,歌手榜用的是热门歌手数据。所以有的歌手看不到请见谅！歌手详情有五个子页面。当时做的时候本来四个就好了，结果不知道什么原因，展示的第一个页面,在从父页面获取id后，能够打印出来，但是在发送请求axios时，id就变成undefined了,我没有找到其他好的解决方法，就多加了个无关紧要的页面解决这个BUG.

### 歌词(歌词滚动,进度条拖动)

因为把audio放在了app.vue上面,我在歌词页面使用了vuex来就行管理.

##### 进度条

在用ref来获取audio时，发现获取不了，就直接用原生的JS来获取了,许多位置我都是用原生来获取的。

```javascript
export default new Vuex.Store({
    state: {
        // 判断底部播放是否加载
        footer: true,
        showfooter: true,
        // 登录信息
        uid: 0,
        // 歌曲id
        songid: [],
        // 歌曲资源
        src: "1",
        audio: {
            //当前播放时间
            currentTime: 0,
            // 歌曲总长
            maxTime: 0
        },
        // 进度条
        playtime: 0,
        // 当前播放音乐ID
        current: ""
    }
}
```

在App.vue页面

```HTML
<template>
  <div id="app">
    <audio 
    class="audio" 
    ref="audio" 
    @timeupdate="onTimeupdate" 
    @loadedmetadata="onLoadedmetadata"
    ></audio>
  </div>
</template>
```

```javascript
export default {
    // 记录播放时间
    onTimeupdate(res) {
      // 获取当前播放时间
      this.$store.state.audio.currentTime = res.target.currentTime;
      // 获取进度条进度
      this.$store.state.playtime = parseInt(
        (this.$store.state.audio.currentTime /
          this.$store.state.audio.maxTime) *
          100
      );
    },
    // 获取歌曲总时长
    onLoadedmetadata(res) {
      this.$store.state.audio.maxTime = parseInt(res.target.duration);
    },
}
```

点击进度条事件

```javascript
 click(res) {
      let audio = document.getElementsByClassName("audio")[0];
      // 当前点击距离
      let clicktime = res.clientX;
      // 进度条距离
      this.playtime = parseInt((clicktime / 375) * 100);
      // 更新播放时间
      audio.currentTime = parseInt(
        (this.playtime * this.$store.state.audio.maxTime) / 100
      );
      this.setroll();
    },
```

### 搜索

点击搜索进入热门搜索,会根据当时的热度进行排行,再次点击会显示搜索结果,可以直接进行播放.

### 总结

在两个星期内做完了这个感觉还是比较有收获的,之前对audio一点了解都没有,现在不会像之前那样一窍不通了,在各种组件传值,调用方法方面也有了不少的进步,对vue也有了进一步的了解,希望在以后能够继续加油。
