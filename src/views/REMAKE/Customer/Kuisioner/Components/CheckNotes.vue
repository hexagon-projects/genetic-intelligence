<script setup>
import { ref, onMounted, computed } from 'vue'
import { useStore } from 'vuex'
import Cookies from 'js-cookie'
import initAPI from '../../../../../api/api'
import Swal from 'sweetalert2'

const store = useStore()
const userData = computed(() => store.getters.getUserData)

const formData = ref({
  kelahiran_bawaan: '',
  riwayat_penyakit: '',
  pranatal: '',
  partus: '',
  minum_susu: '',
  keterangan: '',
  hubungan_keluarga: '',
  hubungan_dengan_ayah: '',
  hubungan_dengan_ibu: '',
  hubungan_dengan_saudara: '',
  perkembangan_fisik: '',
  perkembangan_mental: '',
  perkembangan_emosi_anak: '',
  perkembangan_sosial_anak: '',
  riwayat_pendidikan_formal: ''
})

const isLoading = ref(false)
const pemeriksaanId = ref(null)

const fetchPemeriksaanData = async () => {
  const token = Cookies.get('token')
  if (!token || !userData.value) return

  try {
    isLoading.value = true
    const response = await initAPI(
      'get',
      `customers/pemeriksaan?customer_id=${userData.value.id}`,
      null,
      token
    )

    if (response.data && response.data.data && response.data.data.length > 0) {
      const data = response.data.data[0]
      pemeriksaanId.value = data.id
      
      formData.value = {
        kelahiran_bawaan: data.kelahiran_bawaan || '',
        riwayat_penyakit: data.riwayat_penyakit || '',
        pranatal: data.pranatal || '',
        partus: data.partus || '',
        minum_susu: data.minum_susu || '',
        keterangan: data.keterangan || '',
        hubungan_keluarga: data.hubungan_keluarga || '',
        hubungan_dengan_ayah: data.hubungan_dengan_ayah || '',
        hubungan_dengan_ibu: data.hubungan_dengan_ibu || '',
        hubungan_dengan_saudara: data.hubungan_dengan_saudara || '',
        perkembangan_fisik: data.perkembangan_fisik || '',
        perkembangan_mental: data.perkembangan_mental || '',
        perkembangan_emosi_anak: data.perkembangan_emosi_anak || '',
        perkembangan_sosial_anak: data.perkembangan_sosial_anak || '',
        riwayat_pendidikan_formal: data.riwayat_pendidikan_formal || ''
      }
    }
  } catch (error) {
    console.error('Error fetching pemeriksaan data:', error)
  } finally {
    isLoading.value = false
  }
}

const savePemeriksaanData = async () => {
  const token = Cookies.get('token')
  if (!token || !userData.value) return

  try {
    isLoading.value = true
    
    const payload = {
      customer_id: userData.value.id,
      kelahiran_bawaan: formData.value.kelahiran_bawaan,
      riwayat_penyakit: formData.value.riwayat_penyakit,
      pranatal: formData.value.pranatal,
      partus: formData.value.partus,
      minum_susu: formData.value.minum_susu,
      keterangan: formData.value.keterangan,
      hubungan_keluarga: formData.value.hubungan_keluarga,
      hubungan_dengan_ayah: formData.value.hubungan_dengan_ayah,
      hubungan_dengan_ibu: formData.value.hubungan_dengan_ibu,
      hubungan_dengan_saudara: formData.value.hubungan_dengan_saudara,
      perkembangan_fisik: formData.value.perkembangan_fisik,
      perkembangan_mental: formData.value.perkembangan_mental,
      perkembangan_emosi_anak: formData.value.perkembangan_emosi_anak,
      perkembangan_sosial_anak: formData.value.perkembangan_sosial_anak,
      riwayat_pendidikan_formal: formData.value.riwayat_pendidikan_formal
    }

    let response
    
    if (pemeriksaanId.value) {
      response = await initAPI(
        'post',
        `customers/pemeriksaan/${pemeriksaanId.value}`,
        {
          ...payload,
          _method: 'PUT'
        },
        token
      )
    } else {
      response = await initAPI(
        'post',
        'customers/pemeriksaan',
        payload,
        token
      )
      
      if (response.data && response.data.data) {
        pemeriksaanId.value = response.data.data.id
      }
    }

    if (response.status === 200 || response.status === 201) {
      Swal.fire({
        icon: 'success',
        title: 'Berhasil',
        text: 'Data pemeriksaan berhasil disimpan',
        showConfirmButton: false,
        timer: 2000
      })
    }
  } catch (error) {
    console.error('Error saving pemeriksaan data:', error)
    Swal.fire({
      icon: 'error',
      title: 'Gagal',
      text: 'Gagal menyimpan data pemeriksaan',
      showConfirmButton: false,
      timer: 2000
    })
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  fetchPemeriksaanData()
})
</script>

