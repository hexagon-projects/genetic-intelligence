<template>
  <div class="bg-white p-5 rounded-2xl">
    <!-- Header -->
    <div class="flex items-center justify-between mb-5">
      <div class="flex gap-3 bg-gray-100 py-2 px-3 rounded-full items-center">
        <img src="@/assets/icons/basic.svg" class="w-5" alt="contact" />
        <small class="font-sora font-semibold">Riwayat Organisasi</small>
      </div>
    </div>
    <!-- Address tampil -->
    <div v-if="organisasis.length > 0">
      <div v-for="(item, index) in organisasis" :key="index">
        <div class="grid grid-cols-7 mb-3 items-center">
          <div class="flex flex-col gap-2 col-span-4">
            <small class="font-sora font-semibold text-gray-500"
              >Nama Organisasi</small
            >
            <small class="font-sora font-semibold">{{
              item.nama_organisasi
            }}</small>
          </div>
          <div class="flex flex-col gap-2 col-span-2">
            <small class="font-sora font-semibold text-gray-500"
              >Posisi di Organisasi</small
            >
            <small class="font-sora font-semibold">{{ item.jabatan }}</small>
          </div>
          <div class="flex flex-col gap-2 items-end justify-end col-span-1">
            <small
              class="font-sora font-semibold bg-red-500 rounded-full p-1 text-white cursor-pointer"
              @click="deleteOrganisasi(item.id)"
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
            </small>
          </div>
        </div>
        <hr class="my-3" />
      </div>
    </div>
    <div v-else class="text-center text-gray-500 text-sm italic mt-4 my-5">
      Belum Ada Riwayat Organisasi Yang Ditambahkan.
    </div>
    <div class="flex flex-col gap-2 items-start md:col-span-2">
        <button
          class="flex gap-3 items-center cursor-pointer bg-biru text-white px-3 py-2 rounded-xl"
          @click="openModal"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            class="bi bi-folder-plus bg-white bg-opacity-25 rounded-sm p-1 w-5"
            viewBox="0 0 16 16"
          >
            <path
              d="m.5 3 .04.87a2 2 0 0 0-.342 1.311l.637 7A2 2 0 0 0 2.826 14H9v-1H2.826a1 1 0 0 1-.995-.91l-.637-7A1 1 0 0 1 2.19 4h11.62a1 1 0 0 1 .996 1.09L14.54 8h1.005l.256-2.819A2 2 0 0 0 13.81 3H9.828a2 2 0 0 1-1.414-.586l-.828-.828A2 2 0 0 0 6.172 1H2.5a2 2 0 0 0-2 2m5.672-1a1 1 0 0 1 .707.293L7.586 3H2.19q-.362.002-.683.12L1.5 2.98a1 1 0 0 1 1-.98z"
            />
            <path
              d="M13.5 9a.5.5 0 0 1 .5.5V11h1.5a.5.5 0 1 1 0 1H14v1.5a.5.5 0 1 1-1 0V12h-1.5a.5.5 0 0 1 0-1H13V9.5a.5.5 0 0 1 .5-.5"
            />
          </svg>
          <small class="font-sora text-xs">Tambah Organisasi Lain</small>
        </button>
      </div>
  </div>

  <!-- Modal -->
  <div
    v-if="isModalOpen"
    class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999] font-sora overflow-auto p-4"
  >
    <div class="bg-white p-6 rounded-xl w-full max-w-2xl mx-auto">
      <h2 class="text-lg font-bold mb-4">Add New Organization</h2>
      <hr class="mb-4" />

      <div class="w-full grid grid-cols-1 md:grid-cols-2 gap-5">
        <div class="w-full flex flex-col gap-2 items-start md:col-span-2">
          <label for="">Organization Name</label>
          <input
            type="text"
            v-model="formData.nama_organisasi"
            class="border border-gray-300 px-3 py-2 rounded-xl w-full"
            placeholder="Organization Name"
          />
        </div>
        <div class="w-full flex flex-col gap-2 items-start">
          <label for="">Position in Organization</label>
          <input
            type="text"
            v-model="formData.jabatan"
            class="border border-gray-300 px-3 py-2 rounded-xl w-full"
            placeholder="Position in Organization"
          />
        </div>
        <div class="w-full flex flex-col gap-2 items-start">
          <label for="">Status</label>
          <select
            name=""
            id=""
            v-model="formData.status"
            class="border border-gray-300 px-3 py-2 rounded-xl w-full"
          >
            <option value="Active">Active</option>
            <option value="Not Active">Not Active</option>
          </select>
        </div>
      </div>

      <hr class="my-6" />

      <div class="flex justify-end gap-3">
        <button
          @click="isModalOpen = false"
          class="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400"
        >
          Batal
        </button>
        <button
          v-if="!isLoading"
          @click="saveChanges"
          class="px-4 py-2 bg-biru text-white rounded-md hover:bg-biru/80"
        >
          Simpan
        </button>
        <button
          v-if="isLoading"
          disabled
          class="px-4 py-2 bg-biru text-white rounded-md hover:bg-biru/80"
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
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
import Swal from "sweetalert2";
import initAPI from "@/api/api";
import Cookies from "js-cookie";
import { useStore } from "vuex";

