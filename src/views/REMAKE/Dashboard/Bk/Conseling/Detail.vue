<template>
  <Layout>
    <div class="bg-gray-100 min-h-screen p-5">
      <div class="w-full md:w-4/5 mx-auto">
        <div class="w-full mx-auto mt-10 bg-white rounded-2xl p-5">
          <!-- Tab Navigation -->
          <!-- Tab Navigation -->
          <div class="flex flex-wrap gap-2 border-b border-gray-200">
            <button
              v-for="(tab, index) in tabs"
              :key="index"
              @click="activeTab = index"
              class="px-4 py-2 text-sm md:text-base font-semibold rounded-t-md transition-all duration-200"
              :class="{
                'text-biru border-b-2 border-biru': activeTab === index,
                'text-gray-600 hover:bg-gray-100': activeTab !== index,
              }"
            >
              {{ tab.name }}
            </button>
          </div>

          <!-- Tab Content -->
          <div class="p-4">
            <div v-if="activeTab === 0">
              <InfoConseling v-if="conseling" :conseling="conseling" @refresh="fetchConselig" />
              <div
                v-else
                class="bg-gray-50 p-5 rounded-lg animate-pulse space-y-5"
              >
                <div class="h-6 bg-gray-300 rounded w-1/3"></div>

                <div class="space-y-3">
                  <div class="h-4 bg-gray-300 rounded w-1/4"></div>
                  <div class="h-6 bg-gray-300 rounded w-3/4"></div>
                </div>

                <div class="space-y-3">
                  <div class="h-4 bg-gray-300 rounded w-1/4"></div>
                  <div class="h-6 bg-gray-300 rounded w-full"></div>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-3 gap-5">
                  <div class="h-16 bg-gray-300 rounded"></div>
                  <div class="h-16 bg-gray-300 rounded"></div>
                  <div class="h-16 bg-gray-300 rounded"></div>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-3 gap-5">
                  <div class="h-16 bg-gray-300 rounded"></div>
                  <div class="h-16 bg-gray-300 rounded"></div>
                  <div class="h-16 bg-gray-300 rounded"></div>
                </div>
              </div>
            </div>
            <div v-else-if="activeTab === 1">
              <Participants :participants="participants" :conselingId="conselingId" @refresh="fetchConselig" />
            </div>
            <div v-else-if="activeTab === 2">
              <Interview :conselingInterview="conselingInterview" :conselingId="conselingId" />
            </div>
            <div v-else-if="activeTab === 3">
              <Documentation :conselingDocumentation="conselingDocumentation" :conselingId="conselingId" @uploaded="fetchDocumentation" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </Layout>
</template>

<script setup>
import Layout from "@/Layout/Bk/Layout.vue";
import Participants from "../../../../../components/REMAKE/Bk/Participants.vue";
import InfoConseling from "../../../../../components/REMAKE/Bk/InfoConseling.vue";
import Interview from "../../../../../components/REMAKE/Bk/Interview.vue";
import Documentation from "../../../../../components/REMAKE/Bk/Documentation.vue";
import { ref, onBeforeMount, onMounted } from "vue";
import initAPI from "@/api/api";
import Swal from "sweetalert2";
import Cookies from "js-cookie";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();

const tabs = [
  { name: "Informasi Layanan" },
  { name: "Pihak Yang Terlibat" },
  { name: "Catatan Layanan" },
  { name: "Dokumentasi" },
];

const activeTab = ref(0);
const conselingId = ref(null);
const conseling = ref(null);
const participants = ref(null);
const conselingInterview = ref(null);
const conselingDocumentation = ref(null);

const isValidStudentId = (id) => {
  return !isNaN(id) && Number.isInteger(+id) && +id > 0;
};

const isLoadingInfo = ref(false);
const getConseling = async () => {
  isLoadingInfo.value = true;
  try {
    const token = Cookies.get("token");
    const response = await initAPI(
      "get",
      `conseling/detail/${conselingId.value}`,
      null,
      token
    );

    conseling.value = response.data.data;
    participants.value = response.data.participants;
    console.log("Participants : ", participants.value);
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "Terjadi error saat mengambil data siswa.",
      showConfirmButton: false,
      timer: 2000,
    });
  } finally {
    isLoadingInfo.value = false;
  }
};

const getConselingInterview = async () => {
  isLoadingInfo.value = true;
  try {
    const token = Cookies.get("token");
    const response = await initAPI(
      "get",
      `interview/${conselingId.value}`,
      null,
      token
    );

    conselingInterview.value = response.data.data;
    console.log('Interview',conselingInterview.value);
    
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "Terjadi error saat mengambil data interview conseling.",
      showConfirmButton: false,
      timer: 2000,
    });
  } finally {
    isLoadingInfo.value = false;
  }
};

const getConselingDocumentation = async () => {
  isLoadingInfo.value = true;
  try {
    const token = Cookies.get("token");
    const response = await initAPI(
      "get",
      `interview-documentation/${conselingId.value}`,
      null,
      token
    );

    conselingDocumentation.value = response.data.data;
    console.log('Documentation',conselingDocumentation.value);
    
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "Terjadi error saat mengambil data documentation conseling.",
      showConfirmButton: false,
      timer: 2000,
    });
  } finally {
    isLoadingInfo.value = false;
  }
};

onBeforeMount(() => {
  const encodedConselingId = route.query.conseling_id;
  if (!encodedConselingId) {
    router.push({ name: "bk.views.pra.conseling" });
    return;
  }

  try {
    const decodedId = atob(encodedConselingId); // Menggunakan Base64 decode

    // Validasi: Pastikan ID adalah angka
    if (!isValidStudentId(decodedId)) {
      router.push({ name: "bk.views.pra.conseling" });
      return;
    }

    conselingId.value = decodedId;
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "Terjadi error saat decoded data siswa.",
      showConfirmButton: false,
      timer: 2000,
    });

    router.push({ name: "bk.views.pra.conseling" });
  }
});

const fetchDocumentation = async () => {
  await getConselingDocumentation();
};

const fetchConselig = async () => {
  await getConseling();
};


onMounted(async () => {
  await getConseling();
  await getConselingInterview();
  await getConselingDocumentation();
});
</script>
