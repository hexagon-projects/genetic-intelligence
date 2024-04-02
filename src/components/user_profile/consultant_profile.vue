<template>
  <div class="mx-4 pt-5">
    <div class="bg-white rounded-lg shadow-xl p-4">
        <div class="flex justify-around items-center">
            <div class="mx-4 flex justify-center items-center gap-2">
                <img v-if="profileImageUrl || userData.image !== null" class="w-24 h-24 rounded-full border-2 border-biru" :src="profileImageUrl == '' ? baseUrl+'open/consultant/'+userData.image : profileImageUrl" alt="Foto Profile">
                <img v-else-if="!profileImageUrl && userData.image == null" class="w-24 h-24 rounded-full border-2 border-biru" src="../../assets/img/profile-mock.png" alt="Foto Profile">
                <div class="flex flex-col">
                    <h2 class="font-myFont text-dark text-2xl">{{ userData.name }}</h2>
                    <p class="font-myFont text-gray-500 text-sm">Foto Profile</p>
                </div>
            </div>
  
            <div class="flex justify-center items-center gap-2">
                <button @click="uploadFoto" v-if="profileImageUrl" class="
                   cursor-pointer px-2 py-1 rounded-lg font-myFont text-biru border-2 border-biru
                    hover:text-light hover:bg-biru hover:shadow-lg
                ">
                    Simpan Foto
                </button>
  
                <label for="fileInput" class="
                   cursor-pointer px-2 py-1 rounded-lg font-myFont text-biru border-2 border-biru
                    hover:text-light hover:bg-biru hover:shadow-lg
                ">
                Ubah Foto
                </label>
            </div>
  
            <input
                type="file"
                id="fileInput"
                ref="fileInput"
                style="display: none"
                @change="handleFileChange"
            />
        </div>
    </div>
  </div>
  
  <div class="flex flex-col lg:flex-row justify-center mx-4 pt-5 gap-5">
    <div class="lg:w-1/2">
        <div class="bg-white rounded-lg shadow-xl p-4 h-full">
            <h2 class="font-myFont text-dark text-2xl mb-4">Informasi Pribadi</h2>
            <div class="flex flex-col justify-center items-center">
                <div class="flex justify-center items-center w-full gap-2">
                    <div class="w-full mb-4">
                        <label for="nama" class="block text-sm font-myFont font-medium text-dark">Nama:</label>
                        <input v-model="nama" type="text" name="nama" class="mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring-biru focus:ring-2 focus:border-biru" />
                    </div>
                </div>
                
                <div class="flex justify-center items-center w-full gap-2">
                    <div class="w-full mb-4">
                        <label for="email" class="block text-sm font-myFont font-medium text-dark">Email:</label>
                        <input v-model="emailVal" type="email" id="email" name="email" class="mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring-biru focus:ring-2 focus:border-biru" disabled readonly/>
                    </div>
  
                    <div class="w-full mb-4">
                        <label for="no_whatsapp" class="block text-sm font-myFont font-medium text-dark">No Whatsapp:</label>
                        <input v-model="noWhatsapp" type="text" id="no_whatsapp" name="no_whatsapp" class="mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring-biru focus:ring-2 focus:border-biru" />
                    </div>
                </div>
  
                <div class="flex justify-center items-center w-full gap-2">
                    <div class="w-full mb-4">
                        <label for="Tempat Lahir" class="block text-sm font-myFont font-medium text-dark">Tempat Lahir:</label>
                        <input v-model="tempatLahir" type="text" id="tempat_lahir" name="tempat_lahir" class="mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring-biru focus:ring-2 focus:border-biru" />
                    </div>
                    <div class="w-full mb-4">
                        <label for="tgl_lahir" class="block text-sm font-myFont font-medium text-dark">Tanggal Lahir:</label>
                        <input v-model="formattedDate" type="date" id="tgl_lahir" name="tgl_lahir" class="mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring-biru focus:ring-2 focus:border-biru" />
                    </div>
                </div>
                
                <div class="flex justify-center items-center w-full gap-2">
                    <div class="w-full mb-4">
                        <label for="jenis_kelamin" class="block text-sm font-myFont font-medium text-dark">Jenis Kelamin:</label>
                        <select v-model="jenisKelamin" name="jenis_kelamin" class="mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring-biru focus:ring-2 focus:border-biru bg-white">
                            <option value="1">Laki - Laki</option>
                            <option value="0">Perempuan</option>
                        </select>
                    </div>
                </div>
  
                <div class="w-full mb-4">
                    <label for="alamat" class="block text-sm font-myFont font-medium text-dark">Alamat Lengkap:</label>
                    <textarea v-model="alamatLengkap" type="text" id="alamat" name="alamat" class="mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring-biru focus:ring-2 focus:border-biru"></textarea>
                </div>
  
                <button @click="ubahData" class="px-2 py-2 w-1/2 lg:w-1/4 self-start text-center rounded-lg bg-biru font-myFont font-medium text-light hover:opacity-75 hover:shadow-lg">
                    Ubah Data
                </button>
            </div>
        </div>
    </div>
  
    <div class="lg:w-1/2">
        <div class="flex flex-col gap-5">
            <div class="bg-white rounded-lg shadow-lg p-4">
                <h2 class="font-myFont text-dark text-2xl mb-4">Data Konsultasi</h2>
                <div class="flex flex-col">
                    <div class="flex w-full">
                        <div class="w-1/2 mb-4">
                            <label for="currPass" class="block text-sm font-myFont font-medium text-dark">Biaya Konsultasi :</label>
                            <div class="relative">
                                <div class="absolute inset-y-0 start-0 -top-2 flex items-center ps-3.5 pointer-events-none">
                                    <span class="w-4 h-4 text-dark font-semibold" aria-hidden="true">Rp.</span>
                                </div>
                                <input v-model="consultant_fee" type="number" class="mt-1 border rounded-md w-full focus:outline-none focus:ring-biru focus:ring-2 focus:border-biru block ps-10 p-2" placeholder="1000000" required>
                            </div>
                        </div>
                    </div>
                    <div class="w-1/2 mb-4">
                        <label for="day" class="block text-sm font-myFont font-medium text-dark">Hari :</label>
                        <select v-model="selected_day" @change="getAvailable(selected_day)" name="day" class="mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring-biru focus:ring-2 focus:border-biru bg-white">
                            <option value="Monday">Senin</option>
                            <option value="Tuesday">Selasa</option>
                            <option value="Wednesday">Rabu</option>
                            <option value="Thursday">Kamis</option>
                            <option value="Friday">Jumat</option>
                            <option value="Saturday">Sabtu</option>
                            <option value="Sunday">Minggu</option>
                        </select>
                    </div>
                    <div class="w-3/4 mb-4">
                        <label for="day" class="block text-sm font-myFont font-medium text-dark mb-1">Jam Kerja :</label>
                        <div class="flex flex-row w-ful">
                            <label class="inline-flex gap-2 w-1/3">
                                <input type="checkbox" @click="changeKonsulData" class="form-checkbox" name="time" value="08:00 - 10:00" />
                                <span class="w-full">08:00 - 10:00</span>
                            </label>
                            <label class="inline-flex gap-2 w-1/3">
                                <input type="checkbox" @click="changeKonsulData" class="form-checkbox" name="time" value="11:00 - 13:00" />
                                <span class="w-full">11:00 - 13:00</span>
                            </label>
                            <label class="inline-flex gap-2 w-1/3">
                                <input type="checkbox" @click="changeKonsulData" class="form-checkbox" name="time" value="14:00 - 16:00" />
                                <span class="w-full">14:00 - 16:00</span>
                            </label>
                        </div>
                    </div>
      
                    <button @click="saveKonsulData" class="px-2 py-2 mt-3 w-1/2 lg:w-1/4 self-start text-center rounded-lg bg-biru font-myFont font-medium text-light hover:opacity-75 hover:shadow-lg">
                        Ubah Data
                    </button>
                </div>
            </div>
            <div class="bg-white rounded-lg shadow-lg p-4">
                <h2 class="font-myFont text-dark text-2xl mb-4">Ubah Password</h2>
                <div class="flex flex-col justify-center items-center">
                    <div class="flex justify-center items-center w-full gap-2">
                        <div class="w-full mb-4">
                            <label for="currPass" class="block text-sm font-myFont font-medium text-dark">Password Sekarang:</label>
                            <input v-model="currPass" type="password" name="curPass" class="mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring-biru focus:ring-2 focus:border-biru" placeholder="Password Lama Anda" />
                        </div>
                        <div class="w-full mb-4">
                            <label for="newPass" class="block text-sm font-myFont font-medium text-dark">Password Baru:</label>
                            <input v-model="newPass" type="password" name="newPass" class="mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring-biru focus:ring-2 focus:border-biru" placeholder="Password Baru Anda" />
                        </div>
                    </div>
      
                    <button @click="changePassword" class="px-2 py-2 w-1/2 lg:w-1/4 self-start text-center rounded-lg bg-biru font-myFont font-medium text-light hover:opacity-75 hover:shadow-lg">
                        Ubah Password
                    </button>
                </div>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import initAPI from '../../api/api'
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';
import { useRouter } from 'vue-router';
import Cookies from 'js-cookie'

