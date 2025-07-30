import { jwtDecode } from "jwt-decode"
import Cookies from 'js-cookie'

export default [
    {
        path: '/consultant/review-test',
        name: 'consultant.views.review',
        component: () => import('@/views/REMAKE/Consultant/ReviewTest/ReviewTest.vue'),
        // component: () => import('@/components/consultant/review_test/review.vue'),
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
                const decodedToken = jwtDecode(token);
                //console.log(`di deocde cek`, decodedToken);
                const decodeRoleUser = decodedToken.role
                const roleUser = JSON.parse(localStorage.getItem('userRole'))
                if(decodeRoleUser !== 'consultant') next({ name: 'views.login' })
                else next()
            }
        }
    },
    {
        path: '/consultant/hasil-test',
        name: 'consultant.views.hasil',
        component: () => import('@/views/REMAKE/Consultant/HasilTest/HasilTest.vue'),
        // component: () => import('@/components/consultant/hasil_test/hasil_gim.vue'),
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
                const decodedToken = jwtDecode(token);
                //console.log(`di deocde cek`, decodedToken);
                const decodeRoleUser = decodedToken.role
                const roleUser = JSON.parse(localStorage.getItem('userRole'))
                if(decodeRoleUser !== 'consultant') next({ name: 'views.login' })
                else next()
            }
        }
    },
    {
        path: '/consultant/detail-review/:id',
        name: 'consultant.views.review.detail',
        component: () => import('@/views/REMAKE/Consultant/ReviewTest/DetailReview.vue'),
        // component: () => import('@/components/consultant/review_test/DetailReview.vue'),
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
                const decodedToken = jwtDecode(token);
                //console.log(`di deocde cek`, decodedToken);
                const decodeRoleUser = decodedToken.role
                const roleUser = JSON.parse(localStorage.getItem('userRole'))
                if(decodeRoleUser !== 'consultant') next({ name: 'views.login' })
                else next()
            }
        }
    },
    {
        path: '/consultant/bookings',
        name: 'consultant.views.bookings',
        component: () => import('@/views/REMAKE/Consultant/Hallopsy/BookingView.vue'),
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
                const decodedToken = jwtDecode(token);
                //console.log(`di deocde cek`, decodedToken);
                const decodeRoleUser = decodedToken.role
                const roleUser = JSON.parse(localStorage.getItem('userRole'))
                if(decodeRoleUser !== 'consultant') next({ name: 'views.login' })
                else next()
            }
        }
    },
    {
        path: '/consultant/permintaan-reservasi',
        name: 'consultant.views.permintaan',
        component: () => import('@/views/REMAKE/Consultant/Reservasi/PermintaanReservasi.vue'),
        // component: () => import('@/components/consultant/reservasi/permintaan/permintaan.vue'),
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
                const decodedToken = jwtDecode(token);
                //console.log(`di deocde cek`, decodedToken);
                const decodeRoleUser = decodedToken.role
                const roleUser = JSON.parse(localStorage.getItem('userRole'))
                if(decodeRoleUser !== 'consultant') next({ name: 'views.login' })
                else next()
            }
        }
    },
    {
        path: '/consultant/jadwal-reservasi',
        name: 'consultant.views.jadwal',
        component: () => import('@/views/REMAKE/Consultant/Reservasi/JadwalReservasi.vue'),
        // component: () => import('@/components/consultant/reservasi/jadwal/jadwal.vue'),
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
                const decodedToken = jwtDecode(token);
                //console.log(`di deocde cek`, decodedToken);
                const decodeRoleUser = decodedToken.role
                const roleUser = JSON.parse(localStorage.getItem('userRole'))
                if(decodeRoleUser !== 'consultant') next({ name: 'views.login' })
                else next()
            }
        }
    },
    {
        path: '/consultant/list-assessments',
        name: 'consultant.views.assessments',
        component: () => import('@/views/REMAKE/Consultant/Assessment/ListAssessment.vue'),
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
                const decodedToken = jwtDecode(token);
                //console.log(`di deocde cek`, decodedToken);
                const decodeRoleUser = decodedToken.role
                const roleUser = JSON.parse(localStorage.getItem('userRole'))
                if(decodeRoleUser !== 'consultant') next({ name: 'views.login' })
                else next()
            }
        }
    },
]