<template>
  <div>
    <!-- Tombol untuk membuka modal -->
    <button
      @click="showCard = true"
      class="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
    >
      Lihat Kartu
    </button>

    <!-- Modal -->
    <div
      v-if="showCard"
      class="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black bg-opacity-60 p-4"
    >
      <!-- Tombol kontrol di atas kartu -->
      <div class="mb-4 w-full flex justify-between max-w-[800px]">
        <button
          @click="showCard = false"
          class="bg-white text-black px-3 py-1 rounded hover:bg-red-500 hover:text-white transition"
        >
          ✕ Tutup
        </button>
        <button
          @click="downloadPDF"
          class="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 transition"
        >
          Unduh PDF
        </button>
      </div>

      <!-- Kartu yang akan diunduh -->
      <div
        ref="pdfContent"
        class="font-sans w-[1000px] bg-gradient-to-br rounded-2xl shadow-2xl p-8 text-white"
        :style="bgStyleDepan"
      >
        <!-- ... isi kartu seperti sebelumnya ... -->
        <header class="flex items-start justify-between pb-4 border-b border-white/20">
          <div class="flex items-center gap-4">
            <img
              src="@/assets/icons/logo.png"
              alt="Logo MGBK"
              class="w-16 h-16 rounded-full"
            />
            <div>
              <h1 class="text-lg font-bold">Majelis Guru Bimbingan dan Konseling Indonesia</h1>
              <p class="text-sm text-gray-300 italic">Indonesian Guidance and Counseling Teachers Council</p>
            </div>
          </div>
          <div class="text-right">
            <p class="text-2xl font-bold">{{ userLicese.kode_satuan ?? '-' }}</p>
            <p class="text-xs text-gray-300">Kode Jenjang</p>
          </div>
        </header>

        <div class="text-center my-4">
          <span class="px-6 py-2 text-xl font-semibold rounded-md">
            KARTU TANDA ANGGOTA AKTIF
          </span>
        </div>

        <div class="mt-10">
          <main class="grid grid-cols-3 gap-8 py-5">
            <div class="flex flex-col items-center justify-between col-span-1">
              <img
              v-if="(userData.bk || userData.customer)?.profile != null"
  :src="getImageUrl((userData.bk || userData.customer)?.profile)"
  @error="handleImageError"
  class="w-[160px] h-[210px] object-cover rounded-md shadow-md outline outline-1 outline-white hidden md:block"
  alt="profile"
