<template>
  <div
    class="hidden lg:block relative w-1/2 top-4 mx-auto shadow-xl rounded-md bg-white"
  >
    <!-- Modal body -->
    <h1 class="font-myFont text-dark text-lg mx-4 pt-4">
      {{ method == "registrasi" ? "Tambah Kode" : "Update Code" }}
    </h1>
    <hr class="mt-4" />

    <div v-if="method == 'registrasi'" class="w-full p-4 flex flex-col gap-2">
      <div class="mb-4">
        <label
          for="nama"
          class="block tracking-wide font-myFont text-dark font-sm mb-2"
        >
          Nama
        </label>
        <input
          v-model="nama"
          id="nama"
          class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-biru"
          type="text"
          placeholder="Nama Code"
        />
      </div>

      <div class="mb-4">
        <label
          for="code"
          class="block tracking-wide font-myFont text-dark font-sm mb-2"
        >
          Code
        </label>
        <input
          v-model="code"
          id="code"
          class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-biru"
          type="text"
          placeholder="Code"
        />
      </div>

      <div class="mb-4">
        <label
          for="diskon"
          class="block tracking-wide font-myFont text-dark font-sm mb-2"
        >
          Diskon
        </label>
        <input
          v-model="diskon"
          id="diskon"
          class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-biru"
          type="text"
          placeholder="Contoh: 50"
        />
      </div>

      <div class="mb-4">
        <label
          for="quantity_hit"
          class="block tracking-wide font-myFont text-dark font-sm mb-2"
        >
          Jumlah Pemakaian
        </label>
        <input
          v-model="quantity_hit"
          id="quantity_hit"
          class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-biru"
          type="text"
          placeholder="Contoh: 10"
        />
      </div>

      <div class="mb-4">
        <label
          for="expired"
          class="block tracking-wide font-myFont text-dark font-sm mb-2"
        >
          Tanggal Kadaluarsa
        </label>
        <input
          v-model="expired"
          id="expired"
          class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-biru"
          type="datetime-local"
        />
      </div>

      <hr class="mt-4" />

      <div class="mb-4">
        <label
          for="expired"
          class="block tracking-wide font-myFont text-dark font-sm mb-2"
        >
          Vocher Code Untuk Assesment
        </label>
        <div class="space-y-3 grid grid-cols-2 gap-1 bg-gray-200 p-3 rounded">
          <label
            class="flex items-center space-x-2"
            v-for="item in assessments?.data || []"
            :key="item.id"
          >
            <input
              type="checkbox"
              class="form-checkbox text-blue-600 h-5 w-5"
              :value="item.type"
              v-model="assessmentsSelected"
            />
            <span class="text-gray-700">{{ item.name }}</span>
          </label>
        </div>
      </div>
    </div>

    <div v-else-if="method == 'update'" class="w-full p-4 flex flex-col gap-2">
      <div class="mb-4">
        <label
          for="diskon"
          class="block tracking-wide font-myFont text-dark font-sm mb-2"
        >
          Diskon
        </label>
        <input
          v-model="diskon"
          id="diskon"
          class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-biru"
          type="text"
          placeholder="Contoh: 50"
        />
      </div>
      <div class="mb-4">
        <label
          for="tambahHitVocher"
          class="block tracking-wide font-myFont text-dark font-sm mb-2"
        >
          Tambah Hit Vocher
        </label>
        <input
          v-model="tambahHitVocher"
          id="tambahHitVocher"
          class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-biru"
          type="text"
          placeholder="Contoh: 5"
        />
      </div>
      <div class="mb-4">
        <label
          for="masaKadaluarsa"
          class="block tracking-wide font-myFont text-dark font-sm mb-2"
        >
          Masa Kadaluarsa
        </label>
        <input
          v-model="masaKadaluarsa"
          id="masaKadaluarsa"
          class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-biru"
          type="datetime-local"
        />
      </div>

      <hr class="mt-4" />

      <div class="mb-4">
        <label
          for="expired"
          class="block tracking-wide font-myFont text-dark font-sm mb-2"
        >
          Vocher Code Untuk Assesment
        </label>
        <div class="space-y-3 grid grid-cols-2 gap-1 bg-gray-200 p-3 rounded">
          <label
            class="flex items-center space-x-2"
            v-for="item in assessments?.data || []"
            :key="item.id"
          >
            <input
              type="checkbox"
              class="form-checkbox text-blue-600 h-5 w-5"
              :value="item.type"
              v-model="assessmentsSelected"
            />
            <span class="text-gray-700">{{ item.name }}</span>
          </label>
        </div>
      </div>
    </div>

    <hr class="pt-4" />
    <!-- Modal footer -->
    <div class="px-4 py-4 flex justify-between items-center space-x-4">
      <button
        @click="toggleModal"
        class="bg-gray-300 font-myFont text-black p-2 rounded-md hover:shadow-lg hover:opacity-80 transition duration-300 ease-in-out"
      >
        Tutup
      </button>
      <button
        @click="tambahKode"
        :disabled="buttonDisabled"
        :class="{ 'bg-gray-600 opacity-80 cursor-not-allowed': buttonDisabled }"
        class="rounded-lg px-4 py-2 bg-biru text-light font-myFont hover:bg-opacity-75 hover:shadow-md"
      >
        Submit
      </button>
    </div>
  </div>

  <div
    class="block lg:hidden relative w-full md:w-1/2 top-4 mx-auto shadow-xl rounded-md bg-white"
  >
    <!-- Modal body -->
    <h1 class="font-myFont text-dark text-lg mx-4 pt-4">
      {{ method == "registrasi" ? "Tambah Kode" : "Update Code" }}
    </h1>
    <hr class="mt-4" />

    <div v-if="method == 'registrasi'" class="w-full p-4 flex flex-col gap-2">
      <div class="mb-4">
        <label
          for="nama"
          class="block tracking-wide font-myFont text-dark font-sm mb-2"
        >
          Nama
        </label>
        <input
          v-model="nama"
          id="nama"
          class="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
          type="text"
          placeholder="Nama Code"
        />
      </div>

      <div class="mb-4">
        <label
          for="code"
          class="block tracking-wide font-myFont text-dark font-sm mb-2"
        >
          Code
        </label>
        <input
          v-model="code"
          id="code"
          class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-biru"
          type="text"
          placeholder="Code"
        />
      </div>

      <div class="mb-4">
        <label
          for="diskon"
          class="block tracking-wide font-myFont text-dark font-sm mb-2"
        >
          Diskon
        </label>
        <input
          v-model="diskon"
          id="diskon"
          class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-biru"
          type="text"
          placeholder="Contoh: 50"
        />
      </div>

      <div class="mb-4">
        <label
          for="quantity_hit"
          class="block tracking-wide font-myFont text-dark font-sm mb-2"
        >
          Jumlah Pemakaian
        </label>
        <input
          v-model="quantity_hit"
          id="quantity_hit"
          class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-biru"
          type="text"
          placeholder="Contoh: 10"
        />
      </div>

      <div class="mb-4">
        <label
          for="expired"
          class="block tracking-wide font-myFont text-dark font-sm mb-2"
        >
          Tanggal Kadaluarsa
        </label>
        <input
          v-model="expired"
          id="expired"
          class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-biru"
          type="datetime-local"
        />
      </div>

      <hr class="mt-4" />

      <div class="mb-4">
        <label
          for="expired"
          class="block tracking-wide font-myFont text-dark font-sm mb-2"
        >
          Vocher Code Untuk Assesment
        </label>
        <div class="space-y-3 bg-gray-200 p-3 rounded">
          <label
            class="flex items-center space-x-2"
            v-for="item in assessments?.data || []"
            :key="item.id"
          >
            <input
              type="checkbox"
              class="form-checkbox text-blue-600 h-5 w-5"
              :value="item.type"
              v-model="assessmentsSelected"
            />
            <span class="text-gray-700">{{ item.name }}</span>
          </label>
        </div>
      </div>
    </div>

    <div v-else-if="method == 'update'" class="w-full p-4 flex flex-col gap-2">
      <div class="mb-4">
        <label
          for="diskon"
          class="block tracking-wide font-myFont text-dark font-sm mb-2"
        >
          Diskon
        </label>
        <input
          v-model="diskon"
          id="diskon"
          class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-biru"
          type="text"
          placeholder="Contoh: 50"
        />
      </div>
      <div class="mb-4">
        <label
          for="tambahHitVocher"
          class="block tracking-wide font-myFont text-dark font-sm mb-2"
        >
          Tambah Hit Vocher
        </label>
        <input
          v-model="tambahHitVocher"
          id="tambahHitVocher"
          class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-biru"
          type="text"
          placeholder="Contoh: 5"
        />
      </div>
      <div class="mb-4">
        <label
          for="masaKadaluarsa"
          class="block tracking-wide font-myFont text-dark font-sm mb-2"
        >
          Masa Kadaluarsa
        </label>
        <input
          v-model="masaKadaluarsa"
          id="masaKadaluarsa"
          class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-biru"
          type="datetime-local"
        />
      </div>

      <hr class="mt-4" />

      <div class="mb-4">
        <label
          for="expired"
          class="block tracking-wide font-myFont text-dark font-sm mb-2"
        >
          Vocher Code Untuk Assesment
        </label>
        <div class="space-y-3 grid grid-cols-1 gap-1 bg-gray-200 p-3 rounded">
          <label
            class="flex items-center space-x-2"
            v-for="item in assessments?.data || []"
            :key="item.id"
          >
            <input
              type="checkbox"
              class="form-checkbox text-blue-600 h-5 w-5"
              :value="item.type"
              v-model="assessmentsSelected"
            />
            <span class="text-gray-700">{{ item.name }}</span>
          </label>
        </div>
      </div>
    </div>

    <hr class="pt-4" />
    <!-- Modal footer -->
    <div class="px-4 py-4 flex justify-between items-center space-x-4">
      <button
        @click="toggleModal"
        class="bg-gray-300 font-myFont text-black p-2 rounded-md hover:shadow-lg hover:opacity-80 transition duration-300 ease-in-out"
      >
        Tutup
      </button>
      <button
        @click="tambahKode"
        :disabled="buttonDisabled"
        :class="{ 'bg-gray-600 opacity-80 cursor-not-allowed': buttonDisabled }"
        class="rounded-lg px-4 py-2 bg-biru text-light font-myFont hover:bg-opacity-75 hover:shadow-md"
      >
        Submit
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.css";
import DOMPurify from "dompurify";
import initAPI from "../../../../../api/api";
import Cookies from "js-cookie";

