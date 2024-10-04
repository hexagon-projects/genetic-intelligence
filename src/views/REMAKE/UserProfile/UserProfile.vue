<template>
    <NavCustomer v-if="decodeRoleUser == 'customer'"/>
    <NavAdminOrConsultant v-if="decodeRoleUser !== 'customer'"/>

    <UserProfile/>
</template>

<script setup>
import NavCustomer from '@/components/REMAKE/Navbar/Navbar.vue'
import NavAdminOrConsultant from '@/components/navbar/newNavbar.vue'
import UserProfile from '@/views/user_profile/UserProfile.vue';
import { jwtDecode } from "jwt-decode"
import Cookies from 'js-cookie'

const token = Cookies.get('token')

const decodedToken = jwtDecode(token);
const decodeRoleUser = decodedToken.role
</script>