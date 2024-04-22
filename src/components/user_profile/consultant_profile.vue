<template>
  <div class="mx-4 pt-5">
    <div class="bg-white rounded-lg shadow-sm p-4">
        <FotoProfile v-if="userData" :userData="userData"/>
    </div>
  </div>
  
  <div class="flex flex-col lg:flex-row justify-center mx-4 pt-5 gap-5">
    <div class="lg:w-1/2">
        <div class="bg-white rounded-lg shadow-sm p-4 h-full">
            <h2 class="font-myFont text-dark text-2xl mb-4">Informasi Pribadi</h2>
            <informasiPribadi v-if="userData" :userData="userData"/>
        </div>
    </div>
  
    <div class="lg:w-1/2">
        <div class="flex flex-col gap-5">
            <div class="bg-white rounded-lg shadow-sm p-4">
                <h2 class="font-myFont text-dark text-2xl mb-4">Data Konsultasi</h2>
                <DataKonsultasi v-if="userData" :userData="userData"/>
            </div>
            <div class="bg-white rounded-lg shadow-sm p-4">
                <h2 class="font-myFont text-dark text-2xl mb-4">Ubah Password</h2>
                <UbahPassword v-if="userData" :userData="userData"/>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import initAPI from '../../api/api'
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';
import { useRouter } from 'vue-router';
import Cookies from 'js-cookie'
import FotoProfile from './consultant/foto_profile/fotoProfile.vue'
import InformasiPribadi from './consultant/informasi_pribadi/informasiPribadi.vue'
import DataKonsultasi from './consultant/data_konsultasi/dataKonsultasi.vue'
import UbahPassword from './consultant/ubah_password/ubahPassword.vue'

export default {
    name: 'consultantProfile',
    components: { InformasiPribadi, FotoProfile, UbahPassword, DataKonsultasi },
    setup(){
        const router = useRouter()
        const baseUrl = import.meta.env.VITE_API_BASE_URL
        const store = useStore()
        const userData = computed(() => store.getters.getUserData)
        const userRole = computed(() => store.getters.getUserRole)

        // const profileImageUrl = ref('');
        // const handleFileChange = () => {
        //     const fileInput = document.getElementById('fileInput');
        //     const file = fileInput.files[0];

        //     if (file) {
        //         profileImageUrl.value = URL.createObjectURL(file);
        //     }
        // };

        // const uploadFoto = async() => {
        //     const consultantId = userData.value.id
        //     const token = Cookies.get('token')
        //     const fileInput = document.getElementById('fileInput');
        //     const file = fileInput.files[0];

        //     if(token){
        //         if (file) {
        //             const formData = new FormData();
        //             formData.append('_method', 'PUT');
        //             formData.append('image', file);
    
        //             const response = await initAPI('post','consultants/'+consultantId, formData, token)
        //             if(response.status == 200){
        //                 Swal.fire({
        //                 icon: 'success',
        //                 title: 'Success',
        //                 text: response.data.message,
        //                 showConfirmButton: false,
        //                 timer: 2000
        //             });
        //             const updatedConsultant = await initAPI('get', 'consultants?id='+consultantId, null, token)
        //             updatedConsultant.data.data[0].available_on = JSON.stringify(updatedConsultant.data.data[0].available_on)
        //             store.commit('user', updatedConsultant.data.data[0])
        //             localStorage.setItem('userData', JSON.stringify(updatedConsultant.data.data[0]))
        //             }
        //         }
        //     } else {
        //         router.push('/login')
        //         localStorage.clear()
        //     }
        // }

        onMounted(() => {
            if (!userData.value && !userRole.value && !userEmail) {
                const localStorageUserData = localStorage.getItem('userData')
                const localStorageUserRole = localStorage.getItem('userRole')
                if (localStorageUserData && localStorageUserRole) {
                    const parsedUserData = JSON.parse(localStorageUserData)
                    const parsedUserRole = JSON.parse(localStorageUserRole)
                    store.commit('user', parsedUserData)
                    store.commit('userRole', parsedUserRole)
                }
            }
        })

       

        return {
            baseUrl,
            userData,
            userRole,
            // profileImageUrl,
            // handleFileChange,
            // uploadFoto
        }
      }
    }
</script>