<template>
  <div class="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
    <div
      class="bg-white rounded-2xl w-full max-w-4xl p-6 font-sora relative shadow-xl"
    >
      <!-- Tombol Tutup -->
      <button
        @click="closeModal"
        class="absolute top-4 right-4 text-gray-400 hover:text-black text-xl"
      >
        &times;
      </button>

      <!-- Tabs -->
      <div class="flex border-b border-gray-200 mb-4">
        <button
          class="py-2 px-4 font-semibold"
          :class="
            activeTab === 'id'
              ? 'text-blue-600 border-b-2 border-blue-600'
              : 'text-gray-400'
          "
          @click="activeTab = 'id'"
        >
          Request ID
        </button>
        <button
          class="py-2 px-4 font-semibold"
          :class="
            activeTab === 'school'
              ? 'text-blue-600 border-b-2 border-blue-600'
              : 'text-gray-400'
          "
          @click="activeTab = 'school'"
        >
          Schools Request
        </button>
      </div>

      <!-- Tab Content -->
      <div v-if="activeTab === 'id'">
        <h2 class="text-lg font-semibold mb-2 text-center">
          Want to approve this ID Card request?
        </h2>
        <p class="text-sm text-gray-600 mb-4 text-center">
          Once approved, the BK teacher will officially join as a member of the
          MGBK.
        </p>

        <!-- Kartu -->
        <div
          class="w-full md:w-1/2 mx-auto h-full rounded-3xl p-5 bg-biru text-white text-xs"
        >
          <img src="@/assets/img/mgbk.png" class="w-10" alt="mgbk" />

          <div class="flex flex-col gap-2 mt-5">
            <!-- unix_number -->
            <strong class="font-sora md:text-2xl my-3">
              <template v-if="card">
                <!-- {{ card.unix_number ?? "Belum Terverivikasi" }} -->
                <input
                  type="text"
                  v-model="unixNumber"
                  class="bg-gray-100 bg-opacity-20 border-0 focus:border-0 focus-within:outline-0 font-roboto font-thin p-1"
                  placeholder="Masukan Kode Anggota"
                />
              </template>
              <div
                v-else
                class="w-40 h-6 bg-white/20 rounded animate-pulse"
              ></div>
            </strong>

            <div class="flex w-full bg-opacity-10 justify-between items-center">
              <!-- Card Holder Name -->
              <div class="flex flex-col">
                <small>Card Holder Name</small>
                <template v-if="card">
                  <span class="font-sora">
                    {{ card.first_name ?? "-" }}
                    {{ card.last_name ?? "-" }}
                  </span>
                </template>
                <div
                  v-else
                  class="w-32 h-4 bg-white/20 rounded animate-pulse mt-1"
                ></div>
              </div>

              <!-- Expired Date -->
              <div class="flex flex-col">
                <small>Expired Date</small>
                <template v-if="card">
                  <span class="font-sora">
                    <input
                      type="date"
                      v-model="expiredDate"
                      class="bg-gray-100 bg-opacity-20 border-0 focus:border-0 focus-within:outline-0 font-roboto font-thin p-1"
                    />
                  </span>
                </template>
                <div
                  v-else
                  class="w-20 h-4 bg-white/20 rounded animate-pulse mt-1"
                ></div>
              </div>
            </div>
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="mt-6 flex justify-center gap-4">
          <button
            @click="closeModal"
            class="px-6 py-2 border border-red-500 text-red-500 rounded-full"
          >
            Decline
          </button>
          <button
            @click="acceptHandle"
            v-if="!loadingCard"
            class="px-6 py-2 bg-blue-600 text-white rounded-full"
          >
            Accept
          </button>
          <button
            @click="acceptHandle"
            v-if="loadingCard"
            class="px-6 py-2 bg-blue-600 text-white rounded-full"
          >
            <svg
              aria-hidden="true"
              role="status"
              class="inline mr-3 w-4 h-4 text-white animate-spin"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="#E5E7EB"
              ></path>
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentColor"
              ></path>
            </svg>
            Loading...
          </button>
        </div>
      </div>

      <!-- Sekolah -->
      <div v-if="activeTab === 'school'">
        <h2 class="text-lg font-semibold mb-4 text-center">
          Approve this school request now?
        </h2>
        <p class="text-sm text-gray-600 text-center mb-6">
          Upon approval, the BK teacher will be affiliated with the school.
        </p>

        <ul class="space-y-4 max-h-[300px] overflow-auto">
          <li
            v-for="(item, index) in homebases"
            :key="index"
            class="flex justify-between items-center px-4 py-2 bg-gray-50 rounded-md"
          >
            <span>{{ item.institution.name }}</span>
            <div class="flex gap-3 items-center">
              <a
                :href="`${baseURL}/storage/${item.file}`"
                target="_blank"
                rel="noopener noreferrer"
                class="text-blue-500 underline text-sm"
              >
                View Doc
              </a>
              <button class="bg-red-500 text-white p-2 rounded-full" v-if="item.status === 'Sedang Diverifikasi'">
                <svg
                  class="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
              <button class="bg-green-500 text-white p-2 rounded-full" v-if="item.status === 'Sedang Diverifikasi'" @click="acceptSchool(item.id)">
                <svg
                  class="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </button>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, computed } from "vue";
