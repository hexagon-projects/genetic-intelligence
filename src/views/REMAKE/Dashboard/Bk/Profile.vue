<template>
  <div v-if="loading" class="preloader-overlay">
    <span
      class="flex justify-center animate-[spin_2s_linear_infinite] border-8 border-[#f1f2f3] border-l-biru border-r-biru rounded-full w-14 h-14 m-auto"
    ></span>
  </div>

  <Layout>
    <div class="bg-gray-100 p-5 min-h-screen">
      <div class="w-full md:w-4/5 mx-auto">
        <div class="flex mb-5">
          <!-- navigation profile -->
          <NavigateProfile />
        </div>
        <!-- section -->
        <div class="grid grid-cols-1 md:grid-cols-9 gap-3 items-start">
          <div class="md:col-span-6 flex flex-col gap-5 order-2 md:order-1">
            <!-- basic -->
            <Basic :userDatas="userDatas" />
            <!-- Address -->
            <Address :userDatas="userDatas" />
            <!-- Kontak -->
            <Contact :userDatas="userDatas" />
          </div>
          <!-- KTA -->
          <div class="bg-white rounded-2xl p-5 md:col-span-3 order-1 md:order-2">
            <div class="mb-5">
              <Card />
            </div>
            <div class="grid grid-cols-3 gap-3" v-if="userLicese">
              <div class="flex flex-col">
                <small class="font-sora font-bold">Start Date</small>
                <small class="font-sora text-xs">{{ userLicese.end_date ? new Date(userLicese.start_date).toLocaleDateString('id-ID') : "-" }}</small>
              </div>
              <div class="flex flex-col">
                <small class="font-sora font-bold">Expired Date</small>
                <small class="font-sora text-xs">{{ userLicese.end_date ? new Date(userLicese.end_date).toLocaleDateString('id-ID') : "-" }}</small>
              </div>
              <div class="flex flex-col">
                <small class="font-sora font-bold">Status</small>
                <small class="font-sora flex gap-2 items-center text-xs">
                  <span class="w-2 h-2 bg-green-600 rounded-full"></span>
                  <span>{{ userLicese.status ?? 'Unverified' }}</span>
                </small>
              </div>
            </div>
            <hr class="my-3" />
            <button
              class="bg-biru text-white py-2 px-7 rounded-full hover:bg-blue-600 inline-flex justify-center items-center w-full"
            >
              Download PDF
            </button>
          </div>
        </div>
      </div>
    </div>
  </Layout>
</template>

<script setup>
import Layout from "@/Layout/Bk/Layout.vue";
import Card from "../../../../components/REMAKE/Bk/Card.vue";
import Basic from "../../../../components/REMAKE/Bk/Basic.vue";
import Address from "../../../../components/REMAKE/Bk/Address.vue";
import Contact from "../../../../components/REMAKE/Bk/Contact.vue";
import NavigateProfile from "../../../../components/REMAKE/Bk/NavigateProfile.vue";
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
const userLicese = ref(null);

const getUserData = async () => {
  try {
    const formData = new FormData();
    formData.append("refresh_user", "true");
    const updatedCustomer = await initAPI("post", "login", formData, token);
    const userId = updatedCustomer.data.customer.user_id;
    const licenseResponse = await initAPI("get", `bk/license/${userId}`, null, token);

    userLicese.value = licenseResponse.data.data; // asumsinya response JSON sudah berisi data license
    store.commit("user", updatedCustomer.data.user);
    localStorage.setItem(
      "userData",
      JSON.stringify(updatedCustomer.data)
    );
    userDatas.value = updatedCustomer.data.customer;
  } catch (error) {
    console.log(`error ie`, error)
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

onBeforeMount(async () => {
  await getUserData();
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

<style scoped>
.preloader-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 100%;
  background: rgba(255, 255, 255, 1);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  transition: opacity 0.5s ease, height 0.5s ease;
}
.preloader-overlay.hidden {
  opacity: 0;
  height: 0;
  overflow: hidden;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
  opacity: 0;
}
</style>
