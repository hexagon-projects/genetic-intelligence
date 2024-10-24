<template>
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

        <button @click="ubahData" class="px-2 py-2 w-1/2 lg:w-1/4 self-start text-center rounded-lg bg-biru font-myFont font-medium text-light hover:opacity-75 hover:shadow-sm">
            Ubah Data
        </button>
    </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import initAPI from '../../../../api/api'
import Swal from 'sweetalert2'
import 'sweetalert2/dist/sweetalert2.css'
import Cookies from 'js-cookie'
import { useRouter } from 'vue-router'
import DOMPurify from 'dompurify'

export default {
    name: 'InformasiPribadiKonsultan',
    props: ['userData'],
    setup(props){
        const router = useRouter()
        const nama = ref(props.userData.name)
        const emailVal = ref(JSON.parse(localStorage.getItem('userEmail')))
        const noWhatsapp = ref(props.userData.number)
        const tempatLahir = ref(props.userData.birth_place)
        const tglLahir = ref(props.userData.birth_date)
        const formattedDate = ref('')
        const jenisKelamin = ref(props.userData.gender)
        const alamatLengkap = ref(props.userData.address)

        const convertToInputDate = (tanggal) => {
            // console.log(tanggal)
            const [day, month, year] = tanggal.split("-");
            // console.log(`ie ${year}-${month}-${day}`)s
            return `${year}-${month}-${day}`;
        }

        const ubahData = async() => {
            const consultantId = props.userData.id
            const token = Cookies.get('token')

            const formData = new FormData();
            formData.append('_method', 'PUT');
            formData.append('name', DOMPurify.sanitize(nama.value));
            formData.append('gender', DOMPurify.sanitize(jenisKelamin.value));
            formData.append('birth_place', DOMPurify.sanitize(tempatLahir.value));
            formData.append('birth_date', DOMPurify.sanitize(formattedDate.value));
            formData.append('address', DOMPurify.sanitize(alamatLengkap.value));
            formData.append('number', DOMPurify.sanitize(noWhatsapp.value));

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

        onMounted(() => {
            const tanggalForm = convertToInputDate(tglLahir.value);
            formattedDate.value = tanggalForm;
        })

        return {
            nama,
            emailVal,
            noWhatsapp,
            tempatLahir,
            tglLahir,
            formattedDate,
            jenisKelamin,
            alamatLengkap,
            ubahData
        }
    }
}
</script>