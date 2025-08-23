<template>
    <div class="w-full px-7 mx-auto">
        <div class="flex flex-col bg-white w-full p-6 rounded-lg shadow-lg">
            <h1 class="font-myFont text-dark text-lg mb-4">Registrasi Konsultan</h1>
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
                    <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <label for="typeExpert" class="block tracking-wide font-myFont text-dark font-sm mb-2">
                        Tipe
                    </label>
                    <div class="relative">
                        <select v-model="typeExpert" id="typeExpert" class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-biru">
                        <option value="pilih" selected disabled>Pilih Tipe</option>
                        <option value="psikologi">Psikologi</option>
                        <option value="konsultan">Konsultan</option>
                        </select>
                        <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                        <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                        </div>
                    </div>
                    </div>
                    <div class="w-full md:w-1/2 px-3">
                       
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

                <div class="flex flex-wrap -mx-3 mb-6">
                    <div class="w-full px-3">
                    <label for="description" class="block tracking-wide font-myFont text-dark font-sm mb-2">
                        Deskripsi
                    </label>
                    <textarea v-model="description" id="description" rows="4" class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-biru" type="text" placeholder="Deskripsi tentang konsultan"></textarea>
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
        </div>
    </div>
</template>

<script>
import { ref, reactive, computed } from 'vue'
import DOMPurify from 'dompurify'
import initAPI from '../../../../api/api'
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';
import { useRouter } from 'vue-router';
import Cookies from 'js-cookie'

export default {
    name: 'FormRegistrasiKonsultan',
    setup(){
        const feeKonsultan = ref(null)
        const name = ref(null)
        const email = ref(null)
        const password = ref(null)
        const birth_place = ref(null)
        const birth_date = ref(null)
        const gender = ref('pilih')
        const number = ref(null)
        const address = ref(null)
        const typeExpert = ref('pilih')
        const description = ref(null)

        const validasiWA = ref(null)
        const validasiFee = ref(null)
        const validasiEmail = ref(null)

        const router = useRouter()

        
        // const = reactive({
        //     name: '',
        //     fee: feeKonsultan.value,
        //     email: '',
        //     password: '',
        //     birth_place: '',
        //     birth_date: '',
        //     gender: '',
        //     number: '',
        //     address: '',
        //     available_on: null,
        //     image: null
        // })

        // const sanitizeForms = () => {
        //     for (const key in forms) {
        //         forms[key] = DOMPurify.sanitize(forms[key])
        //     }
        // };

        const register = async() => {
            // const token = JSON.parse(localStorage.getItem('token'))
            const token = Cookies.get('token')
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
            data.append('type', DOMPurify.sanitize(typeExpert.value))
            data.append('number', DOMPurify.sanitize(number.value))
            data.append('address', DOMPurify.sanitize(address.value))
            data.append('description', DOMPurify.sanitize(description.value))
            data.append('available_on', null)
            data.append('image', null)
            // console.log(data + token)

            if(token){
                try {
                    const response = await initAPI('post', 'consultants', data, token)
                    // console.log(`register konsultan`, response.data)
                    Swal.fire({
                          icon: 'success',
                          title: 'Registrasi Berhasil',
                          text: response.data.message,
                          showConfirmButton: false,
                          timer: 2000
                      });
                    router.push({name: 'admin.views.konsultan'})
                } catch (error) {
                    // console.log(`error`,error)
                    Swal.fire({
                          icon: 'error',
                          title: 'Registrasi Gagal',
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

        const validation = () => {
            if(isNaN(number.value)){
                validasiWA.value = 'No Whatsapp hanya bisa di isi oleh angka'
            } else if(isNaN(feeKonsultan.value)) {
                validasiFee.value = 'Fee hanya bisa di isi oleh angka'
            } else if(email.value && !/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(email.value)) {
                // console.log('email salah')
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
                !address.value ||
                !description.value ||
                gender.value === 'pilih' ||
                typeExpert.value === 'pilih'
            ){
                return true
            } else {
                return false
            }
        })

        return { 
            feeKonsultan, 
            name,
            email,
            password,
            birth_date,
            birth_place,
            gender,
            number,
            address,
            typeExpert,
            description,
            validasiWA,
            validasiFee,
            validasiEmail,
            register,
            validation,
            buttonDisabled 
        }
    }
}
</script>