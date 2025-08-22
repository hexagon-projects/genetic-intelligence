<template>
  <div class="bg-gray-50 p-5 rounded-lg">
    <h1 class="font-sora text-lg font-semibold">Informasi Penempatan</h1>
    <div class="my-5">
      <div v-if="loading">
        <!-- Skeleton untuk Nama Sekolah -->
        <div class="flex flex-col mb-3 animate-pulse">
          <div class="h-4 w-32 bg-gray-300 rounded mb-1"></div>
          <div class="h-4 w-48 bg-gray-200 rounded"></div>
        </div>
        <hr class="my-3" />
        <!-- Skeleton untuk Penempatan -->
        <div class="flex flex-col mb-3 animate-pulse">
          <div class="h-4 w-32 bg-gray-300 rounded mb-1"></div>
          <div class="h-4 w-40 bg-gray-200 rounded"></div>
        </div>
        <hr class="my-3" />
        <!-- Skeleton untuk 3 kolom -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-5 mb-3">
          <div class="flex flex-col animate-pulse space-y-2">
            <div class="h-4 w-32 bg-gray-300 rounded"></div>
            <div class="h-4 w-24 bg-gray-200 rounded"></div>
          </div>
          <div class="flex flex-col animate-pulse space-y-2">
            <div class="h-4 w-32 bg-gray-300 rounded"></div>
            <div class="h-4 w-28 bg-gray-200 rounded"></div>
          </div>
          <div class="flex flex-col animate-pulse space-y-2">
            <div class="h-4 w-32 bg-gray-300 rounded"></div>
            <div class="h-4 w-20 bg-gray-200 rounded"></div>
          </div>
        </div>
        <hr class="my-3" />
      </div>

      <div v-else-if="dataPlacment">
        <div class="flex flex-col mb-3">
          <span class="font-semibold">Nama Sekolah</span>
          <span>{{ dataPlacment.institution?.name }}</span>
        </div>
        <hr class="my-3" />
        <div class="flex flex-col mb-3">
          <span class="font-semibold">Penempatan/Lokasi</span>
          <span>{{ dataPlacment.institution?.region }}</span>
        </div>
        <hr class="my-3" />
        <div class="grid grid-cols-1 md:grid-cols-3 gap-5 mb-3">
          <div class="flex flex-col">
            <span class="font-semibold">Tanggal Pengajuan</span>
            <span>{{ dataPlacment.pengajuan ?? "-" }}</span>
          </div>
          <div class="flex flex-col">
            <span class="font-semibold">Tangal Verifikasi</span>
            <span>{{ dataPlacment.verifikasi ?? "-" }}</span>
          </div>
          <div class="flex flex-col">
            <span class="font-semibold">Status</span>
            <span>{{ dataPlacment.status ?? "-" }}</span>
          </div>
        </div>
        <hr class="my-3" />
        <div
      class="border w-full md:w-1/4 border-gray-200 rounded-lg p-3 hover:bg-gray-50 transition-colors duration-150"
    >
      <div class="flex items-start">
        <svg
          class="w-8 h-8 text-blue-600 mr-3 flex-shrink-0"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
        <div class="flex-1">
          <h5 class="text-sm font-medium text-gray-900">
            SK Guru Bk {{ dataPlacment?.institution?.name }}
          </h5>
          <p class="text-xs text-gray-500 mt-1">
            Home Base : {{ dataPlacment?.home_base }}
          </p>
        </div>
      </div>
      <div class="mt-2 flex gap-2">
        <a
          :href="`${baseURL}/storage/${dataPlacment?.file}`"
          target="_blank"
          rel="noopener noreferrer"
          class="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded hover:bg-blue-200 transition-colors duration-150"
        >
          Lihat Dokument
        </a>
      </div>
    </div>
      </div>

      <div v-else>
        <template v-if="dataPlacment">
            <!-- semua konten informasi -->
        </template>
        <template v-else>
            <div class="text-red-500">Data penempatan tidak ditemukan.</div>
        </template>
        </div>

    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import initAPI from "@/api/api";
import Swal from "sweetalert2";
import Cookies from "js-cookie";
import { useRouter } from "vue-router";

const props = defineProps({
  placementId: {
    type: Object,
    required: true,
  },
});

const router = useRouter();
const token = Cookies.get("token");
const baseURL =
  import.meta.env.VITE_API_BASE_URL_STORAGE || "http://127.0.0.1:8000";


const dataPlacment = ref(null);
const loading = ref(true);

const getPlacmentDetail = async () => {
  loading.value = true;
  try {
    const response = await initAPI(
      "get",
      `placement/${props.placementId}`,
      null,
      token
    );
    dataPlacment.value = response.data.data;
    console.log("data : ", dataPlacment.value);
  } catch (error) {
    console.error(error);
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  getPlacmentDetail();
});
</script>
