<template>
    <div class="bg-white rounded-lg shadow-sm p-4">
        <h2 class="font-myFont text-dark text-2xl mb-4">Ubah Role</h2>

        <div class="w-full grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            <div @click="selectRole('1')"
                class="cursor-pointer card w-full border hover:border-biru px-10 bg-white rounded-lg hover:shadow-[0px_14px_28px_-5px_rgba(0,0,0,0.1)] transition-all duration-150 ease-in"
                :class="{ 'shadow-[0px_14px_28px_-5px_rgba(0,0,0,0.1)] border-biru': selectedRole == 1 }">
                <!-- <h2 class="text-center text-dark font-myFont font-semibold text-lg tracking-wider mt-8 mb-3">
                    Pelajar / Mahasiswa
                </h2> -->
                <h2 class="text-center text-dark font-myFont font-semibold text-lg tracking-wider mt-8 mb-3">
                    Instansi
                </h2>
                <img src="../../../../assets/img/PelajarGroup.png" class="w-[221px] md:w-[213px] lg:w-[191px] mx-auto mb-4"
                    alt="Pelajar" rel="preload">
            </div>

            <div @click="selectRole('0')"
                class="cursor-pointer card w-full border hover:border-biru px-10 bg-white rounded-lg hover:shadow-[0px_14px_28px_-5px_rgba(0,0,0,0.1)] transition-all duration-150 ease-in"
                :class="{ 'shadow-[0px_14px_28px_-5px_rgba(0,0,0,0.1)] border-biru': selectedRole == 0 }">
                <!-- <h2 class="text-center text-dark font-myFont font-semibold text-lg tracking-wider mt-8 mb-3">
                    Non Pelajar
                </h2> -->
                <h2 class="text-center text-dark font-myFont font-semibold text-lg tracking-wider mt-8 mb-3">
                    Umum
                </h2>
                <img src="../../../../assets/img/NonpelajarGroup.png" class="mx-auto max-w-[222px] lg:w-full mb-4"
                    alt="Non Pelajar" rel="preload">
            </div>
        </div>
        <div class="flex flex-col justify-center items-center">
            <div class="py-4 text-sm text-gray-600">
                <!-- Status saat ini: <span class="font-semibold">{{ currentRoleText }}</span> -->
            </div>

            <button @click="changeRole" :disabled="isLoading"
                class="px-2 py-2 w-1/2 lg:w-1/4 self-center text-center rounded-lg bg-biru font-myFont font-medium text-light hover:opacity-75 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed">
                {{ isLoading ? 'Mengubah...' : 'Ubah Role' }}
            </button>
        </div>
    </div>
</template>

<script setup>
import { useStore } from 'vuex'
import { ref, computed, onMounted } from 'vue'
import initAPI from '../../../../api/api'
import Cookies from 'js-cookie'
import Swal from 'sweetalert2'

const props = defineProps({
    dataCustomer: Object
})

const selectedRole = ref()
const isLoading = ref(false)
const store = useStore()

const currentRoleText = computed(() => {
    return props.dataCustomer?.is_student === 1 ? 'Pelajar' : 'Umum'
})

const selectRole = (role) => {
    selectedRole.value = parseInt(role)
}

onMounted(() => {
    console.log(props.dataCustomer.is_student)
    if (props.dataCustomer?.is_student !== undefined) {
        selectedRole.value = props.dataCustomer.is_student
    }
})

const changeRole = async () => {
    if (!props.dataCustomer?.id) {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'ID Customer tidak ditemukan',
            timer: 2000,
            timerProgressBar: true
        })
        return
    }

    if (selectedRole.value === props.dataCustomer.is_student) {
        Swal.fire({
            icon: 'warning',
            title: 'Peringatan',
            text: 'Role yang dipilih sama dengan role saat ini',
            timer: 2000,
            timerProgressBar: true
        })
        return
    }

    try {
        isLoading.value = true

        const token = Cookies.get('token')

        const apiData = {
            is_student: selectedRole.value
        }

        const response = await initAPI(
            'PUT',
            `change/role/${props.dataCustomer.id}`,
            JSON.stringify(apiData),
            token
        )

        console.log(response)

        if (response.status === 200) {
            const updatedCustomer = await initAPI('get', 'customers?id=' + props.dataCustomer.id, null, token)
            store.commit('user', updatedCustomer.data.data[0])
            localStorage.setItem('userData', JSON.stringify(updatedCustomer.data.data[0]))
            
            await Swal.fire({
                icon: 'success',
                title: 'Berhasil!',
                text: 'Role berhasil diubah!',
                timer: 1500,
                timerProgressBar: true,
                showConfirmButton: false
            })
            
            location.reload()
        } else {
            throw new Error('Unexpected response status')
        }

    } catch (error) {
        console.error('Error changing role:', error)
        Swal.fire({
            icon: 'error',
            title: 'Gagal!',
            text: 'Gagal mengubah role. Silakan coba lagi.',
            timer: 2000,
            timerProgressBar: true
        })
    } finally {
        isLoading.value = false
    }
}
</script>