export default {
    name: 'consultantProfile',
    setup(){
        const router = useRouter()
        const baseUrl = import.meta.env.VITE_API_BASE_URL
        const selected_day = ref('Monday')
        const store = useStore()
        const userData = computed(() => store.getters.getUserData)
        const userRole = computed(() => store.getters.getUserRole)

        const profileImageUrl = ref('');
        const handleFileChange = () => {
            const fileInput = document.getElementById('fileInput');
            const file = fileInput.files[0];

            if (file) {
                profileImageUrl.value = URL.createObjectURL(file);
            }
        };

        const uploadFoto = async() => {
            const consultantId = userData.value.id
            const token = Cookies.get('token')
            const fileInput = document.getElementById('fileInput');
            const file = fileInput.files[0];

            if(token){
                if (file) {
                    const formData = new FormData();
                    formData.append('_method', 'PUT');
                    formData.append('image', file);
    
                    const response = await initAPI('post','consultants/'+consultantId, formData, token)
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
                    localStorage.setItem('userData', JSON.stringify(updatedConsultant.data.data[0]))
                    }
                }
            } else {
                router.push('/login')
                localStorage.clear()
            }
        }

        const nama = ref(userData.value.name)
        const emailVal = ref(JSON.parse(localStorage.getItem('userEmail')))
        const noWhatsapp = ref(userData.value.number)
        const tempatLahir = ref(userData.value.birth_place)
        const tglLahir = ref(userData.value.birth_date)
        const formattedDate = ref('')
        const jenisKelamin = ref(userData.value.gender)
        const alamatLengkap = ref(userData.value.address)
        const currPass = ref('')
        const newPass = ref('')
        const consultant_fee = ref(userData.value.fee)

        let available_on = ref(userData.value.available_on)
        available_on = available_on.value

        const convertToInputDate = (tanggal) => {
            // console.log(tanggal)
            const [day, month, year] = tanggal.split("-");
            console.log(`ie ${year}-${month}-${day}`)
            return `${year}-${month}-${day}`;
        };

        onMounted(() => {
            if (!userData.value && !userRole.value && !userEmail) {
                const localStorageUserData = localStorage.getItem('userData')
                const localStorageUserRole = localStorage.getItem('userRole')
                if (localStorageUserData && localStorageUserRole) {
                    const parsedUserData = JSON.parse(localStorageUserData)
                    const parsedUserRole = JSON.parse(localStorageUserRole)
                    store.commit('user', parsedUserData)
                    store.commit('userRole', parsedUserRole)
                }
            }

            const tanggalForm = convertToInputDate(tglLahir.value);
            formattedDate.value = tanggalForm;

            getAvailable('Monday');
        })

        const changePassword = async () => {
            const userId = userData.value.user_id
            const token = Cookies.get('token')

            if(token){
                try {
                    const data = JSON.stringify({
                        current_password: currPass.value,
                        new_password: newPass.value,
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

        const ubahData = async() => {
            const consultantId = userData.value.id
            const token = Cookies.get('token')

            const formData = new FormData();
            formData.append('_method', 'PUT');
            formData.append('name', nama.value);
            formData.append('gender', jenisKelamin.value);
            formData.append('birth_place', tempatLahir.value);
            formData.append('birth_date', formattedDate.value);
            formData.append('address', alamatLengkap.value);
            formData.append('number', noWhatsapp.value);

            if(token){
                const response = await initAPI(
                    'post','consultants/'+consultantId, formData, token
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
                    localStorage.setItem('userData', JSON.stringify(updatedConsultant.data.data[0]))
                }else{
                    Swal.fire({
                        icon: 'danger',
                        title: 'Failed',
                        text: response.data.error,
                        showConfirmButton: false,
                        timer: 2000
                    });
                }
            } else {
                router.push('/login')
                localStorage.clear()
            }
        }

        const getAvailable = async (day) => {
            let checks = document.getElementsByName("time")
            checks.forEach(check => { check.checked = false });

            let available = JSON.parse(available_on)
            if(available[day]){
                available[day]['time'].forEach(time => {
                    let checks = document.getElementsByName("time")
                    checks.forEach(check => {
                        if(check.value == time){
                            check.checked = true;
                        }
                    });
                });
            }
        }

        const changeKonsulData = async () => {
            let available = JSON.parse(available_on)
            let day = selected_day.value
            let get_time = document.getElementsByName('time');
            let time = []
            for (let t = 0; t < get_time.length; t++) {
                if(get_time[t].checked){
                    time.push(get_time[t].value)
                }
            }

            if(!available[day]){
                available[day] = {
                    data : day == 'Monday' ? 0 : day == 'Tuesday' ? 1 : day == 'Wednesday' ? 2 : day == 'Thursday' ? 3 : day == 'Friday' ? 4 : day == 'Saturday' ? 5 : 6,
                    day : day
                }
            }

            available[day]['time'] = time
            available_on = JSON.stringify(available)
        }

        const saveKonsulData = async () => {
            const consultantId = userData.value.id
            const token = Cookies.get('token')

            const formData = new FormData();
            formData.append('_method', 'PUT');
            formData.append('fee', parseInt(consultant_fee.value));
            formData.append('available_on', available_on);

            if(token){
                try{
                    const response = await initAPI(
                        'post','consultants/'+consultantId, formData, token
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
                        localStorage.setItem('userData', JSON.stringify(updatedConsultant.data.data[0]))
                    }
                }catch(error){
                    Swal.fire({
                        icon: 'error',
                        title: 'Failed',
                        text: 'Gagal mengubah data.',
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
            baseUrl,
            currPass, 
            userData,
            userRole,
            nama,
            emailVal,
            noWhatsapp,
            tempatLahir,
            tglLahir,
            formattedDate,
            jenisKelamin,
            consultant_fee,
            alamatLengkap,
            profileImageUrl,
            currPass,
            newPass,
            selected_day,
            handleFileChange,
            ubahData,
            changePassword,
            uploadFoto,
            getAvailable,
            changeKonsulData,
            saveKonsulData
        }
      }
    }
</script>