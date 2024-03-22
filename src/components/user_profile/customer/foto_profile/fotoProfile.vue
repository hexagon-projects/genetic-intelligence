<template>
    <div class="bg-white rounded-lg shadow-sm p-4">
        <div class="flex justify-around items-center">
            <div class="mx-4 flex justify-center items-center gap-2">
                <img v-if="profileImageUrl || props.dataCustomer.image !== null" class="w-24 h-24 rounded-full border-2 border-biru" :src="profileImageUrl == '' ? baseUrl+'open/customers/'+props.dataCustomer.image : profileImageUrl" alt="Foto Profile">
                <img v-else-if="!profileImageUrl && props.dataCustomer.image == null" class="w-24 h-24 rounded-full border-2 border-biru" src="../../../../assets/img/profile-mock.png" alt="Foto Profile">
                <div class="flex flex-col">
                    <h2 class="font-myFont text-dark text-2xl">{{ props.dataCustomer.name }}</h2>
                    <p class="font-myFont text-gray-500 text-sm mb-3 lg:mb-0">Foto Profile</p>
                    <div class="block md:hidden lg:hidden">
                        <button @click="uploadFoto" v-if="profileImageUrl" class="
                        cursor-pointer px-1 py-[1px] rounded-lg font-myFont text-xs text-biru border-2 border-biru
                            hover:text-light hover:bg-biru hover:shadow-lg
                        ">
                            Simpan Foto
                        </button>
        
                        <label for="fileInput" class="
                        cursor-pointer px-2 py-[1px] rounded-lg font-myFont text-sm text-biru border-2 border-biru
                            hover:text-light hover:bg-biru hover:shadow-lg
                        ">
                        Ubah Foto
                        </label>
                    </div>
                </div>
            </div>
  
            <div class="hidden md:flex lg:flex justify-center items-center gap-2">
                <button @click="uploadFoto" v-if="profileImageUrl" class="
                   cursor-pointer px-2 py-1 rounded-lg font-myFont text-biru border-2 border-biru
                    hover:text-light hover:bg-biru hover:shadow-lg
                ">
                    Simpan Foto
                </button>
  
                <label for="fileInput" class="
                   cursor-pointer px-2 py-1 rounded-lg font-myFont text-biru border-2 border-biru
                    hover:text-light hover:bg-biru hover:shadow-lg
                ">
                Ubah Foto
                </label>
            </div>
  
            <input
                type="file"
                id="fileInput"
                ref="fileInput"
                style="display: none"
                @change="handleFileChange"
            />
        </div>
    </div>
</template>

<script>
import { ref } from 'vue'
import initAPI from '../../../../api/api'
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';

export default {
    name: 'FotoProfile',
    props: ['dataCustomer'],
    setup(props){
        const baseUrl = import.meta.env.VITE_API_BASE_URL

        const userData = ref(props.dataCustomer)

        const profileImageUrl = ref('');
        const handleFileChange = () => {
            const fileInput = document.getElementById('fileInput');
            const file = fileInput.files[0];

            if (file) {
                profileImageUrl.value = URL.createObjectURL(file);
            }
        };

        const uploadFoto = async() => {
            const customerId = userData.value.id
            const token = JSON.parse(localStorage.getItem('token'))
            const fileInput = document.getElementById('fileInput');
            const file = fileInput.files[0];

            if (file) {
                const formData = new FormData();
                formData.append('_method', 'PUT');
                formData.append('image', file);

                console.log(formData)

                const response = await initAPI('post','customers/'+customerId, formData, token)
                if(response.status == 200){
                    Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: response.data.message,
                    showConfirmButton: false,
                    timer: 2000
                });
                const updatedCustomer = await initAPI('get', 'customers?id='+customerId, null, token)
                store.commit('user', updatedCustomer.data.data[0])
                localStorage.setItem('userData', JSON.stringify(updatedCustomer.data.data[0]))
                }
            }
        }

        return {
            props,
            baseUrl,
            userData,
            profileImageUrl,
            handleFileChange,
            uploadFoto
        }
    }
}
</script>