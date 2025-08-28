<script setup>
import { computed, onMounted, ref } from 'vue';
import initAPI from '../../../../../api/api';
import Cookies from 'js-cookie';
import { useStore } from 'vuex';
import CheckTabs from './CheckTabs.vue';
import CheckNotes from './CheckNotes.vue';

const props = defineProps({
    anakData: Object,
    ayahData: Object,
    ibuData: Object
});

const store = useStore();
const userData = computed(() => store.getters.getUserData);
const saudaraData = ref([]);

const calculateAge = (birthDate) => {
    if (!birthDate) return '-';

    const today = new Date();
    let birthDateObj;

    if (birthDate.includes('-')) {
        const parts = birthDate.split('-');
        if (parts[0].length === 4) {
            birthDateObj = new Date(birthDate);
        } else {
            birthDateObj = new Date(parts[2], parts[1] - 1, parts[0]);
        }
    } else {
        return '-';
    }

    let age = today.getFullYear() - birthDateObj.getFullYear();
    const monthDiff = today.getMonth() - birthDateObj.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDateObj.getDate())) {
        age--;
    }

    return age;
};

const fetchSaudaraData = async () => {
    const token = Cookies.get('token');
    if (!token || !userData.value) return;

    try {
        const response = await initAPI(
            'get',
            `customers/parents?customer_id=${userData.value.id}`,
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

const activeContentTab = ref('informasi');

const handleTabChange = (tab) => {
    activeContentTab.value = tab;
};
</script>

<template>
    <div class="w-full bg-white shadow-md shadow-black/5 p-6 rounded-3xl">
        <CheckTabs @tab-change="handleTabChange" />

        <div v-if="activeContentTab === 'informasi'">
            <!-- Data Anak -->
            <div class="space-y-4 md:space-y-6 p-4 bg-gray-100 rounded-xl rounded-tr-xl md:rounded-tl-none">
                <div class="space-y-4">
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-6">
                        <div class="space-y-2 flex flex-col">
                            <label for="" class="text-[#8E8E8E] text-xs md:text-sm">Nama Depan</label>
                            <div class="p-3 rounded-lg bg-white text-sm md:text-base">{{ anakData.first_name || '-' }}
                            </div>
                        </div>
                        <div class="space-y-2 flex flex-col">
                            <label for="" class="text-[#8E8E8E] text-xs md:text-sm">Nama Belakang</label>
                            <div class="p-3 rounded-lg bg-white text-sm md:text-base">{{ anakData.last_name || '-' }}
                            </div>
                        </div>
                        <div class="space-y-2 flex flex-col">
                            <label for="" class="text-[#8E8E8E] text-xs md:text-sm">Tempat Lahir</label>
                            <div class="p-3 rounded-lg bg-white text-sm md:text-base">{{ anakData.birth_place || '-' }}
                            </div>
                        </div>
                        <div class="space-y-2 flex flex-col">
                            <label for="" class="text-[#8E8E8E] text-xs md:text-sm">Tanggal Lahir</label>
                            <div class="p-3 rounded-lg bg-white text-sm md:text-base">{{ anakData.birth_date || '-' }}
                            </div>
                        </div>
                        <div class="space-y-2 flex flex-col">
                            <label for="" class="text-[#8E8E8E] text-xs md:text-sm">Jenis Kelamin</label>
                            <div class="p-3 rounded-lg bg-white text-sm md:text-base">{{ anakData.gender || '-' }}</div>
                        </div>
                        <div class="space-y-2 flex flex-col">
                            <label for="" class="text-[#8E8E8E] text-xs md:text-sm">Usia</label>
                            <div class="p-3 rounded-lg bg-white text-sm md:text-base">{{
                                calculateAge(anakData.birth_date) }}</div>
                        </div>
                        <div class="space-y-2 flex flex-col">
                            <label for="" class="text-[#8E8E8E] text-xs md:text-sm">Suku</label>
                            <div class="p-3 rounded-lg bg-white text-sm md:text-base">{{ anakData.ethnic || '-' }}</div>
                        </div>
                        <div class="space-y-2 flex flex-col">
                            <label for="" class="text-[#8E8E8E] text-xs md:text-sm">Alamat Rumah</label>
                            <div class="p-3 rounded-lg bg-white text-sm md:text-base">{{ anakData.address || '-' }}
                            </div>
                        </div>
                        <div class="space-y-2 flex flex-col">
                            <label for="" class="text-[#8E8E8E] text-xs md:text-sm">Anak Ke</label>
                            <div class="p-3 rounded-lg bg-white text-sm md:text-base">{{ anakData.child_number || '-' }}
                            </div>
                        </div>
                        <div class="space-y-2 flex flex-col">
                            <label for="" class="text-[#8E8E8E] text-xs md:text-sm">Jumlah Saudara</label>
                            <div class="p-3 rounded-lg bg-white text-sm md:text-base">{{ saudaraData.length + 1 || '-'
                                }}</div>
                        </div>
                        <div class="space-y-2 flex flex-col">
                            <label for="" class="text-[#8E8E8E] text-xs md:text-sm">Agama</label>
                            <div class="p-3 rounded-lg bg-white text-sm md:text-base">{{ anakData.religion === '1' ?
                                'Islam' : anakData.religion || '-' }}</div>
                        </div>
                        <div class="space-y-2 flex flex-col">
                            <label for="" class="text-[#8E8E8E] text-xs md:text-sm">Kewarganegaraan</label>
                            <div class="p-3 rounded-lg bg-white text-sm md:text-base">{{ anakData.nationality || '-' }}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="w-full pt-6 md:pt-8">
                <div class="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100">
                    <div class="hidden md:block bg-primary text-white">
                        <div class="grid grid-cols-4 gap-4 px-6 py-4 font-semibold text-sm">
                            <div>Nama</div>
                            <div>Umur</div>
                            <div>Pekerjaan/Pendidikan</div>
                            <div>Keterangan</div>
                        </div>
                    </div>

                    <div class="md:hidden bg-primary text-white px-4 py-3">
                        <div class="font-semibold text-sm">Data Saudara</div>
                    </div>

                    <div class="bg-white">
                        <div v-for="saudara in saudaraData" :key="saudara.id"
                            class="hidden md:grid grid-cols-4 gap-4 px-6 py-4 text-sm text-gray-700 border-b border-gray-100 hover:bg-gray-50 transition-colors">
                            <div class="font-medium text-gray-900">{{ saudara.name || '-' }}</div>
                            <div>{{ calculateAge(saudara.birth_date) }} Th</div>
                            <div>{{ saudara.pekerjaan || '-' }} / {{ saudara.pendidikan || '-' }}</div>
                            <div class="text-gray-600">
                                {{ saudara.type || '-' }} - Anak ke {{ saudara.anak_ke || '-' }} dari {{
                                    saudara.jumlah_sodara || '-' }} bersaudara
                            </div>
                        </div>

                        <div v-for="saudara in saudaraData" :key="'mobile-' + saudara.id"
                            class="md:hidden p-4 text-sm text-gray-700 border-b border-gray-100 hover:bg-gray-50 transition-colors">
                            <div class="grid grid-cols-1 gap-3">
                                <div class="flex justify-between">
                                    <span class="font-medium text-gray-900">Nama:</span>
                                    <span>{{ saudara.name || '-' }}</span>
                                </div>
                                <div class="flex justify-between">
                                    <span class="font-medium text-gray-900">Umur:</span>
                                    <span>{{ calculateAge(saudara.birth_date) }} Th</span>
                                </div>
                                <div class="flex justify-between">
                                    <span class="font-medium text-gray-900">Pekerjaan/Pendidikan:</span>
                                    <span class="text-right">{{ saudara.pekerjaan || '-' }} / {{ saudara.pendidikan ||
                                        '-' }}</span>
                                </div>
                                <div class="flex justify-between">
                                    <span class="font-medium text-gray-900">Keterangan:</span>
                                    <span class="text-right">
                                        {{ saudara.type || '-' }} - Anak ke {{ saudara.anak_ke || '-' }} dari {{
                                            saudara.jumlah_sodara || '-' }} bersaudara
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div v-if="saudaraData.length === 0"
                            class="px-6 py-4 text-sm text-gray-700 border-b border-gray-100 hover:bg-gray-50 transition-colors">
                            <div class="text-center py-4">Tidak ada data saudara</div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Data Orang Tua  -->
            <div class="space-y-4 md:space-y-6 pt-6 md:pt-8">
                <h3 class="text-base md:text-xl font-medium">Orang Tua/Wali</h3>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                    <!-- Data Ayah -->
                    <div class="space-y-4">
                        <div class="grid grid-cols-1 gap-3 md:gap-6">
                            <div class="space-y-2 flex flex-col">
                                <label for="" class="text-[#8E8E8E] text-xs md:text-sm">Nama Ayah</label>
                                <div class="p-3 rounded-lg bg-[#f5f5f5] text-sm md:text-base">{{ ayahData.name || '-' }}
                                </div>
                            </div>
                            <div class="space-y-2 flex flex-col">
                                <label for="" class="text-[#8E8E8E] text-xs md:text-sm">Usia</label>
                                <div class="p-3 rounded-lg bg-[#f5f5f5] text-sm md:text-base">{{
                                    calculateAge(ayahData.birth_date)
                                }}</div>
                            </div>
                            <div class="grid grid-cols-2 gap-4 md:gap-6">
                                <div class="space-y-2 flex flex-col">
                                    <label for="" class="text-[#8E8E8E] text-xs md:text-sm">Anak Ke</label>
                                    <div class="p-3 rounded-lg bg-[#f5f5f5] text-sm md:text-base">{{ ayahData.anak_ke ||
                                        '-'
                                        }}
                                    </div>
                                </div>
                                <div class="space-y-2 flex flex-col">
                                    <label for="" class="text-[#8E8E8E] text-xs md:text-sm">Jumlah Saudara</label>
                                    <div class="p-3 rounded-lg bg-[#f5f5f5] text-sm md:text-base">{{
                                        ayahData.jumlah_sodara
                                        ||
                                        '-'
                                    }}
                                    </div>
                                </div>
                            </div>
                            <div class="space-y-2 flex flex-col">
                                <label for="" class="text-[#8E8E8E] text-xs md:text-sm">Kewarganegaraan</label>
                                <div class="p-3 rounded-lg bg-[#f5f5f5] text-sm md:text-base">{{
                                    ayahData.kewarganegaraan ||
                                    '-'
                                }}
                                </div>
                            </div>
                            <div class="space-y-2 flex flex-col">
                                <label for="" class="text-[#8E8E8E] text-xs md:text-sm">Agama</label>
                                <div class="p-3 rounded-lg bg-[#f5f5f5] text-sm md:text-base">{{ ayahData.religion ||
                                    '-' }}
                                </div>
                            </div>
                            <div class="space-y-2 flex flex-col">
                                <label for="" class="text-[#8E8E8E] text-xs md:text-sm">Pernikahan Ke</label>
                                <div class="p-3 rounded-lg bg-[#f5f5f5] text-sm md:text-base">{{ ayahData.pernikahan_ke
                                    ||
                                    '-'
                                }}
                                </div>
                            </div>
                            <div class="space-y-2 flex flex-col">
                                <label for="" class="text-[#8E8E8E] text-xs md:text-sm">Pendidikan</label>
                                <div class="p-3 rounded-lg bg-[#f5f5f5] text-sm md:text-base">{{ ayahData.pendidikan ||
                                    '-'
                                }}
                                </div>
                            </div>
                            <div class="space-y-2 flex flex-col">
                                <label for="" class="text-[#8E8E8E] text-xs md:text-sm">Pekerjaan</label>
                                <div class="p-3 rounded-lg bg-[#f5f5f5] text-sm md:text-base">{{ ayahData.pekerjaan ||
                                    '-'
                                }}
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Data Ibu -->
                    <div class="space-y-4">
                        <div class="grid grid-cols-1 gap-3 md:gap-6">
                            <div class="space-y-2 flex flex-col">
                                <label for="" class="text-[#8E8E8E] text-xs md:text-sm">Nama Ibu</label>
                                <div class="p-3 rounded-lg bg-[#f5f5f5] text-sm md:text-base">{{ ibuData.name || '-' }}
                                </div>
                            </div>
                            <div class="space-y-2 flex flex-col">
                                <label for="" class="text-[#8E8E8E] text-xs md:text-sm">Usia</label>
                                <div class="p-3 rounded-lg bg-[#f5f5f5] text-sm md:text-base">{{
                                    calculateAge(ibuData.birth_date) }}
                                </div>
                            </div>
                            <div class="grid grid-cols-2 gap-4 md:gap-6">
                                <div class="space-y-2 flex flex-col">
                                    <label for="" class="text-[#8E8E8E] text-xs md:text-sm">Anak Ke</label>
                                    <div class="p-3 rounded-lg bg-[#f5f5f5] text-sm md:text-base">{{ ibuData.anak_ke ||
                                        '-'
                                    }}
                                    </div>
                                </div>
                                <div class="space-y-2 flex flex-col">
                                    <label for="" class="text-[#8E8E8E] text-xs md:text-sm">Jumlah Saudara</label>
                                    <div class="p-3 rounded-lg bg-[#f5f5f5] text-sm md:text-base">{{
                                        ibuData.jumlah_sodara
                                        ||
                                        '-' }}
                                    </div>
                                </div>
                            </div>
                            <div class="space-y-2 flex flex-col">
                                <label for="" class="text-[#8E8E8E] text-xs md:text-sm">Kewarganegaraan</label>
                                <div class="p-3 rounded-lg bg-[#f5f5f5] text-sm md:text-base">{{ ibuData.kewarganegaraan
                                    ||
                                    '-'
                                }}
                                </div>
                            </div>
                            <div class="space-y-2 flex flex-col">
                                <label for="" class="text-[#8E8E8E] text-xs md:text-sm">Agama</label>
                                <div class="p-3 rounded-lg bg-[#f5f5f5] text-sm md:text-base">{{ ibuData.religion || '-'
                                }}
                                </div>
                            </div>
                            <div class="space-y-2 flex flex-col">
                                <label for="" class="text-[#8E8E8E] text-xs md:text-sm">Pernikahan Ke</label>
                                <div class="p-3 rounded-lg bg-[#f5f5f5] text-sm md:text-base">{{ ibuData.pernikahan_ke
                                    ||
                                    '-' }}
                                </div>
                            </div>
                            <div class="space-y-2 flex flex-col">
                                <label for="" class="text-[#8E8E8E] text-xs md:text-sm">Pendidikan</label>
                                <div class="p-3 rounded-lg bg-[#f5f5f5] text-sm md:text-base">{{ ibuData.pendidikan ||
                                    '-'
                                }}
                                </div>
                            </div>
                            <div class="space-y-2 flex flex-col">
                                <label for="" class="text-[#8E8E8E] text-xs md:text-sm">Pekerjaan</label>
                                <div class="p-3 rounded-lg bg-[#f5f5f5] text-sm md:text-base">{{ ibuData.pekerjaan ||
                                    '-' }}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div v-if="activeContentTab === 'pemeriksaan'">
            <CheckNotes />
            <!-- Konten pemeriksaan akan ditambahkan di sini -->
        </div>
    </div>
</template>