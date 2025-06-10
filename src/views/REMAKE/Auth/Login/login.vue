<template>
    <div v-if="isLoadingResources" class="loading-resource">
        <img class="animate-bounce w-[30%] lg:w-[10%]" src="@/assets/img/logo-new.png" alt="logo">
    </div>

    <div v-else>
        <section class="bg-white w-full h-[100vh] flex items-center justify-center">
            <div
                class="w-full mx-5 flex flex-col lg:flex-row justify-start lg:justify-between md:mx-[80px] lg:mx-[120px]">
                <div class="w-full lg:w-[50vw] h-screen lg:px-[39px] flex items-center justify-center">
                    <div class="w-full lg:w-[65%] flex flex-col gap-[10px]">
                        <h1 class="text-[#170f49] text-2xl font-bold text-center font-sora mb-3">LOGIN DENGAN</h1>
                        <!-- Login Google -->
                        <div class="flex flex-col gap-[20px]">
                            <button v-if="isLoadingGoogle" disabled @click="LoginGoogle"
                                class="flex items-center justify-center transition-all hover:scale-105 rounded-[46px] px-4 py-2 bg-[#4a3aff] text-white border border-[#4a3aff] font-sora font-medium">
                                <svg aria-hidden="true" role="status"
                                    class="inline mr-3 w-4 h-4 text-white animate-spin" viewBox="0 0 100 101"
                                    fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                        fill="#E5E7EB"></path>
                                    <path
                                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                        fill="currentColor"></path>
                                </svg>
                                <span class="ml-2">Menghubungkan ...</span>
                            </button>
                            <button v-if="!isLoadingGoogle" @click="LoginGoogle"
                                class="flex items-center justify-center transition-all hover:scale-105 rounded-[46px] px-3 py-2 bg-white border border-[#4a3aff] text-[#4a3aff] font-sora font-medium">
                                <img src="@/assets/icons/google.png" alt="google">
                                <span class="ml-2"><b>google</b></span>
                            </button>
                        </div>

                        <!-- sparate -->
                        <div class="flex justify-between items-center my-[24px]">
                            <div class="border border-neutral-200 w-full"></div>
                            <span class="mx-8 text-[#6e6b8f] text-base font-normal font-roboto">Atau</span>
                            <div class="border border-neutral-200 w-full"></div>
                        </div>

                        <!-- form -->
                        <div class="flex flex-col gap-[10px]">
                            <label for="email" class="text-[#170f49] text-lg font-medium font-roboto">Email
                                Address</label>
                            <input v-model="email" @keyup="handleFormEmail" @keydown.enter.prevent="Login" id="email"
                                type="text"
                                class="text-[#170f49] px-5 py-[10px] rounded-[46px] shadow border border-[#eff0f6]"
                                placeholder="Email Address">
                            <a v-if="emailValidation && email.length < 1" class="text-xs text-red-500">Email tidak boleh
                                kosong.</a>
                        </div>

                        <div class="flex flex-col gap-[10px]">
                            <label for="password"
                                class="text-[#170f49] text-lg font-medium font-roboto">Password</label>
                            <input v-model="password" @keyup="handleFormPassword" @keydown.enter.prevent="Login"
                                id="password" type="password"
                                class="text-[#170f49] px-5 py-[10px] rounded-[46px] shadow border border-[#eff0f6]"
                                placeholder="Password">
                            <a v-if="passwordValidation && password.length < 1" class="text-xs text-red-500">Password
                                tidak boleh kosong.</a>
                        </div>

                        <div class="flex flex-col gap-[20px]">
                            <button v-if="isLoading" disabled="" type="button"
                                class="shadow-xl rounded-[46px] px-4 py-2 bg-[#4a3aff] text-white font-sora font-medium inline-flex justify-center items-center">
                                <svg aria-hidden="true" role="status"
                                    class="inline mr-3 w-4 h-4 text-white animate-spin" viewBox="0 0 100 101"
                                    fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                        fill="#E5E7EB"></path>
                                    <path
                                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                        fill="currentColor"></path>
                                </svg>
                                Loading...
                            </button>

                            <RouterLink :to="{ name: 'views.forgot_password' }"
                                class="mx-auto text-[#6e6b8f] text-base font-normal font-roboto">
                                Lupa Password?
                            </RouterLink>

                            <button v-if="!isLoading" @click="Login"
                                class="transition-all hover:scale-105 shadow-xl rounded-[46px] px-4 py-2 bg-[#4a3aff] text-white font-sora font-medium">
                                Login
                            </button>
                        </div>

                        <!-- belum punya akun -->
                        <div class="flex flex-col gap-[20px] pt-5">
                            <span class="mx-auto text-[#6e6b8f] text-base font-normal font-roboto">
                                Belum punya akun?
                            </span>

                            <RouterLink :to="{ name: 'views.register' }"
                                class="text-center transition-all hover:scale-105 rounded-[46px] px-4 py-2 bg-white border border-[#4a3aff] text-[#4a3aff] font-sora font-medium">
                                Daftar
                            </RouterLink>
                        </div>

                    </div>
                </div>

                <!-- banner for dekstop -->
                <div class="w-full h-screen items-center  justify-center hidden lg:w-[50vw] px-[39px] lg:flex flex-col gap-[10px] bg-login">
                    <img src="@/assets/img/login/Jatidiri-white.png" alt="Jatidiri" class="mb-4">
                    <div class="border border-[#fff] w-[360px] rounded-[20px] bg-opacity-20 bg-[#fff] relative">
                        <div class="z-20 flex flex-col pt-5 px-5">
                            <span class="font-roboto text-[#fff] font-medium text-2xl">#TemukanJatidirimu</span>
                            <span class="font-roboto text-[#fff] font-medium text-5xl">Bersama</span>
                            <span class="font-roboto text-[#fff] font-medium text-5xl">Jatidiri</span>
                        </div>
                        <img src="@/assets/img/login/dokter.png" alt="dokter" class="w-[80%] float-right z-20 mt-[-30px]">
                        <div class="rounded-full bg-[#fff] bg-opacity-90 p-5 h-20 w-20 flex items-center justify-center border border-[#fff] z-999 absolute -left-10 top-52">
                            <img src="@/assets/img/logo-singel.png" alt="logo-jatidiri">
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useStore } from 'vuex'
import { RouterLink, useRouter } from 'vue-router'
import DOMPurify from 'dompurify'
import initApi from '@/api/api'
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';
import Cookies from 'js-cookie';
import { generatePKCE } from '@/utils/pkce';

