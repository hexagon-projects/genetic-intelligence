<template>
  <div
    v-if="isOpen"
    class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-5"
  >
    <div class="bg-white rounded-xl p-6 max-w-xl w-full relative">
      <!-- Tombol Close -->
      <button
        class="absolute top-3 right-3 bg-biru/30 text-biru rounded-full hover:text-biru/90 text-xl"
        @click="closeModal"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          class="bi bi-x w-7"
          viewBox="0 0 16 16"
        >
          <path
            d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"
          />
        </svg>
      </button>

      <!-- Header -->
      <h1 class="text-lg font-semibold mb-4">Syarat & Ketentuan</h1>

      <!-- Isi Term -->
      <p class="text-sm text-gray-800 mb-4 leading-relaxed">
        Dengan ini menyatakan permohonan mendaftarkan diri menjadi Anggota
        Majelis Guru Bimbingan dan Konseling Indonesia (MGBKI), dan untuk itu
        saya bersedia melaksanakan ketentuan sebagai berikut:
      </p>

      <!-- Checkbox List -->
      <ul class="space-y-3 mb-6">
        <li
          class="flex items-start gap-2"
          v-for="(item, index) in checkItems"
          :key="index"
        >
          <input type="checkbox" v-model="item.checked" />
          <span class="text-sm">{{ item.label }}</span>
        </li>
      </ul>

      <p class="text-sm text-gray-700 mb-6">
        Demikian formulir pendaftaran ini saya tandatangani untuk dapat
        dipergunakan sebagaimana mestinya. Atas bantuan dan perkenannya
        diucapkan terima kasih.
      </p>

      <!-- Tombol -->
      <div class="flex justify-center gap-5">
        <button
          class="bg-white border border-biru text-biru px-6 py-2 rounded-full hover:bg-biru hover:text-white font-bold"
          @click="closeModal"
        >
          Kembali
        </button>
        <button
          v-if="!isLoading"
          class="px-6 py-2 rounded-full font-bold transition"
          :class="{
            'bg-biru text-white hover:bg-biru/80 cursor-pointer': allChecked,
            'bg-gray-400 text-white cursor-not-allowed': !allChecked,
          }"
          :disabled="!allChecked"
          @click="submitPaymnat"
        >
          Ya, Saya Setuju!
        </button>
        <button
          v-if="isLoading"
          class="px-6 py-2 rounded-full font-bold transition flex gap-2 items-center"
          :class="{
            'bg-biru text-white hover:bg-biru/80 cursor-pointer': allChecked,
            'bg-gray-400 text-white cursor-not-allowed': !allChecked,
          }"
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
          <span>Loading...</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineEmits, ref, computed } from "vue";
import Swal from "sweetalert2";
import initAPI from "@/api/api";
import Cookies from "js-cookie";
import { useRouter } from "vue-router";

const router = useRouter();
const emit = defineEmits(["close", "submit"]);
const isOpen = ref(true);

// Checkbox items dengan status awal belum dicentang
const checkItems = ref([
  {
    label:
      "Bersedia berperan aktif dan bertanggung jawab serta berintegritas dalam Organisasi Majelis Guru Bimbingan dan Konseling Indonesia (MGBKI).",
    checked: false,
  },
  {
    label:
      "Bersedia tunduk dan patuh terhadap AD/ART serta peraturan dari Majelis Guru Bimbingan dan Konseling Indonesia (MGBKI).",
    checked: false,
  },
  {
    label:
      "Bersedia menjunjung tinggi Kode Etik Profesi Guru Indonesia dan Kode Etik Guru Bimbingan dan Konseling Indonesia sesuai dengan ketentuan yang berlaku.",
    checked: false,
  },
  {
    label:
      "Bersedia melaksanakan dan berperan aktif dalam setiap kegiatan dan/atau tugas lain yang dibebankan oleh Organisasi sesuai TUPOKSI saya.",
    checked: false,
  },
  {
    label:
      "Bersedia menjaga kehormatan dan nama baik Organisasi serta menjaga rahasia Organisasi.",
    checked: false,
  },
]);

const allChecked = computed(() =>
  checkItems.value.every((item) => item.checked)
);

const isLoading = ref(false);

const closeModal = () => emit("close");
const submitPaymnat = () => {
  try {
    isLoading.value = true;
    const paymant_type = "kta";
    router.push({
        name: "bk.views.paymant",
        query: { paymant_type: paymant_type },
      });
    
      emit("close");
    
  } catch (error) {
    console.error("Gagal update:", error);
  } finally {
    isLoading.value = false;
  }
}

const submit = async () => {
  const token = Cookies.get("token");
  if (token) {
    try {
      isLoading.value = true;

      const response = await initAPI(
        "post",
        `verification/pengajuan`,
        null,
        token
      );

      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Berhasil",
          text: response.data.message,
          showConfirmButton: false,
          timer: 2000,
        });

        setTimeout(() => {
          window.location.reload(); // ✅ Refresh halaman setelah sukses
        }, 2000); // Tunggu Swal selesai
      }

      emit("close");
    } catch (error) {
      console.error("Gagal update:", error);
      Swal.fire({
        icon: "error",
        title: "Gagal",
        text: "Terjadi kesalahan saat.",
        timer: 2000,
        showConfirmButton: false,
      });
    } finally {
      isLoading.value = false;
    }
  } else {
    localStorage.clear();
    router.push("/login");
  }
};

</script>
