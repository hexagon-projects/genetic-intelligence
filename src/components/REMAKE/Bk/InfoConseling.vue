<template>
  <div class="bg-gray-50 p-5 rounded-lg">
    <h1 class="font-sora text-lg font-semibold">Basic Information Conseling</h1>
    <div class="my-5">
      <div class="flex flex-col mb-3">
        <span class="font-semibold">Title</span>
        <span>{{ conseling.title }}</span>
      </div>
      <hr class="my-3" />
      <div class="flex flex-col mb-3">
        <span class="font-semibold">Description</span>
        <span>{{ conseling.description }}</span>
      </div>
      <hr class="my-3" />
      <div class="grid grid-cols-1 md:grid-cols-3 gap-5 mb-3">
        <div class="flex flex-col">
          <span class="font-semibold">Conseling Date</span>
          <span>{{ conseling.conseling_date }}</span>
        </div>
        <div class="flex flex-col">
          <span class="font-semibold">Placment</span>
          <span>{{ conseling.placment }}</span>
        </div>
        <div class="flex flex-col">
          <span class="font-semibold">Status</span>
          <span>{{ conseling.status }}</span>
        </div>
      </div>
      <hr class="my-3" />
      <div class="grid grid-cols-1 md:grid-cols-3 gap-5 mb-3">
        <div class="flex flex-col">
          <span class="font-semibold">Type Conseling</span>
          <span>{{ conseling.type_conseling }}</span>
        </div>
        <div class="flex flex-col">
          <span class="font-semibold">Submission Date</span>
          <span>{{ conseling.submission_date }}</span>
        </div>
        <div class="flex flex-col">
          <span class="font-semibold">Conseling Duration</span>
          <span>{{ conseling.conseling_time ?? "-" }}</span>
        </div>
      </div>
      <hr class="my-3" />
    </div>
  </div>

  <div class="bg-gray-50 p-5 rounded-lg mt-10">
    <h1 class="font-sora font-semibold text-xl">Approvel Conseling</h1>
    <hr class="my-3" />
    <div class="grid grid-cols-1 md:grid-cols-3 gap-5">
      <div class="flex flex-col gap-2 w-full">
        <label for="">Conseling Date</label>
        <input
          type="date"
          class="border border-gray-300 px-3 py-2 rounded-md"
          v-model="conseling.conseling_date"
        />
      </div>
      <div class="flex flex-col gap-2 w-full">
        <label for="">Placement</label>
        <input
          type="text"
          class="border border-gray-300 px-3 py-2 rounded-md"
          placeholder="Placement"
          v-model="conseling.placment"
        />
      </div>
      <div class="flex flex-col gap-2 w-full">
        <label for="">Type Konseling</label>
        <select
          name=""
          class="border border-gray-300 px-3 py-2 rounded-md"
          v-model="conseling.type_conseling"
          id=""
        >
          <option value="individu">individu</option>
          <option value="Conseling Individu">Conseling Individu</option>
          <option value="Conseling Kelompok">Conseling Kelompok</option>
          <option value="Bimbingan Kelompok">Bimbingan Kelompok</option>
          <option value="Bimbingan Kalsikal">Bimbingan Kalsikal</option>
          <option value="Bimbingan Kelas Besar">Bimbingan Kelas Besar</option>
          <option value="Konsultasi">Konsultasi</option>
          <option value="Kolaborasi">Kolaborasi</option>
          <option value="Alih Tangan Kasus">Alih Tangan Kasus</option>
          <option value="Kunjungan Rumah">Kunjungan Rumah</option>
          <option value="Advokasi">Advokasi</option>
          <option value="Konferensi Kasus">Konferensi Kasus</option>
        </select>
      </div>
    </div>
    <hr class="my-3" />
    <div class="flex items-center justify-center mt-5">
      <button
        class="bg-biru text-white px-5 py-2 rounded-lg flex gap-2 items-center"
        @click="approvelConseling(conseling.id)"
        v-if="nextStatusLabel !== 'Selesai'"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          class="bi bi-folder-plus"
          viewBox="0 0 16 16"
        >
          <path
            d="m.5 3 .04.87a2 2 0 0 0-.342 1.311l.637 7A2 2 0 0 0 2.826 14H9v-1H2.826a1 1 0 0 1-.995-.91l-.637-7A1 1 0 0 1 2.19 4h11.62a1 1 0 0 1 .996 1.09L14.54 8h1.005l.256-2.819A2 2 0 0 0 13.81 3H9.828a2 2 0 0 1-1.414-.586l-.828-.828A2 2 0 0 0 6.172 1H2.5a2 2 0 0 0-2 2m5.672-1a1 1 0 0 1 .707.293L7.586 3H2.19q-.362.002-.683.12L1.5 2.98a1 1 0 0 1 1-.98z"
          />
          <path
            d="M13.5 9a.5.5 0 0 1 .5.5V11h1.5a.5.5 0 1 1 0 1H14v1.5a.5.5 0 1 1-1 0V12h-1.5a.5.5 0 0 1 0-1H13V9.5a.5.5 0 0 1 .5-.5"
          />
        </svg>
        <span>{{ nextStatusLabel }}</span>
      </button>
      <button
        class="bg-white text-red-500 hover:bg-red-500 hover:text-white border border-red-500 px-5 py-2 rounded-lg ml-3 items-center flex gap-2"
        v-if="conseling.status === 'pengajuan'"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          class="bi bi-x-circle"
          viewBox="0 0 16 16"
        >
          <path
            d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"
          />
          <path
            d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"
          />
        </svg>
        <span>Decline</span>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from "vue";
