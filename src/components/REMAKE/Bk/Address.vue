<template>
  <div
    v-if="props.userDatas && Object.keys(props.userDatas).length > 0"
    class="bg-white rounded-2xl p-5"
  >
    <!-- Header -->
    <div class="flex items-center justify-between mb-5">
      <div class="flex gap-3 bg-gray-100 py-2 px-3 rounded-full items-center">
        <img src="@/assets/icons/basic.svg" class="w-5" alt="address" />
        <small class="font-sora font-semibold">Alamat Tempat Tinggal</small>
      </div>
      <div class="flex gap-3 items-end cursor-pointer" @click="openModal">
        <img src="@/assets/icons/edit-bk.svg" class="w-5" alt="edit" />
        <small class="font-sora font-semibold">Perbaharui</small>
      </div>
    </div>

    <!-- Address tampil -->
    <div class="flex justify-between mb-3">
      <small class="font-sora font-semibold">
        {{ props.userDatas.address ?? "Belum diisi" }}
      </small>
    </div>
    <hr class="my-3" />

    <!-- Modal -->
    <div
      v-if="isModalOpen"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999] font-sora overflow-auto p-4"
    >
      <div class="bg-white p-6 rounded-xl w-full max-w-2xl mx-auto">
        <h2 class="text-lg font-bold mb-4">Perbaharui Alamat Tempat Tinggal</h2>
        <hr class="mb-4" />

        <div>
          <label class="block text-sm font-semibold mb-1">Alamat</label>
          <input
            v-model="formData.address"
            type="text"
            class="w-full border px-3 py-2 rounded-md"
            placeholder="Masukkan alamat lengkap"
          />
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
              Menyimpan ...
            </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";
import Swal from "sweetalert2";
import initAPI from "@/api/api";
import Cookies from "js-cookie";
import { useStore } from "vuex";

const props = defineProps(["userDatas"]);
const isModalOpen = ref(false);
const store = useStore();

const isLoading = ref(false);

const formData = reactive({
  address: "",
});

const openModal = () => {
  formData.address = props.userDatas.address ?? "";
  isModalOpen.value = true;
};

const saveChanges = async () => {
  const token = Cookies.get("token");

  if (token) {
    try {
      isLoading.value = true;
      const form = new FormData();
      form.append("address", formData.address);

      const bkId = props.userDatas.id; // ID guru_bks
      const response = await initAPI("put", `bk/${bkId}`, form, token);

      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Berhasil",
          text: response.data.message,
          showConfirmButton: false,
          timer: 2000,
        });

        // Update lokal
        props.userDatas.address = formData.address;

        // Refresh full data
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
        text: "Terjadi kesalahan saat memperbarui alamat",
        timer: 2000,
        showConfirmButton: false,
      });
    }
  } else {
    localStorage.clear();
    router.push("/login");
  }
  isLoading.value = false;
};
</script>