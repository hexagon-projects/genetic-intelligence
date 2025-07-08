<template>
  <div v-if="isLoadingResources" class="loading-resource">
    <img
      class="animate-bounce w-[30%] lg:w-[10%]"
      src="@/assets/img/logo-new.png"
      alt="logo"
    />
  </div>

  <div v-else>
    <section
      class="bg-white w-full md:h-screen flex items-center justify-center"
    >
      <div class="flex items-center justify-center gap-5 w-full">
        <div class="w-1/2 h-screen p-5 hidden md:flex">
          <div class="bg-screen w-full h-full rounded-2xl"></div>
        </div>
        <div class="w-full md:w-1/2 my-10 md:my-0 md:h-screen">
          <div class="flex items-center justify-start w-full h-screen p-5">
            <div class="flex flex-col gap-3 w-full md:w-3/4 p-5 md:p-0">
              <div class="flex flex-col gap-3 mb-5">
                <h1 class="font-bold font-sora text-3xl">
                  Create Your Account
                </h1>
                <span class="font-sora text-sm">
                  Already have an account?
                  <RouterLink
                    :to="{ name: 'views.login' }"
                    class="text-biru hover:text-blue-600"
                  >
                    Sign In
                  </RouterLink>
                </span>
              </div>
              <div class="flex flex-col gap-5">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div class="flex flex-col gap-1">
                    <label
                      for="FirstName"
                      class="text-sm font-sora text-gray-800"
                      >First Name</label
                    >
                    <input
                      type="text"
                      v-model="firstName"
                      class="border border-gray-300 rounded-xl p-2 focus:outline-none text-gray-700 w-full"
                      placeholder="Firtst Name"
                    />
                  </div>
                  <div class="flex flex-col gap-1">
                    <label
                      for="LastName"
                      class="text-sm font-sora text-gray-800"
                      >Last Name</label
                    >
                    <input
                      type="text"
                      v-model="lastName"
                      class="border border-gray-300 rounded-xl p-2 focus:outline-none text-gray-700 w-full"
                      placeholder="Last Name"
                    />
                  </div>
                </div>
                <div class="flex flex-col gap-1">
                  <label
                    for="PhoneNumber"
                    class="text-sm font-sora text-gray-800"
                    >Phone Number</label
                  >
                  <input
                    type="text"
                    v-model="phoneNumber"
                    class="border border-gray-300 rounded-xl p-2 focus:outline-none text-gray-700 w-full"
                    placeholder="Phone number"
                  />
                </div>
                <div class="flex flex-col gap-1">
                  <label for="email" class="text-sm font-sora text-gray-800"
                    >Email Address</label
                  >
                  <input
                    type="email"
                    v-model="email"
                    class="border border-gray-300 rounded-xl p-2 focus:outline-none text-gray-700 w-full"
                    placeholder="example@example.com"
                  />
                </div>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <!-- Password -->
                  <div class="flex flex-col gap-1 relative">
                    <label
                      for="password"
                      class="text-sm font-sora text-gray-800"
                      >Password</label
                    >
                    <input
                      :type="showPassword ? 'text' : 'password'"
                      v-model="password"
                      class="border border-gray-300 rounded-xl p-2 focus:outline-none text-gray-700 w-full pr-10"
                      placeholder="Password"
                    />
                    <span
                      class="absolute right-3 top-9 cursor-pointer"
                      @click="showPassword = !showPassword"
                    >
                      <svg
                        v-if="showPassword"
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-5 w-5 text-gray-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        />
                      </svg>
                      <svg
                        v-else
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-5 w-5 text-gray-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          d="M13.875 18.825A10.05 10.05 0 0112 19c-4.477 0-8.268-2.943-9.542-7a9.973 9.973 0 013.071-4.421M17.94 17.94A9.978 9.978 0 0019.542 12c-.333-1.103-.81-2.135-1.407-3.07M3 3l18 18"
                        />
                      </svg>
                    </span>
                  </div>

                  <!-- Confirm Password -->
                  <div class="flex flex-col gap-1 relative">
                    <label
                      for="confirmPassword"
                      class="text-sm font-sora text-gray-800"
                      >Confirm Password</label
                    >
                    <input
                      :type="showConfirmPassword ? 'text' : 'password'"
                      v-model="confirmPassword"
                      class="border border-gray-300 rounded-xl p-2 focus:outline-none text-gray-700 w-full pr-10"
                      placeholder="Confirm Password"
                    />
                    <span
                      class="absolute right-3 top-9 cursor-pointer"
                      @click="showConfirmPassword = !showConfirmPassword"
                    >
                      <svg
                        v-if="showConfirmPassword"
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-5 w-5 text-gray-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        />
                      </svg>
                      <svg
                        v-else
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-5 w-5 text-gray-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          d="M13.875 18.825A10.05 10.05 0 0112 19c-4.477 0-8.268-2.943-9.542-7a9.973 9.973 0 013.071-4.421M17.94 17.94A9.978 9.978 0 0019.542 12c-.333-1.103-.81-2.135-1.407-3.07M3 3l18 18"
                        />
                      </svg>
                    </span>

                    <!-- Validasi tidak cocok -->
                    <p
                      v-if="
                        password &&
                        confirmPassword &&
                        password !== confirmPassword
                      "
                      class="text-red-600 text-sm mt-1"
                    >
                      Passwords do not match.
                    </p>
                  </div>
                </div>
                <div class="flex flex-col my-5">
                  <button
                    v-if="isLoading"
                    disabled=""
                    type="button"
                    class="shadow-xl rounded-[46px] px-4 py-2 bg-[#4a3aff] text-white font-sora font-medium inline-flex justify-center items-center"
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
                  <button
                    v-if="!isLoading"
                    @click="Register"
                    class="transition-all hover:scale-105 shadow-xl rounded-[46px] px-4 py-2 bg-[#4a3aff] text-white font-sora font-medium"
                  >
                    Create Account
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useStore } from "vuex";
import { RouterLink, useRouter, useRoute } from "vue-router";
import DOMPurify from "dompurify";
import initApi from "@/api/api";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.css";
import Cookies from "js-cookie";

