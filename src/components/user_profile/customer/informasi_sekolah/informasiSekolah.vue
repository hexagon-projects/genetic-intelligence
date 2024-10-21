<template>
    <div class="bg-white rounded-lg shadow-sm p-4">
        <h2 class="font-myFont text-dark text-2xl mb-4">Informasi Sekolah</h2>
        <div class="flex flex-col justify-center items-center">
            <div class="flex justify-center items-center w-full gap-2">
                <div class="w-full mb-4">
                    <label for="jenjangPendidikan" class="block text-sm font-myFont font-medium text-dark">Jenjang Pendidikan:</label>
                    <!-- <input v-model="jenjangPendidikan" type="text" name="jenjangPendidikan" class="mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring-biru focus:ring-2 focus:border-biru" placeholder="Password anda saat ini" /> -->
                    <select v-model="jenjangPendidikan" id="jenjang_pendidikan" name="jenjang_pendidikan" class="text-xs md:text-sm lg:text-base mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring-biru focus:ring-2 focus:border-biru bg-white">
                        <!-- <option value="" disabled selected>-- Pilih Opsi --</option> -->
                        <option selected disabled>-- Pilih Opsi --</option>
                        <option v-for="(option, index) in dataJenjangPendidikan" :key="index" :value="option.value">
                        {{ option.text }}
                        </option>
                    </select>
                </div>
                <div class="w-full mb-4">
                    <div class="relative group">
                        <label for="namaPendidikan" class="block text-sm font-myFont font-medium text-dark">
                           {{ jenjangPendidikan !== 'perguruan_tinggi' ? 'Nama Sekolah:' : 'Nama Perguruan Tinggi' }}
                        </label>
                        <input v-model="namaPendidikan" @input="debouncedGetSearchData()" type="text" name="namaPendidikan" class="mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring-biru focus:ring-2 focus:border-biru" :placeholder="jenjangPendidikan !== 'perguruan_tinggi' ? 'Nama Sekolah' : 'Nama Perguruan Tinggi'" />
                        
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

            <div class="flex justify-center items-center w-full gap-2">
                <div v-if="jenjangPendidikan == 'SMA' || jenjangPendidikan == 'SMK' || jenjangPendidikan == 'perguruan_tinggi' " class="w-full mb-4">
                    <label for="jurusan" class="block text-sm font-myFont font-medium text-dark">Jurusan:</label>
                    <input v-model="jurusan" type="text" name="jurusan" class="mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring-biru focus:ring-2 focus:border-biru" placeholder="Jurusan" />
                </div>
                <div class="w-full mb-4">
                    <label for="grade" class="block text-sm font-myFont font-medium text-dark">
                        {{ jenjangPendidikan !== 'perguruan_tinggi' ? 'Kelas:' : 'Semester' }}
                    </label>
                    <input v-model="kelas" type="text" name="grade" class="mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring-biru focus:ring-2 focus:border-biru" :placeholder="jenjangPendidikan !== 'perguruan_tinggi' ? 'Contoh: 1' : 'Contoh: 1'" />
                </div>
            </div>

            <button @click="ubahData" class="px-2 py-2 w-1/2 lg:w-1/4 self-center text-center rounded-lg bg-biru font-myFont font-medium text-light hover:opacity-75 hover:shadow-lg">
                Ubah Data
            </button>
        </div>
    </div>
</template>

<script>
import { onMounted, ref } from 'vue'
import initAPI from '../../../../api/api'
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css'
import DOMPurify from 'dompurify'
import { useRouter } from 'vue-router'
import Cookies from 'js-cookie'
import _debounce from 'lodash/debounce'
import { useStore } from 'vuex'

export default {
    name: 'InformasiSekolah',
    props: ['dataCustomer'],
    setup(props){
        // console.log('data props is sekolah', props)

        const store = useStore()
        const router = useRouter()
        const idSekolah = ref('')
        const searched = ref(false)
        const pilihanSekolah = ref([])

        const dataJenjangPendidikan = ref([])

        onMounted(() => {
            dataJenjangPendidikan.value = [
                {id:1, text:'TK', value: 'TK'},
                {id:2, text:'SD', value: 'SD'},
                {id:3, text:'SMP', value: 'SMP'},
                {id:4, text:'SMA', value: 'SMA'},
                {id:5, text:'SMK', value: 'SMK'},
                {id:6, text:'Perguruan Tinggi', value: 'perguruan_tinggi'},
            ]
        })

        const pilihSekolah = (id, name) => {
            idSekolah.value = id
            searched.value = false
            namaPendidikan.value = name
        }

        const debouncedGetSearchData = _debounce(() => {
            if(namaPendidikan.value !== ''){
                searched.value = true
                getSearchData()
            } else {
                searched.value = false
            }
        }, 500)

        const getSearchData = async() => {
            console.log(`nyari`)
            const response = await initAPI('get', `institutions?search=${namaPendidikan.value}`, null, null)
            console.log(response.data)
            pilihanSekolah.value = response.data.data
        }

        const jenjangPendidikan = ref(props.dataCustomer.institutions ? props.dataCustomer.institutions.type : '-- Pilih Opsi --')
        const namaPendidikan = ref(props.dataCustomer.institutions ? props.dataCustomer.institutions.name : '')
        const kelas = ref(props.dataCustomer.grade ? props.dataCustomer.grade : '')
        const jurusan = ref(props.dataCustomer.majoring ? props.dataCustomer.majoring : '')

        const ubahData = async() => {
            const data = new FormData
            data.append('_method', 'PUT')
            data.append('type', DOMPurify.sanitize(jenjangPendidikan.value))
            data.append('institution_id', DOMPurify.sanitize(idSekolah.value))
            data.append('grade', DOMPurify.sanitize(kelas.value))
            data.append('majoring', DOMPurify.sanitize(jurusan.value))
            const token = Cookies.get('token')
            if(token){
                try {
                    const customerId = props.dataCustomer.id
                    const response = await initAPI('post', 'customers/'+customerId, data, token)
    
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
                } catch (error) {
                    console.log(`gagal ajig`, error)
                    Swal.fire({
                        icon: 'error',
                        title: 'Failed',
                        text: 'Gagal mengubah data pendidikan.',
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
            pilihSekolah,
            searched,
            pilihanSekolah,
            debouncedGetSearchData,
            dataJenjangPendidikan,
            jenjangPendidikan,
            namaPendidikan,
            kelas,
            jurusan,
            props,
            ubahData
        }
    }
}
</script>