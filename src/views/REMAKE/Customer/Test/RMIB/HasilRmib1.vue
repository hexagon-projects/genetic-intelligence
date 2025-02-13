<template>
    <div v-if="loading" class="preloader-overlay">
        <span class="flex justify-center animate-[spin_2s_linear_infinite] border-8 border-[#f1f2f3] border-l-biru border-r-biru rounded-full w-14 h-14 m-auto"></span>
    </div>

    <div v-if="!loading">
        <Layout>
            <!-- Breadcrumb -->
            <div class="mx-0 lg:mx-[40px] mb-3 h-5 p-7 justify-center items-center gap-2 inline-flex">
                <div class="text-[#3030f8] text-sm font-normal font-roboto leading-tight">Beranda</div>
                <div class="w-4 h-4 relative opacity-75">
                    <img src="@/assets/img/chevron_forward.svg">
                </div>
                <div class="text-[#3030f8] text-sm font-normal font-roboto leading-tight">Hasil Tes</div>
                <div class="w-4 h-4 relative opacity-75">
                    <img src="@/assets/img/chevron_forward.svg">
                </div>
                <div class="opacity-75 text-black text-sm font-normal font-roboto leading-tight">Jatidiri Bakat</div>
            </div>

            <BelumTest v-if="!isTested" routeUrl="user.views.rmib" message="Tes Jatidiri (Jatidiri Bakat)!" 
            subMessage="Tes yang dirancang untuk mengidentifikasi minat kamu terhadap berbagai jenis pekerjaan dan profesi kerja sebagai panduan karier."/>
        
            <div v-if="isTested" >
                <section class="mx-0 lg:mx-[40px] bg-white pb-20">
                    <div class="flex flex-col md:flex-row p-6 bg-white rounded-lg">
                        <div class="flex-1 order-2 md:order-1">
                            <h1 class="text-2xl font-bold">Hasil Tes RMIB</h1>
                            <p class="mt-2 text-gray-600 text-justify">
                                Tes Rothwell-Miller Interest Blank (RMIB), merupakan test yang bertujuan untuk
                                mengidentifikasi minat kamu terhadap berbagai jenis pekerjaan. Berikut Hasil dari
                                test yang telah kamu lakukan:
                            </p>
                            <div class="mt-4">
                                <h2 class="font-semibold">Identitas</h2>
                                <p>Nama: {{ identitas.nama }}</p>
                                <p>Gender: {{ identitas.jenis_kelamin }}</p>
                                <p>Tanggal lahir: {{ identitas.tanggal_lahir }}</p>
                                <p>Tanggal tes: {{ identitas.tanggal_tes }}</p>
                                <p>Usia: {{ identitas.usia }}</p>
                                <p>Durasi Pengerjaan: {{ identitas.durasi_tes }}</p>
                            </div>
                            <div class="mt-4 mb-5">
                                <h2 class="font-semibold mb-2">Kata Kunci</h2>
                                <div class="flex space-x-2">
                                    <button v-if="hasil.rmib1" class="bg-[#3030f8] text-white px-3 py-2 rounded-lg">{{ hasil.rmib1.name }} ({{hasil.rmib1?.slug}})</button>
                                    <button v-if="hasil.rmib2" class="bg-[#3030f8] text-white px-4 py-2 rounded-lg">{{ hasil.rmib2.name }} ({{hasil.rmib2?.slug}})</button>
                                    <button v-if="hasil.rmib3" class="bg-[#3030f8] text-white px-4 py-2 rounded-lg">{{ hasil.rmib3.name }} ({{hasil.rmib3?.slug}})</button>
                                </div>
                            </div>
                        </div>
                        <div class="flex-1 flex justify-center items-center pb-7 order-1 md:order-2">
                            <img src="./img/19962851_6203998 2.svg" alt="Illustration" class="w-[300px] md:w-[360px]" /> 
                        </div>
                    </div>
                    <div class="flex flex-col md:flex-row px-[24px] pb-[20px] bg-white rounded-lg"> 
                        <h1 class="text-2xl font-bold mx-0 lg:mx">Detail Hasil Test</h1> 
                    </div>
                    <div class="flex flex-wrap w-full lg:w-[107%] mx-0 gap-6 px-6"> 
                        <div class="px-5 py-4 bg-white rounded-2xl border border-[#667084] mb-5 w-full lg:w-[30%]">
                            <div class="flex items-center mb-3">
                                <div class="w-12 h-12 flex justify-center items-center mr-3">
                                    <img src="./img/Grade(1).svg" alt="Outdoor Icon" class="w-10 h-10" />
                                </div>
                                <h2 class="text-[#3030f8] text-xl font-medium font-roboto font-bold">{{ hasil.rmib1?.name }} ({{hasil.rmib1?.slug}})</h2>
                            </div>
                            <hr class="border-t border-[#667084] mb-3"> 
                            <div class="flex items-start mb-3">
                                <div class="w-6 h-6 flex justify-center items-center mr-3">
                                    <img src="./img/ReadCvLogo.svg" alt="Interpretation Icon" class="w-6 h-6" />
                                </div>
                                <div class="text-[#3030f8] text-sm font-medium">
                                    <strong>Interpretasi</strong>
                                </div>
                            </div>
                            <p class="text-[#667084] text-sm mb-3 text-justify">{{ hasil.rmib1?.desc }}</p>
                            
                            <div class="flex items-start mb-3">
                                <div class="w-6 h-6 flex justify-center items-center mr-3">
                                    <img src="./img/IdentificationBadge.svg" alt="Job Recommendation Icon" class="w-6 h-6" />
                                </div>
                                <div class="text-[#3030f8] text-sm font-medium">
                                    <strong>Contoh Pekerjaan</strong>
                                </div>
                            </div>
                            <p class="text-[#667084] text-sm mb-3 text-justify">{{ hasil.rmib1?.job_recommendation }}</p>
                        
                            <div class="flex items-start mb-3">
                                <div class="w-6 h-6 flex justify-center items-center mr-3">
                                    <img src="./img/Mailbox.svg" alt="Advice Icon" class="w-6 h-6" />
                                </div>
                                <div class="text-[#3030f8] text-sm font-medium">
                                    <strong>Saran</strong>
                                </div>
                            </div>
                            <p class="text-[#667084] text-sm text-justify">{{ hasil.rmib1?.advice }}</p>
                        </div>
                        
                        <div class="px-5 py-4 bg-white rounded-2xl border border-[#667084] mb-5 w-full lg:w-[30%]">
                                <div class="flex items-center mb-3">
                                    <div class="w-12 h-12 flex justify-center items-center mr-3">
                                        <img src="./img/Grade (2).svg" alt="Outdoor Icon" class="w-10 h-10" />
                                    </div>
                                    <h2 class="text-[#3030f8] text-xl font-medium font-roboto font-bold">{{ hasil.rmib2?.name }} ({{hasil.rmib2?.slug}})</h2>
                                </div>
                                <hr class="border-t border-[#667084] mb-3"> 
                                <div class="flex items-start mb-3">
                                    <div class="w-6 h-6 flex justify-center items-center mr-3">
                                        <img src="./img/ReadCvLogo.svg" alt="Interpretation Icon" class="w-6 h-6" />
                                    </div>
                                    <div class="text-[#3030f8] text-sm font-medium">
                                        <strong>Interpretasi</strong>
                                    </div>
                                </div>
                                <p class="text-[#667084] text-sm mb-3 text-justify">{{ hasil.rmib2?.desc }}</p>
                                
                                <div class="flex items-start mb-3">
                                    <div class="w-6 h-6 flex justify-center items-center mr-3">
                                        <img src="./img/IdentificationBadge.svg" alt="Job Recommendation Icon" class="w-6 h-6" />
                                    </div>
                                    <div class="text-[#3030f8] text-sm font-medium">
                                        <strong>Contoh Pekerjaan</strong>
                                    </div>
                                </div>
                                <p class="text-[#667084] text-sm mb-3 text-justify">{{ hasil.rmib2?.job_recommendation }}</p>
                            
                            <div class="flex items-start mb-3">
                                <div class="w-6 h-6 flex justify-center items-center mr-3">
                                    <img src="./img/Mailbox.svg" alt="Advice Icon" class="w-6 h-6" />
                                </div>
                                <div class="text-[#3030f8] text-sm font-medium">
                                    <strong>Saran</strong>
                                </div>
                            </div>
                            <p class="text-[#667084] text-sm text-justify">{{ hasil.rmib2?.advice }}</p>
                        </div>
    
                        <div class="px-5 py-4 bg-white rounded-2xl border border-[#667084] mb-5 w-full lg:w-[30%]">
                                <div class="flex items-center mb-3">
                                    <div class="w-12 h-12 flex justify-center items-center mr-3">
                                        <img src="./img/Grade (3).svg" alt="Outdoor Icon" class="w-10 h-10" />
                                    </div>
                                    <h2 class="text-[#3030f8] text-xl font-medium font-roboto font-bold">{{ hasil.rmib3?.name }} ({{hasil.rmib3?.slug}})</h2>
                                </div>
                                <hr class="border-t border-[#667084] mb-3"> 
                                <div class="flex items-start mb-3">
                                    <div class="w-6 h-6 flex justify-center items-center mr-3">
                                        <img src="./img/ReadCvLogo.svg" alt="Interpretation Icon" class="w-6 h-6" />
                                    </div>
                                    <div class="text-[#3030f8] text-sm font-medium">
                                        <strong>Interpretasi</strong>
                                    </div>
                                </div>
                                <p class="text-[#667084] text-sm mb-3 text-justify">{{ hasil.rmib3?.desc}}</p>
                                
                                <div class="flex items-start mb-3">
                                    <div class="w-6 h-6 flex justify-center items-center mr-3">
                                        <img src="./img/IdentificationBadge.svg" alt="Job Recommendation Icon" class="w-6 h-6" />
                                    </div>
                                    <div class="text-[#3030f8] text-sm font-medium">
                                        <strong>Contoh Pekerjaan</strong>
                                    </div>
                                </div>
                                <p class="text-[#667084] text-sm mb-3 text-justify">{{ hasil.rmib3?.job_recommendation}}</p>
                            
                            <div class="flex items-start mb-3">
                                <div class="w-6 h-6 flex justify-center items-center mr-3">
                                    <img src="./img/Mailbox.svg" alt="Advice Icon" class="w-6 h-6" />
                                </div>
                                <div class="text-[#3030f8] text-sm font-medium">
                                    <strong>Saran</strong>
                                </div>
                            </div>
                            <p class="text-[#667084] text-sm text-justify">{{ hasil.rmib3?.advice}}</p>
                        </div>
                    </div>
                </section>
            </div>
        </Layout>
    </div>
