<template>
    <div v-if="loading" class="preloader-overlay">
        <span class="flex justify-center animate-[spin_2s_linear_infinite] border-8 border-[#f1f2f3] border-l-biru border-r-biru rounded-full w-14 h-14 m-auto"></span>
    </div>

    <Layout v-if="!loading">
        <!-- Breadcrumb -->
        <div class="mx-0 lg:mx-[40px] mb-3 h-5 p-7 justify-center items-center gap-2 inline-flex">
            <div class="text-[#3030f8] text-sm font-normal font-roboto leading-tight">Beranda</div>
            <div class="w-4 h-4 relative opacity-75">
                <img src="@/assets/img/chevron_forward.svg">
            </div>
            <div class="text-[#3030f8] text-sm font-normal font-roboto leading-tight">Reservasi</div>
            <div class="w-4 h-4 relative opacity-75">
                <img src="@/assets/img/chevron_forward.svg">
            </div>
            <div class="opacity-75 text-black text-sm font-normal font-roboto leading-tight">Reservasi</div>
        </div>

        <section class="bg-white py-[52px]">
            <div class="mx-[30px] md:mx-[120px] flex justify-center">
                <div class="w-full flex flex-col">
                    <div class="flex justify-between items-start mb-[56px]">
                        <div class="w-[55%] flex flex-col items-start gap-[16px]">
                            <div class="h-8 px-4 py-1 bg-[#d6d6fe] rounded-[99px] justify-center items-center gap-2.5 inline-flex">
                                <div class="text-[#3030f8] text-base font-medium font-['Roboto'] leading-normal">Sesi Konsultasi</div>
                            </div>

                            <h1 class="text-[#0b0b79] text-3xl font-semibold font-['Sora'] leading-9">Konsultasi pribadi dengan psikolog</h1>

                            <span class="text-[#667084] text-base font-normal font-['Roboto'] leading-normal">Konsultasi pribadi bersama ahli psikologi untuk eksplorasi lebih dalam tentang diri, potensi, dan jalan terbaik dalam pengembangan pribadi.</span>
                        </div>

                        <div class="flex flex-col gap-[16px]">
                            <img src="@/assets/icons/reservasi/header_icon.svg" alt="icon">
                        </div>
                    </div>

                    <div class="flex flex-col">
                        <div class="mb-[56px] h-12 px-9 py-4 bg-[#5959f9] rounded-xl justify-center items-center gap-2.5 inline-flex">
                            <div class="grow shrink basis-0 text-center text-white text-xl font-medium font-['Roboto'] leading-loose">Pilih Ahli yang Tersedia</div>
                        </div>

                        <div class="flex flex-col gap-[36px]">
                            <div v-for="(consultant, index) in consultants" :key="consultant.id" class="p-6 bg-white rounded-2xl shadow justify-center items-start gap-5 inline-flex">
                                <img class="w-40 h-40 rounded-lg" :src="baseUrl+'open/consultants/'+consultant.image" />
                                <!-- <img class="w-40 h-40 rounded-lg" src="https://via.placeholder.com/160x160" /> -->
                                <div class="grow shrink basis-0 self-stretch flex-col justify-between items-end inline-flex">
                                    <div class="self-stretch h-[76px] flex-col justify-start items-start gap-4 flex">
                                        <div class="justify-start items-start gap-3 inline-flex">
                                            <div class="px-2 py-1 bg-[#feefc6] rounded-3xl justify-center items-center gap-2.5 flex">
                                                <div class="text-center text-[#f78f08] text-sm font-medium font-['Roboto'] leading-tight">Kepala Psikologi Jatidiri</div>
                                            </div>
                                            <div :class="{'bg-[#fee3e1]': consultant.status !== 'Active', 'bg-[#d0fadf]': consultant.status == 'Active'}" class="px-2 py-1 rounded-3xl justify-center items-center gap-2.5 flex">
                                                <div :class="{'text-[#f04437]': consultant.status !== 'Active', 'text-[#12b669]': consultant.status == 'Active'}" class="text-center text-sm font-medium font-['Roboto'] leading-tight">
                                                    {{ consultant.status == 'Active' ? 'Tersedia' : 'Tidak Tersedia' }}
                                                </div>
                                            </div>
                                        </div>
                                        <div class="self-stretch text-[#5a5a5a] text-2xl font-medium font-['Roboto'] leading-loose">
                                            {{ consultant.name }}
                                        </div>
                                    </div>
                                    <button @click="goTo('user.views.reservasi_consultant', consultant.id)" class="h-11 px-6 py-1.5 bg-[#3030f8] rounded-full justify-center items-center gap-3 inline-flex">
                                        <div class="text-white text-base font-normal font-['Roboto'] leading-normal">Lihat Selengkapnya</div>
                                    </button>
                                </div>
                            </div>
                            <!-- <div class="p-6 bg-white rounded-2xl shadow justify-center items-start gap-5 inline-flex">
                                <img class="w-40 h-40 rounded-lg" src="https://via.placeholder.com/160x160" />
                                <div class="grow shrink basis-0 self-stretch flex-col justify-between items-end inline-flex">
                                    <div class="self-stretch h-[76px] flex-col justify-start items-start gap-4 flex">
                                        <div class="justify-start items-start gap-3 inline-flex">
                                            <div class="px-2 py-1 bg-[#feefc6] rounded-3xl justify-center items-center gap-2.5 flex">
                                                <div class="text-center text-[#f78f08] text-sm font-medium font-['Roboto'] leading-tight">Kepala Psikologi Jatidiri</div>
                                            </div>
                                            <div class="px-2 py-1 bg-[#fee3e1] rounded-3xl justify-center items-center gap-2.5 flex">
                                                <div class="text-center text-[#f04437] text-sm font-medium font-['Roboto'] leading-tight">Tidak Tersedia</div>
                                            </div>
                                        </div>
                                        <div class="self-stretch text-[#5a5a5a] text-2xl font-medium font-['Roboto'] leading-loose">Miryam A. Sigarlaki, M.Psi.Psikolog</div>
                                    </div>
                                    <div class="h-11 px-6 py-1.5 bg-[#3030f8] rounded-full justify-center items-center gap-3 inline-flex">
                                        <div class="text-white text-base font-normal font-['Roboto'] leading-normal">Lihat Selengkapnya</div>
                                    </div>
                                </div>
                            </div> -->

                            <!-- Pagination -->
                             <div class="mx-auto h-14 rounded justify-start items-center inline-flex">
                                <!-- Tombol Sebelumnya -->
                                <button 
                                @click="goFirstPage"
                                class="group px-6 py-3 rounded justify-center items-center gap-2.5 flex"
                                >
                                <div class="group-hover:text-[#3030f8] transition-all text-[#667084] text-lg font-normal font-['Roboto'] leading-7">
                                    First
                                </div>
                                </button>

                                <!-- Nomor Halaman -->
                                <div 
                                v-for="page in pageNumbers" 
                                :key="page" 
                                @click="goToPage(page)"
                                :class="['px-6 py-3 rounded justify-center items-center gap-2.5 flex', currentPage === page ? 'bg-[#3030f8] text-white font-medium' : 'text-[#667084] font-normal']"
                                >
                                <div class="text-xl font-['Roboto'] leading-loose">{{ page }}</div>
                                </div>

                                <!-- Tombol Selanjutnya -->
                                <button 
                                @click="goLastPage"
                                class="group px-6 py-3 rounded justify-center items-center gap-2.5 flex"
                                >
                                <div class="group-hover:text-[#3030f8] transition-all text-[#667084] text-lg font-normal font-['Roboto'] leading-7">
                                    Last
                                </div>
                                </button>
                            </div>
                            <!-- <div class="mx-auto h-14 rounded justify-start items-center inline-flex">
                                <button class="group px-6 py-3 rounded justify-center items-center gap-2.5 flex">
                                    <div class="group-hover:group-hover:text-[#3030f8] transition-all text-[#667084] text-lg font-normal font-['Roboto'] leading-7">Sebelumnya</div>
                                </button>
                                <div class="px-6 py-3 rounded justify-center items-center gap-2.5 flex">
                                    <div class="text-[#667084] text-xl font-normal font-['Roboto'] leading-loose">1</div>
                                </div>
                                <div class="px-6 py-3 bg-[#3030f8] rounded shadow justify-center items-center gap-2.5 flex">
                                    <div class="text-white text-xl font-medium font-['Roboto'] leading-loose">2</div>
                                </div>
                                <div class="px-6 py-3 rounded justify-center items-center gap-2.5 flex">
                                    <div class="text-[#667084] text-xl font-normal font-['Roboto'] leading-loose">3</div>
                                </div>
                                <button class="group px-6 py-3 rounded justify-center items-center gap-2.5 flex">
                                    <div class="group-hover:text-[#3030f8] transition-all text-[#667084] text-lg font-normal font-['Roboto'] leading-7">Selanjutnya</div>
                                </button>
                            </div> -->
                        </div>
                    </div>
                </div>
            </div>
        </section>   
    </Layout>
