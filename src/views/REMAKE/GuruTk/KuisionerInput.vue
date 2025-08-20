<script setup>
import Layout from '../../../Layout/GuruTk/Layout.vue';
import { ref, computed } from 'vue';

const kategoriOptions = ref([
  'Pernyataan Umum',
  'Pernyataan Khusus',
  'Observasi',
  'Rekomendasi',
  'Lainnya'
]);

const catatanList = ref([]);
const catatanUtama = ref({
  kategori: 'Pernyataan Umum',
  teks: ''
});

const tambahCatatan = () => {
  if (catatanList.value.length < 4) {
    catatanList.value.push({
      id: Date.now(),
      nomor: catatanList.value.length + 2, 
      kategori: '',
      teks: ''
    });
  }
};

const tombolText = computed(() => {
  return catatanList.value.length >= 4 ? 'Simpan' : 'Tambah Catatan';
});

const hapusCatatan = (id) => {
  const index = catatanList.value.findIndex(item => item.id === id);
  if (index !== -1) {
    catatanList.value.splice(index, 1);
    
    catatanList.value.forEach((catatan, idx) => {
      catatan.nomor = idx + 2;
    });
  }
};
</script>

<template>
    <Layout>
        <div class="w-full md:p-4">
            <section
                class="w-full max-w-[90%] md:max-w-[75%] lg:max-w-[50%] xl:max-w-[50%] mx-auto space-y-4">
                
                <div class="flex gap-8 items-start">
                    <div class="md:w-[5%]">
                        <div
                            class="w-11 h-11 rounded-full bg-primary text-white font-medium flex justify-center items-center">
                            <p class="text-xl">01</p>
                        </div>
                    </div>
                    <div class="w-full space-y-4">
                        <div class="w-full flex items-center gap-4">
                            <div class="w-[60%] p-3 rounded-lg bg-[#F5F5F5]">
                                <p class="text-sm md:text-base">{{ catatanUtama.kategori }}</p>
                            </div>
                            <!-- Dropdown Pilih Kategori-->
                            <div class="w-[40%] relative">
                                <select v-model="catatanUtama.kategori" 
                                    class="w-full p-3 bg-white flex justify-between items-center rounded-lg shadow-md shadow-black/5 appearance-none text-sm md:text-base">
                                    <option v-for="(option, index) in kategoriOptions" :key="index" :value="option">
                                        {{ option }}
                                    </option>
                                </select>
                                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="10" viewBox="0 0 25 10" fill="none"
                                    class="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                                    <path
                                        d="M12.5001 9.28574C12.4017 9.28688 12.3042 9.2684 12.2138 9.2315C12.1234 9.19459 12.0421 9.14007 11.9751 9.07145L5.22548 2.64288C4.92549 2.35716 4.92549 1.91431 5.22548 1.62859C5.52546 1.34288 5.99044 1.34288 6.29042 1.62859L12.5151 7.55716L18.7248 1.64288C19.0248 1.35716 19.4897 1.35716 19.7897 1.64288C20.0897 1.92859 20.0897 2.37145 19.7897 2.65716L13.0401 9.08574C12.8901 9.22859 12.6951 9.30002 12.5151 9.30002L12.5001 9.28574Z"
                                        fill="#333333" />
                                </svg>
                            </div>
                        </div>

                        <div class="w-full">
                            <textarea v-model="catatanUtama.teks" rows="10"
                                class="w-full bg-[#F5F5F5] rounded-lg border border-[#A0A0A0] text-sm md:text-base p-3"></textarea>
                        </div>
                    </div>
                </div>

                <div v-for="(catatan, index) in catatanList" :key="catatan.id" class="flex gap-8 items-start">
                    <div class="md:w-[5%]">
                        <div
                            class="w-11 h-11 rounded-full bg-primary text-white font-medium flex justify-center items-center">
                            <p class="text-xl">{{ catatan.nomor.toString().padStart(2, '0') }}</p>
                        </div>
                    </div>
                    <div class="w-full space-y-4">
                        <div class="w-full flex items-center gap-4">
                            <div class="w-[60%] p-3 rounded-lg bg-[#F5F5F5]">
                                <p class="text-sm md:text-base">{{ catatan.kategori || 'Pilih Kategori' }}</p>
                            </div>
                            <!-- Dropdown Pilih Kategori-->
                            <div class="w-[40%] relative">
                                <select v-model="catatan.kategori" 
                                    class="w-full p-3 bg-white flex justify-between items-center rounded-lg shadow-md shadow-black/5 appearance-none text-sm md:text-base">
                                    <option value="">Pilih Opsi</option>
                                    <option v-for="(option, optIndex) in kategoriOptions" :key="optIndex" :value="option">
                                        {{ option }}
                                    </option>
                                </select>
                                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="10" viewBox="0 0 25 10" fill="none"
                                    class="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                                    <path
                                        d="M12.5001 9.28574C12.4017 9.28688 12.3042 9.2684 12.2138 9.2315C12.1234 9.19459 12.0421 9.14007 11.9751 9.07145L5.22548 2.64288C4.92549 2.35716 4.92549 1.91431 5.22548 1.62859C5.52546 1.34288 5.99044 1.34288 6.29042 1.62859L12.5151 7.55716L18.7248 1.64288C19.0248 1.35716 19.4897 1.35716 19.7897 1.64288C20.0897 1.92859 20.0897 2.37145 19.7897 2.65716L13.0401 9.08574C12.8901 9.22859 12.6951 9.30002 12.5151 9.30002L12.5001 9.28574Z"
                                        fill="#333333" />
                                </svg>
                            </div>
                        </div>

                        <div class="w-full">
                            <textarea v-model="catatan.teks" rows="10"
                                class="w-full bg-[#F5F5F5] rounded-lg border border-[#A0A0A0] text-sm md:text-base p-3"></textarea>
                        </div>
                        
                        <!-- Tombol Hapus -->
                        <button @click="hapusCatatan(catatan.id)" 
                            class="py-2 px-4 rounded-full bg-red-500 text-white text-sm">
                            Hapus
                        </button>
                    </div>
                </div>

                <!-- Button -->
                <button @click="tambahCatatan" :disabled="catatanList.length >= 4"
                    :class="['py-3 px-6 rounded-full text-white flex items-center gap-2 ml-auto text-sm md:text-base', 
                            tombolText === 'Simpan' ? 'bg-green-600' : 'bg-primary',
                            catatanList.length >= 4 ? 'cursor-not-allowed opacity-80' : '']">
                    <span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path
                                d="M7.00684 12C7.00684 11.801 7.08585 11.6103 7.22651 11.4696C7.36716 11.329 7.55792 11.25 7.75684 11.25H11.2498V7.75696C11.2498 7.55805 11.3289 7.36728 11.4695 7.22663C11.6102 7.08598 11.8009 7.00696 11.9998 7.00696C12.1987 7.00696 12.3895 7.08598 12.5302 7.22663C12.6708 7.36728 12.7498 7.55805 12.7498 7.75696V11.25H16.2428C16.4417 11.25 16.6325 11.329 16.7732 11.4696C16.9138 11.6103 16.9928 11.801 16.9928 12C16.9928 12.1989 16.9138 12.3896 16.7732 12.5303C16.6325 12.6709 16.4417 12.75 16.2428 12.75H12.7498V16.243C12.7498 16.4419 12.6708 16.6326 12.5302 16.7733C12.3895 16.9139 12.1987 16.993 11.9998 16.993C11.8009 16.993 11.6102 16.9139 11.4695 16.7733C11.3289 16.6326 11.2498 16.4419 11.2498 16.243V12.75H7.75684C7.55792 12.75 7.36716 12.6709 7.22651 12.5303C7.08585 12.3896 7.00684 12.1989 7.00684 12Z"
                                fill="#E6E6E6" />
                            <path fill-rule="evenodd" clip-rule="evenodd"
                                d="M7.31716 3.76905C10.4296 3.42399 13.5707 3.42399 16.6832 3.76905C18.5102 3.97305 19.9852 5.41205 20.1992 7.24905C20.5692 10.406 20.5692 13.595 20.1992 16.752C19.9842 18.589 18.5092 20.027 16.6832 20.232C13.5707 20.5771 10.4296 20.5771 7.31716 20.232C5.49016 20.027 4.01516 18.589 3.80116 16.752C3.43282 13.5951 3.43282 10.406 3.80116 7.24905C4.01516 5.41205 5.49116 3.97305 7.31716 3.76905ZM16.5172 5.25905C13.515 4.92627 10.4853 4.92627 7.48316 5.25905C6.9274 5.3207 6.40866 5.56792 6.01074 5.96076C5.61281 6.35361 5.35895 6.86913 5.29016 7.42405C4.93449 10.465 4.93449 13.5371 5.29016 16.578C5.35916 17.1328 5.61312 17.6481 6.01102 18.0407C6.40892 18.4334 6.92755 18.6804 7.48316 18.742C10.4602 19.074 13.5402 19.074 16.5172 18.742C17.0726 18.6802 17.591 18.4331 17.9887 18.0404C18.3864 17.6478 18.6402 17.1326 18.7092 16.578C19.0648 13.5371 19.0648 10.465 18.7092 7.42405C18.64 6.86964 18.3861 6.35469 17.9884 5.96227C17.5907 5.56985 17.0724 5.32282 16.5172 5.26105"
                                fill="#E6E6E6" />
                        </svg>
                    </span>
                    {{ tombolText }}
                </button>
            </section>
        </div>
    </Layout>
</template>