import { createRouter, createWebHistory } from "vue-router"
import { useStore } from 'vuex'
import { computed } from "vue"

const routes = [
    { 
        path: '/:pathMatch(.*)*',
        name: 'views.404notfound',
        component: () => import('../views/404notfound/notfound.vue'),
        meta: {
            showNavbar: false,
            showFooter: false
        }
    },
    {
        path: '/login',
        name: 'views.login',
        component: () => import('../components/auth/login/login.vue'),
        meta: {
            showNavbar: false,
            showFooter: false
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
            showNavbar: false,
            showFooter: false
        }
    },
    {
        path: '/forgot-password',
        name: 'views.forgot',
        component: () => import('../components/auth/forgot/forgot.vue'),
        meta: {
            showNavbar: false,
            showFooter: false
        }
    },
    {
        path: '/',
        name: 'views.dashboard',
        component: () => import('../components/dashboard/newDashboard.vue'),
        meta: {
            showNavbar: true,
            showFooter: true
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
            showNavbar: true,
            showFooter: true
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
        component: () => import('../views/customers/hasil_deteksi/hasil.vue'),
        meta: {
            showNavbar: true,
            showFooter: true
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
            showNavbar: true,
            showFooter: true
        },
        beforeEnter: (to, from, next) => {
            const isAuth = JSON.parse(localStorage.getItem('userData'))
            if(!isAuth) next({ name: 'views.login' })
            else next()
        }
    },
    {
        path: '/reservasi',
        name: 'user.views.reservasi',
        component: () => import('../components/customer/reservasi/reservasi.vue'),
        meta: {
            showNavbar: true,
            showFooter: true
        },
        beforeEnter: (to, from, next) => {
            const isAuth = JSON.parse(localStorage.getItem('userData'))
            const store = useStore()
            const userData = computed(() => store.getters.getUserData)
            console.log(`router`,userData.value)
            const isDetected = userData.value.is_detected == 'Selesai Terdeteksi'
            if(!isAuth || !isDetected) next({ name: 'views.login' })
            else next()
        }
    },
    {
        path: '/payment-status',
        name: 'user.views.payment_status',
        component: () => import('../components/customer/payment_status/payment.vue'),
        meta: {
            showNavbar: false,
            showFooter: false
        },
    },
    {
        path: '/review-test',
        name: 'consultant.views.review',
        component: () => import('../components/consultant/review_test/review.vue'),
        meta: {
            showNavbar: true,
            showFooter: true
        },
    },
    {
        path: '/detail-review/:id',
        name: 'consultant.views.review.detail',
        component: () => import('../components/consultant/review_test/DetailReview.vue'),
        meta: {
            showNavbar: true,
            showFooter: true
        },
      },
    {
        path: '/permintaan-reservasi',
        name: 'consultant.views.permintaan_reservasi',
        component: () => import('../components/consultant/reservasi/permintaan/permintaan.vue'),
        meta: {
            showNavbar: true,
            showFooter: true
        },
    },
    // {
    //     path: '/payment-status?:merchantId&:reference'
    // }
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