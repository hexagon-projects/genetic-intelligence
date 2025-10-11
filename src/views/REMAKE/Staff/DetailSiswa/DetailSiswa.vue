<template>
  <div v-if="loading" class="preloader-overlay">
    <span
      class="flex justify-center animate-[spin_2s_linear_infinite] border-8 border-[#f1f2f3] border-l-biru border-r-biru rounded-full w-14 h-14 m-auto"></span>
  </div>

  <Layout v-else>
    <section class="bg-white py-[32px]">
      <div class="mx-[30px] lg:mx-[60px]">
        <div class="flex items-start gap-[26px]">
          <div class="sticky top-4 w-[20%] flex-col justify-start items-start gap-4 inline-flex">
            <div class="text-[#0c141c] text-base font-medium font-['Roboto'] leading-normal">
              Menu
            </div>

            <div class="flex flex-col w-full">
              <div v-for="(item, index) in filteredSidebarItems" :key="index" :class="[
                'cursor-pointer px-[12px] py-[8px] flex items-center gap-[12px]',
                {
                  'bg-[#f0f7fd] rounded-xl':
                    selectedItemIndex === index || pageType == item.text,
                },
              ]" @click="selectItem(index, item.text)">
                <img :class="{
                  'grayscale-0':
                    selectedItemIndex === index || pageType == item.text,
                  grayscale: selectedItemIndex !== index,
                }" class="size-[24px]" :src="item.image" alt="icon" />
                <span :class="{
                  'text-[#3030f8]':
                    selectedItemIndex === index || pageType == item.text,
                }" class="font-roboto font-medium text-[#0c141c] text-sm">{{ item.text }}</span>
              </div>
            </div>
          </div>

          <div class="w-full px-6 rounded-xl border border-[#cfd4dc] flex-col justify-start items-start flex">
            <div class="mb-[32px] w-full px-4 py-8 flex justify-between items-center">
              <div class="flex items-center gap-2">
                <img class="w-14 h-14 rounded-full" src="@/assets/img/profile-mock.png" alt="profile" />
                <div class="text-[#0c141c] text-2xl font-semibold font-['Roboto'] leading-loose">
                  {{ siswaDatas.name }}
                </div>
              </div>

              <button @click="
                downloadFile(siswaDatas.customers_results.gim.result_file)
                " v-if="
                  (pageType == 'Profile Pengguna' ||
                    pageType == 'Hasil Tes GIM') &&
                  siswaDatas.customers_results !== null
                " class="bg-[#fee3e1] font-roboto font-medium text-[#f04437] px-4 py-2 rounded-lg">
                Download PDF
              </button>
            </div>

            <!-- Personal Information -->
            <PersonalInfo v-if="pageType == 'Profile Pengguna' && siswaDatas" :siswaDatas="siswaDatas" />

            <!-- Hasil Tes GIM -->
            <HasilGIM v-if="pageType == 'Hasil Tes Jatidiri Sejati' && siswaDatas" :siswaDatas="siswaDatas" />

            <!-- Hasil Assessment -->
            <HasilAssessment v-if="pageType == 'Hasil Tes Jatidiri Belajar' && siswaDatas" :siswaDatas="siswaDatas" />

            <!-- Hasil IQ -->
            <HasilIQ v-if="pageType == 'Hasil Tes Jatidiri Cerdas' && siswaDatas" :siswaDatas="siswaDatas" />

            <!-- Hasil CPM -->
            <HasilCPM v-if="pageType == 'Hasil Tes CPM' && siswaDatas" :siswaDatas="siswaDatas" />

            <!-- Hasil Bakat -->
            <HasilBakat v-if="pageType == 'Hasil Tes Jatidiri Bakat' && siswaDatas" :siswaDatas="siswaDatas" />

            <!-- Hasil Kendali -->
            <HasilKendali v-if="pageType == 'Hasil Tes Jatidiri Kendali' && siswaDatas" :siswaDatas="siswaDatas" />

            <!-- Hasil Index Kebahagian -->
            <HasilBahagia v-if="pageType == 'Hasil Tes Jatidiri Bahagia' && siswaDatas" :siswaDatas="siswaDatas" />

            <!-- Hasil Index Anxiiety -->
            <HasilAnxiety v-if="pageType == 'Hasil Tes Jatidiri Anxiety' && siswaDatas" :siswaDatas="siswaDatas" />

            <!-- Hasil Index stres -->
            <HasilStres v-if="pageType == 'Hasil Tes Jatidiri Stress' && siswaDatas" :siswaDatas="siswaDatas" />

            <!-- Hasil Index mental -->
            <HasilMental v-if="
              pageType == 'Hasil Tes Jatidiri Kesehatan Mental' && siswaDatas
            " :siswaDatas="siswaDatas" />

            <!-- Hasil Jatidiri Q1 -->
            <HasilQ1 v-if="pageType == 'Hasil Tes Jatidiri Q1' && siswaDatas" :siswaDatas="siswaDatas" />

            <!-- Hasil Jatidiri Q2 -->
            <HasilQ2 v-if="pageType == 'Hasil Tes Jatidiri Q2' && siswaDatas" :siswaDatas="siswaDatas" />

            <!-- Hasil Jatidiri Potensi -->
            <HasilPotensi v-if="pageType == 'Hasil Tes Jatidiri Potensi' && siswaDatas" :siswaDatas="siswaDatas" />

            <!-- Hasil Jatidiri Cerdas  -->
            <HasilJatidiriCerdas v-if="pageType == 'Hasil Tes Jatidiri Cerdas Dewasa'"
              :siswaCerdasData="siswaCerdasData" />

            <!-- Hasil Jatidiri Karir -->
            <HasilJatidiriKarir v-if="pageType == 'Hasil Tes Jatidiri Karir'" :siswaKarirData="siswaKarirData" />

            <!-- Hasil MMS -->
            <HasilMMS v-if="pageType == 'Hasil Tes Mental Maintenance Self-Check (MMS)' && mmsData" :data="mmsData" />

            <!-- Hasil MAP -->
            <HasilMAP v-if="pageType == 'Hasil Tes Motivation for Academic & Professional (MAP)' && mapData" :data="mapData" />

            <!-- Hasil LBC -->
            <HasilLBC v-if="pageType == 'Hasil Tes Learning Barriers Check (LBC)' && lbcData" :data="lbcData" />

            <!-- Hasil BRI -->
            <HasilBRI v-if="pageType == 'Hasil Tes Burnout & Resilience Index (BRI)' && briData" :data="briData" />

            <!-- Hasil CRS -->
            <HasilCRS v-if="pageType == 'Hasil Tes Clinical Readiness Scale (CRS)' && crsData" :data="crsData" />
          </div>
        </div>
      </div>
    </section>
  </Layout>
</template>

<script setup>
import Layout from "@/Layout/Kepsek/Layout.vue";
import { PhX, PhMagnifyingGlass } from "@phosphor-icons/vue";
import initAPI from "@/api/api";
import Cookies from "js-cookie";
import { ref, onMounted, watch, computed, onBeforeMount } from "vue";
import Swal from "sweetalert2";
import PersonalInfo from "@/components/staffs/DetailSiswa/PersonalInfo.vue";
import HasilGIM from "@/components/staffs/DetailSiswa/HasilGIM.vue";
import HasilAssessment from "@/components/staffs/DetailSiswa/HasilAssessment.vue";
import HasilIQ from "@/components/staffs/DetailSiswa/HasilIQ.vue";
import HasilCPM from "@/components/staffs/DetailSiswa/HasilCPM.vue";
import HasilBakat from "@/components/staffs/DetailSiswa/HasilBakat.vue";
import HasilKendali from "@/components/staffs/DetailSiswa/HasilKendali.vue";
import HasilBahagia from "@/components/staffs/DetailSiswa/HasilBahagia.vue";
import HasilAnxiety from "@/components/staffs/DetailSiswa/HasilAnxiety.vue";
import HasilStres from "@/components/staffs/DetailSiswa/HasilStres.vue";
import HasilMental from "@/components/staffs/DetailSiswa/HasilMental.vue";
import HasilQ1 from "@/components/staffs/DetailSiswa/HasilQ1.vue";
import HasilQ2 from "@/components/staffs/DetailSiswa/HasilQ2.vue";
import HasilPotensi from "@/components/staffs/DetailSiswa/HasilPotensi.vue";
import { useRoute, useRouter } from "vue-router";
import HasilJatidiriCerdas from "../../../../components/staffs/DetailSiswa/HasilJatidiriCerdas.vue";
import HasilJatidiriKarir from "../../../../components/staffs/DetailSiswa/HasilJatidiriKarir.vue";
import HasilMMS from "../../../../components/staffs/DetailSiswa/HasilMMS.vue";
import HasilMAP from "../../../../components/staffs/DetailSiswa/HasilMAP.vue";
import HasilLBC from "../../../../components/staffs/DetailSiswa/HasilLBC.vue";
import HasilBRI from "../../../../components/staffs/DetailSiswa/HasilBRI.vue";
import HasilCRS from "../../../../components/staffs/DetailSiswa/HasilCRS.vue";

const sidebarItems = computed(() => {
  const items = [
    {
      image: new URL('@/assets/icons/profile-siswa.svg', import.meta.url).href,
      text: 'Profile Pengguna',
      show: true // selalu tampil
    },
    {
      image: new URL('@/assets/icons/tes-gim.svg', import.meta.url).href,
      text: 'Hasil Tes Jatidiri Sejati',
      show: true
    },
    {
      image: new URL('@/assets/icons/tes-assesment.svg', import.meta.url).href,
      text: 'Hasil Tes Jatidiri Belajar',
      show: true
    },
    {
      image: new URL('@/assets/icons/tes-iq.svg', import.meta.url).href,
      text: 'Hasil Tes Jatidiri Cerdas',
      show: true
    },
    {
      image: new URL('@/assets/icons/tes-cpm.svg', import.meta.url).href,
      text: 'Hasil Tes CPM',
      show: true
    },
    {
      image: new URL('@/assets/icons/test-rmib.svg', import.meta.url).href,
      text: 'Hasil Tes Jatidiri Bakat',
      show: true
    },
    {
      image: new URL('@/assets/icons/test-iaa.svg', import.meta.url).href,
      text: 'Hasil Tes Jatidiri Kendali',
      show: true
    },
    {
      image: new URL('@/assets/icons/tes-assesment.svg', import.meta.url).href,
      text: 'Hasil Tes Jatidiri Bahagia',
      show: true
    },
    {
      image: new URL('@/assets/icons/tes-assesment.svg', import.meta.url).href,
      text: 'Hasil Tes Jatidiri Anxiety',
      show: true
    },
    {
      image: new URL('@/assets/icons/tes-assesment.svg', import.meta.url).href,
      text: 'Hasil Tes Jatidiri Stress',
      show: true
    },
    {
      image: new URL('@/assets/icons/tes-assesment.svg', import.meta.url).href,
      text: 'Hasil Tes Jatidiri Kesehatan Mental',
      show: true
    },
    {
      image: new URL('@/assets/icons/tes-assesment.svg', import.meta.url).href,
      text: 'Hasil Tes Jatidiri Q1',
      show: true
    },
    {
      image: new URL('@/assets/icons/tes-assesment.svg', import.meta.url).href,
      text: 'Hasil Tes Jatidiri Q2',
      show: true
    },
    {
      image: new URL('@/assets/icons/tes-assesment.svg', import.meta.url).href,
      text: 'Hasil Tes Jatidiri Potensi',
      show: true
    },
    {
      image: new URL('@/assets/icons/tes-assesment.svg', import.meta.url).href,
      text: 'Hasil Tes Jatidiri Cerdas Dewasa',
      show: true
    },
    {
      image: new URL('@/assets/icons/tes-assesment.svg', import.meta.url).href,
      text: 'Hasil Tes Jatidiri Karir',
      show: true
    },
    {
      image: new URL('@/assets/icons/tes-assesment.svg', import.meta.url).href,
      text: 'Hasil Tes Mental Maintenance Self-Check (MMS)',
      show: true
    },
    {
      image: new URL('@/assets/icons/tes-assesment.svg', import.meta.url).href,
      text: 'Hasil Tes Motivation for Academic & Professional (MAP)',
      show: true
    },
    {
      image: new URL('@/assets/icons/tes-assesment.svg', import.meta.url).href,
      text: 'Hasil Tes Learning Barriers Check (LBC)',
      show: true
    },
    {
      image: new URL('@/assets/icons/tes-assesment.svg', import.meta.url).href,
      text: 'Hasil Tes Burnout & Resilience Index (BRI)',
      show: true
    },
    {
      image: new URL('@/assets/icons/tes-assesment.svg', import.meta.url).href,
      text: 'Hasil Tes Clinical Readiness Scale (CRS)',
      show: true
    },
  ]

  return items.filter(item => item.show)
})

const filteredSidebarItems = computed(() => {
  const institutionType = JSON.parse(localStorage.getItem("userData")).staff
    .institutions.type;

  const sekolahId = siswaDatas.value?.institutions?.id;

  const khususSekolah215397 = [
    'Hasil Tes Jatidiri Cerdas Dewasa',
    'Hasil Tes Jatidiri Karir',
    'Hasil Tes Jatidiri Belajar',
    'Hasil Tes Jatidiri Bakat',
    'Hasil Tes Jatidiri Potensi'
  ];

  const FkUnjani = [
    'Profile Pengguna',
    'Hasil Tes Mental Maintenance Self-Check (MMS)',
    'Hasil Tes Motivation for Academic & Professional (MAP)',
    'Hasil Tes Learning Barriers Check (LBC)',
    'Hasil Tes Burnout & Resilience Index (BRI)',
    'Hasil Tes Clinical Readiness Scale (CRS)'
  ];

  return sidebarItems.value
    // Filter yang datanya ada
    .filter(item => item.show)
    // Filter tambahan berdasarkan institutionType
    .filter(item => {
      if (["SMP", "SMK", "SMA"].includes(institutionType)) {
        return item.text !== "Hasil Tes CPM";
      } else if (["TK", "SD"].includes(institutionType)) {
        return item.text !== "Hasil Tes IQ";
      }
      return true;
    })
    // Filter khusus untuk sekolah ID 215397
    .filter(item => {
      // Jika sekolah ID adalah 215397, hanya tampilkan tes yang diizinkan
      if (sekolahId === 215397) {
        return khususSekolah215397.includes(item.text);
      }
      if (sekolahId === 215401) {
        return FkUnjani.includes(item.text);
      }
      // Untuk sekolah lain, tampilkan semua
      return true;
    });
});

const selectedItemIndex = ref(null);
const pageType = ref("Profile Pengguna");

const selectItem = (index, type) => {
  // console.log(`diplih`, index)
  selectedItemIndex.value = index;
  pageType.value = type;
};

const route = useRoute();
const router = useRouter();

const siswaId = ref("");
const sekolahId = ref('');
const siswaDatas = ref("");
const siswaKarirData = ref(null);
const siswaCerdasData = ref(null);
const mmsData = ref(null);
const mapData = ref(null);
const lbcData = ref(null);
const briData = ref(null);
const crsData = ref(null);

const isValidStudentId = (id) => {
  return !isNaN(id) && Number.isInteger(+id) && +id > 0;
};

const getDataSiswa = async () => {
  try {
    const token = Cookies.get("token");
    const response = await initAPI(
      "get",
      `customers?id=${siswaId.value}`,
      null,
      token
    );

    siswaDatas.value = response.data.data[0];
    sekolahId.value = response.data.data[0].institutions.id
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "Terjadi error saat mengambil data siswa.",
      showConfirmButton: false,
      timer: 2000,
    });
  }
};

