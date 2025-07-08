<template>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
    <!-- Bar Chart -->
    <div class="bg-white rounded-xl p-5 my-5">
      <apexchart
        type="bar"
        height="350"
        :options="barOptions"
        :series="barSeries"
      />
    </div>

    <!-- Donut (Pie) Chart -->
    <div class="bg-white rounded-xl p-5 my-5">
      <apexchart
        type="donut"
        height="400"
        :options="donutOptions"
        :series="donutSeries"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import ApexCharts from "vue3-apexcharts";
import Cookies from "js-cookie";
import initAPI from "@/api/api";

const aspekList = [
  "Fisik Motorik",
  "Fisik",
  "Sosial",
  "Emosi",
  "Moral",
  "Religius",
  "Lainnya",
];

// --------------------
// BAR CHART
// --------------------
const barOptions = ref({
  chart: { id: "type-aspek-bar", toolbar: { show: false } },
  xaxis: {
    categories: aspekList,
    labels: { rotate: -45, style: { fontSize: "13px" } },
  },
  dataLabels: { enabled: true },
  title: { text: "Distribusi Type Aspek Konseling (Bar)", align: "center" },
});

const barSeries = ref([
  {
    name: "Jumlah",
    data: Array(aspekList.length).fill(0),
  },
]);

// --------------------
// DONUT / PIE CHART
// --------------------
const donutOptions = ref({
  labels: aspekList,
  legend: {
    position: "bottom",
  },
  title: {
    text: "Distribusi Type Aspek Konseling (Donut)",
    align: "center",
  },
});

const donutSeries = ref(Array(aspekList.length).fill(0)); // default semua 0

// --------------------
// Fetch Data
// --------------------
const fetchChartData = async () => {
  const token = Cookies.get("token");
  try {
    const res = await initAPI("get", "statistik-admin/typeAspek", null, token);
    const result = res.data.data;

    const counts = aspekList.map((aspek) => {
      const found = result.find((item) => item.type_aspek === aspek);
      return found ? found.total : 0;
    });

    // Isi untuk kedua chart
    barSeries.value[0].data = counts;
    donutSeries.value = counts;
  } catch (err) {
    console.error("Gagal ambil data chart", err);
  }
};

onMounted(fetchChartData);
</script>

<script>
export default {
  components: {
    apexchart: ApexCharts,
  },
};
</script>
