import { createRouter, createWebHashHistory } from "vue-router"

let routes = [
    {
        path: '/',
        component: () => import("../views/HomeView.vue")
    },
    {
        path: '/recongnize',
        component: () => import("../views/CarRecongnize.vue")
    },
    {
        path: '/chat',
        component: () => import("../views/RobotChat.vue")
    },
    {
        path: '/blog',
        component: () => import("../views/Blog.vue"),
        children: [
            {
                path: '/blog/article',
                component: () => import("../views/BlogArticle.vue")
            },
            {
                path: '/blog/about',
                component: () => import("../views/BlogAbout.vue")
            },
            {
                path: '/blog/category',
                component: () => import("../views/BlogCategory.vue")
            },
            {
                path: '/blog/detail',
                component: () => import("../views/ArticleDetail.vue")
            },
        ]
    },
    {
        path: '/login',
        component: () => import("../views/Login.vue")
    }
]
const router = createRouter({
    routes,
    history: createWebHashHistory()
})

export { router, routes }