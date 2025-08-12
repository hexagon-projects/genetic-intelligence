import { jwtDecode } from "jwt-decode"
import Cookies from 'js-cookie'
import { useRouter } from "vue-router"

const router = useRouter()

export default [
    {
        path: '/staff/dashboard',
        name: 'staff.views.dashboard',
        // component: () => import('../components/dashboard/newDashboard2.vue'),
        component: () => import('@/views/REMAKE/Dashboard/Kepsek/Dashboard.vue'),
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
        path: '/staff/list-siswa',
        name: 'staff.views.list_siswa',
        // component: () => import('../components/dashboard/newDashboard2.vue'),
        component: () => import('@/views/REMAKE/Staff/ListSiswa/ListSiswa.vue'),
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
        path: '/staff/detail-siswa',
        name: 'staff.views.detail_siswa',
        component: () => import('@/views/REMAKE/Staff/DetailSiswa/DetailSiswa.vue'),
        meta: {
            showNavbar: true,
            showFooter: true
        },
        beforeEnter: (to, from, next) => {
            const token = Cookies.get('token');
            const isAuth = JSON.parse(localStorage.getItem('userData'));
            if (!isAuth || !token) {
                localStorage.clear();
                Cookies.remove('token');
                next({ name: 'views.login' });
            } else {
                const decodedToken = jwtDecode(token);
                const decodeRoleUser = decodedToken.role;
    
                if (decodeRoleUser === 'customer') next({ name: 'views.dashboard' });
                if (decodeRoleUser === 'consultant') next({ name: 'consultant.views.dashboard' });
                if (decodeRoleUser === 'admin') next({ name: 'admin.views.dashboard' });
    
                next();
            }
        }
    }    
]