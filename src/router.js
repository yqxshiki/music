import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
    mode: "history",
    routes: [
        { path: "/", redirect: "/sheet" },
        { path: "/header", component: () => import("./components/Header.vue") },
        { path: "/footer", component: () => import("./components/Footer.vue") },
        { path: "/sidebar", component: () => import("./components/Sidebar.vue") },
        { path: "/about", component: () => import("./components/About/About.vue") },
        { path: "/user", component: () => import("./components/User/user.vue") },
        // 公共组件
        { path: "/navigation", component: () => import("./components/Common/Navigation.vue") },
        { path: "/detail", component: () => import("./components/Common/Detail.vue") },
        { path: "/sheet", component: () => import("./components/Gedan/Sheet.vue") },
        { path: "/sheet/:id", component: () => import("./components/Gedan/sheetdetails.vue") },
        { path: "/search", component: () => import("./components/Search.vue") },
        { path: "/search/:vaule", component: () => import("./components/Display.vue") },
        { path: "/error", component: () => import("./components/Error.vue") },
        { path: "/ranking", component: () => import("./components/Ranking/Ranking.vue") },
        { path: "/ranking/:id", component: () => import("./components/Ranking/Rankdetail.vue") },
        { path: "*", redirect: "/error" }

    ]
})
