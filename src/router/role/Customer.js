import { jwtDecode } from "jwt-decode"
import Cookies from 'js-cookie'
import { useRouter } from "vue-router"

const router = useRouter()

export default [
    {
        path: '/starter-pack',
        name: 'user.views.starter_pack',
        component: () => import('@/views/REMAKE/Customer/StarterPack/StarterPack.vue'),
        // component: () => import('../views/customers/deteksi_gim/deteksi.vue'),
        meta: {
            showNavbar: true,
            showFooter: true
        },
        beforeEnter: (to, from, next) => {
            const token = Cookies.get('token')
            // const token = Cookies.get('token')
            const isAuth = JSON.parse(localStorage.getItem('userData'))
            if (!token || !isAuth) {
                // Jika token tidak ada, arahkan pengguna ke halaman login
                next({ name: 'views.login' });
            } else {
                const decodedToken = jwtDecode(token);
                //console.log(`di deocde cek`, decodedToken);
                const decodeRoleUser = decodedToken.role
                if (decodeRoleUser !== 'customer') {
                    next({ name: 'views.login' });
                } else {
                    const isStudent = isAuth.is_student;
                    if (isStudent === 0) {
                        next({ name: 'views.dashboard' });
                    } else {
                        next();
                    }
                }
            }
        }
    },
    {
        path: '/deteksi',
        name: 'user.views.deteksi',
        component: () => import('@/views/REMAKE/Customer/Test/GIM/TestGIM.vue'),
        // component: () => import('../views/customers/deteksi_gim/deteksi.vue'),
        meta: {
            showNavbar: true,
            showFooter: true
        },
        beforeEnter: (to, from, next) => {
            const token = Cookies.get('token')
            // const token = Cookies.get('token')
            const isAuth = JSON.parse(localStorage.getItem('userData'))
            if (!token || !isAuth) {
                // Jika token tidak ada, arahkan pengguna ke halaman login
                next({ name: 'views.login' });
            } else if(isAuth && isAuth.is_payment_gim == 'Tidak') {
                // console.log(`can mayar sia`)
                next('/pembayaran/test-gim')
                // router.push('/pembayaran/test-gim')
                next()
            } else {
                const decodedToken = jwtDecode(token);
                //console.log(`di deocde cek`, decodedToken);
                const decodeRoleUser = decodedToken.role
                const roleUser = JSON.parse(localStorage.getItem('userRole'))
                if(decodeRoleUser !== 'customer') next({ name: 'views.login' })
                else next()
            }
        }
    },
    {
        path: '/test-assesment',
        name: 'user.views.assesment',
        component: () => import('@/views/REMAKE/Customer/Test/Assessment/TestAssessment.vue'),
        // component: () => import('@/components/customer/tests/assesment.vue'),
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
            } else if(isAuth && isAuth.is_payment_assessment == 'Tidak') {
                next('/pembayaran/test-assessment')
                // router.push('/pembayaran/test-assessment')
                next() 
            } else {
                const decodedToken = jwtDecode(token);
                //console.log(`di deocde cek`, decodedToken);
                const decodeRoleUser = decodedToken.role
                const roleUser = JSON.parse(localStorage.getItem('userRole'))
                if(decodeRoleUser !== 'customer') next({ name: 'views.login' })
                else next()
            }
        }
    },
    {
        path: '/test-psikotest',
        name: 'user.views.psikotest',
        component: () => import('@/components/customer/tests/psikotest.vue'),
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
                if(decodeRoleUser !== 'customer') next({ name: 'views.login' })
                else next()
            }
        }
    },
    {
        path: '/test-iq',
        name: 'user.views.iq',
        component: () => import('@/views/REMAKE/Customer/Test/IQ/TestIQ.vue'),
        // component: () => import('@/components/customer/tests/iq.vue'),
        meta: {
            showNavbar: true,
            showFooter: true
        },
        beforeEnter: (to, from, next) => {
            const token = Cookies.get('token')
            const isAuth = JSON.parse(localStorage.getItem('userData'))
            if (!token || !isAuth) {
                next({ name: 'views.login' });
            } else if(isAuth && isAuth.is_payment_iq == 'Tidak') {
                next('/pembayaran/test-iq')
                // router.push('/pembayaran/test-iq')
                next()
            } else {
                const decodedToken = jwtDecode(token);
                //console.log(`di deocde cek`, decodedToken);
                const decodeRoleUser = decodedToken.role
                const roleUser = JSON.parse(localStorage.getItem('userRole'))
                if(decodeRoleUser !== 'customer') next({ name: 'views.login' })
                else next()
            }
        }
    },
    {
        path: '/test-cpm',
        name: 'user.views.cpm',
        component: () => import('@/views/customers/CPM/CPM.vue'),
        meta: {
            showNavbar: true,
            showFooter: true
        },
        beforeEnter: (to, from, next) => {
            const token = Cookies.get('token')
            const isAuth = JSON.parse(localStorage.getItem('userData'))
            if (!token || !isAuth) {
                next({ name: 'views.login' });
            // } else if(isAuth && isAuth.is_payment_iq == 'Tidak') {
            //     router.push('/pembayaran/test-iq')
            //     next()
            } else {
                const decodedToken = jwtDecode(token);
                //console.log(`di deocde cek`, decodedToken);
                const decodeRoleUser = decodedToken.role
                const roleUser = JSON.parse(localStorage.getItem('userRole'))
                if(decodeRoleUser !== 'customer') next({ name: 'views.login' })
                else next()
            }
        }
    },
    {
        path: '/hasil-deteksi',
        name: 'user.views.hasil_deteksi',
        // component: () => import('../views/customers/hasil_deteksi/newHasil.vue'),
        component: () => import('@/views/REMAKE/Customer/HasilTest/GIM/HasilGIM.vue'),
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
                if(decodeRoleUser !== 'customer') next({ name: 'views.login' })
                else next()
            }
        }
    },
    {
        path: '/hasil-assessment',
        name: 'user.views.hasil_assessment',
        component: () => import('@/views/REMAKE/Customer/HasilTest/Assessment/HasilAssessment.vue'),
        // component: () => import('../components/customer/tests/assessment_comps/hasil_test/hasil.vue'),
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
                if(decodeRoleUser !== 'customer') next({ name: 'views.login' })
                else next()
            }
        }
    },
    {
        path: '/hasil-iq',
        name: 'user.views.hasil_iq',
        component: () => import('@/views/REMAKE/Customer/HasilTest/IQ/HasilIQ.vue'),
        // component: () => import('../components/customer/tests/iq_comps/hasil_test/hasil_test.vue'),
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
                if(decodeRoleUser !== 'customer') next({ name: 'views.login' })
                else next()
            }
        }
    },
    {
        path: '/hasil-rmib',
        name: 'user.views.hasil_rmib',
        component: () => import('@/views/REMAKE/Customer/Test/RMIB/HasilRmib1.vue'),
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
                if(decodeRoleUser !== 'customer') next({ name: 'views.login' })
                else next()
            }
        }
    },
    {
        path: '/hasil-cpm',
        name: 'user.views.hasil_cpm',
        component: () => import('@/views/customers/CPM/Hasil/HasilCPM.vue'),
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
                if(decodeRoleUser !== 'customer') next({ name: 'views.login' })
                else next()
            }
        }
    },
    {
        path: '/download-hasil-cpm',
        name: 'user.views.download_hasil_cpm',
        component: () => import('@/views/customers/CPM/Hasil/Download.vue'),
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
                if(decodeRoleUser !== 'customer') next({ name: 'views.login' })
                else next()
            }
        }
    },
    {
        path: '/payment-status',
        name: 'user.views.payment_status',
        component: () => import('@/components/customer/payment_status/payment.vue'),
        meta: {
            showNavbar: false,
            showFooter: false
        },
    },
    {
        path: '/reservasi',
        name: 'user.views.reservasi',
        // component: () => import('@/views/REMAKE/Customer/Reservasi/Reservasi.vue'),
        component: () => import('@/components/customer/reservasi/reservasi.vue'),
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
                if(decodeRoleUser !== 'customer') next({ name: 'views.login' })
                else next()
            }
        }
    },
    {
        path: '/test-rmib',
        name: 'user.views.rmib',
        component: () => import('@/views/REMAKE/Customer/Test/RMIB/TestRmib.vue'),
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
            } 
            else if(isAuth && isAuth.is_payment_rmib == 'Tidak') {
                next('/pembayaran/test-rmib')
                next() 
            }
            else {
                const decodedToken = jwtDecode(token);
                //console.log(`di deocde cek`, decodedToken);
                const decodeRoleUser = decodedToken.role
                const roleUser = JSON.parse(localStorage.getItem('userRole'))
                if(decodeRoleUser !== 'customer') next({ name: 'views.login' })
                else next()
            }
        }
    },
    {
        path:'/test-gadget',
        name:'user.views.test_gadget',
        component: () => import('@/views/REMAKE/Customer/Test/Gadget/TestGadget.vue'),
        meta: {
            showNavbar: true,
            showFooter: true
        },
        beforeEnter: (to, from, next) => {
            const token = Cookies.get('token')
            const isAuth = JSON.parse(localStorage.getItem('userData'))
            if (!token || !isAuth) {
                next({ name: 'views.login' });
            } 
            else if(isAuth && isAuth.is_payment_iaa == 'Tidak') {
                next('/pembayaran/test-iaa')
                // router.push('/pembayaran/test-iq')
                next()
            } 
            else {
                const decodedToken = jwtDecode(token);
                //console.log(`di deocde cek`, decodedToken);
                const decodeRoleUser = decodedToken.role
                const roleUser = JSON.parse(localStorage.getItem('userRole'))
                if(decodeRoleUser !== 'customer') next({ name: 'views.login' })
                else next()
            }
        }
    },
    {
        path: '/hasil-gadget',
        name: 'user.views.hasil_gadget',
        component: () => import('@/views/REMAKE/Customer/Test/Gadget/HasilGadget.vue'),
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
                if(decodeRoleUser !== 'customer') next({ name: 'views.login' })
                else next()
            }
        }
    },
]