import initAPI from "@/api/api";
import Swal from "sweetalert2";
import Cookies from "js-cookie";

const props = defineProps({
  conseling: {
    type: Object,
    required: true,
  },
});
// Buat salinan reaktif agar bisa diedit dengan v-model
const conseling = reactive({ ...props.conseling });

const nextStatusLabel = computed(() => {
  if (props.conseling.status === "pengajuan") return "Setujui (Approved)";
  if (props.conseling.status === "approved") return "Mulai Konseling";
  if (props.conseling.status === "conseling") return "Selesaikan";
  return "Selesai";
});
const isloading = ref(false);

const approvelConseling = async (id) => {
  const token = Cookies.get("token");

  const conseling = props.conseling; // Ambil dari props
  let nextStatus = "";

  if (conseling.status === "pengajuan") {
    nextStatus = "approved";
  } else if (conseling.status === "approved") {
    nextStatus = "conseling";
  } else if (conseling.status === "conseling") {
    nextStatus = "selesai";
  } else {
    Swal.fire("Error", "Status tidak valid", "error");
    return;
  }

  const confirm = await Swal.fire({
    icon: "question",
    title: "Konfirmasi",
    text: `Apakah Anda yakin ingin mengubah status menjadi "${nextStatus}"?`,
    showCancelButton: true,
    confirmButtonText: "Ya, Lanjutkan",
    cancelButtonText: "Batal",
  });

  if (!confirm.isConfirmed) return;

  try {
    isloading.value = true;

    const data = {
      conseling_date: conseling.conseling_date,
      placment: conseling.placment,
      type_conseling: conseling.type_conseling,
      status: nextStatus,
    };

    const response = await initAPI("put", `conseling/${id}`, data, token);

    Swal.fire({
      icon: "success",
      title: "Berhasil",
      text: response.data.message,
      showConfirmButton: false,
      timer: 1500,
    }).then(() => {
      window.location.reload(); // <--- ini yang kamu maksud
    });
  } catch (error) {
    console.log(error);
    Swal.fire({
      icon: "error",
      title: "Gagal",
      text: error.response?.data?.message || "Terjadi kesalahan",
      showConfirmButton: false,
      timer: 2000,
    });
  } finally {
    isloading.value = false;
  }
};

</script>
