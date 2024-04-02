<template>
    <div class="bg-white rounded-lg shadow-sm p-4 h-full">
        <h2 class="font-myFont text-dark text-2xl mb-4">Informasi Pribadi</h2>
        <div class="flex flex-col justify-center items-center">
            <div class="flex justify-center items-center w-full gap-2">
                <div class="w-full mb-4">
                    <label for="nama_depan" class="block text-sm font-myFont font-medium text-dark">Nama Depan:</label>
                    <input v-model="namaDepan" type="text" name="nama_depan" class="mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring-biru focus:ring-2 focus:border-biru" />
                </div>
                <div class="w-full mb-4">
                    <label for="newPass" class="block text-sm font-myFont font-medium text-dark">Nama Belakang:</label>
                    <input v-model="namaBelakang" type="text" id="nama_belakang" name="nama_belakang" class="mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring-biru focus:ring-2 focus:border-biru" />
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
                <div class="w-full mb-4">
                    <label for="status_nikah" class="block text-sm font-myFont font-medium text-dark">Status Nikah:</label>
                    <select v-model="statusNikah" name="status_nikah" id="status_nikah" class="mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring-biru focus:ring-2 focus:border-biru bg-white">
                        <option value="Belum Kawin">Belum Kawin</option>
                        <option value="Kawin">Kawin</option>
                        <option value="Cerai Hidup">Cerai Hidup</option>
                        <option value="Cerai Mati">Cerai Mati</option>
                    </select>
                </div>
            </div>

            <div class="flex justify-center items-center w-full gap-2">
                <div class="w-full mb-4">
                    <label for="golongan_darah" class="block text-sm font-myFont font-medium text-dark">Golongan Darah:</label>
                    <select v-model="golonganDarah" name="golongan_darah" class="mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring-biru focus:ring-2 focus:border-biru bg-white">
                        <option value="A">A</option>
                        <option value="B">B</option>
                        <option value="AB">AB</option>
                        <option value="O">O</option>
                    </select>
                </div>
                <div class="w-full mb-4">
                    <label for="agama" class="block text-sm font-myFont font-medium text-dark">Agama:</label>
                    <select v-model="agama" name="agama" class="mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring-biru focus:ring-2 focus:border-biru bg-white">
                        <option value="Islam">Islam</option>
                        <option value="Kristen">Kristen</option>
                        <option value="Katholik">Katholik</option>
                        <option value="Hindu">Hindu</option>
                        <option value="Buddha">Buddha</option>
                        <option value="Lainya">Lainya</option>
                    </select>
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
                    <label for="provinsi" class="block text-sm font-myFont font-medium text-dark">Provinsi:</label>
                    <!-- <input v-model="provinsi" type="text" id="provinsi" name="provinsi" class="mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring-biru focus:ring-2 focus:border-biru" /> -->
                    <select v-model="provinsi" @change="getKota" name="provinsi" id="provinsi" class="mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring-biru focus:ring-2 focus:border-biru bg-white">
                        <option v-for="(option, index) in provinceOptions" :key="index" :value="option.id">
                            {{ option.text }}
                        </option>
                    </select>
                </div>
                <div class="w-full mb-4">
                    <label for="kota" class="block text-sm font-myFont font-medium text-dark">Kota:</label>
                    <!-- <input v-model="kota" type="text" id="kota" name="kota" class="mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring-biru focus:ring-2 focus:border-biru" /> -->
                    <select v-model="kota" @change="getKecamatan" name="kota" id="kota" class="mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring-biru focus:ring-2 focus:border-biru bg-white">
                        <option v-for="(option, index) in cityOptions" :key="index" :value="option.id">
                            {{ option.text }}
                        </option>
                    </select>
                </div>
            </div>
            
            <div class="flex justify-center items-center w-full gap-2">
                <div class="w-full mb-4">
                    <label for="kecamatan" class="block text-sm font-myFont font-medium text-dark">Kecamatan:</label>
                    <!-- <input v-model="kecamatan" type="text" id="kecamatan" name="kecamatan" class="mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring-biru focus:ring-2 focus:border-biru" /> -->
                    <select v-model="kecamatan" @change="getKelurahan" name="kecamatan" id="kecamatan" class="mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring-biru focus:ring-2 focus:border-biru bg-white">
                        <option v-for="(option, index) in districtsOptions" :key="index" :value="option.id">
                            {{ option.text }}
                        </option>
                    </select>
                </div>
                <div class="w-full mb-4">
                    <label for="kelurahan" class="block text-sm font-myFont font-medium text-dark">Kelurahan:</label>
                    <!-- <input v-model="kelurahan" type="text" id="kelurahan" name="kelurahan" class="mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring-biru focus:ring-2 focus:border-biru" /> -->
                    <select v-model="kelurahan" @change="saveVillagesId" name="kelurahan" id="kelurahan" class="mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring-biru focus:ring-2 focus:border-biru bg-white">
                        <option v-for="(item, index) in villagesOptions" :value="item.id" :key="index">{{ item.text }}</option>
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
</template>

<script>
import { ref, onMounted } from 'vue'
import initAPI from '../../../../api/api'
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';
import { useStore } from 'vuex'
import DOMPurify from 'dompurify'
import { useRouter } from 'vue-router'
import Cookies from 'js-cookie'

