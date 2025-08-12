<template>
    <div class="grid grid-cols-1 md:grid-cols-4 gap-5 my-5">
        <div class="bg-white shadow-lg rounded-2xl p-5">
            <div class="flex flex-col font-sora">
                <span class="font-semibold">Jumlah Guru BK Terverifikasi</span>
                <small>Jumlah Statistik</small>
                <div class="outline outline-1 outline-gray-200 rounded-2xl flex gap-3 items-center p-3 mt-3">
                    <img src="@/assets/icons/statis-user.png" class="w-8" alt="basic">
                    <div class="flex flex-col py-3">
                        <h1 class="text-lg font-semibold">{{ dataStatistik.conselor }}</h1>
                        <small>Datas</small>
                    </div>
                </div>
            </div>
        </div>
        <div class="bg-white shadow-lg rounded-2xl p-5">
            <div class="flex flex-col font-sora">
                <span class="font-semibold">Jumlah Kesluruhan Layanan</span>
                <small>Jumlah Statistik</small>
                <div class="outline outline-1 outline-gray-200 rounded-2xl flex gap-3 items-center p-3 mt-3">
                    <img src="@/assets/icons/statis-user.png" class="w-8" alt="basic">
                    <div class="flex flex-col py-3">
                        <h1 class="text-lg font-semibold">{{ dataStatistik.case }}</h1>
                        <small>Datas</small>
                    </div>
                </div>
            </div>
        </div>
        <div class="bg-white shadow-lg rounded-2xl p-5">
            <div class="flex flex-col font-sora">
                <span class="font-semibold">Jumlah Sekolah</span>
                <small>Jumlah Statistik</small>
                <div class="outline outline-1 outline-gray-200 rounded-2xl flex gap-3 items-center p-3 mt-3">
                    <img src="@/assets/icons/statis-user.png" class="w-8" alt="basic">
                    <div class="flex flex-col py-3">
                        <h1 class="text-lg font-semibold">{{ dataStatistik.school }}</h1>
                        <small>Datas</small>
                    </div>
                </div>
            </div>
        </div>
        <div class="bg-white shadow-lg rounded-2xl p-5">
            <div class="flex flex-col font-sora">
                <span class="font-semibold">Jumlah Layanan Selesai</span>
                <small>Jumlah Statistik</small>
                <div class="outline outline-1 outline-gray-200 rounded-2xl flex gap-3 items-center p-3 mt-3">
                    <img src="@/assets/icons/statis-user.png" class="w-8" alt="basic">
                    <div class="flex flex-col py-3">
                        <h1 class="text-lg font-semibold">{{ dataStatistik.case_complete }}</h1>
                        <small>Datas</small>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import Cookies from "js-cookie";
import Swal from "sweetalert2";
import initAPI from "@/api/api";

const dataStatistik = ref([]);

const fetchData = async () => {
    const token = Cookies.get("token");
  try {
    const response = await initAPI("get", "statistik-admin", null, token);
    dataStatistik.value = response.data;
    console.log('Jumlah data', dataStatistik.value);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

onMounted (() => {
  fetchData();
});
</script>