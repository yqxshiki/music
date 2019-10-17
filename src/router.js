import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
    mode: "history",
    routes: [
        { path: "/header", component: () => import("./components/Header.vue") },
        { path: "/footer", component: () => import("./components/Footer.vue") },
        { path: "/sheet", component: () => import("./components/Gedan/Sheet.vue") },
        { path: "/sheet/:id", component: () => import("./components/Gedan/sheetdetails.vue") }
    ]
})
