<script setup>
import { ref, onMounted } from 'vue';
import Cookies from 'js-cookie';
import { useStore } from 'vuex';
import { computed } from 'vue';
import initAPI from '../../../../../../api/api';

const props = defineProps({
    idUser: Number,
})

const store = useStore();
const userData = computed(() => store.getters.getUserData);
const saudaraData = ref([]);

const fetchSaudaraData = async () => {
    const token = Cookies.get('token');
    if (!token || !userData.value) return;

    try {
        const response = await initAPI(
            'get',
            `customers/parents?customer_id=${props.idUser}`,
            null,
            token
        );

        if (response.data && response.data.data) {
            saudaraData.value = response.data.data.filter(item =>
                item.type !== "Ayah" && item.type !== "Ibu"
            );
        }
    } catch (error) {
        console.error('Error fetching saudara data:', error);
    }
};

onMounted(() => {
    fetchSaudaraData();
});
</script>

<template>
    <div class="space-y-4 p-4 bg-gray-100 rounded-xl rounded-tr-xl md:rounded-tl-none">
        <div class="overflow-x-auto">
            <div class="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100">
                <div class="bg-primary text-white">
                    <div class="grid grid-cols-4 gap-4 px-6 py-4 font-semibold text-xs md:text-sm">
                        <div>Nama</div>
                        <div>Tipe</div>
                        <div>Tanggal Lahir</div>
                        <div>Pendidikan</div>
                    </div>
                </div>
                
                <div class="bg-white">
                    <div v-for="saudara in saudaraData" :key="saudara.id" 
                         class="grid grid-cols-4 gap-4 px-6 py-4 text-xs md:text-sm text-gray-700 border-b border-gray-100 hover:bg-gray-50 transition-colors">
                        <div class="font-medium text-gray-900">{{ saudara.name }}</div>
                        <div>{{ saudara.type }}</div>
                        <div>{{ saudara.birth_date }}</div>
                        <div>{{ saudara.pendidikan }}</div>
                    </div>
                    
                    <div v-if="saudaraData.length === 0" class="px-6 py-8 text-center">
                        <div class="text-xs md:text-sm text-gray-500">
                            Tidak ada data saudara
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>