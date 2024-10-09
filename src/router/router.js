import { createRouter, createWebHistory } from "vue-router"
import { useStore } from 'vuex'
import { computed } from "vue"
import { jwtDecode } from "jwt-decode"
import Cookies from 'js-cookie'
import Admin from "./role/Admin"
import Consultant from "./role/Consultant"
import Customer from "./role/Customer"

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
        component: () => import('@/views/REMAKE/Auth/Login/login.vue'),
        // component: () => import('../components/auth/login/newLogin.vue'),
        meta: {
            showNavbar: false,
            showFooter: false
        },
        beforeEnter: (to, from, next) => {
            const isAuth = JSON.parse(localStorage.getItem('userData'))
            if (to.name == 'views.login' && isAuth) next({ name: 'views.dashboard' })
            else next()
        }
    },
    {
        path: '/register',
        name: 'views.register',
        component: () => import('../components/auth/register/registerv2.vue'),
        meta: {
            showNavbar: false,
            showFooter: false
        }
    },
    {
        path: '/forgot-password',
        name: 'views.forgot_password',
        component: () => import('../components/auth/forgot/forgot.vue'),
        meta: {
            showNavbar: false,
            showFooter: false
        }
    },
    {
        path: '/reset-password',
        name: 'views.reset_password',
        component: () => import('../components/auth/reset_password/reset.vue'),
        meta: {
            showNavbar: false,
            showFooter: false
        }
    },
    {
        path: '/',
        name: 'views.dashboard',
        // component: () => import('../components/dashboard/newDashboard2.vue'),
        component: () => import('@/views/REMAKE/Dashboard/Customer/Dashboard.vue'),
        meta: {
            showNavbar: true,
            showFooter: true
        },
        beforeEnter: (to, from, next) => {
            const token = Cookies.get('token')
            const isAuth = JSON.parse(localStorage.getItem('userData'))
            if (!isAuth || !token) {
                localStorage.clear()
                Cookies.remove('token')
                next({ name: 'views.login' })
            } else {
                const decodedToken = jwtDecode(token);
                const decodeRoleUser = decodedToken.role

                if (decodeRoleUser == 'consultant') next({ name: 'consultant.views.dashboard' })
                if (decodeRoleUser == 'admin') next({ name: 'admin.views.dashboard' })

                next()
            }
        }
    },
    {
        path: '/consultant/dashboard',
        name: 'consultant.views.dashboard',
        // component: () => import('../components/dashboard/newDashboard2.vue'),
        component: () => import('@/views/REMAKE/Dashboard/Consultant/Dashboard.vue'),
        meta: {
            showNavbar: true,
            showFooter: true
        },
        beforeEnter: (to, from, next) => {
            const token = Cookies.get('token')
            const isAuth = JSON.parse(localStorage.getItem('userData'))
            if (!isAuth || !token) {
                localStorage.clear()
                Cookies.remove('token')
                next({ name: 'views.login' })
            } else {
                const decodedToken = jwtDecode(token);
                const decodeRoleUser = decodedToken.role

                if (decodeRoleUser == 'customer') next({ name: 'views.dashboard' })
                if (decodeRoleUser == 'admin') next({ name: 'admin.views.dashboard' })

                next()
            }
        }
    },
    {
        path: '/kepsek/dashboard',
        name: 'kepsek.views.dashboard',
        // component: () => import('../components/dashboard/newDashboard2.vue'),
        component: () => import('@/views/REMAKE/Dashboard/Kepsek/Dashboard.vue'),
        meta: {
            showNavbar: true,
            showFooter: true
        },
        beforeEnter: (to, from, next) => {
            const token = Cookies.get('token')
            const isAuth = JSON.parse(localStorage.getItem('userData'))
            if (!isAuth || !token) {
                localStorage.clear()
                Cookies.remove('token')
                next({ name: 'views.login' })
            } else {
                const decodedToken = jwtDecode(token);
                const decodeRoleUser = decodedToken.role

                if (decodeRoleUser == 'customer') next({ name: 'views.dashboard' })
                if (decodeRoleUser == 'admin') next({ name: 'admin.views.dashboard' })

                next()
            }
        }
    },
    {
        path: '/kepsek/siswa/dashboard',
        name: 'kepsek.siswa.dashboard',
        // component: () => import('../components/dashboard/newDashboard2.vue'),
        component: () => import('@/views/REMAKE/Dashboard/Kepsek/Siswa/Dashboard.vue'),
        meta: {
            showNavbar: true,
            showFooter: true
        },
        beforeEnter: (to, from, next) => {
            const token = Cookies.get('token')
            const isAuth = JSON.parse(localStorage.getItem('userData'))
            if (!isAuth || !token) {
                localStorage.clear()
                Cookies.remove('token')
                next({ name: 'views.login' })
            } else {
                const decodedToken = jwtDecode(token);
                const decodeRoleUser = decodedToken.role

                if (decodeRoleUser == 'customer') next({ name: 'views.dashboard' })
                if (decodeRoleUser == 'admin') next({ name: 'admin.views.dashboard' })

                next()
            }
        }
    },

    {
        path: '/admin/dashboard',
        name: 'admin.views.dashboard',
        // component: () => import('../components/dashboard/newDashboard2.vue'),
        component: () => import('@/views/REMAKE/Dashboard/Admin/Dashboard.vue'),
        meta: {
            showNavbar: true,
            showFooter: true
        },
        beforeEnter: (to, from, next) => {
            const token = Cookies.get('token')
            const isAuth = JSON.parse(localStorage.getItem('userData'))
            if (!isAuth || !token) {
                localStorage.clear()
                Cookies.remove('token')
                next({ name: 'views.login' })
            } else {
                const decodedToken = jwtDecode(token);
                const decodeRoleUser = decodedToken.role

                if (decodeRoleUser == 'customer') next({ name: 'views.dashboard' })
                if (decodeRoleUser == 'consultant') next({ name: 'consultant.views.dashboard' })

                next()
            }
        }
    },

    ...Consultant,
    ...Customer,
    ...Admin,

    {
        path: '/user-profile',
        name: 'user.views.profile',
        component: () => import('@/views/REMAKE/UserProfile/UserProfile.vue'),
        // component: () => import('../views/user_profile/UserProfile.vue'),
        meta: {
            showNavbar: true,
            showFooter: true
        },
        beforeEnter: (to, from, next) => {
            const token = Cookies.get('token')
            const isAuth = JSON.parse(localStorage.getItem('userData'))
            if (!token || !isAuth) {
                // Jika token tidak ada, arahkan pengguna ke halaman login
                next({ name: 'views.login' });
            } else {
                next()
            }
        }
    },

    {
        path: '/pembayaran/:tipePembayaran',
        name: 'user.views.pembayaran',
        component: () => import('../components/pembayaran/pembayaran.vue'),
        meta: {
            showNavbar: true,
            showFooter: true
        },
        beforeEnter: (to, from, next) => {
            const allowedPayments = ['test-gim', 'test-iq', 'test-assessment', 'starter-pack']
            const tipePembayaran = to.params.tipePembayaran;

            if (allowedPayments.includes(tipePembayaran)) {
                next()
            } else {
                next({ name: 'views.404notfound' })
            }
        }
    },
    // {
    //     path: '/pengaturan-jawaban-assessment',
    //     name: 'admin.views.pengaturan_jawaban_assessment',
    //     component: () => import('../components/admin/riwayat_pembayaran/riwayatPembayaran.vue'),
    //     meta: {
    //         showNavbar: true,
    //         showFooter: true
    //     },
    //     beforeEnter: (to, from, next) => {
    //         const roleUser = JSON.parse(localStorage.getItem('userRole'))
    //         const isAuth = JSON.parse(localStorage.getItem('userData'))
    //         if(!isAuth || roleUser !== 'admin') next({ name: 'views.login' })
    //         else next()
    //     }
    // },
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

const router = createRouter({
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