const getDataCerdasSiswa = async () => {
  try {
    const token = Cookies.get("token");
    const response = await initAPI(
      "get",
      `customers/ist?customer_id=${siswaId.value}`,
      null,
      token
    );

    siswaCerdasData.value = response.data.data;
  } catch (error) {
    siswaCerdasData.value = null
  }
};

const getDataKarirSiswa = async () => {
  try {
    const token = Cookies.get("token");
    const response = await initAPI(
      "get",
      `customers/karier?customer_id=${siswaId.value}`,
      null,
      token
    );

    siswaKarirData.value = response.data.data;
  } catch (error) {
    siswaKarirData.value = null
  }
};

const getBRITangguh = async () => {
  try {
    const token = Cookies.get("token");
    const response = await initAPI(
      "get",
      `customers/bri/customer?customerId=${siswaId.value}`,
      null,
      token
    );

    briData.value = response.data.data;
  } catch (error) {
    briData.value = null
  }
};

const getMMSTangguh = async () => {
  try {
    const token = Cookies.get("token");
    const response = await initAPI(
      "get",
      `customers/mms/customer?customerId=${siswaId.value}`,
      null,
      token
    );

    mmsData.value = response.data.data;
  } catch (error) {
    mmsData.value = null
  }
};

const getMAPTangguh = async () => {
  try {
    const token = Cookies.get("token");
    const response = await initAPI(
      "get",
      `customers/map/customer?customerId=${siswaId.value}`,
      null,
      token
    );

    mapData.value = response.data.data;
  } catch (error) {
    mapData.value = null
  }
};

