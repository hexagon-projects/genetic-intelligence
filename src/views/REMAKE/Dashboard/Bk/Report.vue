<template>
  <div class="h-full p-5 m-0 print:p-0 print:m-0">
    <div id="download" class="fixed bottom-5 right-5 z-50">
      <button
        onclick="window.print()"
        class="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-blue-600 transition duration-300"
      >
        Download PDF
      </button>
    </div>

    <div
      class="container max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden p-0 mb-5 flex flex-col justify-between print:max-w-full print:rounded-none print:mb-0 print:shadow-none"
    >
      <!-- Header -->
      <div
        class="header w-full grid grid-cols-[auto_1fr_auto] items-center bg-header relative mb-0 pb-0 print:fixed print:top-0 print:left-0 print:right-0 print:h-[100px] print:z-[999] print:bg-header"
      >
        <div
          class="logo px-10 rounded-full flex items-center justify-center text-white font-bold text-lg shrink-0"
        >
          <img
            src="@/assets/img/mgbk.png"
            alt=""
            class="w-12 h-12 object-contain"
          />
        </div>
        <div class="header-content min-w-0">
          <div class="text-center text-base font-semibold mx-5 py-5 text-white">
            Majelis Guru Bimbingan dan Konseling Indonesia
          </div>
          <div class="curve-parent flex items-end">
            <div class="curve h-5 overflow-hidden relative w-5">
              <div
                class="concave rounded-full h-10 w-10 absolute top-0 left-0"
              ></div>
            </div>
            <div
              class="curve-content w-full h-7 bg-white rounded-tl-xl rounded-tr-xl"
            ></div>
            <div class="curve-2 h-5 overflow-hidden relative w-5">
              <div
                class="concave-2 rounded-full h-10 w-10 absolute top-0 left-0"
              ></div>
            </div>
          </div>
        </div>
        <div
          class="logo px-10 rounded-full flex items-center justify-center text-white font-bold text-lg shrink-0"
        >
          <img
            src="@/assets/img/logo-singel.png"
            alt=""
            class="w-12 h-12 object-contain"
          />
        </div>
      </div>

      <!-- Konten -->
      <div
        class="content min-h-screen print:mt-[110px] print:mb-[60px] print:p-0 print:h-auto"
      >
        <!-- Konten 1 -->
        <div class="p-7 page-break-after" v-if="conseling">
          <h1
            class="section-title text-2xl font-semibold mb-6 break-inside-avoid"
          >
            Basic Information Counseling
          </h1>

          <form
            class="info-grid grid grid-cols-2 gap-7 mx-10 mb-10 print:mx-5 print:gap-4"
          >
            <div class="break-inside-avoid">
              <fieldset
                class="info-item mb-4 border border-gray-100 rounded-xl p-2 break-inside-avoid"
              >
                <legend
                  class="info-label text-xs uppercase tracking-wider mb-1"
                >
                  Title
                </legend>
                <div class="info-value text-sm leading-relaxed">
                  {{ conseling.title }}
                </div>
              </fieldset>

              <fieldset
                class="info-item mb-4 border border-gray-100 rounded-xl p-2 break-inside-avoid"
              >
                <legend
                  class="info-label text-xs uppercase tracking-wider mb-1"
                >
                  Description
                </legend>
                <div class="info-value text-sm leading-relaxed">
                  P{{ conseling.description }}
                </div>
              </fieldset>

              <fieldset
                class="info-item mb-4 border border-gray-100 rounded-xl p-2 break-inside-avoid"
              >
                <legend
                  class="info-label text-xs uppercase tracking-wider mb-1"
                >
                  Placement
                </legend>
                <div class="info-value text-sm leading-relaxed">
                  {{ conseling.placment }}
                </div>
              </fieldset>
            </div>

            <div class="break-inside-avoid">
              <fieldset
                class="info-item mb-4 border border-gray-100 rounded-xl p-2 break-inside-avoid"
              >
                <legend
                  class="info-label text-xs uppercase tracking-wider mb-1"
                >
                  Status
                </legend>
                <div class="info-value text-sm leading-relaxed">
                  {{ conseling.status }}
                </div>
              </fieldset>

              <fieldset
                class="info-item mb-4 border border-gray-100 rounded-xl p-2 break-inside-avoid"
              >
                <legend
                  class="info-label text-xs uppercase tracking-wider mb-1"
                >
                  Type Conseling
                </legend>
                <div class="info-value text-sm leading-relaxed">
                  {{ conseling.type_conseling }}
                </div>
              </fieldset>

              <fieldset
                class="info-item mb-4 border border-gray-100 rounded-xl p-2 break-inside-avoid"
              >
                <legend
                  class="info-label text-xs uppercase tracking-wider mb-1"
                >
                  Submission Date
                </legend>
                <div class="info-value text-sm leading-relaxed">
                  {{ conseling.submission_date }}
                </div>
              </fieldset>

              <fieldset
                class="info-item mb-4 border border-gray-100 rounded-xl p-2 break-inside-avoid"
              >
                <legend
                  class="info-label text-xs uppercase tracking-wider mb-1"
                >
                  Counseling Date
                </legend>
                <div class="info-value text-sm leading-relaxed">
                  {{ conseling.conseling_date }}
                </div>
              </fieldset>

              <fieldset
                class="info-item mb-4 border border-gray-100 rounded-xl p-2 break-inside-avoid"
              >
                <legend
                  class="info-label text-xs uppercase tracking-wider mb-1"
                >
                  Counseling Duration
                </legend>
                <div class="info-value text-sm leading-relaxed">
                  {{ conseling.conseling_time }}
                </div>
              </fieldset>
            </div>
          </form>

          <div class="participant-section mt-10 break-before-avoid">
            <h2
              class="participant-title text-2xl font-semibold mb-5 break-inside-avoid"
            >
              Participant
            </h2>

            <div
              class="table-container overflow-x-auto rounded-lg break-inside-avoid"
            >
              <table class="w-full border-collapse">
                <thead>
                  <tr>
                    <th
                      class="text-white py-3 px-3 text-left font-semibold text-sm"
                    >
                      #
                    </th>
                    <th
                      class="text-white py-3 px-3 text-left font-semibold text-sm"
                    >
                      Name
                    </th>
                    <th
                      class="text-white py-3 px-3 text-left font-semibold text-sm"
                    >
                      Department
                    </th>
                    <th
                      class="text-white py-3 px-3 text-left font-semibold text-sm"
                    >
                      Class
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="(item, index) in participants"
                    :key="index"
                    class="border-b border-gray-300 hover:bg-gray-100"
                  >
                    <td class="px-4 py-2">{{ index + 1 }}</td>
                    <td class="px-4 py-2">
                      <span v-if="item.user && item.user.customers">
                        {{ item.user.customers.first_name }}
                        {{ item.user.customers.last_name }}
                      </span>
                      <span v-else>-</span>
                    </td>
                    <td class="px-4 py-2">
                      {{ item.user?.customers?.majoring || "-" }}
                    </td>
                    <td class="px-4 py-2">
                      {{ item.user?.customers?.grade || "-" }}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <!-- Page break -->
        <div class="page-break"></div>

        <!-- Konten 2 -->
        <div class="p-8 print:pt-32 page-break-after">
          <h1
            class="section-title text-primary-500 text-2xl font-semibold mb-10"
          >
            Interview
          </h1>
          <div class="timeline relative pl-0 timeline-line">
            <div
              class="timeline-item relative mb-5 flex items-start gap-6"
              v-for="(item, index) in interviews"
              :key="index"
            >
              <div
                class="timeline-number w-14 h-14 rounded-full bg-white flex items-center justify-center text-primary-dark font-bold text-base relative z-10 shadow-timeline shrink-0 border-2 border-primary-dark"
              >
                Q{{ index + 1 }}
              </div>
              <fieldset
                class="timeline-content flex-1 border-2 border-gray-100 px-5 pb-5 rounded-xl mt-2"
              >
                <legend
                  class="timeline-label text-gray-label text-xs uppercase tracking-wider mb-2 font-medium"
                >
                  {{ item.type_aspek }}
                </legend>
                <div
                  class="timeline-text text-gray-text text-sm leading-relaxed text-justify"
                >
                  <div class="flex flex-col gap-2">
                    <span class="font-semibold">{{ item.title }}</span>
                    <small>{{ item.description }}</small>
                  </div>
                </div>
              </fieldset>
            </div>
          </div>
        </div>

        <!-- Page break -->
        <div class="page-break"></div>

        <!-- Konten 3 -->
        <div class="p-8 print:pt-32">
          <h1
            class="section-title text-primary-500 text-2xl font-semibold mb-10"
          >
            Documentation
          </h1>

          <div
            class="gallery-container bg-white p-8 rounded-2xl border border-gray-border"
          >
            <div class="gallery-grid grid grid-cols-3 gap-5">
              <div
                class="gallery-item relative aspect-[4/3] rounded-xl overflow-hidden border border-gray-border cursor-default"
                v-for="(item, index) in documentations"
                :key="index"
              >
                <img
                  v-if="item && item.file"
                  :src="`${BASE_URL}/storage/${item.file}`"
                  :alt="item.title"
                  class="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Footer -->
      <div
        class="footer flex justify-center items-center p-5 text-[#F6F6F9] text-xs bg-[rgba(255,255,255,0.5)] border-t border-[#e0d9ff] print:fixed print:bottom-0 print:left-0 print:right-0 print:h-[50px] print:z-[999] print:bg-white"
      >
        <img
          src="@/assets/img/logo-singel.png"
          alt=""
          class="w-7 h-7 object-contain"
        />
        <div class="footer-name">
          <i>Powered by Jatidiri.App</i>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onBeforeMount, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import Swal from "sweetalert2";
