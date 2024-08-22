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
                    <input v-model="tempatLahir" type="text" id="tempat_lahir" name="tempat_lahir" class="mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring-biru focus:ring-2 focus:border-biru" placeholder="Contoh: Bandung" />
                </div>
                <div class="w-full mb-4">
                    <label for="tgl_lahir" class="block text-sm font-myFont font-medium text-dark">Tanggal Lahir:</label>
                    <input v-model="formattedDate" type="date" id="tgl_lahir" name="tgl_lahir" class="mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring-biru focus:ring-2 focus:border-biru" />
                </div>
            </div>

            <div class="flex justify-center items-center w-full gap-2">
                <div class="w-full mb-4">
                    <label for="anakKe" class="block text-sm font-myFont font-medium text-dark">Anak Ke:</label>
                    <input v-model="anakKe" type="text" id="anakKe" name="anakKe" class="mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring-biru focus:ring-2 focus:border-biru" placeholder="Contoh: 1" />
                </div>

                <div class="w-full mb-4">
                    <label for="jumlahSaudara" class="block text-sm font-myFont font-medium text-dark">Jumlah Saudara:</label>
                    <input v-model="jumlahSaudara" type="text" id="jumlahSaudara" name="jumlahSaudara" class="mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring-biru focus:ring-2 focus:border-biru" placeholder="Contoh: 3" />
                </div>
            </div>
            
            <div class="flex justify-center items-center w-full gap-2">
                <div class="w-full mb-4">
                    <label for="jenis_kelamin" class="block text-sm font-myFont font-medium text-dark">jenis_kelamin:</label>
                    <select v-model="jenisKelamin" name="jenis_kelamin" id="jenis_kelamin" class="mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring-biru focus:ring-2 focus:border-biru bg-white">
                        <option selected disabled>-- Jenis Kelamin --</option>
                        <option v-for="(option, index) in dataJenisKelamin" :key="index" :value="option.value">
                        {{ option.text }}
                        </option>
                    </select>
                </div>
                <div class="w-full mb-4">
                    <label for="status_nikah" class="block text-sm font-myFont font-medium text-dark">Status Nikah:</label>
                    <select v-model="statusNikah" name="status_nikah" id="status_nikah" class="mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring-biru focus:ring-2 focus:border-biru bg-white">
                        <option selected disabled>-- Status Nikah --</option>
                        <option v-for="(option, index) in dataStatusNikah" :key="index" :value="option.value">
                        {{ option.text }}
                        </option>
                    </select>
                </div>
            </div>

            <div class="flex justify-center items-center w-full gap-2">
                <div class="w-full mb-4">
                    <label for="suku" class="block text-sm font-myFont font-medium text-dark">Suku:</label>
                    <input v-model="suku" type="text" id="suku" name="suku" class="mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring-biru focus:ring-2 focus:border-biru" placeholder="Contoh: Sunda" />
                </div>

                <div class="w-full mb-4">
                    <label for="kebangsaan" class="block text-sm font-myFont font-medium text-dark">Kebangsaan:</label>
                    <input v-model="kebangsaan" type="text" id="kebangsaan" name="kebangsaan" class="mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring-biru focus:ring-2 focus:border-biru" placeholder="Contoh: Indonesia" />
                </div>
            </div>

            <div class="flex justify-center items-center w-full gap-2">
                <div class="w-full mb-4">
                    <label for="golongan_darah" class="block text-sm font-myFont font-medium text-dark">Golongan Darah:</label>
                    <select v-model="golonganDarah" name="golongan_darah" class="mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring-biru focus:ring-2 focus:border-biru bg-white">
                        <option selected disabled>-- Golongan Darah --</option>
                        <option v-for="(option, index) in dataGolonganDarah" :key="index" :value="option.value">
                        {{ option.text }}
                        </option>
                    </select>
                </div>
                <div class="w-full mb-4">
                    <label for="agama" class="block text-sm font-myFont font-medium text-dark">Agama:</label>
                    <select v-model="agama" name="agama" class="mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring-biru focus:ring-2 focus:border-biru bg-white">
                        <option selected disabled>-- Agama --</option>
                        <option v-for="(option, index) in dataAgama" :key="index" :value="option.id">
                        {{ option.text }}
                        </option>
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
                        <option selected disabled>-- Pilih Provinsi --</option>
                        <option class="text-xs md:text-sm lg:text-base" v-for="(option, index) in provinceOptions" :key="index" :value="option.id">
                            {{ option.text }}
                        </option>
                    </select>
                </div>
                <div class="w-full mb-4">
                    <label for="kota" class="block text-sm font-myFont font-medium text-dark">Kota:</label>
                    <select :readonly="cityOptions.length === 0" v-model="kota" @change="getKecamatan" name="kota" id="kota" :class="{'read-only:bg-slate-200': cityOptions.length === 0}" class="mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring-biru focus:ring-2 focus:border-biru bg-white">
                        <option selected disabled>-- Pilih Kota --</option>
                        <option v-for="(option, index) in cityOptions" :key="index" :value="option.id">
                            {{ option.text }}
                        </option>
                    </select>
                </div>
            </div>
            
            <div class="flex justify-center items-center w-full gap-2">
                <div class="w-full mb-4">
                    <label for="kecamatan" class="block text-sm font-myFont font-medium text-dark">Kecamatan:</label>
                    <select :readonly="districtsOptions.length === 0" v-model="kecamatan" @change="getKelurahan" name="kecamatan" id="kecamatan" :class="{'read-only:bg-slate-200': districtsOptions.length === 0}" class="mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring-biru focus:ring-2 focus:border-biru bg-white">
                        <option selected disabled>-- Pilih Kecamatan --</option>
                        <option v-for="(option, index) in districtsOptions" :key="index" :value="option.id">
                            {{ option.text }}
                        </option>
                    </select>
                </div>
                <div class="w-full mb-4">
                    <label for="kelurahan" class="block text-sm font-myFont font-medium text-dark">Kelurahan:</label>
                    <select :readonly="villagesOptions.length === 0" v-model="kelurahan" @change="saveVillagesId" name="kelurahan" id="kelurahan" :class="{'read-only:bg-slate-200': villagesOptions.length === 0}" class="mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring-biru focus:ring-2 focus:border-biru bg-white">
                        <option selected disabled>-- Pilih Kelurahan --</option>
                        <option v-for="(item, index) in villagesOptions" :value="item.id" :key="index">{{ item.text }}</option>
                    </select>
                </div>
            </div>

            <div class="w-full mb-4">
                <label for="alamat" class="block text-sm font-myFont font-medium text-dark">Alamat Lengkap:</label>
                <textarea v-model="alamatLengkap" type="text" id="alamat" name="alamat" class="mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring-biru focus:ring-2 focus:border-biru" placeholder="Alamat Lengkap"></textarea>
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

        const dataJenisKelamin = ref([])
        const dataStatusNikah = ref([])
        const dataGolonganDarah = ref([])
        const dataAgama = ref([])

        const provinceOptions = ref([])
        const cityOptions = ref([])
        const districtsOptions = ref([])
        const villagesOptions = ref([])

        const namaDepan = ref(props.dataCustomer ? props.dataCustomer.first_name : '')
        const namaBelakang = ref(props.dataCustomer ? props.dataCustomer.last_name : '')
        const emailVal = ref(JSON.parse(localStorage.getItem('userEmail')))
        const noWhatsapp = ref(props.dataCustomer ? props.dataCustomer.number : '')
        const tempatLahir = ref(props.dataCustomer ? props.dataCustomer.birth_place : '')
        const tglLahir = ref(props.dataCustomer ? props.dataCustomer.birth_date : '')
        const formattedDate = ref('')
        const anakKe = ref(props.dataCustomer ? props.dataCustomer.child_number : '')
        const jumlahSaudara = ref(props.dataCustomer ? props.dataCustomer.from_child_number : '')
        const jenisKelamin = ref(props.dataCustomer.gender === 'Perempuan' ? 2 :
  props.dataCustomer.gender === 'Laki-laki' ? 1 :
  '-- Jenis Kelamin --')
        const statusNikah = ref(props.dataCustomer.status == 'Belum Kawin' ? 0 
        : props.dataCustomer.status == 'Kawin' ? 1
        : props.dataCustomer.status == 'Cerai Hidup' ? 2 
        : props.dataCustomer.status == 'Cerah Mati' ? 3 
        : '-- Status Nikah --')
        const suku = ref(props.dataCustomer ? props.dataCustomer.ethnic : '')
        const kebangsaan = ref(props.dataCustomer ? props.dataCustomer.nationality : '')
        const provinsi = ref(props.dataCustomer.village ? props.dataCustomer.village.district.regency.province.id : '-- Pilih Provinsi --')
        const kota = ref(props.dataCustomer.village ? props.dataCustomer.village.district.regency.id : '-- Pilih Kota --')
        const kecamatan = ref(props.dataCustomer.village ? props.dataCustomer.village.district.id : '-- Pilih Kecamatan --')
        const kelurahan = ref(props.dataCustomer.village ? props.dataCustomer.village.id : '-- Pilih Kelurahan --')
        const alamatLengkap = ref(props.dataCustomer ? props.dataCustomer.address : '')
        const golonganDarah = ref(props.dataCustomer.blood_group ? props.dataCustomer.blood_group : '-- Golongan Darah --')
        const agama = ref(props.dataCustomer.religion ? props.dataCustomer.religion : '-- Agama --')
        
        const convertToInputDate = (tanggal) => {
            // console.log(tanggal)
            if(tanggal){
                const [day, month, year] = tanggal.split("-");
                console.log(`${year}-${month}-${day}`)
                return `${year}-${month}-${day}`;
            }
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

            dataJenisKelamin.value = [
                {id: 1, text: 'Laki - laki', value: 1},
                {id: 2,text: 'Perempuan', value: 2}
            ]

            dataStatusNikah.value = [
                {id: 1, text: 'Belum Kawin', value: 0},
                {id: 2, text: 'Kawin', value: 1},
                {id: 3, text: 'Cerai Hidup', value: 2},
                {id: 4, text: 'Cerai Mati', value: 3}
            ]

            dataGolonganDarah.value = [
                {id: 1, text: 'A', value: 'A'},
                {id: 2, text: 'AB', value: 'AB'},
                {id: 3, text: 'B', value: 'B'},
                {id: 4, text: 'O', value: 'O'}
            ]

            dataAgama.value = [
                {id:1, text: 'Islam'},
                {id:2, text: 'Kristen'},
                {id:3, text: 'Katholik'},
                {id:4, text: 'Hindu'},
                {id:5, text: 'Budha'},
                {id:6, text: 'lainya'}
            ]

            if(provinsi.value) getKota()
            if(kota.value) getKecamatan()
            if(kecamatan.value) getKelurahan()
        })

        const getKota = async() => {
            // console.log(`kota:`, provinsi.value)
            const endpoint = provinsi.value ? 'region/regencies?province_id='+provinsi.value : 'region/regencies'
            const kota = await initAPI('get', endpoint, null, null)
            console.log(`kota`, kota)
            const formattedKota = kota.data.map(item => ({
                id: item.id,
                text: item.name
            }));
            cityOptions.value = formattedKota
            // const kota = await initAPI('get', 'region/regencies?province_id='+provinsi.value, null, null)
        }

        const getKecamatan = async() => {
            const endpoint = kota.value ? 'region/districts?regency_id='+kota.value : 'region/districts'
            const kecamatan = await initAPI('get', endpoint, null, null)
            const formattedKecamatan = kecamatan.data.map(item => ({
                id: item.id,
                text: item.name
            }));
            districtsOptions.value = formattedKecamatan
        }

        const getKelurahan = async() => {
            const endpoint = kecamatan.value ? 'region/villages?district_id='+kecamatan.value : 'region/villages'
            const kelurahan = await initAPI('get', endpoint, null, null)
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
            formData.append('blood_group', DOMPurify.sanitize(golonganDarah.value));
            formData.append('child_number', DOMPurify.sanitize(anakKe.value));
            formData.append('from_child_number', DOMPurify.sanitize(jumlahSaudara.value));
            formData.append('number', DOMPurify.sanitize(noWhatsapp.value));
            formData.append('birth_place', DOMPurify.sanitize(tempatLahir.value));
            formData.append('birth_date', DOMPurify.sanitize(formattedDate.value));
            formData.append('gender', DOMPurify.sanitize(jenisKelamin.value));
            formData.append('status', statusNikah.value);
            formData.append('ethnic', DOMPurify.sanitize(suku.value));
            formData.append('nationality', DOMPurify.sanitize(kebangsaan.value));
            formData.append('religion', agama.value);
            formData.append('village_id', DOMPurify.sanitize(kelurahan.value));
            formData.append('address', DOMPurify.sanitize(alamatLengkap.value));

            console.log('update', formData)
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

                        const formData = new FormData()
                        formData.append('refresh_user', 'true')
                        // const updatedCustomer = await initAPI('get', 'customers?id='+customerId, null, token)
                        const updatedCustomer = await initAPI('post', 'login', formData, token)
                        // console.log(updatedCustomer.data.customer)
                        store.commit('user', updatedCustomer.data.customer)
                        localStorage.setItem('userData', JSON.stringify(updatedCustomer.data.customer))
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
            dataJenisKelamin,
            jenisKelamin,
            anakKe,
            jumlahSaudara,
            suku,
            kebangsaan,
            dataStatusNikah,
            statusNikah,
            provinsi,
            kecamatan,
            kelurahan,
            kota,
            alamatLengkap,
            dataGolonganDarah,
            golonganDarah,
            dataAgama,
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