<template>
    <div class="mx-9 md:mx-auto grid grid-cols-1 md:grid-cols-2 gap-4 max-w-[798px]">
        <div v-if="props.propsAssessment" class="relative w-auto min-h-[498px] max-h-[510px] group p-9 bg-[#3030f8] rounded-3xl flex-col justify-between items-center gap-6 inline-flex">
            <div class="flex flex-col items-center gap-[16px]">
                <h1 class="text-[#f0f7fd] text-base md:text-2xl font-semibold font-sora leading-loose">
                    Resume Assesment Kamu
                </h1>

                <!-- <div class="justify-start items-center gap-4 inline-flex">
                    <div class="px-4 py-1 bg-[#d6d6fe] rounded-[99px] justify-center items-center gap-2.5 flex">
                        <div class="text-[#3030f8] text-xs md:text-sm font-normal font-roboto leading-[30px]">Visual</div>
                    </div>
                    <div class="px-4 py-1 bg-[#fee3e1] rounded-[99px] justify-center items-center gap-2.5 flex">
                        <div class="text-[#f04437] text-xs md:text-sm font-normal font-roboto leading-[30px]">Auditori</div>
                    </div>
                    <div class="px-4 py-1 bg-[#d0fadf] rounded-[99px] justify-center items-center gap-2.5 flex">
                        <div class="text-[#12b669] text-xs md:text-sm font-normal font-roboto leading-[30px]">Kinestik</div>
                    </div>
                </div> -->
            </div>

            <div class="z-50 relative h-[424px] mx-3">
                <Bar :data="data" :options="options" />
            </div>

            <RouterLink :to="{name: 'user.views.hasil_assessment'}" class="self-stretch text-center text-white text-base font-medium font-['Roboto'] underline leading-normal">
              Baca Selengkapnya
            </RouterLink>
        </div>

        <div v-if="props.propsIq" class="relative w-auto min-h-[498px] max-h-[510px] group p-9 bg-[#3030f8] rounded-3xl flex-col justify-between items-center gap-6 inline-flex">
            <div class="flex flex-col items-center gap-[16px]">
                <h1 class="text-[#f0f7fd] text-base md:text-2xl font-semibold font-sora leading-loose">
                    Resume IQ Kamu
                </h1>

                <div class="px-4 py-1 bg-[#d0fadf] rounded-[99px] justify-center items-center gap-2.5 flex">
                    <div class="text-[#027947] text-lg font-normal font-roboto leading-[30px]">
                      {{ props.propsIq.iq.category }}
                    </div>
                </div>
                <div class="flex flex-col justify-cetner items-center gap-4">
                    
                    <div class="w-[268px] h-[268px] relative">
                        <img :src="baseUrl+'open/iq-icons/'+props.propsIq.iq.icon" alt="badges">
                    </div>
                </div>
            </div>

            <!-- Icons -->
            <!-- <div class="h-[380px] flex-col justify-between items-center inline-flex">
                <div class="self-stretch justify-center items-center gap-4 inline-flex">
                    <div class="px-4 py-1 bg-[#d0fadf] rounded-[99px] justify-center items-center gap-2.5 flex">
                        <div class="text-[#027947] text-lg font-normal font-['DM Sans'] leading-[30px]">Average - Cukup</div>
                    </div>
                </div>
                <div class="w-[300px] h-[300px] relative">
                    <div class="w-[172px] h-[103.57px] left-[64.75px] top-[117.74px] absolute">
                    </div>
                    <div class="w-[62px] h-[72.48px] left-[119px] top-[113.76px] absolute text-white text-[98px] font-bold font-['Sora'] leading-[72px]">3</div>
                </div>
            </div> -->

            <RouterLink :to="{name: 'user.views.hasil_iq'}" class="self-stretch text-center text-white text-base font-medium font-['Roboto'] underline leading-normal">
              Baca Selengkapnya
            </RouterLink>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
} from 'chart.js'
import { Bar } from 'vue-chartjs'
import { RouterLink } from 'vue-router';

const baseUrl = import.meta.env.VITE_API_BASE_URL

const props = defineProps(['propsIq', 'propsAssessment'])
const persentaseJawaban = ref([])


if(props.propsAssessment){
  props.propsAssessment[0].total_answer.forEach(element => {
      persentaseJawaban.value.push(element.percentage) 
  });
}

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

const data = ref({
    labels: ['Visual', 'Auditori', 'Kinestetk'],
    datasets: [
        { 
            label: 'Grafik Gaya Belajar',
            backgroundColor: ['#9a89ff', '#feaeae', '#a9f4d0'], // Colors for each bar
            borderColor: ['#9a89ff', '#feaeae', '#a9f4d0'], 
            borderWidth: 1,
            // data: [70, 20, 10]
            data: persentaseJawaban.value
        }
    ]
})

const options = ref({
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
  scales: {
    x: {
      ticks: {
        color: '#ffffff'
      },
      grid: {
        color: '#ffffff'
      }
    },
    y: {
      ticks: {
        color: '#ffffff'
      },
      grid: {
        color: '#ffffff'
      }
    }
  }
})
</script>