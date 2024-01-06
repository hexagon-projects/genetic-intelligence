import { createRouter, createWebHistory } from "vue-router"
import { useStore } from 'vuex'

const routes = [
    { 
        path: '/:pathMatch(.*)*',
        name: 'views.404notfound',
        component: () => import('../views/404notfound/notfound.vue'),
        meta: {
            showNavbar: false
        }
    },
    {
        path: '/login',
        name: 'views.login',
        component: () => import('../components/auth/login/login.vue'),
        meta: {
            showNavbar: false
        },
        beforeEnter: (to, from, next) => {
            const isAuth = JSON.parse(localStorage.getItem('userData'))
            if(to.name == 'views.login' && isAuth) next({ name: 'views.dashboard' })
            else next()
        }
    },
    {
        path: '/register',
        name: 'views.register',
        component: () => import('../components/auth/register/registernew.vue'),
        meta: {
            showNavbar: false
        }
    },
    {
        path: '/forgot-password',
        name: 'views.forgot',
        component: () => import('../components/auth/forgot/forgot.vue'),
        meta: {
            showNavbar: false
        }
    },
    {
        path: '/',
        name: 'views.dashboard',
        component: () => import('../views/dashboard/dashboard.vue'),
        meta: {
            showNavbar: true
        },
        beforeEnter: (to, from, next) => {
            const isAuth = JSON.parse(localStorage.getItem('userData'))
            if(!isAuth) next({ name: 'views.login' })
            else next()
        }
    },
    {
        path: '/deteksi',
        name: 'user.views.deteksi',
        component: () => import('../views/customers/deteksi_gim/deteksi.vue'),
        meta: {
            showNavbar: true
        },
        beforeEnter: (to, from, next) => {
            const isAuth = JSON.parse(localStorage.getItem('userData'))
            if(to.name == 'user.views.deteksi' && !isAuth) next({ name: 'views.login' })
            else next()
        }
    },
    {
        path: '/hasil-deteksi',
        name: 'user.views.hasil_deteksi',
        component: () => import('../views/hasil_deteksi/Hasil.vue'),
        meta: {
            showNavbar: true
        },
        beforeEnter: (to, from, next) => {
            const isAuth = JSON.parse(localStorage.getItem('userData'))
            if(!isAuth) next({ name: 'views.login' })
            else next()
        }
    },
    {
        path: '/user-profile',
        name: 'user.views.profile',
        component: () => import('../views/user_profile/UserProfile.vue'),
        meta: {
            showNavbar: true
        },
        beforeEnter: (to, from, next) => {
            const isAuth = JSON.parse(localStorage.getItem('userData'))
            if(!isAuth) next({ name: 'views.login' })
            else next()
        }
    },
    // {
    //     path: '/cek-card',
    //     name: 'user.views.profile',
    //     component: () => import('../views/user_profile/UserProfile.vue'),
    //     meta: {
    //         showNavbar: true
    //     },
    //     beforeEnter: (to, from, next) => {
    //         const isAuth = JSON.parse(localStorage.getItem('userData'))
    //         if(!isAuth) next({ name: 'views.login' })
    //         else next()
    //     }
    // },
]

const router =  createRouter({
    history: createWebHistory(),
    routes
})

// router.beforeEach((to, from, next) => {
//     const isAuth = JSON.parse(localStorage.getItem('userData'))
//     if (to.name !== 'views.login' && !isAuth) {
//         next({ name: 'views.login' });
//       } else if (to.name === 'views.login' && isAuth) {
//         next({ name: 'views.dashboard' });
//       } else {
//         next();
//       }
// });


export default router