<template>
    <div class="space-y-6 md:space-y-8">
        <div class="space-y-4 md:space-y-6 bg-gray-100 p-4 rounded-xl">
            <div class="space-y-2 flex flex-col">
                <label for="kelahiran_bawaan" class="text-[#8E8E8E] text-xs md:text-sm">Kelainan Bawaan</label>
                <textarea 
                    id="kelahiran_bawaan"
                    v-model="formData.kelahiran_bawaan"
                    class="p-3 rounded-lg bg-white text-sm md:text-base border border-gray-400" 
                    rows="5"
                ></textarea>
            </div>
            <div class="space-y-2 flex flex-col">
                <label for="riwayat_penyakit" class="text-[#8E8E8E] text-xs md:text-sm">Penyakit yang Pernah diderita</label>
                <textarea 
                    id="riwayat_penyakit"
                    v-model="formData.riwayat_penyakit"
                    class="p-3 rounded-lg bg-white text-sm md:text-base border border-gray-400" 
                    rows="5"
                ></textarea>
            </div>
            <div class="grid grid-cols-2 gap-4 md:gap-6">
                <div class="space-y-2 flex flex-col">
                    <label for="pranatal" class="text-[#8E8E8E] text-xs md:text-sm">Kelahiran Pranatal</label>
                    <input 
                        id="pranatal"
                        v-model="formData.pranatal"
                        type="text" 
                        class="p-3 rounded-lg bg-white text-sm md:text-base" 
                        placeholder="-"
                    >
                </div>
                <div class="space-y-2 flex flex-col">
                    <label for="partus" class="text-[#8E8E8E] text-xs md:text-sm">Kelahiran Partus</label>
                    <input 
                        id="partus"
                        v-model="formData.partus"
                        type="text" 
                        class="p-3 rounded-lg bg-white text-sm md:text-base" 
                        placeholder="Normal"
                    >
                </div>
            </div>
            <div class="space-y-2 flex flex-col">
                <label for="minum_susu" class="text-[#8E8E8E] text-xs md:text-sm">Minum Susu</label>
                <input 
                    id="minum_susu"
                    v-model="formData.minum_susu"
                    type="text" 
                    class="p-3 rounded-lg bg-white text-sm md:text-base" 
                    placeholder="ASI"
                >
            </div>
            <div class="space-y-2 flex flex-col">
                <label for="keterangan" class="text-[#8E8E8E] text-xs md:text-sm">Keterangan Lainnya</label>
                <textarea 
                    id="keterangan"
                    v-model="formData.keterangan"
                    class="p-3 rounded-lg bg-white text-sm md:text-base border border-gray-400" 
                    rows="5"
                ></textarea>
            </div>
        </div>

        <div class="space-y-6 md:space-y-8">
            <div class="space-y-4 md:space-y-6">
                <h3 class="text-base md:text-xl font-medium">Hubungan Keluarga</h3>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                    <div class="space-y-2 flex flex-col">
                        <label for="hubungan_keluarga" class="text-[#8E8E8E] text-xs md:text-sm">Ayah dengan Ibu</label>
                        <input 
                            id="hubungan_keluarga"
                            v-model="formData.hubungan_keluarga"
                            type="text" 
                            class="p-3 rounded-lg bg-[#f5f5f5] text-sm md:text-base" 
                            placeholder="-"
                        >
                    </div>
                    <div class="space-y-2 flex flex-col">
                        <label for="hubungan_dengan_ayah" class="text-[#8E8E8E] text-xs md:text-sm">Ayah dengan Anak</label>
                        <input 
                            id="hubungan_dengan_ayah"
                            v-model="formData.hubungan_dengan_ayah"
                            type="text" 
                            class="p-3 rounded-lg bg-[#f5f5f5] text-sm md:text-base" 
                            placeholder="-"
                        >
                    </div>
                    <div class="space-y-2 flex flex-col">
                        <label for="hubungan_dengan_ibu" class="text-[#8E8E8E] text-xs md:text-sm">Ibu dengan Anak</label>
                        <input 
                            id="hubungan_dengan_ibu"
                            v-model="formData.hubungan_dengan_ibu"
                            type="text" 
                            class="p-3 rounded-lg bg-[#f5f5f5] text-sm md:text-base" 
                            placeholder="-"
                        >
                    </div>
                    <div class="space-y-2 flex flex-col">
                        <label for="hubungan_dengan_saudara" class="text-[#8E8E8E] text-xs md:text-sm">Anak dengan Anak</label>
                        <input 
                            id="hubungan_dengan_saudara"
                            v-model="formData.hubungan_dengan_saudara"
                            type="text" 
                            class="p-3 rounded-lg bg-[#f5f5f5] text-sm md:text-base" 
                            placeholder="-"
                        >
                    </div>
                </div>
            </div>

            <div class="space-y-4 md:space-y-6">
                <h3 class="text-base md:text-xl font-medium">Perkembangan Anak</h3>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                    <div class="space-y-2 flex flex-col">
                        <label for="perkembangan_fisik" class="text-[#8E8E8E] text-xs md:text-sm">Perkembangan Fisik</label>
                        <input 
                            id="perkembangan_fisik"
                            v-model="formData.perkembangan_fisik"
                            type="text" 
                            class="p-3 rounded-lg bg-[#f5f5f5] text-sm md:text-base" 
                            placeholder="-"
                        >
                    </div>
                    <div class="space-y-2 flex flex-col">
                        <label for="perkembangan_mental" class="text-[#8E8E8E] text-xs md:text-sm">Perkembangan Mental</label>
                        <input 
                            id="perkembangan_mental"
                            v-model="formData.perkembangan_mental"
                            type="text" 
                            class="p-3 rounded-lg bg-[#f5f5f5] text-sm md:text-base" 
                            placeholder="-"
                        >
                    </div>
                    <div class="space-y-2 flex flex-col">
                        <label for="perkembangan_emosi_anak" class="text-[#8E8E8E] text-xs md:text-sm">Perkembangan Emosi</label>
                        <input 
                            id="perkembangan_emosi_anak"
                            v-model="formData.perkembangan_emosi_anak"
                            type="text" 
                            class="p-3 rounded-lg bg-[#f5f5f5] text-sm md:text-base" 
                            placeholder="-"
                        >
                    </div>
                    <div class="space-y-2 flex flex-col">
                        <label for="perkembangan_sosial_anak" class="text-[#8E8E8E] text-xs md:text-sm">Perkembangan Sosial</label>
                        <input 
                            id="perkembangan_sosial_anak"
                            v-model="formData.perkembangan_sosial_anak"
                            type="text" 
                            class="p-3 rounded-lg bg-[#f5f5f5] text-sm md:text-base" 
                            placeholder="-"
                        >
                    </div>
                    <div class="space-y-2 flex flex-col">
                        <label for="riwayat_pendidikan_formal" class="text-[#8E8E8E] text-xs md:text-sm">Riwayat Pendidikan Formal</label>
                        <input 
                            id="riwayat_pendidikan_formal"
                            v-model="formData.riwayat_pendidikan_formal"
                            type="text" 
                            class="p-3 rounded-lg bg-[#f5f5f5] text-sm md:text-base" 
                            placeholder="-"
                        >
                    </div>
                </div>
            </div>
        </div>
        <button
            @click="savePemeriksaanData"
            :disabled="isLoading"
            class="py-3 px-6 rounded-full text-white flex items-center gap-2 ml-auto text-sm md:text-base bg-primary disabled:opacity-50"
        >
            {{ isLoading ? 'Menyimpan...' : 'Simpan' }}
        </button>
    </div>
</template>