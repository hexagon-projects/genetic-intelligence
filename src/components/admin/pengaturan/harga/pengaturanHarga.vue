<template>
    <section class="bg-gray-100 pb-[340px] lg:pb-28">
        <div class="mx-4 pt-4">
            <ol class="mx-4 flex justify-start items-center text-gray-500 font-semibold">
                <RouterLink :to="{name: 'views.dashboard'}" class="text-gray-400 hover:text-dark text-base">
                    Beranda
                </RouterLink>
                <span class="mx-2 text-base text-gray-400">/</span>
                <span class="text-gray-400 text-base">
                    Pengaturan
                </span>
                <span class="mx-2 text-base">/</span>
                <RouterLink :to="{name: 'admin.views.pengaturan_harga'}" class="text-base text-dark hover:text-dark/70">
                    Pengaturan Harga
                </RouterLink>
            </ol>
        </div>

        <div class="flex flex-col lg:flex-row justify-center mx-4 mb-4 pt-4 pb-10 gap-4">
            <div class="w-full lg:w-1/2">
                <div class="flex flex-col bg-white w-full p-6 rounded-lg shadow-lg">
                    <h1 class="font-myFont text-dark text-lg mb-4">Harga Registrasi Pelajar</h1>
                    <div class="flex justify-center pt-8 mb-[55px] w-full" v-if="loading" >
                        <span class="mx-auto animate-[spin_2s_linear_infinite] border-8 border-[#f1f2f3] border-l-biru border-r-biru rounded-full w-14 h-14"></span>
                    </div>

                    <div v-else-if="!loading" class="flex flex-col">
                        <div class="flex flex-wrap -mx-3 mb-6">
                            <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                            <label for="nama_lengkap" class="block tracking-wide font-myFont text-dark font-sm mb-2">
                                Harga saat ini
                            </label>
                            <input v-model="hargaStudent" id="nama_lengkap" class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none" type="text" readonly>
                            <!-- <p class="text-red-500 text-xs italic">Please fill out this field.</p> -->
                            </div>
                            <div class="w-full md:w-1/2 px-3">
                                <label for="fee" class="block tracking-wide font-myFont text-dark font-sm mb-2">
                                    Harga baru
                                </label>
                                <input id="fee"
                                    v-model="updatedHargaStudent" @input="validation"
                                    class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-biru" type="text" placeholder="Contoh: 500000">
                                    <p v-if="validasiStudent !== null" class="font-myFont text-red-500 text-xs italic">{{ validasiStudent }}.</p>
                            </div>
                        </div>
                        <button
                        :disabled="validasiStudent || updatedHargaStudent == null || updatedHargaStudent == ''"
                        @click="updateHarga('student')"
                        :class="{'bg-gray-600 opacity-80 cursor-not-allowed': validasiStudent || updatedHargaStudent == null || updatedHargaStudent == ''}"
                        class="w-1/3 self-center rounded-lg px-4 py-2 bg-biru text-light font-myFont hover:bg-opacity-75 hover:shadow-md">
                            Ubah Harga
                        </button>
                    </div>

                </div>
            </div>

            <div class="w-full lg:w-1/2">
                <div class="flex flex-col bg-white w-full p-6 rounded-lg shadow-lg">
                    <h1 class="font-myFont text-dark text-lg mb-4">Harga Registrasi Non-Pelajar</h1>
                    <div class="flex justify-center pt-8 mb-[55px] w-full" v-if="loading" >
                        <span class="mx-auto animate-[spin_2s_linear_infinite] border-8 border-[#f1f2f3] border-l-biru border-r-biru rounded-full w-14 h-14"></span>
                    </div>

                    <div v-else-if="!loading" class="flex flex-col">
                        <div class="flex flex-wrap -mx-3 mb-6">
                            <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                            <label for="nama_lengkap" class="block tracking-wide font-myFont text-dark font-sm mb-2">
                                Harga saat ini
                            </label>
                            <input v-model="hargaNonStudent" id="nama_lengkap" class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none" type="text" readonly>
                            <!-- <p class="text-red-500 text-xs italic">Please fill out this field.</p> -->
                            </div>
                            <div class="w-full md:w-1/2 px-3">
                                <label for="fee" class="block tracking-wide font-myFont text-dark font-sm mb-2">
                                    Harga baru
                                </label>
                                <input id="fee"
                                    v-model="updatedHargaNonStudent" @input="validation"
                                    class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-biru" type="text" placeholder="Contoh: 500000">
                                <p v-if="validasiNonStudent !== null" class="font-myFont text-red-500 text-xs italic">{{ validasiNonStudent }}.</p>
                            </div>
                        </div>
                        <button
                        :disabled="validasiNonStudent || updatedHargaNonStudent == null || updatedHargaNonStudent == ''"
                        @click="updateHarga('nonstudent')"
                        :class="{'bg-gray-600 opacity-80 cursor-not-allowed': validasiNonStudent || updatedHargaNonStudent == null || updatedHargaNonStudent == ''}"
                        class="w-1/3 self-center rounded-lg px-4 py-2 bg-biru text-light font-myFont hover:bg-opacity-75 hover:shadow-md">
                            Ubah Harga
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import { onMounted, ref, computed } from 'vue'
import initAPI from '../../../../api/api';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';
import { useRouter } from 'vue-router';
import Cookies from 'js-cookie'