import Cookies from "js-cookie";
import initAPI from "@/api/api";

const BASE_URL = import.meta.env.VITE_API_BASE_URL_STORAGE;

const route = useRoute();
const router = useRouter();
const conselingId = ref(null);

const conseling = ref(null);
const participants = ref([]);
const interviews = ref([]);
const documentations = ref([]);

const isValidStudentId = (id) => {
  return !isNaN(id) && Number.isInteger(+id) && +id > 0;
};

const getReport = async () => {
  const token = Cookies.get("token");
  try {
    const response = await initAPI(
      "get",
      `bk/report/${conselingId.value}`,
      null,
      token
    );
    conseling.value = response.data.conseling;
    participants.value = response.data.participants;
    interviews.value = response.data.interviews;
    documentations.value = response.data.documentations;
    console.log("datas", documentations.value);
  } catch (error) {
    console.log(error);
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

onMounted(async () => {
  await getReport();
});
</script>

<style>
.header-title {
  color: #6366f1;
}

.section-title {
  color: #6366f1;
}

.participant-title {
  color: #6366f1;
}

.info-label {
  color: #6b7280;
}

.info-value {
  color: #374151;
}

.footer-name {
  color: #3030f8;
}

.concave {
  box-shadow: -20px -20px #f3f4f6;
}

.concave-2 {
  box-shadow: -20px -20px #f3f4f6;
}

thead {
  background: linear-gradient(45deg, #6366f1, #8b5cf6);
}

.bg-header {
  background: linear-gradient(45deg, #6366f1, #8b5cf6);
}

tbody tr:hover {
  background-color: #f8fafc;
}

.curve {
  height: 20px;
  overflow: hidden;
  position: relative;
  transform: rotateX(180deg) rotateY(180deg);
  width: 20px;
}

.concave {
  border-radius: 50%;
  box-shadow: -20px -20px #ffffff;
  height: 40px;
  width: 40px;
  position: absolute;
  top: 0;
  left: 0;
}

.curve-2 {
  height: 20px;
  overflow: hidden;
  position: relative;
  transform: rotateX(180deg);
  width: 20px;
}

.concave-2 {
  border-radius: 50%;
  box-shadow: -20px -20px #ffffff;
  height: 40px;
  width: 40px;
  position: absolute;
  top: 0;
  left: 0;
}

@page {
  size: A4;
  margin: 0;
}

@media print {
  #download {
    display: none !important;
  }
  /* body,
    html {
      margin: 0 !important;
      padding: 0 !important;
      background: #f3f4f6 !important;
      height: auto !important;
    } */

  .container {
    box-shadow: none !important;
    border-radius: 0 !important;
    max-width: 100% !important;
    height: auto !important;
    page-break-after: avoid;
  }

  .info-grid {
    display: grid !important;
    grid-template-columns: 1fr 1fr !important;
  }

  .header {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 90px !important;
    z-index: 999;
    -webkit-print-color-adjust: exact;
  }

  .footer {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: 50px !important;
    background: white !important;
    z-index: 999;
    -webkit-print-color-adjust: exact;
    border-top: 1px solid #e0d9ff !important;
  }

  .content {
    margin-top: 100px !important;
    margin-bottom: 60px !important;
    padding: 20px !important;
    min-height: calc(100vh - 160px) !important;
    font-size: 0.75rem !important;
  }

  body::after {
    content: "";
    display: table;
    clear: both;
    page-break-after: always;
  }

  .break-inside-avoid {
    page-break-inside: avoid !important;
    break-inside: avoid !important;
  }

  .page-break {
    page-break-after: always !important;
    break-after: page !important;
  }

  table {
    page-break-inside: auto !important;
  }

  tr {
    page-break-inside: avoid !important;
    break-inside: avoid !important;
  }
  #download {
    display: hidden !important;
  }
}

* {
  -webkit-print-color-adjust: exact !important; /* Untuk Chrome dan Safari */
  print-color-adjust: exact !important; /* Untuk Firefox dan Edge */
}
</style>