export default {
    name: 'InformasiPribadi',
    props: ['dataCustomer'],
    setup(props){
        const router = useRouter()
        const store = useStore()
        const userData = ref(props.dataCustomer)

        const provinceOptions = ref([])
        const cityOptions = ref([])
        const districtsOptions = ref([])
        const villagesOptions = ref([])

        const namaDepan = ref(props.dataCustomer.first_name)
        const namaBelakang = ref(props.dataCustomer.last_name)
        const emailVal = ref(JSON.parse(localStorage.getItem('userEmail')))
        const noWhatsapp = ref(props.dataCustomer.number)
        const tempatLahir = ref(props.dataCustomer.birth_place)
        const tglLahir = ref(props.dataCustomer.birth_date)
        const formattedDate = ref('')
        const jenisKelamin = ref(props.dataCustomer.gender)
        const statusNikah = ref(props.dataCustomer.status)
        const provinsi = ref(props.dataCustomer.village.district.regency.province.id)
        const kota = ref(props.dataCustomer.village.district.regency.id)
        const kecamatan = ref(props.dataCustomer.village.district.id)
        const kelurahan = ref(props.dataCustomer.village.id)
        const alamatLengkap = ref(props.dataCustomer.address)
        const golonganDarah = ref(props.dataCustomer.blood_group)
        const agama = ref(props.dataCustomer.religion)
        
        const convertToInputDate = (tanggal) => {
            // console.log(tanggal)
            const [day, month, year] = tanggal.split("-");
            console.log(`${year}-${month}-${day}`)
            return `${year}-${month}-${day}`;
        };

        onMounted(async () => {
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

            const province = await initAPI('get', 'region/provinces', null, null)
            const formattedProvince = province.data.map(item => ({
                id: item.id,
                text: item.name
            }));
            provinceOptions.value = formattedProvince

            getKota()
            getKecamatan()
            getKelurahan()
        })

        const getKota = async() => {
            console.log(`kota:`, provinsi.value)
            const kota = await initAPI('get', 'region/regencies?province_id='+provinsi.value, null, null)
            console.log(`kota`, kota)
            const formattedKota = kota.data.map(item => ({
                id: item.id,
                text: item.name
            }));
            cityOptions.value = formattedKota
        }

        const getKecamatan = async() => {
            console.log(`kecataman:`, kota.value)
            const kecamatan = await initAPI('get', 'region/districts?regency_id='+kota.value, null, null)
            console.log(`kecamatan`, kecamatan)
            const formattedKecamatan = kecamatan.data.map(item => ({
                id: item.id,
                text: item.name
            }));
            districtsOptions.value = formattedKecamatan
        }

        const getKelurahan = async() => {
            console.log(`kelurahan yeuh:`, kecamatan.value)
            const kelurahan = await initAPI('get', 'region/villages?district_id='+kecamatan.value, null, null)
            console.log(`kelurahan`, kelurahan)
            const formattedKelurahan = kelurahan.data.map(item => ({
                id: item.id,
                text: item.name
            }));
            villagesOptions.value = formattedKelurahan
        }

        const saveVillagesId = () => {
            console.log(`ie yeuh villagena`, kelurahan.value)
        }

        const ubahData = async() => {
            const customerId = userData.value.id
            const token = Cookies.get('token')

            const formData = new FormData();
            formData.append('_method', 'PUT');
            formData.append('id', customerId);
            formData.append('first_name', DOMPurify.sanitize(namaDepan.value));
            formData.append('last_name', DOMPurify.sanitize(namaBelakang.value));
            formData.append('number', DOMPurify.sanitize(noWhatsapp.value));
            formData.append('birth_place', DOMPurify.sanitize(tempatLahir.value));
            formData.append('birth_date', DOMPurify.sanitize(formattedDate.value));
            formData.append('gender', DOMPurify.sanitize(jenisKelamin.value == 'Laki-laki' ? 1 : 2));
            formData.append('status', DOMPurify.sanitize(statusNikah.value == 'Lajang' ? 0 : 1));
            formData.append('village_id', DOMPurify.sanitize(kelurahan.value));
            formData.append('address', DOMPurify.sanitize(alamatLengkap.value));

            if(token){
                try{
                    const response = await initAPI(
                        'post','customers/'+customerId, formData, token
                    );
        
                    if(response.status == 200){
                        Swal.fire({
                            icon: 'success',
                            title: 'Success',
                            text: response.data.message,
                            showConfirmButton: false,
                            timer: 2000
                        });
                        const updatedCustomer = await initAPI('get', 'customers?id='+customerId, null, token)
                        store.commit('user', updatedCustomer.data.data[0])
                        localStorage.setItem('userData', JSON.stringify(updatedCustomer.data.data[0]))
                    }
                }catch(err){
                    console.log(`aimaneh ie error`, err)
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


            // console.log(response.data)
        }

        return {
            namaDepan,
            namaBelakang,
            emailVal,
            noWhatsapp,
            tempatLahir,
            tglLahir,
            formattedDate,
            jenisKelamin,
            statusNikah,
            provinsi,
            kecamatan,
            kelurahan,
            kota,
            alamatLengkap,
            golonganDarah,
            agama,
            provinceOptions,
            cityOptions,
            districtsOptions,
            villagesOptions,
            ubahData,
            getKota,
            getKecamatan,
            getKelurahan,
            saveVillagesId,
        }
    }
}
</script>