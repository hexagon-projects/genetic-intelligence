import { jwtDecode } from "jwt-decode"
import Cookies from 'js-cookie'

export default [
    {
        path: '/data-customer',
        name: 'admin.views.customers',
        component: () => import('@/views/REMAKE/Admin/Users/Customers.vue'),
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
                if(decodeRoleUser !== 'admin') next({ name: 'views.login' })
                else next()
            }
        }
    },
    {
        path: '/data-konsultan',
        name: 'admin.views.konsultan',
        component: () => import('@/views/REMAKE/Admin/Consultants/Consultants.vue'),
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
                if(decodeRoleUser !== 'admin') next({ name: 'views.login' })
                else next()
            }
        }
    },
    {
        path: '/registrasi-konsultan',
        name: 'admin.views.konsultan.register',
        component: () => import('@/views/REMAKE/Admin/Consultants/Registrasi.vue'),
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
                if(decodeRoleUser !== 'admin') next({ name: 'views.login' })
                else next()
            }
        }
    },
    {
        path: '/data-reservasi-gim',
        name: 'admin.views.reservasi',
        component: () => import('@/views/REMAKE/Admin/Reservasi/ListReservasi.vue'),
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
                if(decodeRoleUser !== 'admin') next({ name: 'views.login' })
                else next()
            }
        }
    },
    {
        path: '/data-reservasi-psikotest',
        name: 'admin.views.reservasi_psikotest',
        component: () => import('@/components/admin/reservasi/reservasiPsikotest.vue'),
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
                if(decodeRoleUser !== 'admin') next({ name: 'views.login' })
                else next()
            }
        }
    },
    {
        path: '/riwayat-pembayaran',
        name: 'admin.views.riwayat_pembayaran',
        component: () => import('@/views/REMAKE/Admin/Pembayaran/Riwayat.vue'),
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
                if(decodeRoleUser !== 'admin') next({ name: 'views.login' })
                else next()
            }
        }
    },
    {
        path: '/pengaturan-harga',
        name: 'admin.views.pengaturan_harga',
        component: () => import('@/views/REMAKE/Admin/Pengaturan/Harga.vue'),
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
                if(decodeRoleUser !== 'admin') next({ name: 'views.login' })
                else next()
            }
        }
    },
    {
        path: '/pengaturan-soal-assessment',
        name: 'admin.views.pengaturan_soal_assessment',
        component: () => import('@/views/REMAKE/Admin/Pengaturan/SoalAssessment.vue'),
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
                if(decodeRoleUser !== 'admin') next({ name: 'views.login' })
                else next()
            }
        }
    },
    {
        path: '/pengaturan-hasil-assessment',
        name: 'admin.views.pengaturan_hasil_assessment',
        component: () => import('@/views/REMAKE/Admin/Pengaturan/HasilAssessment.vue'),
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
                if(decodeRoleUser !== 'admin') next({ name: 'views.login' })
                else next()
            }
        }
    },
    {
        path: '/pengaturan-code',
        name: 'admin.views.pengaturan_code',
        component: () => import('@/views/REMAKE/Admin/Pengaturan/CodeVoucher.vue'),
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
                if(decodeRoleUser !== 'admin') next({ name: 'views.login' })
                else next()
            }
        }
    },
    {
        path: '/data-guru',
        name: 'admin.views.guru',
        component: () => import('@/views/REMAKE/Admin/Staff/Guru.vue'),
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
                if(decodeRoleUser !== 'admin') next({ name: 'views.login' })
                else next()
            }
        }
    },
    {
        path: '/data-sekolah',
        name: 'admin.views.sekolah',
        component: () => import('@/views/REMAKE/Admin/Pengaturan/Sekolah.vue'),
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
                if(decodeRoleUser !== 'admin') next({ name: 'views.login' })
                else next()
            }
        }
    },
]