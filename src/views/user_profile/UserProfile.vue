<template>
    <!-- <navbar/> -->
    <section v-if="userData" class="bg-gray-100 pb-16">
        <div v-if="userRole === 'customer'">
            <customerProfile/>
        </div>
        <div v-else-if="userRole === 'consultant'">
            <consultantProfile/>
        </div>
    </section>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import initAPI from '../../api/api'
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';
import customerProfile from '../../components/user_profile/customer_profile.vue'
import consultantProfile from '../../components/user_profile/consultant_profile.vue'

export default {
    name: 'UserProfile',
    components: { customerProfile, consultantProfile },
    setup(){
        const store = useStore()
        const userData = computed(() => store.getters.getUserData)
        const userRole = computed(() => store.getters.getUserRole)

        return { 
            userData,
            userRole
        }
    }
}
</script>