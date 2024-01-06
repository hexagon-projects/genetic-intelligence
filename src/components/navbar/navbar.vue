<template>
    <header v-if="userData" class="hidden lg:block bg-white shadow-lg sticky top-0 z-50 px-4 py-4">
        <nav class="flex justify-between items-center gap-4">
            <h1 class="font-myFont font-semibold text-xl">GIM Application</h1>
            <div class="flex justify-center justify-items-end gap-4">
				<RouterLink :to="{name: 'views.dashboard'}" 
					class="flex justify-center items-end gap-1 font-myFont text-black"
					:class="{'text-secondary' : $route.name === 'views.dashboard'}"
					>
					<PhHouseLine :size="24" />
					Beranda
				</RouterLink>

				<div v-if="userRole == 'customer'" class="flex justify-center gap-4">
					<customerNav/>
				</div>
				
            </div>
            <div class="relative flex justify-center items-center gap-4">
                <h2>{{ userData.name }}</h2>
				<a @click="toggleDropdown()" ref="dropdownRef" class="cursor-pointer w-9 h-9 flex items-center justify-center rounded-full hover:border-2 hover:border-secondary">
					<img v-if="userData.image == null" class="w-6 rounded-full" src="../../assets/img/boy-mock.png">
					<img v-else-if="userData.image !== null" class="w-6 rounded-full" :src="'http://gim.app.api.hexagon.co.id/api/open/customers/'+userData.image">
				</a>
            </div>
			<div v-if="showDropdown == true" class="bg-white w-36 absolute right-4 top-20 p-2 flex flex-col gap-2 rounded-lg shadow-xl">
				<RouterLink :to="{name: 'user.views.profile'}" class="mx-2 cursor-pointer font-myFont hover:text-secondary">Edit Profile</RouterLink>
				<a @click="Logout" class="mx-2 cursor-pointer font-myFont hover:text-secondary">Keluar</a>
			</div>
        </nav>
    </header>

    <!-- Bottom Nav -->
    <section id="bottom-navigation" class="block lg:hidden fixed inset-x-0 bottom-0 z-10 bg-white shadow">
		<div id="tabs" class="flex justify-between">
			<RouterLink :to="{name: 'views.dashboard'}" 
				class="w-full flex flex-col justify-center text-center pt-2 pb-1"
				:class="{'text-secondary' : $route.name === 'views.dashboard'}"
				>
				<div class="self-center">
					<PhHouseLine :size="28" />
				</div>
				<span class="tab tab-home block text-xs">Home</span>
			</RouterLink>

			<customerBotNav v-if="userRole == 'customer'"/>

			<a @click="Logout" class="cursor-pointer w-full focus:text-secondary hover:text-secondary flex flex-col justify-center text-center pt-2 pb-1">
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
import { PhHouseLine, PhSignOut } from "@phosphor-icons/vue";
import customerNav from './customer/customer.vue';
import customerBotNav from './customer/customerBottom.vue'

export default{
    name: 'NavbarVue',
	components: {
		PhHouseLine,
		PhSignOut,
		customerNav,
		customerBotNav
	},
	setup(){
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

<!-- <style scoped>
.nav-link {
  color: black;
  text-decoration: none;
  transition: color 0.1s, border-bottom 0.1s;
  border-bottom: 2px solid white;
}

.nav-link:hover,
.nav-link:focus {
  color: #3887BE;
  border-bottom: 2px solid #3887BE;
}
</style> -->