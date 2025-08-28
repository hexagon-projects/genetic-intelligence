<script setup>
import { ref, onMounted } from 'vue';
import Swal from 'sweetalert2';
import initAPI from '../../../../../api/api';
import Cookies from 'js-cookie';
import { useStore } from 'vuex';
import { computed } from 'vue';

const store = useStore();
const userData = computed(() => store.getters.getUserData);
const saudaraData = ref([]);
const showModal = ref(false);
const editingSaudara = ref(null);
const isEditing = ref(false);

const formData = ref({
    type: '',
    name: '',
    birth_date: '',
    kewarganegaraan: '',
    religion: '',
    anak_ke: '',
    jumlah_sodara: '',
    pendidikan: '',
    pekerjaan: ''
});

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

const openModal = (saudara = null) => {
    if (saudara) {
        editingSaudara.value = saudara;
        isEditing.value = true;
        formData.value = { ...saudara };
    } else {
        editingSaudara.value = null;
        isEditing.value = false;
        formData.value = {
            type: '',
            name: '',
            birth_date: '',
            kewarganegaraan: '',
            religion: '',
            anak_ke: '',
            jumlah_sodara: '',
            pendidikan: '',
            pekerjaan: ''
        };
    }
    showModal.value = true;
};

const closeModal = () => {
    showModal.value = false;
    editingSaudara.value = null;
    isEditing.value = false;
};

const saveSaudara = async () => {
    const token = Cookies.get('token');
    if (!token || !userData.value) return;

    try {
        const data = {
            customer_id: userData.value.id,
            ...formData.value
        };

        let response;
        if (isEditing.value) {
            response = await initAPI(
                'put',
                `customers/parents/${editingSaudara.value.id}`,
                data,
                token
            );
        } else {
            response = await initAPI(
                'post',
                'customers/parents',
                data,
                token
            );
        }

        if (response.status === 200 || response.status === 201) {
            Swal.fire({
                icon: 'success',
                title: 'Success',
                text: `Data saudara berhasil ${isEditing.value ? 'diupdate' : 'disimpan'}`,
                showConfirmButton: false,
                timer: 2000
            });
            closeModal();
            fetchSaudaraData();
        }
    } catch (error) {
        console.error('Error saving saudara data:', error);
        Swal.fire({
            icon: 'error',
            title: 'Failed',
            text: `Gagal ${isEditing.value ? 'mengupdate' : 'menyimpan'} data saudara.`,
            showConfirmButton: false,
            timer: 2000
        });
    }
};

const deleteSaudara = async (id) => {
    const result = await Swal.fire({
        title: 'Apakah Anda yakin?',
        text: "Data saudara akan dihapus permanen!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Ya, hapus!',
        cancelButtonText: 'Batal'
    });

    if (result.isConfirmed) {
        const token = Cookies.get('token');
        try {
            const response = await initAPI(
                'delete',
                `customers/parents/${id}`,
                null,
                token
            );

            if (response.status === 200) {
                Swal.fire({
                    icon: 'success',
                    title: 'Terhapus!',
                    text: 'Data saudara berhasil dihapus.',
                    showConfirmButton: false,
                    timer: 2000
                });
                fetchSaudaraData();
            }
        } catch (error) {
            console.error('Error deleting saudara:', error);
            Swal.fire({
                icon: 'error',
                title: 'Gagal!',
                text: 'Tidak dapat menghapus data saudara.',
                showConfirmButton: false,
                timer: 2000
            });
        }
    }
};

onMounted(() => {
    fetchSaudaraData();
});
</script>

