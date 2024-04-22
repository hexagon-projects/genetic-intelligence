<template>
    <!-- <navbar/> -->
    <section v-if="userData && userRole" class="bg-gray-100 pb-16">
        <div v-if="userRole === 'customer'">
            <customerProfile/>
        </div>
        <div v-else-if="userRole === 'consultant'">
            <consultantProfile/>
        </div>
        <div v-else-if="userRole === 'admin'">
            <adminProfile/>
        </div>
    </section>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import { jwtDecode } from 'jwt-decode'
import { useRouter } from 'vue-router'
import Cookies from 'js-cookie'
import customerProfile from '../../components/user_profile/customer_profile.vue'
import consultantProfile from '../../components/user_profile/consultant_profile.vue'
import adminProfile from '../../components/user_profile/admin_profile.vue';

export default {
    name: 'UserProfile',
    components: { customerProfile, consultantProfile, adminProfile },
    setup(){
        const store = useStore()
        const router = useRouter()
        const userRole = ref('')
        const userData = computed(() => store.getters.getUserData)
        // const userRole = computed(() => store.getters.getUserRole)

        onMounted(() => {
            const token = Cookies.get('token')
			if(token){
				try {
					const decodedToken = jwtDecode(token)
					console.log(`dcd userprofile`, decodedToken)
	
					userRole.value = decodedToken.role
				} catch (error) {
					console.log('invalid token')
					router.push('/login')
					Cookies.remove('token')
				}
			}

			if(!userData.value){
				const localStorageUserData = localStorage.getItem('userData');
				if (localStorageUserData) {
					const parsedUserData = JSON.parse(localStorageUserData);
					store.commit('user', parsedUserData);
				}
			}
        })

        return { 
            userData,
            userRole
        }
    }
}
</script>