import initAPI from "@/api/api";
import Cookies from "js-cookie";
import Swal from "sweetalert2";
const baseURL = import.meta.env.VITE_API_BASE_URL_STORAGE || 'http://127.0.0.1:8000';

const loadingCard = ref(false);
const loadingHomeBased = ref(false);
const card = ref(null);
const homebases = ref(null);

const activeTab = ref("id");

const props = defineProps({
  id: Number,
});

// Emit untuk kirim event ke parent (Verification.vue)
const emit = defineEmits(["close"]);

const closeModal = () => {
  emit("close");
};

const unixNumber = computed({
  get: () => card.value?.unix_number ?? "",
  set: (val) => {
    if (card.value) {
      card.value.unix_number = val;
    }
  },
});

const expiredDate = computed({
  get: () => {
    const rawDate = card.value?.end_date ?? "";
    return rawDate ? rawDate.slice(0, 10) : ""; // pastikan YYYY-MM-DD
  },
  set: (val) => {
    if (card.value) {
      card.value.end_date = val;
    }
  },
});

const acceptHandle = async () => {
  const token = Cookies.get("token");
  try {
    loadingCard.value = true;
    const formData = new FormData();
    formData.append("unix_number", unixNumber.value);
    formData.append("end_date", expiredDate.value);
    const response = await initAPI(
      "post",
      `verification/license/${props.id}`,
      formData,
      token
    );
    closeModal();
    if (response.status === 200 || response.status === 201) {
      Swal.fire({
        icon: "success",
        title: "Berhasil",
        text: response.data.message,
        timer: 2000,
        showConfirmButton: false,
      });
    }
    window.location.reload(); // ✅ Refresh halaman setelah notifikasi
  } catch (error) {
    console.error(error);
    Swal.fire({
      icon: "error",
      title: "Gagal",
      text: "Terjadi kesalahan saat menyimpan data.",
      timer: 2000,
      showConfirmButton: false,
    });
  } finally {
    loadingCard.value = false;
  }
};

const acceptSchool = async (id) => {
  const token = Cookies.get("token");

  try {
    const response = await initAPI("put", `verification/placement/${id}`, null, token);

    if (response.status === 200 || response.status === 201) {
      Swal.fire({
        icon: "success",
        title: "Berhasil",
        text: response.data.message || "Sekolah berhasil diverifikasi.",
        timer: 2000,
        showConfirmButton: false,
      });

      // Refresh data atau halaman
      window.location.reload();
    }
  } catch (error) {
    console.error(error);
    Swal.fire({
      icon: "error",
      title: "Gagal",
      text: "Terjadi kesalahan saat memverifikasi sekolah.",
    });
  }
};

const getCard = async () => {
  const token = Cookies.get("token");
  if (token) {
    try {
      loadingCard.value = true;
      const response = await initAPI(
        "get",
        `admin-bk/license-admin/${props.id}`,
        null,
        token
      );
      card.value = response.data.data;
    } catch (error) {
      console.error(error);
    } finally {
      loadingCard.value = false;
    }
  } else {
  }
};

const getHomeBase = async () => {
  const token = Cookies.get("token");
  if (token) {
    try {
      loadingHomeBased.value = true;
      const response = await initAPI(
        "get",
        `verification/homebase/${props.id}`,
        null,
        token
      );
      homebases.value = response.data.data;
      console.log("homebase", homebases.value);
    } catch (error) {
      console.error(error);
    } finally {
      loadingHomeBased.value = false;
    }
  } else {
  }
};

onMounted(() => {
  getCard();
  getHomeBase();
});
</script>
