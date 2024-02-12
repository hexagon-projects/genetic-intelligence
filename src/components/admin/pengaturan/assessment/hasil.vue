<template>
    <section class="bg-gray-100 pb-[340px] lg:pb-28">
        <div class="mx-4 pt-4">
            <ol class="mx-4 flex justify-start items-center text-gray-500 font-semibold">
                <RouterLink :to="{name: 'views.dashboard'}" class="text-gray-400 hover:text-dark text-base">
                    Beranda
                </RouterLink>
                <span class="mx-2 text-base">/</span>
                <RouterLink :to="{name: 'admin.views.reservasi'}" class="text-base text-dark hover:text-dark/70">
                    Reservasi
                </RouterLink>
            </ol>
        </div>

        <div v-if="isModalOpen && detailGayaBelajar" class="fixed z-[999] inset-0 bg-gray-900 bg-opacity-60 h-full w-full px-4 modal"
        >
            <div class="hidden lg:block relative w-3/4 top-4 mx-auto shadow-xl rounded-md bg-white">
                <!-- Modal body -->
                <h1 class="font-myFont text-dark text-lg mx-4 pt-4">Detail Gaya Belajar</h1>
                <hr class="mt-4">
                
                <div v-if="detailGayaBelajar" :class="{'h-[460px] flex flex-col justify-center': loadingSubmit}" class="w-full p-4 mx-auto max-h-[460px] overflow-y-scroll">
                    <div v-if="loadingSubmit" class="flex flex-col items-center justify-center w-full">
                        <span class="mx-auto animate-[spin_2s_linear_infinite] border-8 border-[#f1f2f3] border-l-biru border-r-biru rounded-full w-14 h-14"></span>
                    </div>

                    <div v-else-if="!loadingSubmit">
                        <div class="flex flex-col mb-2">
                            <h1 class="text-dark text-lg font-myFont font-medium">Tipe Gaya Belajar</h1>
                            <input @input="submitDisabled = false" v-model="newNameAssessment" class="mb-1 w-1/2 outline-none appearance-none block bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-biru" type="text">
                        </div>
                        <div class="flex flex-col">
                            <h1 class="text-dark text-lg font-myFont font-medium">Penjelasan</h1>
                            <button @click="addAnswer" class="flex justify-center gap-1 items-center w-[160px] mb-1 px-2 py-1 bg-white border border-biru text-biru rounded-md hover:bg-biru hover:text-white">
                                <PhPlus/> Tambah Form
                            </button>

                            <div v-for="(desc, index) in newAnswer" :key="index" class="flex justify-start items-center gap-2">
                                <textarea @input="submitDisabled = false" v-model="newAnswer[index]" :rows="desc.length >= 200 ? 2 : 1" class="mb-1 appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-biru" type="text"></textarea>
                                <button @click="removeAnswer(index)" class="p-2 text-danger bg-white rounded-md border border-danger hover:text-white hover:bg-danger">
                                    <PhTrash/>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <hr class="pt-4">
                <!-- Modal footer -->
                <div class="px-4 py-2 flex justify-between items-center space-x-4">
                    <button class="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition" @click="toggleModal">Tutup</button>
                    <button :disabled="submitDisabled" 
                    :class="{'bg-gray-600 opacity-80 cursor-not-allowed': submitDisabled == true}"
                    class="bg-biru text-white px-4 py-2 rounded-md hover:bg-opacity-75 hover:shadow-md transition" @click="modalConfirmSubmit(detailGayaBelajar.id)">
                        Submit
                    </button>
                </div>
            </div>

            <div class="block lg:hidden relative w-full top-1 mx-auto shadow-xl rounded-md bg-white">
                <!-- Modal body -->
                <h1 class="font-myFont text-dark text-lg mx-4 pt-4">Detail Reservasi</h1>
                <hr class="mt-4">
                <div class="max-h-[460px] overflow-y-scroll flex flex-col justify-center items-center">
                    <div v-if="detailGayaBelajar" class="w-full p-4">
                        <div class="flex flex-row gap-2">
                            <div class="w-full">
                                <h1 class="text-dark text-lg font-myFont font-medium mt-20 mb-2">Jadwal</h1>
                                <div class="flex flex-row items-center mb-4">
                                    <div class="w-3/5">
                                        <div class="flex flex-col items-start">
                                            <h1 class="font-myFont font-medium text-dark text-sm">
                                                Tipe Gaya Belajar
                                            </h1>
                                            <p class="font-myFont font-medium text-dark text-xs">
                                                Visual dan Auditori
                                            </p>
                                        </div>
                                    </div>
                                    <div class="w-2/5">
                                        <div class="flex flex-col items-start">
                                            <h1 class="font-myFont font-medium text-dark text-sm">
                                                Tanggal
                                            </h1>
                                            <p class="font-myFont font-medium text-dark text-xs">
                                                {{  }}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <hr class="my-4">

                                <h1 class="text-dark text-lg font-myFont font-medium mb-2">Consultant</h1>
                                <div class="flex flex-row items-center mb-4">
                                    <div class="w-3/5">
                                        <div class="flex flex-col items-start">
                                            <h1 class="font-myFont font-medium text-dark text-sm">
                                                Nama
                                            </h1>
                                            <p class="font-myFont font-medium text-dark text-xs">
                                                {{  }}
                                            </p>
                                        </div>
                                    </div>
                                    <div class="w-2/5">
                                        <div class="flex flex-col items-start">
                                            <h1 class="font-myFont font-medium text-dark text-sm">
                                                Jenis Kelamin
                                            </h1>
                                            <p class="font-myFont font-medium text-dark text-xs">
                                                {{  }}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div class="flex flex-row items-center gap-2 mb-4">
                                    <div class="w-full">
                                        <div class="flex flex-col items-start">
                                            <h1 class="font-myFont font-medium text-dark text-sm">
                                                No Telp
                                            </h1>
                                            <p class="font-myFont font-medium text-dark text-xs">
                                                {{  }}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div class="flex flex-row items-center gap-2 mb-4">
                                    <div class="w-full">
                                        <div class="flex flex-col items-start">
                                            <h1 class="font-myFont font-medium text-dark text-sm">
                                                Alamat
                                            </h1>
                                            <p class="font-myFont font-medium text-dark text-xs">
                                                {{  }}
                                            </p>
                                            <!-- <p class="font-myFont font-medium text-dark text-xs">
                                                {{  }}
                                            </p> -->
                                        </div>
                                    </div>
                                </div>

                                <hr class="my-4">

                                <h1 class="text-dark text-lg font-myFont font-medium mb-2">Customer</h1>
                                <div class="flex flex-row items-center mb-4">
                                    <div class="w-3/5">
                                        <div class="flex flex-col items-start">
                                            <h1 class="font-myFont font-medium text-dark text-sm">
                                                Nama
                                            </h1>
                                            <p class="font-myFont font-medium text-dark text-xs">
                                                {{  }}
                                            </p>
                                        </div>
                                    </div>
                                    <div class="w-2/5">
                                        <div class="flex flex-col items-start">
                                            <h1 class="font-myFont font-medium text-dark text-sm">
                                                Jenis Kelamin
                                            </h1>
                                            <p class="font-myFont font-medium text-dark text-xs">
                                                {{ }}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div class="flex flex-row items-center gap-2 mb-4">
                                    <div class="w-full">
                                        <div class="flex flex-col items-start">
                                            <h1 class="font-myFont font-medium text-dark text-sm">
                                                No Telp
                                            </h1>
                                            <p class="font-myFont font-medium text-dark text-xs">
                                                {{  }}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div class="flex flex-row items-center gap-2 mb-4">
                                    <div class="w-full">
                                        <div class="flex flex-col items-start">
                                            <h1 class="font-myFont font-medium text-dark text-sm">
                                                Alamat
                                            </h1>
                                            <p class="font-myFont font-medium text-dark text-xs">
                                                {{  }}
                                            </p>
                                            <!-- <p class="font-myFont font-medium text-dark text-xs">
                                                {{  }}
                                            </p> -->
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <hr class="pt-4">
                <!-- Modal footer -->
                <div class="px-4 py-2 flex justify-end items-center space-x-4">
                    <button class="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition" @click="toggleModal">Tutup</button>
                </div>
            </div>
        </div>

        <div class="flex flex-col lg:flex-row justify-center mx-4 mb-4 pt-4 pb-10 gap-4">
            <div class="w-full px-7 mx-auto">
                <div class="flex flex-col bg-white w-full p-6 rounded-lg shadow-lg">
                    <h1 class="font-myFont text-dark text-lg mb-4">List Jawaban Assessment</h1>
                    <div class="flex flex-col md:flex-row md:items-center md:justify-between lg:flex-row lg:items-center lg:justify-between">
                        <span class="font-myFont text-xs md:text-sm lg:text-sm text-start lg:text-center text-dark">
                            {{ totalDari }} sampai {{ totalKe }} dari {{ totalData }} data.
                        </span>
                        <input type="text" name="cari" class=" mb-2 font-myFont rounded-md border border-gray-300 py-2 px-3" placeholder="Cari Data">
                    </div>

                    <div class="flex justify-center w-full" v-if="loading" >
                        <span class="mx-auto animate-[spin_2s_linear_infinite] border-8 border-[#f1f2f3] border-l-biru border-r-biru rounded-full w-14 h-14"></span>
                    </div>

                    <div v-else-if="dataAssessment.length > 0 && !loading" class="overflow-x-auto">
                        <table class="w-full text-sm text-left text-gray-500">
                            <thead class="text-xs text-gray-700 uppercase bg-gray-50">
                            <tr>
                                <th scope="col" class="py-3 px-6">No</th>
                                <th scope="col" class="py-3 px-6">Gaya Belajar</th>
                                <th scope="col" class="py-3 px-6">Jawaban Terbanyak</th>
                                <th scope="col" class="py-3 px-6">Detail</th>
                            </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(data, index) in dataAssessment" :key="index" class="bg-white border-b">
                                    <td class="py-4 px-6">
                                        {{ index + 1 }}
                                    </td>
                                    <td class="py-4 px-6">{{ data.name }}</td>
                                    <td class="py-4 px-6">A</td>
                                    <td class="py-4 px-6">
                                        <button @click="clickDetail(data.id)" class="flex items-center gap-1 px-4 py-2 bg-biru font-myFont text-sm text-white rounded-lg hover:bg-opacity-75 hover:shadow-lg">
                                            <PhEye :size="22"/>
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <span v-else-if="dataAssessment.length == 0 && !loading" class="font-myFont text-center text-dark text-lg">Data kosong</span>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import { PhEye, PhTrash, PhPlus } from '@phosphor-icons/vue'
import { onMounted, ref, watch } from 'vue';
import initAPI from '../../../../api/api'
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';

