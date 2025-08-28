<script setup>
import { computed, ref } from 'vue';
import InfoTabs from '../../../../Customer/Kuisioner/components/InfoTabs.vue';
import SaudaraTable from './SaudaraTable.vue';

const props = defineProps({
    ayahData: Object,
    ibuData: Object,
    userData: Object
})

const usia = computed(() => {
    if (!props.userData?.birth_date) return '';

    const birthDate = new Date(props.userData?.birth_date);
    const today = new Date();

    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }

    return age.toString();
});

const ayahDataLocal = ref(props.ayahData || {
    name: '',
    birth_date: '',
    religion: '',
    kewarganegaraan: '',
    anak_ke: '',
    jumlah_sodara: '',
    pernikahan_ke: '',
    umur_saat_menikah: '',
    pendidikan: '',
    pekerjaan: ''
});

const ibuDataLocal = ref(props.ibuData || {
    name: '',
    birth_date: '',
    religion: '',
    kewarganegaraan: '',
    anak_ke: '',
    jumlah_sodara: '',
    pernikahan_ke: '',
    umur_saat_menikah: '',
    pendidikan: '',
    pekerjaan: ''
});

const activeContentTab = ref('anak');

const handleTabChange = (tab) => {
    activeContentTab.value = tab;
};
</script>

