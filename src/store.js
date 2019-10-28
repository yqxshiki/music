import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        // 判断底部播放是否加载
        footer: true,
        // 登录信息
        uid: 0,
        // 歌曲id
        songid: [],
        // 歌曲资源
        src: "1",
        audio: {
            currentTime: 0,
            maxTime: 0,
            minTime: 0
        },
        // 当前播放音乐ID
        current: ""
    },
    getters: {
    },
    mutations: {

    },
    actions: {

    }
})