import { useRoute } from 'vue-router';

import sha256 from 'crypto-js/sha256'
import Base64 from 'crypto-js/enc-base64url'

const route = useRoute();
const target = route.query.target;

const email = ref('');
const password = ref('');
const store = useStore();
const router = useRouter();
const emailValidation = ref(false);
const passwordValidation = ref(false);
const isLoading = ref(false)
const isLoadingGoogle = ref(false)
const isLoadingKunci = ref(false)
const loadingResource = ref(true)

onMounted(() => {
    setTimeout(() => {
        loadingResource.value = false
    }, 850);
})

const isLoadingResources = computed(() => loadingResource.value);

const handleFormEmail = () => {
    if (emailValidation.value == true) {
        emailValidation.value = !emailValidation.value;
    }
};
const handleFormPassword = () => {
    if (passwordValidation.value == true) {
        passwordValidation.value = !passwordValidation.value;
    }
};
const validation = () => {
    if (email.value.length < 1)
        emailValidation.value = !emailValidation.value;
    if (password.value.length < 1)
        passwordValidation.value = !passwordValidation.value;
};
const Login = async () => {
    validation();
    if (emailValidation.value !== true && passwordValidation.value !== true) {
        isLoading.value = true
        const sanitizedEmail = DOMPurify.sanitize(email.value);
        const sanitizedPassword = DOMPurify.sanitize(password.value);
        const data = JSON.stringify({
            email: sanitizedEmail,
            password: sanitizedPassword
        });

        try {
            const response = await initApi('post', 'login', data, null)
            const role = response.data.user.role
            let type
            if (response.data.customer) type = response.data.customer
            if (response.data.consultant) type = response.data.consultant
            if (!response.data.consultant && !response.data.customer) type = response.data
            // console.log(response.data.user.role)
            localStorage.setItem('userData', JSON.stringify(type));
            Cookies.set('token', response.data.token, { expires: 1 })
            store.commit('user', type);
            store.commit('userRole', response.data.user.role);
            store.commit('userEmail', response.data.user.email);
            switch (role) {
                case 'customer':
                    if (target === 'gim') {
                        router.push({ name: 'user.views.deteksi' });
                    } else if (target === 'iaa') {
                        router.push({ name: 'user.views.test_gadget' });
                    } else if (!target) {
                        router.push({ name: 'views.dashboard' });
                    } else {
                        router.push({ name: 'views.dashboard' });
                    }
                    break;

                case 'consultant':
                    router.push({ name: 'consultant.views.dashboard' })
                    break;

                case 'admin':
                    router.push({ name: 'admin.views.dashboard' })
                    break;

                case 'staff':
                    router.push({ name: 'staff.views.dashboard' })
                    break;
            }
        } catch (error) {
            if (error.response) {
                Swal.fire({
                    icon: 'error',
                    title: 'Login Gagal',
                    text: error.response.data.message,
                    showConfirmButton: false,
                    timer: 2000
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Login Gagal',
                    text: 'Terjadi kesalahan pada sistem',
                    showConfirmButton: false,
                    timer: 2000
                });
            }
        } finally {
            isLoading.value = false
        }
    }
};

