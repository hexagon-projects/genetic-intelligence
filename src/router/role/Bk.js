import { jwtDecode } from "jwt-decode"
import Cookies from 'js-cookie'
import { useRouter } from "vue-router"

const router = useRouter()

export default [
    {
        path: '/bk/dashboard',
        name: 'bk.views.dashboard',
        // component: () => import('../components/dashboard/newDashboard2.vue'),
        component: () => import('@/views/REMAKE/Dashboard/Bk/Dashboard.vue'),
        meta: {
            showNavbar: true,
            showFooter: true
        },
        beforeEnter: (to, from, next) => {
            const token = Cookies.get('token')
            const isAuth = JSON.parse(localStorage.getItem('userData'))
            if(!isAuth || !token){
                localStorage.clear()
                Cookies.remove('token')
                next({ name: 'views.login' })
            } else {
                const decodedToken = jwtDecode(token);
                const decodeRoleUser = decodedToken.role

                if(decodeRoleUser == 'customer') next({name: 'views.dashboard'})
                if(decodeRoleUser == 'consultant') next({name: 'consultant.views.dashboard'})
                if(decodeRoleUser == 'admin') next({name: 'admin.views.dashboard'})

                next()
            } 
        }
    },
    {
        path: '/bk/statistik',
        name: 'bk.views.statistik',
        // component: () => import('../components/dashboard/newDashboard2.vue'),
        component: () => import('@/views/REMAKE/Dashboard/Bk/Statistik.vue'),
        meta: {
            showNavbar: true,
            showFooter: true
        },
        beforeEnter: (to, from, next) => {
            const token = Cookies.get('token')
            const isAuth = JSON.parse(localStorage.getItem('userData'))
            if(!isAuth || !token){
                localStorage.clear()
                Cookies.remove('token')
                next({ name: 'views.login' })
            } else {
                const decodedToken = jwtDecode(token);
                const decodeRoleUser = decodedToken.role

                if(decodeRoleUser == 'customer') next({name: 'views.dashboard'})
                if(decodeRoleUser == 'consultant') next({name: 'consultant.views.dashboard'})
                if(decodeRoleUser == 'admin') next({name: 'admin.views.dashboard'})

                next()
            } 
        }
    },
    {
        path: '/bk/pengguna',
        name: 'bk.views.pengguna',
        // component: () => import('../components/dashboard/newDashboard2.vue'),
        component: () => import('@/views/REMAKE/Dashboard/Bk/Pengguna.vue'),
        meta: {
            showNavbar: true,
            showFooter: true
        },
        beforeEnter: (to, from, next) => {
            const token = Cookies.get('token')
            const isAuth = JSON.parse(localStorage.getItem('userData'))
            if(!isAuth || !token){
                localStorage.clear()
                Cookies.remove('token')
                next({ name: 'views.login' })
            } else {
                const decodedToken = jwtDecode(token);
                const decodeRoleUser = decodedToken.role

                if(decodeRoleUser == 'customer') next({name: 'views.dashboard'})
                if(decodeRoleUser == 'consultant') next({name: 'consultant.views.dashboard'})
                if(decodeRoleUser == 'admin') next({name: 'admin.views.dashboard'})

                next()
            } 
        }
    },
    {
        path: '/bk/detail_siswa',
        name: 'bk.views.detail_siswa',
        // component: () => import('../components/dashboard/newDashboard2.vue'),
        component: () => import('@/views/REMAKE/Dashboard/Bk/Detail/DetailSiswa.vue'),
        meta: {
            showNavbar: true,
            showFooter: true
        },
        beforeEnter: (to, from, next) => {
            const token = Cookies.get('token')
            const isAuth = JSON.parse(localStorage.getItem('userData'))
            if(!isAuth || !token){
                localStorage.clear()
                Cookies.remove('token')
                next({ name: 'views.login' })
            } else {
                const decodedToken = jwtDecode(token);
                const decodeRoleUser = decodedToken.role

                if(decodeRoleUser == 'customer') next({name: 'views.dashboard'})
                if(decodeRoleUser == 'consultant') next({name: 'consultant.views.dashboard'})
                if(decodeRoleUser == 'admin') next({name: 'admin.views.dashboard'})

                next()
            } 
        }
    },
    {
        path: '/bk/conseling',
        name: 'bk.views.pra.conseling',
        // component: () => import('../components/dashboard/newDashboard2.vue'),
        component: () => import('@/views/REMAKE/Dashboard/Bk/Conseling/Conseling.vue'),
        meta: {
            showNavbar: true,
            showFooter: true
        },
        beforeEnter: (to, from, next) => {
            const token = Cookies.get('token')
            const isAuth = JSON.parse(localStorage.getItem('userData'))
            if(!isAuth || !token){
                localStorage.clear()
                Cookies.remove('token')
                next({ name: 'views.login' })
            } else {
                const decodedToken = jwtDecode(token);
                const decodeRoleUser = decodedToken.role

                if(decodeRoleUser == 'customer') next({name: 'views.dashboard'})
                if(decodeRoleUser == 'consultant') next({name: 'consultant.views.dashboard'})
                if(decodeRoleUser == 'admin') next({name: 'admin.views.dashboard'})

                next()
            } 
        }
    },
    {
        path: '/bk/detail_conseling',
        name: 'bk.views.detail_conseling',
        // component: () => import('../components/dashboard/newDashboard2.vue'),
        component: () => import('@/views/REMAKE/Dashboard/Bk/Conseling/Detail.vue'),
        meta: {
            showNavbar: true,
            showFooter: true
        },
        beforeEnter: (to, from, next) => {
            const token = Cookies.get('token')
            const isAuth = JSON.parse(localStorage.getItem('userData'))
            if(!isAuth || !token){
                localStorage.clear()
                Cookies.remove('token')
                next({ name: 'views.login' })
            } else {
                const decodedToken = jwtDecode(token);
                const decodeRoleUser = decodedToken.role

                if(decodeRoleUser == 'customer') next({name: 'views.dashboard'})
                if(decodeRoleUser == 'consultant') next({name: 'consultant.views.dashboard'})
                if(decodeRoleUser == 'admin') next({name: 'admin.views.dashboard'})

                next()
            } 
        }
    },
    {
        path: '/bk/profile',
        name: 'bk.views.profile',
        // component: () => import('../components/dashboard/newDashboard2.vue'),
        component: () => import('@/views/REMAKE/Dashboard/Bk/Profile.vue'),
        meta: {
            showNavbar: true,
            showFooter: true
        },
        beforeEnter: (to, from, next) => {
            const token = Cookies.get('token')
            const isAuth = JSON.parse(localStorage.getItem('userData'))
            if(!isAuth || !token){
                localStorage.clear()
                Cookies.remove('token')
                next({ name: 'views.login' })
            } else {
                const decodedToken = jwtDecode(token);
                const decodeRoleUser = decodedToken.role

                if(decodeRoleUser == 'customer') next({name: 'views.dashboard'})
                if(decodeRoleUser == 'consultant') next({name: 'consultant.views.dashboard'})
                if(decodeRoleUser == 'admin') next({name: 'admin.views.dashboard'})

                next()
            } 
        }
    },
    {
        path: '/bk/placemnet',
        name: 'bk.views.placement',
        component: () => import('@/views/REMAKE/Dashboard/Bk/Placement.vue'),
        meta: {
            showNavbar: true,
            showFooter: true
        },
        beforeEnter: (to, from, next) => {
            const token = Cookies.get('token')
            const isAuth = JSON.parse(localStorage.getItem('userData'))
            if(!isAuth || !token){
                localStorage.clear()
                Cookies.remove('token')
                next({ name: 'views.login' })
            } else {
                const decodedToken = jwtDecode(token);
                const decodeRoleUser = decodedToken.role

                if(decodeRoleUser == 'customer') next({name: 'views.dashboard'})
                if(decodeRoleUser == 'consultant') next({name: 'consultant.views.dashboard'})
                if(decodeRoleUser == 'admin') next({name: 'admin.views.dashboard'})

                next()
            } 
        }
    },
    {
        path: '/bk/submmision-kta',
        name: 'bk.views.submision-kta',
        component: () => import('@/views/REMAKE/Dashboard/Bk/SubmissionKta.vue'),
        meta: {
            showNavbar: true,
            showFooter: true
        },
        beforeEnter: (to, from, next) => {
            const token = Cookies.get('token')
            const isAuth = JSON.parse(localStorage.getItem('userData'))
            if(!isAuth || !token){
                localStorage.clear()
                Cookies.remove('token')
                next({ name: 'views.login' })
            } else {
                const decodedToken = jwtDecode(token);
                const decodeRoleUser = decodedToken.role

                if(decodeRoleUser == 'customer') next({name: 'views.dashboard'})
                if(decodeRoleUser == 'consultant') next({name: 'consultant.views.dashboard'})
                if(decodeRoleUser == 'admin') next({name: 'admin.views.dashboard'})

                next()
            } 
        }
    },
    {
        path: '/bk/report-conseling',
        name: 'bk.views.report_conseling',
        component: () => import('@/views/REMAKE/Dashboard/Bk/Report.vue'),
        meta: {
            showNavbar: true,
            showFooter: true
        },
        beforeEnter: (to, from, next) => {
            const token = Cookies.get('token')
            const isAuth = JSON.parse(localStorage.getItem('userData'))
            if(!isAuth || !token){
                localStorage.clear()
                Cookies.remove('token')
                next({ name: 'views.login' })
            } else {
                const decodedToken = jwtDecode(token);
                const decodeRoleUser = decodedToken.role

                if(decodeRoleUser == 'customer') next({name: 'views.dashboard'})
                if(decodeRoleUser == 'consultant') next({name: 'consultant.views.dashboard'})
                if(decodeRoleUser == 'admin') next({name: 'admin.views.dashboard'})

                next()
            } 
        }
    },
]