</template>

<script setup>
import Layout from '@/Layout/Customer/Layout.vue';
import BelumTest from '@/components/REMAKE/HasilTest/BelumTest/BelumTest.vue';
import { onMounted, ref } from 'vue'
import initAPI from '@/api/api';
import Cookies from "js-cookie"
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';

const loading = ref(true);
const isTested = ref(true)
const identitas = ref({
    nama: '',
    jenis_kelamin: '',
    tanggal_lahir: '',
    tanggal_tes: '',
    usia: '',
    durasi_tes: ''
});
const hasil = ref({
    rmib1: {},
    rmib2: {},
    rmib3: {}
});

const getUserData = async () => {
    try {
        const token = Cookies.get('token');
        const formData = new FormData();
        formData.append('refresh_user', 'true');

        const userData = await initAPI('post', 'login', formData, token);
        console.log(`data user`, userData.data)

        if(userData.data.customer.customers_rmib == null){
            isTested.value = false
        }else{
            identitas.value.nama = userData.data.customer.name;
            identitas.value.jenis_kelamin = userData.data.customer.gender;
            identitas.value.tanggal_lahir = userData.data.customer.birth_date;
            
            // Format tanggal tes ke DD-MM-YYYY
            const rawTanggalTes = userData.data.customer.customers_rmib.created_at.split('T')[0];
            const [year, month, day] = rawTanggalTes.split('-');
            identitas.value.tanggal_tes = `${day}-${month}-${year}`;
            identitas.value.usia = userData.data.customer.customers_rmib.age;
            identitas.value.durasi_tes = userData.data.customer.customers_rmib.time;
    
            // Get Hasil Test
            if (userData && userData.data.customer.customers_rmib) {
                hasil.value.rmib1 = {
                    slug: userData.data.customer.customers_rmib.rmib1.slug,
                    name: userData.data.customer.customers_rmib.rmib1.name,
                    desc: userData.data.customer.customers_rmib.rmib1.desc,
                    job_recommendation: userData.data.customer.customers_rmib.rmib1.job_recommendation,
                    advice: userData.data.customer.customers_rmib.rmib1.advice,
                };
                hasil.value.rmib2 = {
                    slug: userData.data.customer.customers_rmib.rmib2.slug,
                    name: userData.data.customer.customers_rmib.rmib2.name,
                    desc: userData.data.customer.customers_rmib.rmib2.desc,
                    job_recommendation: userData.data.customer.customers_rmib.rmib2.job_recommendation,
                    advice: userData.data.customer.customers_rmib.rmib2.advice,
                };
                hasil.value.rmib3 = {
                    slug: userData.data.customer.customers_rmib.rmib3.slug,
                    name: userData.data.customer.customers_rmib.rmib3.name,
                    desc: userData.data.customer.customers_rmib.rmib3.desc,
                    job_recommendation: userData.data.customer.customers_rmib.rmib3.job_recommendation,
                    advice: userData.data.customer.customers_rmib.rmib3.advice,
                };
            }
        }
    } catch (error) {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Terjadi error saat mengambil data user RMIB',
            confirmButtonColor: "#3030f8",
            showconfirmButton: false,
            timer: 2000
        });
    } finally {
        loading.value = false;
    }
};

onMounted(async() => {
    try {
        await getUserData();
    } catch (error) {
        console.error('Error saat onMounted:', error);
    }
});
</script>

<style scoped>
.preloader-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 100%;
    background: rgba(255, 255, 255, 1);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
    transition: opacity 0.5s ease, height 0.5s ease;
}
.preloader-overlay.hidden {
    opacity: 0;
    height: 0;
    overflow: hidden;
}
</style>
