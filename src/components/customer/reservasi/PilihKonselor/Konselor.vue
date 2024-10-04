<template>
    <div class="mx-7 mt-4 py-6 bg-white rounded-lg shadow-lg p-4">
        <h1 class="text-center mb-6 text-2xl text-dark font-semibold">Silahkan Pilih Konselor</h1>

        <div class="flex justify-center items-center gap-3">
            <div v-for="(konselor, index) in konselors" :key="konselor.id" class="hover:border-biru hover:scale-105 hover:shadow-[0px_14px_28px_-5px_rgba(0,0,0,0.1)] transition-all duration-150 ease-in w-[260px] h-[330px] border rounded-lg p-4 flex flex-col justify-between items-center">
                <img src="https://placehold.co/120x120" class="mb-6 rounded-[50%] max-w-[120px] max-h-[120px]" alt="konselor">

                <h1 class="text-xl text-dark font-myFont font-semibold text-center">
                    {{ konselor.name }}
                </h1>

                <div class="flex flex-col w-full items-center">
                    <span class="mt-3 mb-4 text-base font-myFont font-medium">
                        {{ 'Rp. ' + formatAngka(konselor.fee) }}
                    </span>
                    <button @click="pilihKonselor(konselor)" class="w-full hover:shadow-[0px_14px_28px_-5px_rgba(0,0,0,0.1)] transition-all duration-150 ease-in hover:bg-opacity-75 bg-biru px-4 py-2 rounded-lg text-white text-base font-myFont font-medium">
                        Pilih
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { onMounted } from 'vue';
import initAPI from '../../../../api/api'
import Cookies from 'js-cookie'
import { ref } from 'vue';

const emit = defineEmits(['pilihKonselor'])

const konselors = ref([])

const pilihKonselor = (konselor) => {
    emit('pilihKonselor', konselor)
    // const konselorData = {
    //     id: konselor.id,
    //     name: konselor.name,
    //     number: konselor.number
    // }

    // localStorage.setItem('selectedKonselor', JSON.stringify(konselorData))
}

const formatAngka = (angka) => {
    return new Intl.NumberFormat('id').format(angka)
}

const getKonselor = async() => {
    const token = Cookies.get('token') 
    const response = await initAPI('get', 'consultants', null, token) 
    console.log(response.data)

    konselors.value = response.data.data
}

onMounted(() => {
    getKonselor()
})
</script>