<template>
<div v-if="loading" class="preloader-overlay">
    <span class="flex justify-center animate-[spin_2s_linear_infinite] border-8 border-[#f1f2f3] border-l-biru border-r-biru rounded-full w-14 h-14 m-auto"></span>
</div>

<Layout v-if="!loading">
    <section class="bg-[#F6F6F9] py-[66px] px-[60px]">
        <div class="flex flex-col gap-[36px]">
            <!-- Welcome -->
             <div class="flex flex-col gap-3">
                <h1 class="text-[#0c141c] text-4xl font-semibold font-['Roboto'] leading-10">Welcome, Ms. Smith</h1>
                <span class="self-stretch text-[#4c7099] text-sm font-normal font-['Roboto'] leading-tight">Here's a summary of student testing activity</span>
             </div>

             <!-- Card -->
            <div class="grid grid-cols-4 gap-[16px]">
                <div class="h-28 p-6 bg-white rounded-xl border-l-4 border-[#5959f9] flex-col justify-start items-start gap-4 inline-flex">
                    <div class="self-stretch justify-start items-center gap-4 inline-flex">
                        <div class="w-[45px] h-[45px] relative"></div>
                        <div class="grow shrink basis-0 flex-col justify-start items-start gap-2 inline-flex">
                            <div class="self-stretch h-6 flex-col justify-start items-start flex">
                                <div class="self-stretch text-[#344053] text-base font-medium font-sora leading-normal">Total Siswa</div>
                            </div>
                            <div class="self-stretch h-8 flex-col justify-start items-start flex">
                                <div class="self-stretch text-[#344053] text-2xl font-bold font-['Roboto'] leading-loose">3,100 Siswa</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="h-28 p-6 bg-white rounded-xl border-l-4 border-[#31d583] justify-start items-center gap-4 inline-flex">
                    <div class="w-[45px] h-[45px] relative"></div>
                    <div class="w-[189px] self-stretch flex-col justify-start items-start gap-2 inline-flex">
                        <div class="self-stretch h-6 flex-col justify-start items-start flex">
                            <div class="self-stretch text-[#344053] text-base font-medium font-sora leading-normal">Total tes GIM</div>
                        </div>
                        <div class="self-stretch h-8 flex-col justify-start items-start flex">
                            <div class="self-stretch text-[#344053] text-2xl font-bold font-['Roboto'] leading-loose">2,300 Siswa</div>
                        </div>
                    </div>
                </div>

                <div class="h-28 p-6 bg-white rounded-xl border-l-4 border-[#fcb022] justify-start items-center gap-4 inline-flex">
                    <div class="w-[45px] h-[45px] relative"></div>
                    <div class="grow shrink basis-0 flex-col justify-start items-start gap-2 inline-flex">
                        <div class="self-stretch h-6 flex-col justify-start items-start flex">
                            <div class="self-stretch text-[#344053] text-base font-medium font-sora leading-normal">Total tes Assessment</div>
                        </div>
                        <div class="self-stretch h-8 flex-col justify-start items-start flex">
                            <div class="self-stretch text-[#344053] text-2xl font-bold font-['Roboto'] leading-loose">1,300 Siswa</div>
                        </div>
                    </div>
                </div>

                <div class="h-28 p-6 bg-white rounded-xl border-l-4 border-[#53b0fd] justify-start items-center gap-4 inline-flex">
                    <div class="w-[45px] h-[45px] relative"></div>
                    <div class="grow shrink basis-0 flex-col justify-start items-start gap-2 inline-flex">
                        <div class="self-stretch h-6 flex-col justify-start items-start flex">
                            <div class="self-stretch text-[#344053] text-base font-medium font-sora leading-normal">Total tes IQ</div>
                        </div>
                        <div class="self-stretch h-8 flex-col justify-start items-start flex">
                            <div class="self-stretch text-[#344053] text-2xl font-bold font-['Roboto'] leading-loose">1,000 Siswa</div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Bar Chart -->
             <div class="bg-white p-4 flex flex-col rounded-xl">
                <div class="text-[#0c141c] text-lg font-medium font-['Roboto'] leading-loose">Statistik Sistem Operasi Kecerdasan Dominan</div>

                <div class="py-4 h-[340px]">
                    <Bar :data="data" :options="options" />
                </div>
             </div>

             <!-- Dougnut & Pie Chart -->
             <div class="grid grid-cols-2 gap-[36px]">
                <div class="bg-white p-4 flex flex-col rounded-xl">
                    <div class="text-[#0c141c] text-lg font-medium font-['Roboto'] leading-loose">Statistik Diagnostic Assessment</div>

                    <div class="py-4 flex items-center gap-2">
                        <div class="size-[200px]">
                            <Doughnut :data="dataSkorIQ" :options="optionsSkorIQ" />
                        </div>

                        <div class="w-full mx-[30px] flex flex-col gap-[16px]">
                            <div v-for="(item, index) in arrListIQ" :key="index" class="flex justify-between items-center">
                                <div class="flex items-center gap-2">
                                    <div :class="item.color" class="size-[20px]"></div>
                                    <span class="text-[#667084] text-base font-normal font-['Roboto'] leading-normal">
                                        {{ item.kategori }}
                                    </span>
                                </div>

                                <span class="text-[#667084] text-base font-medium font-['Roboto'] leading-normal">
                                    {{ item.persentase }}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="bg-white p-4 flex flex-col rounded-xl">
                    <div class="text-[#0c141c] text-lg font-medium font-['Roboto'] leading-loose">Statistik Skor IQ</div>

                    <div class="py-4 flex items-center gap-2">
                        <div class="size-[200px]">
                            <Pie :data="dataSkorIQ" :options="optionsSkorIQ" />
                        </div>

                        <div class="w-full mx-[30px] flex flex-col gap-[16px]">
                            <div v-for="(item, index) in arrListIQ" :key="index" class="flex justify-between items-center">
                                <div class="flex items-center gap-2">
                                    <div :class="item.color" class="size-[20px] rounded-[50%]"></div>
                                    <span class="text-[#667084] text-base font-normal font-['Roboto'] leading-normal">
                                        {{ item.kategori }}
                                    </span>
                                </div>

                                <span class="text-[#667084] text-base font-medium font-['Roboto'] leading-normal">
                                    {{ item.persentase }}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
             </div>
        </div>

    </section>
