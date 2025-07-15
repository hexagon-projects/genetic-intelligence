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
        <!-- information -->
        <div class="grid grid-cols-1 md:grid-cols-6 gap-5 items-start">
          <div class="bg-white p-5 rounded-xl space-y-6 md:col-span-2">
            <!-- Profile Image -->
            <div class="flex flex-col items-center">
              <img
                v-if="profilePreview == null"
                class="w-32 h-32 object-cover rounded-full border-4 border-white shadow"
                src="@/assets/img/profile-mock.png"
              />
              <img
              v-else
                :src="
                  profilePreview
                    ? `${baseURL}/storage/${profilePreview}`
                    : profileDefault
                "
                alt="Profile"
                class="w-32 h-32 object-cover rounded-full border-4 border-white shadow"
              />
              <input
                type="file"
                ref="fileInput"
                accept="image/*"
                class="hidden"
                @change="onFileChange"
              />
              <button
                class="mt-3 bg-gray-400 text-white px-5 py-2 text-sm rounded-full hover:bg-gray-500"
                @click="$refs.fileInput.click()"
              >
                Upload New Photo
              </button>
              <p class="text-xs text-gray-500 mt-1 text-center">
                At least 500x500 px recommended. <br />
                JPG or PNG is allowed.
              </p>
            </div>

            <!-- Submission Completion Section -->
            <div class="text-center space-y-3">
              <h2 class="text-base font-semibold mb-5">
                Complete Your Submission
              </h2>

              <div class="grid grid-cols-2 gap-2 items-center">
                <div class="relative w-4/5 mx-auto">
                  <svg
                    class="w-full h-full transform -rotate-90"
                    viewBox="0 0 100 100"
                  >
                    <!-- Lingkaran latar -->
                    <circle
                      class="text-gray-200"
                      cx="50"
                      cy="50"
                      r="45"
                      stroke="currentColor"
                      stroke-width="10"
                      fill="none"
                    />
                    <!-- Lingkaran progres -->
                    <circle
                      class="text-green-500"
                      cx="50"
                      cy="50"
                      r="45"
                      stroke="currentColor"
                      stroke-width="10"
                      fill="none"
                      stroke-linecap="round"
                      :stroke-dasharray="circumference"
                      :stroke-dashoffset="offset"
                    />
                  </svg>
                  <div
                    class="absolute inset-0 flex items-center justify-center text-lg font-semibold text-gray-700"
                  >
                    {{ completionPercent }}%
                  </div>
                </div>

                <!-- Checklist Items -->
                <div class="text-left space-y-2 text-sm">
                  <div
                    v-for="(step, index) in steps"
                    :key="index"
                    class="flex items-center gap-2"
                    :class="step.done ? 'text-green-500' : 'text-gray-500'"
                  >
                    <span class="inline-block w-5 h-5 text-green-500">
                      <template v-if="step.done">
                        <!-- Ikon selesai -->
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox="0 0 16 16"
                          class="w-5 h-5"
                        >
                          <path
                            d="M2.5 8a5.5 5.5 0 0 1 8.25-4.764.5.5 0 0 0 .5-.866A6.5 6.5 0 1 0 14.5 8a.5.5 0 0 0-1 0 5.5 5.5 0 1 1-11 0"
                          />
                          <path
                            d="M15.354 3.354a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0z"
                          />
                        </svg>
                      </template>
                      <template v-else>
                        <!-- Ikon belum selesai -->
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox="0 0 16 16"
                          class="w-5 h-5 text-gray-400"
                        >
                          <path
                            d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"
                          />
                        </svg>
                      </template>
                    </span>

                    <span>{{ step.label }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="md:col-span-4 flex flex-col gap-5">
            <!-- basic -->
            <Basic :userDatas="userDatas" />
            <!-- Address -->
            <Address :userDatas="userDatas" />
            <!-- Kontak -->
            <Contact :userDatas="userDatas" />
            <!-- organisasi -->
            <Organisasi
              :userDatas="userDatas"
              @organisasiUpdated="orgDone = $event"
            />
            <!-- placement school -->
            <PlacementSchools
              :userDatas="userDatas"
              @placementUpdated="placeDone = $event"
            />
            <!-- Term -->
            <div class="flex justify-end mb-20" v-if="userLicese && userLicese.status == null">
              <button
                class="bg-biru text-white px-5 py-2 rounded-xl hover:bg-biru/80 flex gap-3 items-center"
                @click="openModal = true"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-send-plus"
                  viewBox="0 0 16 16"
                >
                  <path
                    d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855a.75.75 0 0 0-.124 1.329l4.995 3.178 1.531 2.406a.5.5 0 0 0 .844-.536L6.637 10.07l7.494-7.494-1.895 4.738a.5.5 0 1 0 .928.372zm-2.54 1.183L5.93 9.363 1.591 6.602z"
                  />
                  <path
                    d="M16 12.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0m-3.5-2a.5.5 0 0 0-.5.5v1h-1a.5.5 0 0 0 0 1h1v1a.5.5 0 0 0 1 0v-1h1a.5.5 0 0 0 0-1h-1v-1a.5.5 0 0 0-.5-.5"
                  />
                </svg>
                <span>Apply for Membership</span>
              </button>

              <TermConditionModal
                v-if="openModal"
                @close="openModal = false"
                @submit="handleSubmit"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </Layout>
</template>

<script setup>
import Layout from "@/Layout/Bk/Layout.vue";
import Basic from "../../../../components/REMAKE/Bk/Basic.vue";
import Organisasi from "../../../../components/REMAKE/Bk/Organisasi.vue";
import NavigateProfile from "../../../../components/REMAKE/Bk/NavigateProfile.vue";
import Address from "../../../../components/REMAKE/Bk/Address.vue";
import Contact from "../../../../components/REMAKE/Bk/Contact.vue";
import PlacementSchools from "../../../../components/REMAKE/Bk/PlacementSchools.vue";
import TermConditionModal from "../../../../components/REMAKE/Bk/TermConditionModal.vue";
import { ref, onMounted, computed, onBeforeMount } from "vue";
import { jwtDecode } from "jwt-decode";
import Swal from "sweetalert2";
import initAPI from "@/api/api";
import { debounce } from "lodash";
import { useStore } from "vuex";
import Cookies from "js-cookie";
import profiledefault from "@/assets/img/profile-mock.png";

const store = useStore();
const loading = ref(true);
const userDatas = ref(null);
const token = Cookies.get("token");
const userLicese = ref(null);

const baseURL =
  import.meta.env.VITE_API_BASE_URL_STORAGE || "http://127.0.0.1:8000";

const radius = 45;
const circumference = 2 * Math.PI * radius;

const offset = computed(() => {
  return circumference - (completionPercent.value / 100) * circumference;
});

const orgDone = ref(false);
const placeDone = ref(false);

const steps = computed(() => [
  {
    label: "Photo Profile",
    done: !!profilePreview.value,
  },
  {
    label: "Basic Information",
    done: !!(
      userDatas.value?.first_name &&
      userDatas.value?.last_name &&
      userDatas.value?.birth_place &&
      userDatas.value?.birth_date
    ),
  },
  {
    label: "Address Information",
    done: !!userDatas.value?.address,
  },
  {
    label: "Contact Information",
    done: !!userDatas.value?.phone,
  },
  {
    label: "Organization Information",
    done: orgDone.value,
  },
  {
    label: "Placment Information",
    done: placeDone.value,
  },
]);

// Kalkulasi persentase progress
const completionPercent = computed(() => {
  const total = steps.value.length;
  const completed = steps.value.filter((step) => step.done).length;
  return Math.round((completed / total) * 100); // misalnya 3 dari 6 = 50%
});

const openModal = ref(false);

const handleSubmit = () => {
  openModal.value = false;
  // lakukan proses simpan data atau navigasi
  console.log("Form disetujui dan dikirim!");
};

const getUserData = async () => {
  try {
    const formData = new FormData();
    formData.append("refresh_user", "true");
    const updatedCustomer = await initAPI("post", "login", formData, token);
    const userId = updatedCustomer.data.customer.user_id;
    const licenseResponse = await initAPI(
      "get",
      `bk/license/${userId}`,
      null,
      token
    );

    userLicese.value = licenseResponse.data.data; // asumsinya response JSON sudah berisi data license
    store.commit("user", updatedCustomer.data.user);
    localStorage.setItem("userData", JSON.stringify(updatedCustomer.data));
    userDatas.value = updatedCustomer.data.customer;
    profilePreview.value = updatedCustomer.data.customer.profile;
    console.log("license", userLicese.value);
  } catch (error) {
    console.log(`error ie`, error);
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

const profilePreview = ref("");

const onFileChange = async (event) => {
  const file = event.target.files[0];
  if (!file) return;

  const formData = new FormData();
  formData.append("profile", file);

  const token = Cookies.get("token");
  try {
    const res = await initAPI("post", "bk/upload-profile", formData, token);

    if (res.status === 200) {
      profilePreview.value = res.data.data; // URL profile terbaru
      Swal.fire({
        icon: "success",
        title: "Berhasil",
        text: res.data.message,
        timer: 2000,
        showConfirmButton: false,
      });
    }
    await getUserData(); // Refresh data setelah upload
  } catch (err) {
    Swal.fire({
      icon: "error",
      title: "Gagal",
      text: err,
      timer: 2000,
      showConfirmButton: false,
    });
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
/* Tailwind CSS sudah cukup, tapi jika perlu custom CSS tambahan */
circle {
  transition: stroke-dashoffset 0.5s ease;
}
</style>
