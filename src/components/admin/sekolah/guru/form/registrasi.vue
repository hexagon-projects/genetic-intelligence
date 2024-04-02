<template>
    <div class="fixed z-[999] inset-0 bg-gray-900 bg-opacity-60 overflow-y-auto h-full w-full px-4 modal"
    >
        <div :class="{'w-1/2': props.modalType == 'detail', 'w-3/4': props.modalType !== 'tambah'}" class="hidden lg:block relative top-10 mx-auto shadow-xl rounded-md bg-white">
            <!-- Modal body -->
            <h1 class="font-myFont text-dark text-lg mx-4 pt-4">
                {{ props.modalType == 'detail' ? 'Detail Guru' : 'Tambah Guru' }}
            </h1>
            <hr class="mt-4">
            
            <div v-if="props.modalType == 'tambah'" class="w-full p-4">
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

            <div v-else-if="props.modalType == 'detail'" class="w-full p-4">
                <div class="flex flex-row gap-2">
                    <div class="w-full">
                        <div class="flex flex-row items-center mb-4">
                            <div class="w-3/5">
                                <div class="flex flex-col items-start">
                                    <h1 class="font-myFont font-medium text-dark text-base">
                                        Nama
                                    </h1>
                                    <p class="font-myFont font-medium text-dark text-xs">
                                        {{ props.detailData.name }}
                                    </p>
                                </div>
                            </div>
                            <div class="w-2/5">
                                <div class="flex flex-col items-start">
                                    <h1 class="font-myFont font-medium text-dark text-base">
                                        Type
                                    </h1>
                                    <p class="font-myFont font-medium text-dark text-xs">
                                        {{ props.detailData.type }}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div class="flex flex-row items-center mb-4">
                            <div class="w-3/5">
                                <div class="flex flex-col items-start">
                                    <h1 class="font-myFont font-medium text-dark text-base">
                                        Jenis Kelamin
                                    </h1>
                                    <p class="font-myFont font-medium text-dark text-xs">
                                        {{ props.detailData.formatted_gender }}
                                    </p>
                                </div>
                            </div>
                            <div class="w-2/5">
                                <div class="flex flex-col items-start">
                                    <h1 class="font-myFont font-medium text-dark text-base">
                                        Sekolah
                                    </h1>
                                    <p class="font-myFont font-medium text-dark text-xs">
                                        {{ props.detailData.institutions.name }}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div class="flex flex-row items-center mb-4">
                            <div class="w-3/5">
                                <div class="flex flex-col items-start">
                                    <h1 class="font-myFont font-medium text-dark text-base">
                                        Region
                                    </h1>
                                    <p class="font-myFont font-medium text-dark text-xs">
                                        {{ props.detailData.institutions.region }}
                                    </p>
                                </div>
                            </div>
                            <div class="w-2/5">
                                <div class="flex flex-col items-start">
                                    <h1 class="font-myFont font-medium text-dark text-base">
                                        Institusi Pendidikan
                                    </h1>
                                    <p class="font-myFont font-medium text-dark text-xs">
                                        {{ props.detailData.institutions.type }}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <hr class="pt-4">
            <!-- Modal footer -->
            <div class="px-4 py-4 flex justify-between items-center space-x-4">
                <button @click="closeModal" class="bg-gray-300 font-myFont text-black p-2 rounded-md hover:shadow-lg hover:opacity-80 transition duration-300 ease-in-out">Tutup</button>
                <button v-if="props.modalType !== 'detail'" @click="register"
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
            
            <div v-if="props.modalType == 'tambah'" class="w-full p-4">
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

            <div v-else-if="props.modalType == 'detail'" class="w-full p-4">
                <div class="flex flex-row gap-2">
                    <div class="w-full">
                        <div class="flex flex-row items-center mb-4">
                            <div class="w-3/5">
                                <div class="flex flex-col items-start">
                                    <h1 class="font-myFont font-medium text-dark text-base">
                                        Nama
                                    </h1>
                                    <p class="font-myFont font-medium text-dark text-xs">
                                        {{ props.detailData.name }}
                                    </p>
                                </div>
                            </div>
                            <div class="w-2/5">
                                <div class="flex flex-col items-start">
                                    <h1 class="font-myFont font-medium text-dark text-base">
                                        Type
                                    </h1>
                                    <p class="font-myFont font-medium text-dark text-xs">
                                        {{ props.detailData.type }}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div class="flex flex-row items-center mb-4">
                            <div class="w-3/5">
                                <div class="flex flex-col items-start">
                                    <h1 class="font-myFont font-medium text-dark text-base">
                                        Jenis Kelamin
                                    </h1>
                                    <p class="font-myFont font-medium text-dark text-xs">
                                        {{ props.detailData.formatted_gender }}
                                    </p>
                                </div>
                            </div>
                            <div class="w-2/5">
                                <div class="flex flex-col items-start">
                                    <h1 class="font-myFont font-medium text-dark text-base">
                                        Sekolah
                                    </h1>
                                    <p class="font-myFont font-medium text-dark text-xs">
                                        {{ props.detailData.institutions.name }}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div class="flex flex-row items-center mb-4">
                            <div class="w-3/5">
                                <div class="flex flex-col items-start">
                                    <h1 class="font-myFont font-medium text-dark text-base">
                                        Region
                                    </h1>
                                    <p class="font-myFont font-medium text-dark text-xs">
                                        {{ props.detailData.institutions.region }}
                                    </p>
                                </div>
                            </div>
                            <div class="w-2/5">
                                <div class="flex flex-col items-start">
                                    <h1 class="font-myFont font-medium text-dark text-base">
                                        Institusi Pendidikan
                                    </h1>
                                    <p class="font-myFont font-medium text-dark text-xs">
                                        {{ props.detailData.institutions.type }}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <hr class="pt-4">
            <!-- Modal footer -->
            <div class="px-4 py-4 flex justify-between items-center space-x-4">
                <button @click="closeModal" class="bg-gray-300 font-myFont text-black p-2 rounded-md hover:shadow-lg hover:opacity-80 transition duration-300 ease-in-out">Tutup</button>
                <button v-if="props.modalType !== 'detail'" @click="register"
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
import { ref, onMounted, computed } from 'vue'
import DOMPurify from 'dompurify'
import initAPI from '../../../../../api/api'
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';
import { useRouter } from 'vue-router';
import _debounce from 'lodash/debounce';
import Cookies from 'js-cookie'

export default {
    name: 'FormRegistrasiKonsultan',
    props: ['detailData', 'modalType'],
    setup(props, { emit }){
        console.log(props)

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
            const token = Cookies.get('token')

            const data = new FormData();
            data.append('email', DOMPurify.sanitize(emailInput.value))
            data.append('password', DOMPurify.sanitize(password.value))
            data.append('name', DOMPurify.sanitize(namaLengkap.value))
            data.append('gender', DOMPurify.sanitize(jenisKelamin.value))
            data.append('type', DOMPurify.sanitize(tipe.value))
            data.append('institution_id', DOMPurify.sanitize(idSekolah.value))
            console.log(data + token)

            if(token){
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
                    router.go()
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
            } else {
                alert('haduh')
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
            props
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