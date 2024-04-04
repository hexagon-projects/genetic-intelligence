<template>
    <div :class="{'lg:w-[65%] w-full': props.isAssessment && props.isTestedIQ, 'lg:w-full w-full': props.isAssessment && !props.isTestedIQ}">
        <div class="bg-white h-auto flex flex-col rounded-lg shadow-sm p-4 lg:mb-4">
            <div class="flex justify-between items-center mb-3">
                <h1 class="text-dark text-lg font-semibold cursor-default">Resume Assessment</h1>
                <RouterLink :to="{name: 'user.views.hasil_assessment'}" class="font-medium text-biru text-base">Lihat Detail</RouterLink>
            </div>

            <div class="h-auto lg:h-[312px] flex flex-col md:flex-row lg:flex-row">
                <div class="w-full md:w-1/2 lg:w-1/2 bg-biru rounded-lg p-4">
                    <h1 class="font-myFont font-medium text-light text-center text-lg mb-2">
                        Tipe Pembelajaran Kamu
                    </h1>
                    <div class="mx-auto flex-col my-4 w-[188px] flex justify-center p-12 rounded-full bg-[#1fabee] bg-opacity-40 backdrop-blur-lg">
                        <span class="text-7xl text-center text-light font-myFont">
                            {{ valueTotal }}
                        </span>
                        <p class="text-xs text-center text-light font-myFont">
                            dari 100%
                        </p>
                    </div>
                    <h1 class="font-myFont font-medium text-center text-light text-lg">
                        {{ gayaBelajar }}
                    </h1>
                </div>

                <div id="chartBelajar" class="w-full md:w-1/2 lg:w-1/2 p-4">
                    <Pie v-if="data && data !== null" :data="data" :options="options" />
                </div>
            </div>
            
        </div>
    </div>
</template>

<script>
import { ref } from 'vue'
import { Pie } from 'vue-chartjs'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
ChartJS.register(ArcElement, Tooltip, Legend)

export default {
    name: 'ResumeAssessment',
    props: ['dataAssessment', 'isAssessment', 'isTestedIQ'],
    components: {Pie},
    setup(props){
        const gayaBelajar = ref('')
        const persentaseJawaban = []
        const nextParagraf = ref('')
        const formattedText = ref('')
        const data = ref(null)
        const options = {
            responsive: true,
            maintainAspectRatio: false
        }
        const valueTotal = ref(null)

        gayaBelajar.value = props.dataAssessment[0].assessment.name
        props.dataAssessment[0].total_answer.forEach(element => {
            persentaseJawaban.push(element.percentage) 
        });

        valueTotal.value = props.dataAssessment[0].result_percentage
        const formatText = props.dataAssessment[0].assessment.description.map(sentence => sentence.replace(/\./g, '. <br> <br>')).join(' ');
        formattedText.value = formatText

        data.value = {
            labels: ['Visual', 'Auditori', 'Kinestetik'],
            datasets: [
            {
                backgroundColor: ['#e7515a','#0b40f4', '#00ab55',],
                data: persentaseJawaban,
            },
            ],
        };

        return {
            gayaBelajar,
            persentaseJawaban,
            data,
            options,
            valueTotal,
            props
        }
    }
}
</script>