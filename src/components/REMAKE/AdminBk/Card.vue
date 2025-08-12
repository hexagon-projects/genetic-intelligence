<template>
  <div class="w-full h-full rounded-3xl p-5 bg-biru text-white text-xs">
    <img src="@/assets/img/mgbk.png" class="w-10" alt="mgbk" />

    <div class="flex flex-col gap-2 mt-5">
      <!-- unix_number -->
      <strong class="font-sora md:text-2xl my-3">
        <template v-if="userLicese">
          {{ userLicese.unix_number ?? "Belum Terverivikasi" }}
        </template>
        <div v-else class="w-40 h-6 bg-white/20 rounded animate-pulse"></div>
      </strong>

      <div class="flex w-full bg-opacity-10 justify-between items-center">
        <!-- Card Holder Name -->
        <div class="flex flex-col">
          <small>Card Holder Name</small>
          <template v-if="userData?.bk">
            <span class="font-sora">
              {{ userData.bk.first_name }} {{ userData.bk.last_name }}
            </span>
          </template>
          <div v-else class="w-32 h-4 bg-white/20 rounded animate-pulse mt-1"></div>
        </div>

        <!-- Expired Date -->
        <div class="flex flex-col">
          <small>Expired Date</small>
          <template v-if="userLicese">
            <span class="font-sora">
              {{ userLicese.end_date ? new Date(userLicese.end_date).toLocaleDateString('id-ID') : "-" }}
            </span>
          </template>
          <div v-else class="w-20 h-4 bg-white/20 rounded animate-pulse mt-1"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeMount } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import Swal from "sweetalert2";
import initAPI from "@/api/api";

const loading = ref(true);
const store = useStore();
const userLicese = ref(null);
const token = Cookies.get("token");

const userData = JSON.parse(localStorage.getItem("userData"));



const getLicense = async () => {
  try {
    const formData = new FormData();
    formData.append("refresh_user", "true");

    const updatedCustomer = await initAPI("post", "login", formData, token);

    const userId = updatedCustomer.data.customer.user_id;

    const response = await initAPI("get", `admin-bk/license-admin/${userId}`, null, token);

    userLicese.value = response.data.data;

    console.log("License data:", userLicese.value);
  } catch (error) {
    console.error("Failed to get license:", error);
    userLicese.value = null;
  } finally {
    loading.value = false;
  }
};

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