</template>

<script setup>
import Layout from '@/Layout/Customer/Layout.vue';
import { onMounted, ref, computed } from 'vue';
import initAPI from '@/api/api'
import Cookies from 'js-cookie'
import { useRouter } from 'vue-router';

const baseUrl = import.meta.env.VITE_API_BASE_URL
const router = useRouter()

const loading = ref(false)

const consultants = ref('')

const currentPage = ref(1);
const lastPage = ref('');
const firstPageUrl = ref('')
const lastPageUrl = ref('')

const getConsultant = async(page = 1) => {
    try {
        const token = Cookies.get('token')
        const response = await initAPI('get', 'consultants?page='+page, null, token)
        console.log(`response`, response.data)
        consultants.value = response.data.data
        currentPage.value = response.data.current_page
        lastPage.value = response.data.last_page
        firstPageUrl.value = response.data.first_page_url
        lastPageUrl.value = response.data.last_page_url
    } catch (error) {
        console.log(`error`, error)
    }
}

onMounted(async() => {
    await getConsultant()
})

const pageNumbers = computed(() => {
  const startPage = Math.max(1, currentPage.value - 1);
  const endPage = Math.min(lastPage.value, startPage + 2);
  return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
});

const goToPage = (page) => {
  if (page !== currentPage.value) {
    getConsultant(page);
  }
}

const goLastPage = () => {
    if(lastPageUrl.value.split('?page=')[1] !== null){
        getConsultant(lastPageUrl.value.split('?page=')[1])
    }
}

const goFirstPage = () => {
    if(firstPageUrl.value.split('?page=')[1] !== null){
        getConsultant(firstPageUrl.value.split('?page=')[1])
    }
}

const goTo = (route, query) => {
    const based64Id = btoa(query)

    router.push({
      name: route,
      query: { consultant: based64Id }
    })
}
</script>