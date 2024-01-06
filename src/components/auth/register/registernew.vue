<template>
    <section class="bg-secondary min-h-screen">
        <div class="container mx-auto">
            <div class="flex justify-center pt-32 pb-36">
                <div class="bg-white mx-4 w-6/6 lg:w-2/4 lg:mx-auto px-10 py-6 drop-shadow-2xl rounded-lg">
                    <div class="flex flex-col justify-center items-center mb-6">
                        <h2 class="text-black text-2xl font-myFont font-bold mb-2">Daftar</h2>
                        <a class="font-myFont text-gray-500 text-sm">
                            Sudah Punya Akun? 
                            <router-link :to="{name: 'views.login'}" class="font-myFont text-gray-500 text-sm hover:text-secondary">
                                Klik untuk Masuk
                            </router-link>
                        </a>
                    </div>

                    <div class="mb-5">
                        <div
                        class="relative after:absolute after:inset-x-0 after:top-1/2 after:block after:h-0.5 after:-translate-y-1/2 after:rounded-lg after:bg-gray-100"
                        >
                            <ol class="relative z-10 flex justify-between text-sm font-medium text-gray-500">
                            <li class="flex items-center gap-2 bg-white p-2">
                                <span :class="{
                                    'h-6 w-6 rounded-full text-center text-white text-[10px]/6 font-bold bg-secondary': currForm === 1,
                                    'h-6 w-6 rounded-full bg-gray-100 text-center text-[10px]/6 font-bold': currForm !== 1
                                    }">
                                    1
                                </span>
                                <span class="hidden sm:block"> Detail Akun </span>
                            </li>

                            <li class="flex items-center gap-2 bg-white p-2">
                                <span
                                    :class="{
                                    'h-6 w-6 rounded-full text-center text-white text-[10px]/6 font-bold bg-secondary': currForm === 2,
                                    'h-6 w-6 rounded-full bg-gray-100 text-center text-[10px]/6 font-bold': currForm !== 2
                                    }">
                                    2
                                </span>
                                <span class="hidden sm:block"> Detail Personal </span>
                            </li>

                            <li class="flex items-center gap-2 bg-white p-2">
                                <span :class="{
                                    'h-6 w-6 rounded-full text-center text-white text-[10px]/6 font-bold bg-secondary': currForm === 3,
                                    'h-6 w-6 rounded-full bg-gray-100 text-center text-[10px]/6 font-bold': currForm !== 3
                                    }">
                                    3
                                </span>
                                <span class="hidden sm:block"> Pembayaran </span>
                            </li>
                            </ol>
                        </div>
                    </div>
 

                    <div v-if="currForm === 1">
                        <div class="flex justify-center items-center gap-2">
                            <div class="w-full mb-4">
                                <label for="nama_depan" class="block text-sm font-myFont font-medium text-gray-600">Nama Depan:</label>
                                <input v-model="namaDepan" type="text" id="nama_depan" name="nama_depan" class="mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring-secondary focus:ring-2 focus:border-secondary" placeholder="Nama Depan" />
                                <!-- <a v-if="nameValidation && nameVal.length < 1" class="text-xs text-red-500">Nama depan tidak boleh kosong.</a> -->
                            </div>
                            <div class="w-full mb-4">
                                <label for="nama_belakang" class="block text-sm font-myFont font-medium text-gray-600">Nama Belakang:</label>
                                <input v-model="namaBelakang" type="text" id="nama_belakang" name="nama_belakang" class="mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring-secondary focus:ring-2 focus:border-secondary" placeholder="Nama Belakang" />
                            </div>
                        </div>
                        
                        <div class="flex justify-center items-center gap-2">
                            <div class="w-full mb-4">
                                <label for="email" class="block text-sm font-myFont font-medium text-gray-600">Email:</label>
                                <input v-model="emailVal" type="email" id="email" name="email" class="mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring-secondary focus:ring-2 focus:border-secondary" placeholder="Email" />
                            </div>
    
                            <div class="w-full mb-4">
                                <label for="password" class="block text-sm font-myFont font-medium text-gray-600">Password:</label>
                                <input v-model="passwordVal" type="password" id="password" name="password" class="mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring-secondary focus:ring-2 focus:border-secondary" placeholder="Password" />
                            </div>
                        </div>

                        <div class="w-full mb-4">
                            <label for="no_whatsapp" class="block text-sm font-myFont font-medium text-gray-600">No Whatsapp:</label>
                            <input v-model="noWhatsapp" type="text" id="no_whatsapp" name="no_whatsapp" class="mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring-secondary focus:ring-2 focus:border-secondary" placeholder="08xxxxx" />
                        </div>

                    </div>

                    <div v-else-if="currForm === 2">
                        <div class="flex justify-center items-center gap-2">
                            <div class="w-full mb-4">
                                <label for="Tempat Lahir" class="block text-sm font-myFont font-medium text-gray-600">Tempat Lahir:</label>
                                <input v-model="tempatLahir" type="text" id="tempat_lahir" name="tempat_lahir" class="mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring-secondary focus:ring-2 focus:border-secondary" placeholder="Contoh: Bandung" />
                                <!-- <a v-if="nameValidation && nameVal.length < 1" class="text-xs text-red-500">Nama depan tidak boleh kosong.</a> -->
                            </div>
                            <div class="w-full mb-4">
                                <label for="tgl_lahir" class="block text-sm font-myFont font-medium text-gray-600">Tanggal Lahir:</label>
                                <input v-model="tglLahir" type="date" id="tgl_lahir" name="tgl_lahir" class="mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring-secondary focus:ring-2 focus:border-secondary" placeholder="Tanggal Lahir" />
                            </div>
                        </div>
                        
                        <div class="flex justify-center items-center gap-2">
                            <div class="w-full mb-4">
                                <label for="jenis_kelamin" class="block text-sm font-myFont font-medium text-gray-600">Jenis Kelamin:</label>
                                <select v-model="jenisKelamin" name="jenis_kelamin" id="jenis_kelamin" class="mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring-secondary focus:ring-2 focus:border-secondary bg-white">
                                    <option value="" disabled selected>-- Pilih Opsi --</option>
                                    <option value="Laki - laki">Laki - Laki</option>
                                    <option value="Perempuan">Perempuan</option>
                                </select>
                            </div>
                            <div class="w-full mb-4">
                                <label for="status_nikah" class="block text-sm font-myFont font-medium text-gray-600">Status Nikah:</label>
                                <select v-model="statusNikah" name="status_nikah" id="status_nikah" class="mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring-secondary focus:ring-2 focus:border-secondary bg-white">
                                    <option value="" disabled selected>-- Pilih Opsi --</option>
                                    <option value="Menikah">Menikah</option>
                                    <option value="Lajang">Lajang</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div v-else="currForm === 3">
                        <div class="flex justify-center items-center gap-2">
                            <div class="w-full mb-4">
                                <label for="provinsi" class="block text-sm font-myFont font-medium text-gray-600">Provinsi:</label>
                                <input v-model="provinsi" type="text" id="provinsi" name="provinsi" class="mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring-secondary focus:ring-2 focus:border-secondary" placeholder="Provinsi" />
                                <!-- <a v-if="nameValidation && nameVal.length < 1" class="text-xs text-red-500">Nama depan tidak boleh kosong.</a> -->
                            </div>
                            <div class="w-full mb-4">
                                <label for="kota" class="block text-sm font-myFont font-medium text-gray-600">Kota:</label>
                                <input v-model="kota" type="text" id="kota" name="kota" class="mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring-secondary focus:ring-2 focus:border-secondary" placeholder="Kota" />
                            </div>
                        </div>
                        
                        <div class="flex justify-center items-center gap-2">
                            <div class="w-full mb-4">
                                <label for="kecamatan" class="block text-sm font-myFont font-medium text-gray-600">Kecamatan:</label>
                                <input v-model="kecamatan" type="text" id="kecamatan" name="kecamatan" class="mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring-secondary focus:ring-2 focus:border-secondary" placeholder="Kecamatan" />
                            </div>
                            <div class="w-full mb-4">
                                <label for="kelurahan" class="block text-sm font-myFont font-medium text-gray-600">Kelurahan:</label>
                                <input v-model="kelurahan" type="text" id="kelurahan" name="kelurahan" class="mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring-secondary focus:ring-2 focus:border-secondary" placeholder="Kelurahan" />
                            </div>
                        </div>

                        <div class="w-full mb-4">
                            <label for="alamat" class="block text-sm font-myFont font-medium text-gray-600">Alamat Lengkap:</label>
                            <textarea v-model="alamatLengkap" type="text" id="alamat" name="alamat" class="mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring-secondary focus:ring-2 focus:border-secondary" placeholder="Alamat Lengkap"></textarea>
                        </div>
                    </div>

                    <div class="flex justify-between items-center">
                        <button v-if="currForm > 1" @click="toggleTabs(-1)" class="bg-gray-300 font-myFont text-black p-2 rounded-md hover:shadow-lg hover:opacity-80 transition duration-300 ease-in-out">
                            Sebelumnya
                        </button>
                        <button @click="handleButtonClick()" :disabled="isNextButtonDisabled" :class="{'ml-auto': currForm === 1, 'bg-gray-600 opacity-80 cursor-not-allowed': isNextButtonDisabled}" class="bg-secondary font-myFont text-white p-2 rounded-md hover:shadow-lg hover:opacity-80 transition duration-300 ease-in-out">
                            {{ currForm === 3 ? 'Bayar' : 'Selanjutnya' }}
                        </button>
                        <!-- <img class="w-40 absolute left-[194px] bottom-0 top-0" src="../../../public/img/cc-logo.png" alt=""> -->
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import { ref, computed } from 'vue'
// import useAPI from '../../api/api'
// import router from '../../router/router'
// import Swal from 'sweetalert2';
// import 'sweetalert2/dist/sweetalert2.css';

