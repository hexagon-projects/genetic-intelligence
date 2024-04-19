import { createRouter, createWebHistory } from "vue-router"
import { useStore } from 'vuex'
import { computed } from "vue"
import { jwtDecode } from "jwt-decode"
import Cookies from 'js-cookie'

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
        component: () => import('../components/auth/login/newLogin.vue'),
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
        component: () => import('../components/dashboard/newDashboard2.vue'),
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
                next()
            } 
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
            const token = Cookies.get('token')
            // const token = Cookies.get('token')
            const isAuth = JSON.parse(localStorage.getItem('userData'))
            if (!token || !isAuth) {
                // Jika token tidak ada, arahkan pengguna ke halaman login
                next({ name: 'views.login' });
            } else {
                const decodedToken = jwtDecode(token);
                console.log(`di deocde cek`, decodedToken);
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
        component: () => import('../components/customer/tests/assesment.vue'),
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
                console.log(`di deocde cek`, decodedToken);
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
        component: () => import('../components/customer/tests/psikotest.vue'),
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
                console.log(`di deocde cek`, decodedToken);
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
        component: () => import('../components/customer/tests/iq.vue'),
        meta: {
            showNavbar: true,
            showFooter: true
        },
        beforeEnter: (to, from, next) => {
            const token = Cookies.get('token')
            const isAuth = JSON.parse(localStorage.getItem('userData'))
            if (!token || !isAuth) {
                next({ name: 'views.login' });
            } else {
                const decodedToken = jwtDecode(token);
                console.log(`di deocde cek`, decodedToken);
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
        component: () => import('../views/customers/hasil_deteksi/newHasil.vue'),
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
                console.log(`di deocde cek`, decodedToken);
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
        component: () => import('../components/customer/tests/assessment_comps/hasil_test/hasil.vue'),
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
                console.log(`di deocde cek`, decodedToken);
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
        component: () => import('../components/customer/tests/iq_comps/hasil_test/hasil_test.vue'),
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
                console.log(`di deocde cek`, decodedToken);
                const decodeRoleUser = decodedToken.role
                const roleUser = JSON.parse(localStorage.getItem('userRole'))
                if(decodeRoleUser !== 'customer') next({ name: 'views.login' })
                else next()
            }
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
        path: '/reservasi',
        name: 'user.views.reservasi',
        component: () => import('../components/customer/reservasi/reservasi.vue'),
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
                console.log(`di deocde cek`, decodedToken);
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
        beforeEnter: (to, from, next) => {
            const token = Cookies.get('token')
            const isAuth = JSON.parse(localStorage.getItem('userData'))
            if (!token || !isAuth) {
                // Jika token tidak ada, arahkan pengguna ke halaman login
                next({ name: 'views.login' });
            } else {
                const decodedToken = jwtDecode(token);
                console.log(`di deocde cek`, decodedToken);
                const decodeRoleUser = decodedToken.role
                const roleUser = JSON.parse(localStorage.getItem('userRole'))
                if(decodeRoleUser !== 'consultant') next({ name: 'views.login' })
                else next()
            }
        }
    },
    {
        path: '/hasil-test',
        name: 'consultant.views.hasil',
        component: () => import('../components/consultant/hasil_test/hasil_gim.vue'),
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
                console.log(`di deocde cek`, decodedToken);
                const decodeRoleUser = decodedToken.role
                const roleUser = JSON.parse(localStorage.getItem('userRole'))
                if(decodeRoleUser !== 'consultant') next({ name: 'views.login' })
                else next()
            }
        }
    },
    {
        path: '/detail-review/:id',
        name: 'consultant.views.review.detail',
        component: () => import('../components/consultant/review_test/DetailReview.vue'),
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
                console.log(`di deocde cek`, decodedToken);
                const decodeRoleUser = decodedToken.role
                const roleUser = JSON.parse(localStorage.getItem('userRole'))
                if(decodeRoleUser !== 'consultant') next({ name: 'views.login' })
                else next()
            }
        }
    },
    {
        path: '/permintaan-reservasi',
        name: 'consultant.views.permintaan',
        component: () => import('../components/consultant/reservasi/permintaan/permintaan.vue'),
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
                console.log(`di deocde cek`, decodedToken);
                const decodeRoleUser = decodedToken.role
                const roleUser = JSON.parse(localStorage.getItem('userRole'))
                if(decodeRoleUser !== 'consultant') next({ name: 'views.login' })
                else next()
            }
        }
    },
    {
        path: '/jadwal-reservasi',
        name: 'consultant.views.jadwal',
        component: () => import('../components/consultant/reservasi/jadwal/jadwal.vue'),
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
                console.log(`di deocde cek`, decodedToken);
                const decodeRoleUser = decodedToken.role
                const roleUser = JSON.parse(localStorage.getItem('userRole'))
                if(decodeRoleUser !== 'consultant') next({ name: 'views.login' })
                else next()
            }
        }
    },
    {
        path: '/list-assessments',
        name: 'consultant.views.assessments',
        component: () => import('../components/consultant/assessments/assessments.vue'),
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
                console.log(`di deocde cek`, decodedToken);
                const decodeRoleUser = decodedToken.role
                const roleUser = JSON.parse(localStorage.getItem('userRole'))
                if(decodeRoleUser !== 'consultant') next({ name: 'views.login' })
                else next()
            }
        }
    },
    {
        path: '/data-customer',
        name: 'admin.views.customers',
        component: () => import('../components/admin/customers/customers.vue'),
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
                console.log(`di deocde cek`, decodedToken);
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
        component: () => import('../components/admin/konsultan/konsultan.vue'),
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
                console.log(`di deocde cek`, decodedToken);
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
        component: () => import('../components/admin/konsultan/registrasi.vue'),
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
                console.log(`di deocde cek`, decodedToken);
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
        component: () => import('../components/admin/reservasi/reservasi.vue'),
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
                console.log(`di deocde cek`, decodedToken);
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
        component: () => import('../components/admin/reservasi/reservasiPsikotest.vue'),
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
                console.log(`di deocde cek`, decodedToken);
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
        component: () => import('../components/admin/riwayat_pembayaran/riwayatPembayaran.vue'),
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
                console.log(`di deocde cek`, decodedToken);
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
        component: () => import('../components/admin/pengaturan/harga/pengaturanHarga.vue'),
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
                console.log(`di deocde cek`, decodedToken);
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
        component: () => import('../components/admin/pengaturan/assessment/pengaturanSoal.vue'),
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
                console.log(`di deocde cek`, decodedToken);
                const decodeRoleUser = decodedToken.role
                const roleUser = JSON.parse(localStorage.getItem('userRole'))
                if(decodeRoleUser !== 'admin') next({ name: 'views.login' })
                else next()
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
    {
        path: '/pengaturan-hasil-assessment',
        name: 'admin.views.pengaturan_hasil_assessment',
        component: () => import('../components/admin/pengaturan/assessment/hasil.vue'),
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
                console.log(`di deocde cek`, decodedToken);
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
        component: () => import('../components/admin/pengaturan/code/code.vue'),
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
                console.log(`di deocde cek`, decodedToken);
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
        component: () => import('../components/admin/sekolah/guru/guru.vue'),
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
                console.log(`di deocde cek`, decodedToken);
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
        component: () => import('../components/admin/pengaturan/sekolah/sekolah.vue'),
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
                console.log(`di deocde cek`, decodedToken);
                const decodeRoleUser = decodedToken.role
                const roleUser = JSON.parse(localStorage.getItem('userRole'))
                if(decodeRoleUser !== 'admin') next({ name: 'views.login' })
                else next()
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
        }
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