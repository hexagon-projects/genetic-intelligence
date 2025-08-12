// utils/auth.js
import Cookies from 'js-cookie'
import { useRouter } from 'vue-router'
import Swal from 'sweetalert2'
import { useStore } from 'vuex'
import initAPI from '@/api/api';

export const Logout = async (router, store, showLoading = true) => {
    if (showLoading) loading.value = true
    try {
        const token = Cookies.get('token')
        if (token) {
            await initAPI('post', 'logout', null, token)
        }
    } catch (error) {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Terjadi error saat mencoba logout.',
            showConfirmButton: false,
            timer: 2000
        })
    } finally {
        localStorage.clear()
        Cookies.remove('token')
        store.commit('user', null)
        store.commit('userRole', null)
        router.push('/login')
        if (showLoading) loading.value = false
    }
}