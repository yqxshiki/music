import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
    mode: "history",
    routes: [
        { path: "/", redirect: "/sheet" },
        {
            path: "/home", component: () => import("./components/Home.vue"), redirect: "/sheet", children: [
                // 歌单
                { path: "/sheet", component: () => import("./components/Gedan/Sheet.vue") },

                // 排行榜
                { path: "/ranking", component: () => import("./components/Ranking/Ranking.vue") },
                //歌手
                { path: "/singer", component: () => import("./components/Singer/Singer.vue") }

            ]
        },
        { path: "/header", component: () => import("./components/Header.vue") },
        { path: "/footer", component: () => import("./components/Footer.vue") },
        { path: "/sidebar", component: () => import("./components/Sidebar.vue") },
        { path: "/about", component: () => import("./components/About/About.vue") },
        { path: "/user", component: () => import("./components/User/user.vue") },
        // 公共组件
        { path: "/detail", component: () => import("./components/Common/Detail.vue") },
        { path: "/songdetail/:id", component: () => import("./components/Common/Songdetail.vue") },
        // 歌单详情
        { path: "/sheet/:id", component: () => import("./components/Gedan/sheetdetails.vue") },
        // 排行榜详情
        { path: "/ranking/:id", component: () => import("./components/Ranking/Rankdetail.vue") },
        //歌手详情
        {
            path: "/singer/:id", component: () => import("./components/Singer/Singerdetail.vue"), children: [
                { path: "/personaldetail", component: () => import("./components/Singer/Singerdetail/Personaldetail.vue") },
                { path: "/mv", component: () => import("./components/Singer/Singerdetail/Mv.vue") },
                { path: "/hotsong", component: () => import("./components/Singer/Singerdetail/Hotsong.vue") },
                { path: "/album", component: () => import("./components/Singer/Singerdetail/Album.vue") }
            ]
        },
        // 专辑详情
        { path: "/album/:id", component: () => import("./components/Common/Albumdetail.vue") },
        // 视频详情
        { path: "/videoplay/:id", component: () => import("./components/Common/Videoplay.vue") },
        { path: "/videoplay2/:id", component: () => import("./components/Common/Videoplay2.vue") },

        // 搜索
        { path: "/search", component: () => import("./components/Search/Search.vue") },
        { path: "/search/:vaule", component: () => import("./components/Search/Display.vue") },
        // 404
        { path: "/error", component: () => import("./components/Error.vue") },


        { path: "*", redirect: "/error" }

    ]
})
