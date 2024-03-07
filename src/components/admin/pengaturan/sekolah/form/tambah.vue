<template>
    <div class="fixed z-[999] inset-0 bg-gray-900 bg-opacity-60 overflow-y-auto h-full w-full px-4 modal"
    >
        <div class="hidden lg:block relative w-1/2 top-10 mx-auto shadow-xl rounded-md bg-white">
            <!-- Modal body -->
            <h1 class="font-myFont text-dark text-lg mx-4 pt-4">Tambah Sekolah / Perguruan Tinggi</h1>
            <hr class="mt-4">
            
            <div class="w-full p-4">
                <div class="w-full flex flex-wrap -mx-3 mb-6">
                    <div class="w-full px-3 mb-6 md:mb-0">
                        <label for="nama_sekolah" class="block tracking-wide font-myFont text-dark font-sm mb-2">
                            Nama Sekolah / Perguruan Tinggi
                        </label>
                        <input v-model="name" id="nama_sekolah" class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-biru" type="text" placeholder="Nama Sekolah / Perguruan Tinggi">
                    </div>
                </div>
            </div>

            <hr class="pt-4">
            <!-- Modal footer -->
            <div class="px-4 py-4 flex justify-between items-center space-x-4">
                <button @click="closeModal" class="bg-gray-300 font-myFont text-black p-2 rounded-md hover:shadow-lg hover:opacity-80 transition duration-300 ease-in-out">Tutup</button>
                <button @click="register"
                    :disabled="buttonDisabled" 
                    :class="{'bg-gray-600 opacity-80 cursor-not-allowed': buttonDisabled}"
                    class="rounded-lg px-4 py-2 bg-biru text-light font-myFont hover:bg-opacity-75 hover:shadow-md">
                    Submit
                </button>
            </div>
        </div>

        <div class="block lg:hidden relative w-full top-1 mx-auto shadow-xl rounded-md bg-white">
            <!-- Modal body -->
            <h1 class="font-myFont text-dark text-lg mx-4 pt-4">Tambah Sekolah / Perguruan Tinggi</h1>
            <hr class="mt-4">
            
            <div class="w-full p-4">
                <div class="w-full flex flex-wrap -mx-3 mb-6">
                    <div class="w-full px-3 mb-6 md:mb-0">
                        <label for="nama_sekolah" class="block tracking-wide font-myFont text-sm lg:text-base text-dark font-sm mb-2">
                            Nama Sekolah / Perguruan Tinggi
                        </label>
                        <input v-model="name" id="nama_sekolah" class="appearance-none block w-full bg-gray-200 text-sm lg:text-base text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-biru" type="text" placeholder="Nama Sekolah / Perguruan Tinggi">
                        <!-- <p class="text-red-500 text-xs italic">Please fill out this field.</p> -->
                    </div>
                </div>
            </div>

            <hr class="pt-4">
            <!-- Modal footer -->
            <div class="px-4 py-4 flex justify-between items-center space-x-4">
                <button @click="closeModal" class="bg-gray-300 font-myFont text-black p-2 rounded-md hover:shadow-lg hover:opacity-80 transition duration-300 ease-in-out">Tutup</button>
                <button @click="register"
                    :disabled="buttonDisabled" 
                    :class="{'bg-gray-600 opacity-80 cursor-not-allowed': buttonDisabled}"
                    class="rounded-lg px-4 py-2 bg-biru text-light font-myFont hover:bg-opacity-75 hover:shadow-md">
                    Submit
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import { ref, reactive, computed } from 'vue'
import DOMPurify from 'dompurify'
import initAPI from '../../../../../api/api'
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';
import { useRouter } from 'vue-router';

export default {
    name: 'FormRegistrasiKonsultan',
    setup(_, { emit }){
        const closeModal = () => {
            emit('initRegistrasi');
        };

        const router = useRouter()

        const name = ref('')

        const register = async() => {
            const token = JSON.parse(localStorage.getItem('token'))
            // const datas = {
            //     name: DOMPurify.sanitize(name.value),
            //     fee: DOMPurify.sanitize(feeKonsultan.value),
            //     email: DOMPurify.sanitize(email.value),
            //     password: DOMPurify.sanitize(password.value),
            //     birth_place: DOMPurify.sanitize(birth_place.value),
            //     birth_date: DOMPurify.sanitize(birth_date.value),
            //     gender: DOMPurify.sanitize(gender.value),
            //     number: DOMPurify.sanitize(number.value),
            //     address: DOMPurify.sanitize(address.value),
            //     available_on: null,
            //     image: null
            // }

            const data = new FormData();
            data.append('name', DOMPurify.sanitize(name.value));
            data.append('fee', DOMPurify.sanitize(feeKonsultan.value));
            data.append('email', DOMPurify.sanitize(email.value))
            data.append('password', DOMPurify.sanitize(password.value))
            data.append('birth_place', DOMPurify.sanitize(birth_place.value))
            data.append('birth_date', DOMPurify.sanitize(birth_date.value))
            data.append('gender', DOMPurify.sanitize(gender.value))
            data.append('number', DOMPurify.sanitize(number.value))
            data.append('address', DOMPurify.sanitize(address.value))
            data.append('available_on', null)
            data.append('image', null)
            console.log(data + token)

            try {
                const response = await initAPI('post', 'consultants', data, token)
                console.log(`register konsultan`, response.data)
                Swal.fire({
                      icon: 'success',
                      title: 'Registrasi Berhasil',
                      text: response.data.message,
                      showConfirmButton: false,
                      timer: 2000
                  });
                router.push({name: 'admin.views.konsultan'})
            } catch (error) {
                console.log(`error`,error)
                Swal.fire({
                      icon: 'error',
                      title: 'Registrasi Gagal',
                      text: 'Terjadi Kesalahan',
                      showConfirmButton: false,
                      timer: 2000
                  });
            }
        }

        const buttonDisabled = computed(() => {
            if(!name.value){
                return true
            } else {
                return false
            }
        })

        return { 
            name,
            buttonDisabled, 
            closeModal,
            register,
        }
    }
}
</script>