const getLBCTangguh = async () => {
  try {
    const token = Cookies.get("token");
    const response = await initAPI(
      "get",
      `customers/lbc/customer?customerId=${siswaId.value}`,
      null,
      token
    );

    lbcData.value = response.data.data;
  } catch (error) {
    lbcData.value = null
  }
};

const getCRSTangguh = async () => {
  try {
    const token = Cookies.get("token");
    const response = await initAPI(
      "get",
      `customers/crs/customer?customerId=${siswaId.value}`,
      null,
      token
    );

    crsData.value = response.data.data;
  } catch (error) {
    crsData.value = null
  }
};

const baseUrl = import.meta.env.VITE_API_BASE_URL;

const downloadFile = async (fileUrl) => {
  // console.log(`aisia`, fileUrl)
  const imageUrl = baseUrl + "open/results/" + fileUrl;
  // console.log(imageUrl)

  const response = await fetch(imageUrl);
  const blob = await response.blob();

  const url = window.URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.target = "_blank";
  link.download = fileUrl;

  link.click();

  window.URL.revokeObjectURL(url);
};

onBeforeMount(() => {
  const encodedStudentId = route.query.student_id;
  if (!encodedStudentId) {
    router.push({ name: "staff.views.list_siswa" });
    return;
  }

  try {
    const decodedId = atob(encodedStudentId); // Menggunakan Base64 decode

    // Validasi: Pastikan ID adalah angka
    if (!isValidStudentId(decodedId)) {
      router.push({ name: "staff.views.list_siswa" });
      return;
    }

    siswaId.value = decodedId;
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "Terjadi error saat decoded data siswa.",
      showConfirmButton: false,
      timer: 2000,
    });

    router.push({ name: "staff.views.list_siswa" });
  }
});

onMounted(async () => {
  await getDataSiswa();
  await getDataKarirSiswa();
  await getDataCerdasSiswa();
  await getBRITangguh();
  await getMMSTangguh();
  await getMAPTangguh();
  await getLBCTangguh();
  await getCRSTangguh();

  // Set selected index berdasarkan pageType awal
  const index = filteredSidebarItems.value.findIndex(
    (item) => item.text === pageType.value
  );
  if (index !== -1) {
    selectedItemIndex.value = index;
  }
});
</script>