export default {
    name: 'PengaturanHarga',
    setup(){
        const router = useRouter()

        const loading = ref(false)
        const hargaStudent = ref(null)
        const updatedHargaStudent = ref(null)
        const hargaNonStudent = ref(null)
        const updatedHargaNonStudent = ref(null)
        
        const validasiStudent = ref(null)
        const validasiNonStudent = ref(null)
        
        const validation = () => {
            if(isNaN(updatedHargaStudent.value)){
                validasiStudent.value = 'Harga harus berupa angka'
            } else if(isNaN(updatedHargaNonStudent.value)) {
                validasiNonStudent.value = 'Harga harus berupa angka'
            } else {
                validasiStudent.value = null
                validasiNonStudent.value = null
            }
        }
        
        const updateHarga = async(params) => {
            const token = Cookies.get('token')
            if(token){
                try {
                    const data = {
                        price: params == 'student' ? updatedHargaStudent.value : updatedHargaNonStudent.value
                    }
    
                    let endpoint = params == 'student' ? 'register-student' : 'register-non-student'
                    const response = await initAPI('put', `register/payment/${endpoint}`, JSON.stringify(data), token)
                    // console.log(response.data)
                    Swal.fire({
                        icon: 'success',
                        title: 'Harga Diubah',
                        text: response.data.message,
                        showConfirmButton: false,
                        timer: 2000
                    })
    
                    setTimeout(() => {
                        router.go()
                    }, 250);
                } catch(error) {
                    Swal.fire({
                          icon: 'error',
                          title: 'Terjadi Error',
                          text: 'Ada error sistem saat merubah harga',
                          showConfirmButton: false,
                          timer: 2000
                      });
                }
            } else {
                router.push('/login')
                localStorage.clear()
            }
        }

        const getData = async() => {
            const token = Cookies.get('token')

            if(token){
                try {
                    loading.value = !loading.value
                    const studentPrice = await initAPI('get', 'register/payment?type=register-student', null, token)
                    // console.log(studentPrice.data)
            
                    const nonStudentPrice = await initAPI('get', 'register/payment?type=register-non-student', null, token)
            
                    Promise.all([studentPrice, nonStudentPrice])
                        .then(results => {
                            // console.log(results)
                            hargaStudent.value = results[0].data.price
                            hargaNonStudent.value = results[1].data.price
                        })
                    
                        loading.value = !loading.value
                } catch (error) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Terjadi Error',
                        text: 'Ada error saat mengambil data harga',
                        showConfirmButton: false,
                        timer: 2000
                    });
                }
            } else {
                router.push('/login')
                localStorage.clear()
            }
        }
        
        onMounted(async() => {
            getData()
        })
        
        const buttonDisabled = computed(() => {
            if(updatedHargaStudent.value == null || updatedHargaNonStudent.value == null){
                return true
            } else {
                return false
            }
        })

        return {
            loading,
            hargaStudent,
            hargaNonStudent,
            updatedHargaStudent,
            updatedHargaNonStudent,
            validasiStudent,
            validasiNonStudent,
            validation,
            updateHarga,
            buttonDisabled
        }
    }
}

</script>