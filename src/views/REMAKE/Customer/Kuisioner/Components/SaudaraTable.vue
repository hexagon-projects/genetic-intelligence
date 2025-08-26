<!-- SaudaraTable.vue -->
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
    // Editing existing saudara
    editingSaudara.value = saudara;
    isEditing.value = true;
    formData.value = { ...saudara };
  } else {
    // Adding new saudara
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
  <div class="space-y-4">
    <div class="flex justify-between items-center">
      <h2 class="text-sm md:text-xl font-bold">Data Saudara</h2>
      <button @click="openModal()" class="py-2 px-4 rounded-full text-white text-sm bg-primary">
        + Tambah Saudara
      </button>
    </div>

    <div class="overflow-x-auto">
      <table class="w-full border-collapse">
        <thead>
          <tr class="bg-gray-100">
            <th class="p-3 text-left text-xs md:text-sm">Nama</th>
            <th class="p-3 text-left text-xs md:text-sm">Tipe</th>
            <th class="p-3 text-left text-xs md:text-sm">Tanggal Lahir</th>
            <th class="p-3 text-left text-xs md:text-sm">Pendidikan</th>
            <th class="p-3 text-left text-xs md:text-sm">Aksi</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="saudara in saudaraData" :key="saudara.id" class="border-b">
            <td class="p-3 text-xs md:text-sm">{{ saudara.name }}</td>
            <td class="p-3 text-xs md:text-sm">{{ saudara.type }}</td>
            <td class="p-3 text-xs md:text-sm">{{ saudara.birth_date }}</td>
            <td class="p-3 text-xs md:text-sm">{{ saudara.pendidikan }}</td>
            <td class="p-3 text-xs md:text-sm">
              <button @click="openModal(saudara)" class="text-blue-500 mr-2">Edit</button>
              <button @click="deleteSaudara(saudara.id)" class="text-red-500">Hapus</button>
            </td>
          </tr>
          <tr v-if="saudaraData.length === 0">
            <td colspan="5" class="p-3 text-center text-xs md:text-sm text-gray-500">
              Tidak ada data saudara
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Modal -->
    <div v-if="showModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div class="bg-white rounded-lg w-full max-w-md p-6">
        <h3 class="text-lg font-bold mb-4">
          {{ isEditing ? 'Edit Saudara' : 'Tambah Saudara' }}
        </h3>
        
        <div class="space-y-3">
          <div>
            <label class="block text-sm text-gray-600 mb-1">Tipe</label>
            <select v-model="formData.type" class="w-full p-2 border rounded">
              <option value="">Pilih Tipe</option>
              <option value="Kakak">Kakak</option>
              <option value="Adik">Adik</option>
            </select>
          </div>
          
          <div>
            <label class="block text-sm text-gray-600 mb-1">Nama</label>
            <input v-model="formData.name" type="text" class="w-full p-2 border rounded">
          </div>
          
          <div>
            <label class="block text-sm text-gray-600 mb-1">Tanggal Lahir</label>
            <input v-model="formData.birth_date" type="date" class="w-full p-2 border rounded">
          </div>
          
          <div>
            <label class="block text-sm text-gray-600 mb-1">Kewarganegaraan</label>
            <input v-model="formData.kewarganegaraan" type="text" class="w-full p-2 border rounded">
          </div>
          
          <div>
            <label class="block text-sm text-gray-600 mb-1">Agama</label>
            <input v-model="formData.religion" type="text" class="w-full p-2 border rounded">
          </div>
          
          <div>
            <label class="block text-sm text-gray-600 mb-1">Anak Ke</label>
            <input v-model="formData.anak_ke" type="number" class="w-full p-2 border rounded">
          </div>
          
          <div>
            <label class="block text-sm text-gray-600 mb-1">Jumlah Saudara</label>
            <input v-model="formData.jumlah_sodara" type="number" class="w-full p-2 border rounded">
          </div>
          
          <div>
            <label class="block text-sm text-gray-600 mb-1">Pendidikan</label>
            <select v-model="formData.pendidikan" class="w-full p-2 border rounded">
              <option value="">Pilih Pendidikan</option>
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
          
          <div>
            <label class="block text-sm text-gray-600 mb-1">Pekerjaan</label>
            <input v-model="formData.pekerjaan" type="text" class="w-full p-2 border rounded">
          </div>
        </div>
        
        <div class="flex justify-end space-x-2 mt-6">
          <button @click="closeModal" class="px-4 py-2 border rounded">Batal</button>
          <button @click="saveSaudara" class="px-4 py-2 bg-primary text-white rounded">
            {{ isEditing ? 'Update' : 'Simpan' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>