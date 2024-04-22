<template>
    <div class="flex flex-col justify-center items-center">
        <div class="flex justify-center w-full gap-2">
            <div class="w-full mb-4">
                <label for="currPass" class="block text-sm font-myFont font-medium text-dark">Password Sekarang:</label>
                <input v-model="currPass" @input="validation" type="password" name="curPass" class="mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring-biru focus:ring-2 focus:border-biru" placeholder="Password Lama Anda" />
                <p v-if="passwordValidation !== null" class="mb-2 mt-1 font-myFont text-red-500 text-xs italic">{{ passwordValidation }}.</p>
            </div>
            <div class="w-full mb-4">
                <label for="newPass" class="block text-sm font-myFont font-medium text-dark">Password Baru:</label>
                <input v-model="newPass" @input="validation" type="password" name="newPass" class="mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring-biru focus:ring-2 focus:border-biru" placeholder="Password Baru Anda" />
                <p v-if="passwordValidation !== null" class="mb-2 mt-1 font-myFont text-red-500 text-xs italic">{{ passwordValidation }}.</p>
            </div>
        </div>

        <button @click="changePassword" class="px-2 py-2 w-1/2 lg:w-1/4 self-start text-center rounded-lg bg-biru font-myFont font-medium text-light hover:opacity-75 hover:shadow-lg">
            Ubah Password
        </button>
    </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import initAPI from '../../../../api/api'
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';
import Cookies from 'js-cookie'
import DOMPurify from 'dompurify'
import { useRouter } from 'vue-router';

export default {
    name: 'UbahPasswordConsultant',
    props: ['userData'],
    setup(props){
        console.log(`loadded`, props)
        const router = useRouter()
        const currPass = ref('')
        const newPass = ref('')
        const passwordValidation = ref(null)

        const validation = () => {
            if(newPass.value.length < 8 || currPass.value.length < 8){
                passwordValidation.value = 'Password harus berisi 8 karakter'
            } else {
                passwordValidation.value = null
            }
        }

        const changePassword = async () => {
            const userId = props.userData.user_id
            const token = Cookies.get('token')

            if(currPass.value.trim() == '' || newPass.value.trim() == ''
            || DOMPurify.sanitize(currPass.value) == '' || DOMPurify.sanitize(newPass.value) == ''
            || currPass.value.length < 8 || newPass.value.length < 8
            ){
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Tidak ada data yang bisa dikirim.',
                    showConfirmButton: false,
                    timer: 2300
                });

                return
            }

            if(token){
                try {
                    const data = JSON.stringify({
                        current_password: DOMPurify.sanitize(currPass.value),
                        new_password: DOMPurify.sanitize(newPass.value),
                    })
        
                    const response = await initAPI(
                        'put','change-password/'+userId, data, token
                    );
        
                    if(response.status == 200){
                        Swal.fire({
                            icon: 'success',
                            title: 'Success',
                            text: response.data.message,
                            showConfirmButton: false,
                            timer: 2000
                        });
                        const updatedConsultant = await initAPI('get', 'consultants?id='+consultantId, null, token)
                        updatedConsultant.data.data[0].available_on = JSON.stringify(updatedConsultant.data.data[0].available_on)
                        store.commit('user', updatedConsultant.data.data[0])
                    } else if(response.status == 200 && response.data.error) {
                        Swal.fire({
                            icon: 'error',
                            title: 'Error',
                            text: response.data.error,
                            showConfirmButton: false,
                            timer: 2000
                        });
                    }
                } catch (error) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: 'Terjadi kesalahan saat ubah password',
                        showConfirmButton: false,
                        timer: 2000
                    });
                }
            } else {
                router.push('/login')
                localStorage.clear()
            }
        }

        return {
            currPass,
            newPass,
            passwordValidation,
            changePassword,
            validation
        }
    }
}
</script>