</Layout>
</template>

<script setup>
import { ref } from 'vue';
import Layout from '@/Layout/Kepsek/Kepsek.vue';
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  ArcElement,
  CategoryScale,
  LinearScale
} from 'chart.js'
import { Bar, Pie, Doughnut } from 'vue-chartjs'

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend)

const data = ref({
    labels: [
        'Limbik Kiri Ekstrovert', 'Limbik Kiri Introvert', 
        'Limbik Kanan Ekstrovert', 'Limbik Kiri Introvert',
        'Neokorteks Kiri Ekstrovert', 'Neokorteks Kiri Instrovert',
        'Neokorteks Kanan Ekstrovert', 'Neokorteks Kanan Introvert',
        'Otak Tengah'
    ],
    datasets: [
        { 
            axis: 'y',
            label: 'Grafik Gaya Belajar',
            backgroundColor: ['#8383FB'], // Colors for each bar
            borderColor: ['#8383FB'], 
            borderWidth: 1,
            data: [470, 20, 10]
            // data: persentaseJawaban.value
        }
    ]
})

const options = ref({
    indexAxis: 'y',
    responsive: true,
    maintainAspectRatio: false, // Disable default aspect ratio
    // aspectRatio: 1,
    plugins: {
    legend: {
      display: false // Hide the legend
    },
    tooltip: {
      callbacks: {
        label: (context) => {
          return `${context.dataset.label}: ${context.raw}`;
        }
      },
      bodyColor: '#ffffff',
      titleColor: '#ffffff'
    }
  },
})

const dataSkorIQ = ref(
    {
        labels: ['Visual', 'Auditori', 'Kinestetik','a', 'b'],
        datasets: [
        {
            backgroundColor: ['#f97066','#fdb022', '#32d583', '#9ea5d1', '#36bffa'],
            data: [30, 10, 15, 20, 25],
        },
        ],
    }
)

const optionsSkorIQ = {
    plugins: {
        legend: {
        display: false // Hide the legend
        },
    },
    responsive: true,
    maintainAspectRatio: false
}

const arrListIQ = ref([
    {kategori: '> 119', persentase: '30%', color: 'bg-[#f97066]'},
    {kategori: '111 - 119', persentase: '10%', color: 'bg-[#fdb022]'},
    {kategori: '91 - 110', persentase: '15%', color: 'bg-[#32d583]'},
    {kategori: '80 - 90', persentase: '20%', color: 'bg-[#9ea5d1]'},
    {kategori: '< 80', persentase: '25%', color: 'bg-[#36bffa]'},
])
</script>