<template>
    <header v-if="userData" class="hidden lg:flex lg:flex-col lg:gap-4 bg-white sticky top-0 z-50 px-4 py-4">
    <nav class="mx-4 text-dark flex justify-between items-center gap-4">
        <!-- <h1 class="font-myFont font-semibold text-xl">GIM Application</h1> -->
		<img class="h-10" src="../../assets/img/gim-logo.png" alt="GIM Application">
        <div class="relative flex justify-center items-center gap-4">
            <h2 v-if="userData.role && userData.role == 'admin'" class="font-myFont text-dark font-medium">Admin</h2>
            <h2 v-if="userRole && (userRole == 'customer' || userRole == 'consultant')" class="font-myFont text-dark font-medium">{{ userData.name }}</h2>
            <a @click="toggleDropdown()" ref="dropdownRef" class="cursor-pointer w-9 h-9 flex items-center justify-center rounded-full hover:border-2 hover:border-primary">
                <img v-if="userData.image == null" class="w-6 rounded-full" src="../../assets/img/profile-mock.png">
                <img v-else-if="userData.image !== null && userRole == 'customer'" class="w-6 rounded-full" :src="baseUrl+'open/customers/'+userData.image">
                <img v-else-if="userData.image !== null && userRole == 'consultant'" class="w-6 rounded-full" :src="baseUrl+'open/consultant/'+userData.image">
            </a>
        </div>
        <div v-if="showDropdown == true" class="bg-white w-36 absolute right-4 top-20 p-2 flex flex-col gap-2 rounded-lg shadow-xl">
            <RouterLink :to="{name: 'user.views.profile'}" class="mx-2 cursor-pointer font-myFont hover:text-primary">Edit Profile</RouterLink>
            <a @click="Logout" class="mx-2 cursor-pointer font-myFont hover:text-primary">Keluar</a>
        </div>
    </nav>
    <hr>
    <nav class="mx-4 flex justify-start items-center gap-7">
        <RouterLink :to="{name: 'views.dashboard'}" 
            class="
            flex justify-center items-end px-4 py-2 gap-1 font-myFont
            hover:bg-biru hover:text-light hover:rounded-lg hover:shadow-sm
            "
            :class="{'bg-biru px-4 py-2 rounded-lg shadow-sm text-light' : $route.name === 'views.dashboard', 'text-dark bg-white': $route.name !== 'views.dashboard'}"
            >
            <PhHouse :size="24" :class="{'text-light': $route.name == 'views.dashboard','text-biru hover:text-light': $route.name !== 'views.dashboard'}" />
            Beranda
        </RouterLink>
        <customerNav v-if="userRole == 'customer'"/>
        <consultantNav v-if="userRole == 'consultant'"/>
        <adminNav v-if="userRole == 'admin'"/>
    </nav>
</header>
<!-- <section class="bg-primary py-6 text-dark">
        <header v-if="userData" class="hidden rounded-lg lg:block bg-white shadow-lg mx-4 sticky top-0 z-50 px-4 py-4">
        <nav class="flex justify-between items-center gap-4">
            <h1 class="font-myFont font-semibold text-xl">GIM Application</h1>
            
            <h2>Badrol</h2>
        </nav>
    </header>
</section> -->

<!-- Bottom Nav -->
<section id="bottom-navigation" class="block lg:hidden fixed inset-x-0 bottom-0 z-10 bg-white shadow">
		<div id="tabs" class="flex justify-between">
			<RouterLink :to="{name: 'views.dashboard'}" 
				class="w-full flex flex-col justify-center text-center pt-2 pb-1"
				:class="{'font-bold' : $route.name === 'views.dashboard'}"
				>
				<div class="self-center">
					<PhHouse :size="28" />
				</div>
				<span class="tab tab-home block text-xs">Beranda</span>
			</RouterLink>

			<customerBotNav v-if="userRole == 'customer'"/>
			<consultantBotNav v-else-if="userRole == 'consultant'"/>
			<adminBotNav v-else-if="userRole == 'admin'"/>

			<a @click="Logout" class="cursor-pointer w-full flex flex-col justify-center text-center pt-2 pb-1">
				<div class="self-center">
					<PhSignOut :size="28" />
				</div>
				<span class="tab tab-home block text-xs">Logout</span>
			</a>
		</div>
	</section>

</template>

<script>
import router from '../../router/router';
import { useStore } from 'vuex'
import { computed, ref, onMounted, onBeforeUnmount } from 'vue';
import { PhHouse, PhSignOut } from "@phosphor-icons/vue";
import customerNav from './customer/customer.vue';
import customerBotNav from './customer/customerBottom.vue'
import consultantNav from './consultant/consultant.vue'
import consultantBotNav from './consultant/consultantBottom.vue'
import adminNav from './admin/admin.vue'
import adminBotNav from './admin/adminBottom.vue'

export default{
    name: 'NavbarVue',
	components: {
		PhHouse,
		PhSignOut,
		customerNav,
		customerBotNav,
		consultantNav,
		consultantBotNav,
		adminNav,
		adminBotNav
	},
	setup(){
		const baseUrl = import.meta.env.VITE_API_BASE_URL
		const store = useStore()
		const userData = computed(() => store.getters.getUserData);
		const userRole = computed(() => store.getters.getUserRole);

		onMounted(() => {
			if (!userData.value && !userRole.value) {
				const localStorageUserData = localStorage.getItem('userData');
				const localStorageUserRole = localStorage.getItem('userRole');
				if (localStorageUserData && localStorageUserRole) {
					const parsedUserData = JSON.parse(localStorageUserData);
					const parsedUserRole = JSON.parse(localStorageUserRole);
					store.commit('user', parsedUserData);
					store.commit('userRole', parsedUserRole);
				} else { 
					console.log('localstorage kosong')
				}
			}
		})

		const showDropdown = ref(false)
		const dropdownRef = ref(null);

		const closeDropdown = (e) => {
			if (dropdownRef.value && !dropdownRef.value.contains(e.target)) {
				showDropdown.value = false;
			}
    	};

		onMounted(() => {
			document.body.addEventListener('click', closeDropdown);
		});

		onBeforeUnmount(() => {
			document.body.removeEventListener('click', closeDropdown);
		});

		const toggleDropdown = () => {
			showDropdown.value = !showDropdown.value
		}

		const Logout = () => {
			localStorage.clear()
			// localStorage.removeItem('userData')
			// localStorage.removeItem('userRole')
			store.commit('user', null);
			store.commit('userRole', null);

			router.push('/login')
		}

		return {
			baseUrl, 
			Logout,
			userData,
			userRole,
			showDropdown,
			dropdownRef,
			toggleDropdown,
			close 
		}
	}
}
</script>