export default{
    name: 'RegisterPage',
    setup(){
        const currForm = ref(1)
        const namaDepan = ref('')
        const namaBelakang = ref('')
        const emailVal = ref('')
        const passwordVal = ref('')
        const noWhatsapp = ref('')
        const tempatLahir = ref('')
        const tglLahir = ref('')
        const jenisKelamin = ref('')
        const statusNikah = ref('')
        const provinsi = ref('')
        const kota = ref('')
        const kecamatan = ref('')
        const kelurahan = ref('')
        const alamatLengkap = ref('')

        const toggleTabs = (increment) => {
            const currTab = currForm.value + increment;

            if (currTab >= 1 && currTab <= 3) {
                currForm.value = currTab;
            }
        };

        const handleButtonClick = () => {
            if (currForm.value === 3) {
            // hitApiBayar();
                alert('tinggal bayar')
            } else {
                toggleTabs(1);
            }

        };

        const isNextButtonDisabled = computed(() => {
            switch (currForm.value) {
                case 1:
                return !namaDepan.value || !namaBelakang.value || !emailVal.value || !passwordVal.value || !noWhatsapp.value;
                case 2:
                return !tempatLahir.value || !tglLahir.value || !jenisKelamin.value || !statusNikah.value;
                case 3:
                return !provinsi.value || !kota.value || !kecamatan.value || !kelurahan.value || !alamatLengkap.value;
                default:
                return true;
            }
        });

        // const validation = () => {
        //     if(nameVal.value.length < 1){
        //         nameValidation.value = !nameValidation.value
        //     }
        // }

        // const Register = async() => {
        //     validation()
            
        //     let data = JSON.stringify({
        //         "name": nameVal.value,
        //         "email": emailVal.value,
        //         "username": usernameVal.value,
        //         "password": passwordVal.value
        //     })

        //     try {
        //         const response = await useAPI('post','register', data)
        //         if (response.status === 201) {
        //             console.log('Register berhasil:', response.data)

        //             Swal.fire({
        //                 icon: 'success',
        //                 title: 'Registrasi Berhasil!',
        //                 text: 'Anda dapat masuk sekarang.',
        //                 showConfirmButton: false,
        //                 timer: 2000
        //             });

        //             router.push('/login')
        //         }
        //     } catch (error) {
        //         // console.log(error)
        //         // if (error.response && error.response.status === 403)
        //         if (error.response) {
        //             Swal.fire({
        //                 icon: 'error',
        //                 title: 'Registrasi Gagal',
        //                 text: error.response.data.message,
        //                 showConfirmButton: false,
        //                 timer: 2000
        //             });
        //         }
        //     }
        // }

        return{
            currForm,
            namaDepan,
            namaBelakang,
            emailVal,
            passwordVal,
            noWhatsapp,
            tempatLahir,
            tglLahir,
            jenisKelamin,
            statusNikah,
            provinsi,
            kota,
            kelurahan,
            kecamatan,
            alamatLengkap,
            handleButtonClick,
            toggleTabs,
            isNextButtonDisabled
        }
    }
}
</script>