import { jwtDecode } from "jwt-decode"
import Cookies from 'js-cookie'
import { useRouter } from "vue-router"

const router = useRouter()

export default [
    {
        path: '/logout',
        name: 'user.views.logout',
        beforeEnter: async (to, from, next) => {
            const token = Cookies.get('token')
            const isAuth = JSON.parse(localStorage.getItem('userData'))

            try {
                if (token) {
                    await initAPI('post', 'logout', null, token)
                }
            } catch (error) {
                console.error('Logout error:', error)
            } finally {
                // Hapus semua data sesi
                localStorage.clear()
                Cookies.remove('token')
                next({ name: 'views.login' });

                // Kalau kamu pakai Vuex
                if (store) {
                    store.commit('user', null)
                    store.commit('userRole', null)
                }
            }
        }
    },
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
    {
        path:'/test-kebahagiaan',
        name:'user.views.test_kebahagiaan',
        component: () => import('@/views/REMAKE/Customer/Test/TIK/TestKebahagiaan.vue'),
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
            else if(isAuth && isAuth.is_payment_tik == 'Tidak') {
                next('/pembayaran/test-tik')
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
        path:'/soal-kebahagiaan',
        name:'user.views.test_kebahagiaan_soal',
        component: () => import('@/views/REMAKE/Customer/Test/TIK/SoalKebahagiaan.vue'),
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
            else if(isAuth && isAuth.is_payment_tik == 'Tidak') {
                next('/pembayaran/test-tik')
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
        path: '/hasil-bahagia',
        name: 'user.views.hasil_bahagia',
        component: () => import('@/views/REMAKE/Customer/Test/TIK/HasilBahagia.vue'),
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
        path:'/test-jatidiri',
        name:'user.views.test_jatidiri',
        component: () => import('@/views/REMAKE/Customer/Test/Jatidiri/TestJatidiri.vue'),
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
            else if(isAuth && isAuth.is_payment_jatidiri == 'Tidak') {
                next('/pembayaran/test-jatidiri')
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
        path:'/test-jatidiri-intruction',
        name:'user.views.test_jatidiri_intruction_q1',
        component: () => import('@/views/REMAKE/Customer/Test/Jatidiri/IntructionJatidiriQ1.vue'),
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
            else if(isAuth && isAuth.is_payment_jatidiri == 'Tidak') {
                next('/pembayaran/test-jatidiri')
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
        path:'/soal-jatidiri-q1',
        name:'user.views.test_q1_soal',
        component: () => import('@/views/REMAKE/Customer/Test/Jatidiri/SoalQ1.vue'),
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
            else if(isAuth && isAuth.is_payment_jatidiri == 'Tidak') {
                next('/pembayaran/test-tik')
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
        path: '/hasil-jatidiri-q1',
        name: 'user.views.hasil_jatidiri_q1',
        component: () => import('@/views/REMAKE/Customer/Test/Jatidiri/HasilQ1.vue'),
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
        path:'/test-jatidiri-intruction-q2',
        name:'user.views.test_jatidiri_intruction_q2',
        component: () => import('@/views/REMAKE/Customer/Test/Jatidiri/IntructionJatidiriQ2.vue'),
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
            else if(isAuth && isAuth.is_payment_jatidiri == 'Tidak') {
                next('/pembayaran/test-jatidiri')
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
        path:'/soal-jatidiri-q2',
        name:'user.views.test_q2_soal',
        component: () => import('@/views/REMAKE/Customer/Test/Jatidiri/SoalQ2.vue'),
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
            else if(isAuth && isAuth.is_payment_jatidiri == 'Tidak') {
                next('/pembayaran/test-tik')
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
        path: '/hasil-jatidiri-q2',
        name: 'user.views.hasil_jatidiri_q2',
        component: () => import('@/views/REMAKE/Customer/Test/Jatidiri/HasilQ2.vue'),
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
        path:'/test-jatidiri-anxiety',
        name:'user.views.test_jatidiri_anxiety',
        component: () => import('@/views/REMAKE/Customer/Test/Anxiety/Introduction.vue'),
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
            else if(isAuth && isAuth.is_payment_anxiety == 'Tidak') {
                next('/pembayaran/test-anxiety')
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
        path:'/soal-jatidiri-anxiety',
        name:'user.views.test_anxiety_soal',
        component: () => import('@/views/REMAKE/Customer/Test/Anxiety/Soal.vue'),
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
            else if(isAuth && isAuth.is_payment_anxiety == 'Tidak') {
                next('/pembayaran/test-anxiety')
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
        path: '/hasil-jatidiri-anxiety',
        name: 'user.views.hasil_jatidiri_anxiety',
        component: () => import('@/views/REMAKE/Customer/Test/Anxiety/Hasil.vue'),
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
        path:'/test-jatidiri-stres',
        name:'user.views.test_jatidiri_stres',
        component: () => import('@/views/REMAKE/Customer/Test/Stres/Introduction.vue'),
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
            else if(isAuth && isAuth.is_payment_stres == 'Tidak') {
                next('/pembayaran/test-stres')
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
        path:'/soal-jatidiri-stres',
        name:'user.views.test_stres_soal',
        component: () => import('@/views/REMAKE/Customer/Test/Stres/Soal.vue'),
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
            else if(isAuth && isAuth.is_payment_stres == 'Tidak') {
                next('/pembayaran/test-stres')
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
        path: '/hasil-jatidiri-stres',
        name: 'user.views.hasil_jatidiri_stres',
        component: () => import('@/views/REMAKE/Customer/Test/Stres/Hasil.vue'),
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
        path:'/test-jatidiri-mental',
        name:'user.views.test_jatidiri_mental',
        component: () => import('@/views/REMAKE/Customer/Test/Mental/Introduction.vue'),
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
            else if(isAuth && isAuth.is_payment_mental == 'Tidak') {
                next('/pembayaran/test-mental')
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
        path:'/soal-jatidiri-mental',
        name:'user.views.test_mental_soal',
        component: () => import('@/views/REMAKE/Customer/Test/Mental/Soal.vue'),
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
            else if(isAuth && isAuth.is_payment_mental == 'Tidak') {
                next('/pembayaran/test-mental')
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
        path: '/hasil-jatidiri-mental',
        name: 'user.views.hasil_jatidiri_mental',
        component: () => import('@/views/REMAKE/Customer/Test/Mental/Hasil.vue'),
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
        path:'/test-talen-mapping',
        name:'user.views.test_talen_mapping',
        component: () => import('@/views/REMAKE/Customer/Test/Mapping/Introduction.vue'),
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
            else if(isAuth && isAuth.is_payment_mapping == 'Tidak') {
                next('/pembayaran/test-mapping')
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
        path:'/soal-talent-mapping',
        name:'user.views.test_talent_mapping',
        component: () => import('@/views/REMAKE/Customer/Test/Mapping/Soal.vue'),
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
            else if(isAuth && isAuth.is_payment_mapping == 'Tidak') {
                next('/pembayaran/test-mapping')
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
        path: '/hasil-talent-mapping',
        name: 'user.views.hasil_talent_mapping',
        component: () => import('@/views/REMAKE/Customer/Test/Mapping/Hasil.vue'),
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
        path: '/hallopsy/reservasi/detail/terms',
        name: 'user.views.reservasi_detail_book_terms',
        component: () => import('@/views/REMAKE/Customer/Test/HalloPsy/Terms.vue'),
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
        path: '/hallopsy/result/:id',
        name: 'user.views.hallopsy_result',
        component: () => import('@/views/REMAKE/Customer/Test/HalloPsy/Result.vue'),
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
        path: '/hallopsy/booking/:id',
        name: 'user.views.hallopsy_book_detail',
        component: () => import('@/views/REMAKE/Customer/Test/HalloPsy/BookUserDetail.vue'),
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
    path: '/hallopsy/reservasi/detail/:id/book/session/',
    name: 'user.views.reservasi_detail_book_session',
    component: () => import('@/views/REMAKE/Customer/Test/HalloPsy/BookSession.vue'),
    beforeEnter: (to, from, next) => {
        const token = Cookies.get('token');
        const isAuth = JSON.parse(localStorage.getItem('userData'));
        if (!token || !isAuth) {
            // Jika token tidak ada, arahkan pengguna ke halaman login
            next({ name: 'views.login' });
        } else {
            const decodedToken = jwtDecode(token);
            const decodeRoleUser = decodedToken.role;
            const roleUser = JSON.parse(localStorage.getItem('userRole'));
            if (decodeRoleUser !== 'customer') {
                next({ name: 'views.login' });
            } else {
                next();
            }
        }
    }
},
{
    path: '/hallopsy/booking-history',
    name: 'user.views.booking_history',
    component: () => import('@/views/REMAKE/Customer/Test/HalloPsy/BookHistory.vue'),
    beforeEnter: (to, from, next) => {
        const token = Cookies.get('token');
        const isAuth = JSON.parse(localStorage.getItem('userData'));
        if (!token || !isAuth) {
            next({ name: 'views.login' });
        } else {
            const decodedToken = jwtDecode(token);
            const decodeRoleUser = decodedToken.role;
            if(decodeRoleUser !== 'customer') next({ name: 'views.login' });
            else next();
        }
    }
},
{
    path: '/hallopsy/book/time',
    name: 'user.views.book_by_time',
    component: () => import('@/views/REMAKE/Customer/Test/HalloPsy/BookTime.vue'),
    beforeEnter: (to, from, next) => {
        const token = Cookies.get('token');
        const isAuth = JSON.parse(localStorage.getItem('userData'));
        if (!token || !isAuth) {
            // Jika token tidak ada, arahkan pengguna ke halaman login
            next({ name: 'views.login' });
        } else {
            const decodedToken = jwtDecode(token);
            const decodeRoleUser = decodedToken.role;
            const roleUser = JSON.parse(localStorage.getItem('userRole'));
            if (decodeRoleUser !== 'customer') {
                next({ name: 'views.login' });
            } else {
                next();
            }
        }
    }
},


//Jatidiri TK
{
    path: '/tk/kuisioner',
    name: 'user.views.tk_kuisioner',
    component: () => import('@/views/REMAKE/Customer/Kuisioner/Kuisioner.vue'),
    beforeEnter: (to, from, next) => {
        const token = Cookies.get('token');
        const isAuth = JSON.parse(localStorage.getItem('userData'));
        if (!token || !isAuth) {
            next({ name: 'views.login' });
        } else {
            const decodedToken = jwtDecode(token);
            const decodeRoleUser = decodedToken.role;
            const roleUser = JSON.parse(localStorage.getItem('userRole'));
            if (decodeRoleUser !== 'customer') {
                next({ name: 'views.login' });
            } else {
                next();
            }
        }
    }
},

//GURU TK
{
    path: '/guru',
    name: 'user.views.guru_tk',
    component: () => import('@/views/REMAKE/Dashboard/GuruTk/Beranda.vue'),
    beforeEnter: (to, from, next) => {
        const token = Cookies.get('token');
        const isAuth = JSON.parse(localStorage.getItem('userData'));
        if (!token || !isAuth) {
            // Jika token tidak ada, arahkan pengguna ke halaman login
            next({ name: 'views.login' });
        } else {
            const decodedToken = jwtDecode(token);
            const decodeRoleUser = decodedToken.role;
            const roleUser = JSON.parse(localStorage.getItem('userRole'));
            if (decodeRoleUser !== 'customer') {
                next({ name: 'views.login' });
            } else {
                next();
            }
        }
    }
},
{
    path: '/guru/profile',
    name: 'user.views.guru_profile',
    component: () => import('@/views/REMAKE/GuruTk/Profile.vue'),
    beforeEnter: (to, from, next) => {
        const token = Cookies.get('token');
        const isAuth = JSON.parse(localStorage.getItem('userData'));
        if (!token || !isAuth) {
            // Jika token tidak ada, arahkan pengguna ke halaman login
            next({ name: 'views.login' });
        } else {
            const decodedToken = jwtDecode(token);
            const decodeRoleUser = decodedToken.role;
            const roleUser = JSON.parse(localStorage.getItem('userRole'));
            if (decodeRoleUser !== 'customer') {
                next({ name: 'views.login' });
            } else {
                next();
            }
        }
    }
},
{
    path: '/guru/anak',
    name: 'user.views.anak',
    component: () => import('@/views/REMAKE/GuruTk/GuruListAnak.vue'),
    beforeEnter: (to, from, next) => {
        const token = Cookies.get('token');
        const isAuth = JSON.parse(localStorage.getItem('userData'));
        if (!token || !isAuth) {
            // Jika token tidak ada, arahkan pengguna ke halaman login
            next({ name: 'views.login' });
        } else {
            const decodedToken = jwtDecode(token);
            const decodeRoleUser = decodedToken.role;
            const roleUser = JSON.parse(localStorage.getItem('userRole'));
            if (decodeRoleUser !== 'customer') {
                next({ name: 'views.login' });
            } else {
                next();
            }
        }
    }
},
{
    path: '/guru/kuisioner',
    name: 'user.views.guru_kuisioner',
    component: () => import('@/views/REMAKE/GuruTk/Kuisioner.vue'),
    beforeEnter: (to, from, next) => {
        const token = Cookies.get('token');
        const isAuth = JSON.parse(localStorage.getItem('userData'));
        if (!token || !isAuth) {
            // Jika token tidak ada, arahkan pengguna ke halaman login
            next({ name: 'views.login' });
        } else {
            const decodedToken = jwtDecode(token);
            const decodeRoleUser = decodedToken.role;
            const roleUser = JSON.parse(localStorage.getItem('userRole'));
            if (decodeRoleUser !== 'customer') {
                next({ name: 'views.login' });
            } else {
                next();
            }
        }
    }
},
{
    path: '/guru/kuisioner-input',
    name: 'user.views.guru_kuisioner_input',
    component: () => import('@/views/REMAKE/GuruTk/KuisionerInput.vue'),
    beforeEnter: (to, from, next) => {
        const token = Cookies.get('token');
        const isAuth = JSON.parse(localStorage.getItem('userData'));
        if (!token || !isAuth) {
            // Jika token tidak ada, arahkan pengguna ke halaman login
            next({ name: 'views.login' });
        } else {
            const decodedToken = jwtDecode(token);
            const decodeRoleUser = decodedToken.role;
            const roleUser = JSON.parse(localStorage.getItem('userRole'));
            if (decodeRoleUser !== 'customer') {
                next({ name: 'views.login' });
            } else {
                next();
            }
        }
    }
},
]