<template>
    <div class="space-y-4 p-2 sm:p-4 bg-gray-100 rounded-xl rounded-tr-xl md:rounded-tl-none">
        <div class="flex justify-between items-center">
            <div></div>
            <button @click="openModal()" class="text-xs md:text-sm py-2 px-3 sm:px-4 rounded-full text-white bg-primary">
                <span class="hidden sm:inline">+ Tambah Data</span>
                <span class="sm:hidden">+ Tambah</span>
            </button>
        </div>

        <!-- Mobile Card View -->
        <div class="block md:hidden space-y-3">
            <div v-for="saudara in saudaraData" :key="saudara.id" 
                 class="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
                <div class="flex justify-between items-start mb-3">
                    <div>
                        <h4 class="font-semibold text-gray-900 text-sm">{{ saudara.name }}</h4>
                        <p class="text-xs text-gray-600 mt-1">{{ saudara.type }}</p>
                    </div>
                    <div class="flex space-x-2">
                        <button @click="openModal(saudara)" 
                                class="text-blue-500 hover:text-blue-700 transition-colors text-xs">
                            Edit
                        </button>
                        <button @click="deleteSaudara(saudara.id)" 
                                class="text-red-500 hover:text-red-700 transition-colors text-xs">
                            Hapus
                        </button>
                    </div>
                </div>
                <div class="grid grid-cols-2 gap-2 text-xs">
                    <div>
                        <span class="text-gray-500">Tanggal Lahir:</span>
                        <p class="font-medium">{{ saudara.birth_date }}</p>
                    </div>
                    <div>
                        <span class="text-gray-500">Pendidikan:</span>
                        <p class="font-medium">{{ saudara.pendidikan }}</p>
                    </div>
                </div>
            </div>
            
            <!-- Empty state mobile -->
            <div v-if="saudaraData.length === 0" class="bg-white rounded-lg shadow-sm border border-gray-100 p-6 text-center">
                <div class="text-sm text-gray-500">
                    Tidak ada data saudara
                </div>
            </div>
        </div>

        <!-- Desktop Table View -->
        <div class="hidden md:block overflow-x-auto">
            <div class="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100">
                <!-- Header dengan gradient -->
                <div class="bg-primary text-white">
                    <div class="grid grid-cols-5 gap-4 px-6 py-4 font-semibold text-xs md:text-sm">
                        <div>Nama</div>
                        <div>Tipe</div>
                        <div>Tanggal Lahir</div>
                        <div>Pendidikan</div>
                        <div>Aksi</div>
                    </div>
                </div>
                
                <!-- Body -->
                <div class="bg-white">
                    <div v-for="saudara in saudaraData" :key="saudara.id" 
                         class="grid grid-cols-5 gap-4 px-6 py-4 text-xs md:text-sm text-gray-700 border-b border-gray-100 hover:bg-gray-50 transition-colors">
                        <div class="font-medium text-gray-900">{{ saudara.name }}</div>
                        <div>{{ saudara.type }}</div>
                        <div>{{ saudara.birth_date }}</div>
                        <div>{{ saudara.pendidikan }}</div>
                        <div class="flex space-x-2">
                            <button @click="openModal(saudara)" class="text-blue-500 hover:text-blue-700 transition-colors">Edit</button>
                            <button @click="deleteSaudara(saudara.id)" class="text-red-500 hover:text-red-700 transition-colors">Hapus</button>
                        </div>
                    </div>
                    
                    <!-- Empty state desktop -->
                    <div v-if="saudaraData.length === 0" class="px-6 py-8 text-center">
                        <div class="text-xs md:text-sm text-gray-500">
                            Tidak ada data saudara
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Modal -->
        <div v-if="showModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-2 sm:p-4">
            <div class="bg-white rounded-lg w-full max-w-md sm:max-w-lg md:max-w-[70%] lg:max-w-[50%] mx-auto p-4 sm:p-6 max-h-[90vh] overflow-y-auto">
                <h3 class="text-base sm:text-lg font-bold mb-4">
                    {{ isEditing ? 'Edit Saudara' : 'Tambah Saudara' }}
                </h3>

                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                    <div class="sm:col-span-1">
                        <label class="block text-xs md:text-sm text-gray-600 mb-1">Tipe</label>
                        <select v-model="formData.type" class="w-full p-2 border rounded text-xs md:text-sm">
                            <option value="">Pilih Tipe</option>
                            <option value="Kakak">Kakak</option>
                            <option value="Adik">Adik</option>
                        </select>
                    </div>

                    <div class="sm:col-span-1">
                        <label class="block text-xs md:text-sm text-gray-600 mb-1">Nama</label>
                        <input v-model="formData.name" type="text" class="w-full p-2 border rounded text-xs md:text-sm">
                    </div>

                    <div class="sm:col-span-1">
                        <label class="block text-xs md:text-sm text-gray-600 mb-1">Tanggal Lahir</label>
                        <input v-model="formData.birth_date" type="date"
                            class="w-full p-2 border rounded text-xs md:text-sm">
                    </div>

                    <div class="sm:col-span-1">
                        <label class="block text-xs md:text-sm text-gray-600 mb-1">Kewarganegaraan</label>
                        <input v-model="formData.kewarganegaraan" type="text"
                            class="w-full p-2 border rounded text-xs md:text-sm">
                    </div>

                    <div class="sm:col-span-1">
                        <label class="block text-xs md:text-sm text-gray-600 mb-1">Agama</label>
                        <input v-model="formData.religion" type="text"
                            class="w-full p-2 border rounded text-xs md:text-sm">
                    </div>

                    <div class="sm:col-span-1">
                        <label class="block text-xs md:text-sm text-gray-600 mb-1">Anak Ke</label>
                        <input v-model="formData.anak_ke" type="number"
                            class="w-full p-2 border rounded text-xs md:text-sm">
                    </div>

                    <div class="sm:col-span-1">
                        <label class="block text-xs md:text-sm text-gray-600 mb-1">Jumlah Saudara</label>
                        <input v-model="formData.jumlah_sodara" type="number"
                            class="w-full p-2 border rounded text-xs md:text-sm">
                    </div>

                    <div class="sm:col-span-1">
                        <label class="block text-xs md:text-sm text-gray-600 mb-1">Pendidikan</label>
                        <select v-model="formData.pendidikan" class="w-full p-2 border rounded text-xs md:text-sm">
                            <option value="">Pilih Pendidikan</option>
                            <option value="Belum Sekolah">Belum Sekolah</option>
                            <option value="TK">TK</option>
                            <option value="SD">SD</option>
                            <option value="SMP">SMP</option>
                            <option value="SMA">SMA</option>
                            <option value="D1">D1</option>
                            <option value="D2">D2</option>
                            <option value="D3">D3</option>
                            <option value="D4">D4</option>
                            <option value="S1">S1</option>
                            <option value="S2">S2</option>
                            <option value="S3">S3</option>
                        </select>
                    </div>

                    <div class="sm:col-span-2">
                        <label class="block text-xs md:text-sm text-gray-600 mb-1">Pekerjaan</label>
                        <input v-model="formData.pekerjaan" type="text"
                            class="w-full p-2 border rounded text-xs md:text-sm">
                    </div>
                </div>

                <div class="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-2 mt-6">
                    <button @click="closeModal" class="w-full sm:w-auto px-4 py-2 border rounded text-sm md:text-base order-2 sm:order-1">
                        Batal
                    </button>
                    <button @click="saveSaudara" class="w-full sm:w-auto px-4 py-2 bg-primary text-white rounded text-sm md:text-base order-1 sm:order-2">
                        {{ isEditing ? 'Update' : 'Simpan' }}
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>