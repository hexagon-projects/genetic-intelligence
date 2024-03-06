<template>
    <div class="fixed z-[999] inset-0 bg-gray-900 bg-opacity-60 overflow-y-auto h-full w-full px-4 modal"
    >
        <div class="hidden lg:block relative w-3/4 top-10 mx-auto shadow-xl rounded-md bg-white">
            <!-- Modal body -->
            <h1 class="font-myFont text-dark text-lg mx-4 pt-4">Tambah Guru</h1>
            <hr class="mt-4">
            
            <div class="w-full p-4">
                <div class="flex flex-wrap -mx-3 mb-6">
                    <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                        <label for="email" class="block tracking-wide font-myFont text-dark font-sm mb-2">
                            Email
                        </label>
                        <input v-model="emailInput" @keyup="validation" id="email" class="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white" type="email" placeholder="Email"
                        :class="{'border-danger': validasiEmail !== null, 'border-gray-200 focus:border-biru': validasiEmail == null}">
                        <p v-if="validasiEmail !== null" class="font-myFont text-red-500 text-xs italic">{{ validasiEmail }}.</p>
                    </div>
                    <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                        <label for="password" class="block tracking-wide font-myFont text-dark font-sm mb-2">
                            Password
                        </label>
                        <input v-model="password" id="password" class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-biru" type="password" placeholder="Password">
                    </div>
                </div>

                <div class="flex flex-wrap -mx-3 mb-6">
                    <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                        <label for="nama_lengkap" class="block tracking-wide font-myFont text-dark font-sm mb-2">
                            Nama Lengkap
                        </label>
                        <input v-model="namaLengkap" id="nama_lengkap" class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-biru" type="text" placeholder="Nama Lengkap">
                        <!-- <p class="text-red-500 text-xs italic">Please fill out this field.</p> -->
                    </div>
                    <div class="relative w-full md:w-1/2 px-3">
                        <label for="sekolah" class="block tracking-wide font-myFont text-dark font-sm mb-2">
                            Sekolah / Perguruan Tinggi
                        </label>
                        <div class="relative group">
                            <input v-model="sekolah" @input="debouncedGetSearchData()" id="sekolah"
                            class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-biru" type="text" placeholder="Sekolah / Perguruan Tinggi">
                            
                            <transition name="fade" mode="out-in">
                                <div id="dropdown-menu" v-if="searched" class="w-full max-h-[140px] overflow-y-scroll absolute z-40 right-0 mt-2 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 p-1 space-y-1">
                                    <div v-if="searched && pilihanSekolah.length > 0" class="flex flex-col">
                                        <span v-for="(item, index) in pilihanSekolah" :key="index" @click="pilihSekolah(item.id, item.name)" class="hover:bg-neutral-200 py-2 px-4 cursor-pointer mx-4 font-myFont text-xs lg:text-sm text-dark">
                                            {{ item.name }}
                                        </span>
                                    </div>
                                    <div v-else-if="searched && pilihanSekolah.length == 0">
                                        <span class="hover:bg-neutral-500 mx-4 font-myFont text-xs lg:text-sm text-dark">
                                            Data sekolah tidak ada.
                                        </span>
                                    </div>
                                </div>
                            </transition>
                        </div>
                    </div>
                </div>

                <div class="flex flex-wrap -mx-3 mt-4">
                    <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <label for="email" class="block tracking-wide font-myFont text-dark font-sm mb-2">
                        Jenis Kelamin
                    </label>
                    <select v-model="jenisKelamin" id="jenis_kelamin" class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-biru">
                        <option value="" selected disabled>Jenis Kelamin</option>
                        <option value="1">Laki - Laki</option>
                        <option value="2">Perempuan</option>
                    </select>
                    <p v-if="validasiEmail !== null" class="font-myFont text-red-500 text-xs italic">{{ validasiEmail }}.</p>
                    </div>
                    <div class="w-full md:w-1/2 px-3">
                    <label for="tipe" class="block tracking-wide font-myFont text-dark font-sm mb-2">
                        Tipe
                    </label>
                    <select v-model="tipe" id="tipe" class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-biru">
                        <option value="" selected disabled>Pilih Tipe</option>
                        <option value="Kepala Sekolah">Kepala Sekolah</option>
                        <option value="Guru BK">Guru BK</option>
                    </select>
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
import { ref, onMounted, computed } from 'vue'
import DOMPurify from 'dompurify'
import initAPI from '../../../../../api/api'
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';
import { useRouter } from 'vue-router';
import _debounce from 'lodash/debounce';

export default {
    name: 'FormRegistrasiKonsultan',
    setup(_, { emit }){

        const closeModal = () => {
            emit('initRegistrasi');
        };

        const router = useRouter()

        const emailInput = ref('')
        const password = ref('')
        const namaLengkap = ref('')
        const sekolah = ref('')
        const idSekolah = ref('')
        const jenisKelamin = ref('')
        const tipe = ref('')
        const pilihanSekolah = ref([])
        const validasiEmail = ref(null)

        const searched = ref(false)

        const getSearchData = async() => {
            console.log(`nyari`)
            const response = await initAPI('get', `institutions?search=${sekolah.value}`, null, null)
            console.log(response.data)
            pilihanSekolah.value = response.data.data
        }

        const debouncedGetSearchData = _debounce(() => {
            if(sekolah.value !== ''){
                searched.value = true
                getSearchData()
            } else {
                searched.value = false
            }
        }, 500)

        const pilihSekolah = (id, name) => {
            idSekolah.value = id
            searched.value = false
            sekolah.value = name
        }

        const register = async() => {
            const token = JSON.parse(localStorage.getItem('token'))

            const data = new FormData();
            data.append('email', DOMPurify.sanitize(emailInput.value))
            data.append('password', DOMPurify.sanitize(password.value))
            data.append('name', DOMPurify.sanitize(namaLengkap.value))
            data.append('gender', DOMPurify.sanitize(jenisKelamin.value))
            data.append('type', DOMPurify.sanitize(tipe.value))
            data.append('institution_id', DOMPurify.sanitize(idSekolah.value))
            console.log(data + token)

            try {
                const response = await initAPI('post', 'staffs', data, token)
                console.log(`register konsultan`, response.data)
                Swal.fire({
                    icon: 'success',
                    title: 'Registrasi Berhasil',
                    text: response.data.message,
                    showConfirmButton: false,
                    timer: 2000
                });
                
                  closeModal()
                router.push('/data-guru')
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
            if(emailInput.value && !/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(emailInput.value)) {
                validasiEmail.value = 'Email tidak valid'
            } else {
                validasiEmail.value = null
            }
        }

        const buttonDisabled = computed(() => {
            if(
                !namaLengkap.value ||
                !emailInput.value ||
                !password.value ||
                !sekolah.value ||
                !jenisKelamin.value || 
                !tipe.value
            ){
                console.log(`kade kosong`)
                return true
            } else {
                console.log(`hilang`)
                return false
            }
        })

        return { 
            searched,
            debouncedGetSearchData,
            pilihSekolah,
            emailInput,
            password,
            namaLengkap,
            sekolah,
            jenisKelamin,
            tipe,
            pilihanSekolah,
            validasiEmail,
            buttonDisabled, 
            closeModal,
            register,
            validation,
        }
    }
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>