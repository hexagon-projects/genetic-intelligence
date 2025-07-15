import { jwtDecode } from "jwt-decode"
import Cookies from 'js-cookie'
import { useRouter } from "vue-router"

const router = useRouter()

export default [
    {
        path: '/admin-bk/dashboard',
        name: 'amdinbk.views.dashboard',
        // component: () => import('../components/dashboard/newDashboard2.vue'),
        component: () => import('@/views/REMAKE/Dashboard/adminbk/Dashboard.vue'),
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
        path: '/admin-bk/anggota',
        name: 'amdinbk.views.anggota',
        // component: () => import('../components/dashboard/newDashboard2.vue'),
        component: () => import('@/views/REMAKE/Dashboard/adminbk/Anggota.vue'),
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
        path: '/admin-bk/transaksi',
        name: 'amdinbk.views.transaksi',
        // component: () => import('../components/dashboard/newDashboard2.vue'),
        component: () => import('@/views/REMAKE/Dashboard/adminbk/Transaksi.vue'),
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