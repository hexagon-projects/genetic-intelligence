<template>
    <div class="hidden lg:block relative w-1/2 top-4 mx-auto shadow-xl rounded-md bg-white">
        <!-- Modal body -->
        <h1 class="font-myFont text-dark text-lg mx-4 pt-4">
            {{ method == 'registrasi' ? 'Tambah Kode' : 'Update Code'}}
        </h1>
        <hr class="mt-4">

        <div v-if="method == 'registrasi'" class="w-full p-4 flex flex-col gap-2">
            <div class="mb-4">
                <label for="nama" class="block tracking-wide font-myFont text-dark font-sm mb-2">
                    Nama
                </label>
                <input v-model="nama" id="nama" class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-biru" type="text" placeholder="Nama Code">
            </div>

            <div class="mb-4">
                <label for="code" class="block tracking-wide font-myFont text-dark font-sm mb-2">
                    Code
                </label>
                <input v-model="code" id="code" class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-biru" type="text" placeholder="Code">
            </div>
            
            <div class="mb-4">
                <label for="diskon" class="block tracking-wide font-myFont text-dark font-sm mb-2">
                    Diskon
                </label>
                <input v-model="diskon" id="diskon" class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-biru" type="text" placeholder="Contoh: 50">
            </div>
        </div>

        <div v-else-if="method == 'update'" class="w-full p-4 flex flex-col gap-2">
            <div class="mb-4">
                <label for="diskon" class="block tracking-wide font-myFont text-dark font-sm mb-2">
                    Diskon
                </label>
                <input v-model="diskon" id="diskon" class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-biru" type="text" placeholder="Contoh: 50">
            </div>
        </div>

        <hr class="pt-4">
        <!-- Modal footer -->
        <div class="px-4 py-4 flex justify-between items-center space-x-4">
            <button @click="toggleModal" class="bg-gray-300 font-myFont text-black p-2 rounded-md hover:shadow-lg hover:opacity-80 transition duration-300 ease-in-out">Tutup</button>
            <button @click="tambahKode"
                :disabled="buttonDisabled" 
                :class="{'bg-gray-600 opacity-80 cursor-not-allowed': buttonDisabled}"
                class="rounded-lg px-4 py-2 bg-biru text-light font-myFont hover:bg-opacity-75 hover:shadow-md">
                Submit
            </button>
        </div>
    </div>

    <div class="block lg:hidden relative w-full md:w-1/2 top-4 mx-auto shadow-xl rounded-md bg-white">
        <!-- Modal body -->
        <h1 class="font-myFont text-dark text-lg mx-4 pt-4">
            {{ method == 'registrasi' ? 'Tambah Kode' : 'Update Code'}}
        </h1>
        <hr class="mt-4">

        <div v-if="method == 'registrasi'" class="w-full p-4 flex flex-col gap-2">
            <div class="mb-4">
                <label for="nama" class="block tracking-wide font-myFont text-dark font-sm mb-2">
                    Nama
                </label>
                <input v-model="nama" id="nama" class="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white" type="text" placeholder="Nama Code">
            </div>

            <div class="mb-4">
                <label for="code" class="block tracking-wide font-myFont text-dark font-sm mb-2">
                    Code
                </label>
                <input v-model="code" id="code" class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-biru" type="text" placeholder="Code">
            </div>
            
            <div class="mb-4">
                <label for="diskon" class="block tracking-wide font-myFont text-dark font-sm mb-2">
                    Diskon
                </label>
                <input v-model="diskon" id="diskon" class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-biru" type="text" placeholder="Contoh: 50">
            </div>
        </div>

        <div v-else-if="method == 'update'" class="w-full p-4 flex flex-col gap-2">
            <div class="mb-4">
                <label for="diskon" class="block tracking-wide font-myFont text-dark font-sm mb-2">
                    Diskon
                </label>
                <input v-model="diskon" id="diskon" class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-biru" type="text" placeholder="Contoh: 50">
            </div>
        </div>

        <hr class="pt-4">
        <!-- Modal footer -->
        <div class="px-4 py-4 flex justify-between items-center space-x-4">
            <button @click="toggleModal" class="bg-gray-300 font-myFont text-black p-2 rounded-md hover:shadow-lg hover:opacity-80 transition duration-300 ease-in-out">Tutup</button>
            <button @click="tambahKode"
                :disabled="buttonDisabled" 
                :class="{'bg-gray-600 opacity-80 cursor-not-allowed': buttonDisabled}"
                class="rounded-lg px-4 py-2 bg-biru text-light font-myFont hover:bg-opacity-75 hover:shadow-md">
                Submit
            </button>
        </div>
    </div>
</template>

<script>
import { ref, computed } from 'vue'
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css'
import DOMPurify from 'dompurify'
import initAPI from '../../../../../api/api'
import { useRouter } from 'vue-router';
import { method } from 'lodash';
import Cookies from 'js-cookie'

export default {
    props: ['method', 'detailData'],
    setup(props, { emit }){
        console.log(props.detailData)
        console.log(props.method)
        const nama = ref('')
        const code = ref('')
        const diskon = ref(props.method == 'update' ? props.detailData.disc_percentage : '')

        const router = useRouter()

        const toggleModal = () => {
            emit('toggleModal')
        }

        const tambahKode = async() => {
            const token = Cookies.get('token')

            const data = new FormData();
            if(props.method == 'registrasi'){
                data.append('name', DOMPurify.sanitize(nama.value))
                data.append('code', DOMPurify.sanitize(code.value))
                data.append('disc_percentage', DOMPurify.sanitize(diskon.value))
            } else if(props.method == 'update') {
                data.append('disc_percentage', DOMPurify.sanitize(diskon.value))
            }

            if(token){
                try {
                    const method = props.method == 'update' ? 'put' : 'post'
                    const endpoint = props.method == 'update' ? `school_codes/${props.detailData.id}` : 'school_codes'
                    const response = await initAPI(method, endpoint, data, token)
                    console.log(`register konsultan`, response.data)
                    Swal.fire({
                        icon: 'success',
                        title: props.method == 'registrasi' ? 'Registrasi Berhasil' : 'Data Code Diubah',
                        text: response.data.message,
                        showConfirmButton: false,
                        timer: 2000
                    });
                    
                    toggleModal()
                    router.go()
                } catch (error) {
                    console.log(`error`,error)
                    Swal.fire({
                          icon: 'error',
                          title: 'Tambah Code Gagal',
                          text: 'Terjadi Kesalahan',
                          showConfirmButton: false,
                          timer: 2000
                      });
                }
            } else {
                router.push('/login')
                localStorage.clear()
            }

        }

        const buttonDisabled = computed(() => {
            if(method.props == 'registrasi' && (!nama.value || !code.value || !diskon.value)){
                return true
            } else if(method.props == 'update' && !diskon.value) {
                return true
            } else {
                return false
            }
        })

        return {
            props,
            nama,
            code,
            diskon,
            buttonDisabled,
            toggleModal,
            tambahKode
        }
    }
}
</script>