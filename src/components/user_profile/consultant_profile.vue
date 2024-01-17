<template>
  <div class="mx-4 pt-5">
    <div class="bg-white rounded-lg shadow-xl p-4">
        <div class="flex justify-around items-center">
            <div class="mx-4 flex justify-center items-center gap-2">
                <img v-if="profileImageUrl || userData.image !== null" class="w-24 h-24 rounded-full border-2 border-biru" :src="profileImageUrl == '' ? 'http://gim.app.api.hexagon.co.id/api/open/consultant/'+userData.image : profileImageUrl" alt="Foto Profile">
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
                        <input v-model="emailVal" type="email" id="email" name="email" class="mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring-biru focus:ring-2 focus:border-biru" />
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
                            <option value="Laki-laki">Laki - Laki</option>
                            <option value="Perempuan">Perempuan</option>
                        </select>
                    </div>
                </div>
  
                <div class="w-full mb-4">
                    <label for="alamat" class="block text-sm font-myFont font-medium text-dark">Alamat Lengkap:</label>
                    <textarea v-model="alamatLengkap" type="text" id="alamat" name="alamat" class="mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring-biru focus:ring-2 focus:border-biru"></textarea>
                </div>
  
                <button @click="ubahData" class="px-2 py-2 w-1/2 lg:w-1/4 self-center text-center rounded-lg bg-biru font-myFont font-medium text-light hover:opacity-75 hover:shadow-lg">
                    Ubah Data
                </button>
            </div>
        </div>
    </div>
  
    <div class="lg:w-1/2">
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
  
                <button @click="changePassword" class="px-2 py-2 w-1/2 lg:w-1/4 self-center text-center rounded-lg bg-biru font-myFont font-medium text-light hover:opacity-75 hover:shadow-lg">
                    Ubah Password
                </button>
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

export default {
    name: 'customerProfile',
    setup(){
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
            const token = JSON.parse(localStorage.getItem('token'))
            const fileInput = document.getElementById('fileInput');
            const file = fileInput.files[0];

            if (file) {
                const formData = new FormData();
                formData.append('_method', 'PUT');
                formData.append('image', file);

                console.log(formData)

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
                store.commit('user', updatedConsultant.data.data[0])
                localStorage.setItem('userData', JSON.stringify(updatedConsultant.data.data[0]))
                }
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

        const convertToInputDate = (tanggal) => {
            // console.log(tanggal)
            const [day, month, year] = tanggal.split("-");
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
        })

        const changePassword = async () => {
            const userId = userData.value.user_id
            const token = JSON.parse(localStorage.getItem('token'))

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
                store.commit('user', updatedConsultant.data.data[0])
            }
        }

        const ubahData = async() => {
            const consultantId = userData.value.id
            const token = JSON.parse(localStorage.getItem('token'))

            const formData = new FormData();
            formData.append('_method', 'PUT');
            formData.append('id', customerId);
            formData.append('name', nama.value);
            formData.append('birth_place', tempatLahir.value);
            formData.append('birth_date', tglLahir.value);
            formData.append('address', alamatLengkap.value);

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
                store.commit('user', updatedConsultant.data.data[0])
            }

            // console.log(response.data)
        }


        return {
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
            alamatLengkap,
            profileImageUrl,
            currPass,
            newPass,
            handleFileChange,
            ubahData,
            changePassword,
            uploadFoto
        }
      }
    }
</script>