<template>
    <div class="w-full bg-white shadow-md shadow-black/5 p-6 rounded-3xl">
        <InfoTabs @tabChange="handleTabChange" />

        <div v-if="activeContentTab === 'anak'"
            class="space-y-4 md:space-y-6 p-4 bg-gray-100 rounded-xl rounded-tr-xl md:rounded-tl-none">
            <div class="flex justify-between items-center">
                <div class="flex justify-between items-center">
                    <div class="flex items-center gap-4">
                        <div class="flex items-center gap-1">
                            <input type="radio" id="male" name="gender" value="Laki-laki"
                                :checked="userData?.gender === 'Laki-laki'" @click.prevent>
                            <label for="male">Laki Laki</label>
                        </div>
                        <div class="flex items-center gap-1">
                            <input type="radio" id="female" name="gender" value="Perempuan"
                                :checked="userData?.gender === 'Perempuan'" @click.prevent>
                            <label for="female">Perempuan</label>
                        </div>
                    </div>
                </div>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-6">
                <div class="space-y-2 flex flex-col">
                    <label for="" class="text-[#8E8E8E] text-sm">Nama Depan</label>
                    <div type="text" class="p-3 rounded-lg bg-white">
                        <p class="text-base">{{ userData?.first_name }}</p>
                    </div>
                </div>
                <div class="space-y-2 flex flex-col">
                    <label for="" class="text-[#8E8E8E] text-sm">Nama Belakang</label>
                    <div type="text" class="p-3 rounded-lg bg-white">
                        <p class="text-base">{{ userData?.last_name }}</p>
                    </div>
                </div>
                <div class="space-y-2 flex flex-col">
                    <label for="" class="text-[#8E8E8E] text-sm">Tempat Lahir</label>
                    <div type="text" class="p-3 rounded-lg bg-white">
                        <p class="text-base">{{ userData?.birth_place }}</p>
                    </div>
                </div>
                <div class="space-y-2 flex flex-col">
                    <label for="" class="text-[#8E8E8E] text-sm">Tanggal Lahir</label>
                    <div type="text" class="p-3 rounded-lg bg-white">
                        <p class="text-base">{{ userData?.birth_date }}</p>
                    </div>
                </div>
                <div class="space-y-2 flex flex-col">
                    <label for="" class="text-[#8E8E8E] text-sm">Usia</label>
                    <div type="text" class="p-3 rounded-lg bg-white">
                        <p class="text-base">{{ usia }}</p>
                    </div>
                </div>
                <div class="space-y-2 flex flex-col">
                    <label for="" class="text-[#8E8E8E] text-sm">Suku</label>
                    <div type="text" class="p-3 rounded-lg bg-white">
                        <p class="text-base">{{ userData?.ethnic }}</p>
                    </div>
                </div>
                <div class="space-y-2 flex flex-col">
                    <label for="" class="text-[#8E8E8E] text-sm">Alamat Rumah</label>
                    <div type="text" class="p-3 rounded-lg bg-white">
                        <p class="text-base">{{ userData?.address }}</p>
                    </div>
                </div>
                <div class="space-y-2 flex flex-col">
                    <label for="" class="text-[#8E8E8E] text-sm">Anak Ke</label>
                    <div type="text" class="p-3 rounded-lg bg-white">
                        <p class="text-base">{{ userData?.child_number }}</p>
                    </div>
                </div>
                <div class="space-y-2 flex flex-col">
                    <label for="" class="text-[#8E8E8E] text-sm">Jumlah Saudara</label>
                    <div type="text" class="p-3 rounded-lg bg-white">
                        <p class="text-base">{{ userData?.from_child_number }}</p>
                    </div>
                </div>
            </div>
        </div>

        <!-- Data Orang Tua -->
        <div v-if="activeContentTab === 'orangtua'"
            class="space-y-4 md:space-y-6 p-4 bg-gray-100 rounded-xl rounded-tr-xl md:rounded-tl-none">
            <div class="space-y-4 md:space-y-6">
                <h2 class="text-sm md:text-base font-bold">Data Ayah</h2>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-6">
                    <div class="space-y-2 flex flex-col">
                        <label for="ayah-name" class="text-[#8E8E8E] text-xs md:text-sm">Nama</label>
                        <div id="ayah-name" type="text" class="p-3 rounded-lg bg-white text-sm md:text-base">
                            {{ ayahDataLocal.name }}
                        </div>
                    </div>
                    <div class="space-y-2 flex flex-col">
                        <label for="ayah-birth-date" class="text-[#8E8E8E] text-xs md:text-sm">Tanggal Lahir</label>
                        <div id="ayah-birth-date" type="date" class="p-3 rounded-lg bg-white text-sm md:text-base">
                            {{ ayahDataLocal.birth_date }}
                        </div>
                    </div>
                    <div class="space-y-2 flex flex-col">
                        <label for="ayah-religion" class="text-[#8E8E8E] text-xs md:text-sm">Agama</label>
                        <div id="ayah-religion" type="text" class="p-3 rounded-lg bg-white text-sm md:text-base">
                            {{ ayahDataLocal.religion }}
                        </div>
                    </div>
                    <div class="space-y-2 flex flex-col">
                        <label for="ayah-kewarganegaraan"
                            class="text-[#8E8E8E] text-xs md:text-sm">Kewarganegaraan</label>
                        <div id="ayah-kewarganegaraan" type="text" class="p-3 rounded-lg bg-white text-sm md:text-base">
                            {{ ayahDataLocal.kewarganegaraan }}
                        </div>
                    </div>
                    <div class="space-y-2 flex flex-col">
                        <label for="ayah-anak-ke" class="text-[#8E8E8E] text-xs md:text-sm">Anak Ke</label>
                        <div id="ayah-anak-ke" type="number" class="p-3 rounded-lg bg-white text-sm md:text-base">
                            {{ ayahDataLocal.anak_ke }}
                        </div>
                    </div>
                    <div class="space-y-2 flex flex-col">
                        <label for="ayah-jumlah-sodara" class="text-[#8E8E8E] text-xs md:text-sm">Jumlah Saudara</label>
                        <div id="ayah-jumlah-sodara" type="number" class="p-3 rounded-lg bg-white text-sm md:text-base">
                            {{ ayahDataLocal.jumlah_sodara }}
                        </div>
                    </div>
                    <div class="space-y-2 flex flex-col">
                        <label for="ayah-pernikahan-ke" class="text-[#8E8E8E] text-xs md:text-sm">Pernikahan Ke</label>
                        <div id="ayah-pernikahan-ke" type="number" class="p-3 rounded-lg bg-white text-sm md:text-base">
                            {{ ayahDataLocal.pernikahan_ke }}</div>
                    </div>
                    <div class="space-y-2 flex flex-col">
                        <label for="ayah-umur-menikah" class="text-[#8E8E8E] text-xs md:text-sm">Umur Saat
                            Menikah</label>
                        <div id="ayah-umur-menikah" type="number" class="p-3 rounded-lg bg-white text-sm md:text-base">
                            {{ ayahDataLocal.umur_saat_menikah }}</div>
                    </div>
                    <div class="space-y-2 flex flex-col">
                        <label for="ayah-pendidikan" class="text-[#8E8E8E] text-xs md:text-sm">Pendidikan
                            Terakhir</label>
                        <div id="ayah-pekerjaan" type="text" class="p-3 rounded-lg bg-white text-sm md:text-base">{{
                            ayahDataLocal.pendidikan }}</div>
                    </div>
                    <div class="space-y-2 flex flex-col">
                        <label for="ayah-pekerjaan" class="text-[#8E8E8E] text-xs md:text-sm">Pekerjaan</label>
                        <div id="ayah-pekerjaan" type="text" class="p-3 rounded-lg bg-white text-sm md:text-base">{{
                            ayahDataLocal.pekerjaan }}</div>
                    </div>
                </div>
            </div>

            <div class="space-y-4 md:space-y-6">
                <h2 class="text-sm md:text-base font-bold">Data Ibu</h2>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-6">
                    <div class="space-y-2 flex flex-col">
                        <label for="ibu-name" class="text-[#8E8E8E] text-xs md:text-sm">Nama</label>
                        <div id="ibu-name" type="text" class="p-3 rounded-lg bg-white text-sm md:text-base">
                            {{ ibuDataLocal.name }}
                        </div>
                    </div>
                    <div class="space-y-2 flex flex-col">
                        <label for="ibu-birth-date" class="text-[#8E8E8E] text-xs md:text-sm">Tanggal Lahir</label>
                        <div id="ibu-birth-date" type="date" class="p-3 rounded-lg bg-white text-sm md:text-base">
                            {{ ibuDataLocal.birth_date }}
                        </div>
                    </div>
                    <div class="space-y-2 flex flex-col">
                        <label for="ibu-religion" class="text-[#8E8E8E] text-xs md:text-sm">Agama</label>
                        <div id="ibu-religion" type="text" class="p-3 rounded-lg bg-white text-sm md:text-base">
                            {{ ibuDataLocal.religion }}
                        </div>
                    </div>
                    <div class="space-y-2 flex flex-col">
                        <label for="ibu-kewarganegaraan"
                            class="text-[#8E8E8E] text-xs md:text-sm">Kewarganegaraan</label>
                        <div id="ibu-kewarganegaraan" type="text" class="p-3 rounded-lg bg-white text-sm md:text-base">
                            {{ ibuDataLocal.kewarganegaraan }}
                        </div>
                    </div>
                    <div class="space-y-2 flex flex-col">
                        <label for="ibu-anak-ke" class="text-[#8E8E8E] text-xs md:text-sm">Anak Ke</label>
                        <div id="ibu-anak-ke" type="number" class="p-3 rounded-lg bg-white text-sm md:text-base">
                            {{ ibuDataLocal.anak_ke }}
                        </div>
                    </div>
                    <div class="space-y-2 flex flex-col">
                        <label for="ibu-jumlah-sodara" class="text-[#8E8E8E] text-xs md:text-sm">Jumlah Saudara</label>
                        <div id="ibu-jumlah-sodara" type="number" class="p-3 rounded-lg bg-white text-sm md:text-base">
                            {{ ibuDataLocal.jumlah_sodara }}
                        </div>
                    </div>
                    <div class="space-y-2 flex flex-col">
                        <label for="ibu-pernikahan-ke" class="text-[#8E8E8E] text-xs md:text-sm">Pernikahan Ke</label>
                        <div id="ibu-pernikahan-ke" type="number" class="p-3 rounded-lg bg-white text-sm md:text-base">
                            {{ ibuDataLocal.pernikahan_ke }}</div>
                    </div>
                    <div class="space-y-2 flex flex-col">
                        <label for="ibu-umur-menikah" class="text-[#8E8E8E] text-xs md:text-sm">Umur Saat
                            Menikah</label>
                        <div id="ibu-umur-menikah" type="number" class="p-3 rounded-lg bg-white text-sm md:text-base">
                            {{ ibuDataLocal.umur_saat_menikah }}</div>
                    </div>
                    <div class="space-y-2 flex flex-col">
                        <label for="ibu-pendidikan" class="text-[#8E8E8E] text-xs md:text-sm">Pendidikan
                            Terakhir</label>
                        <div id="ibu-pekerjaan" type="text" class="p-3 rounded-lg bg-white text-sm md:text-base">{{
                            ibuDataLocal.pendidikan }}</div>
                    </div>
                    <div class="space-y-2 flex flex-col">
                        <label for="ibu-pekerjaan" class="text-[#8E8E8E] text-xs md:text-sm">Pekerjaan</label>
                        <div id="ibu-pekerjaan" type="text" class="p-3 rounded-lg bg-white text-sm md:text-base">{{
                            ibuDataLocal.pekerjaan }}</div>
                    </div>
                </div>
            </div>
        </div>
        <div v-if="activeContentTab === 'saudara'">
            <SaudaraTable :idUser="userData?.id" />
        </div>
    </div>
</template>