const store = useStore();
const router = useRouter();
const route = useRoute();
const isLoading = ref(false);
const loadingResource = ref(true);
const showPassword = ref(false);
const showConfirmPassword = ref(false);

const formFillData = JSON.parse(localStorage.getItem("formValue"));
const firstName = ref(formFillData?.firstName ? formFillData.firstName : "");
const lastName = ref(formFillData?.lastName ? formFillData.lastName : "");
const email = ref(formFillData?.email ? formFillData.email : "");
const phoneNumber = ref(
  formFillData?.phoneNumber ? formFillData.phoneNumber : ""
);
const password = ref(formFillData?.password ? formFillData.password : "");
const confirmPassword = ref(
  formFillData?.confirmPassword ? formFillData.confirmPassword : ""
);

onMounted(() => {
  setTimeout(() => {
    loadingResource.value = false;
  }, 850);
});

const isLoadingResources = computed(() => loadingResource.value);

const Register = async () => {
  const data = JSON.stringify({
    first_name: DOMPurify.sanitize(firstName.value),
    last_name: DOMPurify.sanitize(lastName.value),
    phone: DOMPurify.sanitize(phoneNumber.value),
    email: DOMPurify.sanitize(email.value),
    password: DOMPurify.sanitize(password.value),
  });

  console.log(data);

  try {
    isLoading.value = true;
    const response = await initApi("post", "v2/register-bk", data, null);
    console.log(response);

    // ✅ Jika sukses
    Swal.fire({
      icon: "success",
      title: "Registrasi Berhasil",
      text: "Silakan login untuk melanjutkan",
      showConfirmButton: false,
      timer: 2000,
    });

    // ⏳ Tunggu sebelum redirect
    setTimeout(() => {
      toLogin();
    }, 2000);
  } catch (error) {
    // ❌ Jika gagal
    Swal.fire({
      icon: "error",
      title: "Registrasi Gagal",
      text: error.response?.data?.message || "Terjadi kesalahan.",
      showConfirmButton: false,
      timer: 2000,
    });
  } finally {
    isLoading.value = false;
  }
};

const toLogin = () => {
  router.push('/login');
};

</script>

<style scoped>
.bg-screen {
  background-image: url("../../../assets/img/login/bk-screen.jpg");
  /* background-image: url("../../../assets/img/login/bg-login.png"); */
  background-size: cover;
  background-position: top;
  background-repeat: no-repeat;
}
.loading-resource {
  background-color: #fefefe;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.loader {
  font-size: 2rem;
  font-family: sans-serif;
  font-variant: small-caps;
  font-weight: 900;
  background: conic-gradient(
    #031b4e 0 25%,
    #3030f8 25% 50%,
    #0898ea 50% 75%,
    #0568f3 75%
  );
  background-size: 200% 200%;
  animation: animateBackground 3.5s ease-in-out infinite;
  color: transparent;
  background-clip: text;
  -webkit-background-clip: text;
}

@keyframes animateBackground {
  25% {
    background-position: 0 100%;
  }

  50% {
    background-position: 100% 100%;
  }

  75% {
    background-position: 100% 0%;
  }

  100% {
    background-position: 0 0;
  }
}
</style>
