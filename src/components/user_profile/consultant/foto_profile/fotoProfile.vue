<template>
    <div class="flex justify-around items-center">
        <div class="flex justify-center py-8 w-full" v-if="loadingUpload" >
            <span class="mx-auto animate-[spin_2s_linear_infinite] border-8 border-[#f1f2f3] border-l-biru border-r-biru rounded-full w-14 h-14"></span>
        </div>

        <div v-if="!loadingUpload" class="mx-4 flex justify-center items-center gap-2">
            <img v-if="profileImageUrl || props.userData.image !== null" class="w-24 h-24 rounded-full border-2 border-biru" :src="profileImageUrl == '' ? baseUrl+'open/consultant/'+props.userData.image : profileImageUrl" alt="Foto Profile">
            <img v-else-if="!profileImageUrl && props.userData.image == null" class="w-24 h-24 rounded-full border-2 border-biru" src="../../../../assets/img/profile-mock.png" alt="Foto Profile">
            <div class="flex flex-col">
                <h2 class="font-myFont text-dark text-2xl">{{ props.userData.name }}</h2>
                <p class="font-myFont text-gray-500 text-sm">Foto Profile</p>
            </div>
        </div>

        <div v-if="!loadingUpload" class="flex justify-center items-center gap-2">
            <button @click="uploadFoto" v-if="profileImageUrl" class="
                cursor-pointer px-2 py-1 rounded-lg font-myFont text-biru border-2 border-biru
                hover:text-light hover:bg-biru hover:shadow-sm
            ">
                Simpan Foto
            </button>

            <label for="fileInput" class="
                cursor-pointer px-2 py-1 rounded-lg font-myFont text-biru border-2 border-biru
                hover:text-light hover:bg-biru hover:shadow-sm
            ">
            Ubah Foto
            </label>
        </div>

        <input v-if="!loadingUpload"
            type="file"
            id="fileInput"
            ref="fileInput"
            style="display: none"
            @change="handleFileChange"
        />
    </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import initAPI from '../../../../api/api'
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';
import { useRouter } from 'vue-router';
import Cookies from 'js-cookie'

export default {
    name: 'FotoProfileConsultant',
    props: ['userData'],
    setup(props){
        const store = useStore()
        const baseUrl = import.meta.env.VITE_API_BASE_URL
        const router = useRouter()

        const loadingUpload = ref(false)

        const profileImageUrl = ref('');
        const handleFileChange = () => {
            const fileInput = document.getElementById('fileInput');
            const file = fileInput.files[0];

            if (file) {
                profileImageUrl.value = URL.createObjectURL(file);
            }
        };

        const uploadFoto = async() => {
            const consultantId = props.userData.id
            const token = Cookies.get('token')
            const fileInput = document.getElementById('fileInput');
            const file = fileInput.files[0];

            if(token){
                if (file) {
                    loadingUpload.value = !loadingUpload.value
                    const formData = new FormData();
                    formData.append('_method', 'PUT');
                    formData.append('image', file);

                    const response = await initAPI('post','consultants/'+consultantId, formData, token)
                    if(response.status == 200){
                        Swal.fire({
                        icon: 'success',
                        title: 'Success',
                        text: response.data.message,
                        showConfirmButton: false,
                        timer: 2000
                    });
                    profileImageUrl.value = ''
                    const updatedConsultant = await initAPI('get', 'consultants?id='+consultantId, null, token)
                    updatedConsultant.data.data[0].available_on = JSON.stringify(updatedConsultant.data.data[0].available_on)
                    store.commit('user', updatedConsultant.data.data[0])
                    localStorage.setItem('userData', JSON.stringify(updatedConsultant.data.data[0]))
                    }
                    loadingUpload.value = !loadingUpload.value
                }
            } else {
                router.push('/login')
                localStorage.clear()
            }
        }

        return {
            loadingUpload,
            props,
            baseUrl,
            uploadFoto,
            handleFileChange,
            profileImageUrl,
        }
    }
}
</script>