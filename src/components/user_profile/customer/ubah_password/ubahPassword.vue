<template>
    <div class="bg-white rounded-lg shadow-sm p-4">
        <h2 class="font-myFont text-dark text-2xl mb-4">Ubah Password</h2>
        <div class="flex flex-col justify-center items-center">
            <div class="flex justify-center items-center w-full gap-2">
                <div class="w-full mb-4">
                    <label for="currPass" class="block text-sm font-myFont font-medium text-dark">Password Sekarang:</label>
                    <input v-model="currPass" type="password" name="curPass" class="mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring-biru focus:ring-2 focus:border-biru" placeholder="Password anda saat ini" />
                </div>
                <div class="w-full mb-4">
                    <label for="newPass" class="block text-sm font-myFont font-medium text-dark">Password Baru:</label>
                    <input v-model="newPass" type="password" name="newPass" class="mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring-biru focus:ring-2 focus:border-biru" placeholder="Password baru anda" />
                </div>
            </div>

            <button @click="changePassword" class="px-2 py-2 w-1/2 lg:w-1/4 self-center text-center rounded-lg bg-biru font-myFont font-medium text-light hover:opacity-75 hover:shadow-lg">
                Ubah Password
            </button>
        </div>
    </div>
</template>

<script>
import { ref } from 'vue'
import initAPI from '../../../../api/api'
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';
import { useStore } from 'vuex'
import DOMPurify from 'dompurify'

export default {
    name: 'UbahPassword',
    props: ['dataCustomer'],
    setup(props){
        const store = useStore()
        const userData = ref(props.dataCustomer)

        console.log(`ubah paswor nih`, userData.value)
        const currPass = ref('')
        const newPass = ref('')

        const changePassword = async () => {
            
            try {
                const customerId = userData.value.id
                const userId = userData.value.user.id
                const token = JSON.parse(localStorage.getItem('token'))
    
                const data = JSON.stringify({
                    current_password: DOMPurify.sanitize(currPass.value),
                    new_password: DOMPurify.sanitize(newPass.value),
                })

                console.log(`sanitasi`, data)

                // const response = await initAPI(
                //     'put','change-password/'+userId, data, token
                // );
    
                // if(response.status == 200){
                //     Swal.fire({
                //         icon: 'success',
                //         title: 'Success',
                //         text: response.data.message,
                //         showConfirmButton: false,
                //         timer: 2000
                //     });
                //     const updatedCustomer = await initAPI('get', 'customers?id='+customerId, null, token)
                //     store.commit('user', updatedCustomer.data.data[0])
                //     localStorage.setItem('userData', JSON.stringify(updatedCustomer.data.data[0]))
                // }
            } catch (error) {
                console.log(`ubah password error yeuh`, error)
                Swal.fire({
                    icon: 'error',
                    title: 'Failed',
                    text: 'Gagal mengubah password.',
                    showConfirmButton: false,
                    timer: 2000
                });
            }
        }

        return {
            userData,
            currPass,
            newPass,
            changePassword,
            props
        }
    }
}
</script>