const emit = defineEmits(["organisasiUpdated"]);

const props = defineProps(["userDatas"]);
const isModalOpen = ref(false);
const store = useStore();
const isLoading = ref(false);

const formData = reactive({
  nama_organisasi: "",
  jabatan: "",
  status: "Active",
});

const openModal = () => {
  formData.nama_organisasi = props.userDatas.nama_organisasi ?? "";
  formData.jabatan = props.userDatas.jabatan ?? "";
  formData.status = props.userDatas.status ?? "Active";
  isModalOpen.value = true;
};

const loading = ref(false);
const organisasis = ref([]);

const getOrganisasi = async () => {
  const token = Cookies.get("token");
  isLoading.value = true;
  try {
    const response = await initAPI("get", "bk/organisasi", null, token);
    organisasis.value = response.data.data;
    emit("organisasiUpdated", organisasis.value.length > 0);
  } catch (error) {
    console.log(error);
  } finally {
    isLoading.value = false;
  }
};

const saveChanges = async () => {
  const token = Cookies.get("token");

  if (token) {
    try {
      isLoading.value = true;
      const form = new FormData();
      form.append("nama_organisasi", formData.nama_organisasi);
      form.append("jabatan", formData.jabatan);
      form.append("status", formData.status);

      const response = await initAPI("post", `bk/organisasi`, form, token);

      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Berhasil",
          text: response.data.message,
          showConfirmButton: false,
          timer: 2000,
        });

        // Panggil ulang data organisasi untuk update tampilan
        await getOrganisasi();

        // Update data user (jika diperlukan)
        const refreshForm = new FormData();
        refreshForm.append("refresh_user", "true");
        const updatedData = await initAPI("post", "login", refreshForm, token);
        store.commit("user", updatedData.data.customer);
        localStorage.setItem("userData", JSON.stringify(updatedData.data));
      }

      isModalOpen.value = false;
    } catch (error) {
      console.error("Gagal update:", error);
      Swal.fire({
        icon: "error",
        title: "Gagal",
        text: "Terjadi kesalahan saat memperbarui data organisasi",
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

const deleteOrganisasi = async (organisasiId) => {
  const confirm = await Swal.fire({
    title: "Apakah kamu yakin?",
    text: "Data organisasi ini akan dihapus secara permanen.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    confirmButtonText: "Ya, hapus!",
    cancelButtonText: "Batal",
  });

  if (!confirm.isConfirmed) return;

  const token = Cookies.get("token");
  try {
    isLoading.value = true;
    const response = await initAPI(
      "delete",
      `bk/organisasi/${organisasiId}`,
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
      await getOrganisasi();

      // Refresh user data
      const refreshForm = new FormData();
      refreshForm.append("refresh_user", "true");
      const updatedData = await initAPI("post", "login", refreshForm, token);
      store.commit("user", updatedData.data.customer);
      localStorage.setItem("userData", JSON.stringify(updatedData.data));
    }
  } catch (error) {
    console.error("Gagal menghapus organisasi:", error);
    Swal.fire({
      icon: "error",
      title: "Gagal",
      text: "Terjadi kesalahan saat menghapus organisasi.",
      timer: 2000,
      showConfirmButton: false,
    });
  } finally {
    isLoading.value = false;
  }
};

onMounted(async () => {
  await getOrganisasi();
});
</script>