// Props
const props = defineProps({
  method: String,
  detailData: Object,
});

// Emit
const emit = defineEmits(["toggleModal"]);

// Router
const router = useRouter();

// Refs
const nama = ref("");
const code = ref("");
const diskon = ref(
  props.method === "update" ? props.detailData.disc_percentage : ""
);
const masaKadaluarsa = ref(
  props.method === "update" ? props.detailData.expired : ""
);
const tambahHitVocher = ref("");
const quantity_hit = ref("");
const expired = ref("");
const assessmentsUpdate = ref(
  props.method === "update" ? props.detailData.vocher_code : null
);
const assessments = ref(null);
const assessmentsSelected = ref(
  props.method === "update" && props.detailData.vocher_code 
    ? JSON.parse(props.detailData.vocher_code)
    : []
);
const choiceassesment = ref("");

// Toggle modal
const toggleModal = () => {
  emit("toggleModal");
};
console.log("Select Vocher:", assessmentsSelected.value);
console.log("Detail data:", props.detailData);
// Tambah kode
const tambahKode = async () => {
  const token = Cookies.get("token");
  choiceassesment.value = JSON.stringify(assessmentsSelected.value);

  console.log("Pilihan assessments:", assessmentsSelected.value);
  console.log("Disimpan ke choiceassesment:", choiceassesment.value);

  const data = new FormData();
  if (props.method === "registrasi") {
    data.append("name", DOMPurify.sanitize(nama.value));
    data.append("code", DOMPurify.sanitize(code.value));
    data.append("disc_percentage", DOMPurify.sanitize(diskon.value));
    data.append("quantity_hit", DOMPurify.sanitize(quantity_hit.value));
    data.append("expired", DOMPurify.sanitize(expired.value));
    data.append("choice_assessments", choiceassesment.value);
  } else if (props.method === "update") {
    data.append("disc_percentage", DOMPurify.sanitize(diskon.value));
    data.append("tambahHitVocher", DOMPurify.sanitize(tambahHitVocher.value));
    data.append("expired", DOMPurify.sanitize(masaKadaluarsa.value));
    data.append("choice_assessments", choiceassesment.value);
  }

  if (token) {
    try {
      const method = props.method === "update" ? "put" : "post";
      const endpoint =
        props.method === "update"
          ? `school_codes/${props.detailData.id}`
          : "school_codes";

      const response = await initAPI(method, endpoint, data, token);
      Swal.fire({
        icon: "success",
        title:
          props.method === "registrasi"
            ? "Registrasi Berhasil"
            : "Data Code Diubah",
        text: response.data.message,
        showConfirmButton: false,
        timer: 2000,
      });

      toggleModal();
      router.go();
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Tambah Code Gagal",
        text: "Terjadi Kesalahan",
        showConfirmButton: false,
        timer: 2000,
      });
    }
  } else {
    router.push("/login");
    localStorage.clear();
  }
};

// Validasi tombol submit
const buttonDisabled = computed(() => {
  if (
    props.method === "registrasi" &&
    (!nama.value ||
      !code.value ||
      !diskon.value ||
      !quantity_hit.value ||
      !expired.value ||
      !assessmentsSelected.value)
  ) {
    return true;
  } else if (
    props.method === "update" &&
    (!diskon.value ||
      !tambahHitVocher.value ||
      !masaKadaluarsa.value ||
      !assessmentsSelected.value)
  ) {
    return true;
  } else {
    return false;
  }
});

const getDataAssessment = async () => {
  const token = Cookies.get("token");
  if (token) {
    try {
      const response = await initAPI("get", `assessments/list`, null, token);
      assessments.value = response.data;
      console.log(assessments.value);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Terjadi kesalahan saat mengambil data",
        showConfirmButton: false,
        timer: 2000,
      });
    }
  } else {
    router.push("/login");
    localStorage.clear();
  }
};

onMounted(async () => {
  await getDataAssessment();
});
</script>
