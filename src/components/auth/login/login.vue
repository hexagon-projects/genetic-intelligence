<template>
<div id="img-login" class="flex flex-col lg:flex-row items-center justify-center lg:gap-4 h-screen bg-secondary">
  <div class="-mt-36 p-8 sm:mb-4 lg:flex-col lg:-mt-0 text-white">
    <p class="text-2xl md:text-4xl lg:text-5xl font-semibold font-myFont italic mt-2 mb-2">Fokus Bahagia.</p>
    <h1 class="text-2xl md:text-4xl lg:text-5xl font-myFont font-semibold mb-4">Genetic Intelligence Mapping</h1>
  </div>

  <div class="bg-white p-8 mx-4 rounded shadow-lg md:w-7/12 lg:w-96 lg:mr-4">
    <!-- <h2 class="text-2xl font-semibold mb-6">Login</h2> -->
    <!-- <form> -->
      <h1 class="text-center text-2xl font-myFont font-bold mb-2">Masuk</h1>
        <p class="text-center font-myFont text-gray-500">Silahkan masuk dengan akun anda.</p>
          <div class="my-5">
            <input v-model="email" @keyup="handleFormEmail" type="email" name="email" class="font-myFont rounded-md border border-gray-300 w-full py-2 px-3" required placeholder="Email">
            <a v-if="emailValidation && email.length < 1" class="text-xs text-red-500">Email tidak boleh kosong.</a>
          </div>
          <div class="my-5">
            <input v-model="password" @keyup="handleFormPassword" type="password" name="password" class="font-myFont rounded-md border border-gray-300 w-full py-2 px-3" required placeholder="Password">
            <a v-if="passwordValidation && password.length < 1" class="text-xs text-red-500">Password tidak boleh kosong.</a>
          </div>
          <div class="flex flex-col lg:flex-row justify-between items-center my-5 gap-4">
            <button v-if="isLoading" disabled="" type="button" class="font-myFont font-medium bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 w-full lg:w-1/2 inline-flex justify-center items-center">
                <svg aria-hidden="true" role="status" class="inline mr-3 w-4 h-4 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB"></path>
                  <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"></path>
                </svg>
                Loading...
            </button>
            <button v-else-if="!isLoading" @click="Login" class="font-myFont bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 w-full lg:w-1/2">Masuk</button>
            <RouterLink :to="{name: 'views.forgot'}" href="" class="font-myFont text-gray-500 hover:text-blue-500">Lupa Password?</RouterLink>
          </div>
          <div class="border"></div>
          <div class="mt-5">
            <p class="font-myFont text-center text-gray-500">Tidak punya akun? 
              <router-link class="font-myFont hover:text-blue-500" :to="{name: 'views.register'}">Daftar</router-link>
            </p>
          </div>
    <!-- </form> -->
  </div>
</div>
</template>

<script>
import { ref } from 'vue'
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
                      localStorage.setItem('userData', JSON.stringify(datas.customer));
                      localStorage.setItem('userRole', JSON.stringify(datas.user.role));
                      localStorage.setItem('userEmail', JSON.stringify(datas.user.email));
                      localStorage.setItem('token', JSON.stringify(datas.token))
                      store.commit('user', datas.customer);
                      store.commit('userRole', datas.user.role);
                      store.commit('userEmail', datas.user.email);
                      router.push('/');
                  }
                } catch (error) {
                  // console.log(error.response.data)
                  Swal.fire({
                      icon: 'error',
                      title: 'Login Gagal',
                      text: error.response.data.message,
                      showConfirmButton: false,
                      timer: 2000
                  });
                }
                 
                // const response = await useAPI('post', 'login', data);
                // const datas = await response.json();
                // if (datas.success == true) {
                //     localStorage.setItem('userData', JSON.stringify(datas.customer));
                //     localStorage.setItem('userRole', JSON.stringify(datas.user.role));
                //     localStorage.setItem('userEmail', JSON.stringify(datas.user.email));
                //     // localStorage.setItem('token', data.token)
                //     store.commit('user', datas.customer);
                //     store.commit('userRole', datas.user.role);
                //     store.commit('userEmail', datas.user.email);
                //     router.push('/');
                // } else {
                //   Swal.fire({
                //       icon: 'error',
                //       title: 'Login Gagal',
                //       text: datas.message,
                //       showConfirmButton: false,
                //       timer: 2000
                //   });
                // }
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
            isLoading
        };
    },
    components: { RouterLink }
}
</script>

<style scoped>
#img-login {
  min-height:100%;
      background:linear-gradient(0deg, rgba(255, 0, 150, 0.3), rgba(38, 173, 197, 0.3)), url("../../../assets/img/bg-login.jpg");
      background-size:cover;
}
</style>

<!-- <div class="bg-secondary h-screen">
  <div class="container mx-auto">
    <div class="flex justify-center items-center gap-8 pt-36">
      <div class="hidden lg:flex lg:flex-col">
        <h2 class="mb-8 font-semibold font-myFont text-5xl text-white">Genetic Intelligence Mapping</h2>
        <p class="font-myFont text-white">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vero accusamus commodi non animi vitae in repellat totam eligendi, dignissimos ratione rem doloremque laborum cum laudantium repellendus. Impedit officiis est aspernatur?
        </p>
      </div>

      <div class="mx-4 md:w-full lg:w-full max-w-md bg-white shadow-lg rounded-md p-10">
        <h1 class="text-center text-2xl font-bold">Login</h1>
        <p class="text-center text-gray-500">Welcome back, please login to your account</p>
        <form action="/login" method="post">
          <div class="my-5">
            <input type="text" name="username" class="rounded-md border border-gray-300 w-full py-2 px-3" placeholder="Username">
          </div>
          <div class="my-5">
            <input type="password" name="password" class="rounded-md border border-gray-300 w-full py-2 px-3" placeholder="Password">
          </div>
          <div class="mt-5 mb-8 flex justify-between items-center">
            <a href="#" class="text-gray-500">Forgot Password?</a>
            <button type="submit" class="bg-blue-500 text-white rounded-md py-2 px-3">Login</button>
          </div>
        </form>
        <div class="border"></div>
        <div class="mt-5">
          <p class="text-center text-gray-500">Don't have an account? <a href="/register">Sign up</a></p>
        </div>
      </div>
    </div>
  </div>
</div> -->