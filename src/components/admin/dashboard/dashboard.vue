<template>
    <div v-if="loading" class="preloader-overlay">
        <span
            class="flex justify-center animate-[spin_2s_linear_infinite] border-8 border-[#f1f2f3] border-l-biru border-r-biru rounded-full w-14 h-14 m-auto"></span>
    </div>

    <div v-else>
        <section class="bg-gray-100 p-6 space-y-6">
            <GenderChart :gender-data="demografiData.gender" :age-data="demografiData.age" :total-institutions="institutionsData?.institutions.length"/>
            
            <SekolahChart :institution-data="institutionsData?.institutions || []" />

            <div class="w-full h-full flex flex-col md:flex-row items-stretch gap-6">
                <div class="w-full md:w-[70%]">
                    <JatidiriIstChart :iq-data="assestmentData?.iqpotensi || {}" />
                </div>
                <div class="w-full h-full md:w-[30%]">
                    <JatidiriBahagiaChart class="h-full" :bahagia-data="assestmentData?.jatidiriBahagia || {}" />
                </div>
            </div>

            <div class="w-full h-full flex flex-col md:flex-row gap-6">
                <div class="w-full h-full md:w-[50%]">
                    <JatidiriAnxietyChart :anxiety-data="assestmentData?.jatidiriAnxiety || {}" />
                </div>
                <div class="w-full h-full md:w-[50%]">
                    <JatidiriKarirChart :karier-data="assestmentData?.karierStatistik?.grouped || {}" />
                </div>
            </div>

            <div class="grid grid-cols-2 gap-6">
                <JatidiriMentalChart :mental-data="assestmentData?.jatidiriMental || {}" />
                <JatidiriKendaliChart :kendali-data="assestmentData?.jatidiriKendali || {}" />
            </div>
        </section>
    </div>
</template>

<script setup>
import GenderChart from './components/GenderChart.vue';
import initAPI from '../../../api/api';
import Cookies from "js-cookie";
import { onMounted, ref } from 'vue';
import JatidiriKarirChart from '../../../views/REMAKE/Dashboard/Kepsek/components/JatidiriKarirChart.vue';
import JatidiriBahagiaChart from './components/JatidiriBahagiaChart.vue';
import JatidiriAnxietyChart from './components/JatidiriAnxietyChart.vue';
import JatidiriMentalChart from './components/JatidiriMentalChart.vue';
import JatidiriKendaliChart from './components/JatidiriKendaliChart.vue';
import JatidiriIstChart from './components/JatidiriIstChart.vue';
import SekolahChart from './components/SekolahChart.vue';

const token = Cookies.get("token");
const loading = ref(true);
const demografiData = ref({
    gender: [],
    age: []
});
const assestmentData = ref(null);
const institutionsData = ref(null);

const fetchGenderData = async () => {
    try {
        const response = await initAPI("get", `statistik/demografi`, null, token);
        demografiData.value = response.data;
    } catch (error) {
        console.error("Error fetching demografi data:", error);
    }
};

const fetchAssesmentData = async () => {
    try {
        const response = await initAPI("get", `statistik/assement`, null, token);
        assestmentData.value = response.data;
        loading.value = false;
    } catch (error) {
        console.error("Error fetching assesment data:", error);
        loading.value = false;
    }
};

const fetchInstitutionData = async () => {
    try {
        const response = await initAPI("get", `statistik/institutions`, null, token);
        institutionsData.value = response.data;
    } catch (error) {
        console.error("Error fetching institution data:", error);
    }
};

onMounted(async () => {
    await fetchGenderData()
    await fetchInstitutionData()
    await fetchAssesmentData()
})
</script>