/>
              <img
                v-else
                :src="
                  (userData.bk || userData.customer)?.profile
                    ? `${baseURL}/storage/${(userData.bk || userData.customer)?.profile}`
                    : profileDefault
                "
                class="w-[160px] h-[210px] object-cover rounded-md shadow-md outline outline-1 outline-white hidden md:block"
                alt="profile"
              />
            </div>
  
            <div class="col-span-2 relative">
              <div class="space-y-3 text-md">
                <div class="flex"v-if="userLicese">
                  <span class="w-40 font-light">Nomor Anggota</span>
                  <span class="font-light">:</span>
                  <span class="ml-4 font-semibold">{{ userLicese.unix_number ?? "Belum Terverifikasi" }}</span>
                </div>
                <div class="flex" v-if="userData?.customer">
                  <span class="w-40 font-light">Nama</span>
                  <span class="font-light">:</span>
                  <span class="ml-4 font-bold">{{ userData.customer.first_name }}
                    {{ userData.customer.last_name }}</span>
                </div>
                <div class="flex" v-if="userLicese">
                  <span class="w-40 font-light">Instansi</span>
                  <span class="font-light">:</span>
                  <span class="ml-4 font-semibold">{{ userLicese.institution.name }}</span>
                </div>
                <div class="flex" v-if="userLicese">
                  <span class="w-40 font-light">Wilayah Kerja</span>
                  <span class="font-light">:</span>
                  <span class="ml-4 font-semibold">{{ userLicese.institution.region }}</span>
                </div>
                <div class="flex" v-if="userLicese">
                  <span class="w-40 font-light">Mulai Berlaku</span>
                  <span class="font-light">:</span>
                  <span class="ml-4 font-semibold">{{
                        userLicese.end_date
                          ? new Date(userLicese.start_date).toLocaleDateString(
                              "id-ID"
                            )
                          : "-"
                      }}</span>
                </div>
                <div class="flex" v-if="userLicese">
                  <span class="w-40 font-light">Berlaku Hingga</span>
                  <span class="font-light">:</span>
                  <span class="ml-4 font-semibold">{{
                        userLicese.end_date
                          ? new Date(userLicese.end_date).toLocaleDateString(
                              "id-ID"
                            )
                          : "-"
                      }}</span>
                </div>
              </div>
            </div>
          </main>
        </div>
        <div class="flex items-center justify-between mt-5">

          <div class="flex items-center justify-center gap-5 p-3 bg-white rounded-xl text-gray-900">
            <div class="w-20 h-20 bg-gray-300 rounded-xl flex items-center justify-center">
              QR Code
            </div>
            <div class="flex flex-col gap-3">
              <b>Pindai QR <br> Untuk <br> Otentikasi</b>
            </div>
          </div>
          
            <div class="text-xs">
              <div class="relative">
                <p class="text-base">Pengurus Besar MGBK Indonesia</p>
                <p class="text-base">Ketua Umum,</p>
                <div class="h-20 flex items-center -left-24 -bottom-3 z-50 relative">
                  <img src="@/assets/icons/cap-mgbki.svg" class="w-40 h-40" alt="ttd">
                  <img src="@/assets/icons/ttd-mgbki.svg" class="w-40 h-40 -m-16" alt="ttd">
                </div>
                <p class="font-bold">Budhy Ramadhany, S.Pd., M.Pd,.</p>
                <p class="text-sm">NTA: 230741012100001</p>
              </div>
            </div>
          
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import html2pdf from 'html2pdf.js'
import { ref, onMounted, onBeforeMount, computed } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import Swal from "sweetalert2";
import initAPI from "@/api/api";
import bgDepan from "@/assets/img/bg-kta-depan.svg";

const bgStyleDepan = computed(() => ({
  backgroundImage: `url(${bgDepan})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat'
}))

const showCard = ref(false)
const pdfContent = ref(null)

const downloadPDF = async () => {
  // Tunggu hingga semua gambar dimuat
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  const element = pdfContent.value;
  const opt = {
    margin: 0,
    filename: 'kartu-anggota-mgbk.pdf',
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { 
      scale: 2,
      useCORS: true, // Izinkan CORS untuk gambar
      logging: true, // Aktifkan logging untuk debug
    },
    jsPDF: { unit: 'mm', format: 'a4', orientation: 'landscape' },
  };
  
  html2pdf().set(opt).from(element).save();
}

const userData = JSON.parse(localStorage.getItem("userData"));
const baseURL =
  import.meta.env.VITE_API_BASE_URL_STORAGE || "http://127.0.0.1:8000";

const loading = ref(true);
const store = useStore();
const userLicese = ref(null);
const token = Cookies.get("token");


const getLicense = async () => {
  try {
    const formData = new FormData();
    formData.append("refresh_user", "true");

    const updatedCustomer = await initAPI("post", "login", formData, token);

    const userId = updatedCustomer.data.customer.user_id;

    let licenseResponse; // ✅ deklarasi di luar if-else
    if (userData.user.role === "bk") {
      licenseResponse = await initAPI(
        "get",
        `bk/license/${userId}`,
        null,
        token
      );
    } else {
      licenseResponse = await initAPI(
        "get",
        `bk/license-admin/${userId}`,
        null,
        token
      );
    }

    userLicese.value = licenseResponse.data.data;

    console.log("License data:", userLicese.value);
  } catch (error) {
    console.error("Failed to get license:", error);
    userLicese.value = null;
  } finally {
    loading.value = false;
  }
};

// Dalam script
const getImageUrl = (profilePath) => {
  if (!profilePath) return profileDefault;
  return `${baseURL}/storage/${profilePath}`;
}

const handleImageError = (e) => {
  e.target.src = profileDefault;
}

onBeforeMount(async () => {
  await getLicense();
});

onMounted(() => {
  //cek aya token teu
  if (token) {
    const decodedToken = jwtDecode(token);
  } else {
    localStorage.clear();
    router.push("/login");
  }
});
</script>
