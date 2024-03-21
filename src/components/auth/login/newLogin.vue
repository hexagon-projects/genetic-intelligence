<template>
    <div v-if="isLoadingResources" class="loading-resource">
        <div class="loader">
            JATIDIRI
        </div>
    </div>
    
    <div v-else>
        <div class="block">
          <div id="img-login" class="w-full flex flex-col lg:flex-row items-center lg:justify-between min-h-screen px-4 lg:px-12 py-8 xl:py-18">
            <div class="hidden text-white lg:flex flex-col gap-1 ml-10">
                <h1 class="text-lg md:text-4xl lg:text-3xl font-myFont font-semibold">#TemukanJatidirimu</h1>
                <h1 class="text-2xl md:text-4xl lg:text-5xl font-myFont font-semibold lg:mb-4">Bersama Jatidiri</h1>
                <!-- <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur illum non error eaque adipisci inventore!</p> -->
            </div>
    
            <div class="bg-white bg-opacity-60 backdrop-blur-xl h-[579px] md:h-[640px] lg:h-[579px] w-full lg:w-1/3 rounded-3xl">
                <img src="../../../assets/img/logo-new.png" class="w-1/3 mx-auto mb-6 mt-8">
                <h1 class="text-center text-2xl font-myFont font-semibold">Masuk</h1>
                <p class="text-center font-myFont text-gray-500 mb-4">Silahkan masuk dengan akun anda.</p>
    
                <div class="flex flex-col justify-center items-center gap-4">
                    <div class="w-3/4">
                      <input v-model="email" @keyup="handleFormEmail" @keydown.enter.prevent="Login" type="email" name="email" class="font-myFont rounded-md border border-gray-300 w-full py-2 px-3" required placeholder="Email">
                      <a v-if="emailValidation && email.length < 1" class="text-xs text-red-500">Email tidak boleh kosong.</a>
                    </div>
                    <div class="w-3/4">
                      <input v-model="password" @keyup="handleFormPassword" @keydown.enter.prevent="Login" type="password" name="password" class="font-myFont rounded-md border border-gray-300 w-full py-2 px-3" required placeholder="Password">
                      <a v-if="passwordValidation && password.length < 1" class="text-xs text-red-500">Password tidak boleh kosong.</a>
                    </div>
                    <div class="mx-auto w-full flex flex-col items-center my-3 gap-4">
                      <button v-if="isLoading" disabled="" type="button" class="font-myFont font-medium bg-biru text-white py-2 px-4 rounded-md hover:bg-blue-600 w-3/4 inline-flex justify-center items-center">
                          <svg aria-hidden="true" role="status" class="inline mr-3 w-4 h-4 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB"></path>
                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"></path>
                          </svg>
                          Loading...
                      </button>
                      <button v-else-if="!isLoading" @click="Login" class="font-myFont bg-biru text-white py-2 px-4 rounded-md hover:bg-blue-600 hover:shadow-lg w-3/4">
                        Masuk
                      </button>
                      <RouterLink :to="{name: 'views.forgot'}" href="" class="font-myFont text-gray-500 hover:text-blue-500">Lupa Password?</RouterLink>
                    </div>
    
                    <div class="border border-neutral-200 w-full">
    
                    </div>
    
                    <div class="mt-1 mx-auto w-full flex flex-col items-center">
                        <h1 class="text-center text-2xl font-myFont font-semibold">Daftar</h1>
                        <p class="text-center font-myFont text-gray-500 mb-2">Anda belum punya akun?</p>
                        <!-- <p class="font-myFont text-center text-gray-500">Tidak punya akun? 
                            <router-link class="underline font-myFont text-biru hover:text-blue-600" :to="{name: 'views.register'}">Daftar</router-link>
                        </p> -->
                        <RouterLink :to="{name: 'views.register'}" class="font-myFont bg-biru text-white text-center py-2 px-4 rounded-md hover:bg-blue-600 hover:shadow-lg w-3/4">
                            Daftar Sekarang
                        </RouterLink>
                    </div>
                </div>
            </div>
          </div>
        </div>
    </div>
</template>
    
<script>
import { ref, onMounted, computed } from 'vue'
import { useStore } from 'vuex'
import { RouterLink, useRouter } from 'vue-router'
import DOMPurify from 'dompurify'
// import useAPI from '../../../api/api'
import initApi from '../../../api/api'
import axios from 'axios'
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';

export default {
    name: 'LoginComp',
    setup() {
        const email = ref('');
        const password = ref('');
        const store = useStore();
        const router = useRouter();
        const emailValidation = ref(false);
        const passwordValidation = ref(false);
        const isLoading = ref(false)
        const loadingResource = ref(true)

        onMounted(() => {
            setTimeout(() => {
                loadingResource.value = false
            }, 850);
            // window.addEventListener("load", function(){
            //     loadingResource.value = false
            // });
            // document.addEventListener("DOMContentLoaded", function(){
            //     loadingResource.value = false
            // });
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
                    const datas = response.data
                    if (datas.success == true) {
                    let type
                    if(datas.customer) type = datas.customer
                    if(datas.consultant) type = datas.consultant
                    if(!datas.consultant && !datas.customer) type = datas.user
                    console.log(datas)
                    localStorage.setItem('userData', JSON.stringify(type));
                    localStorage.setItem('userRole', JSON.stringify(datas.user.role));
                    localStorage.setItem('userEmail', JSON.stringify(datas.user.email));
                    localStorage.setItem('token', JSON.stringify(datas.token))
                    store.commit('user', type);
                    store.commit('userRole', datas.user.role);
                    store.commit('userEmail', datas.user.email);

                    if(datas.staff){
                        localStorage.setItem('staffDetail', JSON.stringify(datas.staff));
                        localStorage.setItem('userData', JSON.stringify(type));
                        localStorage.setItem('userRole', JSON.stringify(datas.user.role));
                        localStorage.setItem('userEmail', JSON.stringify(datas.user.email));
                        localStorage.setItem('token', JSON.stringify(datas.token))
                        store.commit('user', type);
                        store.commit('userRole', datas.user.role);
                        store.commit('userEmail', datas.user.email);

                    }

                    router.push('/');
                    }
                } catch (error) {
                    // console.log(error.response.data)
                    if (error.response) {
                        Swal.fire({
                            icon: 'error',
                            title: 'Login Gagal',
                            text: error.response.data.message,
                            showConfirmButton: false,
                            timer: 2000
                        });
                    } else {
                        console.error("Error:", error);
                    }
                }

                isLoading.value = false
            }
        };
        return {
            email,
            password,
            Login,
            validation,
            emailValidation,
            passwordValidation,
            handleFormEmail,
            handleFormPassword,
            isLoading,
            isLoadingResources
        };
    },
}
</script>
    
<style scoped>
    #img-login {
      min-height:100vh;
      background: linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.2)), url("../../../assets/img/bg-login2.jpg");
      /* background:linear-gradient(0deg, rgba(255, 0, 150, 0.3), rgba(38, 173, 197, 0.3)), url("../../../assets/img/bg-login2.jpg"); */
      background-repeat: no-repeat;
        background-size: 100% 100%;
    }

    .loading-resource{
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
    background: conic-gradient(
        #031B4E 0 25%,
        #3030F8 25% 50%,
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
    