import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
    mode: "history",
    routes: [
        { path: "/header", component: () => import("./components/Header.vue") },
        { path: "/footer", component: () => import("./components/Footer.vue") }
    ]
})