const LoginGoogle = async () => {
    try {
        isLoadingGoogle.value = true
        const response = await initApi('get', 'auth/google')
        window.location.href = response.data.url;
    } catch (error) {
        if (error.response) {
            Swal.fire({
                icon: 'error',
                title: 'Login Gagal',
                text: error.response.data.message,
                showConfirmButton: false,
                timer: 2000
            });
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Login Gagal',
                text: 'Terjadi kesalahan pada sistem',
                showConfirmButton: false,
                timer: 2000
            });
        }
    }
};

const LoginKunci = async () => {
  const verifier = 'kunci' // Bisa diganti random string generator
  const challenge = Base64.stringify(sha256(verifier))

  localStorage.setItem('code_verifier', verifier)

  const params = new URLSearchParams({
    client_id: '4lgU2jueVphrDvFsQSIMEtP8kUut8CVM',
    code_challenge: challenge,
    code_challenge_method: 'S256',
    redirect_uri: 'https://staging.jatidiri.app/api/auth/kunci/callback',
    response_type: 'code',
  })

  // Redirect ke authorize endpoint
  window.location.href = `https://be.kunci.co.id/sso/authorize?${params.toString()}`
};

</script>

<style scoped>
.bg-login {
    background-image: url("../../../../assets/img/login/bg-login.png");
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
}

.drop-shadow {
    filter: drop-shadow(2px 3px 10px #e9e9e9);
}

#img-login {
    min-height: 100vh;
    background: linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.2)), url("../../../assets/img/bg-login2-compress.jpg");
    /* background:linear-gradient(0deg, rgba(255, 0, 150, 0.3), rgba(38, 173, 197, 0.3)), url("../../../assets/img/bg-login2.jpg"); */
    background-repeat: no-repeat;
    background-size: 100% 100%;
}

.loading-resource {
    background-color: #FEFEFE;
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
    background: conic-gradient(#031B4E 0 25%,
            #3030F8 25% 50%,
            #0898ea 50% 75%,
            #0568f3 75%);
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