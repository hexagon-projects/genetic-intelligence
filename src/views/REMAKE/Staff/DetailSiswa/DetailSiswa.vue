<template>
    <div v-if="loading" class="preloader-overlay">
      <span
        class="flex justify-center animate-[spin_2s_linear_infinite] border-8 border-[#f1f2f3] border-l-biru border-r-biru rounded-full w-14 h-14 m-auto"
      ></span>
    </div>

    <Layout v-else>
        <section class="bg-white py-[32px]">
            <div class="mx-[30px] lg:mx-[60px]">
                <div class="flex items-start gap-[26px]">
                    <div class="sticky top-4 w-[20%] flex-col justify-start items-start gap-4 inline-flex">
                        <div class="text-[#0c141c] text-base font-medium font-['Roboto'] leading-normal">
                            Menu
                        </div>
    
                        <div class="flex flex-col w-full">
                            <div v-for="(item, index) in filteredSidebarItems" :key="index" 
                                :class="['cursor-pointer px-[12px] py-[8px] flex items-center gap-[12px]', { 'bg-[#f0f7fd] rounded-xl': selectedItemIndex === index || pageType == item.text }]"
                                @click="selectItem(index, item.text)">
                                <img :class="{'grayscale-0': selectedItemIndex === index || pageType == item.text, 'grayscale': selectedItemIndex !== index}" class="size-[24px]" :src="item.image" alt="icon">
                                <span :class="{'text-[#3030f8]': selectedItemIndex === index || pageType == item.text}" class="font-roboto font-medium text-[#0c141c] text-sm">{{ item.text }}</span>
                            </div>
                        </div>
                    </div>
    
                    <div class="w-full px-6 rounded-xl border border-[#cfd4dc] flex-col justify-start items-start flex">
                        <div class="mb-[32px] w-full px-4 py-8 flex justify-between items-center">
                            <div class="flex items-center gap-2">
                                <img class="w-14 h-14 rounded-full" src="@/assets/img/profile-mock.png" alt="profile"/>
                                <div class="text-[#0c141c] text-2xl font-semibold font-['Roboto'] leading-loose">
                                    {{ siswaDatas.name }}
                                </div>
                            </div>

                            <button @click="downloadFile(siswaDatas.customers_results.gim.result_file)" v-if="(pageType == 'Profile Pengguna' || pageType == 'Hasil Tes GIM') && siswaDatas.customers_results !== null" class="bg-[#fee3e1] font-roboto font-medium text-[#f04437] px-4 py-2 rounded-lg">
                                Download PDF
                            </button>
                        </div>
                        
                        <!-- Personal Information -->
                        <PersonalInfo v-if="pageType == 'Profile Pengguna' && siswaDatas" :siswaDatas="siswaDatas"/>

                        <!-- Hasil Tes GIM -->
                        <HasilGIM v-if="pageType == 'Hasil Tes Jatidiri Sejati' && siswaDatas" :siswaDatas="siswaDatas"/>
                        
                        <!-- Hasil Assessment -->
                        <HasilAssessment v-if="pageType == 'Hasil Tes Jatidiri Belajar' && siswaDatas" :siswaDatas="siswaDatas"/>
                    
                        <!-- Hasil IQ -->
                        <HasilIQ v-if="pageType == 'Hasil Tes Jatidiri Cerdas' && siswaDatas" :siswaDatas="siswaDatas"/>
                        
                        <!-- Hasil CPM -->
                        <HasilCPM v-if="pageType == 'Hasil Tes Jatidiri Bakat' && siswaDatas" :siswaDatas="siswaDatas"/>
                    </div>
                </div>
            </div>
        </section>
    </Layout>
</template>

<script setup>
import Layout from "@/Layout/Kepsek/Layout.vue";
import { PhX, PhMagnifyingGlass } from "@phosphor-icons/vue";
import initAPI from "@/api/api";
import Cookies from "js-cookie";
import { ref, onMounted, watch, computed, onBeforeMount } from "vue";
import Swal from "sweetalert2";
import PersonalInfo from "@/components/staffs/DetailSiswa/PersonalInfo.vue";
import HasilGIM from "@/components/staffs/DetailSiswa/HasilGIM.vue";
import HasilAssessment from "@/components/staffs/DetailSiswa/HasilAssessment.vue";
import HasilIQ from "@/components/staffs/DetailSiswa/HasilIQ.vue";
import HasilCPM from "@/components/staffs/DetailSiswa/HasilCPM.vue";
import { useRoute, useRouter } from "vue-router";