export default {
    name: 'PengaturanJawabanAssessment',
    components: {PhEye, PhTrash, PhPlus},
    setup(){
        const loading = ref(false)
        const loadingSubmit = ref(false)

        const totalDari = ref(false)
        const totalKe = ref(false)
        const totalData = ref(false)

        const isModalOpen = ref(false)
        const detailGayaBelajar = ref([])
        const descriptionBelajar = ref('')

        const dataAssessment = ref([])

        const newNameAssessment = ref('')
        const newAnswer = ref([]);

        const submitDisabled = ref(true)

        watch(() => descriptionBelajar.value, (newVal) => {
            // Mengupdate newAnswer dengan data baru
            newAnswer.value = newVal.description.slice();
        });

        const modalConfirmSubmit = (assessmentId) => {
            Swal.fire({
                icon: 'question',
                title: 'Ubah Data Ini?',
                text: 'Klik tombol Ya untuk merubah data.',
                showConfirmButton: true,
                showCancelButton: true,
                confirmButtonColor: "#0b40f4",
                confirmButtonText: "Ya, ubah",
                cancelButtonColor: "#3b3f5c",
                cancelButtonText: "Batal",
            }).then((result) => {
                if (result.isConfirmed) {
                    submitEdit(assessmentId)
                }
            })
        }

        const submitEdit = async(assessmentId) => {
            loadingSubmit.value = !loadingSubmit.value
            try {
                console.log(assessmentId)
                console.log(newAnswer.value)
                const data = {
                    name: newNameAssessment.value,
                    description: newAnswer.value
                }
                const token = JSON.parse(localStorage.getItem('token'))
                const response = await initAPI('put', `assessments/${assessmentId}`, data, token)
                console.log(response.data)
                Swal.fire({
                    icon: 'success',
                    title: 'Berhasil',
                    text: 'Data Assessment berhasil diubah.',
                    showConfirmButton: true,
                    confirmButtonColor: "#0b40f4",
                    confirmButtonText: "Tutup",
                }).then((result) => {
                    if (result.isConfirmed) {
                        isModalOpen.value = false
                        if(submitDisabled.value == false) submitDisabled.value = true
                        getAllData()
                    }
                })
            } catch (error) {
                console.log(error)
                Swal.fire({
                    icon: 'error',
                    title: 'Terjadi Error',
                    text: 'Ada error saat merubah data Hasil Assessment.',
                    showConfirmButton: true,
                    confirmButtonColor: "#0b40f4",
                    confirmButtonText: "Tutup",
                });
            }
            isModalOpen.value = false
            loadingSubmit.value = !loadingSubmit.value
            // console.log(`id: ${assessmentId} data yg dikirim ${newAnswer.value}`)
        }

        const addAnswer = () => {
            newAnswer.value.push('')
        }

        const removeAnswer = (index) => {
            Swal.fire({
                icon: 'question',
                title: 'Hapus Penjelasan Ini?',
                text: 'Penjelasan akan di hapus dan tidak dapat di kembalikan',
                showConfirmButton: true,
                showCancelButton: true,
                confirmButtonColor: "#0b40f4",
                confirmButtonText: "Ya, hapus",
                cancelButtonColor: "#3b3f5c",
                cancelButtonText: "Batal",
            }).then((result) => {
                if (result.isConfirmed) {
                    newAnswer.value.splice(index, 1)
                }
            })
        };

        const clickDetail = (id) => {
            toggleModal()
            const unik = dataAssessment.value.find(item => item.id === id);
            console.log(`unik`,unik)
            detailGayaBelajar.value = unik
            newNameAssessment.value = unik.name
            // descriptionBelajar.value = unik.description.join('\n\n')
            // descriptionBelajar.value = unik.description
            const arrayVal = unik.description
            descriptionBelajar.value = { description: arrayVal}
            console.log('aheuheu', descriptionBelajar)
            // Memasukkan data awal dari descriptionBelajar.description ke dalam newAnswer
            newAnswer.value = descriptionBelajar.value.description.slice();
        }

        const toggleModal = () => {
            isModalOpen.value = !isModalOpen.value
            if(submitDisabled.value == false) submitDisabled.value = true
        }

        const getAllData = async() => {
            loading.value = !loading.value
            try {
                const token = JSON.parse(localStorage.getItem('token'))
                const response = await initAPI('get', 'assessments', null, token)
                console.log(response.data)
                totalDari.value = response.data.from 
                totalKe.value = response.data.to
                totalData.value = response.data.total
                dataAssessment.value = response.data.data
            } catch (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Terjadi Error',
                    text: 'Ada error saat mengambil data Hasil Assessment',
                    showConfirmButton: true,
                    confirmButtonColor: "#0b40f4",
                    confirmButtonText: "Tutup",
                });
            }
            loading.value = !loading.value
        }

        onMounted(() => {
            getAllData()
        })

        return {
            loading,
            loadingSubmit,
            totalDari,
            totalKe,
            totalData,
            isModalOpen,
            detailGayaBelajar,
            descriptionBelajar,
            dataAssessment,
            newNameAssessment,
            newAnswer,
            submitDisabled,
            toggleModal,
            clickDetail,
            addAnswer,
            removeAnswer,
            modalConfirmSubmit,
            submitEdit
        }
    }
}
</script>