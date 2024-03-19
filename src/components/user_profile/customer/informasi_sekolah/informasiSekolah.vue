<template>
    <div class="bg-white rounded-lg shadow-sm p-4">
        <h2 class="font-myFont text-dark text-2xl mb-4">Informasi Sekolah</h2>
        <div class="flex flex-col justify-center items-center">
            <div class="flex justify-center items-center w-full gap-2">
                <div class="w-full mb-4">
                    <label for="jenjangPendidikan" class="block text-sm font-myFont font-medium text-dark">Jenjang Pendidikan:</label>
                    <input v-model="jenjangPendidikan" type="text" name="jenjangPendidikan" class="mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring-biru focus:ring-2 focus:border-biru" placeholder="Password anda saat ini" />
                </div>
                <div class="w-full mb-4">
                    <label for="namaPendidikan" class="block text-sm font-myFont font-medium text-dark">Nama Sekolah:</label>
                    <input v-model="namaPendidikan" type="text" name="namaPendidikan" class="mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring-biru focus:ring-2 focus:border-biru" placeholder="Password baru anda" />
                </div>
            </div>

            <div v-if="props.dataCustomer.institutions.type == 'SMK' || props.dataCustomer.institutions.type == 'Perguruan Tinggi'" class="flex justify-center items-center w-full gap-2">
                <div class="w-full mb-4">
                    <label for="jurusan" class="block text-sm font-myFont font-medium text-dark">Jurusan:</label>
                    <input v-model="jurusan" type="text" name="jurusan" class="mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring-biru focus:ring-2 focus:border-biru" placeholder="Jurusan" />
                </div>
                <div class="w-full mb-4">
                    <label for="grade" class="block text-sm font-myFont font-medium text-dark">Kelas:</label>
                    <input v-model="kelas" type="text" name="grade" class="mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring-biru focus:ring-2 focus:border-biru" placeholder="Kelas" />
                </div>
            </div>

            <button @click="ubahData" class="px-2 py-2 w-1/2 lg:w-1/4 self-center text-center rounded-lg bg-biru font-myFont font-medium text-light hover:opacity-75 hover:shadow-lg">
                Ubah Data
            </button>
        </div>
    </div>
</template>

<script>
import { ref } from 'vue'
import initAPI from '../../../../api/api'
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';
import DOMPurify from 'dompurify'

export default {
    name: 'InformasiSekolah',
    props: ['dataCustomer'],
    setup(props){
        console.log('data props is', props)

        const jenjangPendidikan = ref(props.dataCustomer.institutions.type)
        const namaPendidikan = ref(props.dataCustomer.institutions.name)
        const kelas = ref(props.dataCustomer.grade)
        const jurusan = ref(props.dataCustomer.majoring)

        const ubahData = async() => {
            const data = JSON.stringify({
                type: DOMPurify.sanitize(jenjangPendidikan.value),
                name: DOMPurify.sanitize(namaPendidikan.value),
                grade: DOMPurify.sanitize(kelas.value),
                majoring: DOMPurify.sanitize(jurusan.value)
            })

            try {
                const token = JSON.parse(localStorage.getItem('token'))

                const response = await initAPI('', '', data, token)

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
            } catch (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Failed',
                    text: 'Gagal mengubah password.',
                    showConfirmButton: false,
                    timer: 2000
                });
            }
        }

        return {
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