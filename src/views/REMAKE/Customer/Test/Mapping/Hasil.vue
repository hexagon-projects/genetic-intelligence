<template>
  <Layout>
    <div class="max-w-7xl mx-auto p-4 md:p-8 lg:p-12 bg-white">
      <!-- Header Section -->
      <div
        class="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 mb-12"
      >
        <div class="flex-1">
          <div class="text-sm text-gray-500 mb-2">
            Verified by
            <span class="font-semibold text-blue-600">Jatidiri.app</span>
          </div>
          <h1 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Hasil Tes Talent Mapping
          </h1>
          <p
            v-if="result && result.top7 && result.top7.length > 0"
            class="text-gray-700 mb-6 max-w-2xl"
          >
            {{ result.top7[0].claster }}
          </p>

          <!-- Skeleton Loading -->
          <div v-else class="space-y-2 mb-6 max-w-2xl animate-pulse">
            <div class="h-4 bg-gray-200 rounded"></div>
            <div class="h-4 bg-gray-200 rounded w-5/6"></div>
            <div class="h-4 bg-gray-200 rounded"></div>
            <div class="h-4 bg-gray-200 rounded w-5/6"></div>
          </div>

          <!-- Kelebihan Kamu Section -->
          <div class="mb-12">
            <h2 class="text-xl font-semibold font-sora text-gray-800 mb-4">
              Kelebihan Kamu
            </h2>

            <!-- Jika data sudah ada -->
            <div
              v-if="result && result.top7 && result.top7.length > 0"
              class="flex flex-wrap gap-3"
            >
              <button
                v-for="(item, index) in result.top7"
                :key="index"
                class="bg-biru text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-biru/80 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                {{ item.title }} ({{ item.code }})
              </button>
            </div>

            <!-- Skeleton Loading -->
            <div v-else class="flex flex-wrap gap-3 animate-pulse">
              <div
                v-for="n in 7"
                :key="n"
                class="h-8 w-28 bg-gray-200 rounded-full"
              ></div>
            </div>
          </div>

          <!-- Kelemahan Kamu Section -->
          <div class="mb-12">
            <h2 class="text-xl font-semibold font-sora text-gray-800 mb-4">
              Kelemahan Kamu
            </h2>

            <!-- Jika data sudah ada -->
            <div
              v-if="result && result.bottom7 && result.bottom7.length > 0"
              class="flex flex-wrap gap-3"
            >
              <button
                v-for="(item, index) in result.bottom7"
                :key="index"
                class="bg-red-700 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                {{ item.title }} ({{ item.code }})
              </button>
            </div>

            <!-- Skeleton Loading -->
            <div v-else class="flex flex-wrap gap-3 animate-pulse">
              <div
                v-for="n in 7"
                :key="n"
                class="h-8 w-28 bg-gray-200 rounded-full"
              ></div>
            </div>
          </div>
        </div>
        <div class="w-full md:w-1/3 hidden md:flex justify-center md:justify-end">
          <img
            src="@/assets/img/love.png"
            alt="Abstract illustration of documents and folders"
            class="w-full max-w-[300px] h-auto floating"
          />
        </div>
      </div>

      <!-- Detail Hasil Test Section -->
      <div>
        <h2 class="text-xl font-semibold font-sora text-gray-800 mb-4">
          Detail Hasil Test
        </h2>

        <!-- Data Sudah Ada -->
        <div
          v-if="
            result && result.cluster_result && result.cluster_result.length > 0
          "
          class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <div
            class="border rounded-lg p-6 shadow-sm flex flex-col"
            v-for="(item, index) in result.cluster_result"
            :key="index"
          >
            <div class="flex items-center mb-4 gap-5">
              <div
                class="h-12 bg-biru text-white rounded-lg px-3 flex items-center justify-center"
              >
                {{ item.percent }} %
              </div>
              <div>
                <h3 class="text-lg font-semibold text-gray-900">
                  {{ item.title }}
                </h3>
                <p class="text-gray-600">({{ item.code }})</p>
              </div>
            </div>
            <div class="space-y-4 flex-1">
              <div v-for="(claster, i) in item.claster" :key="i">
                <div class="flex items-center text-gray-800 font-medium mb-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="w-5 h-5 mr-2"
                  >
                    <path
                      d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"
                    />
                  </svg>
                  {{ claster.code }}
                </div>
                <p class="text-gray-700 text-sm">
                  {{ claster.claster }}
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- Skeleton Loading -->
        <div
          v-else
          class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse"
        >
          <div
            v-for="n in 3"
            :key="n"
            class="border rounded-lg p-6 shadow-sm flex flex-col"
          >
            <!-- Header -->
            <div class="flex items-center mb-4 gap-5">
              <div class="h-12 w-16 bg-gray-200 rounded-lg"></div>
              <div class="flex-1 space-y-2">
                <div class="h-4 bg-gray-200 rounded w-3/4"></div>
                <div class="h-3 bg-gray-200 rounded w-1/2"></div>
              </div>
            </div>

            <!-- Content -->
            <div class="space-y-4 flex-1">
              <div v-for="m in 3" :key="m" class="space-y-2">
                <div class="h-4 bg-gray-200 rounded w-1/3"></div>
                <div class="h-3 bg-gray-200 rounded w-full"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Layout>
</template>

<script setup>
import Layout from "@/Layout/Customer/Layout.vue";
import { ref, onMounted, onBeforeUnmount } from "vue";
import Cookies from "js-cookie";
import initAPI from "@/api/api";
import Swal from "sweetalert2";

const result = ref([]);
const getQuestions = async () => {
  const token = Cookies.get("token");
  try {
    const respon = await initAPI("get", "customers/mapping", null, token);
    result.value = respon.data;
    // console.log("Result Mapping", result.value);
  } catch (error) {
    console.log(error);
  }
};

onMounted(() => {
  getQuestions();
});
</script>

<style scoped>
@keyframes floatY {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

.floating {
  animation: floatY 3s ease-in-out infinite;
}
</style>