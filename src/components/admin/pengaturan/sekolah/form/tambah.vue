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
                        <!-- <p class="text-red-500 text-xs italic">Please fill out this field.</p> -->
                    </div>
                </div>
            </div>

            <hr class="pt-4">
            <!-- Modal footer -->
            <div class="px-4 py-4 flex justify-between items-center space-x-4">
                <button @click="closeModal" class="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition">Tutup</button>
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
            <h1 class="font-myFont text-dark text-lg mx-4 pt-4">Detail Customers</h1>
            <hr class="mt-4">
            
            <div class="w-full">
                <div class="flex flex-wrap -mx-3 mb-6">
                    <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <label for="nama_lengkap" class="block tracking-wide font-myFont text-dark font-sm mb-2">
                        Nama Lengkap
                    </label>
                    <input v-model="name" id="nama_lengkap" class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-biru" type="text" placeholder="Nama Depan">
                    <!-- <p class="text-red-500 text-xs italic">Please fill out this field.</p> -->
                    </div>
                    <div class="w-full md:w-1/2 px-3">
                        <label for="fee" class="block tracking-wide font-myFont text-dark font-sm mb-2">
                            Fee
                        </label>
                        <input v-model="feeKonsultan" @keyup="validation" id="fee"
                            :class="{'border-danger': validasiFee !== null}"
                            class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-biru" type="text" placeholder="Contoh: 500000">
                        <p v-if="validasiFee !== null" class="font-myFont text-red-500 text-xs italic">{{ validasiFee }}.</p>
                    </div>
                </div>

                <div class="flex flex-wrap -mx-3 mb-6">
                    <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <label for="email" class="block tracking-wide font-myFont text-dark font-sm mb-2">
                        Email
                    </label>
                    <input v-model="email" @keyup="validation" id="email" 
                        :class="{'border-danger': validasiEmail !== null}"
                        class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-biru" type="email" placeholder="email@email.com">
                    <p v-if="validasiEmail !== null" class="font-myFont text-red-500 text-xs italic">{{ validasiEmail }}.</p>
                    </div>
                    <div class="w-full md:w-1/2 px-3">
                    <label for="password" class="block tracking-wide font-myFont text-dark font-sm mb-2">
                        Password
                    </label>
                    <input v-model="password" id="password" class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-biru" type="text" placeholder="Password">
                    </div>
                </div>

                <div class="flex flex-wrap -mx-3 mb-6">
                    <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <label for="tempat_lahir" class="block tracking-wide font-myFont text-dark font-sm mb-2">
                        Tempat Lahir
                    </label>
                    <input v-model="birth_place" id="tempat_lahir" class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-biru" type="text" placeholder="Contoh: Bandung">
                    <!-- <p class="text-red-500 text-xs italic">Please fill out this field.</p> -->
                    </div>
                    <div class="w-full md:w-1/2 px-3">
                    <label for="tanggal_lahir" class="block tracking-wide font-myFont text-dark font-sm mb-2">
                        Tanggal Lahir
                    </label>
                    <input v-model="birth_date" id="tanggal_lahir" class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-biru" type="date">
                    </div>
                </div>

                <div class="flex flex-wrap -mx-3 mb-6">
                    <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <label for="jenis_kelamin" class="block tracking-wide font-myFont text-dark font-sm mb-2">
                        Jenis Kelamin
                    </label>
                    <div class="relative">
                        <select v-model="gender" id="jenis_kelamin" class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-biru">
                        <option value="pilih" selected disabled>Pilih Jenis Kelamin</option>
                        <option value="1">Laki - Laki</option>
                        <option value="2">Perempuan</option>
                        </select>
                        <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                        <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                        </div>
                    </div>
                    </div>
                    <div class="w-full md:w-1/2 px-3">
                        <label for="no_whatsapp" class="block tracking-wide font-myFont text-dark font-sm mb-2">
                            No Whatsapp
                        </label>
                        <input v-model="number" @keyup="validation" id="no_whatsapp" 
                            :class="{'border-danger': validasiWA !== null}"
                            class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-biru" type="text" placeholder="08xxxxxxx">
                        <p v-if="validasiWA !== null" class="font-myFont text-red-500 text-xs italic">{{ validasiWA }}.</p>
                    </div>
                </div>

                <div class="flex flex-wrap -mx-3 mb-6">
                    <div class="w-full px-3">
                    <label for="alamat" class="block tracking-wide font-myFont text-dark font-sm mb-2">
                        Alamat
                    </label>
                    <textarea v-model="address" id="alamat" rows="4" class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-biru" type="text" placeholder="Alamat"></textarea>
                    <!-- <p class="text-gray-600 text-xs italic">Make it as long and as crazy as you'd like</p> -->
                    </div>
                </div>

                <div class="flex justify-end">
                    <button @click="register"
                        :disabled="buttonDisabled" 
                        :class="{'bg-gray-600 opacity-80 cursor-not-allowed': buttonDisabled}"
                        class="rounded-lg px-4 py-2 bg-biru text-light font-myFont hover:bg-opacity-75 hover:shadow-md">
                        Submit
                    </button>
                </div>
            </div>

            <hr class="pt-4">
            <!-- Modal footer -->
            <div class="px-4 py-2 flex justify-end items-center space-x-4">
                <button @click="closeModal" class="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition">Tutup</button>
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

        const namaLengkap = ref('')
        const sekolah = ref('')
        const jenisKelamin = ref('')
        const tipe = ref('')

        const data = [
            { name: 'test 1' },
            { name: 'test 2' },
            { name: 'aselola' }
        ];


        const searchResult = ref(false)

        const typeSearch = () => {
                
        };

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

        const validation = () => {
            if(isNaN(number.value)){
                validasiWA.value = 'No Whatsapp hanya bisa di isi oleh angka'
            } else if(isNaN(feeKonsultan.value)) {
                validasiFee.value = 'Fee hanya bisa di isi oleh angka'
            } else if(email.value && !/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(email.value)) {
                console.log('email salah')
                validasiEmail.value = 'Email tidak valid'
            } else {
                validasiWA.value = null
                validasiFee.value = null
                validasiEmail.value = null
            }
        }

        const buttonDisabled = computed(() => {
            if(
                !name.value ||
                !feeKonsultan.value ||
                !email.value ||
                !password.value ||
                !birth_place.value ||
                !birth_date.value || 
                !gender.value ||
                !number.value ||
                !address.value
            ){
                return true
            } else {
                return false
            }
        })

        return { 
            namaLengkap,
            sekolah,
            jenisKelamin,
            tipe,
            buttonDisabled, 
            closeModal,
            register,
            validation,
            typeSearch
        }
    }
}
</script>