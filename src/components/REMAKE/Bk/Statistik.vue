<template>
  <div class="w-full flex flex-col items-center justify-center my-5">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-5 w-full">
      <!-- basic -->
      <Basic :userDatas="userDatas" />
      <div class="grid grid-cols-1 md:grid-cols-2 gap-5 w-fullitems-start">
        <div class="bg-white shadow-lg rounded-2xl p-5">
            <div class="flex flex-col font-sora">
                <span class="font-semibold">Jumlah Kasus</span>
                <small>Tinjauansemua kasus yang dilaporkan</small>
                <div class="outline outline-1 outline-gray-200 rounded-2xl flex gap-3 items-center p-3 mt-3">
                    <img src="@/assets/icons/statis-user.png" class="w-8" alt="basic">
                    <div class="flex flex-col py-3">
                        <h1 class="text-lg font-semibold">{{ countCase.total }}</h1>
                        <small>User</small>
                    </div>
                </div>
            </div>
        </div>
        <div class="bg-white shadow-lg rounded-2xl p-5">
            <div class="flex flex-col font-sora">
                <span class="font-semibold">Antrian Konseling</span>
                <small>Tinjauansemua kasus yang dilaporkan</small>
                <div class="outline outline-1 outline-gray-200 rounded-2xl flex gap-3 items-center p-3 mt-3">
                    <img src="@/assets/icons/statis-user.png" class="w-8" alt="basic">
                    <div class="flex flex-col py-3">
                        <h1 class="text-lg font-semibold">{{ countCase.conseling }}</h1>
                        <small>User</small>
                    </div>
                </div>
            </div>
        </div>
        <div class="bg-white shadow-lg rounded-2xl p-5">
            <div class="flex flex-col font-sora">
                <span class="font-semibold">Konseling</span>
                <small>Tinjauansemua kasus yang dilaporkan</small>
                <div class="outline outline-1 outline-gray-200 rounded-2xl flex gap-3 items-center p-3 mt-3">
                    <img src="@/assets/icons/statis-user.png" class="w-8" alt="basic">
                    <div class="flex flex-col py-3">
                        <h1 class="text-lg font-semibold">{{ countCase.pengajuan }}</h1>
                        <small>User</small>
                    </div>
                </div>
            </div>
        </div>
        <div class="bg-white shadow-lg rounded-2xl p-5">
            <div class="flex flex-col font-sora">
                <span class="font-semibold">Konseling Selesai</span>
                <small>Tinjauansemua kasus yang dilaporkan</small>
                <div class="outline outline-1 outline-gray-200 rounded-2xl flex gap-3 items-center p-3 mt-3">
                    <img src="@/assets/icons/statis-user.png" class="w-8" alt="basic">
                    <div class="flex flex-col py-3">
                        <h1 class="text-lg font-semibold">{{ countCase.selesai }}</h1>
                        <small>User</small>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import Basic from './Basic.vue';
import { ref, onMounted, onBeforeMount } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import Swal from "sweetalert2";
import initAPI from "@/api/api";

const loading = ref(true);
const store = useStore();
const userDatas = ref(null);
const token = Cookies.get("token");

const getUserData = async () => {
  try {
    const formData = new FormData();
    formData.append("refresh_user", "true");
    const updatedCustomer = await initAPI("post", "login", formData, token);
    store.commit("user", updatedCustomer.data.user);
    localStorage.setItem(
      "userData",
      JSON.stringify(updatedCustomer.data)
    );
    console.log(updatedCustomer.data.customer);
    userDatas.value = updatedCustomer.data.customer;
    console.log( "userDatas",userDatas.value);
  } catch (error) {
    // console.log(`error ie`, error)
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "Terjadi error saat mengambil data user.",
      showConfirmButton: false,
      timer: 2000,
    });
  } finally {
    loading.value = false;
  }
};

const countCase = ref('');
const getConseling = async () => {
  try {
    const token = Cookies.get("token");
    const response = await initAPI(
      "get",
      `bk/statistik`,
      null,
      token
    );

    countCase.value = response.data.data;

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

onBeforeMount(async () => {
  await getUserData();
  await getConseling();
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