const sidebarItems = ref([
    {image: new URL('@/assets/icons/profile-siswa.svg', import.meta.url).href, text: 'Profile Pengguna'},
    {image: new URL('@/assets/icons/tes-gim.svg', import.meta.url).href, text: 'Hasil Tes Jatidiri Sejati'},
    {image: new URL('@/assets/icons/tes-assesment.svg', import.meta.url).href, text: 'Hasil Tes Jatidiri Belajar'},
    {image: new URL('@/assets/icons/tes-iq.svg', import.meta.url).href, text: 'Hasil Tes Jatidiri Cerdas'},
    {image: new URL('@/assets/icons/tes-cpm.svg', import.meta.url).href, text: 'Hasil Tes CPM'},
    {image: new URL('@/assets/icons/test-rmib.svg', import.meta.url).href, text: 'Hasil Tes Jatidiri Bakat'},
    {image: new URL('@/assets/icons/test-iaa.svg', import.meta.url).href, text: 'Hasil Tes Jatidiri Kendali'},
])

const filteredSidebarItems = computed(() => {
    const institutionType = JSON.parse(localStorage.getItem('userData')).staff.institutions.type;
    
    return sidebarItems.value.filter(item => {
        if (['SMP', 'SMK', 'SMA'].includes(institutionType)) {
            return item.text !== 'Hasil Tes CPM';
        } else if (['TK', 'SD'].includes(institutionType)) {
            return item.text !== 'Hasil Tes IQ';
        }
        return true; // Tampilkan semua item jika tidak termasuk kategori di atas
    });
});

const selectedItemIndex = ref(null);
const pageType = ref('Profile Pengguna')

const selectItem = (index, type) => {
    // console.log(`diplih`, index)
    selectedItemIndex.value = index;
    pageType.value = type
};

const route = useRoute()
const router = useRouter()

const siswaId = ref('')
const siswaDatas = ref('')

const isValidStudentId = (id) => {
    return !isNaN(id) && Number.isInteger(+id) && +id > 0;
}

const getDataSiswa = async() => {
    try {
        const token = Cookies.get("token");
        const response = await initAPI('get', `customers?id=${siswaId.value}`, null, token)

        // console.log(`response`, response.data)
        siswaDatas.value = response.data.data[0]
    } catch (error) {
        Swal.fire({
        icon: "error",
        title: "Error",
        text: "Terjadi error saat mengambil data siswa.",
        showConfirmButton: false,
        timer: 2000,
        });
    }
}

const baseUrl = import.meta.env.VITE_API_BASE_URL

const downloadFile = async (fileUrl) => {
    // console.log(`aisia`, fileUrl)
    const imageUrl = baseUrl + 'open/results/' + fileUrl
    // console.log(imageUrl)


    const response = await fetch(imageUrl)
    const blob = await response.blob()

    const url = window.URL.createObjectURL(blob)

    const link = document.createElement('a')
    link.href = url
    link.target = '_blank'
    link.download = fileUrl

    link.click()

    window.URL.revokeObjectURL(url)
}

onBeforeMount(() => {
    const encodedStudentId = route.query.student_id
    if (!encodedStudentId) {
        router.push({name: 'staff.views.list_siswa'})
        return;
    }

    try {
        const decodedId = atob(encodedStudentId); // Menggunakan Base64 decode

        // Validasi: Pastikan ID adalah angka
        if (!isValidStudentId(decodedId)) {
            router.push({name: 'staff.views.list_siswa'})
            return;
        }

        siswaId.value = decodedId

    } catch (error) {
        Swal.fire({
        icon: "error",
        title: "Error",
        text: "Terjadi error saat decoded data siswa.",
        showConfirmButton: false,
        timer: 2000,
        });

        router.push({name: 'staff.views.list_siswa'})
    }
})

onMounted(async () => {
  await getDataSiswa();

  // Set selected index berdasarkan pageType awal
  const index = filteredSidebarItems.value.findIndex(item => item.text === pageType.value);
  if (index !== -1) {
    selectedItemIndex.value = index;
  }
});
</script>